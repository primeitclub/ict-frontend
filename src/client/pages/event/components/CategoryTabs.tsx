import { CircleArrowRight, ChevronDown } from "lucide-react";
import { tabs } from "../data";
import { useState } from "react";

interface CategoryTabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const CategoryTabs = ({ activeTab, setActiveTab }: CategoryTabsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (index: number) => {
    setActiveTab(index);
    setIsOpen(false);
  };

  return (
    <div className="mt-0 sm:mt-20 mb-12 px-1 sm:px-4">
      {/* --- MOBILE DROPDOWN --- */}
      <div className="md:hidden relative mx-auto max-w-[300px] sm:max-w-none">
        <button
          onClick={() => setIsOpen(!isOpen)} 
          className="w-full h-[34px] bg-[#3571F0] hover:bg-[#184EBF] text-white px-4 rounded-full flex items-center justify-between transition-colors duration-200 text-sm font-semibold shadow-md"
        >
          <span className="truncate pr-2">
            {tabs[activeTab]?.title || "All"}
          </span>
          <ChevronDown
            size={16} // Reduced icon size to fit 34px height
            className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden p-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full h-[34px] text-left px-3 rounded-2xl flex items-center gap-2 transition-colors mb-1 last:mb-0 ${
                  activeTab === index
                    ? "text-white bg-[#3571F0]"
                    : "text-black hover:bg-gray-50"
                }`}
              >
                <CircleArrowRight
                  size={16} // Reduced to match height
                  className={`shrink-0 transition-transform duration-700 ${
                    activeTab === index
                      ? "text-white rotate-0"
                      : "text-black -rotate-45"
                  }`}
                />
                <span className="text-sm">{tab.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- DESKTOP TABS --- */}
      <div className="hidden md:flex flex-wrap gap-x-12 gap-y-6 text-xl justify-center font-bold pb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`group transition-transform duration-200 flex gap-3 items-center whitespace-nowrap 
            hover:text-[#3571F0] ${
              activeTab === index ? "text-[#3571F0]" : "text-black"
            }`}
          >
            <CircleArrowRight
              size={24}
              className={`transition-transform duration-700 ${
                activeTab === index
                  ? "text-[#3571F0]"
                  : "text-black -rotate-45 group-hover:rotate-0 group-hover:text-[#3571F0]"
              }`}
            />
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
