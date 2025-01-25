import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import './App.css';

import { Navbar } from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Home from "./components/Home.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import Events from "./components/Events.jsx";
import EventDetail from "./components/EventDetails.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/me" element={<UserProfile />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/event/:id" element={<EventDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />

        <ToastContainer position="top-right" />
      </Router>
    </>
  );
}

export default App;
