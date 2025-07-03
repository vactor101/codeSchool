"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  const phoneNumber = "201110050892";
  const message = "Hello, I have a question about your courses!";
  const [showNotification, setShowNotification] = useState(true);

  const handleClick = () => {
    setShowNotification(false); // Remove notification when clicked
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Notification Bubble */}
      {showNotification && (
        <motion.div
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.2, 1], // Pulse effect
            opacity: [0.8, 1, 0.8] // Fade pulse
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          !
        </motion.div>
      )}

      {/* WhatsApp Button */}
      <motion.div
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </motion.div>
    </div>
  );
};

export default WhatsAppButton;