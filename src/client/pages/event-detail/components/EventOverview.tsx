import { marked } from "marked";
import { formatEventDate, formatEventTime } from "../../../components/event-card-format";
import RichText from "../../../../shared/design-components/rich-text/RichText";
import type { EventDetailData } from "../useEventDetail";

interface EventsOverviewProps {
  event: EventDetailData;
}

export const EventsOverview = ({ event }: EventsOverviewProps) => {
  // The description is authored as markdown in the admin. Parse it to HTML,
  // then hand it to RichText (DOMPurify) — the app's single trusted HTML
  // render path — rather than dumping the raw markdown source into a <p>.
  const descriptionHtml = event.description
    ? (marked.parse(event.description) as string)
    : "";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
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
        <RichText
          html={descriptionHtml}
          className="text-base text-gray-700 leading-relaxed text-justify [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-5 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1.5 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_li]:mb-1 [&_a]:text-accent [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-3 [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm"
        />
      </div>
    </div>
  );
};
