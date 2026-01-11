import React from "react";
import { cn } from "../../utils/cn";

type TextVariant =
  | "body"
  | "lead"
  | "small"
  | "muted"
  | "error"
  | "success"
  | "warning"
  | "info";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";

type TextWeight = "light" | "regular" | "medium" | "semibold" | "bold";

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  /**
   * Visual variant of the text
   * @default 'body'
   */
  variant?: TextVariant;

  /**
   * Size of the text
   * @default 'base'
   */
  size?: TextSize;

  /**
   * Font weight
   * @default 'regular'
   */
  weight?: TextWeight;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: "left" | "center" | "right" | "justify";

  /**
   * Whether to render as inline element (span) instead of block (p)
   * @default false
   */
  inline?: boolean;

  /**
   * Whether to truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Number of lines to clamp (multi-line truncation)
   * If set, overrides truncate prop
   */
  lineClamp?: number;

  /**
   * Text content
   */
  children: React.ReactNode;
}

const Text = React.forwardRef<
  HTMLParagraphElement | HTMLSpanElement,
  TextProps
>(
  (
    {
      variant = "body",
      size = "base",
      weight = "regular",
      align = "left",
      inline = false,
      truncate = false,
      lineClamp,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "font-hubot leading-relaxed";

    // Variant styles (primarily color-based)
    const variantStyles: Record<TextVariant, string> = {
      body: "text-primary",
      lead: "text-primary text-lg md:text-xl",
      small: "text-secondary text-sm",
      muted: "text-tertiary",
      error: "text-error",
      success: "text-success",
      warning: "text-warning",
      info: "text-info",
    };

    // Size styles
    const sizeStyles: Record<TextSize, string> = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    // Weight styles
    const weightStyles: Record<TextWeight, string> = {
      light: "font-light",
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    // Alignment styles
    const alignmentStyles: Record<typeof align, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };

    // Truncation styles
    let truncationStyles = "";
    if (lineClamp) {
      truncationStyles = `line-clamp-${lineClamp}`;
    } else if (truncate) {
      truncationStyles = "truncate";
    }

    // Combine all styles
    // Note: For 'lead' variant, we skip the size styles as it has its own sizing
    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      variant !== "lead" && sizeStyles[size], // Skip size for 'lead' variant
      weightStyles[weight],
      alignmentStyles[align],
      truncationStyles,
      className
    );

    // Create the appropriate element
    const Component = inline ? "span" : "p";

    return (
      <Component ref={ref as any} className={combinedClassName} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export default Text;
