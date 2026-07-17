// SpeakerSection.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import SpeakerCard from "./SpeakerCard";
import SectionHeader from "../../../../components/section-header";
import SectionContainer from "../../../../components/sectionContainer";
import useWindowBreakPoints from "../../../../hooks/CheckResponsive";
import { useHome } from "../../useHome";
import type { Speaker } from "../../types";

// Shared card wrapper so the grid and the swiper get the identical
// index-staggered reveal + hover lift.
const AnimatedSpeakerCard = ({
  speaker,
  index,
}: {
  speaker: Speaker;
  index: number;
}) => (
  <motion.div
    className="h-full flex justify-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
  >
    <SpeakerCard speaker={speaker} />
  </motion.div>
);

const SpeakerSection = () => {
  const { data: speakers = [] } = useHome((d) => d.sections.speakers);
  const screen = useWindowBreakPoints();

  if (!speakers.length) return null;

  return (
    <SectionContainer className="mx-auto text-center px-4 sm:px-6 space-y-14">
      <SectionHeader
        titleNormal="Joining Us This"
        titleHighlight="Edition"
        varient="primary"
        align="center"
        className="mb-4"
      />

      {screen === "desktop" ? (
        // Desktop: static grid. Cards are a fixed 280px wide, so 4 columns only
        // fit inside the max-w-7xl container from xl up; between lg and xl the
        // grid falls back to 3 columns to avoid overlap (mirrors the old
        // Swiper's 1300px breakpoint for 4 slides).
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
          {speakers.map((speaker, index) => (
            <AnimatedSpeakerCard
              key={speaker.id}
              speaker={speaker}
              index={index}
            />
          ))}
        </div>
      ) : (
        // Mobile/tablet: swiper with dot pagination (nav arrows were only ever
        // shown on desktop, which now renders the grid instead).
        <div className="relative">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true, el: ".custom-pagination-speaker" }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              860: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {speakers.map((speaker, index) => (
              // !h-auto lets slides stretch to equal height
              <SwiperSlide
                key={speaker.id}
                className="!h-auto py-2 flex justify-center"
              >
                <AnimatedSpeakerCard speaker={speaker} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination-speaker flex justify-center mt-8 gap-2"></div>
        </div>
      )}
    </SectionContainer>
  );
};

export default SpeakerSection;
