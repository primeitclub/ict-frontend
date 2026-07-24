import { CircleArrowRight } from "lucide-react";
import { useId } from "react";

interface CategoryArrowProps {
  /** Active tab → solid light arrow. Inactive → gradient. */
  active: boolean;
}

/**
 * Standardized category arrow (lucide `CircleArrowRight`), rotated exactly like
 * the event / overview tabs: tilted -45° at rest, straightening on hover.
 *
 * Keeps the Teams palette — solid #DBF5FF when active, a cyan→blue gradient
 * stroke when inactive. lucide's `color` prop maps to `stroke` and it renders
 * `children` after the icon paths, so the gradient is supplied as a `<defs>`
 * child and referenced via `url(#id)`. The gradient uses `userSpaceOnUse` (the
 * 0–24 viewBox space) so it paints the whole glyph uniformly — with the default
 * `objectBoundingBox` the arrow's straight sub-strokes have a degenerate bbox
 * and don't render, which made the arrow look like a broken hook.
 *
 * The gradient id is per-instance (useId, colons stripped so it's a valid
 * `url(#…)` fragment) — the old hand-rolled SVG hardcoded one id shared by every
 * arrow on the page.
 */
export default function CategoryArrow({ active }: CategoryArrowProps) {
  const gradientId = `team-arrow-${useId().replace(/:/g, "")}`;

  return (
    <CircleArrowRight
      size={16}
      color={active ? "#DBF5FF" : `url(#${gradientId})`}
      className={`shrink-0 transition-transform duration-700 ${
        active ? "rotate-0" : "-rotate-45 group-hover:rotate-0"
      }`}
    >
      {!active && (
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="4"
            y1="20"
            x2="20"
            y2="4"
          >
            <stop stopColor="#DBF5FF" />
            <stop offset="1" stopColor="#51A7FF" />
          </linearGradient>
        </defs>
      )}
    </CircleArrowRight>
  );
}
