import AboutSection from "./sections/about-section/AboutSection";
import FAQSection from "./sections/faq-section/FaqSection";
import GallerySection from "./sections/gallery-section/GallerySection";

import HighlightSection from "./sections/highlight-section/HighlightSection";
import { LandingSection } from "./sections/landing-section/LandingSection";
import SpeakerSection from "./sections/speaker-section/SpeakerSection";
import SponserSection from "./sections/sponser-section/SponserSection";
import { useHome } from "./useHome";

// Home page main component
export default function HomePage() {
  const { isLoading, isError } = useHome();
  if (isLoading) return <main className="min-h-screen" />;
  if (isError)
    return (
      <main className="min-h-screen flex items-center justify-center">
        Something went wrong loading this edition.
      </main>
    );

  return (
    <main>
      <LandingSection />
      <AboutSection />
      <HighlightSection />
      <SpeakerSection />
      <GallerySection />
      <SponserSection />
      <FAQSection />
    </main>
  );
}
