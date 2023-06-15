import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { FaUserCircle,  FaShoppingCart, FaCartPlus } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";


function NavigationBar(args) {
  //   const user = useSelector((state) => state.login.value);
    const dispatch = useDispatch();

  const cart = useSelector((state)=>state.cart.cart);
  const openCart = ()=>{
    if(cart.length>0){
//open sidebar (save true on redux???)
    }
  }
  const [isOpen, setIsOpen] = useState(false);

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
          <FaShoppingCart onClick={()=>{openCart()}}/> ({cart.length})
          <NavLink tag={RRNavLink} to="/sign-in">
            Sign In
          </NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
