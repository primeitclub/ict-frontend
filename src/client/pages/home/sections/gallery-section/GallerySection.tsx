import { useState } from "react";

import useWindowBreakPoints from "../../../../hooks/CheckResponsive";
import { ChevronRight } from "lucide-react";

import SectionHeader from "../../../../components/section-header";
import GalleryCard from "./components/GalleryCard";

import { GALLERY_IMAGES, GALLERY_POSITIONS } from "./data";
import type { ScreenSize } from "./types";
import { Button } from "../../../../../shared/design-components";

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const screen = useWindowBreakPoints() as ScreenSize;

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
        <Button label="View More" rightIcon={<ChevronRight size={18} />} />
      </div>
    </section>
  );
};

export default GallerySection;
