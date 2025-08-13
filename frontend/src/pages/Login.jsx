import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contest/Authprovider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setMyPro } = useAuth();
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4001/api/users/login",
        { ...formData, role: formData.role || "user" },
        { withCredentials: true } // ✅ Store cookie
      );

      // Set myPro immediately so UI updates
      setMyPro(response.data.user);

      console.log("Login response:", response.data);
      toast.success(response.data.message || "User logged in");
      navigate('/');
      setFormData({
        role: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("Error in frontend login", err);
      toast.error(err.response?.data?.message || "User not registered");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          <span className="text-gray-800">BA</span>
          <span className="text-blue-500"> Blogs</span>
        </h1>

        <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
          Login
        </h2>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <p className="text-sm text-gray-600 mb-3 text-center">
          New User?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register Now
          </a>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
