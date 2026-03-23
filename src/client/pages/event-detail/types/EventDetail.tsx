import { EventDetailBanner } from "../components/EventDetailBanner";
import { SeatsAndQueryCard } from "../components/SeatsAndQueryCard";
import SectionContainer from "../../../../shared/layouts/sectionContainer";
import { EventDetailTabs } from "../components/EventDetailTabs";

export default function EventsDetail() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA]">
      <EventDetailBanner />

      <SectionContainer className="px-4 md:px-10 py-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Left — Tabs (full width on mobile, flex-1 on desktop) */}
        <EventDetailTabs />

        {/* Right — Sidebar (full width on mobile, fixed width on desktop) */}
        <div className="w-full md:w-72 md:flex-shrink-0 md:pt-14">
          <SeatsAndQueryCard />
        </div>
      </SectionContainer>
    </div>
  );
}
