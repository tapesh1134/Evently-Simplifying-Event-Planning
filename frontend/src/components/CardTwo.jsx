import React from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../store/slices/eventSlice";
import { Link } from "react-router-dom";

const CardTwo = ({ imgSrc, title, endTime, id }) => {
  const dispatch = useDispatch();

  const handleDeleteEvent = async (event) => {
    event.preventDefault(); // Prevent navigation
    try {
      await dispatch(deleteEvent(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete the event", error);
    }
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (endDifference > 0) {
      timeLeft = {
        type: "Ends In: ",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    } else {
      timeLeft = { type: "Event Ended" };
    }
    return timeLeft;
  };

  const timeLeft = calculateTimeLeft();

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `${days} Days ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Link
      to={`/events/event/${id}`}
      className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl group w-80 h-70"
    >
      <div className="relative w-full h-40">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>

      <div className="p-4 flex flex-col justify-between h-full">
        <h5 className="text-xl font-semibold text-gray-800 group-hover:text-[#d6482b] mb-2">
          {title}
        </h5>
        <p className="text-gray-600 text-sm flex-grow">
          {timeLeft.type}{" "}
          {timeLeft.type === "Ends In: " ? (
            <span className="font-bold">{formatTimeLeft(timeLeft)}</span>
          ) : (
            <span className="text-red-500 font-bold">{timeLeft.type}</span>
          )}
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="bg-red-400 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600"
            onClick={handleDeleteEvent}
          >
            Delete Event
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CardTwo;
