import { Swiper, SwiperSlide } from "swiper/react";
import { PageLayout } from "../../../../../shared/layouts";
import { FreeMode } from "swiper/modules";

const GallerySection = () => {
  return (
    <PageLayout as="section" width="full">
      <Swiper
        slidesPerView={6}
        spaceBetween={0}
        freeMode={true}
        grabCursor={true}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[FreeMode]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bg-yellow-700/100 h-[40px]">Test</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-700/90 h-[40px]">Test</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-700/80 h-[40px]">Test</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-700/70 h-[40px]">Test</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-700/60 h-[40px]">Test</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-700/50 h-[40px]">Test</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-700/40 h-[40px]">Test</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-700/30 h-[40px]">Test</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-700/10 h-[40px]">Test</div>
        </SwiperSlide>
      </Swiper>
    </PageLayout>
  );
};

export default GallerySection;
