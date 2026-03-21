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
    <div className="w-full flex items-center text-center text-4xl leading-3  justify-center">
      <div className="flex flex-col justify-center md:flex-row w-full items-center gap-10 sm:gap-24">

        {/* Title */}
        <div
          className={`flex font-medium w-full justify-center sm:justify-start h-auto text-center md:w-[40%] text-[#DBF5FF] ${
            big ? "md:text-[40px] text-[30px] " : "text-[26px] md:text-[30px]"
          }`}
        >
          {title}
        </div>

        {/* Sponsor Images */}
        <div className="flex w-full h-full ">
          <div
          className={` grid justify-items-center place-items-center ${
            sponsortier
              ? "grid-cols-3 md:grid-cols-4 gap-5 md:gap-10"
              : "grid-cols-4  md:grid-cols-5 gap-5 md:gap-15"
          }`}
        >
          {imgUrl.map((el, index) => (
            <div
              key={index}
              className={`flex items-center justify-center  ${
                sponsortier
                  ? "md:w-[180px] md:h-[180px] w-[90px] h-[90px]"
                  : "md:w-[127px] md:h-[127px] w-[60px] h-[60px]"
              }`}
            >
              <img
                src={el}
                alt={altdata}
                className={`w-full h-full object-contain ${
                  sponsortier ? "rounded-3xl" : "rounded-lg"
                }`}
              />
            </div>
          ))}
        </div>



        </div>
        
      </div>
    </div>
  );
};

export default SponsorTitle;