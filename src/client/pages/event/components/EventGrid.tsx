import { useNavigate } from "react-router-dom";
import Card from "../../../components/card";
import {
  formatEventTimeRange,
  remainingSeats,
} from "../../../components/event-card-format";
import type { ApiEvent } from "../useEvents";
import type { ContentType } from "../types";

interface EventGridProps {
  events: ApiEvent[];
  isLoading?: boolean;
}

function toCardItem(event: ApiEvent): ContentType {
  return {
    id: event.id,
    image: event.imageUrl ?? "",
    title: event.title,
    speaker: event.subtitle ?? "",
    avatar: event.speaker?.imageUrl ? [event.speaker.imageUrl] : [],
    date: event.date ?? "",
    price: Number(event.fee) || 0,
    time: formatEventTimeRange(event.startTime, event.endTime),
    place: event.location,
    seats: remainingSeats(event),
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
          onClick={() => navigate(`/event-detail/${event.id}`)}
          className="cursor-pointer"
        >
          <Card item={toCardItem(event)} />
        </div>
      ))}
    </div>
  );
};

export default EventGrid;
