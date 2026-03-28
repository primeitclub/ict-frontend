export { default as EventsDetail } from "../types/EventDetail";
export interface ISpeakerSocials {
  instagram?: string;
  github?: string;
  linkedin?: string;
}

export interface ISpeaker {
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  socials?: ISpeakerSocials;
}

export interface IEventMeta {
  duration: string;
  registrationCloses: string;
  location: string;
  startTime: string;
}

export interface IEventBanner {
  label: string;
  title: string;
  tagline: string;
  date: string;
  price: string;
  isRegistrationOpen: boolean;
}

export interface ISeatsInfo {
  booked: number;
  total: number;
}

export type ContentType = {
  image: string;
  title: string;
  speaker: string;
  avatar: string[];
  time: string;
  price: number;
  date: string;
  place: string;
  seats: number;
  totalSeats: number;
};

export type TabType = {
  title: string;
  content: ContentType[];
};
