"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import Image from "next/image";
import {
  Star,
  Crown,
  Trophy,
  Calendar,
  Award,
  Code,
  Sparkles,
  X,
  ExternalLink,
  Play,
} from "lucide-react";

interface StarOfTheMonthData {
  id: string;
  name: string;
  nameAr: string;
  age: number;
  project: string;
  projectAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  achievements: string[];
  achievementsAr: string[];
  videoUrl?: string;
  portfolioUrl?: string;
  month: string;
  monthAr: string;
  year: number;
}

interface StarOfTheMonthProps {
  isOpen: boolean;
  onClose: () => void;
}

const StarOfTheMonth: React.FC<StarOfTheMonthProps> = ({ isOpen, onClose }) => {
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();
  const [currentStarIndex, setCurrentStarIndex] = useState(0);

  // Sample data for Star of the Month
  const starsData: StarOfTheMonthData[] = [
    {
      id: "1",
      name: "Ahmed Hassan",
      nameAr: "أحمد حسن",
      age: 12,
      project: "AI Chatbot Assistant",
      projectAr: "مساعد ذكي للمحادثة",
      description:
        "Created an intelligent chatbot that helps students with homework using natural language processing and machine learning algorithms.",
      descriptionAr:
        "أنشأ روبوت محادثة ذكي يساعد الطلاب في أداء واجباتهم المنزلية باستخدام معالجة اللغة الطبيعية وخوارزميات التعلم الآلي.",
      image:
        "https://cdn.prod.website-files.com/655a78032f46f2e55da300ff/65fc77ffc1b3e8c5026c222e_amryasser65fc73238d0a6.webp",
      achievements: [
        "Built first chatbot at age 11",
        "Won regional coding competition",
        "Mentoring 5 younger students",
        "Featured in tech magazine",
      ],
      achievementsAr: [
        "بنى أول روبوت محادثة في عمر 11 سنة",
        "فاز في مسابقة البرمجة الإقليمية",
        "يشرف على 5 طلاب أصغر سناً",
        "ظهر في مجلة تقنية",
      ],
      videoUrl: "https://www.youtube.com/watch?v=upBKD20aZRE",
      portfolioUrl: "/portfolio/ahmed-hassan",
      month: "December",
      monthAr: "ديسمبر",
      year: 2024,
    },
    {
      id: "2",
      name: "Sara Mohamed",
      nameAr: "سارة محمد",
      age: 14,
      project: "Smart Home Controller",
      projectAr: "جهاز التحكم في المنزل الذكي",
      description:
        "Developed a comprehensive smart home system that controls lighting, temperature, and security using IoT devices and mobile app interface.",
      descriptionAr:
        "طورت نظام منزل ذكي شامل يتحكم في الإضاءة ودرجة الحرارة والأمان باستخدام أجهزة إنترنت الأشياء وواجهة تطبيق الهاتف المحمول.",
      image:
        "https://cdn.prod.website-files.com/655a78032f46f2e55da300ff/65fc77ff5f1b5602e0ad7ce7_adhamessam65fc730f4ff42.webp",
      achievements: [
        "Youngest IoT developer in program",
        "Patent application submitted",
        "Speaking at tech conferences",
        "50K+ app downloads",
      ],
      achievementsAr: [
        "أصغر مطورة إنترنت الأشياء في البرنامج",
        "تم تقديم طلب براءة اختراع",
        "تتحدث في مؤتمرات التكنولوجيا",
        "أكثر من 50 ألف تنزيل للتطبيق",
      ],
      videoUrl: "https://www.youtube.com/watch?v=upBKD20aZRE",
      portfolioUrl: "/portfolio/sara-mohamed",
      month: "November",
      monthAr: "نوفمبر",
      year: 2024,
    },
  ];

  const currentStar = starsData[currentStarIndex];

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentStarIndex((prev) => (prev + 1) % starsData.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isOpen, starsData.length]);

  const handleVideoClick = () => {
    if (currentStar.videoUrl) {
      window.open(currentStar.videoUrl, "_blank");
    }
  };

  const handlePortfolioClick = () => {
    if (currentStar.portfolioUrl) {
      window.open(currentStar.portfolioUrl, "_blank");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
            dir={direction}
          >
            <div className="relative w-full max-w-5xl bg-white dark:bg-[#1a1f37] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-10 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg`}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Header with Crown */}
              <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-8 text-center">
                {/* Floating sparkles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-white/60" />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10"
                >
                  <Crown className="w-16 h-16 text-white mx-auto mb-4" />
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {locale === "ar" ? "نجم الشهر" : "Star of the Month"}
                  </h1>
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg font-semibold">
                      {locale === "ar"
                        ? currentStar.monthAr
                        : currentStar.month}{" "}
                      {currentStar.year}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Main Content */}
              <div
                className={`flex flex-col lg:flex-row ${isRTL ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Student Image and Info */}
                <div className="lg:w-2/5 p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <motion.div
                    key={currentStarIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    {/* Student Photo */}
                    <div className="relative mb-6">
                      <div className="relative w-48 h-48 mx-auto">
                        <Image
                          src={currentStar.image}
                          alt={
                            locale === "ar"
                              ? currentStar.nameAr
                              : currentStar.name
                          }
                          fill
                          className="rounded-full object-cover border-4 border-white shadow-xl"
                        />
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Student Details */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {locale === "ar" ? currentStar.nameAr : currentStar.name}
                    </h2>
                    <div className="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-4">
                      {currentStar.age} {locale === "ar" ? "سنة" : "Years Old"}
                    </div>

                    {/* Project Title */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Code className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {locale === "ar"
                            ? "المشرو�� الحائز على الجائزة"
                            : "Award-Winning Project"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {locale === "ar"
                          ? currentStar.projectAr
                          : currentStar.project}
                      </h3>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {currentStar.videoUrl && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleVideoClick}
                          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <Play className="w-5 h-5" />
                          {locale === "ar"
                            ? "شاهد المشروع"
                            : "Watch Project Demo"}
                        </motion.button>
                      )}

                      {currentStar.portfolioUrl && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePortfolioClick}
                          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <ExternalLink className="w-5 h-5" />
                          {locale === "ar"
                            ? "زيارة الملف الشخصي"
                            : "Visit Portfolio"}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Project Description and Achievements */}
                <div className="lg:w-3/5 p-8">
                  <motion.div
                    key={currentStarIndex}
                    initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={isRTL ? "text-right" : "text-left"}
                  >
                    {/* Project Description */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Award className="w-6 h-6 text-purple-500" />
                        {locale === "ar"
                          ? "وصف المشروع"
                          : "Project Description"}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {locale === "ar"
                          ? currentStar.descriptionAr
                          : currentStar.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        {locale === "ar"
                          ? "الإنجازات البارزة"
                          : "Key Achievements"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(locale === "ar"
                          ? currentStar.achievementsAr
                          : currentStar.achievements
                        ).map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                          >
                            <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {achievement}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation indicators */}
                    {starsData.length > 1 && (
                      <div className="flex items-center justify-center gap-3 mt-8">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {locale === "ar" ? "نجوم أخرى:" : "Other Stars:"}
                        </span>
                        <div className="flex gap-2">
                          {starsData.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentStarIndex(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentStarIndex === index
                                  ? "bg-purple-500 w-6"
                                  : "bg-gray-300 dark:bg-gray-600 hover:bg-purple-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StarOfTheMonth;
