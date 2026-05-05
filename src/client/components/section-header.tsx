import { cn } from "../../shared/utils/cn";

interface SectionHeaderProps {
  titleNormal: string;
  titleHighlight: string;
  className?: string;
  align?: "left" | "center" | "right";
  varient?: "primary" | "secondary";
  reversePosition?: boolean;
}

export default function SectionHeader({
  titleNormal,
  titleHighlight,
  align = "left",
  className,
  varient = "primary",
  reversePosition = false,
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
          " text-[30px] md:text-[60px] font-[650] tracking-[-1.2px] md:tracking-[-2.4px] w-fit ",
          reversePosition ? "flex gap-2 flex-row-reverse" : "",
          varientStyles[varient || "primary"],
        )}
      >
        <span> {titleNormal}</span>{" "}
        <span className={highlightColor}>{titleHighlight}</span>
      </h2>
    </div>
  );
}
