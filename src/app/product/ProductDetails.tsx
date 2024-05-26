"use client";
import toast from "react-hot-toast";
import SetQuantity from "@/components/SetQuantity";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import Container from "@/components/Container";
import { Rating } from "@mui/material";
import ProductImage from "../../components/ProductImage";
import { useState, useCallback, useEffect } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import SetColor from "@/components/SetColor";
  
interface ProductDetailsProps {
    prodById:any;
}

export type CartItemType = {
    prodId: string, 
    prodName: string, 
    prodCat: string,  
    prodPrice: number, 
    prodBrand:string, 
    prodColor:string, 
    inStock: boolean, 
    prodImage:string, 
    prodQty: number,
    prodTotalPrice?: number
}


const ProductDetails:React.FC<ProductDetailsProps> = ({prodById}) => {

    const colorList:string[] = prodById.prodColor;
    const dispatch = useDispatch();

    const [cartItem, setCartItem] = useState<CartItemType>({
        prodId: prodById._id, 
        prodName: prodById.prodName, 
        prodCat: prodById.prodCat,  
        prodPrice: prodById.prodPrice, 
        prodBrand:prodById.prodBrand, 
        prodColor:prodById.prodColor, 
        inStock: prodById.inStcok, 
        prodImage:prodById.prodImage, 
        prodQty: 1
    })
    
    const handleAddToCart = (product:CartItemType) =>{  
        dispatch(addToCart(product)); 
    }

    const prodRating = prodById.prodReviews.reduce((acc:number, item:any) => 
        item.rating + acc , 0)/ 
        prodById.prodReviews.length;

    const handleSelectColor = useCallback((col: string)=>{
        setCartItem((prev) => {
            return{...prev, prodColor: col}
        })
    },[cartItem.prodColor]) 

    useEffect(()=>{
        handleSelectColor(prodById.prodColor[0])
    },[]) ;


    const handleIncreaseQty = useCallback(()=> {
        if(cartItem.prodQty > 19){
            return toast.error("Oops! Reached max limit.");
        }else{
            setCartItem((prev)=>{
                return {...prev, prodQty: prev.prodQty + 1}
            });
        }     
    },[cartItem]) 

    const handleDecreaseQty = useCallback(()=> {

        if(cartItem.prodQty < 2){
            return toast.error("Oops! Reached min limit.");
        }else{
            setCartItem((prev)=>{
                return {...prev, prodQty: prev.prodQty - 1}
            });
        }     
    },[cartItem]) 


    return ( 
        <div>
           <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 h-auto mt-8 p-6 md:p-0">
                    <div className="">
                        <ProductImage prodById={prodById} cartItem={cartItem} handleSelectColor={handleSelectColor}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col border-b-2 gap-3 py-3">
                            <h1 className="text-3xl font-bold">{prodById.prodName}</h1>
                            <div className="flex items-center gap-2">
                                <Rating value={prodRating} readOnly/>
                                <div className="text-sm">{prodById.prodReviews.length} reviews</div>
                            </div>
                        </div>
                        <div className="pb-3 border-b-2">
                            <p className="text-justify">{prodById.prodDesc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <h6 className="text-md font-semibold">PRICE:</h6>
                            <p>{formatPrice(prodById.prodPrice)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <h6 className="text-md font-semibold">CATEGORY:</h6>
                            <p>{prodById.prodCat}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <h6 className="text-md font-semibold">BRAND:</h6>
                            <p>{prodById.prodBrand}</p>
                        </div>
                        <div className={`${prodById.inStock ? "text-green-600 text-sm font-semibold" : "text-red-600 text-sm font-semibold"}`}>
                            {
                                prodById.inStock ? "In Stock" : "Out of Stock"
                                
                            }
                        </div>
                        <SetColor
                            cartItem={cartItem}
                            prodColor={prodById.prodColor}
                            handleSelectColor={handleSelectColor}
                        />      
                        <div className="flex gap-3">
                            <div className="font-bold text-sm py-2">QUANTITY:</div>
                                <SetQuantity 
                                    cartItem={cartItem}
                                    handleIncreaseQty={handleIncreaseQty}
                                    handleDecreaseQty={handleDecreaseQty}
                                />
                            </div>           
                        <button type="button" className="btnLeft" onClick={()=>handleAddToCart(cartItem)}>
                            Add to cart
                        </button>
                    </div>
                </div>
           </Container>
        </div>
     );
}
 
export default ProductDetails;