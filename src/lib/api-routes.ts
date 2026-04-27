/**
 * Type-safe API route definitions.
 *
 * All API paths are defined here as a single `as const` object.
 * The `${variable}` syntax marks dynamic path segments that will
 * be interpolated at runtime and type-checked at compile time.
 *
 * Usage:
 *   API_ROUTES.events       → "/events"
 *   API_ROUTES.eventDetail  → "/events/${eventId}"  (requires pathParams.eventId)
 */

export const API_ROUTES = {
  // ─── Auth ─────────────────────────────────────────────────────────────────
  login: "/auth/login",
  logout: "/auth/logout",

  // ─── Versions ─────────────────────────────────────────────────────────────
  versions: "/flagship-event/versions",
  versionDetail: "/flagship-event/versions/${id}",
  currentVersion: "/flagship-event/versions/current",
  versionBySlug: "/flagship-event/versions/slug/${slug}",

  // ─── Events ───────────────────────────────────────────────────────────────
  events: "/events",
  eventDetail: "/events/${eventId}",

  // ─── Speakers ─────────────────────────────────────────────────────────────
  speakers: "/speakers",
  speakerDetail: "/speakers/${speakerId}",

  // ─── Teams ────────────────────────────────────────────────────────────────
  teams: "/teams",
  teamDetail: "/teams/${teamId}",

  // ─── Sponsors ─────────────────────────────────────────────────────────────
  sponsorCategories: "/sponsor-categories",
  sponsorCategoryDetail: "/sponsor-categories/${categoryId}",
  sponsors: "/sponsors",
  sponsorDetail: "/sponsors/${sponsorId}",

  // ─── Content ──────────────────────────────────────────────────────────────
  hero: "/content/hero",
  about: "/content/about",
  gallery: "/content/gallery",
  faqs: "/content/faqs",

  // ─── Settings ─────────────────────────────────────────────────────────────
  socialMedia: "/settings/social-media",
  contacts: "/settings/contacts",
  payments: "/settings/payments",
} as const;

/**
 * Type of the API_ROUTES object.
 * Used to constrain generic parameters in hooks.
 */
export type ApiRoutes = typeof API_ROUTES;

/**
 * All valid route keys — e.g. "events" | "eventDetail" | "speakers" | ...
 */
export type ApiRouteKey = keyof ApiRoutes;
