"use client";
import { curve, heroBackground, robot } from "@/public/assests";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "@/constants";
import { ScrollParallax } from "react-just-parallax";
import { useEffect, useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import Image from "next/image";
import Sliders from "./Sliders";
import Message from "./message/Message";
import { data, Data } from "@/app/utils/parentsAndSchools";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion, Variants } from "framer-motion"; // Import Variants type

const Hero = () => {
  const parallaxRef = useRef(null);
  const { parents }: Data = data;
  const { theme, setTheme } = useTheme();
  const { locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  // Enhanced animation variants with proper typing
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
        delay: 0.4,
      },
    },
  };

  const visualVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1,
        delay: 0.6,
      },
    },
  };

  return (
    <Section
      className="pt-[6rem] sm:pt-[8rem] md:pt-[10rem] lg:pt-[12rem] pb-8 md:pb-16 lg:pb-20"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div
        className="container relative px-4 sm:px-6"
        ref={parallaxRef}
        dir={direction}
      >
        {/* Hero Content */}
        <div className="relative z-10 max-w-[56rem] md:max-w-[62rem] mx-auto text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight ${isRTL ? "text-right" : "text-center"}`}
          >
            {locale === "ar"
              ? "مدرسة البرمجة تمكن الأطفال العرب بمهار��ت "
              : parents.heroTitle}{" "}
            <span className="inline-block relative text-gradient bg-gradient-to-r from-[#b886f2] to-[#ed82c3] bg-clip-text text-transparent">
              {locale === "ar" ? "حول العالم" : parents.heroTitleCurve}
              <Image
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve decoration"
                priority
              />
            </span>
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className={`text-sm sm:text-base md:text-lg lg:text-xl text-n-2 max-w-4xl mx-auto mb-6 lg:mb-8 leading-relaxed ${isRTL ? "text-right" : "text-center"}`}
          >
            {locale === "ar"
              ? "مدرسة البرمجة توفر بيئة تعليمية ممتعة وتفاعلية قائمة على الألعاب للأطفال لتطوير مهارات قيمة، وتعلم البرمجة والتكنولوجيا من خبراء متمرسين. انضم إلى مدرسة البرمجة اليوم وأعد طفلك ��لنجاح في العصر الرقمي."
              : parents.heroDes}
          </motion.p>

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className={`flex ${isRTL ? "justify-center" : "justify-center"} mt-6 sm:mt-8`}
          >
            <Message>
              <Button
                white
                className="px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold min-w-[200px] shadow-lg hover:shadow-xl transform transition-all duration-300"
                rounded="lg"
              >
                {locale === "ar" ? "ابدأ الآن" : "Get started"}
              </Button>
            </Message>
          </motion.div>
        </div>

        {/* Enhanced Hero Visual */}
        <motion.div
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-[18rem] xs:max-w-[20rem] sm:max-w-[24rem] mx-auto md:max-w-4xl lg:max-w-5xl xl:mb-24 mt-8 sm:mt-12"
        >
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="relative bg-n-8 rounded-[1rem] overflow-hidden backdrop-blur-xl">
              {/* Enhanced device frame */}
              <div className="h-[1.2rem] md:h-[1.4rem] bg-gradient-to-r from-n-10 to-n-9 rounded-t-[0.9rem] flex items-center px-3">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Enhanced content area */}
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] relative bg-gradient-to-br from-purple-900/10 to-pink-900/10">
                {/* Enhanced Generating component */}
                <Generating className="absolute z-30 left-3 right-3 bottom-4 md:left-1/2 md:right-auto md:bottom-6 md:w-[28rem] md:-translate-x-1/2 bg-gradient-to-r from-purple-800/90 to-pink-800/90 backdrop-blur-md border border-purple-500/30 text-white rounded-xl shadow-lg" />

                {/* Enhanced Sliders with loading state */}
                <div className="relative w-full h-full">
                  <Sliders />
                </div>

                {/* Enhanced Navigation Icons */}
                <div
                  className={`hidden lg:absolute ${isRTL ? "lg:-right-[4rem] xl:-right-[6rem]" : "lg:-left-[4rem] xl:-left-[6rem]"} lg:top-1/2 lg:-translate-y-1/2 lg:flex z-30`}
                >
                  <ScrollParallax isAbsolutelyPositioned zIndex={100}>
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 gap-2">
                        {heroIcons.map(
                          ({ icon, href, label, description }, index) => (
                            <div key={index} className="group relative">
                              <Link
                                href={href || "/"}
                                className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 active:scale-95"
                                aria-label={`${locale === "ar" ? "انتقل إلى" : "Navigate to"} ${label}`}
                                title={description}
                              >
                                <Image
                                  src={icon}
                                  width={24}
                                  height={24}
                                  className="w-5 h-5 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                                  alt={label}
                                />
                              </Link>

                              {/* Tooltip */}
                              <div
                                className={`absolute ${isRTL ? "right-full mr-3" : "left-full ml-3"} top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50`}
                              >
                                <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                                  {locale === "ar"
                                    ? label === "Home"
                                      ? "الرئيسية"
                                      : label === "Courses"
                                        ? "الدورات"
                                        : label === "FAQ"
                                          ? "الأسئلة الشائعة"
                                          : label === "Contact"
                                            ? "اتصل بنا"
                                            : label
                                    : label}
                                  <div
                                    className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-full" : "left-full"} border-4 border-transparent ${isRTL ? "border-r-gray-900" : "border-l-gray-900"}`}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </ScrollParallax>
                </div>

                {/* Notification - Enhanced positioning */}
                <div
                  className={`hidden sm:absolute ${isRTL ? "sm:-left-[3.5rem] xl:-left-[5.5rem]" : "sm:-right-[3.5rem] xl:-right-[5.5rem]"} sm:bottom-[1rem] xl:bottom-[2rem] sm:flex cursor-pointer z-30`}
                >
                  <ScrollParallax
                    isAbsolutelyPositioned
                    enableOnTouchDevice={true}
                    zIndex={100}
                  >
                    <Message>
                      <div className="bg-gradient-to-r from-[#b886f2] to-[#ed82c3] p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <Notification
                          title={
                            locale === "ar"
                              ? "احجز تجربة مجانية"
                              : "BOOK A FREE TRIAL"
                          }
                          className="text-xs sm:text-sm text-white font-medium"
                        />
                      </div>
                    </Message>
                  </ScrollParallax>
                </div>
              </div>
            </div>

            <Gradient />
          </div>

          {/* Background Image - Enhanced positioning */}
          <div className="absolute -top-[35%] left-1/2 w-[180%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <Image
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="Hero background"
              priority
            />
          </div>

          <BackgroundCircles parallaxRef={parallaxRef} />
        </motion.div>

        {/* Company Logos - Enhanced visibility */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <CompanyLogos className="hidden sm:block relative z-10 mt-12 lg:mt-20" />
        </motion.div>
      </div>

      <BottomLine />

      {/* Enhanced styles for Parents Hero */}
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #b886f2 0%, #ed82c3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bg-conic-gradient {
          background: conic-gradient(
            from 180deg at 50% 50%,
            #b886f2 0deg,
            #ed82c3 180deg,
            #b886f2 360deg
          );
        }

        /* Enhanced mobile responsiveness */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        /* Improved RTL support */
        [dir="rtl"] .inline-block {
          direction: ltr;
          display: inline-block;
        }
      `}</style>
    </Section>
  );
};

export default Hero;
