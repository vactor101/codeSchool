"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { Users, GraduationCap, ArrowRight, ArrowLeft } from "lucide-react";

interface PageNavigationProps {
  className?: string;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ className = "" }) => {
  const pathname = usePathname();
  const { locale } = useTranslation();
  const { isRTL } = useDirection();

  const navItems = [
    {
      href: "/Parents",
      label: locale === "ar" ? "أولياء الأمور" : "Parents",
      description:
        locale === "ar" ? "للآباء والأمهات" : "For Parents & Guardians",
      icon: Users,
      color: "from-[#b886f2] to-[#ed82c3]",
      isActive: pathname === "/Parents",
    },
    {
      href: "/Schools",
      label: locale === "ar" ? "المدارس" : "Schools",
      description:
        locale === "ar" ? "للمؤسسات التعليمية" : "For Educational Institutions",
      icon: GraduationCap,
      color: "from-[#3b82f6] to-[#1d4ed8]",
      isActive: pathname === "/Schools",
    },
  ];

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 ${className}`}
    >
      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 rounded-full p-2 shadow-xl">
        <div className="flex gap-2">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <Link key={item.href} href={item.href} className="group relative">
                <motion.div
                  className={`
                    relative flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300
                    ${
                      item.isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-5 h-5" />

                  <div
                    className={`flex flex-col ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <span className="text-sm font-semibold leading-tight">
                      {item.label}
                    </span>
                    <span className="text-xs opacity-75 leading-tight">
                      {item.description}
                    </span>
                  </div>

                  {!item.isActive && (
                    <ArrowIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </motion.div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                    {locale === "ar" ? "انتقل إلى" : "Go to"} {item.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mt-4"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-sm font-medium">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PageNavigation;
