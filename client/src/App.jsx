import { useState } from "react";
import "./App.css";
import NavigationBar from "../components/NavigationBar";
import Profile from "../pages/Profile";
import SignUp from "../features/signUp/SignUp";
import SignIn from "../features/signIn/SignIn"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";


function App() {
  return (
    <BrowserRouter>
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
