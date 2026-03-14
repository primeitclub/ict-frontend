import { motion } from "framer-motion"
import { useState, useEffect } from "react"

import image1 from "../../../../../assets/images/image1.webp"
import image2 from "../../../../../assets/images/image2.webp"
import image3 from "../../../../../assets/images/image3.webp"
import image4 from "../../../../../assets/images/image4.webp"
import image5 from "../../../../../assets/images/image5.webp"

import SectionHeader from "../../../../components/sectionHeader"
import { ChevronRight } from "lucide-react"

const GallerySection = () => {

  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {

    const check = () => {
      const width = window.innerWidth

      if (width < 640) setScreen("mobile")
      else if (width < 1024) setScreen("tablet")
      else setScreen("desktop")
    }

    check()

    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)

  }, [])

  const images = [image1, image2, image3, image4, image5]

  // Desktop layout
  const desktopPositions = [
    { x: -320, y: 120, rotate: -22 },
    { x: -180, y: 40, rotate: -10 },
    { x: 0, y: 0, rotate: 0 },
    { x: 180, y: 40, rotate: 10 },
    { x: 320, y: 120, rotate: 22 }
  ]

  // Tablet layout
  const tabletPositions = [
    { x: -220, y: 90, rotate: -18 },
    { x: -120, y: 35, rotate: -8 },
    { x: 0, y: 0, rotate: 0 },
    { x: 120, y: 35, rotate: 8 },
    { x: 220, y: 90, rotate: 18 }
  ]

  // Mobile layout
  const mobilePositions = [
    { x: -90, y: 45, rotate: -16 },
    { x: -45, y: 15, rotate: -8 },
    { x: 0, y: 0, rotate: 0 },
    { x: 45, y: 15, rotate: 8 },
    { x: 90, y: 45, rotate: 16 }
  ]

  const positions =
    screen === "mobile"
      ? mobilePositions
      : screen === "tablet"
      ? tabletPositions
      : desktopPositions

  return (
    <section className="w-full py-24 bg-white overflow-hidden">

      <SectionHeader
        titleNormal="Through"
        titleHighlight="The Lens"
        varient="secondary"
        className="justify-center"
      />

      <div className="relative flex justify-center items-center h-[420px] mt-12">

        {images.map((img, i) => {

          const pos = positions[i]

          const isHovered = hovered === i
          const isSelected = selected === i

          const activeIndex = hovered ?? selected

          const offset =
            activeIndex !== null && i !== activeIndex
              ? i < activeIndex
                ? -25
                : 25
              : 0

          return (
            <motion.div
              key={i}
              className="absolute cursor-pointer"

              style={{
                zIndex: i === 2 ? 20 : 10
              }}

              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}

              onClick={() =>
                setSelected(selected === i ? null : i)
              }

              animate={{
                x: pos.x + offset,
                y: pos.y,
                rotate: pos.rotate,
                scale: isHovered || isSelected ? 1.25 : 1
              }}

              transition={{
                type: "spring",
                stiffness: 240,
                damping: 20
              }}
            >
              <img
                src={img}
                className="
                w-[110px] h-[170px]
                sm:w-[140px] sm:h-[200px]
                md:w-[180px] md:h-[240px]
                lg:w-[220px] lg:h-[290px]
                rounded-xl
                object-cover
                shadow-xl
                "
              />
            </motion.div>
          )
        })}

      </div>

      <div className="flex justify-center mt-16">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
          View More <ChevronRight size={18} />
        </button>
      </div>

    </section>
  )
}

export default GallerySection