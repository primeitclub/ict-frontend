export type ContentType = {
  id?: string;
  image: string;
  title: string;
  speaker: string;
  avatar: string[];
  time: string;
  price: number;
  /** Authoritative free flag (from feeType); price may be stale on a free event. */
  isFree?: boolean;
  date: string;
  place: string;
  /** null = unlimited capacity; the card hides its seat count in that case. */
  seats: number | null;
  totalSeats: number | null;
  registrationDeadline?: string | null;
  eventType?: string | null;
};

export type TabType = {
  title: string;
  content: ContentType[];
};
