import React from 'react'
import SpeakerCard from './SpeakerCard'

const SpeakerSection = () => {
  return (
    <div className="mx-auto text-center max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold mb-8 sm:mb-10 md:mb-12 xl:mb-24">
        Joining Us This{" "}
        <span className="bg-gradient-to-b from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent">
          Edition
        </span>
      </h2>

      {/* Grid for Speaker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-14 justify-items-center">
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
        <SpeakerCard />
      </div>
    </div>
  )
}

export default SpeakerSection