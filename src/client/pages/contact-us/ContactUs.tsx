import { Mail, Phone } from "lucide-react";
import { DEPARTMENTS, GENERAL_CONTACT } from "./data";
import DepartmentCard from "./components/DepartmentCard";

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-12 py-8 text-center sm:text-left">
      <div className="bg-[#3060E8] sm:rounded-2xl px-6 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-16 flex flex-col lg:flex-row gap-8 lg:gap-10">
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
            <a
              href={`mailto:${GENERAL_CONTACT.email}`}
              className="flex items-center justify-center sm:justify-start gap-2 text-white/90 text-sm sm:text-base hover:text-white transition-colors"
            >
              <Mail size={16} className="shrink-0" />
              {GENERAL_CONTACT.email}
            </a>
            <a
              href={`tel:${GENERAL_CONTACT.phone}`}
              className="flex items-center justify-center sm:justify-start gap-2 text-white/90 text-sm sm:text-base hover:text-white transition-colors"
            >
              <Phone size={16} className="shrink-0" />
              {GENERAL_CONTACT.phone}
            </a>
          </div>
        </div>

        {/* Right: Department grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {DEPARTMENTS.map((dept, i) => (
            <DepartmentCard key={i} {...dept} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
