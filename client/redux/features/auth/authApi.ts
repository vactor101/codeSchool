"use client";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";
import { toast } from "react-hot-toast"; // Added for error notifications

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  email: string;
  password: string;
  name: string;
};

type SocialAuthData = {
  email: string;
  name: string;
  avatar: string | null;
};

type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: { url: string };
  };
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      // Prevent retries
      extraOptions: { maxRetries: 0 },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.error("Registration failed:", error);
          const errorMessage = error?.data?.message || "Registration failed";
          toast.error(errorMessage);
          
          // If the error is related to missing email template, still redirect to login
          if (errorMessage.includes("ENOENT") || errorMessage.includes("mail")) {
            toast.success("Account created! Please login.");
            // Note: setRoute("Login") would be handled in the component
          }
        }
      },
    }),
    activation: builder.mutation<void, { activation_token: string; activation_code: string }>({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
      // Prevent retries
      extraOptions: { maxRetries: 0 },
    }),
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      // Prevent retries
      extraOptions: { maxRetries: 0 },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.error("Login failed:", error);
          const errorMessage = error?.data?.message || "Login failed";
          toast.error(errorMessage);
        }
      },
    }),
    socialAuth: builder.mutation<LoginResponse, SocialAuthData>({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      // Prevent retries
      extraOptions: { maxRetries: 0 },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.error("Social auth failed:", error);
          const errorMessage = error?.data?.message || "Social authentication failed";
          toast.error(errorMessage);
        }
      },
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST", // Changed from GET to POST for better semantics
        credentials: "include" as const,
      }),
      // Prevent retries
      extraOptions: { maxRetries: 0 },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
          // Clear any stored auth data
          localStorage.removeItem("auth");
          sessionStorage.removeItem("auth");
          // Clear cookies by setting them to expire
          document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } catch (error: any) {
          console.error("Logout failed:", error);
          // Still log out the user on the client side even if the API call fails
          dispatch(userLoggedOut());
          toast.error("Logout may not be complete on the server");
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutMutation,
} = authApi;
