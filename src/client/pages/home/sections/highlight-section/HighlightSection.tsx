import { useState, useRef } from "react";
import { CircleArrowRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SectionHeader from "../../../../components/section-header";
import Card from "../../../../components/card";
import SvgIcon from "../../../../components/icon/svgIcon";
import { tabs } from "./data";
import { Button } from "../../../../../shared/design-components";
import NavButton from "./components/NavButton";

export default function HighlightSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={sectionRef}
      className=" bg-[#F2F5FA] text-black h-screen relative"
    >
      <button
        className="absolute -top-5 left-[50%] z-50  cursor-pointer  bg-white rounded-full p-2"
        onClick={scrollToSection}
      >
        <SvgIcon />
      </button>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:space-y-10 space-y-12">
        {/* section header */}
        <SectionHeader
          titleNormal="Event"
          titleHighlight="Overview"
          varient="secondary"
          className="justify-start"
        />

        {/* tabs */}
        <div className="hidden lg:flex lg:flex-wrap gap-x-12 gap-y-6 text-xl font-bold pb-4">
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

        {/* swiper items */}
        <div className="relative space-y-8 md:space-y-8">
          {/* side buttons */}
          <div className="lg:block hidden">
            <NavButton
              icon={ArrowLeft}
              className="swiper-button-prev-custom left-2 sm:left-4 md:-left-6 lg:-left-10 xl:-left-16"
            />
            <NavButton
              icon={ArrowRight}
              className="swiper-button-next-custom right-2 sm:right-4 md:-right-6 lg:-right-10 xl:-right-16"
            />
          </div>

          {/* swiper items */}
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
              860: {
                slidesPerView: 3,
              },
              1300: {
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

          <div className="custom-pagination flex justify-center lg:hidden mt-8 gap-2"></div>

          <Button
            className="flex items-center justify-center mx-auto"
            rightIcon={
              <div className="bg-[#3571F0] text-white px-1 py-1 rounded-full">
                <ArrowRight size={15} strokeWidth={2} />
              </div>
            }
            label="View more"
            variant="ghost"
          />
        </div>
      </div>
    </div>
  );
}
