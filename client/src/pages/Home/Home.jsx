import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addAll } from "./productSlice";

const LIMIT = 19;
function Home() {
  const user = useSelector((state) => state.user.user);
  const url = "https://fakestoreapi.com/products?limit=" + LIMIT;
  const [products, setProducts] = useState({});
  const [favorites, setFavorites] = useState(null);
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.products.searchFor);
  const keyWord = useSelector((state) => state.products.key);
  useEffect(() => {
    const getProducts = async () => {
      const fetchProducts = await fetch(url);
      const productsFetched = await fetchProducts.json();
      setProducts(productsFetched);
      dispatch(addAll(productsFetched));
    };

    const getUserFavorites = async () => {
      const fetchFavorites = await fetch("/api/users/:id/favorites");
      const favoritesFetched = await fetchFavorites.json();
      setFavorites(favoritesFetched.favorites);
    };
    getUserFavorites();
    getProducts();
  }, []);

  return (
    products.length > 0 && (
      <CardsWrapper>
        {filteredProducts.length > 0 || keyWord.length > 0
          ? filteredProducts.map((prod) => (
              <ProductCard key={prod.id} pr={prod} fav={favorites} />
            ))
          : products.map((prod) => (
              <ProductCard key={prod.id} pr={prod} fav={favorites} />
            ))}
      </CardsWrapper>
    )
  );
}

export default Home;
const CardsWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
