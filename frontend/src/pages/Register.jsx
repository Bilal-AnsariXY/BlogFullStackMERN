import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function Register() {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    education: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare FormData object for file + text fields
      const data = new FormData();
      data.append("role", formData.role);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);
      data.append("education", formData.education);
      if (formData.file) {
        data.append("photo", formData.file);
      }

      // Send to backend
      const response = await axios.post(
        "http://localhost:4001/api/users/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      console.log(response.data);
      toast.success(response.data.message ||'user registerd')

      // Reset form
      setFormData({
        role: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        education: "",
        file: null,
      });
    } catch (err) {
      console.log("error in frontend register", err);
      toast.error(response.data.message ||'user not registered')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div
        className="bg-white p-5 rounded-lg shadow-md w-full max-w-sm md:max-w-md"
        style={{ transform: "scale(0.85)", transformOrigin: "center" }}
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold text-center mb-2">
          BA <span className="text-blue-500">Register</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 text-sm"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 text-sm"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 text-sm"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 text-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 text-sm"
          />

          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3 text-sm"
          >
            <option value="">Select Your Education</option>
            <option value="highschool">High School</option>
            <option value="bachelors">Bachelors</option>
            <option value="masters">Masters</option>
          </select>

          {/* File Upload Button */}
          <div className="mb-3">
            <label className="flex items-center gap-3 border rounded p-2 cursor-pointer bg-gray-50 hover:bg-gray-100 text-sm">
              <span className="bg-blue-500 text-white px-3 py-1 rounded">
                Choose File
              </span>
              <span className="text-gray-500">
                {formData.file ? formData.file.name : "No file chosen"}
              </span>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-sm mb-3">
            Already registered?{" "}
            <Link to="/login" className="text-blue-500">
              Login Now
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
