'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-20 bg-neutral-950 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Signature */}
          <div className="relative mb-6 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <h2 
              className="font-signature text-5xl md:text-7xl chrome-purple-text filter drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] select-none"
              style={{ 
                textShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
                letterSpacing: '-0.02em'
              }}
            >
              Stefan Vasilescu
            </h2>
            {/* Decorative underline flourish */}
            <svg 
              className="absolute -bottom-2 left-0 w-full h-3 text-purple-500/40" 
              viewBox="0 0 200 8" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0 4 Q 50 0, 100 4 T 200 4" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                className="filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
              />
            </svg>
          </div>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6" />

          <p className="text-neutral-600 text-sm tracking-wide">
            © {year} Stefan Vasilescu. {t.footer.rights}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}