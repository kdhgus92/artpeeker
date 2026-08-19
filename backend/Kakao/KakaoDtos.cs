using System.Text.Json.Serialization;

namespace backend.Kakao;

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

    [JsonPropertyName("profile_image")]
    public string? ProfileImage { get; set; }

    [JsonPropertyName("thumbnail_image")]
    public string? ThumbnailImage { get; set; }
}
