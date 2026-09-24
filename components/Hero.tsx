'use client';

import Image from 'next/image';
import { ArrowDown, ArrowRight, Briefcase, Check, MapPin, Rocket } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { Marquee, Reveal, Stagger, StaggerItem, Tilt } from './Motion';
import { Aurora } from './UI';
import { skills } from '@/lib/data';

const HERO_STACK = ['React', 'Next.js', 'Node.js', 'TypeScript', 'Expo', 'Docker'];

export function Hero() {
  const { t } = useLanguage();
  const [first, ...rest] = t.hero.name.split(' ');

  return (
    <>
      <section id="home" className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Aurora />
        <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />

        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
            {/* --- copy --- */}
            <div>
              <Reveal>
                <span className="eyebrow">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
                  </span>
                  {t.hero.greeting}
                </span>
              </Reveal>

              <Reveal delay={0.07}>
                <h1 className="mt-6 text-[clamp(2.6rem,6.2vw,4.6rem)] font-bold leading-[1.02]">
                  {first} <span className="gradient-text">{rest.join(' ')}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="chrome-purple-text mt-4 font-display text-[clamp(1.35rem,2.6vw,1.9rem)] font-bold tracking-tight">
                  {t.hero.title}
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="lead mt-5 max-w-xl">{t.hero.description}</p>
              </Reveal>

              <Stagger className="mt-7 flex flex-col gap-3" step={0.09}>
                {[
                  { label: t.hero.role1, href: 'https://vesko.ro' },
                  { label: t.hero.role2, href: 'https://erainnovations.ro' },
                ].map((r) => (
                  <StaggerItem key={r.href}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-3"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                        <Check className="h-3 w-3" strokeWidth={2.6} />
                      </span>
                      <span className="text-[15px] leading-relaxed text-ink-soft underline decoration-brand-500/25 underline-offset-4 transition-colors group-hover:text-accent group-hover:decoration-brand-500/60">
                        {r.label}
                      </span>
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.3}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href="#projects" className="btn-primary group">
                    {t.hero.ctaProjects}
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </a>
                  <a href="#contact" className="btn-ghost">
                    {t.hero.ctaContact}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.38}>
                <div className="mt-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">{t.hero.stackLabel}</p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {HERO_STACK.map((s) => (
                      <span
                        key={s}
                        className="glass inline-flex items-center gap-2 !rounded-full px-3.5 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-accent"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* --- glass profile card --- */}
            <Reveal delay={0.2} y={40}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <Tilt max={8}>
                  <div className="glass-strong glass-edge relative !rounded-[32px] p-6 sm:p-7">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      <span className="chip ml-3 rounded-md px-2.5 py-1 text-[11px] font-medium text-accent">
                        stefanvasilescu.com
                      </span>
                    </div>

                    <div className="mt-8 flex flex-col items-center text-center">
                      {/* portrait with rotating chrome ring */}
                      <div className="relative">
                        <div
                          aria-hidden="true"
                          className="absolute -inset-3 rounded-full bg-brand-500/30 blur-2xl"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -inset-1 animate-spin-slow rounded-full opacity-90"
                          style={{
                            background:
                              'conic-gradient(from 0deg, transparent 0%, #a855f7 25%, #e9d5ff 50%, #7c3aed 75%, transparent 100%)',
                          }}
                        />
                        <div className="relative h-32 w-32 overflow-hidden rounded-full border-[3px] border-[rgb(var(--surface))] sm:h-40 sm:w-40">
                          <Image
                            src="/stefan-vasilescu-portrait.jpg"
                            alt="Stefan Vasilescu, Full-Stack Developer and CEO of Vesko Software, portrait photograph"
                            fill
                            priority
                            sizes="160px"
                            className="object-cover"
                          />
                        </div>
                        <span
                          className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-[rgb(var(--surface))] bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]"
                          aria-label={t.hero.available}
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-60" />
                        </span>
                      </div>

                      <p className="mt-6 font-display text-xl font-semibold text-ink">{t.hero.name}</p>
                      <p className="mt-1 text-sm text-ink-faint">{t.hero.title}</p>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                      {[
                        { icon: Rocket, top: 'Vesko Software', bottom: 'CEO' },
                        { icon: Briefcase, top: 'Era Innovations', bottom: 'Co-Founder' },
                      ].map((c) => (
                        <div key={c.top} className="glass !rounded-2xl p-4">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white">
                            <c.icon className="h-4 w-4" />
                          </span>
                          <p className="mt-3 text-[13px] font-semibold leading-tight text-ink">{c.top}</p>
                          <p className="mt-0.5 text-[12px] text-ink-faint">{c.bottom}</p>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 px-4 py-3.5 transition-opacity hover:opacity-90"
                    >
                      <span className="text-[13px] font-semibold text-white">{t.hero.available}</span>
                      <ArrowRight className="h-4 w-4 text-white" />
                    </a>
                  </div>
                </Tilt>

                {/* floating chips */}
                <div className="absolute -left-12 top-32 z-10 hidden animate-float lg:block">
                  <div className="glass flex items-center gap-2.5 !rounded-2xl px-4 py-3">
                    <MapPin className="h-4 w-4 text-brand-500" />
                    <span className="text-[12.5px] font-semibold text-ink">{t.hero.location}</span>
                  </div>
                </div>
                <div className="absolute -right-8 bottom-24 z-10 hidden animate-float [animation-delay:-4s] lg:block">
                  <div className="glass flex items-center gap-2.5 !rounded-2xl px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-[12.5px] font-semibold text-ink">EN · RO</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* --- stats strip --- */}
          <Reveal delay={0.1}>
            <div className="glass-tint glass-edge mt-16 grid grid-cols-2 gap-8 !rounded-[28px] px-7 py-8 sm:mt-20 sm:grid-cols-4 sm:px-10">
              {t.hero.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="gradient-text font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-none">
                    {s.value}
                  </span>
                  <span className="mt-2 text-[12.5px] leading-snug text-ink-faint">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* marquee ribbon */}
      <section aria-hidden="true" className="py-4">
        <Marquee items={skills} />
      </section>
    </>
  );
}
