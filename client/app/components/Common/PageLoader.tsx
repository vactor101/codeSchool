"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

interface PageLoaderProps {
  message?: string;
  type?: "parents" | "schools" | "default";
}

const PageLoader: React.FC<PageLoaderProps> = ({
  message,
  type = "default",
}) => {
  const { locale } = useTranslation();

  const getGradient = () => {
    switch (type) {
      case "parents":
        return "from-[#b886f2] to-[#ed82c3]";
      case "schools":
        return "from-[#3b82f6] to-[#1d4ed8]";
      default:
        return "from-[#b886f2] to-[#ed82c3]";
    }
  };

  const defaultMessage = locale === "ar" ? "جاري التحميل..." : "Loading...";

  return (
    <div className="fixed inset-0 bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <motion.div
          className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${getGradient()}`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Loading Bars */}
        <div className="flex gap-2 justify-center mb-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`w-2 h-8 rounded-full bg-gradient-to-t ${getGradient()}`}
              animate={{
                scaleY: [1, 2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-lg font-semibold text-gray-900 dark:text-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {message || defaultMessage}
        </motion.p>

        {/* Progress Bar */}
        <motion.div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mt-4 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getGradient()} rounded-full`}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PageLoader;
