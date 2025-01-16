import cron from "node-cron";
import { Event } from "../models/eventSchema.js";

export const endedEventCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("Cron for ended event running...");
    const endedEvents = await Event.find({
      endTime: { $lt: now },
    });
  });
};
