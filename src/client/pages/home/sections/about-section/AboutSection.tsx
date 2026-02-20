import AboutLogo from "../../../../../assets/about-img.png";
import fb from "../../../../../assets/fb.png";
import insta from "../../../../../assets/insta.png";

export const AboutSection = () => {
  return (
    <section className="mx-6 sm:mx-12 md:mx-16 lg:mx-24 justify-center">
      <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-4 xl:ml-16">
        
        {/* Mobile Title */}
        <h2 className="block md:hidden text-white font-bold text-[28px] self-start">
          About Us
        </h2>

        {/* Content — 1/3 width */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="hidden md:block text-white font-bold mb-2 text-2xl lg:text-3xl xl:text-6xl xl:my-8">
            <span className="bg-gradient-to-b from-[#DBF5FF] to-[#007AFF] text-transparent bg-clip-text">
              This Year’s 
            </span>
            &nbsp; Focus
          </h2>

          <p className="my-2 text-justify font-light text-[#DFDFDF] text-sm md:text-[10px] lg:text-xs xl:text-xl ">
            ICT V8 focuses on the growing gap between the academia and industry.
            This event will bridge this. John doe loves apple and so do John Mo.
          </p>

          <p className="my-2 text-justify font-light text-[#DFDFDF] text-sm md:text-[10px] lg:text-xs xl:text-xl">
            ICT V8 focuses on the growing gap between the academia and industry.
            This event will bridge this. John doe loves apple and so do John Mo.
          </p>

          <div className="flex gap-4 mt-6 md:justify-start">
            <a href="https://www.facebook.com/primeitclub" target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="Facebook" className="w-7 h-7 xl:w-9 xl:h-9 cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/primeitclub" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="Instagram" className="w-7 h-7 xl:w-9 xl:h-9 cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Image — 2/3 width */}
        <div className="w-full md:w-2/3 flex justify-center">
          <img
            className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-full lg:max-w-[560px] xl:max-w-[680px] h-auto object-contain"
            src={AboutLogo}
            alt="About"
          />
        </div>

      </div>
    </section>
  );
};

export default AboutSection;