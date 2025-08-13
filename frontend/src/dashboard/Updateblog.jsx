import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../contest/Authprovider";

export default function UpdateBlog({ updateId ,setComponent}) {
  const { blogs,fetchBlogs } = useAuth();

  // Ensure blogs is always an array
  const blogList = Array.isArray(blogs) ? blogs : blogs?.allBlogs || [];

  // Find the blog to update
  const blogToUpdate = blogList.find((b) => String(b._id) === String(updateId));

  // Initialize state with blog values if found
  const [formData, setFormData] = useState({
    title: blogToUpdate?.title || "",
    category: blogToUpdate?.category || "",
    about: blogToUpdate?.about || "",
  });

  const [blogPhoto, setBlogPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "blogPhoto") {
      setBlogPhoto(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("about", formData.about);
      if (blogPhoto) form.append("blogPhoto", blogPhoto);

      const res = await axios.put(
        `https://blogappfullstackmern.onrender.com/blogs/update/${updateId}`,
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(res.data?.message || "Blog updated successfully!");
      setComponent('my blogs');
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating blog");
    } finally {
      setLoading(false);
    }
  };

  if (!blogToUpdate) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Blog not found or still loading...
      </p>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div>
        <label className="block font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Blog Photo</label>
        <input
          type="file"
          name="blogPhoto"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {blogPhoto && (
          <img
            src={URL.createObjectURL(blogPhoto)}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Blog"}
      </button>
    </div>
  );
}
