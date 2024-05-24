"use client";
import EmptyCart from "./EmptyCart";
import { CartItemType } from "../product/ProductDetails";
import SetQuantity from "@/components/SetQuantity";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { clearCartItems } from "../../../redux/slices/cartSlice";
import { truncateText } from "../../../utils/truncateText";
import Link from "next/link";
import { removeFromCart } from "../../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { handlePlusCartQty, handleMinusCartQty } from "../../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Heading from "@/components/Heading";
import { formatPrice } from "../../../utils/formatPrice";
import Image from "next/image";


type StoreType = {
    store: unknown
    cart:any;
}

const ShoppingCart = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const cartItems = useSelector((store:StoreType) => store.cart);

    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole")
        }
    };

    const subTotal : number = cartItems.totalPrice;
    const tax : number= .06 * subTotal;
    const shippingCharge : number= 370;
    
    const handlePlusQty = (product:CartItemType) => {
        dispatch(handlePlusCartQty(product));
    }

    const handleMinusQty = (product:CartItemType) => {
        dispatch(handleMinusCartQty(product));
    }
    

    const handleRemove = (product:any) => {
        dispatch(removeFromCart(product));
        toast.success('Product removed from cart.');
    }

    const handleClearCart = () => {
        dispatch(clearCartItems());
        toast.success("Cleared all items from cart.");
    }

    if(cartItems.totalItems === 0){
        return<div>
            <EmptyCart/>
        </div>
    }

    console.log(cartItems);

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
                    cartItems?.items.map((item:any)=>{
                        return(
                            <div key={item._id} className="grid grid-cols-5 text-xs md:text-sm gap-2 border-t-[1.5px] border-indigo-800 py-4 items-center">
                                <div className="col-span-2 justify-self-start flex gap-2" >
                                    <Link href={`/product/${item._id}`}>
                                        <Image alt={item.prodName} src={item.prodImage[0]} width={50} height={30}/>
                                    </Link>
                                    <div className="flex flex-col gap-2">
                                        <p>{truncateText(item.prodName)}</p>
                                        <div className="flex gap-1 w-auto">
                                            <button type="button" className="btnRemove w-[70px]" onClick={()=> handleRemove(item)}>Remove</button>
                                            {
                                                 typeof item.prodColor === "string" && item.prodColor  ?   (<div className={`${item.prodColor} w-[70px] rounded-md border-[1.5px] border-black`}></div>)
                                                :
                                                (<div className="text-red-700 font-bold text-lg">No color choosen.</div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="justify-self-center">
                                    {formatPrice(item.prodPrice)}
                                </div>
                                <div className="justify-self-center">
                                <SetQuantity 
                                    cartItem={item}
                                    handleIncreaseQty={()=> handlePlusQty(item)}
                                    handleDecreaseQty={()=>handleMinusQty(item)}
                                />
                                </div>
                                <div className="justify-self-end font-semibold">
                                    {formatPrice(item.prodTotalPrice)}
                                </div>
                            </div>
                        )
                    })          
                }
            </div>
            <div className="border-t-[1.5px] border-indigo-800 py-4 gap-4 mt-6 flex justify-between">
            <div className="w-[180px]">
                <button type="button" className="btnLeft" onClick={handleClearCart}>Clear Cart</button>
            </div>
            <div className="flex flex-col text-sm gap-1 items-start p-6 bg-gray-100 rounded-md">
                <div className="flex gap-3 justify-between w-full text-md font-semibold">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subTotal)}</span>
                </div>
                <div className="flex gap-3 justify-between w-full text-md">
                    <span>Tax: 6%</span>
                    <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex gap-3 justify-between w-full text-md">
                    <span>Shipping:</span>
                    <span>{formatPrice(370)}</span>
                </div>
                <div className="flex gap-3 justify-between w-full text-md">
                    <span>Total:</span>
                    <span>{formatPrice(subTotal+tax+shippingCharge)}</span>
                </div>
                <div className="w-full">
                    <button type="button" className="btnLeft w-full" onClick={()=>{loggedInUser.result._id ? router.push(`/checkout/${loggedInUser.result._id}`): router.push('/login?navigate=checkout')}}>
                            {loggedInUser.result._id ? "Checkout" : "Login to checkout"}
                    </button>
                </div>
            </div>
            </div>
        </div>
     );   
}
 
export default ShoppingCart;