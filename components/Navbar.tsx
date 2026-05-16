'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'home' as const },
  { id: 'about', label: 'about' as const },
  { id: 'skills', label: 'skills' as const },
  { id: 'projects', label: 'projects' as const, dropdown: ['coding', 'robotics'] as const },
  { id: 'experience', label: 'experience' as const },
  { id: 'contact', label: 'contact' as const },
];

export function Navbar() {
  const { t, lang, setLanguage } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 100) setHidden(true);
      else setHidden(false);
      setLastScrollY(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
      setDropdownOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="relative flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              {item.dropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5"
                  >
                    {t.nav[item.label]}
                    <ChevronDown
                      className={cn(
                        'w-3 h-3 transition-transform duration-200',
                        dropdownOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-40 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-xl"
                      >
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => scrollTo('projects')}
                            className="block w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {t.nav[sub]}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                  {t.nav[item.label]}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* EN / RO Switch */}
        <div className="ml-2 flex items-center rounded-full bg-white/5 border border-white/10 p-1">
          <button
            onClick={() => setLanguage('en')}
            className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              lang === 'en'
                ? 'bg-gradient-to-b from-purple-300 to-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ro')}
            className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              lang === 'ro'
                ? 'bg-gradient-to-b from-purple-300 to-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            RO
          </button>
        </div>

        <button
          className="md:hidden ml-2 p-2 text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-4 w-[90vw] max-w-sm rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {t.nav[item.label]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}