import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table } from "reactstrap";
import { RxCross2 } from "react-icons/rx";
import { deleteOne, deleteAll } from "./ProductCard/cartSlice";

function getTotal(cart) {
  let totalCount = 0;
  cart.forEach((item) => {
    totalCount = totalCount + item.price;
  });
  return totalCount;
}

function SideBar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [isOpen, setIsOpen] = useState(true);
  let [total, setTotal] = useState(getTotal(cart));

  useEffect(() => {
    const newTotalCount = getTotal(cart);
    setTotal(newTotalCount);
  }, [cart]);

  return (
    cart.length > 0 &&
    isOpenCart && (
      <div
        style={{
          height: "100vh",
          width: "30%",
          zIndex: "1000",
          backgroundColor: "white",
          position: "absolute",
          right: "0",
          padding:'15px'
        }}
      >
        <Table hover style={{fontSize:'15px'}}>
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={item.id}>
                <th scope="row">{i + 1}</th>
                <td>{item.title}</td>
                <td style={{width:'18%'}}>{item.price.toFixed(2)} €</td>
                <td>
                  <RxCross2
                    onClick={() => {
                      dispatch(deleteOne(item.id));
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>Total : <span style={{fontWeight:'bold'}}>{total.toFixed(2)} €</span></div>
        <Button
          onClick={() => {
            dispatch(deleteAll());
          }}
        >
          Delete All
        </Button>
      </div>
    )
  );
}

export default SideBar;
