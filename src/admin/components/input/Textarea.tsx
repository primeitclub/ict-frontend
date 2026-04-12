import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full bg-[#02111F] border ${
            error ? "border-red-500" : "border-gray-800"
          } rounded-lg p-2.5 text-white text-sm focus:border-admin-secondary outline-none transition-colors min-h-[120px] resize-y ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
export default Textarea;
