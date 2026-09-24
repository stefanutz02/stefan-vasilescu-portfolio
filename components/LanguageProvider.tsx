'use client';

import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations, type Language, type Translations } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

/**
 * The language comes from the URL: `/` is English, `/ro/` is Romanian.
 * Both pages are pre-rendered, so search engines index each language
 * separately (linked with hreflang).
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const lang: Language = pathname.startsWith('/ro') ? 'ro' : 'en';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = useCallback(
    (next: Language) => {
      if (next === lang) return;
      try {
        localStorage.setItem('language', next);
      } catch {}
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      router.push((next === 'ro' ? '/ro/' : '/') + hash);
    },
    [lang, router]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'en' ? 'ro' : 'en');
  }, [lang, setLanguage]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
