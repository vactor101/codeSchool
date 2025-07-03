import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { robot } from "@/public/assests";
// import required modules
import { Autoplay, EffectCards } from "swiper/modules";
import Image from "next/image";
import { data, Data } from "@/app/utils/parentsAndSchools";

export default function Sliders() {
  const { schools }: Data = data;
  return (
    <>
      <Swiper
        grabCursor={true}
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {schools.slidersImages.map((slider, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slider}
              className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
              width={1024}
              height={490}
              alt="AI"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
