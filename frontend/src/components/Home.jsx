import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const { isAuthenticated } = useSelector((state) => state.user);

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            {/* Background Blur Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-pink-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
            </div>

            <div className="z-10 w-full px-6 sm:px-10 lg:px-20 py-12 sm:py-16">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 leading-tight font-logo">
                        <span className="text-white">Welcome to </span>
                        <span className="text-blue-500">Event</span>
                        <span className="text-pink-500">Ly</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed font-medium tracking-wide">
                        "Effortlessly manage and explore events with EventLy, where innovation meets simplicity. Your journey to seamless event planning begins here."
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        {!isAuthenticated ? (
                            <>
                                <a
                                    href="/sign-up"
                                    className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Get Started
                                </a>
                                <a
                                    href="/login"
                                    className="px-10 py-4 bg-gray-700 text-gray-300 text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Login
                                </a>
                            </>
                        ) : (
                            <>
                                <a
                                    href="#"
                                    className="px-10 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Have Questions?
                                </a>
                                <a
                                    href="#"
                                    className="px-10 py-4 bg-gray-700 text-gray-300 text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    About Us
                                </a>
                            </>
                        )}
                    </div>
                </div>

                {/* Why Choose Section */}
                <section className="py-16 sm:py-20 md:py-24">
                    <h2 className="text-4xl font-bold mb-16 text-center">Why Choose EventLy?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
                        <div className="bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">Real-Time Collaboration</h3>
                            <p className="text-gray-300 text-lg">Coordinate with teams and attendees live with real-time updates and chat.</p>
                        </div>
                        <div className="bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-4 text-pink-400">Smart Planning</h3>
                            <p className="text-gray-300 text-lg">Use intelligent tools to plan, schedule, and manage your events efficiently.</p>
                        </div>
                        <div className="bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-4 text-green-400">User Friendly</h3>
                            <p className="text-gray-300 text-lg">An intuitive interface designed for simplicity and effectiveness.</p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 sm:py-20 md:py-24 bg-black bg-opacity-30 rounded-2xl px-4">
                    <h2 className="text-4xl font-bold mb-16 text-center">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <div className="bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-2 text-blue-400">1. Sign Up</h3>
                            <p className="text-gray-300 text-lg">Create your account and personalize your dashboard.</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-2 text-pink-400">2. Create or Join Events</h3>
                            <p className="text-gray-300 text-lg">Host your own events or explore and join existing ones.</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-2 text-green-400">3. Enjoy & Manage</h3>
                            <p className="text-gray-300 text-lg">Experience hassle-free event tracking and updates.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 sm:py-20 md:py-24 max-w-5xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-16">What Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                            <p className="text-gray-300 mb-6 text-lg italic">“EventLy transformed the way we manage college fests. It’s fast, beautiful, and easy!”</p>
                            <h4 className="text-xl font-semibold text-blue-400">— Priya Sharma</h4>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                            <p className="text-gray-300 mb-6 text-lg italic">“The real-time updates and user experience are top-notch. Highly recommend!”</p>
                            <h4 className="text-xl font-semibold text-pink-400">— Rahul Verma</h4>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
