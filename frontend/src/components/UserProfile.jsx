import Spinner from "./Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-pink-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="relative w-full sm:max-w-lg p-8 shadow-lg rounded-xl">
        {loading ? (
          <Spinner />
        ) : (
          <div className="text-center">
            <img
              src={user.profileImage?.url || "/imageHolder.jpg"}
              alt="Profile"
              className="w-36 h-36 rounded-full mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold mb-6">Personal Details</h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      defaultValue={user.userName}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="text"
                      defaultValue={user.email}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="number"
                      defaultValue={user.phone}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      defaultValue={user.address}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      defaultValue={user.role}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Joined On</label>
                    <input
                      type="text"
                      defaultValue={user.createdAt?.substring(0, 10)}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
