import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Banknote,
  ChevronRight,
  CircleArrowRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// import { GradientText } from "./GradientText";
// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

type ContentType = {
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

export default function HighlightSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: TabType[] = [
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

  return (
    <div className=" bg-[#F2F5FA] text-black">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-black text-5xl font-bold mb-12">
          Major <span className="text-[#3571F0]">Highlights</span>
        </h2>

        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-12 gap-y-6 text-xl font-bold mb-16 pb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`transition-colors duration-200 flex gap-3 items-center whitespace-nowrap ${
                activeTab === index ? "text-[#3571F0]" : "text-black"
              }`}
            >
              {activeTab === index ? (
                <CircleArrowRight size={24} className="text-[#3571F0]" />
              ) : (
                <CircleArrowRight size={24} className="-rotate-45 text-black" />
              )}
              {tab.title}
            </button>
          ))}
        </div>
        <div className="relative group/nav">
          <button
            className="swiper-button-prev-custom hidden md:flex absolute xl:-left-20 lg:-left-12 top-1/2 
          -translate-y-1/2 z-20 text-[#3571F0] border-2 border-[#3571F0] w-12 h-12 rounded-full items-center justify-center 
          bg-transparent hover:bg-[#3571F0] hover:text-white transition-all disabled:opacity-30"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            className="swiper-button-next-custom hidden md:flex absolute xl:-right-20 lg:-right-12 top-1/2
           -translate-y-1/2 z-20 text-[#3571F0] border-2 border-[#3571F0] w-12 h-12 rounded-full items-center justify-center 
           bg-transparent hover:bg-[#3571F0] hover:text-white transition-all disabled:opacity-30"
          >
            <ArrowRight size={24} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="pb-16 "
          >
            {tabs[activeTab].content.map((item, index) => (
              <SwiperSlide key={index}>
                <div className=" rounded-3xl  bg-white p-3 group h-full">
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#970B0B] text-[10px] font-bold px-2.5 py-1 rounded-md text-white shadow-lg">
                      {item.seats} / {item.totalSeats} Seats
                    </div>
                  </div>

                  {/* Content  */}
                  <div className="mt-3">
                    <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                    <p className="text-sm mb-2">{item.speaker}</p>

                    {/* Avatar */}
                    <div className="flex -space-x-3 mb-6">
                      {item.avatar.map((av, i) => (
                        <div
                          className={`${i == 0 ? "bg-[#2dDBDB] rounded-full" : "bg-[#1CCECE] rounded-full"}`}
                        >
                          <img
                            key={i}
                            src={av}
                            alt="Speaker"
                            className="w-8 h-8 rounded-full "
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[11px]  mb-8">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 " />
                        <span className="text-sm font-semibold">
                          {item.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4  text-[#10B981] " />
                        <span className="text-[#10B981] text-sm font-semibold">
                          Rs. {item.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4  " />
                        <span className="text-sm font-semibold">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <MapPin className="w-4 h-4  " />
                        <span className="text-sm font-semibold">
                          {item.place}
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full bg-[#3571F0] hover:bg-blue-700 text-white py-3 rounded-2xl 
                    font-bold flex items-center justify-center transition-colors group"
                    >
                      Register Now
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex md:hidden justify-center items-center gap-6 mt-12 pb-8">
            <button
              className="swiper-button-prev-custom w-12 h-12 rounded-full flex items-center 
            justify-center bg-[#3571F0] text-white hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-md"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              className="swiper-button-next-custom w-12 h-12 rounded-full flex items-center
             justify-center bg-[#3571F0] text-white hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-md"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
