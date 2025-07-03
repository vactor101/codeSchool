import { redirect } from "next/navigation";
import UserAuth from "../hooks/userAuth";
import React from "react";

interface ProtectedProps{
    children: React.ReactNode;
}

export default function Protected({children}: ProtectedProps){
    const isAuthenticated = UserAuth();

    if (isAuthenticated === "loading") {
      // Optionally, show a loading spinner here
      return <div>Loading...</div>;
    }

    return isAuthenticated ? children : redirect("/");
}