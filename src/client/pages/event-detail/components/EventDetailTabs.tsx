import { useState } from "react";
import { EventsOverview } from "./EventOverview";
import { SpeakerOverview } from "./SpeakerOverview";
import { CircleArrowRight } from "lucide-react";
import type { EventDetailData } from "../useEventDetail";

type TabId = "events" | "speaker";

const TABS: { id: TabId; label: string }[] = [
  { id: "events", label: "Events Overview" },
  { id: "speaker", label: "Speakers Overview" },
];

interface EventDetailTabsProps {
  event: EventDetailData;
}

export const EventDetailTabs = ({ event }: EventDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("events");

  return (
    <div className="flex-1">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-300">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center gap-2 px-4 py-3 text-[15px] lg:text-xl font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "text-[#3571F0] border-[#3571F0]"
                : "text-gray-800 border-transparent"
            }`}
          >
            <CircleArrowRight
              size={24}
              className={`transition-transform duration-700 ${
                activeTab === tab.id
                  ? "text-[#3571F0]"
                  : "text-black -rotate-45 group-hover:rotate-0 hover:text-[#3571F0]"
              }`}
            />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === "events" && (
          <div className="flex flex-col gap-8">
            <EventsOverview event={event} />
          </div>
        )}
        {activeTab === "speaker" && <SpeakerOverview event={event} />}
      </div>
    </div>
  );
};
