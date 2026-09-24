'use client';

import { useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Github, Linkedin, Mail, Send, Twitter, type LucideIcon } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { Reveal, Stagger, StaggerItem } from './Motion';
import { Aurora, SectionHead } from './UI';
import { CONTACT_API_URL, socials } from '@/lib/data';

const SOCIAL_ICONS: Record<(typeof socials)[number]['id'], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormState('sending');
    setErrorMsg('');

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: { success?: boolean; error?: string } = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok && data.success) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
        setErrorMsg(data.error || t.contact.error);
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setFormState('error');
      setErrorMsg(t.contact.error);
    }

    setTimeout(() => {
      setFormState((current) => (current === 'sending' ? current : 'idle'));
      setErrorMsg('');
    }, 5000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="glass-tint glass-edge relative overflow-hidden !rounded-[36px] px-6 py-12 sm:px-12 sm:py-16">
            <Aurora className="opacity-70" />

            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
              {/* --- left: heading + socials --- */}
              <div>
                <SectionHead eyebrow={t.contact.title} title={t.contact.subtitle} />
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">{t.contact.social}</p>
                <Stagger className="mt-4 flex flex-col gap-3" step={0.07}>
                  {socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.id];
                    return (
                      <StaggerItem key={s.id}>
                        <a
                          href={s.href}
                          target={s.id === 'email' ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          className="glass card-hover group flex items-center gap-4 !rounded-2xl p-3.5 pr-5"
                        >
                          <span className="chip inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink-soft transition-colors group-hover:text-accent">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[12px] text-ink-faint">{s.label}</span>
                            <span className="block truncate text-[15px] font-medium text-ink transition-colors group-hover:text-accent">
                              {s.handle}
                            </span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                        </a>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>

              {/* --- right: form --- */}
              <Reveal delay={0.12}>
                <form onSubmit={handleSubmit} className="glass-strong glass-edge flex flex-col gap-5 !rounded-[28px] p-6 sm:p-8">
                  <div>
                    <label htmlFor="c-name" className="mb-2 block text-[13px] font-medium text-ink-soft">
                      {t.contact.name}
                    </label>
                    <input id="c-name" required name="name" type="text" autoComplete="name" className="field" placeholder={t.contact.namePlaceholder} />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-2 block text-[13px] font-medium text-ink-soft">
                      {t.contact.email}
                    </label>
                    <input id="c-email" required name="email" type="email" autoComplete="email" className="field" placeholder={t.contact.emailPlaceholder} />
                  </div>
                  <div>
                    <label htmlFor="c-message" className="mb-2 block text-[13px] font-medium text-ink-soft">
                      {t.contact.message}
                    </label>
                    <textarea id="c-message" required name="message" rows={5} className="field resize-none" placeholder={t.contact.messagePlaceholder} />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending' || formState === 'success'}
                    className="btn-primary group mt-1 w-full !py-3.5 disabled:translate-y-0 disabled:opacity-70"
                    aria-live="polite"
                  >
                    {formState === 'sending' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        {t.contact.sending}
                      </>
                    ) : formState === 'success' ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        {t.contact.success}
                      </>
                    ) : formState === 'error' ? (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        {errorMsg || t.contact.error}
                      </>
                    ) : (
                      <>
                        {t.contact.send}
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
