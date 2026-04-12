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
        width="container"
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
                <div className="flex flex-col items-center gap-8 text-lg font-medium tracking-wide w-full">
                  {pages.map(({ label, path }) => (
                    <NavLink
                      key={`${label}-${path}`}
                      className="text-white"
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
                  <div className="flex flex-col items-center gap-6 text-base font-normal text-gray-400">
                    {versions.map((v) => (
                      <NavLink
                        key={v}
                        to={`/${v.toLowerCase()}`}
                        className="hover:text-white transition-colors duration-300"
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

        <nav className="hidden gap-8 text-xl sm:flex text-white">
          {pages.map(({ label, path }) => (
            <NavLink
              key={`${label}-${path}`}
              to={getPath(path)}
              className={({ isActive }) =>
                isActive ? "text-secondary" : "hover:text-secondary/80"
              }
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
