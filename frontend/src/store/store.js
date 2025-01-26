import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventReducer from "./slices/eventSlice"
import superAdminReducer from "./slices/superAdminSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer,
        superAdmin: superAdminReducer,
    },
});