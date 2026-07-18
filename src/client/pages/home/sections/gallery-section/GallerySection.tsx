import { useCallback, useEffect, useState } from "react";

import useWindowBreakPoints from "../../../../hooks/CheckResponsive";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SvgIcon from "../../../../components/icon/svgIcon";
import SectionHeader from "../../../../components/section-header";
import GalleryCard from "./components/GalleryCard";

import { GALLERY_POSITIONS } from "./data";
import type { ScreenSize } from "./types";
import { Button } from "../../../../../shared/design-components";
import { useHome } from "../../useHome";
import { getImageUrl } from "../../../../../lib/imageUtils";

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

  // Clicking a card opens it enlarged in a lightbox; Escape closes it (the
  // backdrop click is handled on the overlay itself). Once open, the desktop
  // arrows / arrow keys / mobile swipe move through the whole gallery list,
  // wrapping at the ends. `direction` drives the slide animation: 0 = the
  // open/close zoom, ±1 = slide in from the right/left.
  const selectedImage = selected !== null ? gallery[selected] : null;
  const hasMultiple = gallery.length > 1;
  const [direction, setDirection] = useState(0);

  const showPrev = useCallback(() => {
    setDirection(-1);
    setSelected((s) =>
      s === null ? s : (s - 1 + gallery.length) % gallery.length
    );
  }, [gallery.length]);

  const showNext = useCallback(() => {
    setDirection(1);
    setSelected((s) => (s === null ? s : (s + 1) % gallery.length));
  }, [gallery.length]);

  const closeLightbox = useCallback(() => {
    setDirection(0);
    setSelected(null);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, closeLightbox, showPrev, showNext]);

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
                onClick={() => {
                  setDirection(0);
                  setSelected(i);
                }}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-16">
          {/* Same ghost "View more" button as the Major Highlights section */}
          <Button
            className="flex items-center justify-center whitespace-nowrap"
            rightIcon={
              <div className="bg-accent text-white px-1 py-1 rounded-full">
                <ArrowRight size={15} strokeWidth={2} />
              </div>
            }
            label="View more"
            variant="ghost"
            disabled={!viewMoreLink}
            onClick={() => {
              if (viewMoreLink) {
                window.open(viewMoreLink, "_blank", "noopener,noreferrer");
              }
            }}
          />
        </div>
      </div>

      {/* Lightbox: the clicked image enlarged over a dark backdrop. Clicking
          anywhere outside the image (or Escape) closes it; the card is
          deselected so it springs back to its slot in the stack. z-[100]
          keeps it above the fixed navbar (z-50). */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:px-24 sm:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            {/* Keyed by image id so navigating swaps images with a
                directional slide; direction 0 (open/close) falls back to the
                original zoom in/out. popLayout takes the exiting image out of
                flow so the incoming one is centered immediately. */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={selectedImage.id}
                src={getImageUrl(selectedImage.imagePath)}
                alt={`Gallery image ${(selected ?? 0) + 1} enlarged`}
                className="max-w-full max-h-full rounded-[24px] md:rounded-[36px] object-contain shadow-2xl cursor-default"
                custom={direction}
                variants={{
                  enter: (dir: number) =>
                    dir === 0
                      ? { x: 0, scale: 0.6, opacity: 0 }
                      : { x: dir > 0 ? 300 : -300, scale: 1, opacity: 0 },
                  center: { x: 0, scale: 1, opacity: 1 },
                  exit: (dir: number) =>
                    dir === 0
                      ? { x: 0, scale: 0.6, opacity: 0 }
                      : { x: dir > 0 ? -300 : 300, scale: 1, opacity: 0 },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                // Swipe left/right (mobile, and mouse-drag on desktop) to
                // move between photos.
                drag={hasMultiple ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80 || info.velocity.x < -500) showNext();
                  else if (info.offset.x > 80 || info.velocity.x > 500)
                    showPrev();
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GallerySection;
