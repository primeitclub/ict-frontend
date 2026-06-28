import type { IEventBanner, IEventMeta, ISeatsInfo, ISpeaker } from "../types";
import type { TabType } from "../types";

export const EVENT_BANNER: IEventBanner = {
  label: "Workshop",
  title: "Mastering Component-Driven Architecture",
  tagline:
    "I always forget peoples face, but in your case, I'll be glad to make an exception ;)",
  date: "October 24, 2026",
  price: "NPR 500 /per team",
  isRegistrationOpen: true,
};

export const EVENT_META: IEventMeta = {
  duration: "3 Days",
  registrationCloses: "Jan 15, 2026",
  location: "Prime College",
  startTime: "9pm onwards",
};

export const SEATS_INFO: ISeatsInfo = {
  booked: 12,
  total: 50,
};

export const SPEAKERS: ISpeaker[] = [
  {
    name: "Saugat KC",
    role: "Artificial Intelligence Engineer",
    company: "Qniverse",
    bio: "Dive deep into the world of scalable UI. This intensive micro-event, part of the Apex Global Summit 2026, focuses on moving beyond basic layouts into the realm of enterprise-grade component libraries.",
    image: "https://i.pravatar.cc/150?img=11",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "Saugat KC",
    role: "Artificial Intelligence Engineer",
    company: "Qniverse",
    bio: "Dive deep into the world of scalable UI. This intensive micro-event, part of the Apex Global Summit 2026, focuses on moving beyond basic layouts into the realm of enterprise-grade component libraries.",
    image: "https://i.pravatar.cc/150?img=11",
    socials: {
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
];

export const EVENT_COVERED_ITEMS: string[] = [
  "Implementing strict design tokens for multi-brand support.",
  "Building accessible (WCAG 2.1) patterns from scratch.",
  "Performance optimization for massive component libraries.",
];

export const EVENT_DESCRIPTION =
  "Dive deep into the world of scalable UI. This intensive micro-event, part of the Apex Global Summit 2026, focuses on moving beyond basic layouts into the realm of enterprise-grade component libraries. You will learn to bridge the gap between Figma design tokens and production-ready React components using modern CSS-in-JS and headless UI patterns.";

export const tabs: TabType[] = [
  {
    title: "Events",
    content: [
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
    ],
  },
  {
    title: "Workshops",
    content: [
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
    ],
  },
  {
    title: "Session",
    content: [
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
    ],
  },
  {
    title: "Hackaverse",
    content: [
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
    ],
  },
  {
    title: "Musical Nights",
    content: [
      {
        image: "/src/assets/download.jpg",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: ["/src/assets/saugat.png", "/src/assets/saugat.png"],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
    ],
  },
];
