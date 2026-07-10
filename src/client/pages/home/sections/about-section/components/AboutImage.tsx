import { motion } from "framer-motion";
import AboutLogo from "../../../../../../assets/about-img.png";
import { useHome } from "../../../useHome";
import { getImageUrl } from "../../../../../../lib/imageUtils";

const AboutImage = () => {
  const { data: about } = useHome((d) => d.sections.about);

  return (
    <div className="w-full lg:w-2/3 flex justify-center items-center">
      {/*
        Scroll reveal: image rises from the bottom into place. Bigger travel
        (80px) for a clear bottom->top motion, short duration with easeOut so
        it's fast but decelerates smoothly. viewport.once = play it once.
      */}
      <motion.img
        className="w-full h-auto object-contain"
        src={about?.imageUrl ? getImageUrl(about.imageUrl) : AboutLogo}
        alt="About"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default AboutImage;
