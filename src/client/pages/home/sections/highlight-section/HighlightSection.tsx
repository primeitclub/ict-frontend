import { useState, useRef } from "react";
import { CircleArrowRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { GradientText } from "./GradientText";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionHeader from "../../../../components/sectionHeader";
import mouse from "../../../../../assets/mouse.png";
import Card from "../../../../components/card";
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

export default function HighlightSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div ref={sectionRef} className=" bg-[#F2F5FA] text-black relative">
      <img
        src={mouse}
        alt="Mouse"
        onClick={scrollToSection}
        className="absolute -top-6 left-[50%] z-50 w-16 cursor-pointer "
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeader
          titleNormal="Event"
          titleHighlight="Overview"
          varient="secondary"
         className="justify-start"
        />

        <div className="sm:grid grid-cols-2 hidden md:flex md:flex-wrap gap-x-12 gap-y-6 text-xl font-bold mb-16 pb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`group  transition-transform duration-200 flex gap-3 items-center whitespace-nowrap 
                hover:text-[#3571F0] ${activeTab === index ? "text-[#3571F0]" : "text-black"
                }`}
            >
              <CircleArrowRight
                size={24}
                className={`transition-transform duration-700 ${activeTab === index
                    ? "text-[#3571F0]"
                    : "text-black -rotate-45 group-hover:rotate-0 group-hover:text-[#3571F0]"
                  }`}
              />
              {tab.title}
            </button>
          ))}
        </div>

        {/* Mobile Tab Pagination Dots */}
        {/* <div className="flex justify-center gap-3 mb-10 sm:hidden">
          {tabs.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTab === index
                  ? "bg-[#3571F0] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
                }`}
           
            />
          ))}
        </div>
        <div className="sm:hidden text-center mb-10">
          <h3 className="text-2xl font-bold bg-[#3571F0] bg-clip-text text-transparent inline-block">
            {tabs[activeTab].title}
          </h3>
        </div> */}
        <div className="relative group/nav">
          <button
            className="swiper-button-prev-custom hidden md:flex absolute xl:-left-20 lg:-left-12 top-1/2 
          -translate-y-1/2 z-20 text-[#3571F0] border-2 border-[#3571F0] w-12 h-12 rounded-full items-center justify-center 
          bg-transparent hover:bg-[#3571F0] hover:text-white transition-all disabled:opacity-30"
          >
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
          <button
            className="swiper-button-next-custom hidden md:flex absolute xl:-right-20 lg:-right-12 top-1/2
           -translate-y-1/2 z-20 text-[#3571F0] border-2 border-[#3571F0] w-12 h-12 rounded-full items-center justify-center 
           bg-transparent hover:bg-[#3571F0] hover:text-white transition-all disabled:opacity-30"
          >
            <ArrowRight size={24} strokeWidth={3} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{ clickable: true, el: ".custom-pagination" }}
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
                <Card item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination flex justify-center md:hidden mt-8 gap-2"></div>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
          .custom-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #D1D5DB;
            opacity: 1;
            transition: all 0.3s ease;
            margin: 0 4px !important;
          }
          .custom-pagination .swiper-pagination-bullet-active {
            background: #3571F0;
            border-radius: 5px;
          }
        `}} />
      </div>
    </div>
  );
}
