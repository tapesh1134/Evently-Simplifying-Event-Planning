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
    <article className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500 opacity-20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 opacity-20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative w-full sm:max-w-4xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Event</h1>
        <form className="flex flex-col gap-6" onSubmit={handleCreateEvent}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 px-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="py-2 px-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="startTime" className="text-lg font-semibold">
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
                className="py-2 px-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endTime" className="text-lg font-semibold">
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
                className="py-2 px-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="text-lg font-semibold">
              Event Image
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-auto mb-4 rounded-md"
                />
              ) : (
                <p className="text-gray-500">No image selected</p>
              )}
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={imageHandler}
                required
              />
              <label
                htmlFor="image"
                className="cursor-pointer font-semibold text-blue-600 hover:text-blue-500 transition"
              >
                Upload Image
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </article>
  );
};

export default CreateEvent;
