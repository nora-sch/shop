import { useState } from "react";
import "./App.css";
import NavigationBar from "../components/NavigationBar";
import Profile from "../pages/Profile";
import SignUp from "../features/signUp/SignUp";
import SignIn from "../features/signIn/SignIn"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
        <ToastContainer />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
