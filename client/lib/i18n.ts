export const defaultLocale = 'en';
export const locales = ['en', 'ar'] as const;
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية'
};

export const isRTL = (locale: Locale): boolean => {
  return locale === 'ar';
};

export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return isRTL(locale) ? 'rtl' : 'ltr';
};
