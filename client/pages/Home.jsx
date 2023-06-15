import React, { useEffect, useState } from "react";
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
  const addToCart = (addedProduct) => {
    console.log(addedProduct);
    //dispatch to store (object in slice) one by one
  };

  return (
    products.length > 0 && (
      <div>
        {products.map((pr) => (
          <div key={pr.id}>
            <div>{pr.title}</div>
            <button
              onClick={() => {
                addToCart(pr);
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    )
  );
}

export default Home;
