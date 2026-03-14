import React, { useState } from 'react'
import SectionContainer from '../../../shared/layouts/sectionContainer'
import { Button } from '../../../shared/design-components'

import image1 from '../../../../public/ICT Meet/hamro patro.svg'
import SponsorData from './SponsorData.tsx'
const Sponsors = () => {
  const [sponsorlist,setList] =useState(true)
return(

  <SectionContainer >

 
 
  {!sponsorlist ? 
  <div className='w-full flex bg-[#3571F0] gap-10  rounded-lg'>

    <div className="flex flex-col w-1/2 p-10 gap-5 ">
        <h1 className='text-[50px] -tracking-[2.4px]'>Become A Sponsor</h1>
        <p className='text-[20px] leading-[28px] font-[300]'>Partner  with  ICT  MeetUp  and  showcase  your  brand  to  a  
vibrant community  of  tech  enthusiasts,  developers,  and 
creators  while  engaging  with  curious  minds  eager 
to  learn,  build,  and  innovate.</p>
     <div className="flex">
      <Button variant="solid-white" label='Be a Sponsor' />
     </div>
    
        
    </div>
    <div className="flex flex-col justify-center">
      <h1 className='font-[600] text-[22px] leading-[30px] '>Contact Person</h1>
      <p className='text-[16px] leading-[30px]'>Aditika Singh(9843744896)</p>
      <h1 className='font-[600] text-[22px]  leading-[30px]'>Mail Us</h1>
      <p className='text-[16px] leading-[30px]'>sponsor@primeitclub.com</p>
    </div>



    
    
  
  </div>
  :
   <div className='w-full flex flex-col gap-20'>
      {/* <SponsorTitle title='Title Sponsor' imgUrl={image1} /> */}
      <SponsorData  title='Title Sponsor' altdata='Sponsor img' big={true} imgUrl={[image1]} /> 
      <SponsorData  title='Platinum Sponsor' altdata='Sponsor img' big={false} imgUrl={[image1,image1]} /> 
      <SponsorData  title='Gold Sponsor' altdata='Sponsor img' big={false} imgUrl={[image1,image1,image1]} /> 
      
   </div>
   
  }
  
  
   </SectionContainer>
)
}

export default Sponsors
