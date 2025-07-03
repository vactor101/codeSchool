"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { FaWhatsapp, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Sparkles, Users, Award, Clock } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  const features = [
    {
      icon: Users,
      text: locale === "ar" ? "خبراء معتمدون" : "Certified Experts",
      number: "50+",
    },
    {
      icon: Award,
      text: locale === "ar" ? "شهادات معتمدة" : "Accredited Certificates",
      number: "100%",
    },
    {
      icon: Clock,
      text: locale === "ar" ? "دعم مستمر" : "24/7 Support",
      number: "24/7",
    },
  ];

  const handleWhatsApp = () => {
    const number = "201140474129";
    const message =
      locale === "ar"
        ? encodeURIComponent(
            "مرحبًا، أريد معرفة المزيد عن دورات البرمجة للأطفال!",
          )
        : encodeURIComponent(
            "Hello, I want to know more about coding courses for children!",
          );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#b886f2] via-[#9c7bd8] to-[#ed82c3]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        {/* Floating sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-4 h-4 text-white/40" />
          </motion.div>
        ))}
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        dir={direction}
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className={`text-4xl md:text-6xl font-bold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {locale === "ar"
                ? "ابدأ رحلة طفلك في البرمجة اليوم!"
                : "Start Your Child's Coding Journey Today!"}
            </h2>

            <p
              className={`text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
            >
              {locale === "ar"
                ? "انضم إلى آلاف الأطفال الذين يتعلمون البرمجة مع خبرائنا المعتمدين وابنِ مستقبلاً مشرقاً لطفلك"
                : "Join thousands of children learning to code with our certified experts and build a bright future for your child"}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {feature.number}
                </div>
                <div className="text-white/90">{feature.text}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${isRTL ? "sm:flex-row-reverse" : ""}`}
          >
            <Link href="/courses">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#b886f2] font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
              >
                {locale === "ar" ? "تصفح الدورات" : "Browse Courses"}
                {isRTL ? (
                  <FaArrowLeft className="group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" />
                ) : (
                  <FaArrowRight className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </motion.button>
            </Link>

            <motion.button
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
            >
              <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform duration-300" />
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </motion.button>

            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-white hover:text-[#b886f2] transition-all duration-300 flex items-center gap-3"
              >
                {locale === "ar" ? "تعرف علينا" : "Learn More"}
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-white/80 text-sm mb-4">
              {locale === "ar"
                ? "موثوق به من قبل أكثر من 250,000 ولي أمر حول العالم"
                : "Trusted by over 250,000 parents worldwide"}
            </p>
            <div className="flex justify-center items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-yellow-900 text-sm">★</span>
                  </div>
                </motion.div>
              ))}
              <span className="text-white/90 ml-2 font-semibold">4.9/5</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
