import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    add: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    remove: (state, action) => {
      console.log(action.payload);

      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
    deleteAll: (state) => {
      state.favorites = [];
    },
  },
});

export const { add, remove, deleteAll } = favoritesSlice.actions;
export default favoritesSlice.reducer;
