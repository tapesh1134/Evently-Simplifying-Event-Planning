import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Disclosure as="nav" className="bg-gradient-to-r from-gray-900 to-black shadow-xl">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 items-center">
                            <Link to="/">
                                <h3 className="text-3xl font-extrabold text-white">
                                    <span className="text-blue-500">Event</span>
                                    <span className="text-pink-500">Ly</span>
                                </h3>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex space-x-6">
                            <Link
                                to="/"
                                className="text-white hover:bg-gray-800 hover:text-yellow-400 rounded-md px-3 py-2 text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/events"
                                className="text-white hover:bg-gray-800 hover:text-yellow-400 rounded-md px-3 py-2 text-sm font-medium"
                            >
                                Events
                            </Link>
                            <Link
                                to="/createevent"
                                className="text-white hover:bg-gray-800 hover:text-yellow-400 rounded-md px-3 py-2 text-sm font-medium"
                            >
                                Create Event
                            </Link>
                            {isAuthenticated && user && user.role === "Super Admin" && (
                                <Link
                                    to="/dashboard"
                                    className="text-white hover:bg-gray-800 hover:text-yellow-400 rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-white hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                {!isAuthenticated ? (
                                    <>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt="profile"
                                                src={"https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"}
                                                className="h-8 w-8 rounded-full"
                                            />
                                        </MenuButton>
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem>
                                                <Link
                                                    to="/sign-up"
                                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                                >
                                                    Register
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link
                                                    to="/login"
                                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                                >
                                                    Login
                                                </Link>
                                            </MenuItem>
                                        </MenuItems>
                                    </>
                                ) : (
                                    <>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt="profile"
                                                src={user.profileImage?.url}
                                                className="h-8 w-8 rounded-full"
                                            />
                                        </MenuButton>
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem>
                                                <Link
                                                    to="/me"
                                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                                >
                                                    Profile
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <div
                                                    onClick={handleLogout}
                                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                                                >
                                                    Logout
                                                </div>
                                            </MenuItem>
                                        </MenuItems>
                                    </>
                                )}
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link
                        to="/"
                        className="text-white hover:bg-gray-800 hover:text-yellow-400 block rounded-md px-3 py-2 text-base font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/events"
                        className="text-white hover:bg-gray-800 hover:text-yellow-400 block rounded-md px-3 py-2 text-base font-medium"
                    >
                        Events
                    </Link>
                    <Link
                        to="/createevent"
                        className="text-white hover:bg-gray-800 hover:text-yellow-400 block rounded-md px-3 py-2 text-base font-medium"
                    >
                        Create Event
                    </Link>
                    {isAuthenticated && user && user.role === "Super Admin" && (
                        <Link
                            to="/dashboard"
                            className="text-white hover:bg-gray-800 hover:text-yellow-400 block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export { Navbar };
