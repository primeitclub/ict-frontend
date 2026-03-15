import { Heading, Text } from "../../../../../../shared/design-components";
import SocialLinks from "./SocialLinks";

const AboutContent = () => {
  return (
    <div className="w-full lg:w-1/3 text-center md:text-left flex flex-col justify-center">
      <div className="lg:space-y-12">
        <Heading className="hidden lg:block font-semibold">
          <span className="bg-gradient-to-b from-[#DBF5FF] to-[#51A7FF] text-transparent bg-clip-text">
            This Year's
          </span>
          &nbsp; Focus
        </Heading>

        <div className="my-1 md:my-2 xl:my-2 space-y-4">
          <Text className="text-[#DFDFDF]">
            ICT V8 focuses on the growing gap between the academia and industry.
            This event will bridge this. John doe loves apple and so do John Mo.
          </Text>
          <Text className="text-[#DFDFDF]">
            ICT V8 focuses on the growing gap between the academia and industry.
            This event will bridge this. John doe loves apple and so do John Mo.
          </Text>
        </div>
      </div>
      <SocialLinks />
    </div>
  );
};

export default AboutContent;
