import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { find } from "../pages/Home/productSlice";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const [productToFind, setProductToFind] = useState("");
  const url = "https://fakestoreapi.com/products";
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProducts = (e) => {
    setProductToFind(e.target.value);
   navigate('/');
  };
  const searchFor = useSelector((state) => state.products.searchFor);

  useEffect(() => {
    dispatch(find(productToFind));
    setFilteredProducts(searchFor);
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
