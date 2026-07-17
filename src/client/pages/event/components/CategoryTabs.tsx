import { CircleArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { EventCategory } from "../useEvents";

interface CategoryTabsProps {
  categories: EventCategory[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
  isLoading?: boolean;
  /** Horizontal alignment of the tabs. Defaults to "center". */
  align?: "start" | "center";
}

const CategoryTabs = ({
  categories,
  activeCategoryId,
  onSelect,
  isLoading,
  align = "center",
}: CategoryTabsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const allOption = { id: "all", displayName: "All" };
  const options = [allOption, ...categories];
  const activeLabel =
    options.find((o) => o.id === activeCategoryId)?.displayName ?? "All";

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
  };

  if (isLoading) return null;

  return (
    <div className="mt-0 mb-8 sm:mb-12 px-1 sm:px-4">
      {/* --- MOBILE DROPDOWN --- */}
      <div
        className={`md:hidden relative max-w-[300px] sm:max-w-none ${
          align === "start" ? "mr-auto" : "mx-auto"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[34px] bg-[#3571F0] hover:bg-[#184EBF] text-white px-4 rounded-full flex items-center justify-between transition-colors duration-200 text-sm font-semibold shadow-md"
        >
          <span className="truncate pr-2">{activeLabel}</span>
          <ChevronDown
            size={16}
            className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden p-1">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`w-full h-[34px] text-left px-3 rounded-2xl flex items-center gap-2 transition-colors mb-1 last:mb-0 ${
                  activeCategoryId === opt.id
                    ? "text-white bg-[#3571F0]"
                    : "text-black hover:bg-gray-50"
                }`}
              >
                <CircleArrowRight
                  size={16}
                  className={`shrink-0 transition-transform duration-700 ${
                    activeCategoryId === opt.id
                      ? "text-white rotate-0"
                      : "text-black -rotate-45"
                  }`}
                />
                <span className="text-sm">{opt.displayName}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- DESKTOP TABS --- */}
      <div
        className={`hidden md:flex flex-wrap gap-x-12 gap-y-6 text-xl font-bold pb-4 ${
          align === "start" ? "justify-start" : "justify-center"
        }`}
      >
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`group transition-transform duration-200 flex gap-3 items-center whitespace-nowrap hover:text-[#3571F0] ${
              activeCategoryId === opt.id ? "text-[#3571F0]" : "text-black"
            }`}
          >
            <CircleArrowRight
              size={24}
              className={`transition-transform duration-700 ${
                activeCategoryId === opt.id
                  ? "text-[#3571F0]"
                  : "text-black -rotate-45 group-hover:rotate-0 group-hover:text-[#3571F0]"
              }`}
            />
            {opt.displayName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
