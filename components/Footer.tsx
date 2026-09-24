'use client';

import { ArrowUp } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { companies, socials } from '@/lib/data';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'] as const;

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8">
      <div className="container-x">
        <div className="glass-tint glass-edge overflow-hidden !rounded-[36px] px-6 py-12 sm:px-10 sm:py-14">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              {/* Signature */}
              <div className="relative inline-block -rotate-1 transition-transform duration-500 hover:rotate-0">
                <p className="chrome-purple-text select-none whitespace-nowrap font-signature text-[2.75rem] leading-none drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] sm:text-5xl">
                  Stefan Vasilescu
                </p>
                <svg aria-hidden="true" className="absolute -bottom-3 left-0 h-3 w-full text-brand-500/50" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0 4 Q 50 0, 100 4 T 200 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="mt-7 text-sm leading-relaxed text-ink-soft">{t.footer.tagline}</p>
            </div>

            <FooterCol title={t.footer.sections}>
              {SECTIONS.map((id) => (
                <FooterLink key={id} href={`#${id}`}>
                  {t.nav[id]}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title={t.footer.companies}>
              {companies.map((c) => (
                <FooterLink key={c.href} href={c.href} external>
                  {c.name}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title={t.footer.connect}>
              {socials.map((s) => (
                <FooterLink key={s.id} href={s.href} external={s.id !== 'email'}>
                  {s.label}
                </FooterLink>
              ))}
            </FooterCol>
          </div>

          <div className="hairline my-9" />

          <div className="flex flex-col gap-4 text-[12.5px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} Stefan Vasilescu. {t.footer.rights}
            </p>
            <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
              {t.footer.backToTop}
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
      <div className="h-10" />
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{title}</h3>
      <div className="mt-4 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="w-fit text-sm text-ink-soft transition-colors hover:text-accent"
    >
      {children}
    </a>
  );
}
