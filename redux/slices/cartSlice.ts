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
        totalQuantity: initialCartItems.length, 
        totalPrice: initialCartItems.reduce((acc:any, items:any) => (acc) + (items.prodPrice),0),
      }, 

    reducers:{
        addToCart:(state, action) =>{
            const {_id, prodName, prodSlug, prodTags, prodCat, prodDesc, prodPrice, prodBrand, prodReviews, prodColor, inStock, prodImage } = action.payload;
            const existingProduct = state.items.find((item:any) => item._id === _id);
             if (!existingProduct) {
                    state.items.push({_id, prodName, prodSlug, prodTags, prodCat, prodDesc, prodPrice, prodBrand, prodReviews, prodColor, inStock, prodImage });
                    toast.success('Product added to cart.');
                    state.totalQuantity++;
                    state.totalPrice += prodPrice;
                    if (typeof window !== 'undefined') {
                    localStorage.setItem("cartItems", JSON.stringify(state.items));
                }  
            }else{
                toast.error('Product already in cart!');
            }         
        },
        increaseProdQty: (state, action) => {
            const productId = action.payload._id;
            const existingProduct = state.items.find((item: any) => item._id === productId);
            if (existingProduct) {
                existingProduct.quantity++; // Assuming you have a 'quantity' property for each product
                state.totalQuantity++;
                state.totalPrice += existingProduct.prodPrice;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('cartItems', JSON.stringify(state.items));
                }
            }
        },
        decreaseProdQty: (state, action) => {
            const productId = action.payload._id;
            const existingProduct = state.items.find((item: any) => item._id === productId);
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity--; // Assuming you have a 'quantity' property for each product
                state.totalQuantity--;
                state.totalPrice -= existingProduct.prodPrice;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('cartItems', JSON.stringify(state.items));
                }
            }
        },
        removeFromCart:(state, action) =>{
            const productId = action.payload._id;
            const index = state.items.findIndex((item:any) => item._id === productId);
            state.totalQuantity--;
            state.totalPrice -= state.items[index].prodPrice;
            state.items = state.items.filter((item:any) => item._id !== productId);
            
             if (typeof window !== 'undefined') {
                 localStorage.setItem("cartItems", JSON.stringify(state.items));
             }
        },
        clearLocalStorage: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            if (typeof window !== 'undefined') {
             localStorage.removeItem("cartItems");
            }
        },
    }
});

export const {addToCart,increaseProdQty, decreaseProdQty, removeFromCart, clearLocalStorage} = cartSlice.actions;
export default cartSlice.reducer;