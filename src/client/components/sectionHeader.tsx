import React from "react";
import { cn } from "../../shared/utils/cn";

interface SectionHeaderProps {
  titleNormal: string;
  titleHighlight: string;
  className?: string;
  align?: "left" | "center" | "right";
  varient?: "primary" | "secondary";
}

export default function SectionHeader({
  titleNormal,
  titleHighlight,
  align = "left",
  className,
  varient = "primary",
}: SectionHeaderProps) {
  const varientStyles = {
    primary: "text-white",
    secondary: "text-black",
  };

  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const highlightColor =
    varient === "primary"
      ? "bg-gradient-to-b from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent"
      : "text-[#3571F0]";

  return (
    <div className={cn("w-full flex", alignStyles[align], className)}>
      <h2
        className={cn(
          "text-[60px] font-[650] mb-12 tracking-[-2.4px] w-fit ",
          varientStyles[varient || "primary"],
        )}
      >
        {titleNormal} <span className={highlightColor}>{titleHighlight}</span>
      </h2>
    </div>
  );
}
