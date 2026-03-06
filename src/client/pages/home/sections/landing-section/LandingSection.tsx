import Button from "../../../../../shared/design-components/button/Button";
import "../../../../../App.css";
import {  ArrowRight, ChevronRight } from "lucide-react";

export function LandingSection() {
  return (
    <div className="landing_section h-[90vh] pt-20 items-center w-full ">
      <div className="flex flex-col  space-y-4 ">
        <div className="items-center flex justify-center text-center bg-red">
          <div className="flex items-center gap-2 border-1 bg-red p-2 rounded-full  bg-white/5  ">
            {/* <Button variant="filled" size="small" label="Event on" /> */}
            <div className="flex rounded-full bg-[#3571F0] text-[14px] py-[2px] px-[14px]">Event on</div>
            <div className="flex text-[14px] items-center gap-2 leading-3 font-normal -tracking-[0.598px]">12-13 January, 2025 <ArrowRight size={20} /> </div>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[100%] px-[1%]  sm:px-0 sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[60%] 2xl:w-[52%] text-center  items-center  ">
          <div className="flex text-[34px] m-auto sm:text-[50px] sm:leading-[46px]  md:text-[64px] 2xl:text-[80px] font-[600] leading-[37px] px-3 md:leading-[73px] bg-gradient-to-r from-[#DBF5FF]  to-[#3a9dff] bg-clip-text text-transparent -tracking-[2px] ">
            Fusion Of Tech Talent & Creativity
          </div>
          <div className="flex text-[10px] items-center sm:text-[16px]  px-5 sm:px-9 font-[400] text-center m-auto sm:leading-[26px] my-3 tracking-[0.3px]">
            ICT Meetup, designed to inspire collaboration, encourage learning
            beyond classrooms, and transform ideas into real-world impact.
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 sm:gap-10 items-center justify-center  pt-2 sm:pt-10">
          <Button
            variant="glass"
            rightIcon={<ChevronRight />}
            label="Register Now "
          />
          <Button
            variant="glass"
            rightIcon={<ChevronRight />}
            label="Be a sponsor"
          />
        </div>
      </div>

      {/* <div className=" bg-transparent mx-auto w-1/2 blur-xs h-full backdrop:blur-xl  border-4 border-white rounded-full "></div> */}
    </div>
  );
}
