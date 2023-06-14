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
import { FaUserCircle } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../features/login/loginSlice";

function NavigationBar(args) {
//   const user = useSelector((state) => state.login.value);
//   const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand={"xl"}>
        <NavbarBrand href="/">Shop</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/profile">
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
           <NavLink tag={RRNavLink} to="/sign-in">
              Sign In
            </NavLink>
            <NavLink tag={RRNavLink} to="/sign-up">
              Sign Up
            </NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;