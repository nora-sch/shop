import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./features/SignIn/signInSlice";
import cartReducer from "../components/ProductCard/cartSlice";

export default configureStore({
  reducer: { 
    // user: userReducer,
    cart: cartReducer
  },
});