"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Users,
  Award,
} from "lucide-react";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Contact");
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: locale === "ar" ? "موقعنا" : "Our Location",
      content:
        locale === "ar" ? "مدينة نصر، القاهرة، مصر" : "Nasr City, Cairo, Egypt",
    },
    {
      icon: Phone,
      title: locale === "ar" ? "اتصل بنا" : "Call Us",
      content: "+20 1140474129",
    },
    {
      icon: Mail,
      title: locale === "ar" ? "راسلنا" : "Email Us",
      content: "Engabdallah.naser@gmail.com",
    },
    {
      icon: Clock,
      title: locale === "ar" ? "ساعات العمل" : "Working Hours",
      content:
        locale === "ar"
          ? "السبت - الخميس: 9:00 - 18:00"
          : "Sat - Thu: 9:00 AM - 6:00 PM",
    },
  ];

  const reasons = [
    {
      icon: MessageCircle,
      title: locale === "ar" ? "دعم 24/7" : "24/7 Support",
      description:
        locale === "ar"
          ? "فريق الدعم متاح دائماً للإجابة على استفساراتكم"
          : "Our support team is always available to answer your questions",
    },
    {
      icon: Users,
      title: locale === "ar" ? "فريق خبراء" : "Expert Team",
      description:
        locale === "ar"
          ? "معلمون مؤهلون ومتخصصون في التعليم التقني"
          : "Qualified teachers specialized in technical education",
    },
    {
      icon: Award,
      title: locale === "ar" ? "جودة مضمونة" : "Quality Guaranteed",
      description:
        locale === "ar"
          ? "منهج تعليمي معتمد ومطابق للمعايير العالمية"
          : "Certified curriculum that meets international standards",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      toast.success(
        locale === "ar"
          ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
          : "Your message has been sent successfully! We will contact you soon.",
      );
    } catch (error) {
      toast.error(
        locale === "ar"
          ? "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى."
          : "Error sending message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const number = "201140474129";
    const message =
      locale === "ar"
        ? encodeURIComponent(
            "مرحبًا، لدي سؤال بخصوص الدورات التدريبية الخاصة بكم!",
          )
        : encodeURIComponent("Hello, I have a question about your courses!");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] transition-colors duration-500">
      <Heading
        title={`${t("nav.contact")} - Code School`}
        description="Get in touch with Code School for inquiries about our coding courses and programs"
        keywords="contact code school, coding courses inquiry, programming education contact"
      />
      <Header
        activeItem={3}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

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
              className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6`}
            >
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] mx-auto mb-8"></div>
            <p
              className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
            >
              {locale === "ar"
                ? "نحن هنا للإجابة على جميع استفساراتكم ومساعدتكم في بدء رحلة التعلم"
                : "We are here to answer all your questions and help you start your learning journey"}
            </p>
          </motion.div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20`}>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-[#1a1f37] rounded-2xl shadow-xl p-8"
            >
              <h2
                className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar" ? "أرسل لنا رسالة" : "Send us a Message"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {locale === "ar" ? "الاسم" : "Name"} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-transparent dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}
                      placeholder={
                        locale === "ar" ? "أدخل اسمك" : "Enter your name"
                      }
                      dir={direction}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {locale === "ar" ? "البريد الإلكتروني" : "Email"} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-transparent dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={
                        locale === "ar"
                          ? "أدخل بريدك الإلكتروني"
                          : "Enter your email"
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-transparent dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder={
                      locale === "ar"
                        ? "أدخل رقم هاتفك"
                        : "Enter your phone number"
                    }
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {locale === "ar" ? "الموضوع" : "Subject"} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-transparent dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={
                      locale === "ar"
                        ? "أدخل موضوع الرسالة"
                        : "Enter message subject"
                    }
                    dir={direction}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {locale === "ar" ? "الرسالة" : "Message"} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#b886f2] focus:border-transparent bg-transparent dark:bg-gray-800 text-gray-900 dark:text-white resize-none ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={
                      locale === "ar"
                        ? "اكتب رسالتك هنا..."
                        : "Write your message here..."
                    }
                    dir={direction}
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {isSubmitting
                      ? locale === "ar"
                        ? "جاري الإرسال..."
                        : "Sending..."
                      : locale === "ar"
                        ? "إرسال الرسالة"
                        : "Send Message"}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleWhatsApp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {locale === "ar" ? "واتساب" : "WhatsApp"}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <h2
                className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
              >
                {locale === "ar" ? "معلومات التواصل" : "Contact Information"}
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className={`flex items-start gap-4 p-6 bg-white dark:bg-[#1a1f37] rounded-xl shadow-lg ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {info.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="mt-12">
                <h3
                  className={`text-xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {locale === "ar" ? "لماذا تختارنا؟" : "Why Choose Us?"}
                </h3>
                <div className="space-y-4">
                  {reasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] rounded-full flex items-center justify-center">
                        <reason.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className={isRTL ? "text-right" : "text-left"}>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {reason.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {reason.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
