"use client";
import { CartItemType } from "@/app/product/ProductDetails";
import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
    cartItem:CartItemType,
    prodById: any,
    handleSelectColor: (col: string) => void;
}


const ProductImage: React.FC<ProductImageProps> = ({prodById, cartItem, handleSelectColor}) => {

    const imageList:string[] = prodById.prodImage;
    const [selectImage, setSelectImage] = useState<string>(prodById.prodImage?.[0]);

    const handleSelectImage = (imgUrl:string) => {
        setSelectImage(imgUrl);
    }

    return ( 
        <div>
            <div className="flex gap-6 w-full">
                <div className="flex flex-col border-[1.5px] border-gray-300 gap-3 w-[100px] rounded-md p-3 h-auto">
                    {
                        imageList?.map((img:any, index:number)=>{
                            return(
                                <div 
                                    key={img.prodImage} 
                                    className={`${img === selectImage ? "border-2 border-indigo-800 rounded-md p-3 cursor-pointer" : "border-[1.5px] rounded-md p-3 border-gray-300 cursor-pointer"}`} 
                                    onClick={()=>handleSelectImage(img)}
                                >
                                    <Image alt="prodImage" src={img} width={60} height={60}/>
                                </div>   
                            )
                        })
                    }
                </div>
                <div className="flex">
                    <Image alt="prodImage" src={selectImage}  width={560} height={250}/>
                </div>
            </div>
        </div>
     );
}
 
export default ProductImage;