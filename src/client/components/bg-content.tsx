import type React from "react";
import { cn } from "../../shared/utils/cn";
import SectionContainer from "./sectionContainer";

interface ByContentProps {
  position?: "relative" | "absolute";
  children: React.ReactNode;
  className?: string;
}

const TopBgContent = ({
  position = "relative",
  children,
  className,
}: ByContentProps): React.ReactNode => {
  const child = children as React.ReactNode;

  return (
    <div className={cn("w-full", className)}>
      <div
        style={{
          background: `linear-gradient(180deg, #020919 12.28%, #3571F0 209.51%)`,
        }}
        className={`${position}  h-[250px] md:h-[300px] w-full flex items-center`}
      >
        <SectionContainer as="div" key={"eventPage"} className="w-full">
          {position === "relative" && child}
        </SectionContainer>
      </div>
      {position === "absolute" && child}
    </div>
  );
};

export default TopBgContent;
