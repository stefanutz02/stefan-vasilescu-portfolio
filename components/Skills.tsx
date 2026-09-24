'use client';

import {
  Box,
  Braces,
  Code2,
  Component,
  Database,
  FileType,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Server,
  Smartphone,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { Stagger, StaggerItem, Tilt } from './Motion';
import { Aurora, SectionHead } from './UI';
import { skills, type Skill } from '@/lib/data';

const ICONS: Record<Skill, LucideIcon> = {
  HTML: Code2,
  CSS: Palette,
  JavaScript: Braces,
  TypeScript: FileType,
  React: Component,
  'Next.js': Globe,
  'Node.js': Server,
  Flutter: Smartphone,
  Expo: Layers,
  MySQL: Database,
  MongoDB: Database,
  PostgreSQL: Database,
  Docker: Box,
  Git: GitBranch,
  Linux: Terminal,
};

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative py-20 sm:py-24">
      <Aurora className="opacity-60" />
      <div className="container-x">
        <SectionHead eyebrow={t.skills.title} title={t.skills.subtitle} align="center" />

        <Stagger className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" step={0.04}>
          {skills.map((name) => {
            const Icon = ICONS[name];
            return (
              <StaggerItem key={name} className="h-full">
                <Tilt className="h-full" max={10}>
                  <div className="glass card-hover group flex h-full flex-col items-center gap-3 !rounded-2xl px-4 py-6">
                    <span className="chip inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink-soft transition-colors group-hover:text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-ink-soft transition-colors group-hover:text-ink">{name}</span>
                  </div>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
