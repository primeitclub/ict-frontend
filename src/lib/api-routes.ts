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
  eventCategories: "/events/category",

  // ─── Event Registrations ──────────────────────────────────────────────────
  eventRegistrations: "/event-registrations",
  eventRegistrationDetail: "/event-registrations/${registrationId}",

  // ─── Speakers ─────────────────────────────────────────────────────────────
  speakers: "/speakers",
  speakerDetail: "/speakers/${speakerId}",

  // ─── Teams ────────────────────────────────────────────────────────────────
  teamMembers: "/team-members",
  teamMemberDetail: "/team-members/${teamMemberId}",
  teamMemberCategories: "/team-members/category",

  // ─── Sponsors ─────────────────────────────────────────────────────────────
  sponsorCategories: "/sponsors/category",
  sponsorCategoryDetail: "/sponsors/category/${categoryId}",
  sponsors: "/sponsors",
  sponsorDetail: "/sponsors/${sponsorId}",

  // ─── Content ──────────────────────────────────────────────────────────────
  // Aggregated landing-page content. No slug → current edition; with slug →
  // that specific edition (backend resolves & scopes all sections).
  homeContent: "/content",
  homeContentBySlug: "/content/${slug}",
  hero: "/content/hero",
  heroSections: "/hero-sections",
  heroSectionDetail: "/hero-sections/${id}",
  about: "/content/about",
  gallery: "/content/gallery",
  faqs: "/content/faqs",

  // ─── Settings ─────────────────────────────────────────────────────────────
  settings: "/settings",
  settingDetail: "/settings/${settingId}",
  settingsContacts: "/settings/contacts",
  settingsSocialMedia: "/settings/social-media",
  settingsPayments: "/settings/payments",
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

