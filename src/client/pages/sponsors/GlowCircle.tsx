type position = {
  x: string;
  y: string;
};
const GlowCircle = (props: position) => {
  return (
    <div
      className={` ${props.x} ${props.y}  flex bg-[#02369E66] w-[282.06px] h-[283px] md:w-[666px] md:h-[666px] rounded-full absolute blur-[94px] md:blur-[200px]  -z-10`}
    ></div>
  );
};

export default GlowCircle;
