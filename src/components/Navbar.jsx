import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const profileRef = useRef();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
  };

  const renderRoleLinks = () => {
    if (role === "owner") {
      return (
        <>
          <li><Link to="/owner/spaces" className="hover:text-indigo-600 transition">My Spaces</Link></li>
          <li><Link to="/owner/add-space" className="hover:text-indigo-600 transition">Add Space</Link></li>
          <li><Link to="/owner/bookings" className="hover:text-indigo-600 transition">My Bookings</Link></li>
          <li><Link to="/owner/payments" className="hover:text-indigo-600 transition">Payments</Link></li>
        </>
      );
    }
    if (role === "admin") {
      return (
        <>
          <li><Link to="/admin" className="hover:text-indigo-600 transition">Admin Dashboard</Link></li>
          
        </>
      );
    }
    return null;
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-indigo-600 tracking-wide">Spacer</h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 items-center text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-indigo-600 transition">Home</Link></li>
          <li><Link to="/spaces" className="hover:text-indigo-600 transition">Spaces</Link></li>
          <li><Link to="/about" className="hover:text-indigo-600 transition">About</Link></li>
          {token && <li><Link to="/bookings" className="hover:text-indigo-600 transition">Bookings</Link></li>}
          {renderRoleLinks()}
          {token && (
            <li className="relative" ref={profileRef}>
              <button
                className="hover:text-indigo-600 transition"
                onClick={() => setProfileOpen((open) => !open)}
              >
                Profile ▾
              </button>
              {profileOpen && (
                <div className="absolute z-10 flex flex-col bg-white shadow-lg rounded-md py-2 mt-1 min-w-[140px] text-sm">
                  <Link to="/profile" className="px-4 py-2 hover:bg-indigo-50">My Profile</Link>
                  <button onClick={handleLogout} className="px-4 py-2 hover:bg-red-50 text-red-600 text-left">Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Auth Buttons */}
        {!token && (
          <div className="hidden md:flex space-x-4">
            <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Sign Up</Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-indigo-600 focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="md:hidden mt-4 space-y-3 px-6 text-gray-700 font-medium">
          <li><Link to="/" className="block hover:text-indigo-600">Home</Link></li>
          <li><Link to="/spaces" className="block hover:text-indigo-600">Spaces</Link></li>
          <li><Link to="/about" className="block hover:text-indigo-600">About</Link></li>
          {token && <li><Link to="/bookings" className="block hover:text-indigo-600">Bookings</Link></li>}
          {renderRoleLinks()}
          {token && (
            <>
              <li>
                <button
                  className="block hover:text-indigo-600 w-full text-left"
                  onClick={() => setProfileOpen((open) => !open)}
                >
                  My Profile ▾
                </button>
                {profileOpen && (
                  <div className="bg-white shadow-lg rounded-md py-2 mt-1 min-w-[140px] text-sm">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-indigo-50">My Profile</Link>
                    <button onClick={handleLogout} className="block px-4 py-2 hover:bg-red-50 text-red-600 text-left w-full">Logout</button>
                  </div>
                )}
              </li>
            </>
          )}
          {!token && (
            <>
              <li><Link to="/login" className="block hover:text-indigo-600">Login</Link></li>
              <li><Link to="/register" className="block hover:text-indigo-600">Sign Up</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
