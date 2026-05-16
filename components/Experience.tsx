'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { Briefcase } from 'lucide-react';

const experiences = [
  { id: 'vesko', key: 'vesko' as const },
  { id: 'era', key: 'era' as const },
  { id: 'freelance', key: 'freelance' as const },
];

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-32 bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(124,58,237,0.06)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4">
            {t.experience.title}
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />

          <div className="space-y-16">
            {experiences.map((exp, i) => {
              const data = t.experience[exp.key];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-start md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-neutral-950 shadow-[0_0_20px_rgba(168,85,247,0.5)]" />

                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'
                    }`}
                  >
                    <div className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-purple-500/30 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]">
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isLeft ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <Briefcase className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-sm text-purple-300/80 font-medium">{data.period}</span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-white mb-1">
                        {data.role}
                      </h3>
                      <p className="text-sm text-neutral-400 font-medium mb-3">{data.company}</p>
                      <p className="text-neutral-500 leading-relaxed">{data.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}