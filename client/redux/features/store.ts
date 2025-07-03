"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Modified initialization function to prevent continuous API calls
const initializeApp = async () => {
  // Only run in browser environment
  if (typeof window !== 'undefined') {
    // Check if we have any auth cookies before trying to load user
    const hasCookies = document.cookie.includes('refreshToken') || 
                      document.cookie.includes('accessToken');
    
    if (hasCookies) {
      try {
        // Use a one-time dispatch that doesn't subscribe to updates
        await store.dispatch(
          apiSlice.endpoints.loadUser.initiate(undefined, { 
            forceRefetch: true,
            subscribe: false, // Critical: prevents continuous subscription
          })
        );
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }
  }
};

// Only initialize once
let initialized = false;
if (!initialized) {
  initializeApp();
  initialized = true;
}
