import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import './App.css'
import { Navbar } from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/me" element={<UserProfile/>} />
        </Routes>
        <ToastContainer position="top-right" />
      </Router>
    </>
  )
}

export default App
