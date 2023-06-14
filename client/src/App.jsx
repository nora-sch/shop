import { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from "../components/NavigationBar";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import SignIn from "../features/SignIn";
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
