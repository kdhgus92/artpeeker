# AGENTS.md

## 프론트엔드 개요

이 디렉터리는 Artpeeker의 프론트엔드입니다.

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm

Next.js App Router를 사용하며 주요 화면은 `app/` 아래에 있습니다.

## Next.js 16 주의사항

이 프로젝트의 Next.js는 오래된 학습 데이터나 기존 Next.js 관례와 다를 수 있습니다. 라우팅, 서버/클라이언트 컴포넌트, 메타데이터, 캐싱, 설정 파일, 빌드 동작을 바꾸기 전에는 설치된 문서를 확인하세요.

관련 문서는 다음 위치에 있습니다.

- `node_modules/next/dist/docs/`

프레임워크 경고나 deprecation 메시지는 무시하지 말고, 현재 설치된 버전에 맞춰 코드를 작성하세요.

## 주요 파일 구조

- `app/layout.tsx`: 전체 레이아웃과 폰트 설정입니다.
- `app/page.tsx`: 홈 화면입니다.
- `app/login/page.tsx`: Kakao 로그인 진입 및 로그인 결과 표시 화면입니다.
- `app/globals.css`: 전역 스타일과 Tailwind 설정입니다.
- `public/`: 정적 이미지와 아이콘입니다.
- `next.config.ts`: Next.js 설정입니다.
- `eslint.config.mjs`: ESLint 설정입니다.

## 명령어

이 디렉터리에서 실행합니다.

- 의존성 설치: `pnpm install`
- 개발 서버 실행: `pnpm dev`
- 빌드: `pnpm build`
- 린트: `pnpm lint`

## 환경 변수

로그인 화면은 다음 환경 변수를 사용합니다.

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_KAKAO_LOGIN_URL`

`NEXT_PUBLIC_KAKAO_LOGIN_URL`이 있으면 해당 값을 Kakao 로그인 URL로 사용합니다. 없으면 `NEXT_PUBLIC_API_URL` 뒤에 `/auth/kakao`를 붙여 사용합니다.

실제 API 키, 토큰, 쿠키, 시크릿 값은 프론트엔드 코드나 추적되는 환경 파일에 넣지 마세요.

## 코딩 지침

- 기존 컴포넌트의 간결한 스타일을 유지하세요.
- 기본적으로 Server Component를 사용하고, 훅이나 브라우저 API가 필요할 때만 `"use client"`를 추가하세요.
- 페이지와 컴포넌트는 TypeScript로 작성하세요.
- 스타일은 Tailwind 유틸리티 클래스를 우선 사용하세요.
- 현재 UI는 절제된 GitHub 스타일의 회색/흰색 기반 톤을 사용합니다. 새 화면도 이 분위기에 맞추세요.
- 사용자에게 보이는 문구는 기존처럼 한국어 중심으로 작성하되, 이미 사용 중인 짧은 영어 라벨은 맥락에 맞게 유지할 수 있습니다.
- 접근성을 고려해 링크와 버튼의 목적이 명확하게 드러나도록 작성하세요.
- 외부 API URL을 하드코딩하지 말고 환경 변수를 사용하세요.

## 검증

프론트엔드 코드를 변경한 뒤에는 우선 `pnpm lint`를 실행하세요.

다음 경우에는 `pnpm build`도 실행하세요.

- 라우팅, 레이아웃, 메타데이터를 변경한 경우
- Server Component와 Client Component 경계를 바꾼 경우
- 환경 변수 사용 방식이나 빌드 설정을 변경한 경우
- 배포 결과에 영향을 줄 수 있는 변경을 한 경우

의존성이나 로컬 환경 문제로 명령을 실행할 수 없다면 최종 응답에 이유를 명확히 적으세요.
