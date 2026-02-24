import React from 'react'
import Speaker from "./../../../../../assets/speaker.png"
import Rightarrow from "./../../../../../assets/events_navigation.svg"
import Instagram from "./../../../../../assets/Instagram.svg"
import Github from "./../../../../../assets/github.svg"
import LinkedIn from "./../../../../../assets/linkedin.svg"

const SpeakerCard = () => {
  return (
    <div className="relative w-[280px] bg-[rgba(6,13,37,0.55)] backdrop-blur-[20px] backdrop-saturate-[1.4] rounded-2xl shadow-[inset_1px_1px_0px_rgba(255,255,255,0.35),inset_-1px_-1px_0px_rgba(255,255,255,0.05)] overflow-hidden">

      {/* Glow Behind Everything */}
      <div className="
        absolute
        w-[400px] h-[400px]
        rounded-full
        bg-[radial-gradient(circle,#007AFF80_0%,transparent_70%)]
        blur-2xl
        top-20 
        z-0
      " />

      {/* Card Content */}
      <div className="relative z-10 pt-6 pl-6 pr-2 flex flex-col gap-4">

        {/* Text */}
        <div className="flex flex-col gap-2 items-start">
          <span className="font-bold text-[28px] leading-tight">
            Saugat KC
          </span>
          <span className="font-primary text-sm font-medium">
            Artificial Intelligence Engineer
          </span>
          <span className="text-xs text-[#BBC0CC]">
            Qniverse
          </span>
          <div className="flex items-center gap-2 mt-1">
            <img src={Rightarrow} alt="Arrow"/>
            <span className="text-[13px] bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent">
              AI in Finance
            </span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 mt-4">
          <a><img src={Instagram} alt="Instagram"/></a>
          <a><img src={Github} alt="Github"/></a>
          <a><img src={LinkedIn} alt="LinkedIn"/></a>
        </div>

        {/* Speaker Image */}
        <div className="mt-[-190px] flex justify-center ">
          <img src={Speaker} alt="Speaker" className="z-20 relative" />
        </div>

      </div>
      
    </div>
  )
}

export default SpeakerCard