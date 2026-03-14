type TitleProps = {
  title: string;
  imgUrl: string[];
  altdata: string;
  big: boolean;
};

const SponsorTitle = (props: TitleProps) => {
  return (
    <div className="text-4xl text-center items-center leading-3 flex justify-start gap-16">
      <div className="flex items-center gap-20">
        <div
          className={`flex font-medium ${
            props.big ? `text-[40px]` : `text-[32px]`
          } text-[#DBF5FF]`}
        >
          {props.title}
        </div>

        <div className="flex gap-4">
          {props.imgUrl.map((el, index) => (
            <img
              key={index}
              className="rounded-lg"
              src={el}
              alt={props.altdata}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorTitle;