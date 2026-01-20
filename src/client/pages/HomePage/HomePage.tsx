import LandingSection from "./sections/LandingSection";
import AboutSection from "./sections/AboutSection";
import MetricSection from "./sections/MetricSection";

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
