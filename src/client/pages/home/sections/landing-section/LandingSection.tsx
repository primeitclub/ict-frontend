import Button from "../../../../../shared/design-components/button/Button";
import { PageLayout } from "../../../../../shared/layouts";

export function LandingSection() {
  return (
    //   <div className="landing_section space-y-10">
    //     {/* Light Beam Background */}
    //     <div className="max-w-6xl mx-auto text-center">
    //       {/* Date Badge */}
    //       <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm italic mb-6 text-white/90">
    //         Jan 12-14
    //       </div>

    //       {/* Title */}
    //       <h1 className="text-5xl md:text-[88px] font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
    //         ICT Meetup V8
    //       </h1>

    //       {/* Subtitle */}
    //       <p className="text-lg md:text-lg text-white/70 mb-6">
    //         Fusion of Tech, Talent & Creativity
    //       </p>

    //       {/* CTA Buttons */}
    //       <div className="flex flex-col sm:flex-row gap-4 justify-center">
    //         <Button variant="glass" size="large" label="Register Now" />

    //         <Button variant="solid-white" size="large" label="Be a Sponsor" />
    //       </div>
    //     </div>
    //     <div className="landing_swiper_section">
    //       <SwiperContent />
    //     </div>
    //   </div>
    <div className="landing_section h-[90vh] pt-20 items-center w-full ">
      <div className="flex flex-col space-y-4 ">
        <div className="items-center flex justify-center text-center">
          <div className="flex items-center gap-2 border-1 p-2 rounded-full  bg-white/5 backdrop-blur-lg border border-white/10">
            <Button variant="filled" size="small" label="Event on" />
            <div className="flex text-xs">12-13 January, 2025</div>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2 max-w-xl text-center mx-auto relative ">
          <div className="flex text-[64px] font-[600] leading-[73px] bg-gradient-to-r from-[#DBF5FF]  to-[#51A7FF] bg-clip-text text-transparent -tracking-[2px] ">
            Fusion Of Tech Talent & Creativity
          </div>
          <div className="flex text-[16px] px-9 font-[400]  leading-[26px] my-3 tracking-[0.3px]">
            ICT Meetup, designed to inspire collaboration, encourage learning
            beyond classrooms, and transform ideas into real-world impact.
          </div>
        </div>
        <div className="flex gap-10 items-center justify-center pt-10">
          <Button variant="glass" label="Register Now " />
          <Button variant="glass" label="Be a sponsor" />
        </div>
      </div>

      {/* <div className=" bg-transparent mx-auto w-1/2 blur-xs h-full backdrop:blur-xl  border-4 border-white rounded-full "></div> */}
    </div>
  );
}
