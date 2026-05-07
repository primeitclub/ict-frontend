import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo2 from "./Logo/Logo2";
import { Menu, X } from "lucide-react";
import SectionContainer from "../../components/sectionContainer";
import { useVersion } from "../../routes/VersionContext";

const Navbar = () => {
  const { getPath } = useVersion();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative py-1 text-[16px] transition-colors duration-200",
      "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-full after:rounded-full",
      "after:bg-[#02369B] after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-out",
      "hover:text-white hover:after:scale-x-100",
      isActive ? "text-white after:scale-x-100" : "text-white/85",
    ].join(" ");

  const pages = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/teams", label: "Teams" },
    { path: "/sponsors", label: "Sponsors" },
    { path: "/contacts", label: "Contacts" },
  ];

  const versions = ["V8", "V7", "V6", "V5"];

  return (
    <header className="sticky top-0 z-50 w-full h-[63px] bg-[#020919] transition-all duration-300">
      <SectionContainer
        width="navbar"
        className="flex items-center justify-between h-full w-full !py-0"
      >
        <div className="hover:cursor-pointer" onClick={() => navigate("/")}>
          <Logo2 />
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => setToggle(!toggle)}
            className="p-2 text-white relative z-50"
          >
            {toggle ? <X size={28} /> : <Menu size={28} />}
          </button>

          {toggle && (
            <>
              <div
                className="fixed inset-0 bg-black/20 z-30"
                onClick={() => setToggle(false)}
              />

              <div className="fixed inset-x-4  top-[74px] bg-[#02091966]/40 backdrop-blur-md border border-white/20 rounded-[28px] py-10 px-6 z-40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-y-auto max-h-[80vh]">
                <div className="flex flex-col items-center gap-8 text-[16px] font-medium tracking-wide w-full">
                  {pages.map(({ label, path }) => (
                    <NavLink
                      key={`${label}-${path}`}
                      className={navLinkClass}
                      to={getPath(path)}
                      onClick={() => setToggle(false)}
                    >
                      {label}
                    </NavLink>
                  ))}
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-8" />

                <div className="flex flex-col items-center w-full">
                  <h3 className="bg-gradient-to-b from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent font-semibold text-xl mb-6 tracking-wide">
                    Versions
                  </h3>
                  <div className="flex flex-col items-center gap-6 text-[16px] font-normal text-gray-300">
                    {versions.map((v) => (
                      <NavLink
                        key={v}
                        to={`/${v.toLowerCase()}`}
                        className={navLinkClass}
                        onClick={() => setToggle(false)}
                      >
                        {v}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <nav className="hidden gap-8 sm:flex text-white">
          {pages.map(({ label, path }) => (
            <NavLink
              key={`${label}-${path}`}
              to={getPath(path)}
              className={navLinkClass}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </SectionContainer>
    </header>
  );
};

export default Navbar;
