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
      dispatch(getMyEventItems())
    }
  }, [dispatch, showAllEvents]);

  return (
    <article className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        <button
          onClick={() => setShowAllEvents(true)}
          className={`px-6 py-3 text-base font-semibold rounded-full transition-all ease-in-out duration-300 transform ${showAllEvents
              ? "bg-[#4f46e5] text-white shadow-lg scale-105"
              : "bg-white text-[#4f46e5] border-2 border-[#4f46e5] hover:bg-[#4f46e5] hover:text-white hover:scale-105 hover:shadow-md"
            }`}
        >
          All Events
        </button>
        <button
          onClick={() => setShowAllEvents(false)}
          className={`px-6 py-3 text-base font-semibold rounded-full transition-all ease-in-out duration-300 transform ${!showAllEvents
              ? "bg-[#4f46e5] text-white shadow-lg scale-105"
              : "bg-white text-[#4f46e5] border-2 border-[#4f46e5] hover:bg-[#4f46e5] hover:text-white hover:scale-105 hover:shadow-md"
            }`}
        >
          My Events
        </button>
      </div>

      <section className="text-center my-8">
        <h1 className="text-4xl font-extrabold mb-4 font-logo">
          {showAllEvents ? "All Events" : "My Events"}
        </h1>
      </section>

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 w-full max-w-screen-xl">
            {(showAllEvents ? allEvents : myEvents).length > 0 ? (
              (showAllEvents ? allEvents : myEvents).map((element) => (
                // Conditionally render Card or CardTwo
                showAllEvents ? (
                  <Card
                    key={element._id}
                    title={element.title}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.image?.url}
                    id={element._id}
                  />
                ) : (
                  <CardTwo
                    key={element._id}
                    title={element.title}
                    startingBid={element.startingBid}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.image?.url}
                    id={element._id}
                  />
                )
              ))
            ) : (
              <p className="text-lg text-gray-500 font-semibold">No events available</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default Events;
