import AboutLogo from "../../../../../assets/about-img.png";
import SectionContainer from "../../../../../shared/layouts/sectionContainer";

export const AboutSection = () => {
  return (
    <SectionContainer>
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#020919",
        }}
      >
        {/* Glow layer */}
        {/* <img src={glow} alt="glow" className="w-full absolute z-0" /> */}

        {/* Content layer */}
        <div
          className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch 
          gap-6 sm:gap-8 md:gap-10 lg:gap-14 xl:gap-20 my-10 sm:my-14 md:my-16 lg:my-20 xl:my-[100px] mx-6 sm:mx-auto "
        >
          {/* Mobile Title */}
          <h2 className="block md:hidden text-white font-bold text-[30px] self-center text-center">
            <span className="bg-gradient-to-b from-[#DBF5FF] to-[#51A7FF] text-transparent bg-clip-text">
                This Year's
              </span>
              &nbsp; Focus
          </h2>

          {/* Content — 1/3 width */}
          <div className="w-full md:w-1/3 text-center md:text-left flex flex-col justify-center">
            <h2 className="hidden md:block text-white font-bold text-xl md:text-3xl lg:text-5xl xl:text-6xl md:my-3 lg:my-5 xl:my-8">
              <span className="bg-gradient-to-b from-[#DBF5FF] to-[#51A7FF] text-transparent bg-clip-text">
                This Year's
              </span>
              &nbsp; Focus
            </h2>

            <div className="my-1 md:my-2 xl:my-2">
              <p
                className="my-2 md:my-2 lg:my-3 xl:my-6 text-left sm:text-justify font-light text-[#DFDFDF] 
        text-[12.5px] md:text-xs lg:text-sm xl:text-base"
              >
                ICT V8 focuses on the growing gap between the academia and
                industry. This event will bridge this. John doe loves apple and
                so do John Mo.
              </p>

              <p
                className="my-2 md:my-2 lg:my-3 xl:my-4 text-left sm:text-justify font-light text-[#DFDFDF] 
        text-[12.5px] md:text-xs lg:text-sm xl:text-base"
              >
                ICT V8 focuses on the growing gap between the academia and
                industry. This event will bridge this. John doe loves apple and
                so do John Mo.
              </p>
            </div>

            <div
              className="flex gap-4 
      mt-4 md:mt-6 lg:mt-10 xl:mt-36 
      justify-start"
            >
              <a
                href="https://www.facebook.com/primeitclub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                  className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 cursor-pointer"
                >
                  <path
                    fill="#DBF5FF"
                    d="M39.028 19.633C39.028 8.79 30.29 0 19.514 0S0 8.79 0 19.633c0 9.8 7.136 17.922 16.465 19.395v-13.72H11.51v-5.675h4.955v-4.325c0-4.92 2.913-7.639 7.37-7.639 2.135 0 4.368.384 4.368.384v4.831h-2.46c-2.424 0-3.18 1.514-3.18 3.066v3.683h5.412l-.865 5.675h-4.547v13.72c9.329-1.473 16.465-9.595 16.465-19.395"
                  ></path>
                  <path
                    fill="#020919"
                    d="m27.108 25.154.866-5.64H22.56v-3.66c0-1.544.756-3.048 3.18-3.048h2.461V8.004s-2.233-.382-4.368-.382c-4.457 0-7.37 2.702-7.37 7.592v4.3h-4.955v5.64h4.954V38.79c2.02.316 4.078.316 6.098 0V25.154z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/primeitclub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 39 39"
                  className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 cursor-pointer"
                >
                  <circle
                    cx="19.371"
                    cy="19.371"
                    r="19.371"
                    fill="#DBF5FF"
                  ></circle>
                  <path
                    fill="#020919"
                    fillRule="evenodd"
                    d="M19.373 6.053c-3.617 0-4.07.016-5.49.08-1.418.065-2.386.29-3.233.62a6.5 6.5 0 0 0-2.36 1.536 6.5 6.5 0 0 0-1.535 2.359c-.33.847-.555 1.815-.62 3.232-.064 1.42-.08 1.874-.08 5.49 0 3.618.016 4.071.08 5.492.065 1.417.29 2.385.62 3.232.34.876.795 1.619 1.536 2.359a6.5 6.5 0 0 0 2.359 1.536c.847.33 1.815.554 3.232.62 1.42.064 1.874.08 5.491.08s4.07-.016 5.49-.08c1.418-.066 2.386-.29 3.233-.62a6.5 6.5 0 0 0 2.36-1.536 6.5 6.5 0 0 0 1.535-2.359c.33-.847.555-1.815.62-3.232.064-1.42.08-1.874.08-5.491s-.016-4.07-.08-5.49c-.065-1.418-.29-2.386-.62-3.233a6.5 6.5 0 0 0-1.536-2.36 6.5 6.5 0 0 0-2.359-1.535c-.847-.33-1.815-.555-3.232-.62-1.42-.064-1.874-.08-5.491-.08m-4.44 13.318a4.44 4.44 0 1 0 8.88 0 4.44 4.44 0 0 0-8.88 0m-2.399 0a6.839 6.839 0 1 1 13.678 0 6.839 6.839 0 0 1-13.678 0m13.948-5.51a1.598 1.598 0 1 0 0-3.197 1.598 1.598 0 0 0 0 3.196"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Image — 2/3 width */}
          <div className="w-full md:w-2/3 flex justify-center items-center">
            <img
              className="w-full 
        max-w-[425px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[560px] xl:max-w-[680px] 
        h-auto object-contain"
              src={AboutLogo}
              alt="About"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
