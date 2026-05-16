'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { ArrowDown, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Subtle parallax for the portrait — opposite direction to one blob,
  // so it feels like it's floating against the background
  const portraitX = useTransform(x, (v) => v * 0.4);
  const portraitY = useTransform(y, (v) => v * 0.4);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 30);
      mouseY.set((clientY - innerHeight / 2) / 30);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 pt-28 pb-24 md:pt-20 md:pb-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950" />

      <motion.div
        style={{ x, y }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
      />
      <motion.div
        style={{
          x: useTransform(x, (v) => -v),
          y: useTransform(y, (v) => -v),
        }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        {/* PORTRAIT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: portraitX, y: portraitY }}
          className="relative mb-6 md:mb-8 group"
        >
          {/* Outer pulsing glow */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-purple-500/30 blur-2xl -z-10"
            aria-hidden="true"
          />

          {/* Rotating conic-gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -inset-1 rounded-full opacity-80"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0%, #a855f7 25%, #e9d5ff 50%, #7c3aed 75%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* Inner dark separator (gives the ring a clean inner edge) */}
          <div
            className="absolute inset-0 rounded-full bg-neutral-950 m-[3px]"
            aria-hidden="true"
          />

          {/* Portrait image */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.25)] group-hover:shadow-[0_0_60px_rgba(168,85,247,0.4)] transition-shadow duration-500">
            <Image
              src="/stefan-vasilescu-portrait.jpg"
              alt="Stefan Vasilescu, Full-Stack Developer and CEO of Vesko Software, portrait photograph"
              fill
              priority
              sizes="(max-width: 768px) 112px, 144px"
              className="object-cover"
            />
            {/* Subtle inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Online status dot */}
          <div
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-neutral-950 shadow-[0_0_10px_rgba(74,222,128,0.6)]"
            aria-label="Available for work"
          >
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute inset-0 rounded-full bg-green-400"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* GREETING BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-400">
            <Sparkles className="w-4 h-4 text-purple-400" />
            {t.hero.greeting}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 md:mb-10"
        >
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            {t.hero.name}
          </span>
        </motion.h1>

        {/* ROLES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-3 mb-8 md:mb-10"
        >
          <span className="text-2xl md:text-3xl lg:text-4xl font-display font-bold chrome-purple-text tracking-tight">
            {t.hero.title}
          </span>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent my-1" />

          <a
            href="https://vesko.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-lg text-neutral-400 hover:text-purple-300 transition-colors underline decoration-purple-500/20 underline-offset-4 hover:decoration-purple-400/60"
          >
            {t.hero.role1}
          </a>

          <a
            href="https://erainnovations.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-lg text-neutral-400 hover:text-purple-300 transition-colors underline decoration-purple-500/20 underline-offset-4 hover:decoration-purple-400/60"
          >
            {t.hero.role2}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-xl mx-auto text-neutral-500 mb-10 md:mb-12 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700 text-white font-medium transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t.hero.ctaProjects}
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={scrollToContact}
            className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium hover:bg-purple-500/10 hover:border-purple-500/30 transition-all"
          >
            {t.hero.ctaContact}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on mobile to avoid colliding with CTA buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-purple-500/30 flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-purple-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}