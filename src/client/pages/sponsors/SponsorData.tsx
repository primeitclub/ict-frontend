type TitleProps = {
  title: string;
  imgUrl: string[];
  altdata: string;
  big: boolean;
  sponsortier: boolean;
};

const SponsorTitle = (props: TitleProps) => {
  const { title, imgUrl, altdata, big, sponsortier } = props;

  return (
    <div className="w-full flex justify-center text-center">
      <div className="flex flex-col md:flex-row w-full items-center gap-10 sm:gap-24">

        {/* Title */}
        <div
          className={`font-medium text-[#DBF5FF] w-full md:w-[45%] text-center md:text-left ${
            big ? "text-[30px] md:text-[40px]" : "text-[26px] md:text-[30px]"
          }`}
        >
          {title}
        </div>

        {/* Sponsor Images */}
        <div
          className={`grid justify-center place-items-center w-full ${
            sponsortier
              ? "grid-cols-3 md:grid-cols-4  md:gap-10"
              : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6"
          }`}
        >
          {imgUrl.map((el, index) => (
            <div
              key={index}
              className={`flex items-center justify-center ${
                sponsortier
                  ? "w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]"
                  : "w-[60px] h-[60px] sm:w-[90px] sm:h-[90px]"
              }`}
            >
              <img
                src={el}
                alt={altdata}
                className={`w-full h-full object-contain ${
                  sponsortier ? "rounded-xl" : "rounded-lg"
                }`}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SponsorTitle;