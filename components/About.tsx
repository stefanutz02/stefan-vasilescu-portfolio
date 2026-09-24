'use client';

import { Code2, Cpu, Layers, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { Stagger, StaggerItem } from './Motion';
import { SectionHead } from './UI';

const cards = [
  { key: 'p1' as const, icon: Code2 },
  { key: 'p2' as const, icon: Layers },
  { key: 'p3' as const, icon: Cpu },
  { key: 'p4' as const, icon: Sparkles },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead eyebrow={t.about.title} title={t.about.subtitle} />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <StaggerItem key={c.key} className="h-full">
              <div className="glass card-hover group flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="chip inline-flex h-12 w-12 items-center justify-center rounded-2xl text-accent transition-transform duration-500 group-hover:scale-105">
                    <c.icon className="h-[22px] w-[22px]" />
                  </span>
                  <span className="font-display text-[13px] font-bold text-brand-400/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-[17px] leading-snug">{t.about.cards[c.key]}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{t.about[c.key]}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
