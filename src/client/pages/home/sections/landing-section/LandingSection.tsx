import Button from "../../../../../shared/design-components/button/Button";
import "../../../../../App.css";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Text } from "../../../../../shared/design-components";
import { motion } from "framer-motion";
import { useState } from "react";

import image from "../../../../../../public/ICT Meet/Arc-1.png"
import { useHome } from "../../useHome";
import { Link } from "react-router-dom";
import { useVersion } from "../../../../routes/VersionContext";

function formatEventDateRange(startDate?: string | null, endDate?: string | null): string {
  if (!startDate || !endDate) return "";
  const start = new Date(startDate);
  const end = new Date(endDate);
  const monthFmt = new Intl.DateTimeFormat("en-US", { month: "long" });
  const yearFmt = new Intl.DateTimeFormat("en-US", { year: "numeric" });
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    return `${start.getDate()}-${end.getDate()} ${monthFmt.format(start)}, ${yearFmt.format(start)}`;
  }
  const shortMonthFmt = new Intl.DateTimeFormat("en-US", { month: "short" });
  return `${start.getDate()} ${shortMonthFmt.format(start)} - ${end.getDate()} ${shortMonthFmt.format(end)}, ${yearFmt.format(end)}`;
}

export function LandingSection() {
  const { getPath } = useVersion();
  const { data: edition } = useHome((d) => d.edition);
  const { data: hero } = useHome((d) => d.sections.hero);
  // The arc runs two animations in sequence: the one-shot intro fade-in, then
  // an endless slow glow "breath" (dim → back to full). Framer can't chain a
  // finite animation into an infinite one declaratively, so this flag flips
  // when the intro finishes and swaps the animate/transition props.
  const [arcIntroDone, setArcIntroDone] = useState(false);
  const dateLabel = formatEventDateRange(edition?.startDate, edition?.endDate);

  return (
    <div className="landing_section relative w-full sm:min-h-screen pt-32 sm:pt-40 pb-[calc(32vw+56px)] sm:pb-0">
      {/*
        Mobile: the hero used to force a full 100svh, but the arc is anchored to
        the buttons and only fills the upper part — leaving a huge black gap
        before the next section. Instead we let the section hug its content and
        reserve just enough bottom space (scaled to the arc's width-driven
        height) for the arc's visible masked area. Desktop keeps min-h-screen.
      */}
      {/*
        Content + arc share this wrapper so the arc can anchor to the BUTTONS
        (the wrapper's bottom edge) instead of the section bottom — that keeps
        the arc the same distance below the buttons at every screen size. The
        -mt nudges the whole hero up.
      */}
      <div className="relative z-10 -mt-[60px]">
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
          <Link to={getPath("/events")}>
            <div className="flex items-center gap-2 border-1 p-2 rounded-full  bg-white/5 transition-colors hover:bg-white/10 cursor-pointer">
              <div className="flex rounded-full bg-accent text-[14px] md:text-[16px] py-[2px] px-[14px]">
                Event on
              </div>
              <div className="flex text-[14px] md:text-[16px] items-center gap-2 leading-3 font-normal -tracking-[0.598px]">
                {dateLabel || "Coming Soon"}
                <motion.span
                  className="flex"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </div>{" "}
            </div>
          </Link>
        </div>
        <div className="relative flex flex-col gap-4 w-[100%] px-[1%]   sm:px-0 sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[60%] 2xl:w-[52%] text-center mx-auto  ">


          <div className="flex text-[34px] m-auto sm:text-[50px] sm:leading-[46px]  md:text-[64px] 2xl:text-[80px] font-[700] leading-[37px] px-3 pb-2 md:leading-[73px] bg-gradient-to-r from-[#DBF5FF]  to-[#51A7FF] bg-clip-text text-transparent -tracking-[2px] ">
            {hero?.heading}
          </div>
          <Text
            align="center"
            className="flex px-5 mx-auto  sm:px-9 lg:px-20 my-3 text-[14px] md:text-[16px]"
          >
            {hero?.paragraph}
          </Text>
          {/* <div className="">
            ICT Meetup, designed to inspire collaboration, encourage learning
            beyond classrooms, and transform ideas into real-world impact.
          </div> */}
        </div>
        <div className="flex sm:flex-row flex-col gap-4 sm:gap-10 items-center justify-center  pt-2 sm:pt-10">
          <Link to={getPath("/register")}>
            {/* Old glass button, but the whitish hover fill is kept ON always
                (!bg-glow-secondary + black text) so Register Now stays the light
                primary CTA. Wrapper scales up on hover only (no idle pulse). */}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Button
                variant="glass"
                className="!w-fit text-xs sm:text-base !bg-glow-secondary !text-black"
                rightIcon={
                  <motion.span
                    className="flex"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                  >
                    <ChevronRight />
                  </motion.span>
                }
                label="Register Now "
              />
            </motion.div>
          </Link>
          <Link to={getPath("/sponsors")}>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Button
                variant="glass"
                className="!w-fit text-xs sm:text-base"
                rightIcon={
                  <motion.span
                    className="flex"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                  >
                    <ChevronRight />
                  </motion.span>
                }
                label="Be a Sponsor"
              />
            </motion.div>
          </Link>
        </div>
        </motion.div>

        {/*
          Arc sits just below the buttons at the SAME gap on every screen size.
          It is placed at the content's bottom edge (top-full) and lifted by 48%
          of its height (where the bright burst sits in the PNG) minus a fixed
          56px gap — the % tracks the image as it scales, the px is the constant
          gap. The image is NOT clipped; it renders in full and a bottom mask
          gradient (see the img style) fades its lower half into the page so the
          glow dissolves smoothly instead of ending on a hard edge.
        */}
        <figure
          className="pointer-events-none absolute top-full left-1/2 w-[140%] sm:w-full -z-10"
          style={{ transform: "translate(-50%, calc(-48% + 56px))" }}
        >
          <motion.img
            src={image}
            alt=""
            className="w-full select-none"
            style={{
              // Fade the lower half of the arc to true transparency so the glow
              // dissolves into the page background instead of ending on a hard
              // rectangular edge. Nothing is cropped now — the image renders in
              // full and the mask does the blending.
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 48%, transparent 82%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 48%, transparent 82%)",
            }}
            initial={{ opacity: 0, filter: "brightness(0.15)" }}
            animate={
              arcIntroDone
                ? {
                    // Glow breath: ease down deep, rest at the bottom for a
                    // beat, then re-emerge with the same easeOut feel as the
                    // page-load intro (bright fast out of the dark, then a
                    // long settle into full glow). The bottom dwell is what
                    // kills the "bounce" — brightness never reverses
                    // direction instantly. Opacity drops to 0 together with
                    // brightness so the arc goes fully dark into the page
                    // background before glowing back.
                    opacity: [1, 0, 0, 1],
                    filter: [
                      "brightness(1)",
                      "brightness(0)",
                      "brightness(0)",
                      "brightness(1)",
                    ],
                  }
                : { opacity: 1, filter: "brightness(1)" }
            }
            transition={
              arcIntroDone
                ? {
                    duration: 12,
                    // 0-40%: dim down (easeIn — stays bright most of the way,
                    // plunges into black only at the end, so the dark period
                    // is just the hold) · 40-52.5%: hold fully dark for 1.5s ·
                    // 52.5-100%: easeOut rise back to full glow.
                    times: [0, 0.4, 0.525, 1],
                    ease: ["easeIn", "linear", "easeOut"],
                    repeat: Infinity,
                  }
                : { duration: 2.2, ease: "easeOut" }
            }
            onAnimationComplete={() => {
              if (!arcIntroDone) setArcIntroDone(true);
            }}
          />
        </figure>
      </div>
    </div>
  );
}
