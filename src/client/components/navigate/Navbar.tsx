import { NavLink, useNavigate } from "react-router-dom";
import { useVersion } from "../../../routes/VersionContext";
import { useState } from "react";

import Logo2 from "./Logo/Logo2";
import { Menu, X } from "lucide-react";
import { PageLayout } from "../../../shared/layouts";
const Navbar = () => {
  // const { getPath } = useVersion();
  const navigate = useNavigate();

  const pages = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/teams", label: "Teams" },
    { path: "/sponsors", label: "Sponsors" },
  ];

  const [toggle, setToggle] = useState(false);
  return (
    <header>
      <PageLayout className="flex justify-between items-center py-4 px-6 ">
        <div onClick={() => navigate("/")}>
          <Logo2 />
        </div>
        <div className=" sm:hidden">
          <button
            onClick={() => setToggle(!toggle)}
            className="bg-secondary p-1"
          >
            {toggle ? <X /> : <Menu />}
          </button>
          {toggle && (
            <div className="fixed inset-6 top-[10%] bottom-[50%] bg-white  rounded-xl py-6 px-10  ">
              <div className="flex flex-col text-xl  items-center gap-10 font-medium">
                {!!pages.length &&
                  pages.map(({ label, path }) => (
                    <NavLink
                      key={`${label}-${path}`}
                      // to={getPath(path)}
                      className="text-black"
                      to="ss"
                    >
                      {label}
                    </NavLink>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* this is the one i am using right now */}
        <nav className="hidden sm:flex  gap-8 text-xl  ">
          {!!pages.length &&
            pages.map(({ label, path }) => (
              <NavLink key={`${label}-${path}`} to={"Sd"}>
                {label}
              </NavLink>
            ))}
        </nav>
      </PageLayout>
    </header>
  );
};

export default Navbar;
