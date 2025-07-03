"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  GraduationCap,
  Users,
  Award,
  Globe,
  Code,
  Lightbulb,
  Target,
  Heart,
} from "lucide-react";

const AboutPage = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("About");
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  const stats = [
    { icon: Users, number: "130K+", label: t("hero.graduates") },
    { icon: Globe, number: "20+", label: "Countries" },
    { icon: Award, number: "250K+", label: t("hero.happyParents") },
    { icon: GraduationCap, number: "6M+", label: t("hero.trainingHours") },
  ];

  const values = [
    {
      icon: Code,
      title: locale === "ar" ? "التميز في التعليم" : "Educational Excellence",
      description:
        locale === "ar"
          ? "نسعى لتقديم أفضل المناهج التعليمية في البرمجة والتكنولوجيا"
          : "We strive to provide the best educational curricula in programming and technology",
    },
    {
      icon: Lightbulb,
      title: locale === "ar" ? "الإبداع والابتكار" : "Creativity & Innovation",
      description:
        locale === "ar"
          ? "نشجع الطلاب على التفكير الإبداعي وحل المشكلات بطرق مبتكرة"
          : "We encourage students to think creatively and solve problems in innovative ways",
    },
    {
      icon: Target,
      title: locale === "ar" ? "التعلم المخصص" : "Personalized Learning",
      description:
        locale === "ar"
          ? "نوفر تجربة تعليمية مخصصة لكل طالب حسب مستواه وأهدافه"
          : "We provide a personalized learning experience for each student based on their level and goals",
    },
    {
      icon: Heart,
      title: locale === "ar" ? "المجتمع والدعم" : "Community & Support",
      description:
        locale === "ar"
          ? "نبني مجتمعاً داعماً من المعلمين والطلاب وأولياء الأمور"
          : "We build a supportive community of teachers, students, and parents",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] transition-colors duration-500">
      <Heading
        title={`${t("nav.about")} - Code School`}
        description="Learn about Code School's mission to provide quality coding education for children and young adults"
        keywords="about code school, coding education, programming courses, technology learning"
      />
      {/* Centered Header */}
      <div className="flex justify-center w-full">
        <Header
          activeItem={2}
          open={open}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
        />
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8" dir={direction}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1
              className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {locale === "ar" ? "من نحن" : "About Code School"}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] mx-auto mb-8"></div>
            <p
              className={`text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
            >
              {locale === "ar"
                ? "مدرسة البرمجة هي منصة تعليمية رائدة تهدف إلى تمكين الأطفال والشباب من تعلم البرمجة والتكنولوجيا بطريقة تفاعلية وممتعة. نحن نؤمن بأن كل طفل يمكنه أن يصبح مبرمجاً وصانع تكنولوجيا."
                : "Code School is a leading educational platform that aims to empower children and young adults to learn programming and technology in an interactive and fun way. We believe that every child can become a programmer and technology creator."}
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`flex flex-col ${isRTL ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 mb-20`}
          >
            <div className="lg:w-1/2">
              <h2
                className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar" ? "مهمتنا" : "Our Mission"}
              </h2>
              <p
                className={`text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar"
                  ? "نسعى لإعداد جيل من المبرمجين والمبدعين التقنيين القادرين على مواجهة تحديات المستقبل. نقدم تعليماً عالي الجودة يجمع بين النظرية والتطبيق العملي، مع التركيز على تنمية مهارات حل المشكلات والتفكير النقدي."
                  : "We strive to prepare a generation of programmers and technical innovators capable of facing future challenges. We provide high-quality education that combines theory and practical application, focusing on developing problem-solving skills and critical thinking."}
              </p>
              <p
                className={`text-lg text-gray-600 dark:text-gray-300 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar"
                  ? "من خلال منهج تعليمي متطور ومعلمين مؤهلين، نهدف إلى جعل تعلم البرمجة متاحاً ومثيراً لجميع الأطفال والشباب."
                  : "Through an advanced educational curriculum and qualified teachers, we aim to make programming learning accessible and exciting for all children and young adults."}
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <Image
                  src="/assests/business-img.png"
                  alt="Our Mission"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#b886f2]/20 to-[#ed82c3]/20 rounded-lg"></div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12`}
            >
              {locale === "ar" ? "قيمنا" : "Our Values"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`p-6 bg-white dark:bg-[#1a1f37] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] rounded-lg mb-4 ${isRTL ? "float-right ml-4" : "float-left mr-4"}`}
                  >
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-[#b886f2] to-[#ed82c3] rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {locale === "ar"
                ? "انضم إلى رحلة التعلم"
                : "Join the Learning Journey"}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {locale === "ar"
                ? "ابدأ رحلة طفلك في عالم البرمجة اليوم واكتشف إمكانياته اللامحدودة"
                : "Start your child's journey in the world of programming today and discover their unlimited potential"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#b886f2] font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {locale === "ar" ? "ابدأ الآن" : "Get Started Now"}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
