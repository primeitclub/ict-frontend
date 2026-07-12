# CLAUDE.md
ICT Meetup frontend — public-facing site for the ICT Meetup event series. Built with React + Vite + TypeScript. Supports multiple past editions (v5–v8) under version-prefixed routes, with the latest (v8) served at `/`.

## Commands

```bash
yarn dev       # starts dev server at localhost:5173, proxies /api → localhost:4000
yarn build     # tsc -b + vite build
yarn lint      # ESLint — zero warnings allowed
yarn preview   # preview the production build locally
```

Lint runs automatically on staged `.ts`/`.tsx` files via Husky before each commit. No test runner.

## Environment

`.env` must have:
```
VITE_API_BASE_URL=http://localhost:4000/api
```

The Vite proxy rewrites `/api/*` → `http://localhost:4000/*` so you don't hit CORS during dev.

---

## File Structure

```
src/
├── App.tsx                          # mounts one ClientRouter per version (v5–v8)
├── main.tsx
├── index.css
│
├── global-wrappers/
│   ├── AppProvider.tsx              # React Query + error boundary wrapper
│   ├── ErrorBounds.tsx
│   ├── ErrorFallback.tsx
│   └── ScrollToTop.tsx
│
├── lib/                             # data layer
│   ├── api-client.ts                # ictClient — fetch wrapper with 401 retry + auth event
│   ├── api-routes.ts                # API_ROUTES const object — all backend paths
│   ├── use-api-query.ts             # useApiQuery — typed GET hook via React Query
│   ├── use-api-mutation.ts          # useApiMutation — POST/PUT/PATCH/DELETE hook
│   ├── types/index.ts               # ExtractPathParams — compile-time path variable types
│   ├── routes/routes.ts             # frontend route paths
│   ├── query/use-ict-query.ts
│   └── index.ts
│
├── client/
│   ├── routes/
│   │   ├── ClientRouter.tsx         # per-version router
│   │   ├── VersionContext.tsx       # getPath / navigateToVersion / useVersion
│   │   ├── route-type.ts            # VERSIONS, LATEST_VERSION
│   │   └── version-utils.ts
│   │
│   ├── hooks/
│   │   ├── CheckResponsive.tsx
│   │   └── use-version-data.ts
│   │
│   ├── components/                  # small shared UI pieces used across pages
│   │   ├── bg-content.tsx
│   │   ├── card.tsx
│   │   ├── section-header.tsx
│   │   ├── sectionContainer.tsx
│   │   └── icon/
│   │       ├── eventIcon.tsx
│   │       └── svgIcon.tsx
│   │
│   ├── layouts/
│   │   ├── PageLayout.tsx
│   │   ├── headers/
│   │   │   ├── Navbar.tsx
│   │   │   └── Logo/Logo2.tsx
│   │   ├── footer/Footer.tsx
│   │   └── version-navigate/VersionNavigate.tsx
│   │
│   └── pages/
│       ├── index.ts
│       │
│       ├── home/
│       │   ├── HomePage.tsx
│       │   ├── useHome.ts           # single data source for the whole landing page
│       │   ├── types.ts
│       │   ├── index.ts
│       │   └── sections/
│       │       ├── landing-section/
│       │       │   ├── LandingSection.tsx
│       │       │   └── component/swiper-content.tsx
│       │       ├── about-section/
│       │       │   ├── AboutSection.tsx
│       │       │   ├── components/  (AboutContent, AboutImage, SocialLinks)
│       │       │   ├── data/
│       │       │   └── types/
│       │       ├── speaker-section/
│       │       │   ├── SpeakerSection.tsx
│       │       │   └── SpeakerCard.tsx
│       │       ├── sponser-section/
│       │       │   └── SponserSection.tsx
│       │       ├── highlight-section/
│       │       │   ├── HighlightSection.tsx
│       │       │   ├── components/  (NavButton, SwiperCarousel)
│       │       │   ├── data/
│       │       │   └── types/
│       │       ├── gallery-section/
│       │       │   ├── GallerySection.tsx
│       │       │   ├── components/GalleryCard.tsx
│       │       │   ├── data/
│       │       │   └── types/
│       │       └── faq-section/
│       │           ├── FaqSection.tsx
│       │           └── FaqItems.tsx
│       │
│       ├── event/
│       │   ├── EventPage.tsx
│       │   ├── useEvents.ts
│       │   ├── components/  (CategoryTabs, EventGrid, EventSwiper)
│       │   ├── data/
│       │   ├── types/
│       │   └── index.ts
│       │
│       ├── event-detail/
│       │   ├── useEventDetail.ts
│       │   ├── components/  (Banner, Tabs, Overview, SpeakerCard, SpeakerOverview, SeatsAndQueryCard)
│       │   ├── data/
│       │   └── types/
│       │
│       ├── register/
│       │   ├── Register.tsx
│       │   ├── PaymentSuccess.tsx
│       │   ├── components/  (InputBox, Payment)
│       │   └── icons/       (Academic, Events, personal, Upload)
│       │
│       ├── sponsors/
│       │   ├── Sponsors.tsx
│       │   ├── SponsorData.tsx
│       │   ├── GlowCircle.tsx
│       │   └── index.ts
│       │
│       ├── teams/
│       │   ├── Teams.tsx
│       │   ├── components/  (Dropdown, TeamButton, teamCard)
│       │   ├── icons/       (arrowSVG, linkedIn)
│       │   └── index.ts
│       │
│       └── contact-us/
│           ├── ContactUs.tsx
│           ├── components/DepartmentCard.tsx
│           ├── data/
│           └── types/
│
├── shared/
│   ├── design-components/           # base UI primitives
│   │   ├── button/  (Button, ViewMoreButton)
│   │   ├── heading/Heading.tsx
│   │   ├── input/Input.tsx
│   │   ├── text/Text.tsx
│   │   ├── toast/Toast.tsx
│   │   ├── rich-text/RichText.tsx
│   │   ├── svgs/loading.tsx
│   │   └── index.ts
│   ├── layouts/index.ts
│   └── utils/cn.tsx                 # clsx + tailwind-merge — use this for all class names
│
└── assets/
    ├── images/                      # webp/svg gallery images (image1–8, img1–8)
    ├── icons/EmptyCart.tsx
    └── *.{svg,png}                  # logos, social icons, misc
```

---

## How things connect

**Versioning** — `App.tsx` mounts a `ClientRouter` for each version. Old versions (`v5`–`v7`) get a `/<version>/*` prefix; `v8` takes `/*`. Inside each router, `VersionProvider` exposes `useVersion()`, `getPath(path)`, and `navigateToVersion(v)`. Version constants live in `src/client/routes/route-type.ts`.

**API layer** — `ictClient` in `src/lib/api-client.ts` handles all fetches. It always sends `credentials: "include"` for cookie auth, auto-retries once on 401 by hitting `POST /auth/refresh-token`, and fires an `"ict-auth-failure"` custom event if the refresh fails. All route strings are in `API_ROUTES` (`src/lib/api-routes.ts`) as a `const` object — dynamic segments use `${varName}` syntax and the types in `src/lib/types/index.ts` extract those at compile time so hooks enforce correct `pathParams`.

**Data hooks** — two hooks wrap `ictClient`:
- `useApiQuery(routeKey)` — GET, backed by React Query. Routes with path params require `pathParams`; routes without reject it at the type level.
- `useApiMutation(routeKey)` — POST/PUT/PATCH/DELETE. Pass `invalidateRoutes` to auto-refetch on success.

**Home page** — `useHome` is the single data source for the entire landing page. All sections share one React Query cache key (`["home", "current"]` for latest, `["home", versionSlug]` for old ones) and use a `select` callback to read only their slice.

**Response envelope** — the backend wraps everything as `{ status, message, data }`. `useHome` unwraps `.data`; other hooks get the raw envelope, so check per-page usage before assuming shape.

**Styling** — Tailwind. Use `cn()` from `src/shared/utils/cn.tsx` (clsx + tailwind-merge) for any conditional class logic.

**Path alias** — `@/*` maps to `src/*`, set in both `tsconfig.app.json` and `vite.config.ts`.
