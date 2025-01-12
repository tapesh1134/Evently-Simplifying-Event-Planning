import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import './App.css';

// Importing Components
import { Navbar } from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Home from "./components/Home.jsx"; // Import Home Component

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user data when the app loads
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        {/* Navbar is always visible */}
        <Navbar />
        
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/me" element={<UserProfile />} />
        </Routes>

        {/* Toast notifications */}
        <ToastContainer position="top-right" />
      </Router>
    </>
  );
}

export default App;
