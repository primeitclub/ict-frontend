import React from "react";
import { cn } from "../../../../shared/utils/cn";

type ButtonVariant = "active" | "inactive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Label text for the button.
   * If provided, it overrides children.
   */
  label?: string;

  /**
   * Visual style variant of the button
   * @default 'active'
   */
  variant?: ButtonVariant;
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;
}

const FilterButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, variant = "active", leftIcon, className = "", ...props }, ref) => {
    // Base styles - consistent across all buttons
    const baseStyles =
      "group font-sans text-xs px-[11.62px] py-[5.86px] flex w-fit overflow-hidden font-medium rounded-full transition-all duration-300 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0";

    // Variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      active:
        "bg-btn-primary hover:bg-btn-primary-hover text-white shadow-md hover:shadow-lg focus:ring-btn-primary border border-transparent",
      inactive:
        "bg-white/10 backdrop-blur-md border-[0.15px] border-white/30 text-white hover:bg-white/20 shadow-lg hover:shadow-xl bg-transparent",
    };

    // Combine all styles
    const combinedClassName = cn(baseStyles, variantStyles[variant], className);

    if (variant === "inactive") {
      return (
        <button
          ref={ref}
          type="button"
          className={combinedClassName}
          {...props}
        >
          <div className="absolute inset-[-2.1px] rounded-[inherit] z-[2] shadow-[inset_2px_2px_2px_#4e81ef,inset_-2px_-2px_1px_#4e81ef]"></div>
          <div className="relative gap-[8.72px] flex items-center ">
            {leftIcon} {label}
          </div>
        </button>
      );
    }

    return (
      <button ref={ref} type="button" className={combinedClassName} {...props}>
        <>
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {label}
        </>
      </button>
    );
  },
);

FilterButton.displayName = "Button";

export default FilterButton;
