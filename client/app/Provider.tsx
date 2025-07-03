import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/features/store";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";

interface ProvidersProps {
  children: any;
}

function useHydrateAuthFromSession() {
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
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
