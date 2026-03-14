import type { TabType } from "../types";

export const categoryTabs: TabType[] = [
  {
    title: "Events",
    content: [
      {
        image: "https://picsum.photos/seed/event1/600/400",
        title: "Computational Theory",
        speaker: "with Hattori Hanzo, kemuzou Kemuma",
        avatar: [
          "https://i.pravatar.cc/150?u=1",
          "https://i.pravatar.cc/150?u=2",
        ],
        date: "10 Feb, 2026",
        price: 500,
        time: "10 A.M - 12 P.M",
        place: "Prime College",
        seats: 12,
        totalSeats: 20,
      },
      {
        image: "https://picsum.photos/seed/event2/600/400",
        title: "Advanced AI Ethics",
        speaker: "with Sarah Connor, John Doe",
        avatar: [
          "https://i.pravatar.cc/150?u=3",
          "https://i.pravatar.cc/150?u=4",
        ],
        date: "12 Feb, 2026",
        price: 750,
        time: "2 P.M - 5 P.M",
        place: "Main Hall",
        seats: 5,
        totalSeats: 50,
      },
      {
        image: "https://picsum.photos/seed/event3/600/400",
        title: "Quantum Computing 101",
        speaker: "with Richard Feynman",
        avatar: ["https://i.pravatar.cc/150?u=5"],
        date: "15 Feb, 2026",
        price: 1200,
        time: "9 A.M - 12 P.M",
        place: "Lab 3",
        seats: 8,
        totalSeats: 15,
      },
      {
        image: "https://picsum.photos/seed/event4/600/400",
        title: "Cyber Security Summit",
        speaker: "with Elliot Alderson",
        avatar: ["https://i.pravatar.cc/150?u=6"],
        date: "20 Feb, 2026",
        price: 300,
        time: "11 A.M - 1 P.M",
        place: "Conference Room",
        seats: 25,
        totalSeats: 40,
      },
    ],
  },
  {
    title: "Workshops",
    content: [
      {
        image: "https://picsum.photos/seed/workshop1/600/400",
        title: "UI/UX Design Workshop",
        speaker: "with Dieter Rams",
        avatar: ["https://i.pravatar.cc/150?u=7"],
        date: "11 Feb, 2026",
        price: 400,
        time: "10 A.M - 4 P.M",
        place: "Design Studio",
        seats: 10,
        totalSeats: 25,
      },
      {
        image: "https://picsum.photos/seed/workshop2/600/400",
        title: "React Native Masterclass",
        speaker: "with Jordan Walke",
        avatar: ["https://i.pravatar.cc/150?u=8"],
        date: "14 Feb, 2026",
        price: 600,
        time: "1 P.M - 5 P.M",
        place: "Room 402",
        seats: 15,
        totalSeats: 30,
      },
    ],
  },
  {
    title: "Session",
    content: [
      {
        image: "https://picsum.photos/seed/session1/600/400",
        title: "Tech Career Path",
        speaker: "with Navin Singh",
        avatar: ["https://i.pravatar.cc/150?u=9"],
        date: "16 Feb, 2026",
        price: 0,
        time: "4 P.M - 6 P.M",
        place: "Auditorium",
        seats: 50,
        totalSeats: 100,
      },
    ],
  },
  {
    title: "Hackaverse",
    content: [
      {
        image: "https://picsum.photos/seed/hack1/600/400",
        title: "Grand Hackathon 2026",
        speaker: "Organized by IT Club",
        avatar: [
          "https://i.pravatar.cc/150?u=10",
          "https://i.pravatar.cc/150?u=11",
        ],
        date: "22-24 Feb, 2026",
        price: 1000,
        time: "48 Hours",
        place: "Main Campus",
        seats: 100,
        totalSeats: 200,
      },
    ],
  },
  {
    title: "Musical Nights",
    content: [
      {
        image: "https://picsum.photos/seed/music1/600/400",
        title: "Acoustic Night",
        speaker: "with Local Bands",
        avatar: ["https://i.pravatar.cc/150?u=12"],
        date: "25 Feb, 2026",
        price: 200,
        time: "6 P.M - 10 P.M",
        place: "Open Ground",
        seats: 150,
        totalSeats: 300,
      },
    ],
  },
];

export const tabs: TabType[] = [
  {
    title: "All",
    content: categoryTabs.flatMap((tab) => tab.content),
  },
  ...categoryTabs,
];

export const sliderData = [
  {
    image:
      "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450",
  },
  {
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450",
  },
  {
    image:
      "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450",
  },
  {
    image:
      "https://images.pexels.com/photos/8422523/pexels-photo-8422523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450",
  },
  {
    image:
      "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450",
  },
];
