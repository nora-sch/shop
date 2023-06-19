import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../components/ProductCard/cartSlice";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import styled from "styled-components";
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
const updateFavorites = async (favoriteProduct, action) => {
  const sendFavorite = await fetch("/api/users/:id/favorites", {
    method: "PUT",
    body: JSON.stringify({
      favoriteProduct,
    }),
    headers: {
      "Content-Type": "application/json",
      // "token":
    },
  });
  if (sendFavorite.status === 200) {
    const body = await sendFavorite.json();
    if (body.status === 200) {
      notify(`${body.favorite.title} ${action} favorites`, "success");
    } else {
      notify(body.error, "error");
    }
  } else {
    notify(`Server error ${sendFavorite.status}`, "error");
  }
};

function Product() {
  const url = "https://fakestoreapi.com/products/";
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const isAdded = cart.find((item) => item.id === product.id);
  const dispatch = useDispatch();
  const addToCart = (addedProduct) => {
    !isAdded && dispatch(add(addedProduct));
  };

  const addFavorite = () => {
    if (!isFavorite) {
      console.log(product)
      setIsFavorite(true);
      updateFavorites(product, "added to");
    } else {
      setIsFavorite(false);
      updateFavorites(product, "removed from");
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      const fetchProduct = await fetch(url + id);
      const productFetched = await fetchProduct.json();
      setProduct(productFetched);
    };
    getProduct();
  }, []);
  useEffect(() => {
    const isFavoriteProduct = async (id) => {
      const userFavorites = await fetch("/api/users/:id/favorites");
      const userFavoritesFetched = await userFavorites.json();

      if (
        userFavoritesFetched.favorites.length > 0 &&
        userFavoritesFetched.favorites.includes(product.id)
      ) {
        setIsFavorite(true);
      }
    };
    isFavoriteProduct(id);
  }, [product]);
  console.log(product);
  return (
    // product.length > 0 && (
    <Card
      style={{
        width: "18rem",
        padding: "10px",
        border: "none",
        margin: "5px",
      }}
    >
      <ImgWrapper>
        <img
          style={{
            height: "auto",

            width: "100%",
            maxHeight: "100%",
          }}
          alt={product.title}
          src={product.image}
        />
        {isFavorite ? (
          <RiHeart3Fill
            onClick={() => {
              addFavorite();
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "30px",
              color: "#dba39a",
            }}
          />
        ) : (
          <RiHeart3Line
            onClick={() => {
              addFavorite();
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "30px",
              color: "lightgrey",
            }}
          />
        )}
      </ImgWrapper>

      <CardBody
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <CardHeader>
            <CardTitle tag="h6" style={{ width: "90%" }}>
              {product.title}
            </CardTitle>
            {/* <Rating>{product.length>0?product.rating.rate:''}</Rating> */}
          </CardHeader>
          <CardSubtitle
            className="mb-2 text-muted"
            style={{
              fontSize: "12px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* <span>rating </span> */}
            {/* <Rating>{product.rating.rate}</Rating> */}
            <div>{product.description}</div>
            <div>{product.category}</div>
          </CardSubtitle>
        </div>
        {user && (
          <CardBottom>
            {/* <Price>{product.price.toFixed(2)} €</Price> */}

            {isAdded ? (
              <Button
                //   onClick={() => {
                //     addToCart(product);
                //   }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                  height: "40px",
                  border: "none",
                }}
              >
                <FaCartPlus style={{ fontSize: "22px" }} />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  addToCart(product);
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                  height: "40px",
                  border: "none",
                  backgroundColor: "#DBA39A",
                  color: "white",
                }}
              >
                <FaCartPlus style={{ fontSize: "22px" }} />
              </Button>
            )}
          </CardBottom>
        )}
      </CardBody>
    </Card>
  );
  //   );
}

export default Product;
const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
`;
const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Price = styled.div``;

const Rating = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-left: 5px;
  background-color: #f0dbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;
