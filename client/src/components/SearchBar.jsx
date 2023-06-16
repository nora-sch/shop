import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { find } from "../pages/Home/productSlice";
function SearchBar() {
  const [productToFind, setProductToFind] = useState("");
  const dispatch = useDispatch();
  const getProducts = (e) => {
    setProductToFind(e.target.value);
    // dispatch(find(productToFind));
  };
  useEffect(() => {
    dispatch(find(productToFind));
  }, [productToFind]);
  return (
    <SearchBarWrapper>
      <Input
        className="text-input"
        name="email"
        type="text"
        placeholder="search article"
        value={productToFind}
        onChange={(e) => getProducts(e)}
      />
    </SearchBarWrapper>
  );
}

export default SearchBar;
const SearchBarWrapper = styled.div`
  margin-right: 10px;
`;
