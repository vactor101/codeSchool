'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, locales, getDirection } from '@/lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  direction: 'ltr' | 'rtl';
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  direction: 'ltr',
});

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    // Load locale from localStorage or browser preference
    const savedLocale = localStorage.getItem('locale') as Locale;
    const browserLocale = navigator.language.split('-')[0] as Locale;
    
    const initialLocale = 
      savedLocale && locales.includes(savedLocale) 
        ? savedLocale 
        : locales.includes(browserLocale) 
          ? browserLocale 
          : defaultLocale;
    
    setLocaleState(initialLocale);
    setDirection(getDirection(initialLocale));
    
    // Set document direction and lang
    document.documentElement.dir = getDirection(initialLocale);
    document.documentElement.lang = initialLocale;
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDirection(getDirection(newLocale));
    localStorage.setItem('locale', newLocale);
    
    // Update document direction and lang
    document.documentElement.dir = getDirection(newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, direction }}>
      {children}
    </LocaleContext.Provider>
  );
}
