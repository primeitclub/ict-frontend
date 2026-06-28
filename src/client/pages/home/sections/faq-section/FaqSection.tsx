import { useState } from "react";
import { motion } from "framer-motion";
import SectionContainer from "../../../../components/sectionContainer";
import SectionHeader from "../../../../components/section-header";
import FAQItem from "./FaqIteams";
import { useHome } from "../../useHome";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // FAQ is present ONLY for the current edition — the backend omits the `faq`
  // key for past editions, so absence here means "don't render this section".
  const { data: faqs } = useHome((d) => d.sections.faq);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!faqs?.length) return null;

  return (
    <SectionContainer className="mx-auto px-4 sm:px-6 space-y-12">
      {/* Mobile: short title */}
      <div className="block sm:hidden">
        <SectionHeader
          titleNormal=""
          titleHighlight="FAQs"
          varient="primary"
          align="center"
          className="mb-4"
        />
      </div>

      {/* Desktop: full title */}
      <div className="hidden sm:block">
        <SectionHeader
          titleNormal="Frequently"
          titleHighlight="Asked Questions"
          varient="primary"
          align="center"
          className="mb-4"
        />
      </div>

      {/* FAQ List */}
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {faqs.map((faq, i) => (
          // Index-staggered fade/slide-in so the list cascades top-to-bottom.
          // Wrapping (rather than editing FAQItem) keeps the item's open/close
          // logic untouched — this layer only owns the entrance animation.
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
          >
            <FAQItem
              index={i + 1}
              question={faq.title ?? ""}
              answer={faq.description ?? ""}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default FAQSection;
