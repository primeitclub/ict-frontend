// About page main component
import { CircleArrowRight } from "lucide-react";
import Card from "../../components/card";
import { useState } from "react";

// import Swiper and modules styles
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Controller,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/effect-coverflow";

import mo from "../../../assets/mo.png";
import moun from "../../../assets/moun.png";
import trek from "../../../assets/trek.png";
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

type TabType = {
  title: string;
  content: ContentType[];
};

const categoryTabs: TabType[] = [
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

const tabs: TabType[] = [
  {
    title: "All",
    content: categoryTabs.flatMap((tab) => tab.content),
  },
  ...categoryTabs,
];
export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const sliderImages = [mo, moun, trek];
  return (
    <div className="overflow-x-hidden">
     
      <div className="bg-gradient-to-t from-[#3571F0] to-[#020919] h-[350px] md:h-[450px] pt-10 relative">
        <div className="triple-slider-wrapper w-full mx-auto h-full relative">
          <Swiper
            modules={[Pagination]}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            spaceBetween={-100}
            pagination={{ clickable: true, dynamicBullets: false }}
            className="events-swiper -bottom-32 left-0 right-0 h-full"
          >
            {sliderImages.map((img, i) => (
              <SwiperSlide
                key={i}
                className="flex items-center justify-center transition-all duration-500"
              >
                <div className="triple-slide-card w-full h-full rounded-[40px] overflow-hin shadow-2xl">
                  <img
                    src={img}
                    alt="Event"
                    className=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="bg-[#F2F5FA] text-black">
        <div className="mx-auto max-w-7xl px-4 py-16 ">
          <div className="flex flex-wrap md:flex md:flex-wrap gap-x-12 gap-y-6 text-xl justify-center font-bold mb-12 pb-4 mt-28">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`group  transition-transform duration-200 flex gap-3 items-center whitespace-nowrap 
                hover:text-[#3571F0] ${
                  activeTab === index ? "text-[#3571F0]" : "text-black"
                }`}
              >
                <CircleArrowRight
                  size={24}
                  className={`transition-transform duration-700 ${
                    activeTab === index
                      ? "text-[#3571F0]"
                      : "text-black -rotate-45 group-hover:rotate-0 group-hover:text-[#3571F0]"
                  }`}
                />
                {tab.title}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tabs[activeTab].content.map((item, index) => (
              <div key={index}>
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
