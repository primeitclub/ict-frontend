// import { Button } from "../../../../../shared/design-components";

import SectionContainer from "../../../../../shared/layouts/sectionContainer";
import SectionHeader from "../../../../components/sectionHeader";

// Images for sponsor logo
const dummyImages = [
  "https://play-lh.googleusercontent.com/BzSi2p7xAuJLc0002bE_5MTbhu0GCHcbo2lmqRkSED40DqfITuqPWPBkP2HJrbiK8k4",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hamro_Patro_wordmark.svg/960px-Hamro_Patro_wordmark.svg.png",
  "https://img.jobsnepal.com/big/qSxpuEM2kQ8BfmsvJ7jFLqgTxcOx6PZz22BTQn5x.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVueevO7lTftBZ51TVZFPoxDtBv6xC_YKWPA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVVjGobhSM9kGdCcq9IrxCgX32Xg2qdLs-_g&s",
];

const images = Array(3).fill(dummyImages).flat();

export default function SponserSection() {
  return (
    <SectionContainer as="section">
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="w-[80%] 2xl:w-full">
          <SectionHeader
            titleNormal="Supporting"
            titleHighlight="This Meet"
            align="center"
            className="sm:text-nowrap"
          />
          {/* Sponser grid */}
          <div className="grid grid-cols-3 gap-2 md:[grid-template-columns:repeat(auto-fill,180px)] 2xl:grid-cols-5 ">
            {images.map((image, index) => (
              <div
                key={index}
                className=" aspect-square rounded-lg md:rounded-2xl  overflow-hidden"
              >
                <img
                  src={image}
                  className="w-full h-full object-cover md:rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
