"use client";
import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] z-50">
      <div className="relative">
        <div className="loader"></div>
        <div className="mt-4 text-center">
          <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
