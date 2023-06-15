import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";

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
      <div>
        {products.map((prod) => (
          <ProductCard key={prod.id} pr={prod} />
        ))}
      </div>
    )
  );
}

export default Home;
