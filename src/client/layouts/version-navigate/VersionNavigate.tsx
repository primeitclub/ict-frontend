import { VERSIONS } from "../../routes/route-type";
import { cn } from "../../../shared/utils/cn";
import "../../../App.css";
import { useVersion } from "../../routes/VersionContext";

export default function VersionNavigate() {
  const { navigateToVersion, version } = useVersion();

  return (
    <div className="fixed  right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 rounded-full py-4 px-2 hidden sm:flex flex-col gap-2 backblur-lg overflow-hidden bg-[#040F264D]">
      <div className="glass-specular"></div>
      <div className="relative flex flex-col gap-2">
        {!!VERSIONS &&
          VERSIONS.map((item) => (
            <button
              key={item}
              className={cn(
                "relative z-10 px-2 py-1 uppercase rounded-full text-white/60 hover:text-white text-sm font-semibold transition-colors text-center  overflow-hidden ",
                version === item && "text-white",
              )}
              onClick={() => navigateToVersion(item)}
            >
              {version === item && (
                <div
                  className="absolute inset-0 rounded-xl bg-btn-primary"
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="flex items-center gap-1 justify-center">
                {item}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
}
