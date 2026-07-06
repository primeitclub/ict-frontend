import type { EventDetailData } from "../useEventDetail";

interface EventsOverviewProps {
  event: EventDetailData;
}

export const EventsOverview = ({ event }: EventsOverviewProps) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Description */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-black">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed text-justify">
          {event.description}
        </p>
      </div>
    </div>
  );
};
