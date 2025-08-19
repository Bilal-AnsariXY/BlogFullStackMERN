import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contest/Authprovider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios";
export default function CreateBlog({myPro,setComponent}) {
  const {fetchBlogs,myPro} = useAuth();
  // if (!myPro) {
  //   return (
  //     <p className="text-center mt-10 text-red-500 font-semibold">
  //       User is not logged in Login first.
  //     </p>
  //   );
  // }
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    blogPhoto: "",
    about: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  if(myPro.role === 'user'){
    return <p className="text-center mt-10 text-gray-500">You are not the admin</p>;

  }
  if (!myPro) {
    return <p className="text-center mt-10 text-gray-500">Please log in to create a blog.</p>;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "blogPhoto") {
      setFormData({ ...formData, blogPhoto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("blogPhoto", formData.blogPhoto);
      form.append("about", formData.about);

      await axiosInstance.post("/blogs/create", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("✅ Blog created successfully!");
      setFormData({ title: "", category: "", blogPhoto: "", about: "" });
      fetchBlogs();
      setComponent('my blogs')
      // console.log('navigated');
    } catch (err) {
      setMessage("❌ Error creating blog: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-3xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Blog</h2>

        {message && (
          <p
            className={`mb-4 text-sm font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Blog Photo */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Blog Photo</label>
            <input
              type="file"
              name="blogPhoto"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* About */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              minLength={200}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write at least 200 characters..."
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
