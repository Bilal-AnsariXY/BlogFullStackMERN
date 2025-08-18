import React from "react";
import { useAuth } from "../contest/Authprovider";
import {Link, useNavigate} from 'react-router-dom'
import { clicked } from "../components/Clicked";

export default function Hero() {
  const navigate = useNavigate();
  const { blogs } = useAuth();
  // console.log("hello blogs", blogs);

  const allBlogs = blogs?.allBlogs || [];
  const displayedBlogs = allBlogs.slice(0, 4);

  return (
    <div className="bg-blue-50 p-4 sm:p-6 pb-6">
      {allBlogs.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-600 text-lg font-semibold">
            There is no current blog
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedBlogs.map((blog) => (
            <div onClick={()=>{clicked(blog._id,navigate)}} key={blog._id}>
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Blog Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={blog.blogPhoto}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Blog Info */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate">{blog.title}</h2>
                  <p className="text-sm text-gray-500 truncate">{blog.category}</p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 p-4 border-t">
                  <img
                    src={
                      blog.adminPhoto && blog.adminPhoto.trim() !== ""
                        ? blog.adminPhoto
                        : "*" // default avatar
                    }
                    alt="Admin"
                    className="w-8 h-8 rounded-full border object-cover"
                  />
                  <p className="text-gray-700 font-medium truncate">
                    {blog.adminName || "Unknown Author"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
