import { cn } from "../utils/cn";

interface PageLayoutProps {
  as?: "div" | "main" | "section" | "article" | "aside" | "header" | "footer";
  width?: "full" | "container";
  className?: string;
  children: React.ReactNode;
}

const SectionContainer = ({
  as = "div",
  width = "container",
  className,
  children,
}: PageLayoutProps): React.ReactNode => {
  const Tag = as;

  function getWidth(width: "full" | "container") {
    switch (width) {
      case "full":
        return "w-full max-w-screen-2xl mx-auto ";
      case "container":
        return "max-w-7xl mx-auto";
      default:
        return "max-w-7xl mx-auto";
    }
  }

  return (
    <Tag className={cn("py-32", getWidth(width), className)}>{children}</Tag>
  );
};

export default SectionContainer;
