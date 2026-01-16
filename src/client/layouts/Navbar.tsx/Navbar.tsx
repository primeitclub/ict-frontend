import { NavLink } from "react-router-dom";
import { useVersion } from "../../../routes/VersionContext";

const Navbar = () => {
  const { buildPath } = useVersion();
  return (
    <nav>
      <NavLink to={buildPath("")}>Home</NavLink>
      <NavLink to={buildPath("about")}>About</NavLink>
    </nav>
  );
};

export default Navbar;
