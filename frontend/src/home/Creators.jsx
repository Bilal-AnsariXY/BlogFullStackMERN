import React from "react";
import { useAuth } from "../contest/Authprovider";
import { Link } from "react-router-dom";

export default function PopularCreators() {
  const { users } = useAuth();
  const allUsers = users || [];

  // Filter only admins
  const admins = allUsers.filter((user) => user.role === "admin");

  return (
    <div className="bg-blue-50 px-4 sm:px-6 pt-6 pb-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Popular Creators</h2>

      {admins.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-600 text-lg font-semibold">
            No creators found
          </p>
        </div>
      ) : (
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {admins.map((admin) => (
            <Link
              to={`/user/${admin._id}`}
              key={admin._id}
              className="flex-shrink-0 text-center"
            >
              {/* Circle Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
                <img
                  src={
                    admin.photo && admin.photo.trim() !== ""
                      ? admin.photo
                      : "../public/vite.svg"
                  }
                  alt={admin.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name */}
              <p className="mt-2 text-base font-medium truncate">{admin.name}</p>
              <p className="text-xs text-gray-500">Author</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
