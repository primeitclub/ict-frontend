import React from "react";
import { cn } from "../../utils/cn";

type HeadingLevel = "h1" | "h2" | "h3";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantic heading level (h1-h6)
   * This determines which HTML tag is rendered
   * @default 'h2'
   */
  level?: HeadingLevel;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: "left" | "center" | "right";

  /**
   * Heading content
   */
  children: React.ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { level = "h2", align = "left", children, className = "", ...props },
    ref,
  ) => {
    // Base styles - consistent across all headings
    const baseStyles = "font-bold font-sans tracking-tight";

    // Level-specific styles (font-size, line-height, margin)
    const levelStyles: Record<HeadingLevel, string> = {
      h1: "text-5xl md:text-6xl leading-tight mb-6",
      h2: "text-[32px] md:text-[60px] leading-tight mb-5",
      h3: "text-[28px] md:text-[52px] leading-snug mb-4",
    };

    // Alignment styles
    const alignmentStyles: Record<typeof align, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    // Combine all styles
    const combinedClassName = cn(
      baseStyles,
      levelStyles[level],
      alignmentStyles[align],
      className,
    );

    // Create the appropriate heading element
    const Component = level;

    return (
      <Component ref={ref} className={combinedClassName} {...props}>
        {children}
      </Component>
    );
  },
);

Heading.displayName = "Heading";

export default Heading;
