import SectionContainer from "../../components/sectionContainer.tsx";
import SponsorData from "./SponsorData.tsx";
import { useApiQuery } from "../../../lib/index.ts";
import { useVersionData } from "../../hooks/use-version-data.ts";
import { useSiteSettings } from "../../hooks/use-site-settings.ts";
import { Mail, Phone } from "lucide-react";
import { Heading } from "../../../shared/design-components";

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

interface ContactDepartment {
  department: string;
  contacts: { name: string; phone: string }[];
}

interface ContactSettings {
  email: string | null;
  phoneNumber: string | null;
  contactDepartments: ContactDepartment[] | null;
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

  const { data: contactsRes } = useApiQuery(
    "settingsContacts",
  )<Envelope<ContactSettings>>({
    queryParams: { versionId: versionId ?? undefined },
    enabled: !!versionId,
    // Only feeds the optional "Join Our Sponsors" card (which falls back to
    // siteSettings), so don't let a slow/failing endpoint retry for ~7s.
    config: { retry: 1 },
  });
  const { data: siteSettings } = useSiteSettings();

  const categories = (categoriesRes?.data?.items ?? []).slice().sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const sponsors = sponsorsRes?.data?.items ?? [];
  // Contacts intentionally excluded: it only populates the optional contact
  // card, so it must not block the whole page from rendering.
  const isLoading = versionLoading || categoriesLoading || sponsorsLoading;

  if (isLoading) {
    return (
      <SectionContainer>
        <p className="text-center text-white/60 py-40">Loading sponsors…</p>
      </SectionContainer>
    );
  }

  const renderBecomeSponsorCard = () => {
    const contactData = contactsRes?.data;
    const email = contactData?.email ?? siteSettings?.clubEmail ?? null;
    const phone = contactData?.phoneNumber ?? siteSettings?.clubPhoneNumber ?? null;

    // Simple three-column card: heading | description | contact details.
    return (
      <section className="w-full mt-10 rounded-3xl bg-[var(--color-accent-dark)] p-8 sm:p-10 lg:p-14 font-sans text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          <Heading
            level="h2"
            className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight !mb-0"
          >
            Join Our
            <br />
            Sponsors
          </Heading>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Showcase your brand to a highly engaged tech audience while supporting innovation, learning, and community growth.
          </p>

          {(email || phone) && (
            <div className="flex flex-col gap-6">
              {email && (
                <div className="flex items-center gap-5">
                  <Mail size={26} className="shrink-0 text-white" />
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                      Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-base sm:text-lg text-white truncate hover:text-[#020919] hover:underline transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-5">
                  <Phone size={26} className="shrink-0 text-white" />
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                      Phone
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-base sm:text-lg text-white hover:text-[#020919] hover:underline transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    );
  };

  if (!sponsors.length) {
    return (
      <SectionContainer className="pt-10 md:pt-16 pb-8 md:pb-8">
        <div className="w-full flex flex-col gap-20 relative items-center">
          {renderBecomeSponsorCard()}
        </div>
      </SectionContainer>
    );
  }

  // Only sponsors that actually have a logo can be rendered.
  const renderableSponsors = sponsors.filter((s) => !!s.imageUrl);

  // Prefer the authoritative category record (with displayOrder / displayName)
  // from the categories endpoint, but fall back to the category embedded on the
  // sponsor — and finally to an "Others" bucket — so newly-added sponsors always
  // render even when the two endpoints are out of sync.
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const OTHERS_CATEGORY: Category = {
    id: "__others__",
    name: "others",
    displayName: "Our Sponsors",
    displayOrder: Number.MAX_SAFE_INTEGER,
  };

  const groupMap = new Map<string, { category: Category; items: Sponsor[] }>();
  for (const sponsor of renderableSponsors) {
    const category =
      (sponsor.category && categoryById.get(sponsor.category.id)) ??
      sponsor.category ??
      OTHERS_CATEGORY;
    const group = groupMap.get(category.id);
    if (group) {
      group.items.push(sponsor);
    } else {
      groupMap.set(category.id, { category, items: [sponsor] });
    }
  }

  const grouped = Array.from(groupMap.values())
    .sort((a, b) => a.category.displayOrder - b.category.displayOrder)
    .map((group, idx) => ({
      category: group.category,
      items: group.items.slice().sort((a, b) => a.displayOrder - b.displayOrder),
      // First category uses the "big" title style; subsequent use the smaller one.
      big: idx === 0,
      // Categories with displayOrder ≤ 3 are treated as tier sponsors (larger slots).
      sponsortier: group.category.displayOrder <= 3,
    }));

  return (
    <SectionContainer className="pt-10 md:pt-16 pb-8 md:pb-8">
      <div className="w-full flex flex-col gap-20 relative items-center">
        {grouped.map(({ category, items, big, sponsortier }) => (
          <SponsorData
            key={category.id}
            title={category.displayName}
            altdata={`${category.displayName} sponsor logo`}
            big={big}
            sponsortier={sponsortier}
            sponsors={items.map((s) => ({
              imageUrl: s.imageUrl ?? "",
              link: s.link,
            }))}
          />
        ))}

        {renderBecomeSponsorCard()}
      </div>
    </SectionContainer>
  );
};

export default Sponsors;
