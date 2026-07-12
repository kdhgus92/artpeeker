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
