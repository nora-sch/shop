import React, { useEffect, useState } from "react";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
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
import { deleteOne, deleteAll, add } from "./ProductCard/cartSlice";
import { remove } from "../features/signIn/signInSlice";

import SearchBar from "./SearchBar";
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
function getTotal(cart) {
  let totalCount = 0;
  cart.forEach((item) => {
    totalCount = totalCount + item.price;
  });
  return totalCount;
}
const postCart = async (cart) => {
  const sendItem = await fetch("/api/users/:id/cart", {
    method: "POST",
    body: JSON.stringify({
      cart,
    }),
    headers: {
      "Content-Type": "application/json",
      // "token":
    },
  });
  if (sendItem.status === 200) {
    const body = await sendItem.json();
    if (body.status === 200) {
      notify(body.message, "success");
    } else if (body.status === 400) {
      notify(body.message, "error");
    } else {
      notify(body.error, "error");
    }
  } else {
    notify(`Server error ${sendItem.status}`, "error");
  }
};

function NavigationBar(args) {
  //   const user = useSelector((state) => state.login.value);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const prod = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isOpenCart, setIsOpenCart] = useState(false);
  let [total, setTotal] = useState(getTotal(cart));
  // console.log(prod);

  const openCart = () => {
    if (cart.length > 0) {
      setIsOpenCart(!isOpenCart);
    }
  };
  const logOut = () => {
    navigate("/");
    dispatch(remove());
  };
  const saveCartToDB = (cart) => {
    postCart(cart);
  };

  const url = "https://fakestoreapi.com/products/";
  const arrayOfProducts = [];
  const getProduct = async (id) => {
    const fetchProduct = await fetch(url + id);
    const productFetched = await fetchProduct.json();
    dispatch(add(productFetched));
  };

  const getCartFromDB = () => {
    const getCart = async () => {
      const getItem = await fetch("/api/users/:id/cart", {
        method: "GET",
      });
      if (getItem.status === 200) {
        const body = await getItem.json();
        if (body.status === 200) {
          dispatch(deleteAll());
          body.cart.map((prodId) => getProduct(prodId));
          // console.log(cart);
          notify(body.message, "success");
        } else if (body.status === 400) {
          notify(body.message, "error");
        } else {
          notify(body.error, "error");
        }
      } else {
        notify(`Server error ${getItem.status}`, "error");
      }
    };
    getCart();
  };
  useEffect(() => {
    // console.log(cart);
    const newTotalCount = getTotal(cart);
    setTotal(newTotalCount);
  }, [cart]);

  // navbar
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar expand={"xl"}>
        <NavbarBrand style={{ color: "#713f4b" }}>Shop</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/" style={{ color: "#713f4b" }}>
                Home
              </NavLink>
            </NavItem>
            {user && (
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to="/profile"
                  style={{ color: "#713f4b" }}
                >
                  Profile
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <SearchBar />
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
          {user ? (
            <div onClick={() => logOut()}>Logout</div>
          ) : (
            <NavLink tag={RRNavLink} to="/sign-in">
              Sign In
            </NavLink>
          )}
        </Collapse>
      </Navbar>
      {cart.length > 0 && isOpenCart && (
        <div
          className="side-bar"
          style={{
            minHeight: "100vh",
            width: "30%",
            zIndex: "1000",
            backgroundColor: "#F5EBE0",
            position: "absolute",
            right: "0",
            padding: "5px 15px 15px 15px",
          }}
        >
          <Table hover style={{ fontSize: "15px", backgroundColor: "#F5EBE0" }}>
            <thead>
              <tr>
                <th></th>
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
                  <td><img style={{objectFit:'cover', width:'30px'}} src={item.image}/></td>
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
          </Table>
          <div>
            Total :
            <span style={{ fontWeight: "bold" }}>{total.toFixed(2)} €</span>
          </div>
          <Button
            onClick={() => {
              dispatch(deleteAll());
            }}
            style={{
              backgroundColor: "#dba39a",
              color: "#713f4b",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Delete All
          </Button>
          <Button
            onClick={() => {
              saveCartToDB(cart);
            }}
            style={{
              backgroundColor: "#dba39a",
              color: "#713f4b",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Save cart
          </Button>
          <Button
            onClick={() => {
              getCartFromDB();
            }}
            style={{
              backgroundColor: "#dba39a",
              color: "#713f4b",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Get cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
