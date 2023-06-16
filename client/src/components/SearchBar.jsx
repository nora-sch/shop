import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { find } from "../pages/Home/productSlice";
function SearchBar() {
  const [productToFind, setProductToFind] = useState("");
  const url = "https://fakestoreapi.com/products";
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const getProducts = (e) => {
    setProductToFind(e.target.value);
  };
  const searchFor = useSelector((state) => state.products.searchFor);

  //   const getNewProducts = (products) => {
  //     const productTable = [];
  //     products.map((prod) => {
  //       const fetchProducts = async () => {
  //         const fetchProduct = await fetch(url + "/" + prod.id);
  //         const productFetched = await fetchProduct.json();
  //         console.log(productFetched);
  //         productTable.push(productFetched);
  //       };
  //       fetchProducts();
  //     });
  //     console.log(productTable);
  //     return productTable;
  //   };

  useEffect(() => {
    dispatch(find(productToFind));
    // const newProducts = getNewProducts(searchFor);
    // setFilteredProducts(newProducts);
    setFilteredProducts(searchFor);
    console.log(filteredProducts);
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
