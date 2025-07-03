import React from 'react';
import { useTheme } from 'next-themes';
import Certificate from './Certificate';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useDirection } from '@/hooks/useDirection';

function Certification() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <div className={`py-20 bg-no-repeat duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#070b1b] to-[#111C43]' 
        : 'bg-white'
    } ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-[#b886f2]'
          }`}>
            {t('certification.title')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('certification.subtitle')}
          </p>
        </motion.div>
        <Certificate />
      </div>
    </div>
  );
}

export default Certification;
