// SpeakerSection.tsx
import SpeakerCard from "./SpeakerCard";
import SectionHeader from "../../../../components/section-header";
import SectionContainer from "../../../../components/sectionContainer";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useHome } from "../../useHome";

const SpeakerSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { data: speakers = [] } = useHome((d) => d.sections.speakers);
  const totalCards = speakers.length;

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const goTo = (index: number) => {
    if (animating || index === activeIndex) return;
    setAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setAnimating(false), 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      goTo(Math.min(activeIndex + 1, totalCards - 1));
    } else {
      goTo(Math.max(activeIndex - 1, 0));
    }
  };

  // Guard placed after all hooks (rules of hooks) — no speakers, no section.
  if (!speakers.length) return null;

  return (
    <SectionContainer className="mx-auto text-center px-4 sm:px-6 space-y-14 my-20 sm:my-32">
      <SectionHeader
        titleNormal="Joining Us This"
        titleHighlight="Edition"
        varient="primary"
        align="center"
        className="mb-4"
      />

      {/* Mobile Carousel */}
      <div className="flex sm:hidden flex-col items-center gap-12">
        {/* Swipeable card area */}
        <div
          className="w-full flex justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* No key prop — just opacity transition */}
          <div
            style={{ transition: "opacity 0.3s ease" }}
            className={animating ? "opacity-0" : "opacity-100"}
          >
            {speakers[activeIndex] && (
              <SpeakerCard speaker={speakers[activeIndex]} />
            )}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalCards }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-2 h-2 bg-[#51A7FF]"
                  : "w-2 h-2 bg-[#ADADAD]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 xl:gap-6 justify-items-center">
        {speakers.map((speaker, i) => (
          // Same index-staggered reveal as the event cards: each card delays by
          // i * 0.08s so the grid populates in a wave. whileHover gives a lift.
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.04 }}
          >
            <SpeakerCard speaker={speaker} />
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default SpeakerSection;
