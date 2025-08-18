import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contest/Authprovider.jsx";

export default function User() {
  const { id } = useParams();
  const { users } = useAuth();
  const navigate = useNavigate();

  const allUsers = users || [];
  const user = allUsers.find((u) => u._id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-lg mb-4">User not found ❌</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4 sm:px-8 lg:px-20 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Cover */}
        <div className="relative h-28 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              src={user.photo && user.photo.trim() !== "" ? user.photo : "/vite.svg"}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 pb-8 px-6 sm:px-10 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {user.name}
          </h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="text-gray-500 text-sm">{user.phone || "N/A"}</p>
          <p className="mt-1 text-sm font-medium text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {user.role === "admin" ? "Author / Creator" : "User"}
          </p>

          {/* Extra Details */}
          <div className="mt-4 text-left sm:text-center space-y-2">
            {user.bio && (
              <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
            )}
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                🌐 {user.website}
              </a>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-1.5 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition text-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
