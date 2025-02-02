import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch comments for a specific event
export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/comments/${eventId}`);
      return response.data; // Return the fetched comments
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);

// Post a new comment
export const postComment = createAsyncThunk(
  "comments/post",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/comments", commentData);
      return response.data; // Return the posted comment from the backend
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);


const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // List of comments
    loading: false, // Loading state for fetching and posting
    error: null, // Error state
  },
  reducers: {
    // Add comment to the state in real-time
    addComment: (state, action) => {
      state.comments.unshift(action.payload); // Adds the new comment at the beginning
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true; // Set loading to true while fetching
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fetching is done
        state.comments = action.payload; // Set the fetched comments to the state
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.payload; // Set the error message
      })

      // Post comment
      .addCase(postComment.pending, (state) => {
        state.loading = true; // Set loading to true while posting
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when posting is done
        state.comments.unshift(action.payload); // Add the newly posted comment at the beginning
        state.error = null; // Clear any previous errors
      })
      .addCase(postComment.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.payload; // Set the error message
      });
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
