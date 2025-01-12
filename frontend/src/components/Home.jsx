import React from "react";

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to EventLy
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Your one-stop solution for managing and exploring amazing events!
                </p>
                <div className="flex justify-center space-x-4">
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
                </div>
            </div>
        </div>
    );
};

export default Home;
