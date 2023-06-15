import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    add: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    deleteOne: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    deleteAll: (state) => {
      state.cart = [];
    },
  },
});

export const { add, deleteOne, deleteAll } = cartSlice.actions;
export default cartSlice.reducer;
