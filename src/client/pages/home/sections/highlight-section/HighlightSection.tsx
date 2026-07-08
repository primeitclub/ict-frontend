import { useState, useRef } from "react";
import { CircleArrowRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SectionHeader from "../../../../components/section-header";
import Card from "../../../../components/card";
import SvgIcon from "../../../../components/icon/svgIcon";
import { tabs } from "./data";
import { Button } from "../../../../../shared/design-components";
import NavButton from "./components/NavButton";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHome } from "../../useHome";
import { useVersion } from "../../../../routes/VersionContext";
import type { ContentType } from "./types";
import { slugify } from "../../../../../lib";

export default function HighlightSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data: highlights = [] } = useHome((d) => d.sections.highlights);

  // TODO(mapping): Card's ContentType diverges from the Event entity. Confirmed
  // fields are wired; the rest are placeholders pending your confirmation:
  //  - speaker line uses `subtitle`; avatars/time aren't on the aggregate yet
  //    (left empty).
  //  - price is parsed from `fee` (a string) — confirm the fee format.
  //  - tabs are category-based, but highlights arrive as one flat published
  //    list, so every tab currently shows the same cards. Category grouping is
  //    deferred until we confirm the category shape on the payload.
  const cards: (ContentType & { id: string })[] = highlights.map((e) => ({
    id: e.id,
    image: e.imageUrl ?? "",
    title: e.title,
    speaker: e.subtitle ?? "",
    avatar: [],
    date: e.date ?? "",
    price: Number(e.fee) || 0,
    time: "",
    place: e.location,
    seats: Math.max(e.totalSeats - e.bookedSeats, 0),
    totalSeats: e.totalSeats,
  }));

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();
  const { getPath } = useVersion();

  if (!cards.length) return null;

  return (
    <div
      ref={sectionRef}
      className=" bg-[#F2F5FA] text-black max-h-[848px] relative"
    >
      <button
        className="absolute -top-5 left-[50%] transform -translate-x-1/2 z-48 cursor-pointer bg-white rounded-full p-2 drop-shadow-xl "
        onClick={scrollToSection}
      >
        <SvgIcon />
      </button>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:space-y-10 space-y-12">
        {/* section header */}
        <SectionHeader
          titleNormal="Event"
          titleHighlight="Overview"
          varient="secondary"
          className="justify-start"
        />

        {/* tabs */}
        <div className="hidden lg:flex lg:flex-wrap gap-x-12 gap-y-6 text-xl font-bold pb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`group  transition-transform duration-200 flex gap-3 items-center whitespace-nowrap 
                hover:text-[#3571F0] ${
                  activeTab === index ? "text-[#3571F0]" : "text-black"
                }`}
            >
              <CircleArrowRight
                size={24}
                className={`transition-transform duration-700 ${
                  activeTab === index
                    ? "text-[#3571F0]"
                    : "text-black -rotate-45 group-hover:rotate-0 group-hover:text-[#3571F0]"
                }`}
              />
              {tab.title}
            </button>
          ))}
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
            className="pb-16"
          >
            {cards.map((item, index) => (
              <SwiperSlide key={index} className="h-auto">
                {/*
                  Each card uses its loop index as a stagger delay (index * 0.1s),
                  so the row reveals left-to-right instead of all at once — that
                  cascade is what makes it feel interactive. whileInView + once
                  fires the reveal when the row scrolls into view, just once.
                  whileHover lifts the card for a tactile response.
                */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                >
                  <Card
                    className="hover:cursor-pointer "
                    onClick={() => navigate(getPath(`/event-detail/${slugify(item.title)}`))}
                    item={item}
                    eventId={item.id}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination flex justify-center lg:hidden mt-8 gap-2"></div>
            <Link to={getPath("/events")}>
            <Button
            className="flex items-center justify-center mx-auto"
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
  );
}
