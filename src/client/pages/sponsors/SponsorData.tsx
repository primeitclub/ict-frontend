
import { getImageUrl } from "../../../lib/imageUtils";

type SponsorItem = {
  imageUrl: string;
  /** External sponsor site — the logo becomes a link when present. */
  link?: string | null;
};

type TitleProps = {
  title: string;
  sponsors: SponsorItem[];
  altdata: string;
  big: boolean;
  sponsortier: boolean;
};

const SponsorTitle = (props: TitleProps) => {
  const { title, sponsors, altdata, big, sponsortier } = props;

  return (
    <div className="w-full flex justify-center text-center">
      <div className="flex flex-col md:flex-row w-full items-center md:items-start gap-5 sm:gap-24">
        {/* Title with a small "Our" eyebrow above the category name */}
        <div className="w-full md:w-[45%] text-center md:text-left">
          <span className="block text-xs md:text-sm font-semibold tracking-wide leading-none text-[#DBF5FF]/70 -mb-0.5">
            Our
          </span>
          <div
            className={`font-bold text-[#DBF5FF] leading-tight ${
              big ? "text-[30px] md:text-[40px]" : "text-[26px] md:text-[30px]"
            }`}
          >
            {title}
          </div>
        </div>

        {/* Sponsor Images */}
        <div
          className={`w-full justify-center place-items-center ${
            sponsors.length === 1 ? "flex sm:grid" : "grid"
          } ${
            sponsortier
              ? "grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-y-2"
              : "grid-cols-4  sm:grid-cols-5 px-[6%]  md:px-0 lg:pl-3  lg:pr-28  lg:gap-x-1 lg:gap-y-3"
          }`}
        >
          {sponsors.map((sponsor, index) => {
            const tileClass = `flex items-center justify-center ${
              sponsortier
                ? "w-[90px] h-[90px] sm:w-[130px] lg:p-1 sm:h-[130px]  lg:w-[180px] lg:h-[180px]"
                : "w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:px-1 lg:w-[120px] lg:h-[120px]"
            }`;
            const logo = (
              <img
                src={getImageUrl(sponsor.imageUrl)}
                alt={altdata}
                className={`w-full h-full object-contain ${
                  sponsortier ? "rounded-xl" : "rounded-lg"
                }`}
              />
            );
            // Same behavior as the home-page sponsor grid: a logo with a
            // link opens the sponsor's site in a new tab.
            return sponsor.link ? (
              <a
                key={index}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClass}
              >
                {logo}
              </a>
            ) : (
              <div key={index} className={tileClass}>
                {logo}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SponsorTitle;
