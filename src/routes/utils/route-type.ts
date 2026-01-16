export const VersionConifg = {
    latest:"v8",
    availabel:['v6','v7','v8'],
}

export const isValidRoute = (v:string)=>{
 return VersionConifg.availabel.includes(v);    
}

export function isLatestVersion(v:string){
   return VersionConifg.latest == v;
}
