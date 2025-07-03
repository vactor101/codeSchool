"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import {
  Home,
  BookOpen,
  Users,
  MessageCircle,
  HelpCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface QuickNavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
  section?: string;
}

const QuickNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { t, locale } = useTranslation();
  const { isRTL } = useDirection();

  const quickNavItems: QuickNavItem[] = [
    {
      id: "home",
      icon: Home,
      label: t("nav.home"),
      href: "/",
      section: "hero",
    },
    {
      id: "courses",
      icon: BookOpen,
      label: t("nav.courses"),
      href: "/courses",
      section: "courses",
    },
    {
      id: "about",
      icon: Users,
      label: t("nav.about"),
      href: "/about",
    },
    {
      id: "contact",
      icon: MessageCircle,
      label: t("nav.contact"),
      href: "/contact",
    },
    {
      id: "faq",
      icon: HelpCircle,
      label: t("nav.faq"),
      href: "/faq",
      section: "faq",
    },
  ];

  // Handle scroll to section
  const handleScrollToSection = (sectionId: string, href: string) => {
    if (window.location.pathname === "/" && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
        return;
      }
    }
    window.location.href = href;
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "generation",
        "why-code-school",
        "learning-path",
        "courses",
        "certification",
        "reviews",
        "faq",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed ${isRTL ? "left-6" : "right-6"} top-1/2 transform -translate-y-1/2 z-40`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-[#1a1f37] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white hover:from-[#a575e8] hover:to-[#de6eb8] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </motion.button>

        {/* Navigation Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {quickNavItems.map((item, index) => {
                  const isActive =
                    activeSection === item.section ||
                    (window.location.pathname === item.href && !item.section);

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() =>
                        handleScrollToSection(item.section || "", item.href)
                      }
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                        ${isRTL ? "flex-row-reverse text-right" : "flex-row text-left"}
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QuickNavigation;
