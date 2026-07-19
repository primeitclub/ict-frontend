import { useApiQuery } from "../../../lib";
import { useVersionData } from "../../hooks/use-version-data";

export interface EventCategory {
  id: string;
  name: string;
  displayName: string;
  displayOrder: number;
}

export type EventType = "SINGLE" | "GROUP";

export interface ApiEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  fee: string;
  feeType: "free" | "paid";
  location: string;
  totalSeats: number;
  /** Approved registrations for this event; remaining = totalSeats − bookedSeats. */
  bookedSeats: number;
  status: string;
  registrationDeadline?: string | null;
  /** Whether this event is flagged as a highlight (top swiper on the events page). */
  isHighlighted?: boolean;
  categoryId: string;
  category: EventCategory;
  speakers?: { id: string; name: string; imageUrl: string | null }[] | null;
  eventType: EventType;
  maxParticipants: number | null;
  /** External registration URL; takes precedence over the in-app form. */
  registerLink: string | null;
}

interface PaginatedResult<T> {
  items: T[];
  meta: { total: number; page: number; limit: number };
}

interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

export function useEventCategories() {
  const { versionId } = useVersionData();

  const { data, isLoading } = useApiQuery(
    "eventCategories",
  )<Envelope<PaginatedResult<EventCategory>>>({
    queryParams: { limit: 100 },
    enabled: !!versionId,
  });

  return {
    categories: data?.data?.items ?? [],
    isLoading,
  };
}

export function useEventsList(categoryId?: string) {
  const { versionId } = useVersionData();

  const { data, isLoading } = useApiQuery("events")<
    Envelope<PaginatedResult<ApiEvent>>
  >({
    queryParams: {
      versionId: versionId ?? undefined,
      ...(categoryId ? { categoryId } : {}),
      status: "published",
      limit: 100,
    },
    enabled: !!versionId,
  });

  // "All" mixes every category, so order by the category's displayOrder first
  // (workshop → competition → session, etc.). The sort is stable, so within a
  // category the backend's own ordering is preserved. For a single-category
  // query all keys are equal and the list is untouched.
  const items = data?.data?.items ?? [];
  const events = [...items].sort(
    (a, b) =>
      (a.category?.displayOrder ?? Number.MAX_SAFE_INTEGER) -
      (b.category?.displayOrder ?? Number.MAX_SAFE_INTEGER),
  );

  return {
    events,
    isLoading,
  };
}
