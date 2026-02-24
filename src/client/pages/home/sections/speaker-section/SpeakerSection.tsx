import SpeakerCard from "./SpeakerCard";
import SectionHeader from "../../../../components/sectionHeader";
import SectionContainer from "../../../../../shared/layouts/sectionContainer";

const SpeakerSection = () => {
  return (
    <SectionContainer className="mx-auto text-center max-w-[1200px] px-4 sm:px-6 ">
      <SectionHeader
        titleNormal="Joining Us This"
        titleHighlight="Edition"
        varient="primary"
        align="center"
        className="mb-4"
      />

      {/* Grid for Speaker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-14 justify-items-center">
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
      </div>
    </SectionContainer>
  );
};

export default SpeakerSection;
