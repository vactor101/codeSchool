import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { GraduationCap, Award, Brain, Target } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import Image from "next/image";

const WhyCodeSchool = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const reasons = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#b886f2]" />,
      title: t("whyCodeSchool.leadingPlatform"),
      description: t("whyCodeSchool.leadingPlatformDesc"),
    },
    {
      icon: <Award className="w-6 h-6 text-[#b886f2]" />,
      title: t("whyCodeSchool.qualityContent"),
      description: t("whyCodeSchool.qualityContentDesc"),
    },
    {
      icon: <Brain className="w-6 h-6 text-[#b886f2]" />,
      title: t("whyCodeSchool.progressTracking"),
      description: t("whyCodeSchool.progressTrackingDesc"),
    },
  ];

  return (
    <div
      className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#070b1b] to-[#111C43]"
          : "bg-gray-50"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl font-bold mb-8            ${theme === "dark" ? "text-white" : "text-[#b886f2]"}
          `}
          >
            {t("whyCodeSchool.title")}
          </h2>
        </motion.div>

        {/* Hero Section */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between mb-16 gap-12 ${isRTL ? "md:flex-row-reverse" : ""}`}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 relative"
          >
            <div className="relative inline-block">
              <Image
                src="https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6574b02844aa8465a8aa9e31_tab1-img.webp"
                alt={t("whyCodeSchool.studentLearning")}
                width={500}
                height={400}
                className="rounded-lg w-full max-w-[500px] h-auto object-cover shadow-xl transform hover:scale-105 transition-transform duration-300 border-4 border-transparent bg-gradient-to-r from-[#b886f2] to-[#9c6ad1] p-1"
              />
              <div className="absolute inset-0 rounded-lg border-4 border-[#b886f2]/20 animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-start gap-4 p-6 rounded-xl transition-all duration-300 cursor-pointer
                  ${
                    theme === "dark"
                      ? "bg-[#1a1f37] hover:border-[#b886f2] border border-transparent"
                      : "bg-white hover:border-[#9c6ad1] border border-gray-200"
                  }
                  shadow-sm hover:shadow-lg ${isRTL ? "flex-row-reverse text-right" : "flex-row text-left"}`}
              >
                <div className="flex-shrink-0 p-3 bg-[#b886f2]/10 rounded-lg">
                  {React.cloneElement(reason.icon, {
                    className: `w-6 h-6 ${theme === "dark" ? "text-[#b886f2]" : "text-[#9c6ad1]"}`,
                  })}
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className={`mt-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhyCodeSchool;
