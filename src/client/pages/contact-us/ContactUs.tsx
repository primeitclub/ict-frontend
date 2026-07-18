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
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-12 py-8 text-center sm:text-left">
      <div className="bg-accent sm:rounded-2xl px-6 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-16 flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Left: Any Queries */}
        <div className="flex flex-col gap-4 lg:max-w-[456px] shrink-0 justify-center">
          <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
            Any Queries?
          </h2>
          <p className="text-white/80 text-sm lg:text-base leading-relaxed">
            Partner with ICT MeetUp and showcase your brand to a vibrant
            community of tech enthusiasts, developers with chance to get
            featured on this site.
          </p>
          <div className="flex flex-col gap-3 mt-2 text-center sm:text-left">
            {siteSettings?.clubEmail && (
              <a
                href={`mailto:${siteSettings.clubEmail}`}
                className="flex items-center justify-center sm:justify-start gap-2 text-white/90 text-sm sm:text-base hover:text-white transition-colors"
              >
                <Mail size={16} className="shrink-0" />
                {siteSettings.clubEmail}
              </a>
            )}
            {siteSettings?.clubPhoneNumber && (
              <a
                href={`tel:${siteSettings.clubPhoneNumber}`}
                className="flex items-center justify-center sm:justify-start gap-2 text-white/90 text-sm sm:text-base hover:text-white transition-colors"
              >
                <Phone size={16} className="shrink-0" />
                {siteSettings.clubPhoneNumber}
              </a>
            )}
          </div>
        </div>

        {/* Right: Department grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
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
