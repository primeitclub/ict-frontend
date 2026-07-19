import { formatEventDate, formatEventTime } from "../../../components/event-card-format";
import type { EventDetailData } from "../useEventDetail";

interface EventsOverviewProps {
  event: EventDetailData;
}

export const EventsOverview = ({ event }: EventsOverviewProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 text-base text-[#2d2d2d]">
          {event.startTime && (
            <p>
              <span className="font-medium">Start Time:</span>{" "}
              {formatEventTime(event.startTime)}
              {event.endTime ? ` – ${formatEventTime(event.endTime)}` : ""}
            </p>
          )}
          {event.registrationDeadline && (
            <p>
              <span className="font-medium">Registration Closes:</span>{" "}
              {formatEventDate(event.registrationDeadline)}
            </p>
          )}
          <p>
            <span className="font-medium">Location:</span> {event.location}
          </p>
          <p>
            <span className="font-medium">Total Seats:</span> {event.totalSeats}
          </p>
        </div>
        <p className="text-base text-gray-700 leading-relaxed text-justify">
          {event.description}
        </p>
      </div>
    </div>
  );
};
