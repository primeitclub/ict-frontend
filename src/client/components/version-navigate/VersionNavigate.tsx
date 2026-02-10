import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { VERSIONS } from "../../../routes/utils/route-type";
import { useVersion } from "../../../routes/VersionContext";
import { cn } from "../../../shared/utils/cn";

export default function VersionNavigate() {
  const { navigateToVersion, version } = useVersion();

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full py-4 px-2 flex flex-col gap-2 shadow-2xl">
      <div className="relative flex flex-col gap-2">
        {!!VERSIONS &&
          VERSIONS.map((item) => (
            <button
              key={item}
              className={cn(
                "relative z-10 px-2 py-1 uppercase rounded-full text-white/60 hover:text-white text-sm font-semibold transition-colors text-center",
                version === item && "text-black",
              )}
              onClick={() => navigateToVersion(item)}
            >
              {version === item && (
                <motion.div
                  layoutId="activeVersion"
                  className="absolute inset-x-0 inset-y-0 rounded-full bg-primary-cyan shadow-lg shadow-cyan-500/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="flex items-center gap-1 justify-center">
                {item}
                {item !== version && <ChevronRight className="size-3" />}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
}
