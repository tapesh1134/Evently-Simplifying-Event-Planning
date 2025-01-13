import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold">EventLy</h3>
                        <p className="text-sm">Your trusted event management platform.</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm">
                            © {new Date().getFullYear()} EventLy. All Rights Reserved.
                        </p>
                    </div>
                    <div className="flex space-x-4 text-sm mt-4 md:mt-0">
                        <a
                            href="/"
                            className="hover:text-gray-300 transition"
                        >
                            Home
                        </a>
                        <a
                            href="/about"
                            className="hover:text-gray-300 transition"
                        >
                            About Us
                        </a>
                        <a
                            href="/contact"
                            className="hover:text-gray-300 transition"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
