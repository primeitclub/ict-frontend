import logo2 from "../../../../assets/logo@2x.png";
import { cn } from "../../../../shared/utils/cn";
import { getImageUrl } from "../../../../lib/imageUtils";

interface Logo2Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  src?: string | null;
}

const SIZE_CLASS: Record<NonNullable<Logo2Props["size"]>, string> = {
  sm: "h-8",
  md: "h-8 sm:h-12",
  lg: "h-10 sm:h-12 lg:h-14",
};

export default function Logo2({ className, size = "md", src }: Logo2Props) {
  return (
    <img
      src={src ? getImageUrl(src) : logo2}
      alt="logo"
      className={cn("object-contain w-auto", SIZE_CLASS[size], className)}
    />
  );
}
