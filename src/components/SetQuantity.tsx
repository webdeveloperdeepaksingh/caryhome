"use client";
import { CartItemType } from "@/app/product/ProductDetails";

interface SetQuantityProps {
    countCart?: boolean; //help us to decide which qty either at shopping cart or product page.
    cartItem:CartItemType;
    handleIncreaseQty?: () => void;
    handleDecreaseQty?:() => void;
}
const SetQuantity: React.FC<SetQuantityProps> = ({countCart, cartItem, handleIncreaseQty, handleDecreaseQty }) => {

    return ( 
    <div className=" flex gap-8 items-center">
        <div className="flex items-center gap-4 text-sm">
            <button type="button" onClick={handleDecreaseQty} className="btnQty">-</button>
            <div>{cartItem.prodQty}</div>
            <button type="button" onClick={handleIncreaseQty} className="btnQty" >+</button>
         </div>
    </div>
  );
}
 
export default SetQuantity;