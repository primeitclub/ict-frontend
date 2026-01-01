import { Routes, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactForm } from "./components/sections/ContactForm";

// Simple Landing Page component to stack the sections
const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ContactForm />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
