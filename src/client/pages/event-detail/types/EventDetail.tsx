import { EventDetailBanner } from "../components/EventDetailBanner";
import { SeatsAndQueryCard } from "../components/SeatsAndQueryCard";
import { useState } from "react";
import SectionContainer from "../../../../shared/layouts/sectionContainer";
import { EventDetailTabs } from "../components/EventDetailTabs";
import SectionHeader from "../../../components/section-header";

import { Button } from "../../../../shared/design-components/";
import Card from "../../../components/card";
import { tabs } from "../data";
import { CircleArrowRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import NavButton from "../../home/sections/highlight-section/components/NavButton";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function EventsDetail() {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA]">
      <EventDetailBanner />

      <SectionContainer className="px-4 md:px-10 py-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Left — Tabs (full width on mobile, flex-1 on desktop) */}
        <EventDetailTabs />

        {/* Right — Sidebar (full width on mobile, fixed width on desktop) */}
        <div className="w-full lg:w-72 md:flex-shrink md:pt-14">
          <SeatsAndQueryCard />
        </div>
      </SectionContainer>
      <div className=" bg-[#F2F5FA] text-black max-h-[848px] relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:space-y-10 space-y-12">
          {/* section header */}
          <SectionHeader
            titleNormal=""
            titleHighlight="Other Events For You"
            varient="secondary"
            className="justify-start"
          />

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

            {/* <Button
              className="flex items-center justify-center mx-auto"
              rightIcon={
                <div className="bg-[#3571F0] text-white px-1 py-1 rounded-full">
                  <ArrowRight size={15} strokeWidth={2} />
                </div>
              }
              label="View more"
              variant="ghost"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
