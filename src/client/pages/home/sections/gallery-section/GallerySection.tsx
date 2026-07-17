import { useState } from "react";

import useWindowBreakPoints from "../../../../hooks/CheckResponsive";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import SvgIcon from "../../../../components/icon/svgIcon";
import SectionHeader from "../../../../components/section-header";
import GalleryCard from "./components/GalleryCard";

import { GALLERY_POSITIONS } from "./data";
import type { ScreenSize } from "./types";
import { Button } from "../../../../../shared/design-components";
import { useHome } from "../../useHome";

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // Gallery is a bounded (1-7) image array; the position maps below are laid
  // out for up to 7, so any image past index 6 has no slot and is skipped.
  const { data: gallery = [] } = useHome((d) => d.sections.gallery);

  const screen = useWindowBreakPoints() as ScreenSize;

  const positions = GALLERY_POSITIONS[screen];
  const activeIndex = hovered ?? selected;
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    const el = sectionRef.current;
    if (!el) return;
    // Offset by the sticky navbar height (h-[63px]) so the section's top edge
    // lands just below the navbar instead of scrolling underneath it.
    const NAVBAR_HEIGHT = 63;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Gallery images carry per-image links (set in the admin). The "View More"
  // button opens the first available link in a new tab.
  const viewMoreLink = gallery.find((g) => g.link)?.link ?? null;

  if (!gallery.length) return null;

  return (
    <div ref={sectionRef} className="w-full pt-16 pb-28 md:pt-24 md:pb-40 bg-white relative">
      <button
        className="absolute -top-5 left-[50%] transform -translate-x-1/2 z-56 cursor-pointer bg-white rounded-full p-2 drop-shadow-xl"
        onClick={scrollToSection}
      >
        <SvgIcon />
      </button>
      <div className="overflow-hidden">
        <SectionHeader
          titleNormal="Through"
          titleHighlight="The Lens"
          varient="secondary"
          className="justify-center"
        />

        <div className="relative flex justify-center items-center h-[300px] md:h-[400px] lg:h-[500px]">
          {gallery.slice(0, positions.length).map((img, i) => {
            const offset =
              activeIndex !== null && i !== activeIndex
                ? i < activeIndex
                  ? -25
                  : 25
                : 0;

            return (
              <GalleryCard
                key={img.id}
                img={img.imagePath}
                index={i}
                total={Math.min(gallery.length, positions.length)}
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
          <Button
            label="View More"
            rightIcon={<ChevronRight size={18} />}
            disabled={!viewMoreLink}
            onClick={() => {
              if (viewMoreLink) {
                window.open(viewMoreLink, "_blank", "noopener,noreferrer");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
