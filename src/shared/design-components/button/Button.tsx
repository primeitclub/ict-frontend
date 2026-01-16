import React from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "filled" | "outlined";

type ButtonSize = "base" | "small" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
   */
  rightIcon?: React.ReactNode;

  /**
   * Button content
   */
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      size = "base",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles - consistent across all buttons
    const baseStyles =
      "font-sans font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed";

    // Variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      filled:
        "bg-btn-primary hover:bg-btn-primary-hover text-white shadow-md hover:shadow-lg focus:ring-btn-primary",
      outlined:
        "bg-btn-secondary hover:bg-btn-secondary-hover text-white shadow-md hover:shadow-lg focus:ring-btn-secondary",
    };

    // Size styles - controls height, padding, and font-size
    const sizeStyles: Record<ButtonSize, string> = {
      small: "h-8 px-3 text-sm",
      base: "h-10 px-4 text-base",
      large: "h-12 px-6 text-lg",
    };

    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";

    // Combine all styles
    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyles,
      className
    );

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
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
