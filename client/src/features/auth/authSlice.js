import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  currentUser: {
    id: null,
    email: "",
    role: "",
  },
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.token = null;
      state.currentUser = initialState.currentUser;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
