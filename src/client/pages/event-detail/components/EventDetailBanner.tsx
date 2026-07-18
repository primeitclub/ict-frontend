import SectionContainer from "../../../components/sectionContainer";
import { formatEventDate, isRegistrationClosed } from "../../../components/event-card-format";
import { Calendar, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVersion } from "../../../routes/VersionContext";
import type { EventDetailData } from "../useEventDetail";
import { goToRegistration } from "../../../../lib/registration";

interface EventDetailBannerProps {
  event: EventDetailData;
}

export const EventDetailBanner = ({ event }: EventDetailBannerProps) => {
  const navigate = useNavigate();
  const { getPath } = useVersion();
  // Registration is closed when the event isn't published OR the deadline
  // has passed; "Booked"/"Seats Full" only applies while still open.
  const isOpen =
    event.status === "published" &&
    !isRegistrationClosed(event.registrationDeadline);
  const isFull = event.totalSeats - event.bookedSeats <= 0;
  const canRegister = isOpen && !isFull;
  // "Day, YYYY-MM-DD" e.g. "Friday, 2026-03-14"
  const dateLabel = formatEventDate(event.date) || null;

  return (
    // Same height as the events-page highlight banner (TopBgContent):
    // h-[250px] md:h-[300px]. Mobile keeps min-h so stacked content can grow.
    <div className="bg-[linear-gradient(180deg,#000_7%,var(--color-accent-dark)_230%)] min-h-[250px] md:min-h-0 md:h-[300px] items-center flex">
      {/* md:py-8 needed on top of py-8: SectionContainer's default md:pt-24/md:pb-40
          are md-scoped, so the unscoped py-8 alone doesn't override them. */}
      <SectionContainer className="w-full px-6 md:px-10 py-8 md:py-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-3">
          {/* Category Label */}
          <span className="text-base font-semibold tracking-wide" style={{ color: "#39BFF2" }}>
            {event.category?.displayName ?? event.category?.name}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-[40px] font-semibold text-primary leading-tight">
            {event.title}
          </h1>

          {/* Subtitle */}
          {event.subtitle && (
            <p className="text-base md:text-xl text-gray-400">{event.subtitle}</p>
          )}

          {/* Meta Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 mt-1">
            {/* Date */}
            {dateLabel && (
              <div className="flex items-center gap-2 text-white text-base md:text-xl">
                <Calendar className="w-5 h-5 shrink-0" />
                <span>{dateLabel}</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 text-white text-base md:text-xl">
              <Banknote className="w-5 h-5 text-[#10B981] shrink-0" />
              <span>
                {event.feeType === "free" ? "Free" : `NPR ${event.fee}`}
              </span>
            </div>

            {/* Registration Status */}
            <div className="flex items-center gap-2 text-base md:text-xl">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: canRegister ? "#22c55e" : "#ef4444" }}
              />
              <span style={{ color: canRegister ? "#4ade80" : "#f87171" }}>
                {isFull ? "Seats Full" : !isOpen ? "Registration Closed" : "Registration Open"}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full md:w-auto md:flex-shrink-0 md:ml-8">
          <button
            onClick={() =>
              canRegister &&
              goToRegistration(
                event.registerLink,
                `${getPath("/register")}?eventId=${event.id}`,
                navigate,
              )
            }
            disabled={!canRegister}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
          >
            {isFull ? "Booked" : !isOpen ? "Registration Closed" : "Register Now"}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </SectionContainer>
    </div>
  );
};
