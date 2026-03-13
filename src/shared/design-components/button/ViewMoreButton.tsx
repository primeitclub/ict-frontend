import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface ViewMoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({ 
  label = "View more", 
  className,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 mt-16 font-medium group transition-colors hover:text-[#3571F0]",
        className
      )}
      {...props}
    >
      {label}
      <div className="bg-[#3571F0] text-white px-1 py-1 rounded-full group-hover:bg-blue-700 transition-colors">
        <ArrowRight size={15} strokeWidth={2} />
      </div>
    </button>
  );
};

export default ViewMoreButton;
