# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Dev server at localhost:5173 (proxies /api → localhost:4000)
yarn build        # tsc -b + vite build
yarn lint         # ESLint (0 warnings allowed — enforced by lint-staged on commit)
yarn preview      # Preview production build
```

No test runner is configured. Lint runs automatically on staged `.ts`/`.tsx` files via Husky pre-commit.

## Environment

`.env` must contain:
```
VITE_API_BASE_URL=http://localhost:4000/api
```

The Vite dev server proxy rewrites `/api/*` → `http://localhost:4000/*`, so during dev you can also hit the backend via `/api/...` without CORS issues.

## Architecture

### Routing — version-aware public site

`App.tsx` mounts a `ClientRouter` for each supported version (`v5`–`v8`). Old versions get an explicit `/<version>/*` prefix; the latest (`v8`) claims `/*`. Each `ClientRouter` is wrapped in `VersionProvider` (see `src/client/routes/VersionContext.tsx`), which exposes:

- `getPath(path)` — prefixes the path with `/<version>/` for old versions, bare `/` for latest
- `navigateToVersion(newVersion)` — switches version while preserving the current page
- `useVersion()` — consume anywhere inside a route tree

Version strings are defined in `src/client/routes/route-type.ts`. To add a new version, add it to `VERSIONS` and update `LATEST_VERSION`.

### Data fetching

All API calls go through `src/lib/api-client.ts` (`ictClient`). It:
- Sends `credentials: "include"` for httpOnly cookie auth
- On 401, auto-retries once after calling `POST /auth/refresh-token`
- On refresh failure, emits `"ict-auth-failure"` custom event (hook up a redirect to login if/when auth is added)

Route strings live in `src/lib/api-routes.ts` as a `const` object. Dynamic segments use `${variableName}` template syntax; the type system (`src/lib/types/index.ts`) extracts those variables at compile time so hooks enforce correct `pathParams`.

Two data hooks wrap `ictClient`:

**`useApiQuery(routeKey)`** (`src/lib/use-api-query.ts`) — GET requests via React Query. Routes with path variables require `pathParams`; routes without forbid it (type-enforced).

```ts
const { data } = useApiQuery("events")<Event[]>();
const { data } = useApiQuery("eventDetail")<Event>({ pathParams: { eventId: "42" } });
```

**`useApiMutation(routeKey)`** (`src/lib/use-api-mutation.ts`) — POST/PUT/PATCH/DELETE. Accepts `invalidateRoutes` to auto-refetch related queries on success.

```ts
const { execute } = useApiMutation("events")<Event, CreatePayload>({ method: "POST" });
```

### Home page data pattern

`useHome` (`src/client/pages/home/useHome.ts`) is the single data source for the entire landing page. All home sections share one React Query cache entry (`["home", "current"]` for the latest edition, `["home", versionSlug]` for old ones). Each section passes a `select` callback to read only its slice — React Query memoizes the transform.

The backend wraps all responses as `{ status, message, data }`. `useHome` unwraps `.data`; other hooks receive the raw envelope (check per-page usage).

### Shared utilities

- `cn(...inputs)` in `src/shared/utils/cn.tsx` — clsx + tailwind-merge; use for all conditional class names
- `src/shared/design-components/` — reusable UI primitives (Button, Input, Heading, Text, Toast, RichText)
- `src/shared/layouts/` — layout exports

### Path alias

`@/*` → `src/*` (configured in both `tsconfig.app.json` and `vite.config.ts`).
