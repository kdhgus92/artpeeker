using Dapper.ColumnMapper;

namespace backend.Users;

public class AppUser
{
    [ColumnMapping("id")]
    public Guid Id { get; set; }

    [ColumnMapping("kakao_id")]
    public long KakaoId { get; set; }

    [ColumnMapping("nickname")]
    public string? Nickname { get; set; }

    [ColumnMapping("profile_image_url")]
    public string? ProfileImageUrl { get; set; }

    [ColumnMapping("created_at")]
    public DateTimeOffset CreatedAt { get; set; }

    [ColumnMapping("updated_at")]
    public DateTimeOffset UpdatedAt { get; set; }

    [ColumnMapping("last_login_at")]
    public DateTimeOffset LastLoginAt { get; set; }
}
