'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import {
  Code2,
  Palette,
  Braces,
  FileType,
  Component,
  Globe,
  Server,
  Smartphone,
  Database,
  GitBranch,
  Terminal,
  Box,
  Layers,
} from 'lucide-react';

const skills = [
  { name: 'HTML', icon: Code2, color: 'from-orange-500/20 to-red-500/20', accent: 'group-hover:text-orange-400' },
  { name: 'CSS', icon: Palette, color: 'from-blue-500/20 to-cyan-500/20', accent: 'group-hover:text-blue-400' },
  { name: 'JavaScript', icon: Braces, color: 'from-yellow-500/20 to-amber-500/20', accent: 'group-hover:text-yellow-400' },
  { name: 'TypeScript', icon: FileType, color: 'from-blue-600/20 to-blue-400/20', accent: 'group-hover:text-blue-400' },
  { name: 'React', icon: Component, color: 'from-cyan-500/20 to-teal-500/20', accent: 'group-hover:text-cyan-400' },
  { name: 'Next.js', icon: Globe, color: 'from-neutral-500/20 to-neutral-300/20', accent: 'group-hover:text-neutral-300' },
  { name: 'Node.js', icon: Server, color: 'from-green-500/20 to-emerald-500/20', accent: 'group-hover:text-green-400' },
  { name: 'Flutter', icon: Smartphone, color: 'from-sky-500/20 to-blue-500/20', accent: 'group-hover:text-sky-400' },
  { name: 'Expo', icon: Layers, color: 'from-indigo-500/20 to-purple-500/20', accent: 'group-hover:text-indigo-400' },
  { name: 'MySQL', icon: Database, color: 'from-blue-700/20 to-blue-500/20', accent: 'group-hover:text-blue-400' },
  { name: 'MongoDB', icon: Database, color: 'from-green-600/20 to-green-400/20', accent: 'group-hover:text-green-400' },
  { name: 'PostgreSQL', icon: Database, color: 'from-indigo-600/20 to-blue-600/20', accent: 'group-hover:text-indigo-400' },
  { name: 'Docker', icon: Box, color: 'from-blue-500/20 to-cyan-500/20', accent: 'group-hover:text-blue-400' },
  { name: 'Git', icon: GitBranch, color: 'from-red-500/20 to-orange-500/20', accent: 'group-hover:text-red-400' },
  { name: 'Linux', icon: Terminal, color: 'from-yellow-600/20 to-yellow-400/20', accent: 'group-hover:text-yellow-400' },
];

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative py-32 bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/15 via-neutral-950 to-neutral-950" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4">
            {t.skills.title}
          </h2>
          <p className="text-3xl md:text-4xl font-display font-bold text-white">{t.skills.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-purple-500/30 hover:bg-purple-500/[0.03] transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
              />
              <div className="relative flex flex-col items-center gap-3">
                <skill.icon className={`w-8 h-8 text-neutral-400 ${skill.accent} transition-colors`} />
                <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}