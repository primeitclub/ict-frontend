import { cn } from "../../../../shared/utils/cn";
import { getImageUrl } from "../../../../lib/imageUtils";

// Bundled asset fallbacks were removed; the club logo in /public is the
// last-resort image when no edition logo is configured.
const FALLBACK_LOGO = "/logo.png";

interface Logo2Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  src?: string | null;
  /**
   * When true, the edition logo hasn't resolved yet. We render an invisible,
   * space-reserving placeholder instead of the bundled fallback so the real
   * logo doesn't flash a different image on reload.
   */
  loading?: boolean;
}

const SIZE_CLASS: Record<NonNullable<Logo2Props["size"]>, string> = {
  sm: "h-8",
  md: "h-8 sm:h-12",
  lg: "h-10 sm:h-12 lg:h-14",
};

export default function Logo2({ className, size = "md", src, loading }: Logo2Props) {
  if (loading) {
    return (
      <div
        aria-hidden
        className={cn("w-[120px] max-w-full", SIZE_CLASS[size], className)}
      />
    );
  }
  return (
    <img
      src={src ? getImageUrl(src) : FALLBACK_LOGO}
      alt="logo"
      className={cn("object-contain w-auto", SIZE_CLASS[size], className)}
    />
  );
}
