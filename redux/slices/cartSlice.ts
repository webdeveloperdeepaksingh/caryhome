import { CartItemType } from "@/app/product/ProductDetails";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let initialCartItems: any[] = [];
if (typeof window !== 'undefined') {
    const cartItemsString = localStorage.getItem("cartItems") || "[]"; 
    initialCartItems = JSON.parse(cartItemsString);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: initialCartItems,
        totalItems: initialCartItems.length,
        totalPrice: initialCartItems.reduce((acc, item) => acc + item.prodPrice * item.prodQty, 0),
      }, 

    reducers:{
        addToCart:(state, action, )  =>{
            const {prodId, prodName, prodCat,  prodPrice, prodBrand, prodColor, inStock, prodImage, prodQty } = action.payload;
            const existingProduct = state.items.find((item:any) => item._id === prodId);
            
             if (!existingProduct) {
                    let prodTotalPrice=prodPrice*prodQty;
                    state.items.push({prodId, prodName, prodCat, prodPrice, prodBrand, prodColor, prodQty, inStock, prodImage, prodTotalPrice });
                    toast.success('Product added to cart.');                    
                    state.totalItems++;
                    state.totalPrice += prodPrice;
                    if (typeof window !== 'undefined') {
                    localStorage.setItem("cartItems", JSON.stringify(state.items));
                }  
            }else{
                toast.error('Product already in cart!');
            }         
        },
        handlePlusCartQty:(state, action) => {
            var {prodId, prodPrice, prodQty } = action.payload;
            if(prodQty >19){
                toast.error("Oops! Reached max limit.");
            }else{
                let cartItems: CartItemType[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
                if(cartItems){
                    let product = cartItems.filter((item:any)=> item.prodId === prodId);
                    product[0].prodQty = product[0].prodQty + 1;
                    product[0].prodTotalPrice = product[0].prodQty*prodPrice;
                    cartItems[cartItems.indexOf(product[0])]=product[0];
                    state.items=cartItems;
                    state.totalPrice += prodPrice;
                    localStorage.setItem("cartItems", JSON.stringify(state.items));
                }        
            }
        },
        handleMinusCartQty:(state, action) => {
            var {prodId, prodPrice,  prodQty } = action.payload;
            if(prodQty < 2){
                toast.error("Oops! Reached min limit.");
            }else{
                let cartItems: CartItemType[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
                if(cartItems){
                    let product = cartItems.filter((item:any)=> item.prodId === prodId);
                    product[0].prodQty = product[0].prodQty - 1;
                    product[0].prodTotalPrice = product[0].prodQty*prodPrice;
                    cartItems[cartItems.indexOf(product[0])] = product[0];
                    state.items=cartItems;         
                    state.totalPrice -= prodPrice;           
                    localStorage.setItem("cartItems", JSON.stringify(state.items));
                } 
            }                 
        },
        removeFromCart:(state, action) =>{
            const productId = action.payload.prodId;
            const product = state.items.filter((item:any) => item.prodId === productId);            
            state.totalItems -= product[0].prodQty;
            state.totalPrice -= product[0].prodTotalPrice;
            state.items = state.items.filter((item:any) => item.prodId !== productId);
            
             if (typeof window !== 'undefined') {
                 localStorage.setItem("cartItems", JSON.stringify(state.items));
             }
        },
        handleSetPaymentIntent:(state, action) => {
            
        },
    
        clearCartItems: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            if (typeof window !== 'undefined') {
             localStorage.removeItem("cartItems");
            }
        },
    }
});

export const {addToCart, handlePlusCartQty, handleMinusCartQty, removeFromCart, handleSetPaymentIntent, clearCartItems} = cartSlice.actions;
export default cartSlice.reducer;