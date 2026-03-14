import { cn } from "../utils/cn";
import React from "react";

interface PageLayoutProps {
  as?: "div" | "main" | "section" | "article" | "aside" | "header" | "footer";
  width?: "full" | "container";
  className?: string;
  children: React.ReactNode;
}

const SectionContainer = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  (
    { as = "div", width = "container", className, children }: PageLayoutProps,
    ref,
  ) => {
    const Tag = as;

    function getWidth(width: "full" | "container") {
      switch (width) {
        case "full":
          return "w-full max-w-screen-2xl mx-auto ";
        case "container":
          return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-12";
      }
    }

    return (
      <Tag
        ref={ref}
        className={cn(
          "py-32",
          getWidth(width),
          className,
          as === "footer" ? "py-0" : "",
        )}
      >
        {children}
      </Tag>
    );
  },
);

export default SectionContainer;
