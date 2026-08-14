import { Link } from "react-router-dom";
import { CalendarClock } from "lucide-react";
import { useVersion } from "../../../routes/VersionContext";
import { useIsArchivedVersion } from "../../../hooks/use-is-archived-version";
import { formatEventDate } from "../../../components/event-card-format";

interface SeatsAndQueryCardProps {
  /** null = unlimited capacity; the "Seats Available" row is hidden. */
  totalSeats: number | null;
  bookedSeats: number;
  registrationDeadline: string | null;
}

export const SeatsAndQueryCard = ({
  totalSeats,
  bookedSeats,
  registrationDeadline,
}: SeatsAndQueryCardProps) => {
  const { getPath } = useVersion();
  // Archived edition → the event is over, so hide the contacts link.
  const { isArchived } = useIsArchivedVersion();

  return (
    <div className="w-full overflow-hidden">
      {/* Registration Closes */}
      {registrationDeadline && (
        <div className="flex items-center gap-4 px-5 py-4 bg-[#EFEFEF]">
          <CalendarClock className="w-10 h-10 text-gray-800 flex-shrink-0 p-2" />
          <div className="flex flex-col">
            <span className="text-base font-bold text-gray-900">
              Registration Closes
            </span>
            <span className="text-sm text-gray-600">
              {formatEventDate(registrationDeadline)}
            </span>
          </div>
        </div>
      )}

      {/* Seats Available — hidden entirely for unlimited-capacity events. */}
      {totalSeats != null && (
        <div className="flex items-center gap-4 px-5 py-4 bg-[#EFEFEF]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-gray-800 flex-shrink-0 p-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="2" y="14" width="4" height="7" rx="1" />
            <rect x="9" y="9" width="4" height="12" rx="1" />
            <rect x="16" y="4" width="4" height="17" rx="1" />
          </svg>
          <div className="flex flex-col">
            <span className="text-base font-bold text-gray-900">
              Registered Seats
            </span>
            <span className="text-sm text-gray-600">
              {bookedSeats >= totalSeats ? "Booked" : `${bookedSeats} / ${totalSeats} registered`}
            </span>
          </div>
        </div>
      )}

      {/* Got Any Queries — hidden on archived editions (contacts page is gone). */}
      {!isArchived && (
      <Link
        to={getPath("/contacts")}
        className="w-full flex justify-start items-center gap-4 px-5 py-4 bg-accent hover:bg-[#2a5fd6] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-white flex-shrink-0 p-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5.5C3 14.06 9.94 21 18.5 21c.386 0 .769-.014 1.148-.042.28-.021.52-.185.642-.432l1.67-3.34a.75.75 0 00-.23-.948l-3-2.25a.75.75 0 00-.84-.033l-1.62.972A9.013 9.013 0 018.38 7.73l.972-1.62a.75.75 0 00-.033-.84l-2.25-3a.75.75 0 00-.948-.23L2.974 3.71a.75.75 0 00-.432.642A17.56 17.56 0 003 5.5z"
          />
        </svg>
        <span className="text-white text-lg font-semibold">
          Got Any Queries?
        </span>
      </Link>
      )}
    </div>
  );
};
