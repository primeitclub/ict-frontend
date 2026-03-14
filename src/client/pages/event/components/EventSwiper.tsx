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
import { sliderData } from "../data";

const EventSwiper = () => {
  return (
    <div className="bg-[#F2F5FA] text-black">
      <div className="bg-gradient-to-t from-[#3571F0] to-[#020919] h-[250px] md:h-[300px] pt-10 relative">
        <div className="max-w-[1200px] mx-auto px-4 min-h-[500px] flex items-center justify-center">
          <Swiper
            modules={[Pagination, EffectCoverflow, Autoplay, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 1.4 },
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 350,
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
            className="events-swiper-3d !pb-16 overflow-visible w-full"
          >
            {sliderData.map((slide, i) => (
              <SwiperSlide
                key={i}
                className="relative bg-white rounded-lg overflow-hidden group shadow-xl"
              >
                <div className="overflow-hidden h-[240px] md:h-[515px]">
                  <img
                    src={slide.image}
                    alt={`slide-${i}`}
                    className="w-full h-full object-cover block rounded-t-lg image-reflect transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default EventSwiper;
