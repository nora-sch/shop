import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./cartSlice";
import { FaCartPlus } from "react-icons/fa";

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import styled from "styled-components";

function ProductCard(pr) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isAdded = cart.find((item) => item.id === pr.pr.id);
  const addToCart = (addedProduct) => {
    !isAdded && dispatch(add(addedProduct));
  };
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
        <img
          style={{
            height: "auto",

            width: "100%",
            maxHeight: "100%",
          }}
          alt={pr.pr.title}
          src={pr.pr.image}
        />
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
              {pr.pr.title}
            </CardTitle>
            <Rating>{pr.pr.rating.rate}</Rating>
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
          <Price>{pr.pr.price.toFixed(2)} €</Price>
          {isAdded ? (
            <Button 
              onClick={() => {
                addToCart(pr.pr);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30%",
                height: "40px",
                border:'none',
              }}
            >
              <FaCartPlus style={{fontSize:'22px'}}/>
            </Button>
          ) : (
            <Button 
              onClick={() => {
                addToCart(pr.pr);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30%",
                height: "40px",
                border:'none',
                backgroundColor: "#DBA39A",
                color: "white",
              }}
            >
                <FaCartPlus style={{fontSize:'22px'}}/>
            </Button>
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
