"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give some time for auth state to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading while checking auth
  if (isLoading) {
    return <Loader />;
  }

  // If not authenticated, redirect to home
  if (!isAuthenticated || !user) {
    redirect("/");
    return null;
  }

  // If authenticated but not admin, redirect to home
  if (user.role !== "admin") {
    redirect("/");
    return null;
  }

  // If admin, show content
  return <>{children}</>;
}
