"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

type Props = {};

const Footer = (props: Props) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43]">
      <div className="border-t border-[#0000000e] dark:border-[#ffffff1e]" />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Parents Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-purple-400">
              {t('footer.parents')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/our-story", textKey: "footer.ourStory" },
                { href: "/privacy-policy", textKey: "footer.privacyPolicy" },
                { href: "/faq", textKey: "nav.faq" },
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    {t(item.textKey as any)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-purple-400">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/courses", textKey: "nav.courses" },
                { href: "/profile", textKey: "footer.myAccount" },
                { href: "/course-dashboard", textKey: "footer.courseDashboard" },
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    {t(item.textKey as any)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-purple-400">
              {t('footer.socialLinks')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "https://www.youtube.com/channel/", textKey: "footer.youtube" },
                { href: "https://www.instagram.com/code_school_4arab?igsh=MWhuNnF2MXlwdHNvOA==", textKey: "footer.instagram" },
                { href: "https://www.facebook.com/", textKey: "footer.facebook" },
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    {t(item.textKey as any)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-purple-400">
              {t('footer.contactInfo')}
            </h3>
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {t('footer.callUs')}: {t('footer.phone')}
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {t('footer.address')}: {t('footer.location')}
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {t('footer.mailUs')}: {t('footer.email')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 pt-6 border-t border-[#0000000e] dark:border-[#ffffff1e]"
        >
          <p className="text-center text-sm sm:text-base text-black dark:text-purple-400">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
