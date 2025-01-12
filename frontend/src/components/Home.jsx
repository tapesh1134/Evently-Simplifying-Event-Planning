import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold mb-4 font-logo">
                    <span className="text-gray-800">Welcome to </span>
                    <span className="text-blue-500">Event</span>
                    <span className="text-pink-500">Ly</span>
                </h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium tracking-wide">
                    "Effortlessly manage and explore events with EventLy, where innovation meets simplicity."
                </p>
                <div className="flex justify-center space-x-4">
                    {!isAuthenticated ? (
                        <>
                            <a
                                href="/sign-up"
                                className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md shadow hover:bg-blue-700"
                            >
                                Get Started
                            </a>
                            <a
                                href="/login"
                                className="px-6 py-3 bg-gray-200 text-gray-800 text-lg font-medium rounded-md shadow hover:bg-gray-300"
                            >
                                Login
                            </a>
                        </>
                    ) : (
                        <>
                            <a
                                href="#"
                                className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md shadow hover:bg-blue-700"
                            >
                                Have Questions?
                            </a>
                            <a
                                href="#"
                                className="px-6 py-3 bg-gray-200 text-gray-800 text-lg font-medium rounded-md shadow hover:bg-gray-300"
                            >
                                About Us
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
