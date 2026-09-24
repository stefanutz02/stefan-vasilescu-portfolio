'use client';

import { Briefcase, Clock } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { Reveal } from './Motion';
import { Aurora, SectionHead } from './UI';

const KEYS = ['vesko', 'era', 'freelance'] as const;

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <Aurora className="opacity-50" />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead eyebrow={t.experience.title} title={t.experience.subtitle} />
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[23px] top-2 w-px bg-gradient-to-b from-brand-500/60 via-brand-500/25 to-transparent"
            />
            <ol className="flex flex-col gap-5">
              {KEYS.map((key, i) => {
                const d = t.experience[key];
                return (
                  <li key={key}>
                    <Reveal delay={i * 0.08} className="relative flex gap-5">
                      <span className="relative z-10 mt-5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-[0_10px_24px_-10px_rgba(168,85,247,.9)]">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <div className="glass card-hover flex-1 p-6 sm:p-7">
                        <span className="chip inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold text-accent">
                          <Clock className="h-3.5 w-3.5" />
                          {d.period}
                        </span>
                        <h3 className="mt-4 text-xl leading-snug">{d.role}</h3>
                        <p className="mt-1 text-sm font-medium text-ink-faint">{d.company}</p>
                        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{d.description}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
