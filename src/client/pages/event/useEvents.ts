import { useApiQuery } from "../../../lib";
import { useVersionData } from "../../hooks/use-version-data";

export interface EventCategory {
  id: string;
  name: string;
  displayName: string;
  displayOrder: number;
}

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
  status: string;
  category: EventCategory;
  speaker?: { id: string; name: string; imageUrl: string | null } | null;
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

  return {
    events: data?.data?.items ?? [],
    isLoading,
  };
}
