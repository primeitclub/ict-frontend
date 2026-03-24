import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ArrowSVG from "../icons/arrowSVG";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full text-base">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-1.5 rounded-2xl bg-[#F2F5FA]"
      >
        <span>{value}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-full border rounded-lg z-10 bg-[#DDDDDD] space-y-[3px]">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="flex gap-[8px] items-center bg-[#F2F5FA] hover:bg-[#DBF5FF] border-y-[0.15px] border-y-[#4E81EF] last:border-none first:border-none  rounded-md px-3 py-1.5"
            >
              <ArrowSVG useSolidStroke={true} solidStrokeColor="#000" />
              <span className="">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
