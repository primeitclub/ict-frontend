import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SectionHeader from "../../../../components/section-header";
import Card from "../../../../components/card";
import { toEventCardItem } from "../../../../components/event-card-format";
import SvgIcon from "../../../../components/icon/svgIcon";
import { Button } from "../../../../../shared/design-components";
import NavButton from "./components/NavButton";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHome } from "../../useHome";
import { useVersion } from "../../../../routes/VersionContext";
import { slugify } from "../../../../../lib";

export default function HighlightSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data: highlights = [] } = useHome((d) => d.sections.highlights);

  const scrollToSection = () => {
    const el = sectionRef.current;
    if (!el) return;
    // Offset by the sticky navbar height (h-[63px]) so the section's top edge
    // lands just below the navbar instead of scrolling underneath it.
    const NAVBAR_HEIGHT = 63;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const { getPath } = useVersion();

  if (!highlights.length) return null;

  return (
    <div
      ref={sectionRef}
      className=" bg-[#F2F5FA] text-black relative"
    >
      <button
        className="absolute -top-5 left-[50%] transform -translate-x-1/2 z-48 cursor-pointer bg-white rounded-full p-2 drop-shadow-xl "
        onClick={scrollToSection}
      >
        <SvgIcon />
      </button>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pt-16 pb-28 md:pt-24 md:pb-40 space-y-6">
        {/* Section header, with "View more" on its own line directly below it.
            Desktop only — on mobile the button moves below the swiper
            pagination dots instead (see bottom of the section). */}
        <div className="space-y-6">
          <SectionHeader
            titleNormal="Major"
            titleHighlight="Highlights"
            varient="secondary"
            className="justify-center md:justify-start"
          />
          <div className="hidden md:flex justify-end">
            <Link to={getPath("/events")}>
              <Button
                className="flex items-center justify-center whitespace-nowrap"
                rightIcon={
                  <div className="bg-[#3571F0] text-white px-1 py-1 rounded-full">
                    <ArrowRight size={15} strokeWidth={2} />
                  </div>
                }
                label="View more"
                variant="ghost"
              />
            </Link>
          </div>
        </div>

        {/* swiper items */}
        <div className="relative space-y-8 md:space-y-8">
          {/* side buttons */}
          <div className="lg:block hidden">
            <NavButton
              icon={ArrowLeft}
              className="swiper-button-prev-custom left-2 sm:left-4 md:-left-6 lg:-left-10 xl:-left-16"
            />
            <NavButton
              icon={ArrowRight}
              className="swiper-button-next-custom right-2 sm:right-4 md:-right-6 lg:-right-10 xl:-right-16"
            />
          </div>

          {/* swiper items */}
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              860: {
                slidesPerView: 3,
              },
              1300: {
                slidesPerView: 4,
              },
            }}
            // The swiper clips at its own box (overflow: hidden), which used to
            // slice the card drop-shadows off in a hard line at the edges. The
            // padding gives the shadows room to fade out; the negative margins
            // cancel it so the cards stay aligned with the section. Keep the
            // padding smaller than spaceBetween (20px) or the neighbouring
            // off-screen slide peeks in.
            className="pb-16 !px-3 !-mx-3 !pt-2 !-mt-2"
          >
            {highlights.map((event, index) => (
              // !h-auto lets the flex slides stretch to the tallest card so every
              // card is the same height (same as the events-page grid), instead
              // of each slide sizing to its own content.
              <SwiperSlide key={event.id} className="!h-auto py-2">
                {/*
                  Each card uses its loop index as a stagger delay (index * 0.1s),
                  so the row reveals left-to-right instead of all at once — that
                  cascade is what makes it feel interactive. whileInView + once
                  fires the reveal when the row scrolls into view, just once.
                  whileHover lifts the card for a tactile response.
                */}
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                >
                  <Card
                    className="hover:cursor-pointer "
                    onClick={() => navigate(getPath(`/event-detail/${slugify(event.title)}`))}
                    item={toEventCardItem(event)}
                    eventId={event.id}
                    registerLink={event.registerLink ?? null}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination flex justify-center lg:hidden mt-8 gap-2"></div>

          {/* Mobile-only "View more": sits below the swiper pagination dots.
              On md+ the button lives at the top right next to the header. */}
          <div className="flex md:hidden justify-center">
            <Link to={getPath("/events")}>
              <Button
                className="flex items-center justify-center whitespace-nowrap"
                rightIcon={
                  <div className="bg-[#3571F0] text-white px-1 py-1 rounded-full">
                    <ArrowRight size={15} strokeWidth={2} />
                  </div>
                }
                label="View more"
                variant="ghost"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
