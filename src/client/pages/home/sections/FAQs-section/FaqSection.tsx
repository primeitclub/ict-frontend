import { useState } from "react";
import FAQItem from "./FaqIteams";
import SectionContainer from "../../../../../shared/layouts/sectionContainer";
import SectionHeader from "../../../../components/sectionHeader";

const faqs = [
  {
    question: "Who can participate in the event?",
    answer:
      "ICT Meetup is not just a standard conference, it's an immersive experience that bridges the gap between academic education and real industry expectations. Through our extensive network of tech companies and experts, students gain hands-on exposure to current trends, participate in practical workshops, and develop essential skills in professional environments. This isn't simulated work; it's genuine industry exposure that prepares you for your career from day one.",
  },
  {
    question: "Who can participate in the event?",
    answer:
      "ICT Meetup is not just a standard conference, it's an immersive experience that bridges the gap between academic education and real industry expectations.",
  },
  {
    question: "Who can participate in the event?",
    answer:
      "ICT Meetup is not just a standard conference, it's an immersive experience that bridges the gap between academic education and real industry expectations.",
  },
  {
    question: "Who can participate in the event?",
    answer:
      "ICT Meetup is not just a standard conference, it's an immersive experience that bridges the gap between academic education and real industry expectations.",
  },
  {
    question: "Who can participate in the event?",
    answer:
      "ICT Meetup is not just a standard conference, it's an immersive experience that bridges the gap between academic education and real industry expectations.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SectionContainer className="mx-auto px-4 sm:px-6">
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
          <FAQItem
            key={i}
            index={i + 1}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default FAQSection;
