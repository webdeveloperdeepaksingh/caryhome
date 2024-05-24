"use client";
import { CartItemType } from "@/app/product/ProductDetails";
import {useSelector } from "react-redux";
import React,{useState} from "react";

interface BuyItemProps {
    makePayment: (cartItems:  CartItemType ) => Promise<void>; 
}

type StoreType = {
  store: unknown
  cart:any;
}
  
const Buy: React.FC<BuyItemProps> = ({ makePayment }) => {

  const cartItems =  useSelector((store:StoreType) => store.cart); 
  const [isLoading, setIsLoading] = useState(false);
 
  return (
    <div>
        <button type="button" 
            onClick={() => makePayment(cartItems)}
            disabled={isLoading}
            className={`btnRight w-full ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
        {isLoading ? 'Processing...' : 'Continue'}
        </button>
    </div>
  );
};

export default Buy;
