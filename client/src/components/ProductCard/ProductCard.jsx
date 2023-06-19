import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./cartSlice";
import { add as addFav, remove } from "./favoritesSlice";
import { FaCartPlus } from "react-icons/fa";
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
import { Link } from "react-router-dom";
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
      // notify(`${body.favorite.title} ${action} favorites`, "success");
    } else {
      notify(body.error, "error");
    }
  } else {
    notify(`Server error ${sendFavorite.status}`, "error");
  }
};
function ProductCard(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const isAdded = cart.find((item) => item.id === props.pr.id);
  const [isFavorite, setIsFavorite] = useState(false);
  const addToCart = (addedProduct) => {
    !isAdded && dispatch(add(addedProduct));
  };
  // const favorites = useSelector((state) => state.favorites.favorites);

  const addFavorite = () => {
    if (!isFavorite) {
      console.log(props.pr)
      setIsFavorite(true);
      // dispatch(addFav(props.pr));
      updateFavorites(props.pr, "added to");
    } else {
      setIsFavorite(false);
      // dispatch(remove(props.pr));
      updateFavorites(props.pr, "removed from");
    }
  };
  useEffect(() => {
    if (props.fav && props.fav.includes(props.pr.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, []);
  return (
    <Card
      style={{
        width: "18rem",
        padding: "10px",
        border: "none",
        margin: "5px",
      }}
    >
      <ImgWrapper>
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
              color:"#dba39a",
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
              color:"lightgrey",
            }}
          />
        )}

        <Link to={"/products/" + props.pr.id}>
          <img
            style={{
              height: "auto",

              width: "100%",
              maxHeight: "100%",
            }}
            alt={props.pr.title}
            src={props.pr.image}
          />
        </Link>
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
              {props.pr.title}
            </CardTitle>
            <Rating>{props.pr.rating.rate}</Rating>
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
            {/* <span>rating </span>
            <Rating>{pr.pr.rating.rate}</Rating> */}
          </CardSubtitle>
        </div>

        <CardBottom>
          <Price>{props.pr.price.toFixed(2)} €</Price>
          {user && (
            <div style={{ width: "28%" }}>
              {isAdded ? (
                <Button
                  onClick={() => {
                    addToCart(props.pr);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "40px",
                    border: "none",
                  }}
                >
                  <FaCartPlus style={{ fontSize: "22px" }} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    addToCart(props.pr);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "40px",
                    border: "none",
                    backgroundColor: "#DBA39A",
                    color: "white",
                  }}
                >
                  <FaCartPlus style={{ fontSize: "22px" }} />
                </Button>
              )}
            </div>
          )}
        </CardBottom>
      </CardBody>
    </Card>
  );
}

export default ProductCard;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75%;
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
