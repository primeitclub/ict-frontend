import AboutLogo from "../../../../../assets/logo.svg";
import glow from "../../../../../assets/glow.png";
import fb from "../../../../../assets/fb.png";
import insta from "../../../../../assets/insta.png";
import Eclipse from "../../../../../assets/ellipse.png";

export const AboutSection = () => {
  return (
    <>
    {/* Glow layer */}
      <img src={glow} alt="glow" className="w-full absolute" />
    <section>
      
      {/* Content layer */}
      <div className="mt-[500px] relative flex flex-col md:flex-row items-center gap-8 md:gap-14 md:mx-12 lg:gap-16 xl:gap-20">
        {/* Mobile Title */}
        <h2 className="block md:hidden text-white font-bold text-[28px]">
          About Us
        </h2>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            className="w-full max-w-[320px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[480px] h-auto mx-auto object-contain"
            src={AboutLogo}
            alt="About"
          />
          <img src={Eclipse} alt="glow" className="absolute ml-10" />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="hidden md:block text-white font-bold text-5xl mb-2 lg:text-3xl md:text-2xl xl:my-8 xl:text-6xl">
            <span className="bg-gradient-to-b from-[#DBF5FF] to-[#007AFF] text-transparent bg-clip-text">
              About
            </span>
            &nbsp; This Year's ICT
          </h2>

          <p className="my-2 text-justify font-medium text-white text-base md:text-xs lg:text-sm xl:text-lg">
            Prime IT Club is a student-led technical community at Prime College
            that encourages learning beyond the classroom through hands-on
            projects, workshops, and collaborative activities.
          </p>

          <p className="my-2 text-justify font-medium text-white text-base md:text-xs lg:text-sm xl:text-lg">
            The club provides a platform for students to develop practical
            skills in technology, design, and innovation while fostering
            teamwork, leadership, and real-world problem-solving.
          </p>

          <div className="flex gap-4 mt-6">
            <a href="https://www.facebook.com/primeitclub" target="_blank" rel="noopener noreferrer">
              <img
                src={fb}
                alt="Facebook"
                className="w-8 h-8 inline-block cursor-pointer"
              />
            </a>
            <a href="https://www.instagram.com/primeitclub" target="_blank" rel="noopener noreferrer">
            <img
              src={insta}
              alt="Instagram"
              className="w-8 h-8 inline-block cursor-pointer"
            />
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
export default AboutSection;