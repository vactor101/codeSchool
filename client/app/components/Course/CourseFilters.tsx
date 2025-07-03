"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { X, SlidersHorizontal } from "lucide-react";

interface CourseFiltersProps {
  categories: any[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  difficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  className?: string;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  className = "",
}) => {
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  const difficultyLevels = [
    { value: "all", label: locale === "ar" ? "جميع المستويات" : "All Levels" },
    { value: "beginner", label: locale === "ar" ? "مبتدئ" : "Beginner" },
    {
      value: "intermediate",
      label: locale === "ar" ? "متوسط" : "Intermediate",
    },
    { value: "advanced", label: locale === "ar" ? "متقدم" : "Advanced" },
  ];

  const sortOptions = [
    { value: "newest", label: locale === "ar" ? "الأحدث" : "Newest" },
    {
      value: "popular",
      label: locale === "ar" ? "الأكثر شيوعاً" : "Most Popular",
    },
    {
      value: "rating",
      label: locale === "ar" ? "الأعلى تقييماً" : "Highest Rated",
    },
    {
      value: "price-low",
      label: locale === "ar" ? "السعر: منخفض إلى مرتفع" : "Price: Low to High",
    },
    {
      value: "price-high",
      label: locale === "ar" ? "السعر: مرتفع إلى منخفض" : "Price: High to Low",
    },
  ];

  return (
    <div className={`${className}`} dir={direction}>
      {/* Category Pills */}
      <div className="mb-6">
        <h3
          className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
        >
          {locale === "ar" ? "الفئات" : "Categories"}
        </h3>
        <div
          className={`flex flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {locale === "ar" ? "جميع الفئات" : "All Categories"}
          </motion.button>

          {categories.map((category: any, index: number) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.title)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.title
                  ? "bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category.title}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isRTL ? "text-right" : "text-left"}`}
      >
        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "مستوى الصعوبة" : "Difficulty Level"}
          </label>
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {difficultyLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "ترتيب حسب" : "Sort By"}
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "إعادة تعيين" : "Reset Filters"}
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClearFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            {locale === "ar" ? "مسح الفلاتر" : "Clear Filters"}
          </motion.button>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mt-6">
        <label
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 ${isRTL ? "text-right" : "text-left"}`}
        >
          {locale === "ar"
            ? `نطاق السعر: $${priceRange[0]} - $${priceRange[1]}`
            : `Price Range: $${priceRange[0]} - $${priceRange[1]}`}
        </label>
        <div className="px-3">
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
            style={{
              background: `linear-gradient(to right, #b886f2 0%, #b886f2 ${(priceRange[1] / 1000) * 100}%, #e5e7eb ${(priceRange[1] / 1000) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;
