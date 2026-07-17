import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Logo2 from "./Logo/Logo2";
import { Menu, X } from "lucide-react";
import SectionContainer from "../../components/sectionContainer";
import { useVersion } from "../../routes/VersionContext";
import { useVersions } from "../../hooks/use-versions";
import { useHome } from "../../pages/home/useHome";
import { useEventsList } from "../../pages/event/useEvents";

const Navbar = () => {
  const { getPath, navigateToVersion, version } = useVersion();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { data: logo, isLoading: logoLoading } = useHome(
    (d) => d.edition.logoPath ?? d.edition.logo,
  );
  const { events, isLoading: eventsLoading } = useEventsList();
  const versions = useVersions();

  // Only surface the Events link when this edition actually has events.
  // Keep it while loading to avoid a flash, hide it once confirmed empty.
  const hasEvents = eventsLoading || events.length > 0;

  // Lock page scroll while the mobile menu is open. Freezing the body with
  // position:fixed (instead of overflow:hidden) works on iOS Safari AND keeps
  // overflow rules off <body> — an overflow there clips the backdrop-blurred
  // fixed header in Chromium (the vanishing-navbar bug). The saved scrollY is
  // restored on close so the page doesn't jump to the top.
  useEffect(() => {
    if (!toggle) return;

    // If the viewport grows past the sm breakpoint (menu is display:none
    // there), close it so the scroll lock doesn't linger on desktop.
    const mq = window.matchMedia("(min-width: 640px)");
    const onBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches) setToggle(false);
    };
    mq.addEventListener("change", onBreakpointChange);

    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";

    return () => {
      mq.removeEventListener("change", onBreakpointChange);
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [toggle]);

  const pages = [
    { path: "/", label: "Home" },
    ...(hasEvents ? [{ path: "/events", label: "Events" }] : []),
    { path: "/teams", label: "Teams" },
    { path: "/sponsors", label: "Sponsors" },
    { path: "/contacts", label: "Contacts" },
  ];

  return (
    <>
      {/*
        `fixed` (not `sticky`): sticky kept failing on scroll-down because an
        ancestor became a scroll/clip container. Fixed positioning pins the bar
        to the viewport unconditionally, in both scroll directions. The spacer
        div below reserves the 63px the bar no longer occupies in flow.
      */}
      {/*
        While the mobile menu is open the bar darkens to near-solid so it reads
        as one dark surface with the menu overlay below it — at 70% over a
        bright section the bar looked washed-out against the black menu.
      */}
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full h-[63px] backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
          toggle ? "bg-[#010005]/95" : "bg-[#010005]/70"
        }`}
      >
        <SectionContainer
          width="navbar"
          className="flex items-center justify-between h-full w-full !py-0"
        >
          <div className="hover:cursor-pointer" onClick={() => navigate(getPath("/"))}>
            <Logo2 src={logo} loading={logoLoading} />
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setToggle(!toggle)}
              className="p-2 text-white relative z-50"
            >
              {toggle ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Matches the footer nav: same font size (text-md → lg:text-lg),
              hover = secondary accent (nav-hover), active = primary accent
              (nav-active) and stays bold; inactive items are regular weight. */}
          <nav className="hidden gap-8 font-sans text-md lg:text-lg sm:flex">
            {pages.map(({ label, path }) => (
              <NavLink
                key={`${label}-${path}`}
                to={getPath(path)}
                end={path === "/"}
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
          </nav>
        </SectionContainer>
      </header>

      {/* Flow spacer: the fixed header is out of normal flow, so this keeps
          page content starting 63px down exactly like the old sticky bar. */}
      <div aria-hidden="true" className="h-[63px]" />

      {/*
        Full-screen mobile menu. Rendered OUTSIDE <header> on purpose: the header
        uses backdrop-blur (a backdrop-filter), which makes it the containing
        block for any fixed descendant — a fixed child there gets clipped to the
        63px bar instead of covering the viewport (that was the crop/glitch). As
        a sibling it fills the screen and scrolls, so every item is reachable. It
        sits below the sticky header (z-40 < z-50) so the logo + close button
        stay on top and tappable.
      */}
      {toggle && (
        /*
          Outer div = the scroll container only. It starts BELOW the fixed
          63px header (top-[63px]) so the bar + close button stay visible.
          Centering happens on the INNER wrapper via min-h-full +
          justify-center: when the content is shorter than the viewport it is
          perfectly centered, and when it's taller the wrapper simply grows and
          scrolls. (Putting justify-center + overflow-y-auto on the SAME
          element clipped the top items — that was the off-center glitch.)
        */
        /* Semi-transparent frosted overlay (not flat black): the page shows
           faintly through the blur, and its tone matches the darkened bar so
           bar + menu read as one continuous dark glass surface. */
        <div className="fixed inset-x-0 top-[63px] bottom-0 z-40 bg-[#010005]/85 backdrop-blur-lg sm:hidden overflow-y-auto">
          <div className="min-h-full flex flex-col items-center justify-center gap-4 py-10 px-6">
          <div className="flex flex-col items-center gap-10 font-sans text-3xl tracking-wide w-full">
            {pages.map(({ label, path }) => (
              <NavLink
                key={`${label}-${path}`}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive
                      ? "text-nav-active font-semibold"
                      : "text-nav-default hover:text-nav-hover font-normal"
                  }`
                }
                to={getPath(path)}
                end={path === "/"}
                onClick={() => setToggle(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-10" />

          <div className="flex flex-col items-center w-full">
            <h3 className="bg-gradient-to-b from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent font-semibold text-2xl mb-6 tracking-wide">
              Versions
            </h3>
            <div className="flex flex-col items-center gap-6 text-lg font-normal text-gray-400">
              {versions.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`uppercase transition-colors duration-300 ${
                    version === v
                      ? "text-white font-semibold"
                      : "hover:text-white"
                  }`}
                  onClick={() => {
                    navigateToVersion(v);
                    setToggle(false);
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
