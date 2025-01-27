import { deleteEvent } from "../store/slices/superAdminSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EventDelete = () => {
    const { allEvents = [], loading } = useSelector((state) => state.event);
    const dispatch = useDispatch();

    const [showAllEvents, setShowAllEvents] = useState(false);

    const handleEventDelete = async (id) => {
        try {
            await dispatch(deleteEvent(id)).unwrap();
            alert("Event deleted successfully!");
        } catch (error) {
            alert("Failed to delete event. Please try again.");
        }
    };

    const handleSeeMore = () => {
        setShowAllEvents(!showAllEvents);
    };

    const eventsToShow = showAllEvents ? allEvents : allEvents.slice(0, 2);

    return (
        <div className="flex flex-col gap-6">
            {loading ? (
                <div className="text-center text-gray-500">
                    <p>Loading events...</p>
                </div>
            ) : allEvents.length > 0 ? (
                eventsToShow.map((element) => (
                    <div
                        key={element._id}
                        className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4"
                    >
                        <img
                            src={element.image?.url || "/default-image.jpg"}
                            alt={element.title || "Event"}
                            className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-full border"
                        />

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                                {element.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Event ID: {element._id}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Link
                                to={`/events/event/${element._id}`}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 px-8 text-center rounded-full shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                View
                            </Link>
                            <button
                                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-8 text-center rounded-full shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                onClick={() => handleEventDelete(element._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-lg text-gray-700">No Events Found</h2>
                    <p className="text-sm text-gray-500 mt-2">Please add some events to display here.</p>
                </div>
            )}

            {allEvents.length > 2 && (
                <button
                    onClick={handleSeeMore}
                    className="mt-4 self-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all shadow-md"
                >
                    {showAllEvents ? "See Less" : "See More"}
                </button>
            )}
        </div>
    );
};

export default EventDelete;
