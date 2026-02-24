import Button from "../../../../../shared/design-components/button/Button";

export function LandingSection() {
  return (
    <div className="landing_section h-[90vh] pt-20 items-center w-full ">
      <div className="flex flex-col space-y-4 ">
        <div className="items-center flex justify-center text-center">
          <div className="flex items-center gap-2 border-1 p-2 rounded-full  bg-white/5 backdrop-blur-lg border border-white/10">
            <Button variant="filled" size="small" label="Event on" />
            <div className="flex text-xs">12-13 January, 2025</div>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2 max-w-xl text-center mx-auto  ">
          <div className="flex text-[37px] sm:text-[64px] font-[600] leading-[32px] px-3 sm:leading-[73px] bg-gradient-to-r from-[#DBF5FF]  to-[#51A7FF] bg-clip-text text-transparent -tracking-[2px] ">
            Fusion Of Tech Talent & Creativity
          </div>
          <div className="flex text-[10px] sm:text-[16px]  px-5 sm:px-9 font-[400]  sm:leading-[26px] my-3 tracking-[0.3px]">
            ICT Meetup, designed to inspire collaboration, encourage learning
            beyond classrooms, and transform ideas into real-world impact.
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 sm:gap-10 items-center justify-center  pt-2 sm:pt-10">
          <Button variant="glass" label="Register Now " />
          <Button variant="glass" label="Be a sponsor" />
        </div>
      </div>

      {/* <div className=" bg-transparent mx-auto w-1/2 blur-xs h-full backdrop:blur-xl  border-4 border-white rounded-full "></div> */}
    </div>
  );
}
