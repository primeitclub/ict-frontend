import LandingSection from "./LandingSection";
import AboutSection from "./AboutSection";
import MetricSection from "./MetricSection";

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
