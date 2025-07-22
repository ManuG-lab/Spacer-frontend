awadh/components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Spaces from "./pages/Spaces";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
main

function App() {
  return (
    <Router>
 awadh/components
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
=======
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
 main
      </Routes>
    </Router>
  );
}

export default App;
