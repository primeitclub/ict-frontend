import { Calendar, Banknote, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVersion } from "../../../routes/VersionContext";
import { getImageUrl } from "../../../../lib/imageUtils";
import { goToRegistration } from "../../../../lib/registration";
import {
  isRegistrationClosed,
  toEventCardItem,
} from "../../../components/event-card-format";
import type { ApiEvent } from "../useEvents";

interface EventListItemProps {
  event: ApiEvent;
}

/**
 * Mobile-only row layout for the events page list. The desktop grid keeps the
 * shared Card; this compact row drops time/location and shows remaining seats
 * as "x / y Seats Available" instead of the Card's image badge.
 */
const EventListItem = ({ event }: EventListItemProps) => {
  const navigate = useNavigate();
  const { getPath } = useVersion();
  const item = toEventCardItem(event);

  // Same CTA precedence as the Card: seats gone → "Booked"; deadline passed →
  // "Registration Closed"; otherwise "Register Now".
  const isClosed = isRegistrationClosed(item.registrationDeadline);
  const isFull = item.seats <= 0;
  const canRegister = !isClosed && !isFull;

  return (
    <div className="bg-white px-4 py-4 font-sans">
      <div className="flex gap-3">
        <div className="h-[72px] w-[112px] shrink-0 overflow-hidden rounded-lg">
          <img
            src={getImageUrl(item.image)}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[17px] font-semibold" title={item.title}>
            {item.title}
          </h3>
          {item.speaker ? (
            <p
              className="truncate text-[12px] text-gray-500"
              title={`with ${item.speaker}`}
            >
              with {item.speaker}
            </p>
          ) : null}

          <div className="mt-1.5 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-[12px] font-medium">
                {item.date}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <Banknote className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="text-[12px] font-semibold text-[#10B981]">
                {item.price > 0 ? `Rs ${item.price}` : "Free"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-[16px] font-bold leading-tight text-[#E11D48]">
            {item.seats} / {item.totalSeats}
          </p>
          <p className="text-[11px] font-medium">Seats Available</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            const id = event.id ?? item.id;
            goToRegistration(
              event.registerLink,
              getPath(id ? `/register?eventId=${id}` : "/register"),
              navigate,
            );
          }}
          disabled={!canRegister}
          className="flex items-center gap-1 rounded-lg bg-btn-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-btn-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFull ? "Booked" : isClosed ? "Registration Closed" : "Register Now"}
          <ChevronRight className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default EventListItem;
