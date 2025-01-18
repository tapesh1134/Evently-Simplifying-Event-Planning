import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Thunks for asynchronous actions
export const getAllEventItems = createAsyncThunk(
  "event/getAllEventItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/events/allitems", { withCredentials: true });
      return response.data.events;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getMyEventItems = createAsyncThunk(
  "event/getMyEventItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/events/myevents", { withCredentials: true });
      return response.data.events;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getEventDetail = createAsyncThunk(
  "event/getEventDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/events/event/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/events/create",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/events/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete event.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    eventDetail: {},
    myEvents: [],
    allEvents: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For getting all event items
      .addCase(getAllEventItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEventItems.fulfilled, (state, action) => {
        state.loading = false;
        state.allEvents = action.payload;
      })
      .addCase(getAllEventItems.rejected, (state) => {
        state.loading = false;
      })
      
      // For getting my event items
      .addCase(getMyEventItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyEventItems.fulfilled, (state, action) => {
        state.loading = false;
        state.myEvents = action.payload;
      })
      .addCase(getMyEventItems.rejected, (state) => {
        state.loading = false;
      })
      
      // For getting event detail
      .addCase(getEventDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.eventDetail = action.payload.event;
      })
      .addCase(getEventDetail.rejected, (state) => {
        state.loading = false;
      })
      
      // For creating an event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state) => {
        state.loading = false;
      })
      
      // For deleting an event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.myEvents = state.myEvents.filter(event => event.id !== action.payload);
        state.allEvents = state.allEvents.filter(event => event.id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;
