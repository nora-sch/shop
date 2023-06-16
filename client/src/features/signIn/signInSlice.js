import { createSlice } from "@reduxjs/toolkit";

export const signInSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    add: (state, action) => {
      state.user = action.payload
    },
     remove: (state) => {
      state.user = null;
    },

  },
});

export const { add, remove } = signInSlice.actions;
export default signInSlice.reducer;
