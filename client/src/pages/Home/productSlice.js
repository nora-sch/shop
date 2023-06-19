import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    searchFor: [],
    key: "",
  },
  reducers: {
    addAll: (state, action) => {
      state.products = action.payload;
    },
    find: (state, action) => {
      state.searchFor = state.products.filter((prod) =>
        prod.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.key = action.payload;
    },
  },
});

export const { addAll, find } = productSlice.actions;
export default productSlice.reducer;
