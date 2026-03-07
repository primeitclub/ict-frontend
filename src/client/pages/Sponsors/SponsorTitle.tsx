
type titleProps = {
        title : string,
        imgUrl : string[],

     }
const SponsorTitle = (props:titleProps) => {
     
  return (
    <div className="text-4xl text-center items-center leading-3 flex justify-start gap-16 ">
      
    <div className="flex">{props.title}</div>
       <img  src={props.imgUrl} alt="random text" />
    </div>
  )
}

export default SponsorTitle
