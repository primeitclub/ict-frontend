import React from 'react'
import SectionContainer from '../../../../../shared/layouts/sectionContainer'
import SectionHeader from '../../../../components/sectionHeader'
import GalleryCard from './GalleryCard'
import image1 from '../../../../../assets/images/image1.webp'
import image2 from '../../../../../assets/images/image2.webp'
import image3 from '../../../../../assets/images/image3.webp'
import image4 from '../../../../../assets/images/image4.webp'
import image5 from '../../../../../assets/images/image5.webp'
import { Button } from '../../../../../shared/design-components'
import { ArrowDownLeft, ChevronRight } from 'lucide-react'

const GallerySection = () => {
    const images=[
        // '../../../../../assets/images/image1.webp',
        {img:  image1,rotate:"-rotate-12 translate-y-6 z-0"},
        {img:  image2,rotate:'-rotate-6 translate-y-2 z-9'},
        {img:  image3,rotate:'rotate-0 scale-110 z-10'},
        {img:  image4,rotate:'rotate-6 translate-y-2 z-1'},
        {img:  image5,rotate:'rotate-12 translate-y-6 -z-1'},
    //   ,image2,image3,image4 , image5
        
    ]
  return (
   <SectionContainer 
   as='section'
   width='full'
   
    className='bg-white'

       >
        <SectionHeader
         titleNormal="Through"
        titleHighlight="The Lens"
        varient="secondary"
        align="center"
        className="mb-4"
        />

        <div className="flex w-[70%] mx-auto transition-transform ease-in-out duration-75  mt-10 items-center justify-center -gap-20">

           {images.map((item,index)=>(
            <GalleryCard key={index} imgUrl={item.img} rotate={item.rotate} />
           ))}
        </div>
        <div className="flex items-center m-10 justify-center">
          {/* <Button variant="filled"  label={`View more `} />
          
          <ChevronRight color='black'/> */}
          <button
          className=" bg-[#3571F0] px-5 hover:bg-blue-700 text-white py-2 rounded-full 
                    font-bold flex text-sm items-center justify-center transition-colors group"
        >
          View More
          <ChevronRight
            className="w-5 h-5 1 group-hover:translate-x-1 transition-transform"
            strokeWidth={3}
          />
        </button>
          
        </div>

   </SectionContainer>
  )
}

export default GallerySection
