import React from "react";
import { useAuth } from "../contest/Authprovider";
import { Link } from "react-router-dom";

export default function Trending() {
  const { blogs } = useAuth();
  const allBlogs = blogs?.allBlogs || [];
  const displayedBlogs = allBlogs.slice(0, 10); // Show top 10 blogs

  return (
    <div className="bg-blue-50 px-4 sm:px-6 pt-6 pb-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Trending</h2>

      {allBlogs.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-600 text-lg font-semibold">
            There is no current blog
          </p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {displayedBlogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="flex-shrink-0 w-64"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-300">
                {/* Blog Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={blog.blogPhoto}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Label */}
                  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {blog.category || "General"}
                  </span>
                </div>

                {/* Blog Info */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate">
                    {blog.title}
                  </h2>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 p-4 border-t">
                  <img
                    src={
                      blog.adminPhoto && blog.adminPhoto.trim() !== ""
                        ? blog.adminPhoto
                        : "/default-avatar.jpg" // Local fallback image in public folder
                    }
                    alt="Admin"
                    className="w-8 h-8 rounded-full border object-cover"
                  />
                  <p className="text-gray-700 font-medium truncate">
                    {blog.adminName || "Unknown Author"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
