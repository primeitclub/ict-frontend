"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/effect-coverflow";

interface CarouselItem {
  id: number;
  image: string;
}

export function SwiperContent() {
  const items: CarouselItem[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=500&fit=crop",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=500&fit=crop",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=500&fit=crop",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=500&fit=crop",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=500&fit=crop",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=500&fit=crop",
    },
  ];

  return (
    <div className="flex items-center justify-center overflow-hidden p-4">
      <div className="w-full max-w-6xl">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          coverflowEffect={{
            rotate: 0,
            stretch: 150,
            depth: 300,
            modifier: 2,
            slideShadows: true,
          }}
          pagination={{
            el: ".swiper-pagination",
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="w-full"
          style={{
            paddingBottom: "60px",
          }}
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{
                width: "728px",
                height: "400px",
              }}
            >
              {() => (
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300`}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={`Carousel item ${item.id}`}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
