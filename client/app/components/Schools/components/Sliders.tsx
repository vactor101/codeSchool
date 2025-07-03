"use client";
import React, { useRef, useState, useCallback } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import { robot } from "@/public/assests";
// import required modules
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import { data, Data } from "@/app/utils/parentsAndSchools";

export default function Sliders() {
  const { schools }: Data = data;
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  }, []);

  return (
    <div className="relative w-full h-full">
      <Swiper
        grabCursor={true}
        loop={true}
        spaceBetween={0}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="mySwiper w-full h-full"
        allowTouchMove={true}
      >
        {schools.slidersImages.map((slider, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative w-full h-full bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
              {/* Loading placeholder */}
              {!loadedImages.has(index) && !imageErrors.has(index) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              )}

              {/* Error fallback */}
              {imageErrors.has(index) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Image unavailable</p>
                  </div>
                </div>
              )}

              {/* Main image */}
              <Image
                src={slider}
                className={`
                  w-full h-full object-cover transition-all duration-700 ease-in-out
                  ${loadedImages.has(index) ? "opacity-100" : "opacity-0"}
                  scale-105 sm:scale-110 md:scale-100
                  translate-y-0 sm:translate-y-[5%] md:-translate-y-[5%] lg:-translate-y-[15%]
                  hover:scale-105 transition-transform duration-500
                `}
                fill
                alt={`Code School Schools Hero Image ${index + 1}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                priority={index === 0}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {schools.slidersImages.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-white/50 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
