import { Link } from "react-router-dom";
import { CircleArrowRight } from "lucide-react";
import type { Speaker } from "../../types";
import { getImageUrl } from "../../../../../lib/imageUtils";
import { slugify } from "../../../../../lib";
import { useHome } from "../../useHome";
import { useVersion } from "../../../../routes/VersionContext";
import linkedinIcon from "../../../../../assets/icons/LinkedIn-Light.png";
import instagramIcon from "../../../../../assets/icons/Instagram-Light.png";
import portfolioIcon from "../../../../../assets/icons/Portfolio-Light.png";

interface SpeakerCardProps {
  speaker: Speaker;
}

/**
 * Ensure a stored social link is an absolute URL. Links saved without a scheme
 * (e.g. "linkedin.com/in/x") would otherwise be treated as in-app relative
 * paths and never leave the site. Returns null for empty/missing links.
 */
const normalizeUrl = (url?: string | null): string | null => {
  const trimmed = url?.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
  const instagram = normalizeUrl(speaker.socialLinks?.instagram);
  const portfolio = normalizeUrl(speaker.socialLinks?.portfolio);
  const linkedin = normalizeUrl(speaker.socialLinks?.linkedin);

  const { getPath } = useVersion();
  // The Speaker entity carries no event relation, but each highlight event
  // lists its speakers — match by id to surface the speaker's related event.
  const { data: relatedEvent } = useHome((d) =>
    d.sections.highlights.find((event) =>
      event.speakers?.some((s) => s.id === speaker.id)
    )
  );

  return (
    <div
      style={{
        height: "392px",
        boxShadow: `
          inset 1px 1px 0px rgba(255, 255, 255, 0.22),
          inset -1px -1px 0px rgba(255, 255, 255, 0.04),
          0 4px 32px rgba(0, 0, 0, 0.35)
        `,
      }}
      className="relative w-[280px] bg-transparent rounded-2xl overflow-hidden border border-white/[0.05] flex flex-col"
    >
      {/* Glow Behind Everything */}
      <div
        className="
          absolute
          w-[400px] h-[400px]
          rounded-full
          bg-[radial-gradient(circle,#007AFF80_0%,transparent_70%)]
          blur-2xl
          top-24
          z-0
        "
      />

      {/* Card Content */}
      <div className="relative z-10 pt-6 pl-6 pr-2 flex flex-col flex-1 gap-8 sm:gap-9">
        {/* Text */}
        <div className="flex flex-col gap-3 sm:gap-2 items-start">
          <span className="font-semibold  text-[#DBF5FF] text-[28px] justify-start text-left">
            {speaker.name}
          </span>
          <div className="flex flex-col items-start gap-1 sm:gap-1 mb-2 sm:mb-0  ">
            <span className="font-primary text-sm font-normal sm:font-medium">
              {speaker.designation}
            </span>
            <span className="text-xs text-[#BBC0CC]">{speaker.company}</span>
          </div>
          {relatedEvent && (
            <Link
              to={getPath(`/event-detail/${slugify(relatedEvent.title)}`)}
              className="group relative z-20 flex items-center gap-2 mt-1"
            >
              <CircleArrowRight
                size={18}
                className="shrink-0 text-[#51A7FF] -rotate-45 transition-transform duration-700 group-hover:rotate-0"
              />
              <span className="text-left text-sm font-normal sm:font-medium font-primary bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent">
                {relatedEvent.title}
              </span>
            </Link>
          )}
        </div>

        {/* Social Icons — kept above the speaker photo (which is pulled up
            over this row by its negative margin) so they stay clickable */}
        <div className="relative z-20 flex gap-3 ">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${speaker.name} on LinkedIn`}
              className="rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51A7FF]"
            >
              <img src={linkedinIcon} alt="" className="w-[25px] h-[25px]" />
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${speaker.name} on Instagram`}
              className="rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51A7FF]"
            >
              <img src={instagramIcon} alt="" className="w-[25px] h-[25px]" />
            </a>
          )}
          {portfolio && (
            <a
              href={portfolio}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${speaker.name}'s portfolio`}
              className="rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51A7FF]"
            >
              <img src={portfolioIcon} alt="" className="w-[25px] h-[25px]" />
            </a>
          )}
        </div>

        {/* Speaker Image — sits naturally at the bottom */}
        {/* -mr-2 cancels the wrapper's pr-2 so the photo touches the card's
            right border */}
        <div className="relative z-0 pointer-events-none flex justify-end items-end flex-1 overflow-hidden mt-[-150px] sm:mt-[-120px] -mr-2">
          {speaker.imageUrl && (
            <img
              src={getImageUrl(speaker.imageUrl)}
              alt={speaker.name}
              className="object-contain object-top max-h-[220px] w-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
