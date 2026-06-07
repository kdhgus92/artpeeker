using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using backend.Kakao;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;

namespace backend.Controllers;

[ApiController]
[Route("auth/kakao")]
public class AuthController : ControllerBase
{
    private const string StateCookieName = "artpeeker_kakao_oauth_state";
    private static readonly TimeSpan StateCookieLifetime = TimeSpan.FromMinutes(10);

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IOptions<KakaoOptions> _kakaoOptions;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IHttpClientFactory httpClientFactory,
        IOptions<KakaoOptions> kakaoOptions,
        ILogger<AuthController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _kakaoOptions = kakaoOptions;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Login()
    {
        var options = _kakaoOptions.Value;
        var validationError = ValidateOptions(options);
        if (validationError is not null)
        {
            return Redirect(BuildFrontendUrl(
                options.FrontendLoginUrl,
                "error",
                "Kakao OAuth settings are incomplete."));
        }

        var state = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
        Response.Cookies.Append(
            StateCookieName,
            state,
            new CookieOptions
            {
                HttpOnly = true,
                IsEssential = true,
                SameSite = SameSiteMode.Lax,
                Secure = HttpContext.Request.IsHttps,
                Expires = DateTimeOffset.UtcNow.Add(StateCookieLifetime)
            });

        var queryParams = new Dictionary<string, string?>
        {
            ["client_id"] = options.RestApiKey,
            ["redirect_uri"] = options.RedirectUri,
            ["response_type"] = "code",
            ["state"] = state
        };

        if (!string.IsNullOrWhiteSpace(options.Scope))
        {
            queryParams["scope"] = options.Scope;
        }

        var authorizeUrl = QueryHelpers.AddQueryString(
            "https://kauth.kakao.com/oauth/authorize",
            queryParams);

        return Redirect(authorizeUrl);
    }

    [HttpGet("callback")]
    public async Task<IActionResult> Callback(
        [FromQuery] string? code,
        [FromQuery] string? state,
        [FromQuery] string? error,
        [FromQuery(Name = "error_description")] string? errorDescription)
    {
        var options = _kakaoOptions.Value;
        var frontendLoginUrl = string.IsNullOrWhiteSpace(options.FrontendLoginUrl)
            ? "http://localhost:3000/login"
            : options.FrontendLoginUrl;

        if (!string.IsNullOrWhiteSpace(error))
        {
            return Redirect(BuildFrontendUrl(
                frontendLoginUrl,
                "error",
                errorDescription ?? error));
        }

        var validationError = ValidateOptions(options);
        if (validationError is not null)
        {
            return Redirect(BuildFrontendUrl(frontendLoginUrl, "error", validationError));
        }

        if (!Request.Cookies.TryGetValue(StateCookieName, out var savedState) ||
            string.IsNullOrWhiteSpace(state) ||
            !CryptographicOperations.FixedTimeEquals(
                Encoding.UTF8.GetBytes(savedState),
                Encoding.UTF8.GetBytes(state)))
        {
            return Redirect(BuildFrontendUrl(
                frontendLoginUrl,
                "error",
                "State validation failed."));
        }

        if (string.IsNullOrWhiteSpace(code))
        {
            return Redirect(BuildFrontendUrl(
                frontendLoginUrl,
                "error",
                "Authorization code is missing."));
        }

        Response.Cookies.Delete(StateCookieName);

        try
        {
            var tokenResponse = await ExchangeCodeForTokenAsync(code, options);
            var userProfile = await GetUserProfileAsync(tokenResponse.AccessToken);
            await SignInUserAsync(userProfile);

            return Redirect(BuildFrontendUrl(
                frontendLoginUrl,
                "success",
                null,
                userProfile.Properties?.Nickname));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kakao login callback failed.");

            return Redirect(BuildFrontendUrl(
                frontendLoginUrl,
                "error",
                "Failed to complete Kakao login."));
        }
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var kakaoId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(kakaoId))
        {
            return Unauthorized();
        }

        return Ok(new
        {
            kakaoId,
            nickname = User.FindFirstValue(ClaimTypes.Name)
        });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        return NoContent();
    }

    private async Task<KakaoTokenResponse> ExchangeCodeForTokenAsync(string code, KakaoOptions options)
    {
        using var client = _httpClientFactory.CreateClient();
        using var request = new HttpRequestMessage(HttpMethod.Post, "https://kauth.kakao.com/oauth/token")
        {
            Content = new FormUrlEncodedContent(BuildTokenRequest(code, options))
        };

        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        using var response = await client.SendAsync(request);
        var payload = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogWarning(
                "Kakao token exchange failed with status {StatusCode}: {Payload}",
                response.StatusCode,
                payload);

            throw new InvalidOperationException("Kakao token exchange failed.");
        }

        var tokenResponse = JsonSerializer.Deserialize<KakaoTokenResponse>(payload);
        if (tokenResponse is null || string.IsNullOrWhiteSpace(tokenResponse.AccessToken))
        {
            throw new InvalidOperationException("Kakao token response is invalid.");
        }

        return tokenResponse;
    }

    private async Task<KakaoUserResponse> GetUserProfileAsync(string accessToken)
    {
        using var client = _httpClientFactory.CreateClient();
        using var request = new HttpRequestMessage(HttpMethod.Get, "https://kapi.kakao.com/v2/user/me");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        using var response = await client.SendAsync(request);
        var payload = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogWarning(
                "Kakao user info request failed with status {StatusCode}: {Payload}",
                response.StatusCode,
                payload);

            throw new InvalidOperationException("Kakao user info request failed.");
        }

        var userResponse = JsonSerializer.Deserialize<KakaoUserResponse>(payload);
        if (userResponse is null || userResponse.Id == 0)
        {
            throw new InvalidOperationException("Kakao user info is invalid.");
        }

        return userResponse;
    }

    private async Task SignInUserAsync(KakaoUserResponse userProfile)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userProfile.Id.ToString())
        };

        if (!string.IsNullOrWhiteSpace(userProfile.Properties?.Nickname))
        {
            claims.Add(new Claim(ClaimTypes.Name, userProfile.Properties.Nickname));
        }

        var identity = new ClaimsIdentity(
            claims,
            CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);
        var properties = new AuthenticationProperties
        {
            IsPersistent = true,
            IssuedUtc = DateTimeOffset.UtcNow,
            ExpiresUtc = DateTimeOffset.UtcNow.AddDays(14)
        };

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            principal,
            properties);
    }

    private static IEnumerable<KeyValuePair<string?, string?>> BuildTokenRequest(
        string code,
        KakaoOptions options)
    {
        var form = new List<KeyValuePair<string?, string?>>
        {
            new("grant_type", "authorization_code"),
            new("client_id", options.RestApiKey),
            new("redirect_uri", options.RedirectUri),
            new("code", code)
        };

        if (!string.IsNullOrWhiteSpace(options.ClientSecret))
        {
            form.Add(new KeyValuePair<string?, string?>("client_secret", options.ClientSecret));
        }

        return form;
    }

    private static string? ValidateOptions(KakaoOptions options)
    {
        if (string.IsNullOrWhiteSpace(options.RestApiKey))
        {
            return "Kakao RestApiKey is missing.";
        }

        if (string.IsNullOrWhiteSpace(options.RedirectUri))
        {
            return "Kakao RedirectUri is missing.";
        }

        if (string.IsNullOrWhiteSpace(options.FrontendLoginUrl))
        {
            return "Kakao FrontendLoginUrl is missing.";
        }

        return null;
    }

    private static string BuildFrontendUrl(
        string baseUrl,
        string status,
        string? error = null,
        string? nickname = null)
    {
        var queryParams = new Dictionary<string, string?>
        {
            ["status"] = status
        };

        if (!string.IsNullOrWhiteSpace(error))
        {
            queryParams["error"] = error;
        }

        if (!string.IsNullOrWhiteSpace(nickname))
        {
            queryParams["nickname"] = nickname;
        }

        return QueryHelpers.AddQueryString(baseUrl, queryParams);
    }
}

public class KakaoTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; } = string.Empty;
}

public class KakaoUserResponse
{
    [JsonPropertyName("id")]
    public long Id { get; set; }

    [JsonPropertyName("properties")]
    public KakaoUserProperties? Properties { get; set; }
}

public class KakaoUserProperties
{
    [JsonPropertyName("nickname")]
    public string? Nickname { get; set; }
}
