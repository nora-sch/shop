import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import styled from "styled-components";

const LIMIT = 20;
function Home() {
  const url = "https://fakestoreapi.com/products?limit=" + LIMIT;
  const [products, setProducts] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const fetchProducts = await fetch(url);
      const productsFetched = await fetchProducts.json();
      setProducts(productsFetched);
    };
    getProducts();
  }, []);
 

  return (
    products.length > 0 && (
        <CardsWrapper>
        {products.map((prod) => (
          <ProductCard key={prod.id} pr={prod} />
        ))}
      </CardsWrapper>
    )
  );
}

export default Home;
const CardsWrapper = styled.div`
width:80%;
margin: 0 auto;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;`;