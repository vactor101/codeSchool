"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import child from "../../public/assests/child.png";
import { successStories } from "../data"; 

const StoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Stories");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handlePrev = () => {
    setCurrentStoryIndex((prev) => 
      prev === 0 ? successStories.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentStoryIndex((prev) => 
      prev === successStories.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43]">
      <Heading
        title="Success Stories - Code School"
        description="Real stories from our students about their coding journeys"
        keywords="coding bootcamp success, student stories"
      />
      <Header
        activeItem={4}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left section - hidden on small screens */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex md:w-[260px] lg:w-[320px] bg-purple-800 dark:bg-purple-900 p-8 relative items-center"
        >
          <div className="absolute right-[-120px] z-50 max-w-md mx-auto w-full h-full flex items-center justify-center">
            <Image
              src={child}
              alt="Success icon"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Right content section */}
        <motion.div
          key={currentStoryIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white dark:bg-[#111C43] p-6 md:p-12 lg:p-16 flex flex-col justify-center"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#12235f] dark:text-white">
              {successStories[currentStoryIndex].title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              {successStories[currentStoryIndex].description}
            </p>
          </div>

          <div className="w-full flex justify-center mt-8 md:mt-10">
            <div className="flex justify-between items-center w-full max-w-xs">
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-12 h-12 bg-[#12235f] hover:bg-[#0d1b4a] text-white rounded-full transition-all"
                aria-label="Previous story"
              >
                <IoIosArrowBack size={20} />
              </button>
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-12 h-12 bg-[#12235f] hover:bg-[#0d1b4a] text-white rounded-full transition-all"
                aria-label="Next story"
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default StoriesPage;