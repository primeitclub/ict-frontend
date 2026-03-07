// import React from 'react'
import gsap from "gsap"
import { useRef } from "react"

type cardProps ={
    imgUrl:string,
    rotate?:string
}
const GalleryCard = (props:cardProps) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const mouseEnter=()=>{
        gsap.to(boxRef.current,{
            scale:1.2,
            duration:0.3
        })
    }
    const mouseLeave=()=>{
        gsap.to(boxRef.current,{
            scale:1,
            duration:0.3
        })
    }
    gsap.to('#glImage',{
    
    })
 console.log(props.rotate, props.imgUrl)
  return (
    <div id='glImage' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} ref={boxRef} className={`w-[280px]  h-[280px] rounded-[36px] shadow-black hover:-translate-y-7 hover:z-50 shadow-sm     ${props.rotate}  `}>
      <img className='w-full h-full rounded-[36px]  object-cover'  src={props.imgUrl} alt={'random text'} />
    </div>
  )
}

export default GalleryCard
