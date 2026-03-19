import { useState, useSyncExternalStore } from "react";
import { ChevronRight } from "lucide-react";

import SectionHeader from "../../../../components/sectionHeader";
import GalleryCard from "./components/GalleryCard";
import { GALLERY_IMAGES, GALLERY_POSITIONS } from "./data";
import type { ScreenSize } from "./types";

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getSnapshot = (): ScreenSize => {
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const getServerSnapshot = (): ScreenSize => "desktop";

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const [hovered, setHovered] = useState<number | null>(null);

  const screen = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const positions = GALLERY_POSITIONS[screen];
  const activeIndex = hovered ?? selected;

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <SectionHeader
        titleNormal="Through"
        titleHighlight="The Lens"
        varient="secondary"
        className="justify-center"
      />

      <div className="relative flex justify-center items-center h-[300px] md:h-[400px] lg:h-[500px]">
        {GALLERY_IMAGES.map((img, i) => {
          const offset =
            activeIndex !== null && i !== activeIndex
              ? i < activeIndex
                ? -25
                : 25
              : 0;

          return (
            <GalleryCard
              key={i}
              img={img}
              index={i}
              total={GALLERY_IMAGES.length}
              pos={positions[i]}
              isHovered={hovered === i}
              isSelected={selected === i}
              offset={offset}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setSelected(selected === i ? null : i)}
            />
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
