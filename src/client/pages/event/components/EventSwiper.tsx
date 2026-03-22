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

import TopBgContent from "../../../components/bg-content";

const EventSwiper = () => {
  return (
    <TopBgContent position="absolute">
      <div className="max-w-[1200px] mx-auto px-0 sm:px-4 pt-0 sm:pt-16 min-h-[500px] flex items-center justify-center">
        <Swiper
          modules={[Pagination, EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              coverflowEffect: { depth: 200 }, // Cleaner transition for tablets
            },
            1024: {
              slidesPerView: 1.4,
              coverflowEffect: { depth: 350 },
            },
          }}
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
          className="events-swiper-3d !pb-16 overflow-visible w-full"
        >
          {sliderData.map((slide, i) => (
            <SwiperSlide
              key={i}
              className="relative bg-transparent rounded-t rounded-b-lg sm:rounded-3xl overflow-hidden group shadow-xl"
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
    </TopBgContent>
  );
};

export default EventSwiper;

/**
/**. Test this component and tweak any value if necessary , position absolute when we need component above the background and relative when we need component inside the background.
 * 
 *   <TopBgContent position="relative">
      <span>subhead</span>
      <Heading>Heading First</Heading>
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi dicta
        perspiciatis deleniti at, dolore illo facere ipsa laboriosam sapiente
        ea?
      </Text>
      <Button label="View More" />
    </TopBgContent>
 */
