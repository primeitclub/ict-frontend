import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Button from "../../../shared/design-components/button/Button";
import { Text } from "../../../shared/design-components";
import { useVersion } from "../../routes/VersionContext";
import mascot from "../../../assets/404-mascot.svg";

/**
 * Catch-all 404 page. Rendered inside PageLayout, so it keeps the navbar,
 * footer, and version rail. The "Back to Home" CTA is version-aware via
 * getPath, so a 404 on an old edition returns to that edition's home.
 */
const NotFound = () => {
  const { getPath } = useVersion();

  return (
    <section className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <motion.img
        src={mascot}
        alt=""
        className="w-64 sm:w-80 md:w-[26rem] select-none"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="flex flex-col gap-2">
        <Text align="center" className="text-white/70 text-base sm:text-lg">
          Let's get you back somewhere familiar
        </Text>
      </div>

      <Link to={getPath("/")}>
        <Button
          className="!w-fit text-sm sm:text-base !text-white"
          leftIcon={<Home size={18} />}
          label="Back to Home"
        />
      </Link>
    </section>
  );
};

export default NotFound;
