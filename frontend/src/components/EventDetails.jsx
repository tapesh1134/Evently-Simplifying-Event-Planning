import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventDetail } from "../store/slices/eventSlice";
import Spinner from "./Spinner";

const EventDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { eventDetail, loading, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getEventDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching event details:", error);
    return (
      <div className="flex justify-center mt-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      {eventDetail ? (
        <div className="bg-white shadow-md rounded-lg max-w-3xl w-full overflow-hidden">
          <div className="w-full">
            <img
              src={eventDetail.image?.url}
              alt={eventDetail.title}
              className="w-full object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{eventDetail.title}</h1>
            <p className="text-gray-700 mb-4">{eventDetail.description || "No description provided."}</p>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-lg">
                <strong>Start Time:</strong>{" "}
                {new Date(eventDetail.startTime).toLocaleString()}
              </p>
              <p className="text-lg">
                <strong>End Time:</strong>{" "}
                {new Date(eventDetail.endTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Event details not available.</p>
      )}
    </section>
  );
};

export default EventDetail;
