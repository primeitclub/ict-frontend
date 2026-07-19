import { useNavigate } from "react-router-dom";
import { useVersion } from "../../../routes/VersionContext";
import Card from "../../../components/card";
import { toEventCardItem } from "../../../components/event-card-format";
import EventListItem from "./EventListItem";
import type { ApiEvent } from "../useEvents";
import { slugify } from "../../../../lib";

interface EventGridProps {
  events: ApiEvent[];
  isLoading?: boolean;
}

const EventGrid = ({ events, isLoading }: EventGridProps) => {
  const navigate = useNavigate();
  const { getPath } = useVersion();

  if (isLoading) {
    return (
      <>
        {/* Mobile: flush list rows separated by a subtle divider */}
        <div className="divide-y divide-black/5 overflow-hidden rounded-2xl bg-white md:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[160px] animate-pulse bg-gray-200" />
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-gray-200 animate-pulse h-[380px]"
            />
          ))}
        </div>
      </>
    );
  }

  if (!events.length) {
    return (
      <p className="text-center text-gray-400 py-20">No events found.</p>
    );
  }

  return (
    <>
      {/* Mobile: compact list — no gap between events, subtle border between rows */}
      <div className="divide-y divide-black/5 overflow-hidden rounded-2xl bg-white md:hidden">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(getPath(`/event-detail/${slugify(event.title)}`))}
            className="cursor-pointer"
          >
            <EventListItem event={event} />
          </div>
        ))}
      </div>

      {/* Desktop: unchanged card grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(getPath(`/event-detail/${slugify(event.title)}`))}
            className="cursor-pointer"
          >
            <Card
              item={toEventCardItem(event)}
              eventId={event.id}
              registerLink={event.registerLink}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default EventGrid;
