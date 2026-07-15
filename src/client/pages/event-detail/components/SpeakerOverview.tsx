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
import type { EventDetailData, EventDetailSpeaker } from "../useEventDetail";

interface SpeakerOverviewProps {
  event: EventDetailData;
}

const toCardProps = (speaker: EventDetailSpeaker) => ({
  name: speaker.name,
  role: speaker.designation,
  company: speaker.company ?? undefined,
  bio: speaker.description ?? undefined,
  image: speaker.imageUrl ?? "",
  socials: speaker.socialLinks
    ? {
        instagram: speaker.socialLinks.instagram,
        linkedin: speaker.socialLinks.linkedin,
      }
    : undefined,
});

export const SpeakerOverview = ({ event }: SpeakerOverviewProps) => {
  const speakers = event.speakers ?? [];

  if (speakers.length === 0) {
    return (
      <p className="text-gray-500 py-4">No speaker information available.</p>
    );
  }

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
          {speakers.map((speaker) => (
            <SwiperSlide
              key={speaker.id}
              className="rounded-2xl overflow-hidden shadow-xl bg-white"
            >
              <SpeakerCard {...toCardProps(speaker)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: list */}
      <div className="hidden sm:flex sm:flex-col sm:gap-6">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} {...toCardProps(speaker)} />
        ))}
      </div>
    </>
  );
};
