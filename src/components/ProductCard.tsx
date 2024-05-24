"use client";
import Image from "next/image";
import { truncateText } from "../../utils/truncateText";
import { formatPrice } from "../../utils/formatPrice";
import { ProdType } from "@/app/dashboard/update-product/UpdateProduct";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";

interface ProductCardProps {
    data: ProdType[];
}

const ProductCard :React.FC<ProductCardProps> = ({data}) => {

    const router = useRouter();

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {
                data?.map((item:any)=>{
                    return(
                        <div key={item._id} className="w-full h-auto p-6 shadow-lg rounded-md hover:scale-110 duration-500 ease-in-out">
                            <div className="flex flex-col items-center">
                                <div className="p-3 border-[1.5px]  border-gray-500 rounded-sm mb-3">
                                    <Image alt="product" width={350} height={300} src={item.prodImage?.[0]} />
                                </div>
                                <div>
                                    <h1 className="uppercase text-center text-xl font-bold">{truncateText(item.prodName)}</h1>
                                </div>
                                <div>
                                    <Rating/>
                                </div>
                                <div>
                                    review
                                </div>
                                <div className="font-semibold mb-3">
                                    {formatPrice(item.prodPrice)}
                                </div>
                                <button  type="button" onClick={()=>router.push(`/product/${item._id}`)}  className="btnLearn w-full">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
     );
}
 
export default ProductCard;