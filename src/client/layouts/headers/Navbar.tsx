import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo2 from "./Logo/Logo2";
import { Menu, X } from "lucide-react";
import SectionContainer from "../../../shared/layouts/sectionContainer";
import { useVersion } from "../../../routes/VersionContext";
const Navbar = () => {
  const { getPath } = useVersion();
  const navigate = useNavigate();

  const pages = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/teams", label: "Teams" },
    { path: "/sponsors", label: "Sponsors" },
     { path: "/contact", label: "Contact Us" }
  ];

  const [toggle, setToggle] = useState(false);

  return (
    <SectionContainer
  as="header"
  className="sticky top-0 z-50 h-[63px] flex items-center justify-between bg-[#020919] px-6 !py-0"
>
      <div className="hover:cursor-pointer" onClick={() => navigate("/")}>
        <Logo2 />
      </div>
      <div className=" sm:hidden">
        <button onClick={() => setToggle(!toggle)} className="p-1 bg-secondary">
          {toggle ? <X /> : <Menu />}
        </button>
        {toggle && (
          <div className="fixed inset-6 top-[10%] bottom-[50%] bg-white  rounded-xl py-6 px-10 z-20 ">
            <div className="flex flex-col items-center gap-10 text-xl font-medium">
              {!!pages.length &&
                pages.map(({ label, path }) => (
                  <NavLink
                    key={`${label}-${path}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600"
                        : "text-black hover:text-blue-600"
                    }
                    to={getPath(path)}
                    onClick={() => setToggle(false)}
                  >
                    {label}
                  </NavLink>
                ))}
            </div>
          </div>
        )}
      </div>
      <nav className="hidden gap-8 text-xl sm:flex ">
        {!!pages.length &&
          pages.map(({ label, path }) => (
            <NavLink
              key={`${label}-${path}`}
              to={getPath(path)}
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-400"
              }
            >
              {label}
            </NavLink>
          ))}
      </nav>
    </SectionContainer>
  );
};

export default Navbar;
