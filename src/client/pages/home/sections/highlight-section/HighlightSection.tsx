import { useState } from "react";
import { Calendar, Clock, MapPin, Banknote, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { GradientText } from "./GradientText";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

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
      content: [],
    },
    {
      title: "Session",
      content: [],
    },
    {
      title: "Hackaverse",
      content: [],
    },
    {
      title: "Musical Nights",
      content: [],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16  text-white">
      <GradientText grad={"Major"} norm="Highlights"/>
      

      <div className="flex  gap-20 text-lg font-semibold mb-16  border-gray-800 pb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`transition-colors duration-200 ${
              activeTab === index
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
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
            <div className=" rounded-3xl overflow-hidden border border-[#444E62]    p-3 group h-full">
              <div className="relative h-40 w-full rounded-xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-[#970B0B] text-sm font-semibold px-2 py-1 rounded">
                  {item.seats} / {item.totalSeats} Seats
                </div>
              </div>

              {/* Content  */}
              <div className="mt-3">
                <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                <p className="text-nav-hover text-sm mb-2">{item.speaker}</p>

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

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[11px] text-gray-300 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 " />
                    <span className="text-sm">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4  text-[#00FFAB]" />
                    <span className="text-[#00FFAB] text-sm">
                      Rs. {item.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4  " />
                    <span className="text-sm">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4  " />
                    <span className="text-sm">{item.place}</span>
                  </div>
                </div>

                <button className="w-full bg-white text-black py-2.5 rounded-full font-semibold flex items-center justify-center">
                  Register Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
