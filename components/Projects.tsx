'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Bot, ExternalLink, Github, Smartphone, X } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { Reveal, Tilt } from './Motion';
import { SectionHead } from './UI';
import { projects, type Project } from '@/lib/data';

type Category = Project['category'];

function Cover({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }
  // Branded fallback cover for projects without a screenshot
  return (
    <div role="img" aria-label={project.imageAlt} className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-700 to-brand-400">
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-70 [--grid-line:rgba(255,255,255,0.12)]" />
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-white backdrop-blur-md">
          <Bot className="h-8 w-8" />
        </span>
      </div>
    </div>
  );
}

export function Projects() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState<Category>('coding');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter((p) => p.category === category);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  return (
    <section id="projects" className="relative py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead eyebrow={t.projects.title} title={t.projects.subtitle} />
          <Reveal delay={0.14}>
            <div className="chip inline-flex shrink-0 rounded-full p-1" role="tablist">
              {(['coding', 'robotics'] as const).map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={category === cat}
                  onClick={() => setCategory(cat)}
                  className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    category === cat ? 'text-white' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {category === cat && (
                    <motion.span
                      layoutId="project-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 shadow-[0_10px_24px_-10px_rgba(168,85,247,.9)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{t.projects[cat]}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Tilt className="h-full" max={5}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(p)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(p))}
                    className="glass card-hover group flex h-full cursor-pointer flex-col overflow-hidden text-left"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                      <Cover project={p} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                        <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                          {p.inDevelopment ? t.projects.inDevelopment : t.projects[p.category]}
                        </span>
                        {p.github && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                            <Github className="h-3.5 w-3.5" />
                            {p.github.length} {p.github.length === 1 ? t.projects.repo : t.projects.repos}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg transition-colors group-hover:text-accent">{p.title}</h3>
                      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">{p.description[lang]}</p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span key={tag} className="chip rounded-full px-2.5 py-1 text-[11px] font-semibold text-accent">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                        {t.projects.viewProject}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---------------------------- modal ---------------------------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong glass-edge relative max-h-[90vh] w-full max-w-2xl overflow-y-auto !rounded-[32px]"
            >
              <div className="group relative aspect-video overflow-hidden bg-brand-950">
                <Cover project={selected} sizes="(max-width: 768px) 100vw, 672px" priority />
                <button
                  onClick={() => setSelected(null)}
                  aria-label={t.projects.close}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-7 sm:p-8">
                <span className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {selected.inDevelopment ? t.projects.inDevelopment : t.projects[selected.category]}
                </span>
                <h3 id="project-title" className="mt-4 text-2xl">
                  {selected.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{selected.description[lang]}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="chip rounded-full px-3 py-1 text-[12px] font-semibold text-accent">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {selected.link && (
                    <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <ExternalLink className="h-4 w-4" />
                      {t.projects.visit}
                    </a>
                  )}
                  {selected.github?.map((repo) => (
                    <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      <Github className="h-4 w-4" />
                      {selected.github!.length > 1 ? `${t.projects.source} · ${repo.label}` : t.projects.source}
                    </a>
                  ))}
                  {selected.appStore && (
                    <a href={selected.appStore} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      <Smartphone className="h-4 w-4" />
                      App Store
                    </a>
                  )}
                  {selected.playStore && (
                    <a href={selected.playStore} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      <Smartphone className="h-4 w-4" />
                      Play Store
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
