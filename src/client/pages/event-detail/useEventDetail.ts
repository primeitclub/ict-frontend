import { useApiQuery } from "../../../lib";

export interface EventDetailData {
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
  registrationDeadline: string | null;
  category: { id: string; name: string; displayName: string };
  speaker?: {
    id: string;
    name: string;
    designation: string;
    company: string | null;
    imageUrl: string | null;
    socialLinks: { instagram?: string; linkedin?: string; portfolio?: string } | null;
    bio?: string;
  } | null;
}

interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

export function useEventDetail(eventId: string | undefined) {
  const { data, isLoading, isError, error } = useApiQuery(
    "eventDetail",
  )<Envelope<EventDetailData>>({
    pathParams: { eventId: eventId! },
    enabled: !!eventId,
  });

  return {
    event: data?.data ?? null,
    isLoading,
    isError,
    error,
  };
}
