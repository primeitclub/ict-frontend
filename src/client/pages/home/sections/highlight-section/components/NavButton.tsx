import React from "react";
import { cn } from "../../../../../../shared/utils/cn";
import type { LucideIcon } from "lucide-react";

interface NavButtonProps {
  icon: LucideIcon;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, className }) => {
  return (
    <button
      className={cn(
        "hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 text-[#3571F0] border-2 border-[#3571F0] w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full items-center justify-center bg-white hover:bg-[#3571F0] hover:text-white transition-all duration-300 disabled:opacity-30",
        className,
      )}
    >
      <Icon size={25} strokeWidth={3} />
    </button>
  );
};

export default NavButton;
