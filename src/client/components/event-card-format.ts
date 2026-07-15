/**
 * Shared formatting helpers for the event Card, used by both the events grid
 * and the home hero (HighlightSection) so they render time and seats the same way.
 */

/** "10:00:00" | "10:00" → "10:00 AM"; returns "" for empty and echoes unknown formats. */
export function formatEventTime(value: string | null | undefined): string {
  if (!value) return "";
  const [hStr, mStr = "0"] = value.split(":");
  const hours = Number(hStr);
  const minutes = Number(mStr);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

/** Builds "10:00 AM - 12:00 PM" (or just the start) from raw start/end times. */
export function formatEventTimeRange(
  start: string | null | undefined,
  end: string | null | undefined,
): string {
  if (!start) return "";
  const startLabel = formatEventTime(start);
  return end ? `${startLabel} - ${formatEventTime(end)}` : startLabel;
}

/**
 * Remaining seats = totalSeats − bookedSeats.
 *
 * `bookedSeats` is the only seat-usage field the API sends: it is computed per
 * request from the approved registration count (see the event service's
 * `itemsWithSeats` mapping) and is present on both /events and /content.
 */
export function remainingSeats(input: {
  totalSeats: number;
  bookedSeats: number;
}): number {
  return Math.max(input.totalSeats - input.bookedSeats, 0);
}
