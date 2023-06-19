import { createSlice } from "@reduxjs/toolkit";

const userCart = JSON.parse(localStorage.getItem("cart"));
console.log("localcart");
console.log(userCart);
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: userCart?userCart:[],
  },
  reducers: {
    add: (state, action) => {
      state.cart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(state.cart));
      console.log(JSON.parse(localStorage.getItem("cart")));
    },
    deleteOne: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      console.log(JSON.parse(localStorage.getItem("cart")));
    },
    deleteAll: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
      console.log(JSON.parse(localStorage.getItem("cart")));
    },

  },
});

export const { add, deleteOne, deleteAll } = cartSlice.actions;
export default cartSlice.reducer;
