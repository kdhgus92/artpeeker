# AGENTS.md

## 프로젝트 개요

Artpeeker는 프론트엔드와 백엔드가 나뉜 웹 애플리케이션입니다.

- `frontend/`: Next.js 16, React 19, TypeScript, Tailwind CSS 4, pnpm 기반 앱입니다.
- `backend/`: .NET 10 대상 ASP.NET Core Web API입니다. 현재는 Kakao OAuth 로그인을 중심으로 구성되어 있습니다.

사용자가 명시적으로 양쪽을 모두 요청하지 않는 한, 변경 범위는 관련된 영역 안으로 좁게 유지하세요.

## 저장소 구조

- `frontend/app/`: Next.js App Router 페이지와 전역 스타일입니다.
- `frontend/public/`: 프론트엔드 정적 에셋입니다.
- `backend/Controllers/`: ASP.NET Core API 컨트롤러입니다.
- `backend/Kakao/`: Kakao OAuth 설정 타입입니다.
- `backend/appsettings.json`: 로컬 설정 구조입니다. 실제 시크릿은 커밋하지 마세요.

## 프론트엔드 명령어

`frontend/`에서 실행합니다.

- 의존성 설치: `pnpm install`
- 개발 서버 실행: `pnpm dev`
- 빌드: `pnpm build`
- 린트: `pnpm lint`

이 프로젝트는 Next.js 16을 사용합니다. 프레임워크 API, 라우팅, 메타데이터, 설정 동작을 바꾸기 전에는 `frontend/node_modules/next/dist/docs/`에 설치된 Next.js 문서를 확인하세요. 이 버전은 오래된 Next.js 관례와 다를 수 있습니다.

## 백엔드 명령어

`backend/`에서 실행합니다.

- 패키지 복원: `dotnet restore`
- API 실행: `dotnet run`
- 빌드: `dotnet build`

백엔드는 `net10.0`을 대상으로 하며 nullable reference type과 implicit using을 사용합니다.

## 환경 변수와 설정

프론트엔드 로그인 설정은 다음 값을 사용합니다.

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_KAKAO_LOGIN_URL`

백엔드 Kakao 설정은 `Kakao` 섹션 아래에 있습니다.

- `RestApiKey`
- `ClientSecret`
- `RedirectUri`
- `FrontendLoginUrl`
- `Scope`

실제 Kakao 키, 클라이언트 시크릿, 액세스 토큰, 리프레시 토큰, 쿠키, 기타 인증 정보는 추적되는 파일에 추가하지 마세요. 민감한 값은 로컬 환경 변수, user secrets, 또는 git에서 제외된 로컬 설정을 사용하세요.

## 코딩 지침

- 새 패턴을 도입하기 전에 기존 파일 스타일을 따르세요.
- 사용자가 다국어 문구 변경을 요청하지 않는 한, 현재의 한국어/영어 혼합 UI 문구 톤을 유지하세요.
- `frontend/app/`에서는 기본적으로 TypeScript와 React Server Component를 사용하세요. 훅, 브라우저 상태, 이벤트 핸들러처럼 클라이언트 전용 API가 필요할 때만 `"use client"`를 추가하세요.
- 프론트엔드 스타일은 Tailwind 유틸리티 클래스를 우선 사용하고, 현재의 절제된 GitHub 스타일 분위기에 맞추세요.
- ASP.NET 컨트롤러는 작게 유지하세요. 재사용되는 설정이나 외부 연동 로직이 커지면 역할이 분명한 클래스로 분리하세요.
- OAuth 보안 흐름인 `state` 검증, HttpOnly 쿠키, fixed-time 비교는 보존하세요.
- 로컬 개발 환경과 프론트엔드 연동 필요성을 확인하지 않고 HTTPS 리다이렉션, CORS, 인증 미들웨어 동작을 바꾸지 마세요.

## 검증

프론트엔드 변경 후에는 `pnpm lint`를 실행하세요. 동작이나 빌드 결과에 영향이 있을 수 있으면 `pnpm build`도 실행하세요.

백엔드 변경 후에는 `dotnet build`를 실행하세요. 테스트 프로젝트가 있거나 로직을 테스트 가능한 단위로 분리했다면 관련 테스트를 추가하거나 실행하세요.

의존성, SDK, 시크릿이 없어 명령을 실행할 수 없다면 최종 응답에 그 사실을 명확히 적으세요.

## PR과 작업 기록

- 사용자가 별도로 요청하지 않는 한 PR 제목과 본문은 한국어로 작성하세요.
- PR 본문에는 변경 요약과 검증 결과를 포함하세요.
- Codex가 PR 본문이나 주요 작업 기록을 작성했다면 마지막에 `작성: Codex` 서명을 남기세요.

## 기존 하위 지침

`frontend/AGENTS.md`에는 Next.js 관련 추가 지침이 있습니다. `frontend/` 아래에서 작업할 때는 이 루트 파일과 하위 파일을 모두 따르되, 프론트엔드 세부 사항은 하위 파일을 우선 적용하세요.
