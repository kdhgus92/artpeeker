using backend.Kakao;
using Dapper;
using Npgsql;

namespace backend.Users;

public class UserService(NpgsqlDataSource dataSource)
{
    private const string UpsertUserSql = """
        insert into users (
            id,
            kakao_id,
            nickname,
            profile_image_url,
            created_at,
            updated_at,
            last_login_at
        )
        values (
            @Id,
            @KakaoId,
            @Nickname,
            @ProfileImageUrl,
            @Now,
            @Now,
            @Now
        )
        on conflict (kakao_id) do update
        set nickname = excluded.nickname,
            profile_image_url = excluded.profile_image_url,
            updated_at = excluded.updated_at,
            last_login_at = excluded.last_login_at
        returning
            id,
            kakao_id,
            nickname,
            profile_image_url,
            created_at,
            updated_at,
            last_login_at;
        """;

    public async Task<AppUser> UpsertFromKakaoAsync(
        KakaoUserResponse kakaoUser,
        CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        var parameters = new
        {
            Id = Guid.CreateVersion7(),
            KakaoId = kakaoUser.Id,
            Nickname = kakaoUser.Properties?.Nickname,
            ProfileImageUrl = kakaoUser.Properties?.ProfileImage,
            Now = now
        };

        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        var command = new CommandDefinition(
            UpsertUserSql,
            parameters,
            cancellationToken: cancellationToken);

        return await connection.QuerySingleAsync<AppUser>(command);
    }
}
