import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import Loader from "../Loader/Loader";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  TrendingUp,
  Star,
  Users,
} from "lucide-react";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  useEffect(() => {
    if (data?.courses) {
      // Show only first 8 courses on homepage
      setCourses(data.courses.slice(0, 8));
    }
  }, [data]);

  const stats = [
    {
      icon: BookOpen,
      number: data?.courses?.length || 0,
      label: locale === "ar" ? "دورة تدريبية" : "Courses Available",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      number:
        data?.courses?.reduce(
          (total: number, course: any) => total + (course.purchased || 0),
          0,
        ) || 0,
      label: locale === "ar" ? "طالب مسجل" : "Enrolled Students",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Star,
      number: "4.9",
      label: locale === "ar" ? "متوسط التقييم" : "Average Rating",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: locale === "ar" ? "معدل إكمال الدورات" : "Completion Rate",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <section
      className="w-full py-16 lg:py-24 bg-gray-50 dark:bg-[#0a0f1c]"
      dir={direction}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : (
          <>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar"
                  ? "اكتشف دوراتنا المميزة"
                  : "Discover Our Featured Courses"}
              </h2>
              <p
                className={`text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar"
                  ? "في مدرسة البرمجة، طورنا برنامجاً تفاعلياً وممتعاً لمساعدة طفلك على تعلم البرمجة بطريقة احترافية"
                  : "At Code School, we have developed a fun, interactive program that will help your child learn to code professionally"}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] mx-auto mt-8"></div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-[#1a1f37] rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {typeof stat.number === "number"
                      ? formatNumber(stat.number)
                      : stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Featured Courses */}
            {courses && courses.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
                >
                  {courses.map((course, index) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <CourseCard item={course} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* View All Courses Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-center"
                >
                  <Link href="/courses">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      {locale === "ar"
                        ? "عرض جميع الدورات"
                        : "View All Courses"}
                      {isRTL ? (
                        <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" />
                      ) : (
                        <ArrowRight className="w-5 h-5 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                    </motion.button>
                  </Link>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center py-20"
              >
                <BookOpen className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {locale === "ar"
                    ? "قريباً.. دورات جديدة ومثيرة!"
                    : "Coming Soon.. New and Exciting Courses!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {locale === "ar"
                    ? "نحن نعمل بجد لإعداد أفضل الدورات التدريبية لك. تابعنا للحصول على آخر التحديثات."
                    : "We are working hard to prepare the best courses for you. Follow us for the latest updates."}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Courses;
