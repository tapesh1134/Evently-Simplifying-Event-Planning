import { createEvent } from "../store/slices/eventSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.event);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      return alert("Unsupported file type. Please upload PNG, JPEG, or WEBP.");
    }

    if (file.size > maxSize) {
      return alert("File size exceeds 5 MB.");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();

    if (!title || !description || !startTime || !endTime || !image) {
      return alert("All fields are required.");
    }

    if (new Date(startTime) >= new Date(endTime)) {
      return alert("Start time must be earlier than end time.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createEvent(formData));
  };

  return (
    <article className="w-full px-5 pt-5 flex flex-col items-center">
      <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create Event</h1>
      <div className="bg-white w-full max-w-4xl px-6 py-8 rounded-md shadow-md">
        <form className="flex flex-col gap-6" onSubmit={handleCreateEvent}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 px-3 border rounded-md focus:ring focus:ring-[#42b9be]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="py-2 px-3 border rounded-md focus:ring focus:ring-[#42b9be]"
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="startTime" className="text-lg font-semibold text-gray-700">
                Event Start Time
              </label>
              <DatePicker
                id="startTime"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="py-2 px-3 border rounded-md focus:ring focus:ring-[#42b9be]"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="endTime" className="text-lg font-semibold text-gray-700">
                Event End Time
              </label>
              <DatePicker
                id="endTime"
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="py-2 px-3 border rounded-md focus:ring focus:ring-[#42b9be]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-lg font-semibold text-gray-700">
              Event Image
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-40 h-auto mb-4" />
              ) : (
                <p className="text-gray-500">No image selected</p>
              )}
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={imageHandler}
              />
              <label
                htmlFor="image"
                className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500 transition-all"
              >
                Upload Image
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 w-[420px]  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600rounded-md text-white mx-auto lg:w-[500px]"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </article>
  );
};

export default CreateEvent;