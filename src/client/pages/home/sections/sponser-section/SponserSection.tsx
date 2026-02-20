import { PageLayout } from "../../../../../shared/layouts";
import { Button } from "../../../../../shared/design-components";
// import { Heading } from "../../../../../shared/design-components";
// import Text from "../../../../../shared/design-components";

// Images for sponsor logo
const dummyImages = [
  "https://yt3.googleusercontent.com/RtyDYxfyxAQkP0rhCVIcv_UqlPVgjpKjRnUZFLYxo1eks_xZm5J9zpPGxMUzrx_vaNozLoI1nyc=s900-c-k-c0x00ffffff-no-rj",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hamro_Patro_wordmark.svg/960px-Hamro_Patro_wordmark.svg.png",
  "https://img.jobsnepal.com/big/qSxpuEM2kQ8BfmsvJ7jFLqgTxcOx6PZz22BTQn5x.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVueevO7lTftBZ51TVZFPoxDtBv6xC_YKWPA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVVjGobhSM9kGdCcq9IrxCgX32Xg2qdLs-_g&s",
];

const images = Array(3).fill(dummyImages).flat();

export default function SponserSection() {
  return (
    <PageLayout as="section" width="full">
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="w-[80%] md:w-[80%] lg:w-[60%] 2xl:w-full">
          <span className=" flex flex-col justify-center items-center my-10">
            {/* <Heading level="h2" align="center" children></Heading> */}
            <h2 className="text-4xl 2xl:text-8xl">Our Sponsers</h2>
            <p className="lg:text-xl xl:text-2xl my-10">
              “Powering ICT Meet v8 with innovation and collaboration”
            </p>
          </span>
          {/* Sponser grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-45 aspect-square rounded-2xl  overflow-hidden"
              >
                <img
                  src={image}
                  className=" w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
          <span className="my-10 grid justify-center w-full">
            <Button
              variant="filled"
              size="large"
              label="Our Partners"
              className="m-auto"
            />
          </span>
        </div>
      </div>
    </PageLayout>
  );
}
