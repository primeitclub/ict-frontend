import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import type { MiddlewareReturn } from "@floating-ui/core";
import type { MiddlewareState } from "@floating-ui/dom";

interface DatePickerProps {
  label: string;
  selected?: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  placeholderText?: string;
}

const DatePicker = ({
  label,
  selected,
  onChange,
  error,
  placeholderText = "Select date",
}: DatePickerProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative group">
        <ReactDatePicker
          selected={selected}
          onChange={onChange}
          placeholderText={placeholderText}
          className={`w-full bg-[#02111F] border ${
            error ? "border-red-500" : "border-gray-800"
          } rounded-lg p-2.5 text-white text-sm focus:border-admin-secondary hover:border-gray-700 outline-none transition-all duration-200 pr-10 cursor-pointer`}
          dateFormat="yyyy-MM-dd"
          autoComplete="off"
          popperPlacement="bottom-start"
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
              fn: function (
                _state: MiddlewareState,
              ): MiddlewareReturn | Promise<MiddlewareReturn> {
                throw new Error("Function not implemented.");
              },
            },
          ]}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-admin-secondary transition-colors duration-200 pointer-events-none">
          <Calendar size={18} />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default DatePicker;
