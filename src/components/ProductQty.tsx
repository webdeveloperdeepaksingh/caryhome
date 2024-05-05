"use client";
import toast from "react-hot-toast";
import { useState } from "react";


const SetQuantity = () => {

    const [quantity, setQuantity]= useState<number>(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrease = () => {
        if(quantity !== 1){
            setQuantity(quantity - 1);
        }else{
            toast.error("Oops...! Reached min limit.")
        }
    }

return ( 
    <div className=" flex gap-8 items-center">
        <div className="font-bold text-sm py-2">QUANTITY:</div>
        <div className="flex items-center gap-4 text-sm">
            <button type="button" onClick={handleDecrease} className="btnQty">-</button>
            <div>{quantity}</div>
            <button type="button" onClick={handleIncrease} className="btnQty" >+</button>
        </div>
    </div>
  );
}
 
export default SetQuantity;
