import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contest/Authprovider";

export default function BlogContent() {
  const { id } = useParams(); // get blog id from url
  const { blogs, myPro } = useAuth();
  const navigate = useNavigate();

  // Ensure blogs is always an array
  const blogList = Array.isArray(blogs) ? blogs : blogs?.allBlogs || [];

  // Find blog by id
  const blog = blogList.find((b) => b._id === id);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-lg mb-4">Blog not found ❌</p>
        <button
          onClick={() => navigate("/blogs")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Blog Image */}
        {blog.blogPhoto && (
          <img
            src={blog.blogPhoto}
            alt={blog.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        )}

        {/* Blog Content */}
        <div className="p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            {blog.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">{blog.category}</p>

          <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {blog.about}
          </p>

          {/* Author Section */}
          <div className="flex items-center border-t pt-4">
            <img
              src={blog.adminPhoto || myPro?.photo || "/default-avatar.png"}
              alt={blog.adminName || myPro?.name || "Author"}
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />
            <div className="ml-3">
              <h3 className="text-gray-800 font-medium">
                {blog.adminName || myPro?.name || "Unknown"}
              </h3>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              ← Back to Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

