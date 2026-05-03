import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.name} className="text-sm text-gray-400 mb-1 block">{label}</label>
        )}
        <input
          ref={ref}
          id={props.name}
          className={`w-full bg-[#02111F] border ${
            error ? "border-red-500" : "border-gray-800"
          } rounded-lg p-2.5 text-white text-sm focus:border-admin-secondary outline-none transition-colors ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
export default Input;
