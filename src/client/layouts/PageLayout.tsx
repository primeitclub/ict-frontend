// client/layouts/PageLayout.tsx
import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import Navbar from "../components/navigate/Navbar";
import VersionNavigate from "../components/version-navigate/VersionNavigate";

export default function PageLayout() {
  return (
    <div className="app-layout">
      <header>
        <Navbar />
      </header>
      <main>
        <VersionNavigate />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
