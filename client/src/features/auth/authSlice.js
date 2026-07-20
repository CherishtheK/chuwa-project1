import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signin, signup, getMe } from "../../api/auth";

const initialState = {
  token: localStorage.getItem("token"),
  currentUser: {
    id: null,
    email: "",
    role: "",
  },
  isAuthenticated: false,
  loading: true,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await signin(credentials);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Sign in failed");
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await signup(credentials);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Sign up failed");
    }
  },
);

export const restoreSession = createAsyncThunk(
  "auth/restore",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMe();
      return data.user;
    } catch (err) {
      localStorage.removeItem("token");
      return rejectWithValue(err.response?.data?.message || "Session expired");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.currentUser = initialState.currentUser;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoadingDone: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
      })
      // restore session
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logoutUser, setLoadingDone } = authSlice.actions;

export default authSlice.reducer;
