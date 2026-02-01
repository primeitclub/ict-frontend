import AboutSection from "./sections/about-section/AboutSection";
import { LandingSection } from "./sections/landing-section/LandingSection";
import MetricSection from "./sections/metric-section/MetricSection";

// Home page main component
export default function HomePage() {
  return (
    <div className="p-8 space-y-12 bg-primary">
      <LandingSection />
      <AboutSection />
      <MetricSection />
    </div>
  );
}
