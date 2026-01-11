import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav className="flex gap-6 p-page-margin border-b border-secondary">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div>
        <Link to="/version-1">Version 1</Link>
        <Link to="/version-2">Version 2</Link>
        <Link to="/version-3">Version 3</Link>
      </div>
    </header>
  );
};
