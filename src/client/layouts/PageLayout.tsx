// client/layouts/PageLayout.tsx
import { Outlet, NavLink } from "react-router-dom";
import { useVersion } from "../../routes/VersionContext";
import { VERSIONS, LATEST_VERSION } from "../../routes/utils/route-type";

export default function PageLayout() {
  const { version, isLatest, getPath, navigateToVersion } = useVersion();

  const pages = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="app-layout">
      <header>
        {/* ===== VERSION NAVIGATION ===== */}
        <nav className="version-nav">
          <span>Version: </span>
          {VERSIONS.map((v) => (
            <button
              key={v}
              onClick={() => navigateToVersion(v)}
              className={version === v ? "active" : ""}
            >
              {v === LATEST_VERSION ? `${v} (Latest)` : v}
            </button>
          ))}
        </nav>

        {/* ===== PAGE NAVIGATION ===== */}
        <nav className="page-nav">
          {pages.map(({ path, label }) => (
            <NavLink
              key={path}
              to={getPath(path)}
              end={path === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* ===== CONTENT ===== */}
      <main>
        <div className="version-badge">
          Viewing: {isLatest ? "Latest" : version}
        </div>
        <Outlet />
      </main>
    </div>
  );
}
