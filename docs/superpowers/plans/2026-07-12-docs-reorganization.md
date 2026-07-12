# Docs Reorganization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize Artpeeker documentation around the NestJS backend transition while preserving the current .NET implementation facts.

**Architecture:** This is a documentation-only change. `docs/README.md` remains the index, `docs/project-context.md` becomes the source of truth for current state and transition direction, `docs/development-flow.md` clarifies current versus future commands, `docs/ideas.md` records the next development sequence, and `docs/vibe-coding.md` keeps collaboration examples technology-aware.

**Tech Stack:** Markdown, current Artpeeker frontend npm workflow, current .NET backend, planned NestJS backend.

---

### Task 1: Update Docs Index

**Files:**
- Modify: `docs/README.md`

- [ ] **Step 1: Replace `docs/README.md` with an index that separates current state and transition direction**

Use this content:

```markdown
# Artpeeker Docs

이 폴더는 Artpeeker를 빠르게 이해하고, Codex나 Claude 같은 코딩 에이전트와 자연스럽게 이어서 작업하기 위한 문서 공간입니다.

현재 문서는 세 가지를 구분해서 기록합니다.

- 현재 구현: 지금 저장소에 실제로 존재하는 코드와 실행 가능한 명령입니다.
- 전환 방향: 다음 작업으로 합의한 기술 방향입니다.
- 열린 질문: 아직 제품이나 아키텍처 결정을 기다리는 항목입니다.

## 문서 목록

- `project-context.md`: 제품 목표, 현재 구현, NestJS 백엔드 전환 방향을 정리합니다.
- `development-flow.md`: 현재 로컬 실행, 검증, 커밋 전 확인 루틴을 정리합니다.
- `vibe-coding.md`: 에이전트와 함께 작업할 때 좋은 요청 방식과 작업 흐름을 정리합니다.
- `ideas.md`: 기능 아이디어, 결정 사항, 다음 작업 후보를 적어두는 열린 노트입니다.

## 문서 작성 원칙

- 나중에 다시 봐도 바로 행동할 수 있게 적습니다.
- 현재 존재하는 구현과 앞으로 바꿀 방향을 섞어 쓰지 않습니다.
- 완벽한 설명보다 현재 판단과 다음 액션을 우선합니다.
- 결정이 바뀌면 오래된 내용을 지우기보다 왜 바뀌었는지 짧게 남깁니다.
- 민감한 값은 문서에 적지 않습니다. Kakao 키, 토큰, 쿠키, 시크릿은 환경 변수나 로컬 설정으로 관리합니다.
```

- [ ] **Step 2: Verify the docs index mentions current implementation, transition direction, and open questions**

Run: `sed -n '1,220p' docs/README.md`
Expected: The output contains "현재 구현", "전환 방향", and "열린 질문".

### Task 2: Update Project Context

**Files:**
- Modify: `docs/project-context.md`

- [ ] **Step 1: Rewrite `docs/project-context.md` as the current source of truth**

Use this content:

```markdown
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
```

- [ ] **Step 2: Verify frontend package manager and NestJS transition are documented**

Run: `rg -n "npm|NestJS|\\.NET|/auth/kakao/me|/auth/kakao/logout" docs/project-context.md`
Expected: The output shows npm, current .NET backend, NestJS transition direction, and all auth endpoints.

### Task 3: Update Development Flow

**Files:**
- Modify: `docs/development-flow.md`

- [ ] **Step 1: Rewrite backend command sections to mark .NET commands as current and temporary**

Use this content:

```markdown
# 개발 흐름

## 로컬 실행

현재 백엔드:

```bash
cd backend
dotnet run --launch-profile http
```

기본 주소:

```text
http://localhost:5161
```

프론트엔드:

```bash
cd frontend
NEXT_PUBLIC_API_URL=http://localhost:5161 npm run dev
```

기본 주소:

```text
http://localhost:3000
```

## NestJS 전환 메모

현재 `backend/`는 .NET 10 Web API입니다. 다음 백엔드 방향은 NestJS로 완전 교체하는 것입니다.

전환 전에는 이 문서의 `dotnet` 명령을 사용합니다. 전환 후에는 `backend/` 기준의 npm 명령으로 이 문서를 업데이트합니다.

## 검증 명령어

현재 백엔드:

```bash
cd backend
dotnet build
```

프론트엔드:

```bash
cd frontend
npm run lint
```

프론트의 라우팅, 레이아웃, 빌드 설정, Server/Client Component 경계를 바꿨다면 빌드도 확인합니다.

```bash
cd frontend
npm run build
```

공통 diff 확인:

```bash
git diff --check
git status --short
```

## 커밋 전 체크

- 변경 파일이 의도한 범위 안에 있는지 확인합니다.
- 시크릿, 토큰, 쿠키, 실제 API 키가 들어가지 않았는지 확인합니다.
- 프론트 변경은 `npm run lint`를 통과해야 합니다.
- 현재 백엔드 변경은 `dotnet build`를 통과해야 합니다.
- NestJS 전환 후 백엔드 검증 명령은 이 문서와 루트 지침을 함께 갱신합니다.
- 문서만 바꾼 경우에는 테스트를 생략할 수 있지만, 최종 메시지에 문서 변경이라고 명확히 적습니다.

## 브랜치

기본 브랜치는 `main`입니다.

```bash
git status -sb
git branch -vv
```

푸시:

```bash
git push origin main
```
```

- [ ] **Step 2: Verify current and transition commands are both clear**

Run: `rg -n "현재 백엔드|NestJS|dotnet build|npm run lint" docs/development-flow.md`
Expected: The output shows current .NET commands and NestJS transition note.

### Task 4: Update Ideas Notebook

**Files:**
- Modify: `docs/ideas.md`

- [ ] **Step 1: Rewrite `docs/ideas.md` around the backend transition sequence**

Use this content:

```markdown
# 아이디어와 작업 노트

이 문서는 아직 확정되지 않은 생각을 적어두는 공간입니다. 깔끔하게 정리하지 않아도 됩니다.

## 다음 개발 추천

우선순위는 "백엔드를 NestJS로 교체하고, 로그인 이후 사용자별 공간으로 이어지는 기반"을 작게 만드는 것입니다.

1. 현재 .NET 백엔드를 NestJS로 완전히 교체합니다.
2. Kakao 인증 엔드포인트 parity를 맞춥니다.
   - `GET /auth/kakao`
   - `GET /auth/kakao/callback`
   - `GET /auth/kakao/me`
   - `POST /auth/kakao/logout`
3. OAuth `state` 검증, HttpOnly 쿠키 세션, fixed-time 비교에 해당하는 보안 흐름을 보존합니다.
4. NestJS 기반이 안정되면 로그인한 사용자를 저장할 User 모델과 데이터베이스를 결정합니다.
5. `/me` 또는 `/gallery` 같은 로그인 후 내 공간 페이지를 추가합니다.
6. 이후 작품 저장 API와 빈 상태 UI를 붙입니다.

이 순서가 좋은 이유는 백엔드 기술 결정을 먼저 정리한 뒤, 사용자별 데이터가 있는 앱으로 넘어가는 가장 작은 세로 조각을 만들 수 있기 때문입니다.

## 현재 로그인 상태 메모

Kakao OAuth 왕복을 Artpeeker 로그인 세션으로 연결하는 기본 흐름이 현재 .NET 백엔드에 구현되어 있습니다.

- 백엔드에는 `/auth/kakao`와 `/auth/kakao/callback`이 있습니다.
- OAuth `state` 쿠키 검증, Kakao 토큰 교환, Kakao 사용자 정보 조회 골격이 있습니다.
- 프론트엔드 `/login` 페이지는 Kakao 로그인 버튼과 성공/실패 query string 표시를 처리합니다.
- 로그인 성공 후 HttpOnly 인증 쿠키를 발급합니다.
- 백엔드에는 `/auth/kakao/me`, `/auth/kakao/logout`이 있습니다.
- 홈 화면은 `/auth/kakao/me`를 호출해 로그인 상태, 프로필 이미지, 로그아웃 버튼을 표시합니다.

아직 남은 작업은 이 흐름을 NestJS로 옮긴 뒤, 로그인한 사용자를 DB의 `User`와 연결하고 실제 사용자별 데이터를 저장하는 것입니다.

## 다음 기능 후보

- NestJS 백엔드 교체
- Kakao OAuth 인증 parity
- 사용자 모델 설계
- 데이터베이스 선택
- 작품 저장 기능
- 작품 목록 화면
- 작품 상세 화면
- 감상 메모 작성
- 컬렉션 분류
- 로그인 후 사용자 프로필 표시

## 백엔드 후보 작업

- NestJS 프로젝트 구조 설계
- Kakao OAuth 설정 구조 설계
- 쿠키 세션 방식 결정
- User 모델 설계
- 작품 모델 설계
- 저장한 작품 API
- 인증 후 사용자 식별 방식 결정
- CORS 설정 정리
- 로컬 개발용 환경 변수 구성

## 프론트엔드 후보 작업

- 로그인 후 홈 화면 상태 분기
- `/me` 또는 `/gallery` 라우팅
- 빈 상태 화면
- 작품 카드 컴포넌트
- 목록/상세 라우팅
- 모바일 레이아웃 점검
- 접근성 점검

## 결정 기록

- 기본 브랜치는 `main`입니다.
- 프로젝트 지침은 루트 `AGENTS.md`와 `frontend/AGENTS.md`에 정리합니다.
- 프론트엔드 패키지 매니저는 npm입니다.
- 프론트엔드의 현재 톤은 절제된 GitHub 스타일을 유지합니다.
- 백엔드는 현재 .NET 구현이 있지만, 다음 방향은 NestJS 완전 교체입니다.
- 기존 Kakao OAuth 보안 흐름은 NestJS 전환 후에도 보존합니다.

## 열린 질문

- 데이터베이스는 무엇을 사용할지?
- 저장할 작품 데이터는 외부 API에서 가져올지, 사용자가 직접 입력할지?
- Kakao 로그인 후 인증 상태는 쿠키 세션으로 계속 관리할지?
- NestJS 전환 후 배포는 어디에 할지?
- 사용자 개인정보 처리 정책은 어느 수준부터 문서화할지?
```

- [ ] **Step 2: Verify ideas include backend transition and profile image status**

Run: `rg -n "NestJS|프로필 이미지|User|데이터베이스|/gallery" docs/ideas.md`
Expected: The output shows NestJS transition work, profile image state, User/database follow-up, and `/gallery`.

### Task 5: Update Collaboration Guide

**Files:**
- Modify: `docs/vibe-coding.md`

- [ ] **Step 1: Replace the backend example with current-versus-transition wording**

Use this content:

```markdown
# 바이브코딩 가이드

이 문서는 Artpeeker에서 에이전트와 빠르게 합을 맞추기 위한 작업 방식입니다.

## 좋은 요청 방식

작업을 요청할 때는 다음 중 2-3가지만 알려줘도 충분합니다.

- 무엇을 만들지: 예를 들어 "작품 저장 화면 만들어줘"
- 어디를 바꿀지: 예를 들어 "프론트만", "백엔드 API까지"
- 원하는 분위기: 예를 들어 "지금 GitHub 스타일 유지", "더 미니멀하게"
- 검증 방식: 예를 들어 "린트와 빌드까지 확인"
- 커밋 여부: 예를 들어 "끝나면 커밋해줘"

예시:

```text
작품 목록 화면 만들어줘. 프론트만 작업하고 지금 스타일 유지해줘. 끝나면 npm run lint까지 확인해줘.
```

```text
현재 .NET 백엔드에 작품 저장 API 초안 만들어줘. 컨트롤러와 DTO 추가하고 dotnet build까지 돌려줘.
```

```text
NestJS 전환 계획 작성해줘. 기존 Kakao OAuth 엔드포인트 parity를 유지하는 방향으로 설계부터 진행해줘.
```

## 작업 시작 전에 확인하면 좋은 것

- 현재 작업트리가 깨끗한지
- 이전에 실행 중인 dev server가 있는지
- 프론트만 바꾸는지, 백엔드까지 바꾸는지
- 백엔드 작업이라면 현재 .NET 구현을 수정하는지, NestJS 전환을 진행하는지
- Kakao OAuth처럼 외부 설정이 필요한 작업인지

## 에이전트에게 맡기기 좋은 작업

- 화면 구조 잡기
- API 초안 만들기
- 타입, DTO, 옵션 클래스 정리
- 문서화
- 린트/빌드 오류 수정
- 커밋 메시지 정리

## 사람이 직접 결정하면 좋은 것

- 제품 이름과 핵심 메시지
- 실제 Kakao 앱 설정값
- 데이터베이스 선택
- 배포 대상
- 사용자 개인정보 처리 정책

## 작업 후 남기면 좋은 기록

`ideas.md`에 다음 내용을 짧게 남겨두면 이후 작업이 빨라집니다.

- 오늘 결정한 것
- 아직 애매한 것
- 다음에 만들 화면이나 API
- 임시로 둔 설정
- 나중에 리팩터링할 부분

## 자주 쓰는 마무리 요청

```text
변경점 확인하고 커밋해줘.
```

```text
현재 프로젝트 실행해줘.
```

```text
방금 작업 문서화해줘.
```

```text
이 변경점 리뷰해줘.
```
```

- [ ] **Step 2: Verify examples mention npm, current .NET, and NestJS planning**

Run: `rg -n "npm run lint|현재 \\.NET|NestJS" docs/vibe-coding.md`
Expected: The output shows all three terms.

### Task 6: Final Verification

**Files:**
- Verify: `docs/README.md`
- Verify: `docs/project-context.md`
- Verify: `docs/development-flow.md`
- Verify: `docs/ideas.md`
- Verify: `docs/vibe-coding.md`

- [ ] **Step 1: Search for stale pnpm references in user-facing docs**

Run: `rg -n "pnpm" docs/*.md`
Expected: No output.

- [ ] **Step 2: Check markdown diff whitespace**

Run: `git diff --check`
Expected: No output.

- [ ] **Step 3: Review changed files**

Run: `git diff -- docs`
Expected: Diff only updates docs around current implementation, NestJS transition direction, and collaboration flow.

- [ ] **Step 4: Check final status**

Run: `git status --short`
Expected: Modified docs files and the new plan file are visible before commit.

- [ ] **Step 5: Commit docs reorganization**

Run:

```bash
git add docs
git commit -m "docs: reorganize backend transition notes"
```

Expected: A commit is created with documentation-only changes.
