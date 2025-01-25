import { Event } from "../models/eventSchema.js";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const addNewEvent = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Event image required.", 400));
    }

    const { image } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    if (!allowedFormats.includes(image.mimetype)) {
        return next(new ErrorHandler("File format not supported.", 400));
    }
    if (image.size > MAX_FILE_SIZE) {
        return next(new ErrorHandler("File size exceeds 5 MB.", 400));
    }

    const { title, description, startTime, endTime } = req.body;

    if (!title || !description || !startTime || !endTime) {
        return next(new ErrorHandler("Please provide all event details.", 400));
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return next(new ErrorHandler("Invalid date format.", 400));
    }

    if (startDate < Date.now()) {
        return next(
            new ErrorHandler(
                "Event starting time must be greater than the current time.",
                400
            )
        );
    }
    if (startDate >= endDate) {
        return next(
            new ErrorHandler(
                "Event starting time must be earlier than the ending time.",
                400
            )
        );
    }

    const alreadyOneEventActive = await Event.find({
        createdBy: req.user._id,
        endTime: { $gt: Date.now() },
    });

    if (alreadyOneEventActive.length > 0) {
        return next(new ErrorHandler("You already have one active event.", 400));
    }

    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "EventLy_TBPPP_EventS",
        });

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error(
                "Cloudinary error:",
                cloudinaryResponse.error || "Unknown Cloudinary error."
            );
            return next(
                new ErrorHandler("Failed to upload event image to Cloudinary.", 500)
            );
        }

        const newEvent = await Event.create({
            title,
            description,
            startTime,
            endTime,
            image: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: `Event created and will be listed on the Event page at ${startTime}.`,
            newEvent,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to create event.", 500));
    }
});


export const getAllEvents = catchAsyncErrors(async (req, res, next) => {
    let events = await Event.find();
    res.status(200).json({
        success: true,
        events,
    });
});

export const getEventDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid Id format.", 400));
    }

    const event = await Event.findById(id);
    if (!event) {
        return next(new ErrorHandler("Event not found.", 404));
    }

    res.status(200).json({
        success: true,
        event,
    });
});

export const getMyEvent = catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find({ createdBy: req.user._id });
    res.status(200).json({
        success: true,
        events,
    });
});

export const removeFromEvent = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format.", 400));
    }
    const event = await Event.findById(id);
    if (!event) {
        return next(new ErrorHandler("Event not found.", 404));
    }
    await event.deleteOne();
    res.status(200).json({
        success: true,
        message: "Event item deleted successfully.",
    });
});