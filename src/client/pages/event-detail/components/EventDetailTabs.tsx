import { useState } from "react";
import { EventsOverview } from "./EventOverview";
import { SpeakerOverview } from "./SpeakerOverview";

type TabId = "events" | "speaker";

const TABS: { id: TabId; label: string }[] = [
  { id: "events", label: "Events Overview" },
  { id: "speaker", label: "Speaker Overview" },
];

export const EventDetailTabs = () => {
  const [activeTab, setActiveTab] = useState<TabId>("events");

  return (
    <div className="flex-1">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-300">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-[15px] text-xl font-semibold transition-colors border-b-2 -mb-px ${
                isActive
                  ? "text-[#3571F0] border-[#3571F0]"
                  : "text-gray-400 border-transparent hover:text-gray-800"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8l4 4-4 4M8 12h8"
                />
              </svg>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === "events" && (
          <div className="flex flex-col gap-8">
            <EventsOverview />
          </div>
        )}
        {activeTab === "speaker" && <SpeakerOverview />}
      </div>
    </div>
  );
};
