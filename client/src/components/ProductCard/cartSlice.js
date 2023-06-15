import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    add: (state, action) => {
      state.cart = [...state.cart, action.payload];
      console.log(state.cart);
    },
    deleteOne: (state) => {},
    deleteAll: (state) => {
      state.cart = {};
    },
  },
});

export const { add, deleteOne, deleteAll } = cartSlice.actions;
export default cartSlice.reducer;
