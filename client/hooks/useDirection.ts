'use client';

import { useContext } from 'react';
import { LocaleContext } from '@/contexts/LocaleContext';

export function useDirection() {
  const { locale } = useContext(LocaleContext);
  const { direction } = useContext(LocaleContext);
  
  const isRTL = direction === 'rtl';
  
  const getTextAlign = (defaultAlign: 'left' | 'right' | 'center' = 'left') => {
    if (defaultAlign === 'center') return 'center';
    return isRTL ? (defaultAlign === 'left' ? 'right' : 'left') : defaultAlign;
  };
  
  const getMargin = (side: 'left' | 'right') => {
    return isRTL ? (side === 'left' ? 'mr' : 'ml') : (side === 'left' ? 'ml' : 'mr');
  };
  
  const getPadding = (side: 'left' | 'right') => {
    return isRTL ? (side === 'left' ? 'pr' : 'pl') : (side === 'left' ? 'pl' : 'pr');
  };

  return {
    direction,
    isRTL,
    getTextAlign,
    getMargin,
    getPadding,
    locale
  };
}
