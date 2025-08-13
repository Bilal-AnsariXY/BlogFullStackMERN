import React from "react";
import { useAuth } from "../contest/Authprovider.jsx";
import { Link } from "react-router-dom";

export default function Creator() {
  const { users } = useAuth();
  const allUsers = users || [];

  // Filter only admins
  const admins = allUsers.filter((user) => user.role === "admin");

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-center text-gray-800">
          🌟 Popular Creators
        </h2>

        {admins.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-gray-600 text-lg font-semibold">
              No creators found
            </p>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {admins.map((admin) => (
              <Link
                to={`/user/${admin._id}`}
                key={admin._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out"
              >
                {/* Cover Image */}
                <div className="relative">
                  <img
                    src={
                      admin.photo && admin.photo.trim() !== ""
                        ? admin.photo
                        : "/vite.svg"
                    }
                    alt={admin.name}
                    className="w-full h-40 object-cover"
                  />
                  {/* Profile Image Overlay */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <img
                      src={
                        admin.photo && admin.photo.trim() !== ""
                          ? admin.photo
                          : "/vite.svg"
                      }
                      alt={admin.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover transition duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="pt-14 pb-6 text-center px-4">
                  <h3 className="font-bold text-lg text-gray-800 truncate">
                    {admin.name}
                  </h3>
                  <p className="text-gray-500 text-sm truncate">{admin.email}</p>
                  <p className="text-gray-500 text-sm">{admin.phone || "N/A"}</p>
                  <p className="text-sm font-medium mt-2 text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Author
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
