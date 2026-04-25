import { cn } from "../../shared/utils/cn";
import React from "react";

interface PageLayoutProps {
  as?: "div" | "main" | "section" | "article" | "aside" | "header" | "footer";
  width?: "full" | "container" | "navbar";
  className?: string;
  children: React.ReactNode;
}

const SectionContainer = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  (
    { as = "div", width = "container", className, children }: PageLayoutProps,
    ref,
  ) => {
    const Tag = as;

    function getWidth(width: "full" | "container" | "navbar") {
      switch (width) {
        case "navbar":
          return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-12";
        case "full":
          return "w-full max-w-screen-2xl mx-auto ";
        case "container":
          return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 my-[60px] md:my-[120px] lg:my-[160px] xl:my-[200px]";
      }
    }

    return (
      <Tag
        ref={ref}
        className={cn(
          getWidth(width),
          className,
          as === "footer" ? "my-0 py-0" : "",
        )}
      >
        {children}
      </Tag>
    );
  },
);

export default SectionContainer;
