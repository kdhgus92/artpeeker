create table if not exists users (
    id uuid primary key,
    kakao_id bigint not null,
    nickname varchar(100),
    profile_image_url varchar(2048),
    created_at timestamptz not null,
    updated_at timestamptz not null,
    last_login_at timestamptz not null,
    constraint uq_users_kakao_id unique (kakao_id)
);
