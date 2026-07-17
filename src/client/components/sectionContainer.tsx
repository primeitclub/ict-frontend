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
          // Vertical spacing for every section — PADDING only (no margins),
          // identical across all sections so the rhythm is consistent on mobile
          // and desktop. Bottom padding is deliberately larger than the top to
          // give each section more breathing room before the next. Full-bleed
          // sections (Highlight/Gallery) mirror this `pb` on their own root.
          return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-28 md:pt-24 md:pb-40";
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
