import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventItems, getMyEventItems } from "../store/slices/eventSlice";
import Card from "./Card";
import CardTwo from "./CardTwo";
import Spinner from "./Spinner";

const Events = () => {
  const dispatch = useDispatch();
  const { allEvents, myEvents, loading } = useSelector((state) => state.event);

  const [showAllEvents, setShowAllEvents] = useState(true);

  useEffect(() => {
    if (showAllEvents) {
      dispatch(getAllEventItems());
    } else {
      dispatch(getMyEventItems());
    }
  }, [dispatch, showAllEvents]);

  return (
    <article className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 opacity-20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full filter blur-3xl"></div>
      </div>
      <div className="relative text-center py-10">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 font-logo">
          {showAllEvents ? "All Events" : "My Events"}
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {showAllEvents
            ? "Discover exciting events happening around you and join the ones that interest you."
            : "Review and manage the events you have created or joined."}
        </p>
      </div>

      <div className="relative flex space-x-6 mt-8">
        <button
          onClick={() => setShowAllEvents(true)}
          className={`px-8 py-3 text-lg font-semibold rounded-full transition-transform duration-300 ${
            showAllEvents
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-800 text-gray-400 border border-gray-600 hover:bg-blue-600 hover:text-white hover:scale-105"
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setShowAllEvents(false)}
          className={`px-8 py-3 text-lg font-semibold rounded-full transition-transform duration-300 ${
            !showAllEvents
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-800 text-gray-400 border border-gray-600 hover:bg-blue-600 hover:text-white hover:scale-105"
          }`}
        >
          My Events
        </button>
      </div>

      {/* Events Section */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllEvents ? allEvents : myEvents).length > 0 ? (
              (showAllEvents ? allEvents : myEvents).map((event) => (
                showAllEvents ? (
                  <Card
                    key={event._id}
                    title={event.title}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    imgSrc={event.image?.url}
                    id={event._id}
                  />
                ) : (
                  <CardTwo
                    key={event._id}
                    title={event.title}
                    startingBid={event.startingBid}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    imgSrc={event.image?.url}
                    id={event._id}
                  />
                )
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center mt-8">
                <p className="text-lg text-gray-400 font-semibold">
                  No events available. 😔
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default Events;
