import { Link } from "react-router-dom";
import { register } from "../store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState(""); 
    const [profileImage, setProfileImage] = useState("");
    const [profileImagePreview, setProfileImagePreview] = useState("");

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("address", address);
        formData.append("role", role);
        formData.append("profileImage", profileImage);
        dispatch(register(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
    }, [dispatch, loading, isAuthenticated]);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProfileImagePreview(reader.result);
            setProfileImage(file);
        };
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-6">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl px-8 py-10">
                    <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Register for a New Account</h1>
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="example@example.com"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="1234567890"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="123 Main St"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Role</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="********"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                            <div className="mt-2 flex items-center">
                                <img
                                    src={profileImagePreview || "/imageHolder.jpg"}
                                    alt="profileImagePreview"
                                    className="h-16 w-16 rounded-full border-2 border-gray-300"
                                />
                                <input
                                    type="file"
                                    onChange={imageHandler}
                                    className="ml-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <button
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to="/Login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
