import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

// Add this type declaration to avoid TypeScript errors
declare global {
  interface Window {
    __APP_INITIALIZED?: boolean;
  }
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:8000/api/v1/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh",
        method: "GET",
        credentials: "include",
      }),
      // Prevent retries to avoid unnecessary requests
      extraOptions: { maxRetries: 0 },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include",
      }),
      // Add this to prevent continuous retries on failure
      extraOptions: { maxRetries: 1 },
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const { data } = await queryFulfilled;
          const state = getState() as any;
          if (!state.auth.isAuthenticated) {
            dispatch(
              userLoggedIn({
                accessToken: data.accessToken,
                user: data.user,
              })
            );
          }
        } catch (error) {
          // Improved error handling
          if (error && typeof error === 'object' && 'error' in error) {
            console.error("User load failed:", error.error);
          } else {
            console.error("User load failed with unknown error");
          }
          
          // Don't log out the user automatically on error
          // This prevents logout loops when the API is not available
        }
      },
    }),
    // Add a new endpoint to check session status without side effects
    checkSession: builder.query({
      query: () => ({
        url: "check-session",
        method: "GET",
        credentials: "include",
      }),
      // Prevent retries to avoid unnecessary requests
      extraOptions: { maxRetries: 0 },
      transformResponse: (response: any) => {
        return { authenticated: !!response?.authenticated };
      },
      // Handle errors gracefully without side effects
      transformErrorResponse: (error: any) => {
        return { authenticated: false };
      },
    }),
  }),
});

export const { 
  useRefreshTokenQuery, 
  useLoadUserQuery,
  useCheckSessionQuery 
} = apiSlice;
