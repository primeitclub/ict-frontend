import { useParams } from "react-router-dom";
import { EventDetailBanner } from "../components/EventDetailBanner";
import { SeatsAndQueryCard } from "../components/SeatsAndQueryCard";
import { EventDetailTabs } from "../components/EventDetailTabs";
import SectionContainer from "../../../components/sectionContainer";
import { useEventDetail } from "../useEventDetail";
import { useEventsList } from "../../event/useEvents";
import Card from "../../../components/card";
import SectionHeader from "../../../components/section-header";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import NavButton from "../../home/sections/highlight-section/components/NavButton";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { ContentType } from "../../event/types";

export default function EventsDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { event, isLoading, isError } = useEventDetail(eventId);

  // Other events: all published events excluding the current one
  const { events: otherEvents } = useEventsList();
  const relatedEvents = otherEvents
    .filter((e) => e.id !== eventId)
    .slice(0, 8);

  if (isLoading) {
    return (
      <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA] flex items-center justify-center">
        <p className="text-gray-400">Loading event…</p>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA] flex items-center justify-center">
        <p className="text-gray-500">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA]">
      <EventDetailBanner event={event} />
      <SectionContainer className="px-4 md:px-10 py-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <EventDetailTabs event={event} />
        <div className="w-full lg:w-72 md:flex-shrink md:pt-14">
          <SeatsAndQueryCard totalSeats={event.totalSeats} />
        </div>
      </SectionContainer>

      {relatedEvents.length > 0 && (
        <div className="bg-[#F2F5FA] text-black relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:space-y-10 space-y-12">
            <SectionHeader
              titleNormal=""
              titleHighlight="Other Events For You"
              varient="secondary"
              className="justify-start"
            />

            <div className="relative space-y-8 md:space-y-8">
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

              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{ prevEl: ".swiper-button-prev-custom", nextEl: ".swiper-button-next-custom" }}
                pagination={{ clickable: true, el: ".custom-pagination" }}
                breakpoints={{ 640: { slidesPerView: 2 }, 860: { slidesPerView: 3 }, 1300: { slidesPerView: 4 } }}
                className="pb-16"
              >
                {relatedEvents.map((e) => {
                  const cardItem: ContentType = {
                    image: e.imageUrl ?? "",
                    title: e.title,
                    speaker: e.subtitle ?? "",
                    avatar: [],
                    date: e.date ?? "",
                    price: Number(e.fee) || 0,
                    time: "",
                    place: e.location,
                    seats: e.totalSeats,
                    totalSeats: e.totalSeats,
                  };
                  return (
                    <SwiperSlide key={e.id}>
                      <Card item={cardItem} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              <div className="custom-pagination flex justify-center lg:hidden mt-8 gap-2" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
