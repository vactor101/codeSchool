"use client";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  Star,
  Users,
  Clock,
  DollarSign,
  BookOpen,
  ChevronDown,
  X,
} from "lucide-react";

type Props = {};

interface Course {
  _id: string;
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: { url: string };
  ratings: number;
  purchased: number;
  categories: string;
  level: string;
  courseData: any[];
  created_at: string;
}

const CoursesContent = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [difficulty, setDifficulty] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const categories = categoriesData?.layout?.categories || [];

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

  // Initialize courses
  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
      setFilteredCourses(data.courses);
    }
  }, [data]);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...courses];

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter((course) => course.categories === category);
    }

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Difficulty filter
    if (difficulty !== "all") {
      filtered = filtered.filter((course) => course.level === difficulty);
    }

    // Price range filter
    filtered = filtered.filter(
      (course) =>
        course.price >= priceRange[0] && course.price <= priceRange[1],
    );

    // Sorting
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.purchased - a.purchased);
        break;
      case "rating":
        filtered.sort((a, b) => b.ratings - a.ratings);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [courses, category, searchTerm, difficulty, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage,
  );

  const clearFilters = () => {
    setCategory("All");
    setSearchTerm("");
    setDifficulty("all");
    setPriceRange([0, 1000]);
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43]">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Heading
            title={`${t("courses.title")} - Code School`}
            description="Discover our comprehensive programming courses designed for all skill levels"
            keywords="programming courses, coding bootcamp, web development, mobile development, data science"
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />

          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
            dir={direction}
          >
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1
                className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar" ? "اكتشف دوراتنا" : "Discover Our Courses"}
              </h1>
              <p
                className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar"
                  ? "تعلم البرمجة مع خبرائنا المعتمدين وابني مهاراتك التقنية خطوة بخطوة"
                  : "Learn programming with our certified experts and build your technical skills step by step"}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] mx-auto mt-6"></div>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-[#1a1f37] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
            >
              <div
                className={`flex flex-col lg:flex-row gap-4 ${isRTL ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Search */}
                <div className="flex-1 relative">
                  <Search
                    className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
                  />
                  <input
                    type="text"
                    placeholder={
                      locale === "ar"
                        ? "ابحث عن الدورات..."
                        : "Search courses..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-transparent dark:bg-gray-800 text-gray-900 dark:text-white`}
                    dir={direction}
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-gray-700 text-[#b886f2] shadow-sm"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    {locale === "ar" ? "شبكة" : "Grid"}
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-white dark:bg-gray-700 text-[#b886f2] shadow-sm"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <List className="w-4 h-4" />
                    {locale === "ar" ? "قائمة" : "List"}
                  </button>
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {locale === "ar" ? "الفلاتر" : "Filters"}
                </button>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                      <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {/* Category Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {locale === "ar" ? "الفئة" : "Category"}
                          </label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#b886f2] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="All">
                              {locale === "ar"
                                ? "جميع الفئات"
                                : "All Categories"}
                            </option>
                            {categories.map((cat: any, index: number) => (
                              <option key={index} value={cat.title}>
                                {cat.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {locale === "ar" ? "المستوى" : "Difficulty"}
                          </label>
                          <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#b886f2] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#b886f2] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                            {locale === "ar" ? "إعادة تعيين" : "Reset"}
                          </label>
                          <button
                            onClick={clearFilters}
                            className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                          >
                            {locale === "ar" ? "مسح الفلاتر" : "Clear Filters"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Active Filters */}
            {(category !== "All" || searchTerm || difficulty !== "all") && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {category !== "All" && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-[#b886f2] text-white rounded-full text-sm">
                    {locale === "ar" ? "الفئة:" : "Category:"} {category}
                    <button onClick={() => setCategory("All")}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-[#b886f2] text-white rounded-full text-sm">
                    {locale === "ar" ? "البحث:" : "Search:"} {searchTerm}
                    <button onClick={() => setSearchTerm("")}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {difficulty !== "all" && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-[#b886f2] text-white rounded-full text-sm">
                    {locale === "ar" ? "المستوى:" : "Level:"}{" "}
                    {
                      difficultyLevels.find((d) => d.value === difficulty)
                        ?.label
                    }
                    <button onClick={() => setDifficulty("all")}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </motion.div>
            )}

            {/* Results Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`flex items-center justify-between mb-8 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <p className="text-gray-600 dark:text-gray-300">
                {locale === "ar"
                  ? `عرض ${startIndex + 1}-${Math.min(startIndex + coursesPerPage, filteredCourses.length)} من ${filteredCourses.length} دورة`
                  : `Showing ${startIndex + 1}-${Math.min(startIndex + coursesPerPage, filteredCourses.length)} of ${filteredCourses.length} courses`}
              </p>
            </motion.div>

            {/* Courses Grid/List */}
            <AnimatePresence initial={false}>
              {filteredCourses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <BookOpen className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {locale === "ar"
                      ? "لم يتم العثور على دورات"
                      : "No Courses Found"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {searchTerm
                      ? locale === "ar"
                        ? "جرب تغيير كلمات البحث أو الفلاتر"
                        : "Try changing your search terms or filters"
                      : locale === "ar"
                        ? "لا توجد دورات في هذه الفئة حالياً"
                        : "No courses found in this category. Please try another one!"}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    {locale === "ar" ? "مسح جميع الفلاتر" : "Clear All Filters"}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className={`grid gap-6 mb-12 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {currentCourses.map((course, index) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <CourseCard item={course} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filteredCourses.length > coursesPerPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {locale === "ar" ? "السابق" : "Previous"}
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white"
                        : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {locale === "ar" ? "التالي" : "Next"}
                </button>
              </motion.div>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

const Page = (props: Props) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      }
    >
      <CoursesContent {...props} />
    </Suspense>
  );
};

export default Page;
