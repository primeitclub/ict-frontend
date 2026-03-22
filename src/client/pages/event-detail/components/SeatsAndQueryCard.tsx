import { SEATS_INFO } from "../data";

export const SeatsAndQueryCard = () => {
  const { booked, total } = SEATS_INFO;

  return (
    <div className="w-full overflow-hidden border border-gray-200">
      {/* Seats Available */}
      <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-gray-800 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="2" y="14" width="4" height="7" rx="1" />
          <rect x="9" y="9" width="4" height="12" rx="1" />
          <rect x="16" y="4" width="4" height="17" rx="1" />
        </svg>
        <div className="flex flex-col">
          <span className="text-base font-bold text-gray-900">
            Seats Available
          </span>
          <span className="text-sm text-gray-600">
            {booked} out of {total} Seats booked
          </span>
        </div>
      </div>

      {/* Got Any Queries */}
      <button className="w-full flex items-center gap-4 px-5 py-4 bg-[#3571F0] hover:bg-[#2a5fd6] transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white flex-shrink-0"
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
      </button>
    </div>
  );
};
