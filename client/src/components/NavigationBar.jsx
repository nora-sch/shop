import React, { useEffect, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Table,
  Button,
} from "reactstrap";
import { FaUserCircle, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { deleteOne, deleteAll } from "./ProductCard/cartSlice";

import SearchBar from "./SearchBar";

function getTotal(cart) {
  let totalCount = 0;
  cart.forEach((item) => {
    totalCount = totalCount + item.price;
  });
  return totalCount;
}

function NavigationBar(args) {
  //   const user = useSelector((state) => state.login.value);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const prod = useSelector((state) => state.products.products);
  const [isOpenCart, setIsOpenCart] = useState(false);
  let [total, setTotal] = useState(getTotal(cart));
console.log(prod);
  const openCart = () => {
    if (cart.length > 0) {
      setIsOpenCart(!isOpenCart);
    }
  };
  useEffect(() => {
    const newTotalCount = getTotal(cart);
    setTotal(newTotalCount);
  }, [cart]);

  // navbar
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand={"xl"}>
        <NavbarBrand href="/" style={{ color: "#713f4b" }}>
          Shop
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/" style={{ color: "#713f4b" }}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/profile"
                style={{ color: "#713f4b" }}
              >
                Profile
              </NavLink>
            </NavItem>
          </Nav>
          <SearchBar/>
          {/* {user ? (
            <FaUserCircle style={{ marginRight: "10px", color: "green" }} />
          ) : (
            <FaUserCircle style={{ marginRight: "10px" }} />
          )}
          {user ? (
            <div>
            {user.firstname}
            <button onClick={() => dispatch(logout())} style={{marginLeft:'10px'}}>Sign Out</button>
            </div>
          ) : (
            <NavLink tag={RRNavLink} to="/login">
              Sign In
            </NavLink>
          )} */}
          <FaShoppingCart
            onClick={() => {
              openCart();
            }}
          />
          <span
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "24px",
              marginLeft: "5px",
              backgroundColor: "#dba39a",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            {cart.length}
          </span>
          <NavLink tag={RRNavLink} to="/sign-in">
            Sign In
          </NavLink>
        </Collapse>
      </Navbar>
      {cart.length > 0 && isOpenCart && (
        <div className='side-bar'
          style={{
            height: "100vh",
            width: "30%",
            zIndex: "1000",
            backgroundColor: "#F5EBE0",
            position: "absolute",
            right: "0",
            padding: "15px",
            marginTop: "5px"
          }}
        >
          <Table hover style={{ fontSize: "15px" , backgroundColor:'#F5EBE0'}}>
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
                  <td style={{ width: "18%" }}>{item.price.toFixed(2)} €</td>
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
            <div>
            Total :{" "}
            <span style={{ fontWeight: "bold" }}>{total.toFixed(2)} €</span>
          </div>
          </Table>
      
          <Button
            onClick={() => {
              dispatch(deleteAll());
            }}
            style={{backgroundColor:"#dba39a", color:'#713f4b', border:'none', fontWeight:'bold'}}
          >
            Delete All
          </Button>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
