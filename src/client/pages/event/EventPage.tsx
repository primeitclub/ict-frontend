import { useState } from "react";
import EventSwiper from "./components/EventSwiper";
import CategoryTabs from "./components/CategoryTabs";
import EventGrid from "./components/EventGrid";
import { ArrowRight } from "lucide-react";
import Button from "../../../shared/design-components/button/Button";
import { useEventCategories, useEventsList } from "./useEvents";

const PAGE_SIZE = 10;

export default function EventsPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { categories, isLoading: categoriesLoading } = useEventCategories();
  const categoryIdParam = activeCategoryId === "all" ? undefined : activeCategoryId;
  const { events, isLoading: eventsLoading } = useEventsList(categoryIdParam);
  // The highlights banner is universal: it always shows every highlighted
  // event, regardless of the selected category tab, so it reads from the
  // unfiltered list. React Query dedupes this with the "All" tab's query.
  const { events: allEvents } = useEventsList();

  const handleCategorySelect = (id: string) => {
    setActiveCategoryId(id);
    setVisibleCount(PAGE_SIZE);
  };

  const highlightedEvents = allEvents.filter((e) => e.isHighlighted);
  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = events.length > visibleCount;

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F2F5FA]">
      <EventSwiper events={highlightedEvents} />
      <div className="bg-[#F2F5FA] text-black">
        <div className="mx-auto max-w-7xl px-4 pt-2 pb-12 sm:pt-12 md:pb-24 md:space-y-10 space-y-12">
          <CategoryTabs
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={handleCategorySelect}
            isLoading={categoriesLoading}
          />
          <EventGrid events={visibleEvents} isLoading={eventsLoading} />
          {hasMore && (
            <Button
              className="flex items-center justify-center mx-auto"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              rightIcon={
                <div className="bg-accent text-white px-1 py-1 rounded-full">
                  <ArrowRight size={15} strokeWidth={2} />
                </div>
              }
              label="Load More"
              variant="ghost"
            />
          )}
        </div>
      </div>
    </div>
  );
}
