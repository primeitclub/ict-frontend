/**
 * Shared formatting helpers for the event Card, used by both the events grid
 * and the home hero (HighlightSection) so they render time and seats the same way.
 */

import type { ContentType } from "../pages/home/sections/highlight-section/types";

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

/**
 * Whether the registration deadline has passed. No/invalid deadline = still
 * open. Date-only deadlines (no time part) stay open through that whole day.
 */
export function isRegistrationClosed(
  deadline: string | null | undefined,
): boolean {
  if (!deadline) return false;
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return false;
  if (!deadline.includes("T")) date.setHours(23, 59, 59, 999);
  return Date.now() > date.getTime();
}

/** "2026-03-14" | ISO datetime → "Saturday, 2026-03-14"; "" for empty, echoes unparseable values. */
export function formatEventDate(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return `${weekday}, ${iso}`;
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

/**
 * Minimal event shape the Card needs. Both `ApiEvent` (events page) and
 * `HighlightItem` (home page) structurally satisfy this, so a single mapper
 * feeds the same Card in both places.
 */
export interface EventCardSource {
  id: string;
  title: string;
  imageUrl: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  location: string;
  fee: string;
  totalSeats: number;
  bookedSeats: number;
  registrationDeadline?: string | null;
  speakers?: { id: string; name: string; imageUrl: string | null }[] | null;
}

/**
 * Maps a raw event to the Card's `ContentType`. This is the single source of
 * truth for how an event becomes a card — the home events section and the
 * events page both call it so their cards are identical.
 */
export function toEventCardItem(event: EventCardSource): ContentType {
  return {
    id: event.id,
    image: event.imageUrl ?? "",
    title: event.title,
    // "with <names>" is assembled in the Card; here we just join speaker names.
    speaker: (event.speakers ?? [])
      .map((speaker) => speaker.name)
      .filter(Boolean)
      .join(", "),
    avatar: (event.speakers ?? [])
      .map((speaker) => speaker.imageUrl)
      .filter((url): url is string => Boolean(url)),
    date: event.date ?? "",
    price: Number(event.fee) || 0,
    time: formatEventTimeRange(event.startTime, event.endTime),
    place: event.location,
    seats: remainingSeats(event),
    totalSeats: event.totalSeats,
    registrationDeadline: event.registrationDeadline ?? null,
  };
}
