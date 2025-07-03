"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import Image from "next/image";
import {
  X,
  MessageCircle,
  Phone,
  Mail,
  Star,
  Gift,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      titleEn: "Welcome to Code School!",
      titleAr: "مرحباً بك في مدرسة البرمجة!",
      subtitleEn: "Transform your child's future with coding",
      subtitleAr: "غيّر مستقبل طفلك مع البرمجة",
      imageUrl: "/assests/banner-img-1.png",
      features: [
        { en: "130K+ Graduates", ar: "130 ألف+ خريج" },
        { en: "Expert Instructors", ar: "مدربون خبراء" },
        { en: "Interactive Learning", ar: "تعلم تفاعلي" },
      ],
    },
    {
      titleEn: "Special Launch Offer!",
      titleAr: "عرض إطلاق خاص!",
      subtitleEn: "Get 30% off on all courses",
      subtitleAr: "احصل على خصم 30% على جميع الدورات",
      imageUrl: "/assests/business-img.png",
      features: [
        { en: "Limited Time Only", ar: "لفترة محدودة فقط" },
        { en: "All Age Groups", ar: "جميع الفئات العمرية" },
        { en: "Certificate Included", ar: "شهادة معتمدة" },
      ],
    },
  ];

  const currentSlideData = slides[currentSlide];

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen, slides.length]);

  const handleWhatsAppContact = () => {
    const number = "201140474129";
    const message =
      locale === "ar"
        ? encodeURIComponent(
            "مرحبًا! أهتم بدورات البرمجة للأطفال. هل يمكنكم مساعدتي؟",
          )
        : encodeURIComponent(
            "Hello! I'm interested in coding courses for children. Can you help me?",
          );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
    onClose();
  };

  const handlePhoneContact = () => {
    window.open("tel:+201140474129", "_self");
    onClose();
  };

  const handleEmailContact = () => {
    const subject =
      locale === "ar"
        ? encodeURIComponent("استفسار عن دورات البرمجة")
        : encodeURIComponent("Inquiry about Coding Courses");
    const body =
      locale === "ar"
        ? encodeURIComponent(
            "مرحبًا، أريد معرفة المزيد عن دورات البرمجة للأطفال.",
          )
        : encodeURIComponent(
            "Hello, I would like to know more about coding courses for children.",
          );
    window.open(
      `mailto:Engabdallah.naser@gmail.com?subject=${subject}&body=${body}`,
      "_self",
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
            dir={direction}
          >
            <div className="relative w-full max-w-4xl bg-white dark:bg-[#1a1f37] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-10 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg`}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Content */}
              <div
                className={`flex flex-col lg:flex-row ${isRTL ? "lg:flex-row-reverse" : ""} h-full max-h-[90vh]`}
              >
                {/* Image Section */}
                <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#b886f2] via-[#9c7bd8] to-[#ed82c3] p-8 flex items-center justify-center">
                  {/* Floating elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
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

                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center"
                  >
                    <Image
                      src={currentSlideData.imageUrl}
                      alt="Welcome"
                      width={400}
                      height={400}
                      className="w-full max-w-sm h-auto object-contain mx-auto mb-6"
                    />

                    {/* Features */}
                    <div className="w-full grid grid-cols-1 gap-3">
                      {currentSlideData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="w-full flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3"
                        >
                          <Star className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                          <span className="text-white font-medium text-sm flex-1">
                            {locale === "ar" ? feature.ar : feature.en}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Slide indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? "bg-white w-6"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={isRTL ? "text-right" : "text-left"}
                  >
                    <div className="mb-6">
                      <motion.h2
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {locale === "ar"
                          ? currentSlideData.titleAr
                          : currentSlideData.titleEn}
                      </motion.h2>

                      <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {locale === "ar"
                          ? currentSlideData.subtitleAr
                          : currentSlideData.subtitleEn}
                      </motion.p>

                      {currentSlide === 1 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white p-4 rounded-xl mb-6 flex items-center gap-3"
                        >
                          <Gift className="w-6 h-6" />
                          <div>
                            <div className="font-bold text-xl">30% OFF</div>
                            <div className="text-sm opacity-90">
                              {locale === "ar"
                                ? "عرض محدود الوقت"
                                : "Limited Time Offer"}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Contact Options */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {locale === "ar"
                          ? "تواصل معنا الآن:"
                          : "Contact Us Now:"}
                      </h3>

                      {/* WhatsApp Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleWhatsAppContact}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                      >
                        <FaWhatsapp className="text-xl" />
                        {locale === "ar"
                          ? "راسلنا على واتساب"
                          : "Message Us on WhatsApp"}
                        {isRTL ? (
                          <ArrowLeft className="w-5 h-5" />
                        ) : (
                          <ArrowRight className="w-5 h-5" />
                        )}
                      </motion.button>

                      {/* Contact Options Row */}
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePhoneContact}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          {locale === "ar" ? "اتصل بنا" : "Call Us"}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleEmailContact}
                          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          {locale === "ar" ? "راسلنا" : "Email Us"}
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>4.9/5</span>
                        </div>
                        <span>•</span>
                        <span>
                          {locale === "ar"
                            ? "250 ألف+ ولي أمر راضٍ"
                            : "250K+ Happy Parents"}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
