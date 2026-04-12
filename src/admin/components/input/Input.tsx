import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        <input
          ref={ref}
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
