'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, type Language, type Translations } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'ro')) {
      setLang(saved);
    }
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'en' ? 'ro' : 'en');
  }, [lang, setLanguage]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}