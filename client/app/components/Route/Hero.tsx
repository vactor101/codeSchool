"use client";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import {
  FaPlay,
  FaGraduationCap,
  FaUsers,
  FaStar,
  FaClock,
} from "react-icons/fa";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import ActionButton from "../../components/ActionButton/actionButton";
import { motion } from "framer-motion";

type Props = {};

const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const [currentStat, setCurrentStat] = useState(0);
  const router = useRouter();
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  const handleSearch = () => {
    if (search === "") return;
    router.push(`/courses?title=${search}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getBannerTitle = () => {
    if (locale === "ar") {
      return t("hero.title");
    }
    return data?.layout?.banner?.title || t("hero.title");
  };

  const getBannerSubTitle = () => {
    if (locale === "ar") {
      return t("hero.subtitle");
    }
    return data?.layout?.banner?.subTitle || t("hero.subtitle");
  };

  const stats = [
    {
      icon: FaGraduationCap,
      number: "130K+",
      label: t("hero.graduates"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaClock,
      number: "6M+",
      label: t("hero.trainingHours"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: FaUsers,
      number: "250K+",
      label: t("hero.happyParents"),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FaStar,
      number: "4.9/5",
      label: t("hero.studentRating"),
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  // Auto-cycle through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={`relative w-full min-h-[90vh] flex flex-col ${isRTL ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between overflow-hidden`}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated background circles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#b886f2]/20 to-[#ed82c3]/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#ed82c3]/20 to-[#b886f2]/20 rounded-full blur-xl"
            />

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#b886f2] rounded-full opacity-60"
            />
            <motion.div
              animate={{
                y: [10, -10, 10],
                x: [5, -5, 5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/3 right-1/3 w-6 h-6 bg-[#ed82c3] rounded-full opacity-40"
            />
          </div>

          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            className={`w-full lg:w-[45%] flex ${isRTL ? "justify-end" : "justify-start"} relative z-10 mt-10 lg:mt-0 px-4`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#b886f2]/30 to-[#ed82c3]/30 rounded-full blur-3xl transform scale-110"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src={
                    data?.layout?.banner?.image?.url ||
                    "/assests/banner-img-1.png"
                  }
                  width={600}
                  height={600}
                  alt={t("hero.bannerImage")}
                  className="object-contain w-full max-w-[500px] h-auto relative z-10"
                  priority
                />

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className={`absolute top-1/2 ${isRTL ? "left-0" : "right-0"} transform -translate-y-1/2 bg-white dark:bg-[#1a1f37] rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700`}
                >
                  <motion.div
                    key={currentStat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${stats[currentStat].color} flex items-center justify-center`}
                    >
                      {React.createElement(stats[currentStat].icon, {
                        className: "w-6 h-6 text-white",
                      })}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {stats[currentStat].number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {stats[currentStat].label}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={containerVariants}
            className={`w-full lg:w-[55%] flex flex-col ${isRTL ? "items-end" : "items-start"} px-4 lg:px-10 mt-8 lg:mt-0 relative z-10`}
          >
            <motion.div variants={itemVariants}>
              <h1
                className={`text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight ${
                  isRTL ? "text-right" : "text-left"
                }`}
                dir={direction}
                style={{
                  textAlign: isRTL ? "right" : "left",
                  direction: direction,
                }}
              >
                <span className="bg-gradient-to-r from-[#b886f2] to-[#ed82c3] bg-clip-text text-transparent">
                  {getBannerTitle()}
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p
                className={`text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl ${
                  isRTL ? "text-right" : "text-left"
                }`}
                dir={direction}
                style={{
                  textAlign: isRTL ? "right" : "left",
                  direction: direction,
                }}
              >
                {getBannerSubTitle()}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <ActionButton
                type="whatsapp"
                dir={isRTL ? "right" : "left"}
                className="text-lg font-semibold"
              />
            </motion.div>

            {/* Enhanced Search Bar */}
            <motion.div
              variants={itemVariants}
              className={`relative w-full max-w-2xl mb-8`}
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder={t("hero.searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full p-4 ${isRTL ? "pr-4 pl-16" : "pl-4 pr-16"} rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg transition-all duration-300 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  dir={direction}
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    direction: direction,
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                  className={`absolute top-1/2 transform -translate-y-1/2 ${
                    isRTL ? "left-2" : "right-2"
                  } w-12 h-12 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300`}
                >
                  <BiSearch className="text-white text-xl" />
                </motion.button>
              </div>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              variants={itemVariants}
              className={`flex flex-col sm:flex-row gap-4 mb-12 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  <FaGraduationCap />
                  {locale === "ar" ? "تصفح الدورات" : "Browse Courses"}
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-[#b886f2] text-[#b886f2] font-semibold py-4 px-8 rounded-xl hover:bg-[#b886f2] hover:text-white transition-all duration-300 flex items-center gap-3"
              >
                <FaPlay />
                {locale === "ar" ? "شاهد العرض التوضيحي" : "Watch Demo"}
              </motion.button>
            </motion.div>

            {/* Trust Stats Grid */}
            <motion.div
              variants={itemVariants}
              className={`w-full grid grid-cols-2 lg:grid-cols-4 gap-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3`}
                  >
                    {React.createElement(stat.icon, {
                      className: "w-6 h-6 text-white",
                    })}
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.number}
                  </p>
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Hero;
