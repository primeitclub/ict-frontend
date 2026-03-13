import React from "react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Icon to display on the left side of the input.
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side of the input.
   */
  rightIcon?: React.ReactNode;

  /**
   * Error message to display below the input.
   */
  error?: string;

  /**
   * Label for the input.
   */
  label?: string;

  /**
   * Whether the input should take full width of its container.
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Container class name.
   */
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftIcon,
      rightIcon,
      error,
      label,
      fullWidth = true,
      className,
      containerClassName,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id || React.useId();

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-white/80 transition-colors"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center text-white/50 group-focus-within:text-white transition-colors duration-200 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50 focus-visible:border-btn-primary transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center text-white/50 group-focus-within:text-white transition-colors duration-200 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-red-500 font-medium px-1">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
