import React from "react";
import { cn } from "../../utils/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Heading Variants:
 * - display: Extra large, for hero sections
 * - default: Standard heading styling
 * - subtle: Less prominent headings
 */
type HeadingVariant = "display" | "default" | "subtle";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantic heading level (h1-h6)
   * This determines which HTML tag is rendered
   * @default 'h2'
   */
  level?: HeadingLevel;

  /**
   * Visual variant of the heading
   * @default 'default'
   */
  variant?: HeadingVariant;

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
    {
      level = "h2",
      variant = "default",
      align = "left",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    // Base styles - consistent across all headings
    const baseStyles = "font-bold font-sans tracking-tight";

    // Level-specific styles (font-size, line-height, margin)
    const levelStyles: Record<HeadingLevel, string> = {
      h1: "text-5xl md:text-6xl leading-tight mb-6",
      h2: "text-4xl md:text-5xl leading-tight mb-5",
      h3: "text-3xl md:text-4xl leading-snug mb-4",
      h4: "text-2xl md:text-3xl leading-snug mb-4",
      h5: "text-xl md:text-2xl leading-normal mb-3",
      h6: "text-lg md:text-xl leading-normal mb-3",
    };

    // Variant styles (color and additional styling)
    const variantStyles: Record<HeadingVariant, string> = {
      display: "text-primary font-extrabold",
      default: "text-primary font-bold",
      subtle: "text-secondary font-semibold",
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
      variantStyles[variant],
      alignmentStyles[align],
      className
    );

    // Create the appropriate heading element
    const Component = level;

    return (
      <Component ref={ref} className={combinedClassName} {...props}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
