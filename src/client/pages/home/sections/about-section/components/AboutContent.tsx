import { Heading, RichText } from "../../../../../../shared/design-components";
import SocialLinks from "./SocialLinks";
import { useHome } from "../../../useHome";

const AboutContent = () => {
  const { data: about } = useHome((d) => d.sections.about);

  return (
    <div className="w-full lg:w-2/4 text-center md:text-left flex flex-col justify-center">
      <div className="lg:space-y-12">
        {/* TODO(mapping): entity exposes a single `title`; the design splits it
            two-tone ("This Year's" / "Focus"). Confirm how title should map
            onto that split before wiring it. */}
        <Heading className="hidden lg:block font-semibold">
          <span className="bg-gradient-to-b from-[#DBF5FF] to-[#51A7FF] text-transparent bg-clip-text">
            This Year's
          </span>
          &nbsp; Focus
        </Heading>

        {/* `content` is sanitized HTML from the backend — rendered via RichText
            (DOMPurify) rather than as a plain string. */}
        <RichText
          className="my-1 md:my-2 xl:my-2 space-y-4 text-[#DFDFDF]"
          html={about?.content}
        />
      </div>
      <SocialLinks />
    </div>
  );
};

export default AboutContent;
