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
  seats: number;
  totalSeats: number;
  registrationDeadline?: string | null;
  eventType?: string | null;
};

export type TabType = {
  title: string;
  content: ContentType[];
};
