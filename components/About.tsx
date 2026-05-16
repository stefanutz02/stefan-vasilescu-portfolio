'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { Code2, Layers, Cpu, Sparkles } from 'lucide-react';

const aboutCards = [
  {
    icon: Code2,
    title: 'Full-Stack Mastery',
    key: 'p1' as const,
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    icon: Layers,
    title: 'Systems & Scale',
    key: 'p2' as const,
    gradient: 'from-fuchsia-500/20 to-purple-500/20',
  },
  {
    icon: Cpu,
    title: 'Robotics & IoT',
    key: 'p3' as const,
    gradient: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    icon: Sparkles,
    title: 'Philosophy',
    key: 'p4' as const,
    gradient: 'from-purple-400/20 to-fuchsia-400/20',
  },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-32 bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.08)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4">
            {t.about.title}
          </h2>
          <p className="text-3xl md:text-5xl font-display font-bold text-white max-w-4xl mx-auto leading-tight">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {aboutCards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-purple-500/30 transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]"
            >
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
              />
              
              <div className="relative">
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:text-purple-300 group-hover:border-purple-400/40 transition-colors">
                  <card.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {(t.about as any)[card.key]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}