namespace backend.Kakao;

public class KakaoOptions
{
    public const string SectionName = "Kakao";

    public string RestApiKey { get; set; } = string.Empty;

    public string ClientSecret { get; set; } = string.Empty;

    public string RedirectUri { get; set; } = string.Empty;

    public string FrontendLoginUrl { get; set; } = "http://localhost:3000/login";

    public string Scope { get; set; } = "profile_nickname,account_email";
}
