'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { Send, Github, Linkedin, Mail, Twitter, AlertCircle, CheckCircle2 } from 'lucide-react';

const API_URL = 'https://email-api.stefanvasilescu.com/contact';

export function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let data;
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        setFormState('error');
        setErrorMsg(data.error || t.contact.error);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setFormState('success');
        e.currentTarget.reset();
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
    <section id="contact" className="relative py-32 bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/15 via-neutral-950 to-neutral-950" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4">
            {t.contact.title}
          </h2>
          <p className="text-3xl md:text-4xl font-display font-bold text-white">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-neutral-400 mb-2">{t.contact.name}</label>
              <input
                required
                name="name"
                type="text"
                className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">{t.contact.email}</label>
              <input
                required
                name="email"
                type="email"
                className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">{t.contact.message}</label>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'sending' || formState === 'success'}
              className="group relative w-full py-4 rounded-xl bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700 text-white font-medium transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] disabled:opacity-70 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {formState === 'sending' ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.contact.sending}
                  </>
                ) : formState === 'success' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    {t.contact.success}
                  </>
                ) : formState === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    {errorMsg || t.contact.error}
                  </>
                ) : (
                  <>
                    {t.contact.send}
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <p className="text-neutral-400 mb-8">{t.contact.social}</p>
            <div className="space-y-4">
              {[
                {
                  icon: Github,
                  label: 'GitHub',
                  href: 'https://github.com/stefanutz02',
                  handle: '@stefanutz02',
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  href: 'https://linkedin.com/in/stefanvasilescu',
                  handle: 'Stefan Vasilescu',
                },
                {
                  icon: Twitter,
                  label: 'Twitter / X',
                  href: 'https://twitter.com/stefanutz02',
                  handle: '@stefanutz02',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  href: 'mailto:contact@stefanvasilescu.com',
                  handle: 'contact@stefanvasilescu.com',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 hover:bg-purple-500/[0.03] transition-all"
                >
                  <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/15 group-hover:bg-purple-500/15 group-hover:border-purple-400/30 transition-colors">
                    <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">{social.label}</p>
                    <p className="text-white font-medium group-hover:text-purple-200 transition-colors">
                      {social.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}