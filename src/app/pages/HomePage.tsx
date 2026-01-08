import { HeroSection } from "../../components/sections/HeroSection";
import { AboutSection } from "../../components/sections/AboutSection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <HeroSection />
      <AboutSection />
      <section className="p-8 bg-secondary rounded-lg">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Features Section
        </h2>
        <p className="text-secondary">
          This is an additional section for the homepage.
        </p>
      </section>
    </div>
  );
}
