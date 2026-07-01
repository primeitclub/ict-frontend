import SectionContainer from "../../components/sectionContainer.tsx";
import SponsorData from "./SponsorData.tsx";
import GlowCircle from "./GlowCircle.tsx";
import { useApiQuery } from "../../../lib/index.ts";
import { useVersionData } from "../../hooks/use-version-data.ts";
import { Mail, Phone } from "lucide-react";

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

    return (
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#0b1528]/80 to-[#020919]/90 border border-blue-500/20 rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden mt-10 flex flex-col gap-6">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
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
              {(contactData?.email || contactData?.clubEmail) && (
                <a
                  href={`mailto:${contactData.email ?? contactData.clubEmail}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 w-full justify-center md:justify-start"
                >
                  <Mail size={18} className="text-blue-400 shrink-0" />
                  <span>{contactData.email ?? contactData.clubEmail}</span>
                </a>
              )}
              {(contactData?.phoneNumber || contactData?.clubPhoneNumber) && (
                <a
                  href={`tel:${contactData.phoneNumber ?? contactData.clubPhoneNumber}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 w-full justify-center md:justify-start"
                >
                  <Phone size={18} className="text-blue-400 shrink-0" />
                  <span>{contactData.phoneNumber ?? contactData.clubPhoneNumber}</span>
                </a>
              )}
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
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
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

        {renderBecomeSponsorCard()}

        <GlowCircle x="top-0" y="-left-[20%]" />
        <GlowCircle x="top-[50%]" y="-right-[5%] sm:right-[20%] xl:-right-[10%]" />
        <GlowCircle x="bottom-0" y="-left-[20%]" />
      </div>
    </SectionContainer>
  );
};

export default Sponsors;
