// client/layouts/PageLayout.tsx
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer";
import Navbar from "./headers/Navbar";
import VersionNavigate from "./version-navigate/VersionNavigate";

export default function PageLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <VersionNavigate />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
