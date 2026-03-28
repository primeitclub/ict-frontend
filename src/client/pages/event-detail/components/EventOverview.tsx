import { EVENT_COVERED_ITEMS, EVENT_DESCRIPTION, EVENT_META } from "../data";

export const EventsOverview = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Description */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-black">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed text-justify">
          {EVENT_DESCRIPTION}
        </p>
        <div className="flex flex-col gap-1 text-base text-[#2d2d2d]">
          <p>
            <span className="font-medium">Duration:</span> {EVENT_META.duration}
          </p>
          <p>
            <span className="font-medium">Registration Closes:</span>{" "}
            {EVENT_META.registrationCloses}
          </p>
          <p>
            <span className="font-medium">Location:</span> {EVENT_META.location}
          </p>
          <p>
            <span className="font-medium">Start Time:</span>{" "}
            {EVENT_META.startTime}
          </p>
        </div>
        <p className="text-base text-[#2d2d2d] leading-relaxed text-justify">
          {EVENT_DESCRIPTION}
        </p>
      </div>

      {/* What will be covered */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-black">
          What will be covered ?
        </h2>
        <ul className="list-disc list-inside flex flex-col gap-1">
          {EVENT_COVERED_ITEMS.map((item) => (
            <li key={item} className="text-base text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
