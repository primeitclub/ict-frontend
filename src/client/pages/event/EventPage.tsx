import { useState } from "react";
import EventSwiper from "./components/EventSwiper";
import CategoryTabs from "./components/CategoryTabs";
import EventGrid from "./components/EventGrid";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA]">
      <EventSwiper />
      <div className="bg-[#F2F5FA] text-black pt-[3vh] md:pt-[10vh]">
        <div className="mx-auto max-w-7xl px-4 py-16 ">
          <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <EventGrid activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
