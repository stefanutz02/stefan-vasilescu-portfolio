'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';
import { Logo } from './Logo';

const NAV = ['about', 'skills', 'projects', 'experience', 'contact'] as const;
type Section = 'home' | (typeof NAV)[number];

export function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Section>('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const ids: Section[] = ['home', ...NAV];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as Section);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const otherLang = lang === 'en' ? 'ro' : 'en';
  const themeLabel = theme === 'dark' ? t.nav.themeLight : t.nav.themeDark;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="container-x">
        <div
          className={[
            'pointer-events-auto relative flex items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4',
            scrolled ? 'glass-strong !rounded-full shadow-[0_18px_40px_-24px_rgba(0,0,0,.45)]' : 'glass !rounded-full',
          ].join(' ')}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--glass-edge), transparent)' }}
          />

          <a href="#home" className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1.5 pr-3" aria-label={t.nav.home}>
            <Logo className="h-8 w-8" />
            <span className="hidden text-[16px] font-semibold tracking-tight text-ink sm:inline">Stefan Vasilescu</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={[
                  'relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300',
                  active === id ? 'text-accent' : 'text-ink-soft hover:text-ink',
                ].join(' ')}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="chip absolute inset-0 -z-10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleLanguage}
              className="chip hidden h-10 rounded-full px-3 text-[12px] font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:text-accent sm:block"
              aria-label={t.nav.otherLang}
            >
              {otherLang}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="chip inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:text-accent"
              aria-label={themeLabel}
              title={themeLabel}
            >
              {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>

            <a href="#contact" className="btn-primary hidden !px-5 !py-2.5 !text-[13px] sm:inline-flex">
              {t.hero.ctaContact}
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="chip inline-flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
              aria-expanded={open}
              aria-label={open ? t.nav.close : t.nav.menu}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto container-x mt-2 lg:hidden"
          >
            <div className="glass-strong glass-edge overflow-hidden !rounded-[28px] p-3">
              <nav className="flex flex-col" aria-label="Mobile">
                {(['home', ...NAV] as Section[]).map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-brand-500/10"
                  >
                    {t.nav[id]}
                    <ArrowUpRight className="h-4 w-4 text-brand-500" />
                  </a>
                ))}
              </nav>
              <div className="hairline my-2" />
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink-soft"
              >
                {t.nav.otherLang}
                <span className="chip rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {otherLang}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
