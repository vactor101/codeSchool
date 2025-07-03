"use client";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";

export default function AuthHydrator() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user &&
      !user
    ) {
      dispatch(
        userLoggedIn({
          accessToken: "social-session",
          user: {
            id: session.user.email || "social-id",
            email: session.user.email || "",
            name: session.user.name || "",
            avatar: session.user.image ? { url: session.user.image } : undefined,
          },
        })
      );
    }
  }, [session, status, user, dispatch]);

  return null;
} 
