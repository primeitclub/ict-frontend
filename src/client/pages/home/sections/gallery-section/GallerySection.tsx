import { motion } from "framer-motion";
import { useState, useSyncExternalStore } from "react";

import image1 from "../../../../../assets/images/image1.webp";
import image2 from "../../../../../assets/images/image2.webp";
import image3 from "../../../../../assets/images/image3.webp";
import image4 from "../../../../../assets/images/image4.webp";
import image5 from "../../../../../assets/images/image5.webp";
import image6 from "../../../../../assets/images/image6.webp";
import image7 from "../../../../../assets/images/image7.webp";

import SectionHeader from "../../../../components/sectionHeader";
import { ChevronRight } from "lucide-react";

// Subscribing mechanism for screen size
const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getSnapshot = () => {
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const getServerSnapshot = () => "desktop" as const;

const GallerySection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const screen = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const images = [image1, image2, image4, image5, image6, image7, image3];

  const getPositions = () => {
    if (screen === "mobile") {
      return [
        { x: -120, y: 60, r: -24, w: 85, h: 130 },
        { x: -80, y: 40, r: -16, w: 90, h: 140 },
        { x: -40, y: 20, r: -8, w: 100, h: 155 },
        { x: 0, y: 0, r: 0, w: 110, h: 170 },
        { x: 40, y: 20, r: 8, w: 100, h: 155 },
        { x: 80, y: 40, r: 16, w: 90, h: 140 },
        { x: 120, y: 60, r: 24, w: 85, h: 130 },
      ];
    }
    if (screen === "tablet") {
      return [
        { x: -300, y: 90, r: -24, w: 140, h: 185 },
        { x: -200, y: 55, r: -16, w: 150, h: 200 },
        { x: -100, y: 25, r: -8, w: 165, h: 220 },
        { x: 0, y: 0, r: 0, w: 180, h: 240 },
        { x: 100, y: 25, r: 8, w: 165, h: 220 },
        { x: 200, y: 55, r: 16, w: 150, h: 200 },
        { x: 300, y: 90, r: 24, w: 140, h: 185 },
      ];
    }
    return [
      { x: -440, y: 140, r: -24, w: 230, h: 230 },
      { x: -320, y: 70, r: -16, w: 240, h: 240 },
      { x: -160, y: 16, r: -8, w: 260, h: 260 },
      { x: 0, y: 0, r: 0, w: 280, h: 280 },
      { x: 160, y: 16, r: 8, w: 260, h: 260 },
      { x: 320, y: 70, r: 16, w: 240, h: 240 },
      { x: 440, y: 140, r: 24, w: 230, h: 230 },
    ];
  };

  const positions = getPositions();

  function getIndex(totalLength: number, currentIndex: number): number {
    const mainIndex = Math.floor(totalLength / 2);
    return totalLength - Math.abs(currentIndex - mainIndex);
  }

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <SectionHeader
        titleNormal="Through"
        titleHighlight="The Lens"
        varient="secondary"
        className="justify-center"
      />

      <div className="relative flex justify-center items-center h-[400px] md:h-[500px] lg:h-[600px] mt-12 ">
        {images.map((img, i) => {
          const pos = positions[i];
          const isHovered = hovered === i;
          const isSelected = selected === i;
          const activeIndex = hovered ?? selected;

          const offset =
            activeIndex !== null && i !== activeIndex
              ? i < activeIndex
                ? -25
                : 25
              : 0;

          return (
            <motion.div
              key={i}
              className="absolute cursor-pointer"
              style={{
                zIndex: getIndex(images.length, i),
                width: pos.w,
                height: pos.h,
              }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setSelected(selected === i ? null : i)}
              initial={{ x: 0, y: 200, rotate: 0, opacity: 0 }}
              whileInView={{
                x: pos.x + offset,
                y: pos.y,
                rotate: pos.r,
                opacity: 1,
              }}
              viewport={{ once: true, amount: 0.5 }}
              animate={{
                scale: isHovered || isSelected ? 1.25 : 1,
                x: pos.x + offset,
                y: pos.y,
                rotate: pos.r,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 20,
              }}
            >
              <img
                src={img}
                className="
                w-full
                h-full
                rounded-[24px] md:rounded-[36px]
                object-cover
                shadow-2xl
                "
              />
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-16">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
          View More <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default GallerySection;
