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
      className="pt-[8rem] md:pt-[10rem] lg:pt-[12rem] -mt-[3rem] md:-mt-[5.25rem]"
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
        <div className="relative z-10 max-w-[56rem] md:max-w-[62rem] mx-auto text-center mb-12 md:mb-16 lg:mb-[6.25rem]">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight ${isRTL ? "text-right" : "text-left"}`}
          >
            {locale === "ar"
              ? "مدرسة البرمجة تمكن الأطفال العرب بمهارات "
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
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-n-2 max-w-4xl mx-auto mb-6 lg:mb-8 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
          >
            {locale === "ar"
              ? "مدرسة البرمجة توفر بيئة تعليمية ممتعة وتفاعلية قائمة على الألعاب للأطفال لتطوير مهارات قيمة، وتعلم البرمجة والتكنولوجيا من خبراء متمرسين. انضم إلى مدرسة البرمجة اليوم وأعد طفلك للنجاح في العصر الرقمي."
              : parents.heroDes}
          </motion.p>

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className={`flex ${isRTL ? "justify-end" : "justify-center"}`}
          >
            <Message>
              <Button
                white
                className="px-8 py-3 text-sm md:text-base font-semibold"
              >
                {locale === "ar" ? "ابدأ الآن" : "Get started"}
              </Button>
            </Message>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-[20rem] xs:max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24"
        >
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem] overflow-hidden">
              <div className="h-[1.2rem] md:h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] relative">
                <Generating className="absolute z-10 left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />
                <Sliders />

                {/* Social Icons - Enhanced responsiveness */}
                <div
                  className={`hidden sm:absolute ${isRTL ? "sm:-right-[3.5rem] xl:-right-[5.5rem]" : "sm:-left-[3.5rem] xl:-left-[5.5rem]"} sm:bottom-[5.5rem] xl:bottom-[7.5rem] sm:rounded-2xl xl:flex z-30`}
                >
                  <ScrollParallax isAbsolutelyPositioned zIndex={100}>
                    <ul className="px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl flex flex-col sm:flex-row w-fit">
                      {heroIcons.map(({ icon, href }, index) => (
                        <li key={index}>
                          <Link
                            href={`/${href ? href : ""}`}
                            className="p-3 sm:p-5 block hover:scale-110 transition-transform duration-300"
                            aria-label={`${locale === "ar" ? "رابط شبكة اجتماعية" : "Social link"} ${index + 1}`}
                          >
                            <Image
                              src={icon}
                              width={20}
                              height={20}
                              className="w-4 h-4 sm:w-6 sm:h-6"
                              alt={`Social icon ${index + 1}`}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </ScrollParallax>
                </div>

                {/* Notification - Enhanced positioning */}
                <div
                  className={`hidden sm:absolute ${isRTL ? "sm:-left-[3.5rem] xl:-left-[5.5rem]" : "sm:-right-[3.5rem] xl:-right-[5.5rem]"} sm:bottom-[1rem] xl:bottom-[2rem] sm:flex cursor-pointer`}
                >
                  <ScrollParallax
                    isAbsolutelyPositioned
                    enableOnTouchDevice={true}
                    zIndex={100}
                  >
                    <Message>
                      <Notification
                        title={
                          locale === "ar"
                            ? "احجز تجربة مجانية"
                            : "BOOK A FREE TRIAL"
                        }
                        className="text-xs sm:text-sm"
                      />
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
