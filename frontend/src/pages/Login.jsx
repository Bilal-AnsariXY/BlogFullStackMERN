
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contest/Authprovider.jsx";
import { Link, Navigate } from "react-router-dom";
import { axiosInstance } from "../../axios.js";
export default function Login() {
  const { myPro, setMyPro, myProfile } = useAuth();
  const [formData, setFormData] = useState({ role: "", email: "", password: "" });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/users/login",
        { ...formData, role: formData.role || "user" },
        { withCredentials: true }
      );

      setMyPro(res.data.user);
      toast.success(res.data.message || "Logged in successfully");

      try {
        await myProfile();
      } catch (err) {
        console.log("Profile fetch after login failed, ignoring", err);
      }

      setRedirect(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  if (myPro || redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded-md"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded-md"
        />
         <p className="text-sm mb-3">
                    if not a register?{" "}
                    <Link to="/register" className="text-blue-500">
                      Register
                    </Link>
                  </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-3"
        >
          Login
        </button>

       
      </form>
    </div>
  );
}

