import Button from "../../../../../shared/design-components/button/Button";
import { PageLayout } from "../../../../../shared/layouts";
import { SwiperContent } from "./component/swiper-content";

export function LandingSection() {
  return (
    <PageLayout as="section" className="landing_section space-y-10">
      {/* Light Beam Background */}
      <div className="text-center">
        {/* Date Badge */}
        <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm italic mb-6 text-white/90">
          Jan 12-14
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-[88px] font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
          ICT Meetup V8
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-lg text-white/70 mb-6">
          Fusion of Tech, Talent & Creativity
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="glass" size="large" label="Register Now" />

          <Button variant="solid-white" size="large" label="Be a Sponsor" />
        </div>
      </div>
      <div className="landing_swiper_section">
        <SwiperContent />
      </div>
    </PageLayout>
  );
}
