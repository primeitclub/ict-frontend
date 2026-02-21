import AboutSection from "./sections/about-section/AboutSection";
import { LandingSection } from "./sections/landing-section/LandingSection";
import HighlightSection from "./sections/highlight-section/HighlightSection";

// Home page main component
export default function HomePage() {
  return (
    <main className="space-y-12">
      <LandingSection />
      <AboutSection />
      <HighlightSection />
    </main>
  );
}
