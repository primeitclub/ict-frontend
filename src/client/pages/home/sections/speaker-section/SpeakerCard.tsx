import Speaker from "./../../../../../assets/speaker.png";
import Rightarrow from "./../../../../../assets/events_navigation.svg";
import Instagram from "./../../../../../assets/Instagram.svg";
import Github from "./../../../../../assets/Github.svg";
import LinkedIn from "./../../../../../assets/Linkedin.svg";

const SpeakerCard = () => {
  return (
    <div
      style={{
  boxShadow: `
    inset 1px 1px 0px rgba(255, 255, 255, 0.22),
      inset -1px -1px 0px rgba(255, 255, 255, 0.04),
      0 4px 32px rgba(0, 0, 0, 0.35)
  `,
}}
 className="relative w-[280px] bg-transparent rounded-2xl overflow-hidden border border-white/[0.05]">
      {/* Light sheen overlay — Layer 4 */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0" />

      {/* Glow Behind Everything */}
      <div
        className="
          absolute
          w-[400px] h-[400px]
          rounded-full
          bg-[radial-gradient(circle,#007AFF80_0%,transparent_70%)]
          blur-2xl
          top-24
          z-0
        "
      />

      {/* Card Content */}
      <div className="relative z-10 pt-6 pl-6 pr-2 flex flex-col gap-4">
        {/* Text */}
        <div className="flex flex-col gap-2 items-start">
          <span className="font-bold text-[28px] justify-start text-left">
            Saugat
            <br />
            KC
          </span>
          <div className="flex flex-col items-start gap-2 mb-2">
            <span className="font-primary text-sm font-medium">
              Artificial Intelligence Engineer
            </span>
            <span className="text-xs text-[#BBC0CC]">Qniverse</span>
            <div className="flex items-center gap-2 mt-1">
              <img src={Rightarrow} alt="Arrow" />
              <span className="text-[13px] bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent">
                AI in Finance
              </span>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 mb-3">
          <a>
            <img src={Instagram} alt="Instagram" />
          </a>
          <a>
            <img src={Github} alt="Github" />
          </a>
          <a>
            <img src={LinkedIn} alt="LinkedIn" />
          </a>
        </div>

        {/* Speaker Image */}
        <div className="mt-[-190px] flex justify-center">
          <img src={Speaker} alt="Speaker" className="z-20 relative" />
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;