import React from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "filled" | "outlined" | "glass" | "solid-white" | "ghost";

type ButtonSize = "base" | "small" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Label text for the button.
   * If provided, it overrides children.
   */
  label?: string;

  /**
   * Visual style variant of the button
   * @default 'filled'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'base'
   */
  size?: ButtonSize;

  /**
   * Whether the button should take full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display after the button text
   * Values:
   * - ReactNode: Custom icon
   * - undefined: Default ChevronRight icon
   * - null / false: No icon
   */
  rightIcon?: React.ReactNode | boolean;

  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant = "filled",
      size = "base",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      loadingText,
      ...props
    },
    ref,
  ) => {
    // Base styles - consistent across all buttons
    const baseStyles =
      "group font-sans font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0";

    // Variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      filled:
        "bg-btn-primary hover:bg-btn-primary-hover text-white shadow-md hover:shadow-lg focus:ring-btn-primary border border-transparent",
      outlined:
        "bg-btn-secondary hover:bg-btn-secondary-hover text-white shadow-md hover:shadow-lg focus:ring-btn-secondary border border-transparent",
      glass:
        "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 shadow-lg hover:shadow-xl",
      "solid-white":
        "bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl border border-transparent",
      ghost:
        "bg-transparent text-black hover:bg-black/10 shadow-none border border-transparent",
    };

    // Size styles - controls height, padding, and font-size
    const sizeStyles: Record<ButtonSize, string> = {
      small: "h-8 px-4 text-xs",
      base: "h-10 px-5 text-md",
      large: "h-12 px-8 text-lg",
    };

    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";

    // Combine all styles
    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyles,
      className,
    );

    if (variant === "glass") {
      return (
        <button
          ref={ref}
          type="button"
          disabled={disabled || isLoading}
          className={cn(
            "glass-container group hover:bg-glow-secondary transition-colors duration-300 hover:text-black",
            className,
          )}
          {...props}
        >
          <div className="glass-specular"></div>
          <div className="glass-content font-bold">
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {label}
            {rightIcon && (
              <span className="inline-flex  transition-transform duration-300 group-hover:translate-x-1">
                {rightIcon}
              </span>
            )}
          </div>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{loadingText || "Loading..."}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {label}
            {rightIcon && (
              <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
