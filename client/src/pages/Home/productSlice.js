import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    searchFor: [],
  },
  reducers: {
    addAll: (state, action) => {
      state.products = action.payload;
    },
    find: (state, action) => {
      state.searchFor = state.products.filter((prod) =>
        prod.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { addAll, find } = productSlice.actions;
export default productSlice.reducer;
