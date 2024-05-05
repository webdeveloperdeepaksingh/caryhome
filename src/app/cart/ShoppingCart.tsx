"use client";
import { truncateText } from "../../../utils/truncateText";
import Link from "next/link";
import { removeFromCart } from "../../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Heading from "@/components/Heading";
import { formatPrice } from "../../../utils/formatPrice";


interface ShoppingCartProps {
    
}

type storeType = {
    store: unknown
    cart:any;
}

const ShoppingCart:React.FC<ShoppingCartProps> = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((store:storeType) => store.cart);

    const handleRemove = (product:any) => {
        dispatch(removeFromCart(product));
        toast.success('Product removed from cart.');
    }

    return ( 
        <div>
            <div className="text-center">
                <Heading title="Shopping Cart" />
            </div>
            <div className="grid grid-cols-5 items-center pb-2 gap-4 text-sm mt-8 font-semibold">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>
            <div>
                {
                    cartItems.items.map((item:any)=>{
                        return(
                            <div key={item._id} className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-indigo-800 py-4 items-center">
                                <div className="col-span-2 justify-self-start flex gap-2 md:gap-4" >
                                    <Link href={`/product/${item._id}`}>
                                        Image
                                    </Link>
                                    <div className="flex flex-col gap-3">
                                        <p>{truncateText(item.prodName)}</p>
                                        <div className="w-[70px]">
                                            <button type="button" className="btnRemove" onClick={()=> handleRemove(item)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })          
                }
            </div>
        </div>
     );
}
 
export default ShoppingCart;