import { NavLink } from "react-router-dom";
import { useVersion } from "../../../routes/VersionContext";
import { useState } from "react";

import Logo2 from "./Logo/Logo2";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const { buildPath } = useVersion();
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto  sm:px-8 ">
      <Logo2 />
      <div className="relative sm:hidden">
        <button onClick={() => setToggle(!toggle)} className="bg-secondary p-1">
          {toggle ? <X /> : <Menu />}
        </button>
        {toggle && (
          
          <div className="absolute right-0 top-12 bg-white  rounded-xl py-6 px-10  ">
            <nav className="flex flex-col text-2xl text-black gap-5 ">
              <NavLink to={buildPath("")}>HomePage</NavLink>
              <NavLink to={buildPath("event")}>Events</NavLink>
              <NavLink to={buildPath("teams")}>Teams</NavLink>
              <NavLink to={buildPath("sponsors")}>Sponsors</NavLink>
            </nav>
          </div>
        )}
      </div>
      <nav className="hidden sm:flex  gap-8 text-xl  ">
        <NavLink to={buildPath("")}>Home</NavLink>
        <NavLink to={buildPath("event")}>Events</NavLink>
        <NavLink to={buildPath("teams")}>Teams</NavLink>
        <NavLink to={buildPath("sponsors")}>Sponsors</NavLink>
    
        
        
      </nav>
    </div>
  );
};

export default Navbar;
