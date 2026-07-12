# 프로젝트 맥락

## 한 줄 설명

Artpeeker는 사용자가 좋아한 작품, 컬렉션, 감상 기록을 저장하고 다시 볼 수 있게 하는 웹 애플리케이션입니다.

## 현재 구현

- 프론트엔드: `frontend/`
- 백엔드: `backend/`
- 프론트엔드는 Next.js 16, React 19, TypeScript, Tailwind CSS 4, npm을 사용합니다.
- 현재 백엔드는 .NET 10 대상 ASP.NET Core Web API입니다.
- 현재 인증 흐름은 Kakao OAuth 로그인과 HttpOnly 쿠키 세션을 중심으로 구성되어 있습니다.

## 전환 방향

다음 백엔드 방향은 기존 .NET 백엔드를 NestJS로 완전히 교체하는 것입니다.

전환할 때는 현재 프론트엔드가 기대하는 인증 엔드포인트와 응답 형태를 최대한 유지합니다. 특히 Kakao OAuth `state` 검증, HttpOnly 쿠키, fixed-time 비교에 해당하는 보안 흐름은 NestJS 구현에서도 보존합니다.

아직 데이터베이스와 User 모델은 확정하지 않았습니다. NestJS 기반 인증 parity를 먼저 맞춘 뒤 사용자 저장 모델과 작품 저장 모델을 설계합니다.

## 주요 화면

- `/`: Artpeeker 홈 화면입니다.
- `/login`: Kakao 로그인 진입점과 로그인 결과 메시지를 보여주는 화면입니다.

## 현재 백엔드 엔드포인트

- `GET /auth/kakao`: Kakao OAuth 인증 페이지로 리다이렉트합니다.
- `GET /auth/kakao/callback`: Kakao OAuth 콜백을 처리하고 프론트 로그인 화면으로 결과를 전달합니다.
- `GET /auth/kakao/me`: 로그인 세션 쿠키를 기반으로 현재 Kakao 사용자 정보를 반환합니다.
- `POST /auth/kakao/logout`: 로그인 세션을 종료합니다.

## 중요한 설정

프론트엔드:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_KAKAO_LOGIN_URL`

현재 .NET 백엔드 Kakao 설정:

- `RestApiKey`
- `ClientSecret`
- `RedirectUri`
- `FrontendLoginUrl`
- `Scope`

NestJS 전환 후에도 같은 의미의 설정을 환경 변수 또는 설정 모듈로 유지합니다.

## 현재 제품 방향

초기 목표는 사용자가 부담 없이 로그인하고, 이후 좋아한 작품이나 감상 기록을 저장할 수 있는 기반을 만드는 것입니다. UI는 화려한 랜딩 페이지보다 조용하고 사용하기 쉬운 작업 화면을 우선합니다.

## 지켜야 할 점

- 실제 Kakao 키나 토큰은 커밋하지 않습니다.
- OAuth `state` 검증, HttpOnly 쿠키, fixed-time 비교에 해당하는 보안 흐름은 유지합니다.
- 프론트엔드에서 외부 API URL을 하드코딩하지 않습니다.
- Next.js 16 관련 코드를 바꿀 때는 설치된 문서를 확인합니다.
- NestJS 전환 전에는 현재 .NET 백엔드가 실제 구현이라는 점을 문서에 명확히 남깁니다.
