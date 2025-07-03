import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: { url: string };
  } | null;
  isAuthenticated: boolean;
  error: string | null;
  lastLogoutTime: number | null; // Add this to track last logout time
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  error: null,
  lastLogoutTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.error = null;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: {
          id: string;
          email: string;
          name: string;
          avatar?: { url: string };
        };
      }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      state.lastLogoutTime = null; // Reset logout time on login
    },
    userLoggedOut: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.lastLogoutTime = Date.now(); // Track when logout happened
    },
    authError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  authError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
