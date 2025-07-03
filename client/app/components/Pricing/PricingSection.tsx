"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Star,
  Trophy,
  Calendar,
  Users,
  Award,
  Gift,
  Clock,
  BookOpen,
  Code2,
  Target,
  Zap,
  ShoppingCart,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";

interface PricingPlan {
  id: string;
  title: string;
  titleAr: string;
  ageGroup: string;
  ageGroupAr: string;
  duration: string;
  durationAr: string;
  originalPrice: number;
  price: number;
  currency: string;
  pricePerClass: number;
  totalClasses: number;
  features: string[];
  featuresAr: string[];
  bonusFeatures: string[];
  bonusFeaturesAr: string[];
  isPopular?: boolean;
  savings?: string;
  savingsAr?: string;
  icon: React.ElementType;
  color: string;
}

const PricingSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { theme } = useTheme();
  const { t, locale } = useTranslation();
  const { isRTL } = useDirection();

  const pricingPlans: PricingPlan[] = [
    {
      id: "starter-5-8",
      title: "Starter Journey",
      titleAr: "رحلة البداية",
      ageGroup: "5-8 Years",
      ageGroupAr: "5-8 سنوات",
      duration: "2 Months",
      durationAr: "شهرين",
      originalPrice: 2000,
      price: 1500,
      currency: "EGP",
      pricePerClass: 94,
      totalClasses: 16,
      features: [
        "16 Live Interactive Sessions",
        "Scratch Programming Basics",
        "Fun Coding Games & Activities",
        "Digital Certificate",
        "Parent Progress Reports",
      ],
      featuresAr: [
        "16 جلسة تفاعلية مباشرة",
        "أساسيات برمجة سكراتش",
        "ألعاب وأنشطة برمجة ممتعة",
        "شهادة رقمية",
        "تقارير تقدم للوالدين",
      ],
      bonusFeatures: ["Coding Storybook", "Parent Workshop Session"],
      bonusFeaturesAr: ["كتاب قصص البرمجة", "جلسة ورشة عمل للوالدين"],
      savings: "Save 25%",
      savingsAr: "وفر 25%",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "explorer-9-13",
      title: "Explorer Path",
      titleAr: "مسار المستكشف",
      ageGroup: "9-13 Years",
      ageGroupAr: "9-13 سنة",
      duration: "3 Months",
      durationAr: "3 أشهر",
      originalPrice: 3600,
      price: 2500,
      currency: "EGP",
      pricePerClass: 104,
      totalClasses: 24,
      features: [
        "24 Live Coding Sessions",
        "Web Development (HTML/CSS/JS)",
        "3 Portfolio Projects",
        "Code Review & Feedback",
        "Industry Mentor Support",
        "Advanced Certificate",
      ],
      featuresAr: [
        "24 جلسة برمجة مباشرة",
        "تطوير المواقع (HTML/CSS/JS)",
        "3 مشاريع لملف الأعمال",
        "مراجعة الكود والتغذية الراجعة",
        "دعم مرشد صناعي",
        "شهادة متقدمة",
      ],
      bonusFeatures: [
        "GitHub Portfolio Setup",
        "Tech Industry Career Guide",
        "Exclusive Discord Community",
      ],
      bonusFeaturesAr: [
        "إعداد ملف أعمال GitHub",
        "دليل المهن في صناعة التكنولوجيا",
        "مجتمع Discord حصري",
      ],
      isPopular: true,
      savings: "Save 30%",
      savingsAr: "وفر 30%",
      icon: Code2,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "mastery-14-18",
      title: "Developer Mastery",
      titleAr: "إتقان المطور",
      ageGroup: "14-18 Years",
      ageGroupAr: "14-18 سنة",
      duration: "4 Months",
      durationAr: "4 أشهر",
      originalPrice: 5200,
      price: 3500,
      currency: "EGP",
      pricePerClass: 109,
      totalClasses: 32,
      features: [
        "32 Professional Sessions",
        "Full-Stack Development",
        "5+ Real-World Projects",
        "Advanced Python/JavaScript",
        "1-on-1 Mentoring Sessions",
        "Job Interview Preparation",
        "Professional Certificate",
      ],
      featuresAr: [
        "32 جلسة احترافية",
        "تطوير الحلول المتكاملة",
        "5+ مشاريع العالم الحقيقي",
        "��ايثون/جافاسكريبت متقدم",
        "جلسات إرشاد فردية",
        "التحضير لمقابلات العمل",
        "شهادة احترافية",
      ],
      bonusFeatures: [
        "LinkedIn Profile Optimization",
        "Freelancing Platform Setup",
        "Tech Startup Masterclass",
        "Alumni Network Access",
      ],
      bonusFeaturesAr: [
        "تحسين ملف LinkedIn",
        "إعداد منصة العمل الحر",
        "ماستركلاس الشركات الناشئة التقنية",
        "الوصول لشبكة الخريجين",
      ],
      savings: "Save 35%",
      savingsAr: "وفر 35%",
      icon: Trophy,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const categories = [
    { id: "all", label: "All Plans", labelAr: "جميع الخطط" },
    { id: "5-8", label: "5-8 Years", labelAr: "5-8 سنوات" },
    { id: "9-13", label: "9-13 Years", labelAr: "9-13 سنة" },
    { id: "14-18", label: "14-18 Years", labelAr: "14-18 سنة" },
  ];

  const filteredPlans =
    selectedCategory === "all"
      ? pricingPlans
      : pricingPlans.filter((plan) => plan.ageGroup.includes(selectedCategory));

  const handleEnrollment = (planId: string) => {
    console.log("Enrolling in plan:", planId);
    // Handle enrollment logic here
  };

  return (
    <div
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#070b1b] to-[#111C43]"
          : "bg-gradient-to-b from-gray-50 to-white"
      } ${isRTL ? "text-right" : "text-left"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] bg-clip-text text-transparent">
            {locale === "ar" ? "خطط الأسعار" : "Pricing Plans"}
          </h2>
          <p
            className={`text-xl lg:text-2xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {locale === "ar"
              ? "اختر الخطة المثالية لرحلة طفلك في تعلم البر��جة"
              : "Choose the perfect plan for your child's coding journey"}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div
            className={`inline-flex p-1 rounded-2xl ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white shadow-lg"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {locale === "ar" ? category.labelAr : category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                whileHover={{ y: -10 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  plan.isPopular
                    ? "border-2 border-[#b886f2] shadow-2xl scale-105"
                    : "border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl"
                } ${
                  theme === "dark"
                    ? "bg-gradient-to-b from-gray-800 to-gray-900"
                    : "bg-white"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {locale === "ar" ? "الأكثر شعبية" : "Most Popular"}
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                  >
                    {React.createElement(plan.icon, {
                      className: "w-8 h-8 text-white",
                    })}
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {locale === "ar" ? plan.titleAr : plan.title}
                  </h3>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-[#b886f2]" />
                    <span
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {locale === "ar" ? plan.ageGroupAr : plan.ageGroup}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-[#b886f2]" />
                    <span
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {locale === "ar" ? plan.durationAr : plan.duration}
                    </span>
                  </div>

                  <div className="mb-4">
                    {plan.originalPrice && (
                      <span
                        className={`text-lg line-through ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {plan.originalPrice} {plan.currency}
                      </span>
                    )}
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold bg-gradient-to-r from-[#b886f2] to-[#ed82c3] bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span
                        className={`text-lg ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {plan.currency}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {plan.pricePerClass} {plan.currency}{" "}
                      {locale === "ar" ? "لكل جلسة" : "per class"}
                    </p>
                  </div>

                  {plan.savings && (
                    <div className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                      <Gift className="w-4 h-4" />
                      {locale === "ar" ? plan.savingsAr : plan.savings}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  <h4
                    className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {locale === "ar" ? "المميزات الأساسية:" : "Core Features:"}
                  </h4>
                  {(locale === "ar" ? plan.featuresAr : plan.features).map(
                    (feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#b886f2] mt-0.5 flex-shrink-0" />
                        <span
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ),
                  )}
                </div>

                {/* Bonus Features */}
                {plan.bonusFeatures.length > 0 && (
                  <div className="space-y-4 mb-8 p-4 rounded-xl bg-gradient-to-r from-[#b886f2]/10 to-[#ed82c3]/10">
                    <h4
                      className={`font-semibold flex items-center gap-2 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <Gift className="w-4 h-4 text-[#b886f2]" />
                      {locale === "ar" ? "مميزات إضافية:" : "Bonus Features:"}
                    </h4>
                    {(locale === "ar"
                      ? plan.bonusFeaturesAr
                      : plan.bonusFeatures
                    ).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Star className="w-4 h-4 text-[#ed82c3] mt-0.5 flex-shrink-0" />
                        <span
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEnrollment(plan.id)}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white shadow-lg hover:shadow-xl"
                      : theme === "dark"
                        ? "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {locale === "ar" ? "ابدأ الآن" : "Get Started"}
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-16 text-center p-8 rounded-2xl ${
            theme === "dark"
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {locale === "ar" ? "ضمان استرداد الأموال" : "Money-Back Guarantee"}
          </h3>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {locale === "ar"
              ? "نحن واثقون من جودة دوراتنا. إذا لم تكن راضياً خلال أول أسبوعين، سنعيد لك أموالك كاملة."
              : "We're confident in our course quality. If you're not satisfied within the first two weeks, we'll refund your money completely."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingSection;
