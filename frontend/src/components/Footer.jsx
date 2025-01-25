import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold text-white">
                            Event<span className="text-blue-500">Ly</span>
                        </h3>
                        <p className="text-sm text-gray-400 mt-2">
                            Your trusted event management platform.
                        </p>
                    </div>

                    <div className="flex space-x-6 text-sm">
                        <a
                            href="/"
                            className="hover:text-blue-500 transition"
                        >
                            Home
                        </a>
                        <a
                            href="/about"
                            className="hover:text-blue-500 transition"
                        >
                            About Us
                        </a>
                        <a
                            href="/contact"
                            className="hover:text-blue-500 transition"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Copyright Section */}
                    <div className="text-center md:text-right mt-6 md:mt-0">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()}{" "}
                            <span className="text-white font-semibold">
                                EventLy
                            </span>
                            . All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
                Built with ❤️ by the EventLy Team
            </div>
        </footer>
    );
};

export default Footer;
