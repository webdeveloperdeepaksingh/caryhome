"use client";
import { CartItemType } from "@/app/product/ProductDetails";

interface SetColorProps{
    prodColor: string[],
    cartItem: CartItemType,
    handleSelectColor: (col: string) => void;
}

const SetColor:React.FC<SetColorProps> = ({prodColor, cartItem, handleSelectColor}) => {

    return ( 
        <div>
            <div className="flex items-center gap-2 border-b-2 py-2">
                <span className="font-bold text-sm">COLOR:</span>
                <div className="flex py-2">
                    {
                        prodColor?.map((clr:string) =>{
                            return(
                            <>
                                <div 
                                    key={clr} 
                                    onClick={()=> handleSelectColor(clr)}
                                    className={`flex items-center h-7 w-7 rounded-full border-indigo-800 justify-center  
                                    ${cartItem.prodColor === clr ? "border-[1.5px]" : "border-none"}`}
                                >
                                    <div className={`h-5 w-5 ${clr} rounded-full border-[1.2px] border-black cursor-pointer`}>

                                    </div>          
                                </div>             
                            </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
     );
}
 
export default SetColor;