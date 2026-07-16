import { useState } from "react";
import EventSwiper from "./components/EventSwiper";
import CategoryTabs from "./components/CategoryTabs";
import EventGrid from "./components/EventGrid";
import { ArrowRight } from "lucide-react";
import Button from "../../../shared/design-components/button/Button";
import { useEventCategories, useEventsList } from "./useEvents";

export default function EventsPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");

  const { categories, isLoading: categoriesLoading } = useEventCategories();
  const categoryIdParam = activeCategoryId === "all" ? undefined : activeCategoryId;
  const { events, isLoading: eventsLoading } = useEventsList(categoryIdParam);

  // The top swiper is a "highlights" banner — only highlighted events belong there.
  const highlightedEvents = events.filter((e) => e.isHighlighted);

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA] pb-4">
      <EventSwiper events={highlightedEvents} />
      <div className="bg-[#F2F5FA] text-black">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:pt-6 sm:pb-16 md:space-y-10 space-y-12">
          <CategoryTabs
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={setActiveCategoryId}
            isLoading={categoriesLoading}
          />
          <EventGrid events={events} isLoading={eventsLoading} />
          <Button
            className="flex items-center justify-center mx-auto md:hidden"
            rightIcon={
              <div className="bg-[#3571F0] text-white px-1 py-1 rounded-full">
                <ArrowRight size={15} strokeWidth={2} />
              </div>
            }
            label="Load More"
            variant="ghost"
          />
        </div>
      </div>
    </div>
  );
}
