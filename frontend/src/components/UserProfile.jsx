import Spinner from "./Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <section className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
              <img
                src={user.profileImage?.url}
                alt="/imageHolder.jpg"
                className="w-36 h-36 rounded-full"
              />

                <div className="mb-6 w-full max-w-4xl bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Username</label>
                      <input
                        type="text"
                        defaultValue={user.userName}
                        className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="text"
                        defaultValue={user.email}
                        className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="number"
                        defaultValue={user.phone}
                        className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        defaultValue={user.address}
                        className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <input
                        type="text"
                        defaultValue={user.role}
                        className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                        disabled
                      />
                    </div>
                    <div>
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

          </>
        )}
      </section>
    </>
  );
};

export default UserProfile;
