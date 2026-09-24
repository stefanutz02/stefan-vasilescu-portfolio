'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

/**
 * Inline script for <head>: applies the stored theme before first paint.
 * Dark is the default — light is used only if the visitor picked it.
 * Also sets <html lang="ro"> on the /ro/ page.
 */
export const themeScript = `(function(){var d=document.documentElement;if(location.pathname.indexOf('/ro')===0){d.lang='ro'}try{var t=localStorage.getItem('theme');if(t==='light'){d.classList.remove('dark')}else{d.classList.add('dark')}}catch(e){}})();`;

const THEME_COLORS: Record<Theme, string> = { dark: '#0a0a0a', light: '#fbf9ff' };

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next]);
      try {
        localStorage.setItem('theme', next);
      } catch {}
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
