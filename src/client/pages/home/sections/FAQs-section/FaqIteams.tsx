import { useState } from "react";

interface FAQItemProps {
  index: number;
  question: string;
  answer: string;
}

const FAQItem = ({ index, question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const num = String(index).padStart(2, "0");

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      style={{
        boxShadow: isOpen
          ? "inset 1px 1px 0px rgba(255,255,255,0.12), inset -1px -1px 0px rgba(255,255,255,0.03)"
          : "none",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
      className={`
        w-full rounded-2xl px-6 py-5 cursor-pointer select-none
        border border-white/[0.08]
        ${
          isOpen
            ? "bg-[#344A63] backdrop-blur-[20px]"
            : "bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)]"
        }
      `}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-secondary text-sm xl:text-lg font-semibold w-6 shrink-0">
            {num}
          </span>
          <span className="text-primary font-medium text-sm sm:text-base xl:text-lg text-left">
            {question}
          </span>
        </div>

        {/* Icon */}
        <div
          className={`
    shrink-0 w-10 h-10 flex items-center justify-center
    text-white/60 text-lg font-light
    transition-transform duration-300
    ${isOpen ? "rotate-45" : "rotate-45"}
  `}
        >
          {isOpen ? "+" : "×"}
        </div>
      </div>

      {/* Answer */}
      <div
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.3s ease",
          overflow: "hidden",
        }}
      >
        <p className="mt-4 ml-10 text-primary text-sm xl:text-[15px] leading-relaxed text-left">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
