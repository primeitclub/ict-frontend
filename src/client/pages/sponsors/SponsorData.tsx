type TitleProps = {
  title: string;
  imgUrl: string[];
  altdata: string;
  big: boolean;
  sponsortier:boolean,
};

const SponsorTitle = (props: TitleProps) => {
  return (
    <div className=" w-full  text-4xl text-center items-center leading-3 flex  gap-16">
      <div className=" flex flex-col md:flex-row md:flex w-full items-center gap-24 justify-start ">
        <div
          className={`flex font-medium w-full md:w-[35%]  ${
            props.big ? `text-[40px]` : `text-[32px]`
          } text-[#DBF5FF]`}
        >
          {props.title}
        </div>

        <div className={`w-full items-center ${ props.sponsortier ? 'grid grid-cols-1 sm:grid-cols-4 gap-10' :' grid-cols-2 grid sm:grid-cols-5 gap-5' } items-center `}>
          {props.imgUrl.map((el, index) => (
            <div className={`${ props.sponsortier ? 'w-[180px] h-[180px]  ' :'w-[127px] h-[127px] items-center  ' }`}>
               <img
              key={index}
              className={`${ props.sponsortier ? 'rounded-3xl':'rounded-lg'} w-full h-full`}
              src={el}
              alt={props.altdata}
            />
            </div>
           
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorTitle;