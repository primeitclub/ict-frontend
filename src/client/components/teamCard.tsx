// import { cn } from "../../shared/utils/cn";
import ref1 from "../pages/teams/team-images/ref1.jpg";
import LinkedIn from "../pages/teams/icons/linkedIn";
import { Globe, Instagram } from "lucide-react";
interface TeamCardProps {
  id?: string;
  name: string;
  role: string;
}

export default function TeamCard({ name, role }: TeamCardProps) {
  return (
    <div className="grid">
      <div className="relative w-full max-w-[210px]">
        <img src={ref1} alt="team-image" />
        {/* Icons on Image */}
        <div className="grid gap-2 absolute top-[12.96px] right-2">
          <Instagram className="w-[14px] h-[14px] text-white cursor-pointer" />
          <LinkedIn className="w-[14px] h-[14px] text-white cursor-pointer" />
          <Globe className="w-[14px] h-[14px] text-white cursor-pointer" />
        </div>
      </div>
      <span className="text-base font-bold leading-[32px] m-auto bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent">
        {name}
      </span>
      <span className="text-xs mx-auto mb-[36px]">{role}</span>
    </div>
  );
}
