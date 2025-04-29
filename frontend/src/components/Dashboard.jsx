import {
  clearAllSuperAdminSliceErrors,
  getAllUsers,
} from "../store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventDelete from "./EventDelete";
import UsersGraph from "./UsersGraph";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, user.role, navigateTo]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-pink-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="relative w-full max-w-4xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl rounded-3xl p-8 space-y-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-center text-white font-logo">
            Super Admin Dashboard
          </h1>

          <div className="flex flex-col space-y-8">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-white">
              <h3 className="text-2xl font-semibold mb-4">Users Overview</h3>
              <div className="min-h-[300px] flex items-center justify-center">
                <UsersGraph />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-white">
              <h3 className="text-2xl font-semibold mb-4">
                Manage And Delete Events
              </h3>
              <div className="min-h-[300px] flex items-center justify-center">
                <EventDelete />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;