import { Mail, Phone } from "lucide-react";
import DepartmentCard from "./components/DepartmentCard";
import { useApiQuery } from "../../../lib";
import { useVersionData } from "../../hooks/use-version-data";
import { useSiteSettings } from "../../hooks/use-site-settings";

interface ContactDepartment {
  department: string;
  contacts: { name: string; phone: string }[];
}

interface ContactSettings {
  email: string | null;
  phoneNumber: string | null;
  contactDepartments: ContactDepartment[] | null;
}

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ContactUs = () => {
  const { versionId } = useVersionData();
  const { data: contactsRes, isLoading } = useApiQuery("settingsContacts")<{
    message: string;
    data: ContactSettings;
  }>({
    queryParams: { versionId: versionId ?? undefined },
    enabled: !!versionId,
  });
  const { data: siteSettings } = useSiteSettings();

  const contactData = contactsRes?.data;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-12 py-8 text-center text-white/60">
        Loading contacts...
      </div>
    );
  }

  return (
    // Special case: no top padding — this page sits flush against the navbar.
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-12 pt-0 pb-8 text-center sm:text-left">
      <div className="relative overflow-hidden bg-accent sm:rounded-2xl px-6 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-16 flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
          style={{ backgroundImage: NOISE_TEXTURE }}
          aria-hidden="true"
        />

        {/* Left: Partner with ICT Meetup */}
        <div className="relative flex flex-col gap-4 lg:max-w-[456px] shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight !mb-0">
            Partner with <br/> ICT Meetup
          </h2>
          <p className="relative text-white/80 text-sm lg:text-base leading-relaxed">
            We'd love to hear from you. Get in touch with our team for event
            inquiries, collaborations, sponsorship opportunities or general
            questions.
          </p>
          <div className="relative flex flex-col gap-5 mt-2">
            {siteSettings?.clubEmail && (
              <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider">
                  <Mail size={14} className="shrink-0" />
                  Email
                </div>
                <a
                  href={`mailto:${siteSettings.clubEmail}`}
                  className="text-white text-sm sm:text-base font-medium hover:text-[#020919] hover:underline transition-colors"
                >
                  {siteSettings.clubEmail}
                </a>
              </div>
            )}
            {siteSettings?.clubPhoneNumber && (
              <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider">
                  <Phone size={14} className="shrink-0" />
                  Phone
                </div>
                <a
                  href={`tel:${siteSettings.clubPhoneNumber}`}
                  className="text-white text-sm sm:text-base font-medium hover:text-[#020919] hover:underline transition-colors"
                >
                  {siteSettings.clubPhoneNumber}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Divider between left and right */}
        <div
          className="relative self-stretch bg-white/15 h-px w-full lg:h-auto lg:w-px shrink-0"
          aria-hidden="true"
        />

        {/* Right: Department grid */}
        <div className="relative flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {contactData?.contactDepartments?.map((dept, i) => (
            <DepartmentCard key={i} {...dept} />
          ))}
          {(!contactData?.contactDepartments || contactData.contactDepartments.length === 0) && (
            <div className="col-span-2 text-white/60 flex items-center justify-center h-full">
              No department contacts available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
