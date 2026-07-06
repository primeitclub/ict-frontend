import { useNavigate } from "react-router-dom";
import Card from "../../../components/card";
import type { ApiEvent } from "../useEvents";
import type { ContentType } from "../types";
import { slugify } from "../../../../lib";

interface EventGridProps {
  events: ApiEvent[];
  isLoading?: boolean;
}

function toCardItem(event: ApiEvent): ContentType {
  return {
    image: event.imageUrl ?? "",
    title: event.title,
    speaker: event.subtitle ?? "",
    avatar: event.speaker?.imageUrl ? [event.speaker.imageUrl] : [],
    date: event.date ?? "",
    price: Number(event.fee) || 0,
    time: event.startTime
      ? `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}`
      : "",
    place: event.location,
    seats: event.totalSeats,
    totalSeats: event.totalSeats,
  };
}

const EventGrid = ({ events, isLoading }: EventGridProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl bg-gray-200 animate-pulse h-[380px]"
          />
        ))}
      </div>
    );
  }

  if (!events.length) {
    return (
      <p className="text-center text-gray-400 py-20">No events found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {events.map((event) => (
        <div
          key={event.id}
          onClick={() => navigate(`/event-detail/${slugify(event.title)}`)}
          className="cursor-pointer"
        >
          <Card item={toCardItem(event)} eventId={event.id} />
        </div>
      ))}
    </div>
  );
};

export default EventGrid;
