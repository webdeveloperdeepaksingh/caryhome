"use client";

import { useEffect, useState } from "react";

interface SetColorProps {
    prodById:any;
}

const SetColor :React.FC<SetColorProps> = ({prodById}) => {
    
    const colorList:string[] = prodById.prodColor;
    const [selectColor, setSelectColor] = useState<number | null>(null);

    const handleSelectColor = (index:number) => {
        setSelectColor(index);
    }

    return ( 
        <div>
            <div className="flex items-center gap-2 border-b-2 py-2">
                <div className="font-semibold text-md">COLOR:</div>
                {
                    colorList.map((clr:any, index:number) => {
                        return(
                            <div className={selectColor === index ? "flex items-center justify-center w-5 h-5 border-[1.5px] border-indigo-800 rounded-full" : "border-none"}>
                                <button 
                                    key={index} 
                                    type="button"
                                    className={`w-3 h-3 rounded-full ${clr}`} 
                                    onClick={()=>handleSelectColor(index)}
                                >
                                </button>                           
                            </div>
                        )
                    })
                }
            </div>
        </div>
     );
}
 
export default SetColor;