import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const notify = (msg, type) => {
  switch (type) {
    case "success":
      toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        theme: "colored",
        className: "toast-success",
      });
      break;
    case "error":
      toast.error(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        theme: "colored",
        className: "toast-error",
      });
      break;
  }
};
const postCart = async (state) => {
  const userCart = state.cart;
  const sendItem = await fetch("/api/users/:id/cart", {
    method: "POST",
    body: JSON.stringify({
      userCart,
    }),
    headers: {
      "Content-Type": "application/json",
      // "token":
    },
  });
  if (sendItem.status === 200) {
    const body = await sendItem.json();
    if (body.status === 201) {
    } else if (body.status === 400) {
      notify(body.message, "error");
    } else {
      notify(body.error, "error");
    }
  } else {
    notify(`Server error ${sendItem.status}`, "error");
  }
};

const userCart = JSON.parse(localStorage.getItem("cart"));

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: userCart ? userCart : [],
  },
  reducers: {
    add: (state, action) => {
      state.cart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(state.cart));
      // postCart(state);
    },
    deleteOne: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      // postCart(state);
    },
    deleteAll: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
      // postCart(state);
    },
  },
});

export const { add, deleteOne, deleteAll } = cartSlice.actions;
export default cartSlice.reducer;
