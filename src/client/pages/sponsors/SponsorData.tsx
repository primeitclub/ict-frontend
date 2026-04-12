
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
          className={`w-full justify-center place-items-center ${
            imgUrl.length === 1 ? "flex sm:grid" : "grid"
          } ${
            sponsortier
              ? "grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-y-2"
              : "grid-cols-4  sm:grid-cols-5 px-[6%]  md:px-0 lg:pl-3  lg:pr-28  lg:gap-x-1 lg:gap-y-3"
          }`}
        >
          {imgUrl.map((el, index) => (
            <div
              key={index}
              className={`flex items-center justify-center ${
                sponsortier
                  ? "w-[90px] h-[90px] sm:w-[130px] lg:p-1 sm:h-[130px]  lg:w-[180px] lg:h-[180px]"
                  : "w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:px-1 lg:w-[120px] lg:h-[120px]"
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
