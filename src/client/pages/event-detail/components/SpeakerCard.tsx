import type { ISpeaker } from "../types";
import { getImageUrl } from "../../../../lib/imageUtils";
import SocialIcon from "../../../components/social-icon/SocialIcon";

const SOCIALS: {
  key: keyof NonNullable<ISpeaker["socials"]>;
  platform: string;
  label: string;
}[] = [
  { key: "linkedin", platform: "linkedin", label: "LinkedIn" },
  { key: "instagram", platform: "instagram", label: "Instagram" },
  { key: "portfolio", platform: "website", label: "Portfolio" },
];

export const SpeakerCard = ({
  name,
  role,
  company,
  bio,
  image,
  socials,
}: ISpeaker) => {
  const socialLinks = SOCIALS.filter(({ key }) => socials?.[key]);

  return (
    <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6 py-8 px-6 border-b border-gray-200 last:border-none">
      {/* Avatar card — same gradient fill as the event detail banner; the photo
          is centered both ways inside it. */}
      <div className="w-36 h-36 sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-[linear-gradient(180deg,#000_7%,var(--color-accent-dark)_230%)]">
        <img
          src={getImageUrl(image)}
          alt={name}
          className="w-full h-full object-contain object-center"
        />
      </div>
      {/* Info */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <h3 className="text-xl lg:text-2xl font-bold text-accent">{name}</h3>
        <p className="text-sm lg:text-base font-semibold text-gray-900">{role}</p>
        <p className="text-sm text-gray-500">{company}</p>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed text-justify">
          {bio}
        </p>

        {/* Socials — only the links the speaker actually has */}
        {socialLinks.length > 0 && (
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
            {socialLinks.map(({ key, platform, label }) => (
              <a
                key={key}
                href={socials?.[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:opacity-80 transition-opacity"
              >
                <SocialIcon platform={platform} className="w-6 h-6" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
