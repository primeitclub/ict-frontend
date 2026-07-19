"use client";

import { useNavigate, NavLink } from "react-router-dom";
import Logo2 from "../headers/Logo/Logo2";
import PrimeITClub from "../../../assets/PrimeITClub.svg";
import PrimeCollege from "../../../assets/PrimeCollege.svg";
import SectionContainer from "../../components/sectionContainer";
import { useVersion } from "../../routes/VersionContext";
import { useSiteSettings } from "../../hooks/use-site-settings";
import { useHome } from "../../pages/home/useHome";
import { useCurrentEditionHasNoEvents } from "../../hooks/use-current-edition-empty";
import { useActiveVersionHasNoTeams } from "../../hooks/use-active-version-empty";
import SocialIcon from "../../components/social-icon/SocialIcon";
import {
  hasSocialIcon,
  getSocialLabel,
} from "../../components/social-icon/socialIcons";

export const Footer = () => {
  const navigate = useNavigate();
  const { getPath, version } = useVersion();

  const editionLabel = version.toUpperCase();

  const { data: siteSettings } = useSiteSettings();
  // Same edition logo the navbar shows, instead of a hard-coded bundled asset.
  const { data: logo, isLoading: logoLoading } = useHome(
    (d) => d.edition.logoPath ?? d.edition.logo,
  );

  const clubEmail = siteSettings?.clubEmail || "itclub.prime@prime.edu.np";
  const clubPhone = siteSettings?.clubPhoneNumber || "+123 45 6 789";

  // Render every configured platform we have an icon for (facebook, instagram,
  // linkedin, x, tiktok, website), skipping any unknown ones.
  const socialLinks = (siteSettings?.socialMediaLinks ?? []).filter((l) =>
    hasSocialIcon(l.platform),
  );

  // Drop the Events link when the current edition has no published events yet
  // (mirrors the navbar). Past editions always keep it.
  const hideEvents = useCurrentEditionHasNoEvents();
  // Drop the Teams link when the active version has no team members.
  const hideTeams = useActiveVersionHasNoTeams();

  const pages = [
    { path: "/", label: "Home" },
    ...(hideEvents ? [] : [{ path: "/events", label: "Events" }]),
    ...(hideTeams ? [] : [{ path: "/teams", label: "Teams" }]),
    { path: "/sponsors", label: "Sponsors" },
    { path: "/contacts", label: "Contacts" },
  ];

  // Same external link in every version, so it isn't version-prefixed.
  const contributorsLink =
    "https://github.com/primeitclub/ict-meetup-contributers";

  return (
    <SectionContainer
      width="navbar"
      className="px-4 sm:px-6 !pt-20 !pb-12"
      as="footer"
    >
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:items-start lg:gap-0">
        <div className="relative w-full lg:w-auto">
          <div
            className="flex flex-col items-center cursor-pointer lg:items-start"
            onClick={() => navigate(getPath("/"))}
          >
            <div className="flex flex-col items-center lg:items-start w-[164px]">
              <Logo2
                size="lg"
                src={logo}
                loading={logoLoading}
                className="h-9 sm:h-11 md:h-16 lg:h-20"
              />
              {/* <p className="mt-2 text-lg font-semibold font-mona bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent text-center lg:text-left">
                Fusion Of Tech Talent & Creativity
              </p> */}
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`
        absolute right-4 top-1/2 -translate-y-1/2 
        flex items-center justify-center w-10 h-10 
        rounded-full bg-gradient-to-tr from-[#007AFF] to-[#DBF5FF] 
        lg:hidden
      `}
            aria-label="Back to top"
          >
            <svg
              width="17"
              height="22"
              viewBox="0 0 17 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.2599 2.58691L8.2599 21.2298M8.2599 2.58691L15.251 8.32318M8.2599 2.58691L1.26883 8.32318"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </button>
        </div>

        <div className="text-center lg:text-left ">
          <h1 className="text-accent-secondary font-sans font-semibold sm:text-xl text-lg">
            Contact Us
          </h1>
          <ul className="lg:mt-[16px] text-sm lg:text-base">
            <li>{clubPhone}</li>
          </ul>
          <ul className="lg:mt-[16px] text-sm lg:text-base">
            <li>{clubEmail}</li>
          </ul>
        </div>
        <div className="text-center lg:text-left ">
          <h1 className="text-accent-secondary font-sans font-semibold sm:text-xl text-lg">
            Connect
          </h1>
          <div>
            <ul className="mt-[5px] flex flex-row lg:flex-col gap-6 lg:gap-3 justify-center lg:justify-start list-none p-0 m-0">
              {socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.link || "#"}
                    target={social.link ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="lg:mt-[5px] flex items-center gap-[10px]"
                  >
                    <SocialIcon platform={social.platform} className="w-5 h-5" />
                    <span className="hidden tracking-wide lg:inline">
                      {getSocialLabel(social.platform)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>{" "}
        </div>

        <div className="text-center lg:text-left">
          <div className="flex flex-row items-center gap-2 lg:gap-[18px]">
            <p className="font-normal text-[14px] lg:text-[16px]">
              Organized by:
            </p>
            <img
              src={PrimeITClub}
              alt="Prime IT Club Logo"
              className="h-6 lg:h-auto"
            />
          </div>
          <div className="flex flex-row items-center gap-2 lg:gap-[18px] mt-[27px]">
            <p className="font-normal text-[14px] lg:text-[16px]">
              Supported By:
            </p>
            <img
              src={PrimeCollege}
              alt="Prime College"
              className="h-6 lg:h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mt-9 border-[0.8px] border-[#353535]"></div>

      <div className="flex flex-col items-center w-full gap-6 lg:flex-row lg:justify-between mt-9 lg:gap-0">
        <nav className="flex flex-wrap justify-center w-full gap-4 font-sans text-md lg:justify-start lg:gap-8 lg:text-lg lg:w-auto">
          {pages.map(({ label, path }) => (
            <NavLink
              key={`${label}-${path}`}
              to={getPath(path)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive
                    ? "text-nav-active font-semibold"
                    : "text-nav-default hover:text-nav-hover font-normal"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href={contributorsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 text-nav-default hover:text-nav-hover font-normal"
          >
            Contributors
          </a>
        </nav>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="items-center justify-center hidden w-full gap-2 text-sm font-semibold lg:flex hover:text-blue-400 lg:w-auto font-hubot"
          aria-label="Back to top"
        >
          Back to Top
          <span
            className="flex items-center justify-center 
w-10 h-10 lg:w-14 lg:h-14 
rounded-full bg-gradient-to-tr from-[#007AFF] to-[#DBF5FF]"
          >
            <svg
              width="17"
              height="22"
              viewBox="0 0 17 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.2599 2.58691L8.2599 21.2298M8.2599 2.58691L15.251 8.32318M8.2599 2.58691L1.26883 8.32318"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </span>
        </button>
      </div>

      <div className="relative mt-8 overflow-hidden text-center">
        <h1
          className="font-extrabold whitespace-nowrap  bg-[linear-gradient(to_bottom,#FFFFFF_0%,#DBF5FF_10%,#007AFF_50%,#04143B_100%)]  bg-clip-text text-transparent
                 text-[clamp(24px,14vw,190px)] leading-tight"
        >
          ICT MEETUP
        </h1>
        {/* h-[3em] sm:h-[5em] md:h-[7em] lg:h-[12em] */}
        <div
          className="absolute bottom-0 left-0 w-full
              h-[clamp(45px,12vw,800px)]
               bg-gradient-to-t from-[#000] to-transparent pointer-events-none"
        ></div>
      </div>

      <div className="mt-6 text-xs text-center text-[#FFFFFF] lg:text-sm font-regular font-sans">
        <p>
          © ICT Meetup {editionLabel} | Prime IT Club, Prime College
        </p>
      </div>
    </SectionContainer>
  );
};
