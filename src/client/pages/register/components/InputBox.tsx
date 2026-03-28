import { ChevronDown } from "lucide-react"; // Optional: Use Lucide or a simple SVG

type inputVariant = "radio" | "box" | "select";

interface InputBoxProps {
  inputName: string;
  placeHolder?: string;
  variant: inputVariant;
  options?: string[];
}

const InputBox = ({
  inputName,
  placeHolder,
  variant,
  options = [],
}: InputBoxProps) => {
  // Shared styles for input and select
  const commonInputStyles =
    "w-full border border-[#00000014] px-4 py-2.5 rounded-lg text-sm bg-white outline-none transition-all focus:border-[#1E67FF] focus:ring-1 focus:ring-[#1E67FF] placeholder:text-gray-400";

  if (variant === "box") {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={inputName}
          className="font-medium text-sm text-gray-700"
        >
          {inputName}
        </label>
        <input
          id={inputName}
          type="text"
          className={commonInputStyles}
          placeholder={placeHolder}
        />
      </div>
    );
  }

  if (variant === "select") {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={inputName}
          className="font-medium text-sm text-gray-700"
        >
          {inputName}
        </label>
        <div className="relative">
          <select
            id={inputName}
            className={`${commonInputStyles} appearance-none pr-10 cursor-pointer`}
            defaultValue=""
          >
            <option value="" disabled>
              {placeHolder || "Select an option"}
            </option>
            {options.map((option) => (
              <option key={option} value={option} className="py-2">
                {option}
              </option>
            ))}
          </select>
          {/* Custom Down Arrow Icon */}
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
            <ChevronDown size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    );
  }

  // Radio Variant
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="font-medium text-sm text-gray-700">{inputName}</p>
      <div className="flex gap-6 mt-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="radio"
              name={inputName}
              value={option}
              className="w-4 h-4 accent-[#1E67FF] cursor-pointer"
            />
            <span className="text-sm text-gray-600 group-hover:text-[#1E67FF] transition-colors">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InputBox;
