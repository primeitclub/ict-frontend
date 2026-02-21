import { cn } from "../utils/cn";

interface PageLayoutProps {
  as?: "div" | "main" | "section" | "article" | "aside" | "header" | "footer";
  width?: "full" | "container";
  className?: string;
  children: React.ReactNode;
}

const PageLayout = ({
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
        return "max-w-7xl mx-auto px-4 sm:px-6 md:px-8";
      default:
        return "max-w-7xl mx-auto px-4 sm:px-6 md:px-8";
    }
  }

  return <Tag className={cn(getWidth(width), className)}>{children}</Tag>;
};

export default PageLayout;
