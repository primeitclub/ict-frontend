/**
 * Platform metadata shared by SocialIcon. Kept in a component-free module so the
 * SocialIcon file can export only its component (react-refresh requirement).
 */

/** Platforms we render an icon for; aliases included (twitter → X, etc.). */
const SUPPORTED = new Set([
  "facebook",
  "instagram",
  "linkedin",
  "x",
  "twitter",
  "tiktok",
  "website",
  "portfolio",
  "globe",
]);

/** Human-readable label per platform, for tooltips / visible text. */
const LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X",
  twitter: "X",
  tiktok: "TikTok",
  website: "Website",
  portfolio: "Portfolio",
  globe: "Website",
};

export const normalizePlatform = (platform: string): string =>
  platform.trim().toLowerCase();

export const hasSocialIcon = (platform: string): boolean =>
  SUPPORTED.has(normalizePlatform(platform));

export const getSocialLabel = (platform: string): string =>
  LABELS[normalizePlatform(platform)] ?? platform;
