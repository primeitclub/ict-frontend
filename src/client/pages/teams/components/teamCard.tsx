import ref1 from "../team-images/ref1.jpg";
import LinkedIn from "../icons/linkedIn";
import { Globe, Instagram } from "lucide-react";
import { getImageUrl } from "../../../../lib/imageUtils";
import { cn } from "../../../../shared/utils/cn";

interface TeamCardProps {
  id?: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    portfolio?: string;
  };
  className?: string;
}

export default function TeamCard({ name, role, imageUrl, socialLinks, className }: TeamCardProps) {
  return (
    <div className={cn("grid justify-items-center text-center", className)}>
      <div className="relative min-w-[160px] w-full max-w-[210px] h-fit">
        {/* Team Member Image */}
        <img src={imageUrl ? getImageUrl(imageUrl) : ref1} alt="team-image" className="rounded-2xl" />
        {/* Icons on Image */}
        <div className="grid gap-2 absolute top-[12.96px] right-2">
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="w-[18px] h-[18px] text-white cursor-pointer" />
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedIn className="w-[18px] h-[18px] text-white cursor-pointer" />
            </a>
          )}
          {socialLinks.portfolio && (
            <a href={socialLinks.portfolio} target="_blank" rel="noopener noreferrer">
              <Globe className="w-[18px] h-[18px] text-white cursor-pointer" />
            </a>
          )}
        </div>
      </div>
      <span className="text-base font-sans font-bold leading-[32px] m-auto text-[#DBF5FF] bg-clip-text  ">
        {name}
      </span>
      <span className="font-sans text-xs mx-auto mb-[36px]">{role}</span>
    </div>
  );
}
