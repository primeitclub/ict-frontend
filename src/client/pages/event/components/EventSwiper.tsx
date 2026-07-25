import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";

import { useNavigate } from "react-router-dom";

import TopBgContent from "../../../components/bg-content";
import type { ApiEvent } from "../useEvents";
import { getImageUrl } from "../../../../lib/imageUtils";
import { useVersion } from "../../../routes/VersionContext";
import { slugify } from "../../../../lib";

interface EventSwiperProps {
  events: ApiEvent[];
}

// Swiper's centered coverflow loop needs at least ~5 real slides to wrap
// seamlessly: with a fractional slidesPerView (1.4/1.5) and centeredSlides it
// rounds the effective slides-per-view up to 3 and then requires
// slidesPerView + loopedSlides (= 3 + 2 = 5) slides before it will loop without
// glitching at the A/E seam. When there are fewer highlighted events (or exactly
// 5, which is the razor's edge) the loop either breaks or jumps. We repeat the
// ordered highlight set enough times to clear this threshold with margin, so the
// loop is always smooth for any count >= 2. Pagination below still shows exactly
// one dot per real event, mapped through realIndex.
const LOOP_MIN_SLIDES = 8;

const EventSwiper = ({ events }: EventSwiperProps) => {
  const navigate = useNavigate();
  const { getPath } = useVersion();
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeReal, setActiveReal] = useState(0);

  const baseSlides = events.filter((e) => e.imageUrl);
  const realCount = baseSlides.length;
  // Signature of the highlight set; keeps the memo (and thus Swiper's slide
  // identities) stable across parent re-renders that don't change the highlights.
  const idSig = baseSlides.map((e) => e.id).join("|");
  const canLoop = realCount > 1;

  // Repeat the ordered set so the loop always has enough slides. Keys stay
  // stable per (event, repeat) so category-tab re-renders don't re-init Swiper
  // and reset autoplay.
  const loopSlides = useMemo(() => {
    if (realCount === 0) return [];
    const repeat = canLoop ? Math.max(1, Math.ceil(LOOP_MIN_SLIDES / realCount)) : 1;
    const out: { event: ApiEvent; realIndex: number; key: string }[] = [];
    for (let r = 0; r < repeat; r += 1) {
      baseSlides.forEach((event, i) =>
        out.push({ event, realIndex: i, key: `${event.id}-${r}` }),
      );
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSig]);

  if (realCount === 0) return null;

  return (
    <TopBgContent
      position="absolute"
      variant="black-glow"
      bannerClassName="hidden md:flex"
    >
      <div className="max-w-[1200px] mx-auto px-0 sm:px-4 pt-0 md:pt-16 md:min-h-[500px] flex items-center justify-center">
        <div className="relative w-full">
          <Swiper
            onSwiper={(s) => {
              swiperRef.current = s;
              setActiveReal(s.realIndex % realCount);
            }}
            onRealIndexChange={(s) => setActiveReal(s.realIndex % realCount)}
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5, coverflowEffect: { depth: 200 } },
              1024: { slidesPerView: 1.4, coverflowEffect: { depth: 350 } },
            }}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
            autoplay={canLoop ? { delay: 3000, disableOnInteraction: false } : false}
            loop={canLoop}
            className="events-swiper-3d !pb-8 md:!pb-16 overflow-visible w-full"
          >
            {loopSlides.map(({ event, key }) => (
              <SwiperSlide
                key={key}
                className="relative bg-transparent rounded-none md:rounded-3xl overflow-hidden group shadow-xl cursor-pointer"
                onClick={() =>
                  navigate(getPath(`/event-detail/${slugify(event.title)}`))
                }
              >
                <div className="overflow-hidden h-[240px] md:h-[515px]">
                  <img
                    src={getImageUrl(event.imageUrl)}
                    alt={event.title}
                    className="w-full h-full object-cover block md:rounded-t-lg image-reflect transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {canLoop && (
            <div className="events-swiper-pagination">
              {baseSlides.map((event, i) => (
                <button
                  type="button"
                  key={event.id}
                  aria-label={`Go to ${event.title}`}
                  aria-current={i === activeReal}
                  className={`events-swiper-bullet${i === activeReal ? " is-active" : ""}`}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </TopBgContent>
  );
};

export default EventSwiper;
