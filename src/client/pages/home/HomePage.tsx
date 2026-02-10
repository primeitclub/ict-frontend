import AboutSection from "./sections/about-section/AboutSection";
import GallerySection from "./sections/gallery-section/GallerySection";
import { LandingSection } from "./sections/landing-section/LandingSection";
import MetricSection from "./sections/metrics-section/MetricSection";

// Home page main component
export default function HomePage() {
  return (
    <main className="space-y-12">
      <LandingSection />
      <AboutSection />
      <MetricSection />
      <GallerySection />
    </main>
  );
}
