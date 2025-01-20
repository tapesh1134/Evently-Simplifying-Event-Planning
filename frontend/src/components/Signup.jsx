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
    const [password, setPassword] = useState(""); const [profileImage, setProfileImage] = useState("");
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
            <div className="flex min-h-full flex-1 flex-col min-h-screen justify-center px-6 py-4 lg:px-8">
                <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
                    <h1
                        className={`mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900`}
                    >
                        Register for new Account
                    </h1>
                    <form
                        className="flex flex-col gap-5 w-full"
                        onSubmit={handleRegister}
                    >
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex flex-col sm:flex-1">
                                <label className="block text-sm/6 font-medium text-gray-900">Full Name</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-1">
                                <label className="block text-sm/6 font-medium text-gray-900">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row"> 
                            <div className="flex flex-col sm:flex-1">
                                <label className="block text-sm/6 font-medium text-gray-900">Phone</label>
                                <input
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-1">
                                <label className="block text-sm/6 font-medium text-gray-900">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex flex-col sm:flex-1">
                                <label className="block text-sm/6 font-medium text-gray-900">Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value="">Select Role</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div className="flex flex-col sm:flex-1">
                                <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-1 gap-2">
                            <label className="block text-sm/6 font-medium text-gray-900">
                                Profile Image
                            </label>
                            <div className="flex items-center gap-3">
                                <img
                                    src={
                                        profileImagePreview
                                            ? profileImagePreview
                                            : "/imageHolder.jpg"
                                    }
                                    alt="profileImagePreview"
                                    className="w-14 h-14 rounded-full"
                                />
                                <input type="file" onChange={imageHandler} />
                            </div>
                        </div>

                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 w-[420px]  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600rounded-md text-white mx-auto lg:w-[500px]"
                            type="submit"
                            disabled={loading}
                        >
                            {loading && "Registering..."}
                            {!loading && "Register"}
                        </button>
                    </form>
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already a member?{' '}
                        <a className="font-semibold text-indigo-600 hover:text-indigo-500">
                            <Link
                                to={"/Login"}
                            >
                                Login
                            </Link>
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Signup;