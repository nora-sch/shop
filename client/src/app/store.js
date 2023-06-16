import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./features/SignIn/signInSlice";
import cartReducer from "../components/ProductCard/cartSlice";
import productReducer from "../pages/Home/productSlice";

export default configureStore({
  reducer: { 
    // user: userReducer,
    cart: cartReducer,
    products: productReducer
  },
});