// import { Button } from "../../../../../shared/design-components";

import { motion } from "framer-motion";
import SectionContainer from "../../../../components/sectionContainer";
import SectionHeader from "../../../../components/section-header";
import { useHome } from "../../useHome";

export default function SponserSection() {
  const { data: sponsors = [] } = useHome((d) => d.sections.sponsors);

  if (!sponsors.length) return null;

  return (
    <SectionContainer as="section">
      <div className="flex justify-center items-center w-full">
        <div className="w-[85%] 2xl:w-full space-y-12">
          <SectionHeader
            titleNormal="Supporting"
            titleHighlight="This Meet"
            align="center"
            className="sm:text-nowrap"
          />
          {/* Sponser grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 md:justify-center md:[grid-template-columns:repeat(auto-fit,180px)] 2xl:grid-cols-5 ">
            {sponsors.map((sponsor, index) => (
              // Index-staggered reveal, matching the event/speaker grids.
              // Small delay step (0.04s) keeps the wave snappy across many logos.
              <motion.a
                key={sponsor.id}
                href={sponsor.link ?? undefined}
                target={sponsor.link ? "_blank" : undefined}
                rel={sponsor.link ? "noopener noreferrer" : undefined}
                className="aspect-square rounded-lg md:rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.04 }}
              >
                <img
                  src={sponsor.imageUrl ?? undefined}
                  alt={sponsor.name}
                  className="w-full h-full object-cover md:rounded-2xl"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
