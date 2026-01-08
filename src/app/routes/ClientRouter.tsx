import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

export default function ClientRouter() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Simple Navigation for testing */}
      <nav className="flex gap-6 p-page-margin border-b border-secondary">
        <Link to="/" className="text-nav-default hover:text-nav-hover">
          Home
        </Link>
        <Link to="/about" className="text-nav-default hover:text-nav-hover">
          About
        </Link>
        <Link to="/contact" className="text-nav-default hover:text-nav-hover">
          Contact
        </Link>
      </nav>

      <main className="p-page-margin">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
}
