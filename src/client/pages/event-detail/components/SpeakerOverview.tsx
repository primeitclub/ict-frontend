import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  EffectCoverflow,
  Autoplay,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { SPEAKERS } from "../data";
import { SpeakerCard } from "./SpeakerCard";

export const SpeakerOverview = () => {
  return (
    <>
      {/* Mobile: coverflow swiper */}
      <div className="block sm:hidden">
        <Swiper
          modules={[Pagination, EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          className="!pb-10"
        >
          {SPEAKERS.map((speaker, i) => (
            <SwiperSlide key={i} className="rounded-2xl overflow-hidden shadow-xl bg-white">
              <SpeakerCard {...speaker} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: original list */}
      <div className="hidden sm:block">
        {SPEAKERS.map((speaker, i) => (
          <SpeakerCard key={i} {...speaker} />
        ))}
      </div>
    </>
  );
};
