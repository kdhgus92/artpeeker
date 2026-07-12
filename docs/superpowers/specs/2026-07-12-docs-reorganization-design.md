# Docs Reorganization Design

## Goal

Reorganize the Artpeeker docs around the current transition plan: the repository still contains a .NET backend, but the agreed next direction is to replace it with a NestJS backend.

The docs should help a future contributor quickly understand:

- What Artpeeker is trying to become.
- What is implemented today.
- What is intentionally planned next.
- Which commands are valid before and after the backend transition.

## Scope

This change only updates documentation under `docs/`.

It does not:

- Replace the backend implementation.
- Change frontend or backend code.
- Change root `AGENTS.md` or frontend agent instructions.
- Add database, auth, or API behavior.

## Current Problems

- `docs/project-context.md` still says the frontend uses pnpm, but the current frontend uses npm.
- `docs/project-context.md` describes the backend as .NET without explaining the NestJS transition decision.
- `docs/ideas.md` lists next work, but the highest-priority backend replacement decision is not visible.
- `docs/development-flow.md` has executable .NET backend commands, but does not tell readers that those commands are temporary until the NestJS migration.
- `docs/vibe-coding.md` has backend examples that sound .NET-specific, even though the next backend work is likely NestJS.

## Proposed Documentation Shape

### `docs/README.md`

Keep this as the docs index. Add a short note that the docs distinguish between:

- Current implementation.
- Decided transition direction.
- Open product and architecture questions.

### `docs/project-context.md`

Make this the source of truth for product and architecture context.

It should state:

- Artpeeker is for saving liked artworks, collections, and viewing notes.
- The frontend is Next.js 16, React 19, TypeScript, Tailwind CSS 4, npm.
- The current backend is a .NET 10 ASP.NET Core API.
- The next backend direction is a full replacement with NestJS.
- The current auth flow is Kakao OAuth with HttpOnly cookie sessions.
- Existing OAuth security behavior should be preserved during the NestJS rewrite.

### `docs/development-flow.md`

Keep currently runnable commands, but label the backend commands as current .NET commands.

Add a short NestJS transition note:

- Before migration: use `dotnet run`, `dotnet build`.
- After migration: update this file to NestJS npm commands.
- Frontend already uses npm.

### `docs/ideas.md`

Keep this as the open product and engineering notebook.

Move the next recommended sequence to:

1. Replace the backend with NestJS while preserving Kakao auth endpoint parity.
2. Keep `/auth/kakao`, `/auth/kakao/callback`, `/auth/kakao/me`, and `/auth/kakao/logout` compatible with the frontend.
3. Decide User and database design after the NestJS base is stable.
4. Add `/me` or `/gallery` as the first logged-in user space.
5. Add saved artwork APIs and empty-state UI.

Update decision records with:

- Frontend package manager changed to npm.
- Backend direction changed from .NET to NestJS.
- Existing Kakao OAuth security behavior must be preserved.

### `docs/vibe-coding.md`

Keep the collaboration guide, but make backend examples less tied to .NET.

Use wording like:

- "현재 .NET 백엔드 작업이라면 `dotnet build`까지"
- "NestJS 전환 후에는 백엔드 명령어를 문서 기준으로 확인"

## Non-Goals

- Do not rewrite docs into a long formal specification.
- Do not remove all references to .NET while the current code is still .NET.
- Do not document imaginary NestJS files as if they already exist.
- Do not choose a database in this docs cleanup.

## Validation

Because this is documentation-only, no frontend or backend build is required.

Validation should include:

- `git diff --check`
- `git status --short`
- Manual scan that docs do not contradict the current repository state.

## Follow-Up

After this docs cleanup is accepted, the next design cycle should cover the NestJS backend replacement itself.
