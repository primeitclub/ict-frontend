import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  EffectCoverflow,
  Autoplay,
  Navigation,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import { useNavigate } from "react-router-dom";

import TopBgContent from "../../../components/bg-content";
import type { ApiEvent } from "../useEvents";
import { getImageUrl } from "../../../../lib/imageUtils";
import { useVersion } from "../../../routes/VersionContext";
import { slugify } from "../../../../lib";

interface EventSwiperProps {
  events: ApiEvent[];
}

const EventSwiper = ({ events }: EventSwiperProps) => {
  const navigate = useNavigate();
  const { getPath } = useVersion();
  const slides = events.filter((e) => e.imageUrl);

  return (
    <TopBgContent position="absolute" bannerClassName="hidden md:flex">
      <div className="max-w-[1200px] mx-auto px-0 sm:px-4 pt-0 md:pt-16 md:min-h-[500px] flex items-center justify-center">
        {slides.length === 0 ? null : (
          <Swiper
            modules={[Pagination, EffectCoverflow, Autoplay, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5, coverflowEffect: { depth: 200 } },
              1024: { slidesPerView: 1.4, coverflowEffect: { depth: 350 } },
            }}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={slides.length > 1}
            pagination={{ clickable: true, dynamicBullets: false }}
            className="events-swiper-3d !pb-8 md:!pb-16 overflow-visible w-full"
          >
            {slides.map((event) => (
              <SwiperSlide
                key={event.id}
                className="relative bg-transparent rounded-none md:rounded-3xl overflow-hidden group shadow-xl cursor-pointer"
                onClick={() =>
                  navigate(getPath(`/event-detail/${slugify(event.title)}`))
                }
              >
                <div className="overflow-hidden h-[240px] md:h-[515px]">
                  <img
                    src={getImageUrl(event.imageUrl)}
                    alt={event.title}
                    className="w-full h-full object-cover block md:rounded-t-lg image-reflect transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </TopBgContent>
  );
};

export default EventSwiper;
