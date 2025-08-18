import React from "react";
import { useAuth } from "../contest/Authprovider";
import { useNavigate } from "react-router-dom";
import { clicked } from "../components/Clicked";
export default function Blogs() {
  const { blogs, myPro } = useAuth();
  const navigate = useNavigate();
  // Ensure blogs is always an array
  const blogList = Array.isArray(blogs) ? blogs : blogs?.allBlogs || [];
 
  if (blogList.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No blogs found at the moment.
      </p>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen" >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Blogs</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" >
        {blogList.map((blog) => (
          <div
            
            onClick={()=>{clicked(blog._id,navigate)}}
            key={blog._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow flex flex-col hover:cursor-pointer"
          >
            {/* Blog Image */}
            {blog.blogPhoto && (
              <img
                src={blog.blogPhoto}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}

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
                  src={blog.adminPhoto || myPro?.photo || "/default-avatar.png"}
                  alt={blog.adminName || myPro?.name || "Author"}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {blog.adminName || myPro?.name || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
