import { useParams } from "react-router-dom";
import { EventDetailBanner } from "../components/EventDetailBanner";
import { SeatsAndQueryCard } from "../components/SeatsAndQueryCard";
import { EventDetailTabs } from "../components/EventDetailTabs";
import SectionContainer from "../../../components/sectionContainer";
import { useEventDetail } from "../useEventDetail";
import { useEventsList } from "../../event/useEvents";
import EventGrid from "../../event/components/EventGrid";
import SectionHeader from "../../../components/section-header";

export default function EventsDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { event, isLoading, isError } = useEventDetail(eventId);

  // Other events: the first 4 highlighted events (list order = their order),
  // excluding the one being viewed.
  const { events: otherEvents } = useEventsList();
  const relatedEvents = otherEvents
    .filter((e) => e.isHighlighted && e.id !== event?.id)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA] flex items-center justify-center">
        <p className="text-gray-400">Loading event…</p>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA] flex items-center justify-center">
        <p className="text-gray-500">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA]">
      <EventDetailBanner event={event} />
      {/* md:pt-8/md:pb-16 override SectionContainer's default md:pt-24/md:pb-40
          — the unscoped py-8 alone doesn't beat the md-scoped defaults, which
          left a huge gap under the banner. */}
      <SectionContainer className="px-4 md:px-10 pt-8 pb-12 md:pt-8 md:pb-16 flex flex-col lg:flex-row gap-8 lg:items-start">
        <EventDetailTabs event={event} />
        {/* lg:-mt-8 cancels the container's top padding so the seats card sits
            flush against the banner's bottom edge. */}
        <div className="w-full lg:w-72 md:flex-shrink lg:-mt-8">
          <SeatsAndQueryCard totalSeats={event.totalSeats} bookedSeats={event.bookedSeats} />
        </div>
      </SectionContainer>

      {relatedEvents.length > 0 && (
        <div className="bg-[#F2F5FA] text-black relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:space-y-10 space-y-12">
            <SectionHeader
              titleNormal=""
              titleHighlight="Other Events For You"
              varient="secondary"
              className="justify-center sm:justify-start"
            />

            {/* Same grid component as the events page, so cards keep equal
                heights per row instead of stretching each other in a swiper. */}
            <EventGrid events={relatedEvents} />
          </div>
        </div>
      )}
    </div>
  );
}
