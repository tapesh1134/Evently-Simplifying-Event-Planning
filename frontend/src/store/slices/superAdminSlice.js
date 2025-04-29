import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllEventItems } from "./eventSlice.js";

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    loading: false,
    totalUsers: [],
  },
  reducers: {
    requestForAllUsers(state, action) {
      state.loading = true;
      state.totalUsers = [];
    },
    successForAllUsers(state, action) {
      state.loading = false;
      state.totalUsers = action.payload.allusersArray;
    },
    failureForAllUsers(state, action) {
      state.loading = false;
      state.totalUsers = [];
    },
    requestForEventDelete(state, action) {
      state.loading = true;
    },
    successForEventDelete(state, action) {
      state.loading = false;
    },
    failureForEventDelete(state, action) {
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.loading = false;
      state.totalUsers = state.totalUsers;
    },
  },
});

export const getAllUsers = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForAllUsers());
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/superadmin/users/getall",
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForAllUsers(response.data));
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForAllUsers());
    console.error(error.response.data.message);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForEventDelete());
  try {
    const response = await axios.delete(
      "http://localhost:8000/api/v1/superadmin/event/delete/${id}",
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForEventDelete());
    toast.success(response.data.message);
    dispatch(getAllEventItems());
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForEventDelete());
    console.error(error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const clearAllSuperAdminSliceErrors = () => (dispatch) => {
  dispatch(superAdminSlice.actions.clearAllErrors());
};

export default superAdminSlice.reducer;