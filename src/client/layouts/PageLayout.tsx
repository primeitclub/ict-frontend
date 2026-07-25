// client/layouts/PageLayout.tsx
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer";
import Navbar from "./headers/Navbar";
import VersionNavigate from "./version-navigate/VersionNavigate";
import ScrollToTop from "../../global-wrappers/ScrollToTop";
import { useFavicon } from "../hooks/use-favicon";

export default function PageLayout() {
  useFavicon();

  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />
      <main className="overflow-x-clip">
        <VersionNavigate />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
