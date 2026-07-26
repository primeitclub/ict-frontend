import SectionContainer from "../../components/sectionContainer.tsx";
import SponsorData from "./SponsorData.tsx";
import { useApiQuery } from "../../../lib/index.ts";
import { useVersionData } from "../../hooks/use-version-data.ts";
import { useIsArchivedVersion } from "../../hooks/use-is-archived-version.ts";
import { useSiteSettings } from "../../hooks/use-site-settings.ts";
import { Mail, Phone, Download } from "lucide-react";
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
  // Archived edition → the event is over, so drop the "Join Our Sponsors" CTA.
  const { isArchived } = useIsArchivedVersion();

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
    // Only shown when a proposal has been uploaded in site settings.
    const proposalUrl = siteSettings?.proposalUrl ?? null;

    // The proposal is served from the API origin, so the anchor `download`
    // attribute is ignored (cross-origin) and the PDF just opens inline.
    // Fetch it as a blob and save it so the click downloads immediately;
    // fall back to opening in a new tab if the fetch is ever blocked.
    const handleDownloadProposal = async () => {
      if (!proposalUrl) return;
      try {
        const res = await fetch(proposalUrl);
        if (!res.ok) throw new Error(`Failed to fetch proposal (${res.status})`);
        const blob = await res.blob();
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = "ICT-Meetup-Sponsorship-Proposal.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(objectUrl);
      } catch {
        window.open(proposalUrl, "_blank", "noopener,noreferrer");
      }
    };

    return (
      <section className="w-full mt-10 rounded-3xl bg-[var(--color-accent-dark)] p-8 sm:p-10 lg:p-14 font-sans text-left">
        {/* Top: pitch on the left, contact details + CTA on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="max-w-xl">
            <Heading
              level="h2"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight !mb-6"
            >
              Join Our
              <br />
              Sponsors
            </Heading>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-md">
              Showcase your brand to a highly engaged tech audience while
              supporting innovation, learning, and community growth.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <div className="flex flex-col gap-8 items-start">
            {email && (
              <div className="flex items-center gap-5">
                <Mail size={26} className="shrink-0 text-white" />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                    Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-base sm:text-lg text-white truncate hover:underline transition-colors"
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
                    className="text-base sm:text-lg text-white hover:underline transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            )}
            {proposalUrl && (
              <button
                type="button"
                onClick={handleDownloadProposal}
                className="self-start flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer"
              >
                <Download size={20} className="shrink-0" />
                Download Proposal
              </button>
            )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (!sponsors.length) {
    return (
      <SectionContainer className="pt-10 md:pt-16 pb-8 md:pb-8">
        <div className="w-full flex flex-col gap-20 relative items-center">
          {isArchived ? (
            <p className="text-center text-white/60 py-40">No sponsors</p>
          ) : (
            renderBecomeSponsorCard()
          )}
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

        {!isArchived && renderBecomeSponsorCard()}
      </div>
    </SectionContainer>
  );
};

export default Sponsors;
