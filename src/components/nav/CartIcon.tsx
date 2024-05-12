"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
  
type StoreType = {
    store: unknown
    cart:any;
}

const CartIcon =  () => {

    const cartItems =  useSelector((store:StoreType) => store.cart);

    return ( 
        <div >
            <Link href="/cart" className="relative cursor-pointer">
                <div className="text-3xl">
                    <CiShoppingCart/>
                </div>
                <span className="flex absolute top-[-4px] right-[-6px] bg-indigo-800 text-white h-5 w-5 rounded-full items-center justify-center text-xs ">
                    {cartItems.totalItems}
                </span>
            </Link>
        </div>
     );
}
 
export default CartIcon;