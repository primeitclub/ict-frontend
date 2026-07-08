import SectionContainer from "../../components/sectionContainer.tsx";
import SponsorData from "./SponsorData.tsx";
import GlowCircle from "./GlowCircle.tsx";
import { useApiQuery } from "../../../lib/index.ts";
import { useVersionData } from "../../hooks/use-version-data.ts";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Heading } from "../../../shared/design-components";
import { Link } from "react-router-dom";
import { useVersion } from "../../routes/VersionContext";

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
  teamName: string | null;
  clubEmail: string | null;
  clubPhoneNumber: string | null;
  contactDepartments: ContactDepartment[] | null;
}

const Sponsors = () => {
  const { versionId, isLoading: versionLoading } = useVersionData();
  const { getPath } = useVersion();

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

  const { data: contactsRes, isLoading: contactsLoading } = useApiQuery(
    "settingsContacts",
  )<Envelope<ContactSettings>>({
    queryParams: { versionId: versionId ?? undefined },
    enabled: !!versionId,
  });

  const categories = (categoriesRes?.data?.items ?? []).slice().sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const sponsors = sponsorsRes?.data?.items ?? [];
  const isLoading = versionLoading || categoriesLoading || sponsorsLoading || contactsLoading;

  if (isLoading) {
    return (
      <SectionContainer>
        <p className="text-center text-white/60 py-40">Loading sponsors…</p>
      </SectionContainer>
    );
  }

  const renderBecomeSponsorCard = () => {
    const contactData = contactsRes?.data;
    const organizerDepts = contactData?.contactDepartments?.filter(
      (dept) =>
        dept.department.toLowerCase().includes("organi") ||
        dept.department.toLowerCase().includes("sponsor")
    );

    // Fallback: If no specific organizer department, check if any department exists
    const deptsToDisplay =
      organizerDepts && organizerDepts.length > 0
        ? organizerDepts
        : contactData?.contactDepartments?.slice(0, 1) ?? [];

    const email = contactData?.email ?? contactData?.clubEmail ?? null;
    const phone = contactData?.phoneNumber ?? contactData?.clubPhoneNumber ?? null;

    // The whole card is a single link to the (version-aware) contact page.
    // Contact details are shown as read-only chips so we don't nest anchors.
    return (
      <Link
        to={getPath("/contacts")}
        aria-label="Become a sponsor — go to the contact page"
        className="group block w-full max-w-4xl bg-gradient-to-br from-[#0b1528]/80 to-[#020919]/90 border border-blue-500/20 hover:border-blue-400/60 rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(53,113,240,0.45)] relative overflow-hidden mt-10 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 group-hover:bg-blue-500/20 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between relative z-10 w-full">
          <div className="flex flex-col gap-4 text-center md:text-left max-w-lg">
            <Heading
              level="h2"
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent !mb-2"
            >
              Become a Sponsor
            </Heading>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans">
              Partner with ICT MeetUp and showcase your brand to a vibrant
              community of tech enthusiasts and developers. Get a chance to be
              featured and gain maximum visibility.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto shrink-0 font-sans">
            <div className="flex flex-col gap-3 items-center md:items-start text-sm sm:text-base text-white/95">
              {email && (
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/40 transition-all duration-300 w-full justify-center md:justify-start">
                  <Mail size={18} className="text-blue-400 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/40 transition-all duration-300 w-full justify-center md:justify-start">
                  <Phone size={18} className="text-blue-400 shrink-0" />
                  <span>{phone}</span>
                </div>
              )}
              <span className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#3571F0] group-hover:bg-[#2a5fd6] text-white font-semibold w-full justify-center md:justify-start transition-colors duration-300">
                Get in Touch
                <ArrowRight
                  size={18}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>
        </div>

        {/* Department Contacts */}
        {deptsToDisplay.length > 0 && (
          <div className="w-full mt-4 pt-6 border-t border-white/10 flex flex-col gap-3 relative z-10 font-sans">
            <h4 className="text-white/80 font-semibold text-sm tracking-wide text-center md:text-left">
              Contact Organizing Committee:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deptsToDisplay.flatMap((dept) =>
                dept.contacts.map((contact, idx) => (
                  <div
                    key={`${dept.department}-${idx}`}
                    className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-sm"
                  >
                    <span className="text-white/90 font-medium">{contact.name}</span>
                    <span className="text-blue-400 font-medium">{contact.phone}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </Link>
    );
  };

  if (!sponsors.length) {
    return (
      <SectionContainer>
        <div className="w-full flex flex-col gap-20 mt-10 relative items-center">
          <p className="text-center text-white/60 py-20">No sponsors available.</p>
          {renderBecomeSponsorCard()}
          <GlowCircle x="top-0" y="-left-[20%]" />
          <GlowCircle x="top-[50%]" y="-right-[5%] sm:right-[20%] xl:-right-[10%]" />
          <GlowCircle x="bottom-0" y="-left-[20%]" />
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

        {renderBecomeSponsorCard()}

        <GlowCircle x="top-0" y="-left-[20%]" />
        <GlowCircle x="top-[50%]" y="-right-[5%] sm:right-[20%] xl:-right-[10%]" />
        <GlowCircle x="bottom-0" y="-left-[20%]" />
      </div>
    </SectionContainer>
  );
};

export default Sponsors;
