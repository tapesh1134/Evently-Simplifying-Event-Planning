import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `${days} Days ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Link
      to={`/events/event/${id}`}
      className="flex flex-col bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-2 hover:scale-105 hover:shadow-3xl group w-70 h-70"
    >
      <div className="relative w-full h-48">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          style={{ objectFit: "cover", maxHeight: "150px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 flex flex-col justify-between h-full">
        <h5 className="text-2xl font-semibold text-white group-hover:text-[#d6482b] mb-3">
          {title}
        </h5>
        <p className="text-gray-300 text-sm flex-grow">
          {timeLeft.type}{" "}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="font-bold">{formatTimeLeft(timeLeft)}</span>
          ) : (
            <span className="text-red-500 font-bold">Event Ended</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default Card;
