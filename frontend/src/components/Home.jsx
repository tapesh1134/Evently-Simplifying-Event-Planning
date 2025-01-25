import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const { isAuthenticated } = useSelector((state) => state.user);

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 opacity-20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full filter blur-3xl"></div>
            </div>

            <div className="z-10 text-center">
                <h1 className="text-5xl font-extrabold mb-6 font-logo leading-tight">
                    <span className="text-white">Welcome to </span>
                    <span className="text-blue-500">Event</span>
                    <span className="text-pink-500">Ly</span>
                </h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium tracking-wide max-w-2xl mx-auto">
                    "Effortlessly manage and explore events with EventLy, where innovation meets simplicity. Your journey to seamless event planning begins here."
                </p>
                <div className="flex justify-center space-x-6">
                    {!isAuthenticated ? (
                        <>
                            <a
                                href="/sign-up"
                                className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700"
                            >
                                Get Started
                            </a>
                            <a
                                href="/login"
                                className="px-8 py-3 bg-gray-700 text-gray-300 text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
                            >
                                Login
                            </a>
                        </>
                    ) : (
                        <>
                            <a
                                href="#"
                                className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-green-700"
                            >
                                Have Questions?
                            </a>
                            <a
                                href="#"
                                className="px-8 py-3 bg-gray-700 text-gray-300 text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
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
