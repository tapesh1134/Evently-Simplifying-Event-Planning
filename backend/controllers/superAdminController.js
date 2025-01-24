import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Event } from "../models/eventSchema.js";

export const deleteEvent = catchAsyncErrors(async (req, res, next) => {
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
        message: "Event deleted successfully.",
    });
});

export const fetchAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    year: { $month: "$createdAt" },
                    role: "$role",
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                month: "$_id.month",
                year: "$_id.year",
                role: "$_id.role",
                count: 1,
                _id: 0,
            },
        },
        {
            $sort: { year: 1, month: 1 },
        },
    ]);

    const allusers = users.filter((user) => user.role === "User");

    const tranformDataToMonthlyArray = (data, totalMonths = 12) => {
        const result = Array(totalMonths).fill(0);

        data.forEach((item) => {
            result[item.month - 1] = item.count;
        });

        return result;
    };

    const allusersArray = tranformDataToMonthlyArray(allusers);

    res.status(200).json({
        success: true,
        allusersArray,
    });
});  