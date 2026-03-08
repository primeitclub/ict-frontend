import ref1 from "../team-images/ref1.jpg";
import LinkedIn from "../icons/linkedIn";
import { Globe, Instagram } from "lucide-react";

interface TeamCardProps {
  id?: string;
  name: string;
  role: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export default function TeamCard({ name, role, socialLinks }: TeamCardProps) {
  return (
    <div className="grid">
      <div className="relative w-full h-fit max-w-[210px]">
        {/* Team Member Image */}
        <img src={ref1} alt="team-image" className="rounded-2xl" />
        {/* Icons on Image */}
        <div className="grid gap-2 absolute top-[12.96px] right-2">
          <a href={socialLinks.instagram}>
            <Instagram className="w-[18px] h-[18px] text-white cursor-pointer" />
          </a>
          <a href={socialLinks.linkedin}>
            <LinkedIn className="w-[18px] h-[18px] text-white cursor-pointer" />
          </a>
          <a href={socialLinks.portfolio}>
            <Globe className="w-[18px] h-[18px] text-white cursor-pointer" />
          </a>
        </div>
      </div>
      <span className="text-base font-sans font-bold leading-[32px] m-auto text-[#DBF5FF] bg-clip-text text-transparent">
        {name}
      </span>
      <span className="font-sans text-xs mx-auto mb-[36px]">{role}</span>
    </div>
  );
}
