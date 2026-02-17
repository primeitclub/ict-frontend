import { PageLayout } from "../../../../../shared/layouts";
import { Button } from "../../../../../shared/design-components";
// import { Heading } from "../../../../../shared/design-components";
// import Text from "../../../../../shared/design-components";
import hamropatro from "./hamropatro.png";

const images = Array(15).fill(hamropatro);

export default function SponserSection() {
  return (
    <PageLayout as="section" width="full">
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="w-[80%] md:w-[60%]">
          <span className=" flex flex-col justify-center items-center my-10">
            {/* <Heading level="h2" align="center" children></Heading> */}
            <h2 className="text-4xl">Our Sponsers</h2>
            <p className="text-2xl my-10">
              “Powering ICT Meet v8 with innovation and collaboration”
            </p>
          </span>
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
