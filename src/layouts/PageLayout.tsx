
import { Outlet } from "react-router-dom";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export default function PageLayout() {
  return (
    <div className="layout-wrapper">
      <Header />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
