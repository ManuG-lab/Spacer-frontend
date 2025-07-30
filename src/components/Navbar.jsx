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
          <li><Link to="/owner/spaces" className="hover:text-[#3B82F6]">My Spaces</Link></li>
          <li><Link to="/owner/add-space" className="hover:text-[#3B82F6]">Add Space</Link></li>
          <li><Link to="/owner/bookings" className="hover:text-[#3B82F6]">My Bookings</Link></li>
          <li><Link to="/owner/payments" className="hover:text-[#3B82F6]">Payments</Link></li>
        </>
      );
    }
    if (role === "admin") {
      return (
        <li><Link to="/admin" className="hover:text-[#3B82F6]">Admin Dashboard</Link></li>
      );
    }
    return null;
  };

  return (
    <nav className="bg-[#1F2937] text-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-[#4F46E5] tracking-wide">Spacer</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center text-gray-200 font-medium">
          <li><Link to="/" className="hover:text-[#3B82F6]">Home</Link></li>
          <li><Link to="/spaces" className="hover:text-[#3B82F6]">Spaces</Link></li>
          <li><Link to="/about" className="hover:text-[#3B82F6]">About</Link></li>
          {token && <li><Link to="/bookings" className="hover:text-[#3B82F6]">Bookings</Link></li>}
          {renderRoleLinks()}
          {token && (
            <li className="relative" ref={profileRef}>
              <button
                className="hover:text-[#3B82F6]"
                onClick={() => setProfileOpen((open) => !open)}
              >
                Profile ▾
              </button>
              {profileOpen && (
                <div className="absolute z-10 bg-[#F8FAFC] text-[#1F2937] shadow-lg rounded-md py-2 mt-1 min-w-[140px] text-sm">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-[#E5E7EB]">My Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-red-100 text-[#EF4444] w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Auth Buttons */}
        {!token && (
          <div className="hidden md:flex space-x-4">
            <Link to="/login" className="bg-[#4F46E5] text-white px-4 py-2 rounded-md hover:bg-[#3B82F6] transition">Login</Link>
            <Link to="/register" className="bg-[#4F46E5] text-white px-4 py-2 rounded-md hover:bg-[#3B82F6] transition">Sign Up</Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#4F46E5] focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="md:hidden mt-4 space-y-3 px-6 text-gray-300 font-medium">
          <li><Link to="/" className="block hover:text-[#3B82F6]">Home</Link></li>
          <li><Link to="/spaces" className="block hover:text-[#3B82F6]">Spaces</Link></li>
          <li><Link to="/about" className="block hover:text-[#3B82F6]">About</Link></li>
          {token && <li><Link to="/bookings" className="block hover:text-[#3B82F6]">Bookings</Link></li>}
          {renderRoleLinks()}
          {token && (
            <li>
              <button
                onClick={() => setProfileOpen((open) => !open)}
                className="block w-full text-left hover:text-[#3B82F6]"
              >
                My Profile ▾
              </button>
              {profileOpen && (
                <div className="bg-[#F8FAFC] text-[#1F2937] shadow-lg rounded-md py-2 mt-1 text-sm">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-[#E5E7EB]">My Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-red-100 text-[#EF4444] w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
          {!token && (
            <>
              <li><Link to="/login" className="block hover:text-[#3B82F6]">Login</Link></li>
              <li><Link to="/register" className="block hover:text-[#3B82F6]">Sign Up</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
