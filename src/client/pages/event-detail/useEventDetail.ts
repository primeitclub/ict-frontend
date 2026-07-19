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
  bookedSeats: number;
  status: string;
  registrationDeadline: string | null;
  category: { id: string; name: string; displayName: string };
  /** "GROUP" events charge per team, so their fee shows "/team". */
  eventType?: "SINGLE" | "GROUP" | null;
  speakers?: EventDetailSpeaker[] | null;
  /** External registration URL; takes precedence over the in-app form. */
  registerLink: string | null;
}

export interface EventDetailSpeaker {
  id: string;
  name: string;
  designation: string;
  company: string | null;
  description?: string | null;
  imageUrl: string | null;
  socialLinks: { instagram?: string; linkedin?: string; portfolio?: string } | null;
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
