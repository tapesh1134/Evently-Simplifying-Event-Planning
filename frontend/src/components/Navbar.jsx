import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotifications,
    markAllAsRead,
    addNotification,
} from "../store/slices/notificationSlice";
import { logout } from "../store/slices/userSlice";
import socket from "../socket";

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { notifications } = useSelector((state) => state.notifications);
    const dispatch = useDispatch();

    const [unreadCount, setUnreadCount] = useState(0);
    const [visibleNotifications, setVisibleNotifications] = useState(6);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    // Listen for real-time notifications
    useEffect(() => {
        socket.on("newNotification", (notification) => {
            dispatch(addNotification(notification));
        });

        return () => {
            socket.off("newNotification");
        };
    }, [dispatch]);

    useEffect(() => {
        if (user && user._id) {
            // Filter unread notifications
            const unreadNotifications = notifications.filter(
                (notif) => Array.isArray(notif.readBy) && !notif.readBy.includes(user._id)
            );

            // Update unread count only if it changes
            setUnreadCount((prevCount) =>
                prevCount !== unreadNotifications.length ? unreadNotifications.length : prevCount
            );
        }
    }, [notifications, user]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleMarkAllAsRead = () => {
        if (user && user._id) {
            dispatch(markAllAsRead(user._id));
        }
    };

    // Show more notifications (increase the number of visible notifications)
    const handleShowMore = () => {
        setVisibleNotifications((prevVisible) => prevVisible + 6); // Load 6 more notifications
    };

    return (

        <Disclosure as="nav" className="bg-gradient-to-r from-gray-900 to-black shadow-xl">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" />
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
                            <Link to="/" className="text-white hover:bg-gray-800 px-3 py-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/events" className="text-white hover:bg-gray-800 px-3 py-2 text-sm font-medium">
                                Events
                            </Link>
                            <Link to="/createevent" className="text-white hover:bg-gray-800 px-3 py-2 text-sm font-medium">
                                Create Event
                            </Link>
                            {isAuthenticated && user?.role === "Super Admin" && (
                                <Link to="/dashboard" className="text-white hover:bg-gray-800 px-3 py-2 text-sm font-medium">
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Menu as="div" className="relative ml-3">
                            <MenuButton className="relative rounded-full bg-gray-800 p-1 text-white hover:text-yellow-400 focus:outline-none">
                                <BellIcon className="h-6 w-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </MenuButton>
                            <MenuItems className="absolute right-0 z-20 mt-2 w-60 bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-4 py-2 text-white font-semibold">Notifications</div>
                                {notifications.length === 0 ? (
                                    <div className="text-gray-400 px-4 py-2 text-sm">No notifications</div>
                                ) : (
                                    notifications.slice(0, visibleNotifications).map((notif, index) => (
                                        <MenuItem key={index}>
                                            {({ active }) => (
                                                <div
                                                    className={`px-4 py-2 text-sm cursor-pointer ${active ? "bg-gray-700 text-white" : "text-gray-300"
                                                        }`}
                                                >
                                                    {notif.message}
                                                </div>
                                            )}
                                        </MenuItem>
                                    ))
                                )}
                                {notifications.length > visibleNotifications && (
                                    <div className="px-4 py-2 text-center">
                                        <button onClick={handleShowMore} className="text-blue-400 text-sm hover:underline">
                                            Show More
                                        </button>
                                    </div>
                                )}
                                <div className="px-4 py-2 text-right">
                                    <button onClick={handleMarkAllAsRead} className="text-blue-400 text-sm hover:underline">
                                        Mark all as read
                                    </button>
                                </div>
                            </MenuItems>
                        </Menu>

                        <Menu as="div" className="relative ml-3">
                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none">
                                <img
                                    src={user?.profileImage?.url || "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"}
                                    alt="profile"
                                    className="h-8 w-8 rounded-full"
                                />
                            </MenuButton>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                                {!isAuthenticated ? (
                                    <>
                                        <MenuItem>
                                            <Link to="/sign-up" className="block px-4 py-2 text-white hover:bg-gray-700">
                                                Register
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to="/login" className="block px-4 py-2 text-white hover:bg-gray-700">
                                                Login
                                            </Link>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <Link to="/me" className="block px-4 py-2 text-white hover:bg-gray-700">
                                                Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <div onClick={handleLogout} className="block px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">
                                                Logout
                                            </div>
                                        </MenuItem>
                                    </>
                                )}
                            </MenuItems>
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
