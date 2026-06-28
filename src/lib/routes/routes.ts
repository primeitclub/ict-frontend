const API_ROUTES = {
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
} as const 

export default API_ROUTES;