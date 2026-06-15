import SectionContainer from "../../components/sectionContainer.tsx";
import SponsorData from "./SponsorData.tsx";
import GlowCircle from "./GlowCircle.tsx";
import { useApiQuery } from "../../../lib/index.ts";
import { useVersionData } from "../../hooks/use-version-data.ts";

interface Category {
  id: string;
  name: string;
  displayName: string;
  displayOrder: number;
}

interface Sponsor {
  id: string;
  name: string;
  link: string | null;
  imageUrl: string | null;
  displayOrder: number;
  category: Category;
}

interface PaginatedResult<T> {
  items: T[];
  meta: { total: number; page: number; limit: number };
}

interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

const Sponsors = () => {
  const { versionId, isLoading: versionLoading } = useVersionData();

  const { data: categoriesRes, isLoading: categoriesLoading } = useApiQuery(
    "sponsorCategories",
  )<Envelope<PaginatedResult<Category>>>({
    queryParams: { limit: 100 },
    enabled: !!versionId,
  });

  const { data: sponsorsRes, isLoading: sponsorsLoading } = useApiQuery(
    "sponsors",
  )<Envelope<PaginatedResult<Sponsor>>>({
    queryParams: { versionId: versionId ?? undefined, limit: 200 },
    enabled: !!versionId,
  });

  const categories = (categoriesRes?.data?.items ?? []).slice().sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const sponsors = sponsorsRes?.data?.items ?? [];
  const isLoading = versionLoading || categoriesLoading || sponsorsLoading;

  if (isLoading) {
    return (
      <SectionContainer>
        <p className="text-center text-white/60 py-40">Loading sponsors…</p>
      </SectionContainer>
    );
  }

  if (!sponsors.length) {
    return (
      <SectionContainer>
        <p className="text-center text-white/60 py-40">No sponsors available.</p>
      </SectionContainer>
    );
  }

  // Group sponsors by category, preserving category sort order.
  const grouped = categories.map((cat, idx) => ({
    category: cat,
    items: sponsors
      .filter((s) => s.category?.id === cat.id)
      .slice()
      .sort((a, b) => a.displayOrder - b.displayOrder),
    // First category uses the "big" title style; subsequent use the smaller one.
    big: idx === 0,
    // Categories with displayOrder ≤ 3 are treated as tier sponsors (larger slots).
    sponsortier: cat.displayOrder <= 3,
  })).filter((g) => g.items.length > 0);

  return (
    <SectionContainer>
      <div className="w-full flex flex-col gap-20 mt-10 relative items-center">
        {grouped.map(({ category, items, big, sponsortier }) => (
          <SponsorData
            key={category.id}
            title={category.displayName}
            altdata={`${category.displayName} sponsor logo`}
            big={big}
            sponsortier={sponsortier}
            imgUrl={items.map((s) => s.imageUrl ?? "")}
          />
        ))}

        <GlowCircle x="top-0" y="-left-[20%]" />
        <GlowCircle x="top-[50%]" y="-right-[5%] sm:right-[20%] xl:-right-[10%]" />
        <GlowCircle x="bottom-0" y="-left-[20%]" />
      </div>
    </SectionContainer>
  );
};

export default Sponsors;
