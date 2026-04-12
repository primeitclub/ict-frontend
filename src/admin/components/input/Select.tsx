import { SelectHTMLAttributes, forwardRef } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        <select
          ref={ref}
          className={`w-full bg-[#02111F] border ${
            error ? "border-red-500" : "border-gray-800"
          } rounded-lg p-2.5 text-white text-sm focus:border-admin-secondary outline-none transition-colors ${className}`}
          {...props}
        >
          <option value="" disabled hidden>
            Select an option
          </option>
          {options.map((opt) => (
             <option key={opt.value} value={opt.value}>
               {opt.label}
             </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
export default Select;
