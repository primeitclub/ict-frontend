# Hide elements on archived versions — design

**Date:** 2026-07-25
**Branch:** SaugatDev

## Problem

When a flagship-event version is **archived**, certain calls-to-action and pages
no longer make sense — the event is over, so there's nothing to register for,
sponsor, or ask about. These should be hidden on every archived edition.

In the API, a version's `status` becomes `archived` both when an admin archives
it and automatically when a newer version is activated (the previously-current
version is set to `is_current = false, status = "archived"`). So **"archived"
covers all past editions (v5–v7)** as well as a manually-archived current one.
That is the intended scope: hide on *any* archived version.

## Elements to hide when the viewed version is archived

1. **Contacts page** — nav links (navbar + footer) removed; the `/contacts`
   route redirects to that version's home.
2. **"Join Our Sponsors" card** on the Sponsors page.
3. **"Register Now" and "Be a Sponsor" buttons** in the home hero section.
4. **"Got Any Queries?" button** in the event-detail page.

## Core mechanism

Every version record already carries `status: "active" | "archived" | "draft"`,
and `useVersionData` already fetches that record (`currentVersion` for the
latest edition, `versionBySlug` for past editions). Both endpoints serialize the
full entity, so `status` is already present in the response — **no API changes.**

Changes:

- **`src/client/hooks/use-version-data.ts`** — add `status` to the
  `VersionRecord` interface and return `status` plus a derived
  `isArchived: boolean` (`status === "archived"`).
- **`src/client/hooks/use-is-archived-version.ts`** (new) — a small semantic
  hook returning `{ isArchived, isLoading }`, mirroring the existing
  `useCurrentEditionHasNoEvents` / `useActiveVersionHasNoTeams` hooks. This is
  the single source of truth every target reads from.

## Per-target changes

### 1. Hero CTAs — `pages/home/sections/landing-section/LandingSection.tsx`

- Fold `isArchived` into the existing `hideRegister` decision (currently just
  `useCurrentEditionHasNoEvents()`).
- Wrap the **entire** button-row `<div>` in `{!isArchived && ( … )}` so an
  archived version leaves no empty padded row. Inside it, "Register Now" stays
  gated by `hideRegister`; "Be a Sponsor" always shows when not archived.

### 2. "Join Our Sponsors" card — `pages/sponsors/Sponsors.tsx`

`renderBecomeSponsorCard()` is invoked in two branches:

- **Has sponsors** branch: render the card only when `!isArchived`.
- **No sponsors** branch (currently renders *only* the card): if `isArchived`,
  render a quiet empty state — a simple centered "No sponsors" line — instead of
  the card. If not archived, keep the card as today.

`isArchived` comes from the same version query already gating the page's
`isLoading` spinner, so status is known by the time content renders.

### 3. "Got Any Queries?" button — `pages/event-detail/components/SeatsAndQueryCard.tsx`

Read `useIsArchivedVersion()` (the component already uses `useVersion`). Wrap the
`<Link to={getPath("/contacts")}>` block in `{!isArchived && ( … )}`.

### 4. Contacts page

- **Nav links** — remove the `{ path: "/contacts", label: "Contacts" }` entry
  from the `pages` array in `Navbar.tsx` and `Footer.tsx` when archived, using
  the same conditional-spread style already used for Events/Teams. The footer's
  static "Contact Us" info column (phone/email) is unrelated and stays.
- **Route redirect** — in `ContactUs.tsx`, gate on load:
  - while `isLoading` → render nothing (avoid rendering the page then yanking it);
  - if `isArchived` → `<Navigate to={getPath("/")} replace />`;
  - otherwise → render the page as today.

  This bounces both `/contacts` (latest) and `/v7/contacts` (past editions) to
  that version's home.

## Flash handling

For the hide-decisions (hero, sponsors card, queries button, nav links),
`isArchived` defaults to `false` while the version query is in flight. The
common active-version case therefore never flickers; an archived edition may
show an element for one frame before it hides — consistent with how the existing
empty-state hooks favor showing-while-loading.

The **Contacts route redirect** is the deliberate exception: it waits for load
before deciding, so the page is never rendered and then redirected away.

## Out of scope

- No API/backend changes.
- No change to how versions are archived or to the version list/rail UI.
- Footer's static "Contact Us" info column is untouched.
