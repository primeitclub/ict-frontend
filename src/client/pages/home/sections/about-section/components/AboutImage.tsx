import AboutLogo from "../../../../../../assets/about-img.png";

const AboutImage = () => {
  return (
    <div className="w-full md:w-2/3 flex justify-center items-center">
      <img
        className="w-full max-w-[425px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[560px] xl:max-w-[680px] h-auto object-contain"
        src={AboutLogo}
        alt="About"
      />
    </div>
  );
};

export default AboutImage;
