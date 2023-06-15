import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./cartSlice";

function ProductCard(pr) {
  const dispatch = useDispatch();
  const addToCart = (addedProduct) => {
    dispatch(add(addedProduct));
  };
  return (
    <div>
      <div>{pr.pr.title}</div>
      <button
        onClick={() => {
          addToCart(pr.pr);
        }}
      >
        Add
      </button>
    </div>
  );
}

export default ProductCard;
