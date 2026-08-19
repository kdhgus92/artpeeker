# Supabase 데이터베이스

Artpeeker는 Supabase의 PostgreSQL을 데이터 저장소로 사용합니다. 사용자 인증은 기존 Kakao OAuth와 HttpOnly 쿠키가 담당하며, Supabase Auth와 브라우저용 Supabase SDK는 사용하지 않습니다.

## 구성

- 데이터 접근: Dapper
- 동적 SQL 구성: Dapper.SqlBuilder
- 컬럼 매핑: Dapper.ColumnMapper
- PostgreSQL driver: Npgsql
- 개발 및 운영 데이터베이스: Supabase PostgreSQL
- 스키마 변경: 버전이 붙은 SQL 스크립트

백엔드만 데이터베이스에 연결합니다. 데이터베이스 비밀번호, Supabase service-role 키, 연결 문자열을 프론트엔드나 `NEXT_PUBLIC_` 환경 변수에 넣지 않습니다.

## 연결 문자열 설정

Supabase Dashboard의 **Connect** 화면에서 .NET/Npgsql용 연결 정보를 확인합니다. 지속 실행되는 ASP.NET Core 백엔드에는 Direct Connection 또는 Session Pooler를 사용합니다.

로컬에서는 Git에서 제외된 `backend/appsettings.Development.json`에 연결 문자열을 추가합니다.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=...;Port=5432;Database=postgres;Username=...;Password=...;SSL Mode=Require"
  },
  "Kakao": {
    "RestApiKey": "",
    "ClientSecret": "",
    "RedirectUri": "http://localhost:5161/auth/kakao/callback",
    "FrontendLoginUrl": "http://localhost:3000/login",
    "Scope": "profile_nickname,profile_image"
  }
}
```

실제 값이 Git에서 제외되는지 확인합니다.

```bash
git check-ignore -v backend/appsettings.Development.json
```

## 패키지 버전

- `Dapper` `2.1.79`
- `Dapper.SqlBuilder` `2.1.66`
- `Dapper.ColumnMapper` `1.3.0`
- `Npgsql` `10.0.3`

Artpeeker는 회사 프로젝트의 Dapper 기반 개발 방식을 참고하되, 패키지는 구현 시점의 최신 안정판을 사용합니다.

## 스키마 변경

SQL 스크립트는 `backend/Database/Migrations/`에 실행 순서가 드러나는 번호와 함께 저장합니다.

```bash
backend/Database/Migrations/001_create_users.sql
```

최초 설정에서는 Supabase Dashboard의 SQL Editor에서 스크립트 내용을 실행합니다. CLI로 적용하려면 Supabase 연결 문자열을 노출하지 않도록 환경 변수로 전달합니다.

```bash
psql "$ARTPEEKER_DATABASE_URL" \
  --set ON_ERROR_STOP=on \
  --file backend/Database/Migrations/001_create_users.sql
```

SQL 실행은 원격 스키마를 변경하므로 연결 대상이 올바른 Supabase 프로젝트인지 먼저 확인합니다. 이미 적용한 스크립트는 수정하지 않고 다음 번호의 새 스크립트를 추가합니다.

## 사용자 저장 흐름

Kakao 로그인이 성공하면 백엔드는 하나의 PostgreSQL upsert 문을 실행합니다.

- 처음 로그인한 사용자는 `users` 테이블에 추가합니다.
- 기존 사용자는 닉네임과 프로필 이미지 URL을 최신 값으로 갱신합니다.
- 로그인할 때마다 `last_login_at`을 갱신합니다.
- `kakao_id`에는 unique index가 적용됩니다.
- 내부 사용자 ID는 UUIDv7을 사용하며 인증 쿠키의 비공개 claim에 저장합니다.
- `INSERT ... ON CONFLICT (kakao_id) DO UPDATE`로 생성과 갱신을 원자적으로 처리합니다.

현재 `users` 테이블은 다음 정보를 저장합니다.

| 컬럼 | 형식 | 설명 |
| --- | --- | --- |
| `id` | `uuid` | Artpeeker 내부 사용자 ID |
| `kakao_id` | `bigint` | Kakao 사용자 ID, unique |
| `nickname` | `varchar(100)` | Kakao 닉네임 |
| `profile_image_url` | `varchar(2048)` | Kakao 프로필 이미지 URL |
| `created_at` | `timestamptz` | 최초 생성 시각 |
| `updated_at` | `timestamptz` | 프로필 최종 갱신 시각 |
| `last_login_at` | `timestamptz` | 최근 로그인 시각 |
