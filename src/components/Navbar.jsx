import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">Spacer</h1>
      <ul className="hidden md:flex space-x-6">
        <li><Link to="/" className="hover:text-indigo-500">Home</Link></li>
        <li><Link to="/spaces" className="hover:text-indigo-500">Spaces</Link></li>
        {token && <li><Link to="/bookings" className="hover:text-indigo-500">Bookings</Link></li>}
        {token && <li><Link to="/profile" className="hover:text-indigo-500">Profile</Link></li>}
      </ul>
      <div className="space-x-4">
        {token ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
