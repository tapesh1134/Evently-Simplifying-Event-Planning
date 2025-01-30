import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventReducer from "./slices/eventSlice";
import superAdminReducer from "./slices/superAdminSlice";
import notificationReducer, { addNotification } from "./slices/notificationSlice";
import socket from "../socket";

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    superAdmin: superAdminReducer,
    notifications: notificationReducer,
  },
});

socket.on("eventNotification", (notification) => {
  store.dispatch(addNotification(notification));
});

export default store;
