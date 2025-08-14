
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../contest/Authprovider";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../../axios";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { myPro, setMyPro } = useAuth();

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/users/logout", { withCredentials: true });
      setMyPro(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Error while logging out");
    }
  };

  return (
    <nav className="bg-blue-50 shadow relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-lg font-bold">
          BA <span className="text-blue-600">Blog</span>
        </div>

        {/* Hamburger button */}
        <button className="md:hidden text-gray-700 text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-blue-600">HOME</Link></li>
          <li><Link to="/blogs" className="hover:text-blue-600">BLOGS</Link></li>
          <li><Link to="/creater" className="hover:text-blue-600">CREATORS</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">ABOUT</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">CONTACT</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          {!myPro?._id ? (
            <>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Register</Link>
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Login</Link>
            </>
          ) : myPro.role === "admin" ? (
            <>
              <Link to="/dashbord" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Logout</button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-lg font-medium z-40">
          <ul className="flex flex-col gap-6 text-center">
            <li><Link to="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>HOME</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>BLOGS</Link></li>
            <li><Link to="/creater" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>CREATORS</Link></li>
            <li><Link to="/about" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>ABOUT</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>CONTACT</Link></li>
          </ul>
          <div className="flex flex-col gap-3 w-40">
            {!myPro?._id ? (
              <>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center" onClick={() => setIsOpen(false)}>Register</Link>
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center" onClick={() => setIsOpen(false)}>Login</Link>
              </>
            ) : myPro.role === "admin" ? (
              <>
                <Link to="/dashbord" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center">Logout</button>
              </>
            ) : (
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
