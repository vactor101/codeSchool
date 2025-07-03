'use client';

import { useContext } from 'react';
import { LocaleContext } from '@/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import type { Locale } from '@/lib/i18n';
import type { NestedTranslationKey } from '@/lib/translations';

export function useTranslation() {
  const { locale } = useContext(LocaleContext);

  const t = (key: NestedTranslationKey, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`);
      return key;
    }
    
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match: string, paramKey: string) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  };

  return { t, locale };
}
