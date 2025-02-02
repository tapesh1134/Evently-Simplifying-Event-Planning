// EventDetail.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventDetail } from "../store/slices/eventSlice";
import Spinner from "./Spinner";
import CommentSection from "./CommentSection"; // Import the CommentSection component

const EventDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Extract event data and user data from Redux store
  const { eventDetail, loading: eventLoading, error } = useSelector((state) => state.event);
  const { user, loading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getEventDetail(id));
  }, [dispatch, id]);

  // Show loading indicator while fetching event data
  if (eventLoading || userLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  }

  // Show error message if event data fails to load
  if (error) {
    return (
      <div className="flex justify-center mt-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 opacity-20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full filter blur-3xl"></div>
      </div>

      {eventDetail ? (
        <div className="bg-gray-900 shadow-2xl rounded-3xl max-w-3xl w-full overflow-hidden z-10">
          {/* Event Image */}
          <div className="w-full">
            <img
              src={eventDetail.image?.url}
              alt={eventDetail.title}
              className="w-full object-cover h-72 sm:h-96 rounded-t-3xl"
            />
          </div>

          {/* Event Details */}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">{eventDetail.title}</h1>
            <p className="text-gray-300 mb-6 text-center" style={{ userSelect: "text" }}>
              {eventDetail.description || "No description provided."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg" style={{ userSelect: "text" }}>
              <p className="text-gray-400">
                <strong>Start Time:</strong> {new Date(eventDetail.startTime).toLocaleString()}
              </p>
              <p className="text-gray-400">
                <strong>End Time:</strong> {new Date(eventDetail.endTime).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Comment Section */}
          <CommentSection eventId={id} user={user} />
        </div>
      ) : (
        <p className="text-center text-gray-500">Event details not available.</p>
      )}
    </section>
  );
};

export default EventDetail;
