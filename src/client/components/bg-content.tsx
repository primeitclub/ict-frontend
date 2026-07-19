import type React from "react";
import { cn } from "../../shared/utils/cn";
import SectionContainer from "./sectionContainer";

interface ByContentProps {
  position?: "relative" | "absolute";
  children?: React.ReactNode;
  className?: string;
  /** Extra classes for the gradient banner itself (e.g. to hide it on mobile). */
  bannerClassName?: string;
  /** Extra classes for the inner SectionContainer holding relative children
      (e.g. to override its large default vertical padding). */
  contentClassName?: string;
  /** Banner background. "gradient" (default) is the navy → accent-dark wash
      used on Register/PaymentSuccess; "black-glow" is pure black with a subtle
      accent-light glow rising from the bottom (events-page highlights). */
  variant?: "gradient" | "black-glow";
}

const BANNER_BACKGROUNDS: Record<
  NonNullable<ByContentProps["variant"]>,
  string
> = {
  gradient: `linear-gradient(180deg, #020919 12.28%, var(--color-accent-dark) 209.51%)`,
  // Single top-down wash
  "black-glow": `linear-gradient(180deg, #000 7%, var(--color-accent-dark) 230%)`,
};

const TopBgContent = ({
  position = "relative",
  children,
  className,
  bannerClassName,
  contentClassName,
  variant = "gradient",
}: ByContentProps): React.ReactNode => {
  const child = children as React.ReactNode;

  return (
    <div className={cn("w-full", className)}>
      <div
        style={{
          background: BANNER_BACKGROUNDS[variant],
        }}
        className={cn(
          `${position} h-[250px] md:h-[300px] w-full flex items-center`,
          bannerClassName
        )}
      >
        <SectionContainer as="div" key={"eventPage"} className={cn("w-full", contentClassName)}>
          {position === "relative" && child}
        </SectionContainer>
      </div>
      {position === "absolute" && child}
    </div>
  );
};

export default TopBgContent;
