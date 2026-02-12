type GradientTextType={
    grad:string,
    norm:string,
}

export const GradientText = ({grad,norm}:GradientTextType)=>{
    return(
        <>
        <h2 className="text-center text-5xl font-bold mb-12">
        <span className="bg-gradient-to-r from-[#DBF5FF] to-[#51A7FF] bg-clip-text text-transparent">
          {grad}
        </span>{" "}  
        {norm}
      </h2>
        </>
    );
}