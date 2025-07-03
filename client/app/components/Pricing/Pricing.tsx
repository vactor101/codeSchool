"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Calendar,
  BookOpen,
  Gift,
  LifeBuoy,
  Code2,
  Star,
  Trophy,
  Clock,
  ShoppingCart,
  Calculator,
  UserCircle,
  Users,
  User,
  Globe,
  MessageCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface PricingPlan {
  id: string;
  title: string;
  titleAr: string;
  originalPrice?: string;
  price: string;
  perClassPrice: string;
  duration: string;
  classes: string;
  ageGroup: string;
  curriculum: Array<{
    level: string;
    levelAr: string;
    items: string[];
    itemsAr: string[];
  }>;
  bonusFeatures: string[];
  bonusFeaturesAr: string[];
  isPopular?: boolean;
  groupSize?: string;
  groupSizeAr?: string;
}

interface PricingCategory {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ElementType;
  isActive: boolean;
  plans: PricingPlan[];
}

const PricingCard = ({
  plan,
  locale,
  theme,
  onPurchase,
}: {
  plan: PricingPlan;
  locale: string;
  theme: string | undefined;
  onPurchase: (planId: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`
        relative rounded-xl p-8 shadow-lg hover:shadow-xl transition-all
        transform duration-300
        ${plan.isPopular ? "border-2 border-[#b886f2] scale-105" : "border border-gray-200 dark:border-gray-700"}
        hover:border-[#b886f2] h-full flex flex-col
        ${theme === "dark" ? "bg-gradient-to-b from-[#1a1f37] to-[#0d1127]" : "bg-white"}
        group
      `}
    >
      {plan.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-105">
          <span className="bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
            {locale === "ar" ? "الأفضل قيمة" : "Best Value"}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`text-2xl font-bold mb-4 flex items-center gap-2 
          transition-colors duration-300
          ${theme === "dark" ? "text-white group-hover:text-[#cda2ff]" : "text-[#b886f2] group-hover:text-[#9c6ad1]"}`}
        >
          <Trophy className="w-6 h-6 text-[#b886f2] group-hover:text-[#cda2ff] transition-colors" />
          {locale === "ar" ? plan.titleAr : plan.title}
        </h3>

        <div className="text-left space-y-2 mb-6">
          {plan.originalPrice && (
            <div
              className={`text-lg ${
                theme === "dark" ? "text-gray-400" : "text-gray-400"
              } line-through`}
            >
              EGP {plan.originalPrice}
            </div>
          )}
          <div
            className={`text-4xl font-bold ${
              theme === "dark" ? "text-[#b886f2]" : "text-[#b886f2]"
            }`}
          >
            EGP {plan.price}
          </div>
          <div
            className={`flex items-center gap-1 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <span>{locale === "ar" ? "للفصل الواحد" : "Per class"}</span>
            <span className="font-medium">EGP {plan.perClassPrice}</span>
            <Calculator className="w-4 h-4" />
          </div>
        </div>

        <div
          className={`rounded-lg p-4 mb-6 ${
            theme === "dark" ? "bg-[#0d1127]" : "bg-gray-50"
          }`}
        >
          <div
            className={`flex items-center gap-2 mb-3 ${
              theme === "dark" ? "text-gray-300" : "text-[#b886f2]"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{plan.duration}</span>
            <span>-</span>
            <Clock className="w-5 h-5" />
            <span className="font-medium">{plan.classes}</span>
          </div>

          <div
            className={`flex items-center gap-2 mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-[#b886f2]"
            }`}
          >
            <UserCircle className="w-5 h-5" />
            <span>{plan.ageGroup}</span>
          </div>

          {plan.groupSize && (
            <div
              className={`flex items-center gap-2 ${
                theme === "dark" ? "text-gray-300" : "text-[#b886f2]"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>{locale === "ar" ? plan.groupSizeAr : plan.groupSize}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 flex-1 space-y-6">
        <div>
          <h4
            className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#b886f2]"
            }`}
          >
            <BookOpen className="w-5 h-5 text-[#b886f2]" />
            {locale === "ar" ? "المنهج يشمل:" : "Curriculum Includes:"}
          </h4>
          {plan.curriculum.map((level, index) => (
            <div key={index} className="mb-4">
              <div
                className={`flex items-center gap-2 font-medium mb-2 ${
                  theme === "dark" ? "text-[#b886f2]" : "text-[#b886f2]"
                }`}
              >
                <Code2 className="w-5 h-5" />
                {locale === "ar" ? level.levelAr : level.level}
              </div>
              <ul className="space-y-2">
                {(locale === "ar" ? level.itemsAr : level.items).map(
                  (item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-gray-300" : "text-[#b886f2]"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h4
            className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#b886f2]"
            }`}
          >
            <Gift className="w-5 h-5 text-[#b886f2]" />
            {locale === "ar" ? "المميزات الإضافية:" : "Bonus Features:"}
          </h4>
          <ul className="space-y-2">
            {(locale === "ar" ? plan.bonusFeaturesAr : plan.bonusFeatures).map(
              (feature, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 ${
                    theme === "dark" ? "text-gray-300" : "text-[#b886f2]"
                  }`}
                >
                  <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onPurchase(plan.id)}
        className={`
          w-full py-3.5 rounded-lg font-semibold transition-all
          ${
            plan.isPopular
              ? "bg-gradient-to-r from-[#b886f2] to-[#ed82c3] hover:from-[#a575e8] hover:to-[#de6eb8] text-white shadow-md hover:shadow-lg"
              : theme === "dark"
                ? "bg-[#b886f2] hover:bg-[#9c6ad1] text-white"
                : "bg-[#b886f2] hover:bg-[#9c6ad1] text-white"
          }
          flex items-center justify-center gap-2
          transform hover:scale-[1.02] active:scale-95
        `}
      >
        <ShoppingCart className="w-5 h-5" />
        {locale === "ar" ? "اشتري الآن" : "Buy Now"}
      </motion.button>
    </motion.div>
  );
};

const PricingSection = () => {
  const { theme } = useTheme();
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();
  const [activeCategory, setActiveCategory] = useState("arabic");

  const handleWhatsAppContact = () => {
    const number = "201140474129";
    const message =
      locale === "ar"
        ? encodeURIComponent(
            "مرحبًا! أريد الاستفسار عن خطط الأسعار ومعرفة المزيد عن الدورات.",
          )
        : encodeURIComponent(
            "Hello! I would like to inquire about pricing plans and learn more about the courses.",
          );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  const handlePurchase = (planId: string) => {
    // Handle purchase logic here
    console.log("Purchasing plan:", planId);
    handleWhatsAppContact();
  };

  const categories: PricingCategory[] = [
    {
      id: "arabic",
      title: "Arabic Courses",
      titleAr: "الدورات العربية",
      description: "Group classes (4-6 children of same age)",
      descriptionAr: "فصول جماعية (4-6 أطفال من نفس العمر)",
      icon: Globe,
      isActive: true,
      plans: [
        {
          id: "arabic-3m",
          title: "Arabic Beginner",
          titleAr: "عربي مبتدئ",
          price: "5900",
          perClassPrice: "491",
          duration: locale === "ar" ? "3 أشهر" : "3 months",
          classes: locale === "ar" ? "12 فصل مباشر" : "12 Live Classes",
          ageGroup: locale === "ar" ? "6-7 سنوات" : "6-7 Years Old",
          groupSize: "4-6 children per group",
          groupSizeAr: "4-6 أطفال في المجموعة",
          curriculum: [
            {
              level: "Technology Around Us",
              levelAr: "التكنولوجيا من حولنا",
              items: [
                "Identify tech types in daily life",
                "Explain daily tech benefits and uses",
                "Spot computer parts and components",
                "Demonstrate programming skills",
              ],
              itemsAr: [
                "تحديد أنواع التكنولوجيا في الحياة اليومية",
                "شرح فوائد واستخدامات التكنولوجيا اليومية",
                "تحديد أجزاء ومكونات الكمبيوتر",
                "إظهار مهارات البرمجة",
              ],
            },
          ],
          bonusFeatures: ["1 Class Freeze", "Arabic Learning Materials"],
          bonusFeaturesAr: ["تجميد فصل واحد", "مواد تعليمية باللغة العربية"],
        },
        {
          id: "arabic-6m",
          title: "Arabic Advanced",
          titleAr: "عربي متقدم",
          originalPrice: "11800",
          price: "10800",
          perClassPrice: "450",
          duration: locale === "ar" ? "6 أشهر" : "6 months",
          classes: locale === "ar" ? "24 فصل مباشر" : "24 Live Classes",
          ageGroup: locale === "ar" ? "6-7 سنوات" : "6-7 Years Old",
          groupSize: "4-6 children per group",
          groupSizeAr: "4-6 أطفال في المجموعة",
          curriculum: [
            {
              level: "Creative Computing",
              levelAr: "الحوسبة الإبداعية",
              items: [
                "Apply new Scratch Jr. blocks",
                "Enhance problem-solving skills",
                "Utilize Scratch Jr. for problem-solving",
                "Express ideas through programming",
              ],
              itemsAr: [
                "تطبيق كتل Scratch Jr الجديدة",
                "تعزيز مهارات حل المشكلات",
                "استخدام Scratch Jr لحل ��لمشكلات",
                "التعبير عن الأفكار من خلال البرمجة",
              ],
            },
          ],
          bonusFeatures: [
            "2 Class Freeze",
            "Parent support",
            "Arabic Projects",
          ],
          bonusFeaturesAr: ["تجميد فصلين", "دعم أولياء الأمور", "مشاريع عربية"],
          isPopular: true,
        },
        {
          id: "arabic-9m",
          title: "Arabic Expert",
          titleAr: "عربي خبير",
          originalPrice: "23600",
          price: "18800",
          perClassPrice: "391",
          duration: locale === "ar" ? "9 أشهر" : "9 months",
          classes: locale === "ar" ? "48 فصل مباشر" : "48 Live Classes",
          ageGroup: locale === "ar" ? "6-7 سنوات" : "6-7 Years Old",
          groupSize: "4-6 children per group",
          groupSizeAr: "4-6 أطفال في المجموعة",
          curriculum: [
            {
              level: "Advanced Programming",
              levelAr: "البرمجة المتقدمة",
              items: [
                "Master programming fundamentals",
                "Create complex interactive projects",
                "Develop problem-solving algorithms",
                "Build portfolio projects",
              ],
              itemsAr: [
                "إتقان أساسيات البرمجة",
                "إنشاء مشاريع تفاعلية معقدة",
                "تطوير خوارزميات حل المشكلات",
                "بناء مشاريع المحفظة",
              ],
            },
          ],
          bonusFeatures: [
            "4 Class Freeze",
            "Parent support",
            "Full Grade pack",
            "Arabic Certification",
          ],
          bonusFeaturesAr: [
            "تجميد 4 فصول",
            "دعم أولياء الأمور",
            "حزمة الصف الكاملة",
            "شهادة باللغة العربية",
          ],
        },
      ],
    },
    {
      id: "onetoone",
      title: "One-to-One Courses",
      titleAr: "الدورات الفردية",
      description: "Private personalized instruction",
      descriptionAr: "تعليم خاص ومخصص",
      icon: User,
      isActive: true,
      plans: [
        {
          id: "onetoone-3m",
          title: "Private Beginner",
          titleAr: "خاص مبتدئ",
          price: "11800",
          perClassPrice: "983",
          duration: locale === "ar" ? "3 أشهر" : "3 months",
          classes: locale === "ar" ? "12 فصل خاص" : "12 Private Classes",
          ageGroup: locale === "ar" ? "6-12 سنة" : "6-12 Years Old",
          groupSize: "1-on-1 instruction",
          groupSizeAr: "تعليم فردي",
          curriculum: [
            {
              level: "Personalized Learning",
              levelAr: "تعلم مخصص",
              items: [
                "Customized curriculum pace",
                "Individual attention",
                "Flexible scheduling",
                "Personal project development",
              ],
              itemsAr: [
                "وتيرة منهج مخصصة",
                "اهتمام فردي",
                "جدولة مرنة",
                "تطوير مشروع شخصي",
              ],
            },
          ],
          bonusFeatures: [
            "Flexible timing",
            "Personalized curriculum",
            "Direct mentor access",
          ],
          bonusFeaturesAr: ["توقيت مرن", "منهج مخصص", "وصول مباشر للمرشد"],
        },
        {
          id: "onetoone-6m",
          title: "Private Advanced",
          titleAr: "خاص متقدم",
          originalPrice: "23600",
          price: "21200",
          perClassPrice: "883",
          duration: locale === "ar" ? "6 أشهر" : "6 months",
          classes: locale === "ar" ? "24 فصل خاص" : "24 Private Classes",
          ageGroup: locale === "ar" ? "6-12 سنة" : "6-12 Years Old",
          groupSize: "1-on-1 instruction",
          groupSizeAr: "تعليم فردي",
          curriculum: [
            {
              level: "Advanced Individual Training",
              levelAr: "تدريب فردي متقدم",
              items: [
                "Advanced project development",
                "Portfolio building",
                "Competition preparation",
                "Mentor guidance",
              ],
              itemsAr: [
                "تطوير مشاريع متقدمة",
                "بناء المحفظة",
                "التحضير للمسابقات",
                "إرشاد المرشد",
              ],
            },
          ],
          bonusFeatures: [
            "Priority support",
            "Portfolio development",
            "Competition training",
            "Flexible schedule",
          ],
          bonusFeaturesAr: [
            "دعم أولوية",
            "تطوير المحفظة",
            "تدريب المسابقات",
            "جدول مرن",
          ],
          isPopular: true,
        },
        {
          id: "onetoone-9m",
          title: "Private Expert",
          titleAr: "خاص خبير",
          originalPrice: "47200",
          price: "37700",
          perClassPrice: "785",
          duration: locale === "ar" ? "9 أشهر" : "9 months",
          classes: locale === "ar" ? "48 فصل خاص" : "48 Private Classes",
          ageGroup: locale === "ar" ? "6-12 سنة" : "6-12 Years Old",
          groupSize: "1-on-1 instruction",
          groupSizeAr: "تعليم فردي",
          curriculum: [
            {
              level: "Expert Individual Development",
              levelAr: "تطوير فردي خبير",
              items: [
                "Complete portfolio development",
                "Advanced programming concepts",
                "Industry project experience",
                "Career path guidance",
              ],
              itemsAr: [
                "تطوير محفظة كاملة",
                "مفاهيم برمجة متقدمة",
                "خبرة مشاريع الصناعة",
                "إرشاد المسار المهني",
              ],
            },
          ],
          bonusFeatures: [
            "Complete mentorship",
            "Industry projects",
            "Career guidance",
            "Alumni network access",
          ],
          bonusFeaturesAr: [
            "إرشاد كامل",
            "مشاريع الصناعة",
            "إرشاد مهني",
            "وصول لشبكة الخريجين",
          ],
        },
      ],
    },
    {
      id: "english",
      title: "English Courses",
      titleAr: "الدورات الإنجليزية",
      description: "International curriculum (4-6 children)",
      descriptionAr: "منهج دولي (4-6 أطفال)",
      icon: Globe,
      isActive: true,
      plans: [
        {
          id: "english-3m",
          title: "English Beginner",
          titleAr: "إنجليزي مبتدئ",
          price: "7900",
          perClassPrice: "658",
          duration: locale === "ar" ? "3 أشهر" : "3 months",
          classes: locale === "ar" ? "12 فصل مباشر" : "12 Live Classes",
          ageGroup: locale === "ar" ? "6-7 سنوات" : "6-7 Years Old",
          groupSize: "4-6 children per group",
          groupSizeAr: "4-6 أطفال في المجموعة",
          curriculum: [
            {
              level: "International Programming Foundation",
              levelAr: "أساسيات البرمجة الدولية",
              items: [
                "English programming terminology",
                "International coding standards",
                "Global project examples",
                "Cross-cultural programming concepts",
              ],
              itemsAr: [
                "مصطلحات البرمجة الإنجليزية",
                "معايير البرمجة الدولية",
                "أمثلة مشاريع عالمية",
                "مفاهيم البرمجة متعددة الثقافات",
              ],
            },
          ],
          bonusFeatures: [
            "1 Class Freeze",
            "English Learning Materials",
            "International certificate",
          ],
          bonusFeaturesAr: [
            "تجميد فصل واحد",
            "مواد تعليمية إنجليزية",
            "شهادة دولية",
          ],
        },
        {
          id: "english-6m",
          title: "English Advanced",
          titleAr: "إنجليزي متقدم",
          originalPrice: "15800",
          price: "14200",
          perClassPrice: "592",
          duration: locale === "ar" ? "6 أشهر" : "6 months",
          classes: locale === "ar" ? "24 فصل مباشر" : "24 Live Classes",
          ageGroup: locale === "ar" ? "6-7 سنوات" : "6-7 Years Old",
          groupSize: "4-6 children per group",
          groupSizeAr: "4-6 أطفال في المجموعة",
          curriculum: [
            {
              level: "Advanced International Computing",
              levelAr: "الحوسبة الدولية المتقدمة",
              items: [
                "Global programming platforms",
                "International project collaboration",
                "English technical communication",
                "Worldwide coding competitions",
              ],
              itemsAr: [
                "منصات البرمجة العالمية",
                "تعاون المشاريع الدولية",
                "التواصل التقني الإنجليزي",
                "مسابقات البرمجة العالمية",
              ],
            },
          ],
          bonusFeatures: [
            "2 Class Freeze",
            "Parent support",
            "Global projects",
            "English certificate",
          ],
          bonusFeaturesAr: [
            "تجميد فصلين",
            "دعم أولياء الأمور",
            "مشاريع عالمية",
            "شهادة إنجليزية",
          ],
          isPopular: true,
        },
        {
          id: "english-9m",
          title: "English Expert",
          titleAr: "إنجليزي خبير",
          originalPrice: "31600",
          price: "24800",
          perClassPrice: "517",
          duration: locale === "ar" ? "9 أشهر" : "9 months",
          classes: locale === "ar" ? "48 فصل مباشر" : "48 Live Classes",
          ageGroup: locale === "ar" ? "6-7 سنوات" : "6-7 Years Old",
          groupSize: "4-6 children per group",
          groupSizeAr: "4-6 أطفال في المجموعة",
          curriculum: [
            {
              level: "Expert International Programming",
              levelAr: "البرمجة الدولية الخبيرة",
              items: [
                "Advanced international standards",
                "Global industry practices",
                "International portfolio development",
                "Worldwide networking opportunities",
              ],
              itemsAr: [
                "معايير دولية متقدمة",
                "ممارسات الصناعة العالمية",
                "تطوير محفظة دولية",
                "فرص التواصل العالمية",
              ],
            },
          ],
          bonusFeatures: [
            "4 Class Freeze",
            "Global mentorship",
            "International certification",
            "Global competitions",
          ],
          bonusFeaturesAr: [
            "تجميد 4 فصول",
            "إرشاد عالمي",
            "شهادة دولية",
            "مسابقات عالمية",
          ],
        },
      ],
    },
  ];

  const activeCategories = categories.filter((cat) => cat.isActive);
  const currentCategory =
    activeCategories.find((cat) => cat.id === activeCategory) ||
    activeCategories[0];

  return (
    <div
      className={`py-16 bg-no-repeat duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#070b1b] to-[#111C43]"
          : "bg-white"
      }`}
      dir={direction}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-[#b886f2]"
            }`}
          >
            {locale === "ar" ? "خطط التعلم" : "Learning Plans"}
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {locale === "ar"
              ? "اختر الخطة المناسبة لطفلك وابدأ رحلة تعلم البرمجة اليوم"
              : "Choose the perfect plan for your child and start the coding journey today"}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] mx-auto mt-6"></div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {activeCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300
                transform hover:-translate-y-1 shadow-lg hover:shadow-xl
                ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white"
                    : theme === "dark"
                      ? "bg-[#1a1f37] text-gray-300 hover:bg-[#252a45] border border-gray-600"
                      : "bg-white text-[#b886f2] hover:bg-gray-50 border border-gray-200"
                }
              `}
            >
              <category.icon className="w-6 h-6" />
              <div className={`${isRTL ? "text-right" : "text-left"}`}>
                <div className="font-bold">
                  {locale === "ar" ? category.titleAr : category.title}
                </div>
                <div className="text-sm opacity-80">
                  {locale === "ar"
                    ? category.descriptionAr
                    : category.description}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {currentCategory.plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard
                plan={plan}
                locale={locale}
                theme={theme}
                onPurchase={handlePurchase}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppContact}
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <FaWhatsapp className="text-xl" />
            {locale === "ar"
              ? "راسلنا على واتساب للاستفسار"
              : "Message Us on WhatsApp"}
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`mt-12 text-center flex items-center justify-center gap-2 ${
            theme === "dark" ? "text-gray-300" : "text-[#b886f2]"
          }`}
        >
          <LifeBuoy className="w-5 h-5 text-[#b886f2]" />
          <span>
            {locale === "ar"
              ? "تحتاج مساعدة في اختيار الخطة؟"
              : "Need help choosing a plan?"}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleWhatsAppContact}
            className={`font-semibold flex items-center transition-colors duration-300 ${
              theme === "dark"
                ? "text-[#b886f2] hover:text-blue-300"
                : "text-[#b886f2] hover:text-[#9c6ad1]"
            }`}
          >
            {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            <ChevronDown className="h-4 w-4 mr-1 transform -rotate-90" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingSection;
