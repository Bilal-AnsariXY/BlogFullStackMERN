import React from "react";
import axios from "axios";
import { useAuth } from "../contest/Authprovider";
import toast from "react-hot-toast";

export default function Myblogs({ myPro ,setComponent,setUpdateId}) {
  const { blogs, fetchBlogs } = useAuth(); // ✅ using blogs from context

  if (!myPro) {
    return <p className="text-center mt-10 text-gray-500">You are not an admin</p>;
  }

  if (myPro.role === "user") {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }

  // Ensure blogs is always an array
  const blogList = Array.isArray(blogs) ? blogs : blogs?.allBlogs || [];

  // Filter for only current user's blogs
  const myBlogs = blogList.filter(
    (blog) => String(blog.madeBy) === String(myPro._id)
  );

  if (myBlogs.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        You haven’t created any blogs yet.
      </p>
    );
  }

  // Delete Blog Handler
  const handleDelete = async (blogId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4001/api/blogs/delete/${blogId}`,
        { withCredentials: true } // ✅ send cookies for auth
      );
      toast.success(res.data?.message || "Blog deleted successfully");
      fetchBlogs(); // refresh after deletion
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error(err.response?.data?.message || "Something went wrong while deleting.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Blogs</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {myBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow flex flex-col"
          >
            {/* Blog Image */}
            <img
              src={blog.blogPhoto}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            {/* Blog Details */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{blog.category}</p>
              <p className="text-gray-700 text-sm line-clamp-3">{blog.about}</p>

              {/* Author Info */}
              <div className="flex items-center mt-4">
                <img
                  src={blog.adminPhoto || myPro.photo}
                  alt={blog.adminName || myPro.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {blog.adminName || myPro.name}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-2 pt-4">
                <button
                onClick={()=>{setComponent('update blog')
                  setUpdateId(blog._id)
                }}
                 className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition">
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
