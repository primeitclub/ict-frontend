import Button from "../../../../../shared/design-components/button/Button";
import "../../../../../App.css";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Text } from "../../../../../shared/design-components";
import { motion } from "framer-motion";

import image from "../../../../../../public/ICT Meet/Arc-1.png"
import { useHome } from "../../useHome";

export function LandingSection() {
  // Reads just the hero slice from the shared edition query (already in cache).
  const { data: hero } = useHome((d) => d.sections.hero);
  if (!hero) return null;

  return (
    <div className="landing_section relative w-full min-h-screen overflow-hidden pt-32 sm:pt-40">
      {/*
        Same position/size as before — we only animate opacity + filter
        brightness so the arc "lights up" out of the dark. No transform/scale,
        so layout is untouched.
      */}
      <figure className="pointer-events-none absolute -bottom-[240px] left-1/2 -translate-x-1/2 z-0 w-full">
        <motion.img
          src={image}
          alt=""
          className="w-full select-none"
          initial={{ opacity: 0, filter: "brightness(0.15)" }}
          animate={{ opacity: 1, filter: "brightness(1)" }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />
      </figure>

      {/*
        Content fades up slightly after the background starts glowing (delay),
        so the eye lands on the arc first, then the copy resolves in.
      */}
      <motion.div
        className="flex flex-col  space-y-4 relative z-20"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <div className="items-center flex justify-center text-center">
          <div className="flex items-center gap-2 border-1 p-2 rounded-full  bg-white/5  ">
            <div className="flex rounded-full bg-btn-primary text-[14px] py-[2px] px-[14px]">
              Event on
            </div>
            <div className="flex text-[14px] items-center gap-2 leading-3 font-normal -tracking-[0.598px]">
              12-13 January, 2025 <ArrowRight size={20} />{" "}
            </div>{" "}
          </div>
        </div>
        <div className="relative flex flex-col gap-4 w-[100%] px-[1%]  sm:px-0 sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[60%] 2xl:w-[52%] text-center mx-auto  ">
         

          <div className="flex text-[34px] m-auto sm:text-[50px] sm:leading-[46px]  md:text-[64px] 2xl:text-[80px] font-[700] leading-[37px] px-3 md:leading-[73px] bg-gradient-to-r from-[#DBF5FF]  to-[#51A7FF] bg-clip-text text-transparent -tracking-[2px] ">
            {hero.heading}
          </div>
          <Text
            align="center"
            className="flex px-5 sm:px-9 lg:px-20 my-3 text-[10px] sm:text-[16px]"
          >
            {hero.paragraph}
          </Text>
          {/* <div className="">
            ICT Meetup, designed to inspire collaboration, encourage learning
            beyond classrooms, and transform ideas into real-world impact.
          </div> */}
        </div>
        <div className="flex sm:flex-row flex-col gap-4 sm:gap-10 items-center justify-center  pt-2 sm:pt-10">
          <Button
            variant="glass"
            className="text-xs sm:text-base"
            rightIcon={<ChevronRight />}
            label="Register Now "
          />
          <Button
            variant="glass"
            className="text-xs sm:text-base"
            rightIcon={<ChevronRight />}
            label="Be a Sponsor"
          />
        </div>
      </motion.div>

      {/* <div className=" bg-transparent mx-auto w-1/2 blur-xs h-full backdrop:blur-xl  border-4 border-white rounded-full "></div> */}
    </div>
  );
}
