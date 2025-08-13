import React from "react";
import { useAuth } from "../contest/Authprovider";

export default function Myprofile({myPro}) {
  // const { myPro } = useAuth();

  if (!myPro) {
    return <p className="text-center mt-10 text-gray-500">No profile data available.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-3xl border border-gray-200">
        
        {/* Responsive Layout */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Profile Image */}
          <img
            src={myPro.photo}
            alt={myPro.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />

          {/* Info Section */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{myPro.name}</h2>
            <p className="text-blue-500 font-medium capitalize">{myPro.role}</p>

            {/* Divider */}
            <div className="my-4 border-b border-gray-300"></div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-gray-700 break-all">
                <span className="font-semibold">Email:</span> {myPro.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> {myPro.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Education:</span> {myPro.education}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Joined On:</span>{" "}
                {new Date(myPro.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
