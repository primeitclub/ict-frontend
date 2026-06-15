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

import { SpeakerCard } from "./SpeakerCard";
import type { EventDetailData } from "../useEventDetail";

interface SpeakerOverviewProps {
  event: EventDetailData;
}

export const SpeakerOverview = ({ event }: SpeakerOverviewProps) => {
  const speaker = event.speaker;

  if (!speaker) {
    return (
      <p className="text-gray-500 py-4">No speaker information available.</p>
    );
  }

  const speakerCardProps = {
    name: speaker.name,
    role: speaker.designation,
    company: speaker.company ?? undefined,
    bio: speaker.bio,
    image: speaker.imageUrl ?? "",
    socials: speaker.socialLinks
      ? {
          instagram: speaker.socialLinks.instagram,
          linkedin: speaker.socialLinks.linkedin,
        }
      : undefined,
  };

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
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={false}
          pagination={{ clickable: true, dynamicBullets: false }}
          className="!pb-10"
        >
          <SwiperSlide className="rounded-2xl overflow-hidden shadow-xl bg-white">
            <SpeakerCard {...speakerCardProps} />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Desktop: list */}
      <div className="hidden sm:block">
        <SpeakerCard {...speakerCardProps} />
      </div>
    </>
  );
};
