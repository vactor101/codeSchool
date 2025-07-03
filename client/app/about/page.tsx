"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Award,
  Globe,
  Code,
  Lightbulb,
  Target,
  Heart,
  Star,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Book,
  Trophy,
  Rocket,
  Cpu,
  Brain,
  Sparkles,
} from "lucide-react";

const AboutPage = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  const stats = [
    {
      icon: Users,
      number: "130K+",
      label: locale === "ar" ? "خريج" : "Graduates",
      description:
        locale === "ar" ? "طالب تخرج بنجاح" : "Students graduated successfully",
    },
    {
      icon: Globe,
      number: "20+",
      label: locale === "ar" ? "دولة" : "Countries",
      description: locale === "ar" ? "حول العالم" : "Around the world",
    },
    {
      icon: Award,
      number: "250K+",
      label: locale === "ar" ? "أولياء أمور راضون" : "Happy Parents",
      description:
        locale === "ar" ? "راضون عن النتائج" : "Satisfied with results",
    },
    {
      icon: GraduationCap,
      number: "6M+",
      label: locale === "ar" ? "ساعات تدريب" : "Training Hours",
      description:
        locale === "ar" ? "من التعلم التفاعلي" : "Of interactive learning",
    },
  ];

  const values = [
    {
      icon: Code,
      title: locale === "ar" ? "التميز في التعليم" : "Educational Excellence",
      description:
        locale === "ar"
          ? "نسعى لتقديم أفضل المناهج التعليمية في البرمجة والتكنولوجيا مع مواكبة أحدث التطورات"
          : "We strive to provide the best educational curricula in programming and technology while keeping up with the latest developments",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: locale === "ar" ? "الإبداع والابتكار" : "Creativity & Innovation",
      description:
        locale === "ar"
          ? "نشجع الطلاب على التفكير الإبداعي وحل المشكلات بطرق مبتكرة وغير تقليدية"
          : "We encourage students to think creatively and solve problems in innovative and unconventional ways",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Target,
      title: locale === "ar" ? "التعلم المخصص" : "Personalized Learning",
      description:
        locale === "ar"
          ? "نوفر تجربة تعليمية مخصصة لكل طالب حسب مستواه وأهدافه واهتماماته الشخصية"
          : "We provide a personalized learning experience for each student based on their level, goals, and personal interests",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Heart,
      title: locale === "ar" ? "المجتمع والدعم" : "Community & Support",
      description:
        locale === "ar"
          ? "نبني مجتمعاً داعماً من المعلمين والطلاب وأولياء الأمور يساعد في نمو كل فرد"
          : "We build a supportive community of teachers, students, and parents that helps everyone grow",
      gradient: "from-red-500 to-orange-500",
    },
  ];

  const features = [
    {
      icon: Rocket,
      title: locale === "ar" ? "منهج متطور" : "Advanced Curriculum",
      description:
        locale === "ar"
          ? "مناهج حديثة تواكب التطورات التقنية"
          : "Modern curricula that keep pace with technological developments",
    },
    {
      icon: Cpu,
      title: locale === "ar" ? "تقنيات حديثة" : "Modern Technologies",
      description:
        locale === "ar"
          ? "استخدام أحدث الأدوات والتقنيات"
          : "Using the latest tools and technologies",
    },
    {
      icon: Brain,
      title: locale === "ar" ? "ذكاء اصطناعي" : "Artificial Intelligence",
      description:
        locale === "ar"
          ? "دمج الذكاء الاصطناعي في التعلم"
          : "Integrating AI into learning",
    },
    {
      icon: Trophy,
      title: locale === "ar" ? "إنجازات مميزة" : "Outstanding Achievements",
      description:
        locale === "ar"
          ? "مشاريع وإنجازات طلابية رائعة"
          : "Amazing student projects and achievements",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: locale === "ar" ? "بداية الرحلة" : "The Journey Begins",
      description:
        locale === "ar"
          ? "تأسيس مدرسة البرمجة بهدف تعليم الأطفال البرمجة"
          : "Founded Code School with the goal of teaching children programming",
    },
    {
      year: "2021",
      title: locale === "ar" ? "أول 1000 طالب" : "First 1000 Students",
      description:
        locale === "ar"
          ? "وصلنا إلى أول ألف طالب مسجل في المنصة"
          : "Reached our first thousand registered students on the platform",
    },
    {
      year: "2022",
      title: locale === "ar" ? "التوسع الدولي" : "International Expansion",
      description:
        locale === "ar"
          ? "انتشار المنصة في أكثر من 10 دول"
          : "Platform expansion to more than 10 countries",
    },
    {
      year: "2023",
      title: locale === "ar" ? "الذكاء الاصطناعي" : "AI Integration",
      description:
        locale === "ar"
          ? "دمج تقنيات الذكاء الاصطناعي في التعلم"
          : "Integration of AI technologies in learning",
    },
    {
      year: "2024",
      title: locale === "ar" ? "130 ألف خريج" : "130K Graduates",
      description:
        locale === "ar"
          ? "تخريج أكثر من 130 ألف طالب"
          : "Graduated more than 130 thousand students",
    },
  ];

  const teamMembers = [
    {
      name: locale === "ar" ? "أحمد محمد" : "Ahmed Mohamed",
      role: locale === "ar" ? "الرئيس التنفيذي والمؤسس" : "CEO & Founder",
      image: "/assests/avatar.png",
      bio:
        locale === "ar"
          ? "خبير في التعليم التقني مع أكثر من 15 عاماً من الخبرة"
          : "Expert in technical education with over 15 years of experience",
    },
    {
      name: locale === "ar" ? "فاطمة أحمد" : "Fatma Ahmed",
      role:
        locale === "ar"
          ? "مديرة التطوير التعليمي"
          : "Educational Development Manager",
      image: "/assests/avatar.png",
      bio:
        locale === "ar"
          ? "متخصصة في تطوير المناهج التعليمية للأطفال"
          : "Specialist in developing educational curricula for children",
    },
    {
      name: locale === "ar" ? "محمد علي" : "Mohamed Ali",
      role: locale === "ar" ? "مدير التقنية" : "Technical Director",
      image: "/assests/avatar.png",
      bio:
        locale === "ar"
          ? "مطور برامج مع خبرة في تطوير منصات التعلم"
          : "Software developer with experience in learning platform development",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-[#070b1b] dark:via-[#0f1419] dark:to-[#111C43] transition-all duration-500">
      <Heading
        title={`${t("nav.about")} - Code School`}
        description="Learn about Code School's mission to provide quality coding education for children and young adults worldwide"
        keywords="about code school, coding education, programming courses, technology learning, children programming"
      />

      <Header
        activeItem={2}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8" dir={direction}>
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-3xl -z-10"></div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full mb-4">
                {locale === "ar" ? "تعرف علينا" : "Get to Know Us"}
              </span>
            </motion.div>

            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${isRTL ? "text-right" : "text-center"}`}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                {locale === "ar" ? "من نحن" : "About"}
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                {locale === "ar" ? "مدرسة البرمجة" : "Code School"}
              </span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed ${isRTL ? "text-right" : "text-center"}`}
            >
              {locale === "ar"
                ? "مدرسة البرمجة هي منصة تعليمية رائدة تهدف إلى تمكين الأطفال والشباب من تعلم البرمجة والتكنولوجيا بطريقة تفاعلية وممتعة. نحن نؤمن بأن كل طفل يمكنه أن يصبح مبرمجاً وصانع تكنولوجيا المستقبل."
                : "Code School is a leading educational platform that aims to empower children and young adults to learn programming and technology in an interactive and fun way. We believe that every child can become a programmer and creator of future technology."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                {locale === "ar" ? "شاهد قصتنا" : "Watch Our Story"}
              </button>
              <Link href="/contact">
                <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  {locale === "ar" ? "تواصل معنا" : "Contact Us"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-900 dark:text-white font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Mission Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${isRTL ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-16 mb-20`}
          >
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-sm font-semibold rounded-full mb-4">
                  {locale === "ar" ? "مهمتنا" : "Our Mission"}
                </span>
                <h2
                  className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {locale === "ar"
                    ? "نحن نبني مستقبل التكنولوجيا"
                    : "We Are Building the Future of Technology"}
                </h2>
                <p
                  className={`text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {locale === "ar"
                    ? "نسعى لإعداد جيل من المبرمجين والمبدعين التقنيين القادرين على مو��جهة تحديات المستقبل. نقدم تعليماً عالي الجودة يجمع بين النظرية والتطبيق العملي، مع التركيز على تنمية مهارات حل المشكلات والتفكير النقدي."
                    : "We strive to prepare a generation of programmers and technical innovators capable of facing future challenges. We provide high-quality education that combines theory and practical application, focusing on developing problem-solving skills and critical thinking."}
                </p>
                <div className="space-y-3">
                  {[
                    locale === "ar"
                      ? "تعليم تفاعلي وممتع"
                      : "Interactive and fun learning",
                    locale === "ar"
                      ? "مناهج متطورة ومحدثة"
                      : "Advanced and updated curricula",
                    locale === "ar"
                      ? "معلمون مؤهلون وخبراء"
                      : "Qualified and expert teachers",
                    locale === "ar"
                      ? "دعم مستمر للطلاب"
                      : "Continuous student support",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assests/business-img.png"
                    alt="Our Mission"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-60 blur-xl"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-semibold rounded-full mb-4">
                {locale === "ar" ? "قيمنا" : "Our Values"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === "ar"
                  ? "ما يحركنا ويوجهنا"
                  : "What Drives and Guides Us"}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {locale === "ar"
                  ? "قيمنا الأساسية التي تشكل هويتنا وتوجه رؤيتنا نحو تقديم أفضل تعليم تقني للأجيال القادمة"
                  : "Our core values that shape our identity and guide our vision towards providing the best technical education for future generations"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group overflow-hidden ${isRTL ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${value.gradient} rounded-xl mb-6 shadow-lg`}
                  >
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-sm font-semibold rounded-full mb-4">
                {locale === "ar" ? "مميزاتنا" : "Our Features"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === "ar"
                  ? "ما يميزنا عن الآخرين"
                  : "What Sets Us Apart"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 text-sm font-semibold rounded-full mb-4">
                {locale === "ar" ? "رحلتنا" : "Our Journey"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === "ar"
                  ? "معالم في طريق النجاح"
                  : "Milestones on the Path to Success"}
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} mb-12`}
                >
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-sm font-semibold rounded-full mb-4">
                {locale === "ar" ? "فريقنا" : "Our Team"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === "ar"
                  ? "الخبراء وراء النجاح"
                  : "The Experts Behind Success"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 text-center"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <Sparkles className="w-16 h-16 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {locale === "ar"
                  ? "انضم إلى رحلة التعلم الاستثنائية"
                  : "Join the Extraordinary Learning Journey"}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                {locale === "ar"
                  ? "ابدأ رحلة طفلك في عالم البرمجة اليوم واكتشف إمكانياته اللامحدودة مع أفضل المعلمين والمناهج"
                  : "Start your child&apos;s journey in the world of programming today and discover their unlimited potential with the best teachers and curricula"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-600 font-semibold py-4 px-8 rounded-xl text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                  >
                    {locale === "ar" ? "استكشف الدورات" : "Explore Courses"}
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
                  >
                    {locale === "ar" ? "تواصل معنا" : "Contact Us"}
                  </motion.button>
                </Link>
              </div>
            </div>
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
