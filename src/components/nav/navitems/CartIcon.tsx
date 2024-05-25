"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import Loading from "../Loading";
   
type StoreType = {
    store: unknown
    cart:any;
}

const CartIcon = () => {

    const [isLoading, setIsLoading] = useState(true);
    const cartItems = useSelector((store: StoreType) => store.cart);

    useEffect(()=>{
       if(cartItems.items.length >=0){
        setIsLoading(false);
      }
    },[cartItems.items])

    if(isLoading){
      return <div>
          <Loading/>
      </div>
    }
  
    return (
      <div>
        <Link href="/cart" className="relative cursor-pointer">
          <span className="text-3xl">
            <CiShoppingCart />
          </span>  
          <span className="flex absolute top-[-4px] right-[-6px] bg-indigo-800 text-white h-5 w-5 rounded-full items-center justify-center text-xs ">
            {cartItems?.totalItems}
          </span>
        </Link>
      </div>
    );
  };  
 
export default CartIcon;