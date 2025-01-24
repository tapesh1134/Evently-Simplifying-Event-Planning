import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../middlewares/error";
import { User } from "../models/userSchema";
import { Event } from "../models/eventSchema";

export const deleteEventItem = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid Id format.", 400));
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