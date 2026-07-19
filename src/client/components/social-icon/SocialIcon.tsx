import type { CSSProperties } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa6";
import { cn } from "../../../shared/utils/cn";
import { hasSocialIcon, normalizePlatform } from "./socialIcons";

const GLYPH_CLASS = "h-[55%] w-[55%]";

/**
 * Font Awesome (react-icons/fa6) glyph for a platform. Each icon is referenced
 * statically (not via a lookup table) so react's static-components lint rule is
 * satisfied. Returns null for unknown platforms.
 */
function SocialGlyph({ platform }: { platform: string }) {
  switch (normalizePlatform(platform)) {
    case "facebook":
      return <FaFacebookF className={GLYPH_CLASS} aria-hidden />;
    case "instagram":
      return <FaInstagram className={GLYPH_CLASS} aria-hidden />;
    case "linkedin":
      return <FaLinkedinIn className={GLYPH_CLASS} aria-hidden />;
    case "x":
    case "twitter":
      return <FaXTwitter className={GLYPH_CLASS} aria-hidden />;
    case "tiktok":
      return <FaTiktok className={GLYPH_CLASS} aria-hidden />;
    case "website":
    case "portfolio":
    case "globe":
      return <FaGlobe className={GLYPH_CLASS} aria-hidden />;
    default:
      return null;
  }
}

interface SocialIconProps {
  /** Platform name, e.g. "facebook", "x", "website" (case-insensitive). */
  platform: string;
  /**
   * Sizing / extra classes for the circular badge itself (e.g. "w-7 h-7").
   * The badge is a filled #DBF5FF circle; the glyph scales to fit it.
   */
  className?: string;
  style?: CSSProperties;
}

/**
 * A social platform logo rendered consistently across the site as a filled
 * #DBF5FF circle with a dark brand glyph. Returns null for unknown platforms so
 * callers can safely map over arbitrary link lists.
 */
export default function SocialIcon({
  platform,
  className,
  style,
}: SocialIconProps) {
  if (!hasSocialIcon(platform)) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[#DBF5FF] text-[#020919]",
        className,
      )}
      style={style}
    >
      <SocialGlyph platform={platform} />
    </span>
  );
}
