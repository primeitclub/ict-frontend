import AboutLogo from "../../../../../../assets/about-img.png";

const AboutImage = () => {
  return (
    <div className="w-full md:w-2/3 flex justify-center items-center">
      <img
        className="w-full h-auto object-contain"
        src={AboutLogo}
        alt="About"
      />
    </div>
  );
};

export default AboutImage;
