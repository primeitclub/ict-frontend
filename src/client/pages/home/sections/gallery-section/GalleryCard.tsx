import { useRef } from "react"
import gsap from "gsap"

type CardProps = {
  imgUrl: string
  x: number
  y: number
  rotate: number
  scale?: number
  z?: number
}

const GalleryCard = ({ imgUrl, x, y, rotate, scale = 1, z = 1 }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const enter = () => {
    gsap.to(cardRef.current, {
      y: y - 40,
      scale: scale + 0.1,
      rotate: 0,
      duration: 0.35,
      ease: "power3.out",
      zIndex: 50
    })
  }

  const leave = () => {
    gsap.to(cardRef.current, {
      y,
      scale,
      rotate,
      duration: 0.35,
      ease: "power3.out",
      zIndex: z
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
        zIndex: z
      }}
      className="absolute w-[260px] h-[260px] rounded-[32px] overflow-hidden shadow-xl"
    >
      <img
        src={imgUrl}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default GalleryCard