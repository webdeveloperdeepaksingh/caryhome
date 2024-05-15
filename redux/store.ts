import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";
import cartSlice from "./slices/cartSlice";
  
export const store = configureStore({
  reducer:{
      cart: cartSlice,
      search: searchSlice
  },
})