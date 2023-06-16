import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/signIn/signInSlice";
import cartReducer from "../components/ProductCard/cartSlice";
import favoritesReducer from "../components/ProductCard/favoritesSlice";
import productReducer from "../pages/Home/productSlice";

export default configureStore({
  reducer: { 
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    favorites : favoritesReducer,
  },
});