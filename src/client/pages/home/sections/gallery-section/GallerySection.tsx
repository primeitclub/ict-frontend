import GalleryCard from "./GalleryCard"

import image1 from "../../../../../assets/images/image1.webp"
import image2 from "../../../../../assets/images/image2.webp"
import image3 from "../../../../../assets/images/image3.webp"
import image4 from "../../../../../assets/images/image4.webp"
import image5 from "../../../../../assets/images/image5.webp"
import SectionHeader from "../../../../components/sectionHeader"

const GallerySection = () => {

  const cards = [
    { img: image1, x: -320, y: 120, rotate: -22, scale: 0.75, z: 1 },
    { img: image2, x: -200, y: 40, rotate: -10, scale: 0.9, z: 3 },
    { img: image3, x: 0, y: 0, rotate: 0, scale: 1.05, z: 10 },
    { img: image4, x: 200, y: 40, rotate: 10, scale: 0.9, z: 3 },
    { img: image5, x: 320, y: 120, rotate: 22, scale: 0.75, z: 1 }
  ]

  return (
    <section className="w-full py-28 bg-white">

      <div className="w-full">
        
            <SectionHeader
             titleNormal="Through"
             titleHighlight="The Lens"
             varient="secondary"
             className="justify-center"
           />

      </div>

      <div className="relative flex justify-center w-[900px] h-[400px] mx-auto">

        {cards.map((card, i) => (
          <GalleryCard
            key={i}
            imgUrl={card.img}
            x={card.x}
            y={card.y}
            rotate={card.rotate}
            scale={card.scale}
            z={card.z}
          />
        ))}

      </div>

      <div className="flex justify-center mt-16">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
          View More →
        </button>
      </div>

    </section>
  )
}

export default GallerySection