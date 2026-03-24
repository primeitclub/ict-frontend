import { useState } from "react";
import EventSwiper from "./components/EventSwiper";
import CategoryTabs from "./components/CategoryTabs";
import EventGrid from "./components/EventGrid";
import { ArrowRight } from "lucide-react";
import Button from "../../../shared/design-components/button/Button";
export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA] pb-4">
      <EventSwiper />
      <div className="bg-[#F2F5FA] text-black">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:py-16 md:space-y-10 space-y-12">
          <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <EventGrid activeTab={activeTab} />
          <Button
            className="flex items-center justify-center mx-auto md:hidden"
            rightIcon={
              <div className="bg-[#3571F0] text-white px-1 py-1 rounded-full">
                <ArrowRight size={15} strokeWidth={2} />
              </div>
            }
            label="Load More"
            variant="ghost"
          />
        </div>
      </div>
    </div>
  );
}
