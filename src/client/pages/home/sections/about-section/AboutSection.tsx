import SectionContainer from "../../../../../shared/layouts/sectionContainer";
import SectionHeader from "../../../../components/section-header";
import AboutContent from "./components/AboutContent";
import AboutImage from "./components/AboutImage";

export const AboutSection = () => {
  return (
    <SectionContainer>
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#020919",
        }}
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-6 lg:gap-16 xl:gap-20 my-[200px]">
          {/* Mobile Title */}
          <SectionHeader
            titleHighlight="This Year's"
            titleNormal="Focus"
            align="center"
            className="block lg:hidden"
            reversePosition
          />

          <AboutContent />
          <AboutImage />
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
