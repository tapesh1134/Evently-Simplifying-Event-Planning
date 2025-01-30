import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/notifications";

// Fetch all notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch notifications");
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/${id}/read`, { userId });
      return { id, userId };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to mark notification as read");
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error("User ID is required");

      const response = await axios.put(`${API_URL}/${userId}/read1`, { userId });
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to mark all as read");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const { id, userId } = action.payload;
        state.notifications = state.notifications.map((notif) =>
          notif._id === id ? { ...notif, readBy: [...notif.readBy, userId] } : notif
        );
      })
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        const userId = action.payload;
        state.notifications = state.notifications.filter(
            (notif) => !notif.readBy.includes(userId)
        );
    });
  },
});

export const { addNotification, removeReadNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
