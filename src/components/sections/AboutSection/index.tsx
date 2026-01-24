import AboutLogo from "../../../assets/AboutLogo.png";
import glow from "../../../assets/glow.png";

export const AboutSection = () => {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        padding: "20px",
        border: "1px dashed gray",
        margin: "10px 0",
        backgroundColor: "#020919",
      }}
    >
      {/* Glow layer */}
      <img src={glow} alt="glow" className="w-full absolute z-0" />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-14 md:mx-12 lg:gap-16 xl:gap-20 my-[200px]">
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
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="hidden md:block text-white font-bold text-5xl mb-2 lg:text-3xl md:text-2xl xl:my-8 xl:text-4xl">
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
        </div>
      </div>
    </div>
  );
};
