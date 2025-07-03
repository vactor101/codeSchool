'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import { LocaleContext } from '@/contexts/LocaleContext';
import { useContext } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useContext(LocaleContext);
  const { t } = useTranslation();

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="appearance-none bg-white dark:bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-white shadow-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
      >
        {locales.map((loc) => (
          <option 
            key={loc} 
            value={loc} 
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-1"
          >
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-600 dark:text-gray-400" />
    </div>
  );
}
