import AboutSection from "./sections/about-section/AboutSection";
import FAQSection from "./sections/FAQs-section/FaqSection";
import HighlightSection from "./sections/highlight-section/HighlightSection";
import { LandingSection } from "./sections/landing-section/LandingSection";
import SpeakerSection from "./sections/speaker-section/SpeakerSection";
import SponserSection from "./sections/sponser-section/SponserSection";

// Home page main component
export default function HomePage() {
  return (
    <main>
      <LandingSection />
      <AboutSection />
      <HighlightSection />
      {/* <GallerySection /> */}
      <SpeakerSection />
      <SponserSection />
      <FAQSection />
    </main>
  );
}
