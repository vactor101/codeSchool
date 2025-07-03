import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import {
  AiOutlineUnorderedList,
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineStar,
  AiOutlinePlayCircle,
  AiOutlineTag,
} from "react-icons/ai";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  DollarSign,
  Award,
  TrendingUp,
  Play,
} from "lucide-react";

type Props = {
  item: any;
  isProfile?: boolean;
  viewMode?: "grid" | "list";
};

const CourseCard: FC<Props> = ({ item, isProfile, viewMode = "grid" }) => {
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  const formatPrice = (price: number) => {
    if (price === 0) return locale === "ar" ? "مجاني" : "Free";
    return locale === "ar" ? `${price} ج.م` : `$${price}`;
  };

  const formatStudents = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getDifficultyLabel = (level: string) => {
    const levels: Record<string, { ar: string; en: string; color: string }> = {
      beginner: { ar: "مبتدئ", en: "Beginner", color: "bg-green-500" },
      intermediate: { ar: "متوسط", en: "Intermediate", color: "bg-yellow-500" },
      advanced: { ar: "متقدم", en: "Advanced", color: "bg-red-500" },
    };

    const levelData = levels[level?.toLowerCase()] || levels["beginner"];
    return {
      label: locale === "ar" ? levelData.ar : levelData.en,
      color: levelData.color,
    };
  };

  const difficulty = getDifficultyLabel(item.level);

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <Link
          href={
            !isProfile ? `/course/${item._id}` : `course-access/${item._id}`
          }
          className="block"
          aria-label={`View ${item.name} course`}
        >
          <div
            className={`bg-white dark:bg-[#1a1f37] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden ${isRTL ? "flex-row-reverse" : ""} flex`}
          >
            {/* Image */}
            <div className="relative w-80 h-48 flex-shrink-0 overflow-hidden">
              <Image
                src={item.thumbnail?.url || "/assests/placeholder-course.jpg"}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Difficulty Badge */}
              <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"}`}>
                <span
                  className={`px-2 py-1 text-xs font-medium text-white rounded-full ${difficulty.color}`}
                >
                  {difficulty.label}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3
                    className={`text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#b886f2] transition-colors duration-300 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {item.name}
                  </h3>

                  {item.description && (
                    <p
                      className={`text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className={`${isRTL ? "mr-4" : "ml-4"} text-right`}>
                  <div className="text-2xl font-bold text-[#b886f2]">
                    {formatPrice(item.price)}
                  </div>
                  {item.estimatedPrice > 0 &&
                    item.price < item.estimatedPrice && (
                      <div className="text-sm line-through text-gray-500">
                        {formatPrice(item.estimatedPrice)}
                      </div>
                    )}
                </div>
              </div>

              {/* Stats */}
              <div
                className={`flex flex-wrap gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Ratings rating={item.ratings} />
                  <span className="text-sm">({item.ratings})</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    {formatStudents(item.purchased)}{" "}
                    {locale === "ar" ? "طالب" : "students"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">
                    {item.courseData?.length || 0}{" "}
                    {locale === "ar" ? "درس" : "lessons"}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {item.categories && (
                <div className="flex items-center gap-2 mb-4">
                  <AiOutlineTag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item.categories}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Link
        href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
        className="block h-full"
        aria-label={`View ${item.name} course`}
      >
        <div className="h-full flex flex-col bg-white dark:bg-[#1a1f37] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Thumbnail Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={item.thumbnail?.url || "/assests/placeholder-course.jpg"}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Difficulty Badge */}
            <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"}`}>
              <span
                className={`px-2 py-1 text-xs font-medium text-white rounded-full ${difficulty.color}`}
              >
                {difficulty.label}
              </span>
            </div>

            {/* Free/Sale Badge */}
            {item.price === 0 && (
              <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"}`}>
                <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                  {locale === "ar" ? "مجاني" : "FREE"}
                </span>
              </div>
            )}

            {item.estimatedPrice > 0 && item.price < item.estimatedPrice && (
              <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"}`}>
                <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                  {locale === "ar" ? "خصم" : "SALE"}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Category */}
            {item.categories && (
              <div className="flex items-center gap-2 mb-3">
                <AiOutlineTag className="w-4 h-4 text-[#b886f2]" />
                <span className="text-sm text-[#b886f2] font-medium">
                  {item.categories}
                </span>
              </div>
            )}

            {/* Course Title */}
            <h3
              className={`text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#b886f2] transition-colors duration-300 flex-grow ${isRTL ? "text-right" : "text-left"}`}
            >
              {item.name}
            </h3>

            {/* Description */}
            {item.description && (
              <p
                className={`text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 ${isRTL ? "text-right" : "text-left"}`}
              >
                {item.description}
              </p>
            )}

            {/* Rating and Students */}
            <div
              className={`flex items-center justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="flex items-center gap-2">
                <Ratings rating={item.ratings} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ({item.ratings})
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  {formatStudents(item.purchased)}
                </span>
              </div>
            </div>

            {/* Course Stats */}
            <div
              className={`flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>
                  {item.courseData?.length || 0}{" "}
                  {locale === "ar" ? "درس" : "lessons"}
                </span>
              </div>

              {item.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{item.duration}</span>
                </div>
              )}
            </div>

            {/* Price and Enrollment */}
            <div
              className={`flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#b886f2]">
                  {formatPrice(item.price)}
                </span>
                {item.estimatedPrice > 0 &&
                  item.price < item.estimatedPrice && (
                    <span className="text-sm line-through text-gray-500">
                      {formatPrice(item.estimatedPrice)}
                    </span>
                  )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
              >
                {locale === "ar" ? "عرض التفاصيل" : "View Details"}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
