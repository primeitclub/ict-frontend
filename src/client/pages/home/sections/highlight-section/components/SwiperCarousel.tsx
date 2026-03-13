import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import NavButton from "./NavButton";
import Card from "../../../../../components/card";
import type { ContentType } from "../types";

interface SwiperCarouselProps {
  content: ContentType[];
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ content }) => {
  return (
    <div className="relative group/nav">
      <NavButton
        icon={ArrowLeft}
        className="swiper-button-prev-custom left-2 sm:left-4 md:-left-6 lg:-left-10 xl:-left-16"
      />
      <NavButton
        icon={ArrowRight}
        className="swiper-button-next-custom right-2 sm:right-4 md:-right-6 lg:-right-10 xl:-right-16"
      />

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
        className="pb-16"
      >
        {content.map((item, index) => (
          <SwiperSlide key={index}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination flex justify-center md:hidden mt-8 gap-2"></div>
    </div>
  );
};

export default SwiperCarousel;
