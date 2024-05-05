"use client";
import Link from "next/link";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { useState } from "react";

type storeType = {
    store: unknown
    cart:any;
}

const CartIcon = () => {

    const [isLoading, setIsLoading] = useState(false);

    const cartItems = useSelector((store:storeType) => store.cart);

    if(isLoading){
        return <div><Loading/></div>
    }

    return ( 
        <div>
            <Link href="/cart" className="relative cursor-pointer">
                <div className="text-3xl">
                    <CiShoppingCart/>
                </div>
                <span className="flex absolute top-[-4px] right-[-6px] bg-indigo-800 text-white h-5 w-5 rounded-full items-center justify-center text-xs ">
                    {cartItems.totalQuantity}
                </span>
            </Link>
        </div>
     );
}
 
export default CartIcon;