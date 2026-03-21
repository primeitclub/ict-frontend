import { CircleArrowRight } from "lucide-react";
import { tabs } from "../data";

interface CategoryTabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const CategoryTabs = ({ activeTab, setActiveTab }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap md:flex md:flex-wrap gap-x-12 gap-y-6 text-xl justify-center font-bold mb-12 pb-4 mt-20">
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
  );
};

export default CategoryTabs;
