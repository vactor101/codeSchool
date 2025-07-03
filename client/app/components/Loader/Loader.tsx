"use client";
import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-[#070b1b] dark:via-[#0f1419] dark:to-[#111C43] z-[9999] backdrop-blur-sm">
      <div className="relative flex flex-col items-center space-y-6">
        {/* Enhanced Logo/Brand */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent">
            Code School
          </h2>
        </div>

        {/* Improved Loader Animation */}
        <div className="relative">
          <div className="loader relative">
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-200 dark:border-purple-800 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border-4 border-pink-200 dark:border-pink-800 animate-ping animation-delay-200"></div>
            <div className="absolute inset-4 rounded-full border-4 border-purple-300 dark:border-purple-700 animate-ping animation-delay-400"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <div className="flex items-center space-x-1">
            <span className="text-gray-700 dark:text-gray-200 text-base font-medium">
              Loading
            </span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-pink-500 rounded-full animate-bounce animation-delay-100"></div>
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Preparing amazing content for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-400 rounded-full mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply animate-pulse animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default Loader;
