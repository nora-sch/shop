import { useState } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Profile from "./pages/Profile";
import SignUp from "./features/signUp/SignUp";
import SignIn from "./features/signIn/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import SideBar from "./components/SideBar";
import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavigationBar />
      <Main>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
const Main = styled.div``;
