
type titleProps = {
        title : string,
        imgUrl : string[],

     }

const SponsorTitle = (props:titleProps) => {
     const imgArray = props.imgUrl;
  return (
    <div className="text-4xl text-center items-center leading-3 flex justify-start gap-16 ">
      
    <div className="flex">{props.title}</div>
     {/* {imgArray.map(el => {
         <img  src={el} alt="random text" />
     });}
       */}
    </div>
  )
}

export default SponsorTitle
