import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-indigo-600">Spacer</h1>

      {/* Links */}
      <ul className="hidden md:flex space-x-6">
        <li><a href="/" className="hover:text-indigo-500">Home</a></li>
        <li><a href="/spaces" className="hover:text-indigo-500">Spaces</a></li>
        <li><a href="/bookings" className="hover:text-indigo-500">Bookings</a></li>
      </ul>

      {/* Buttons */}
      <div className="space-x-4">
        <a href="/login" className="text-indigo-600 hover:text-indigo-800">Login</a>
        <a href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar;
