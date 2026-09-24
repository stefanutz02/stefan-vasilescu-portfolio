import type { ReactNode } from 'react';
import { Reveal } from './Motion';

export function Aurora({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`mask-fade-y pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div
        className="absolute -left-[18%] -top-[22%] h-[42rem] w-[42rem] rounded-full blur-2xl animate-drift"
        style={{ background: 'radial-gradient(circle, var(--aurora-a), transparent 62%)' }}
      />
      <div
        className="absolute -right-[14%] top-[6%] h-[34rem] w-[34rem] rounded-full blur-2xl animate-drift [animation-delay:-8s]"
        style={{ background: 'radial-gradient(circle, var(--aurora-b), transparent 64%)' }}
      />
      <div
        className="absolute bottom-[-18%] left-[28%] h-[36rem] w-[36rem] rounded-full blur-2xl animate-drift [animation-delay:-16s]"
        style={{ background: 'radial-gradient(circle, var(--aurora-c), transparent 66%)' }}
      />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12]">{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <p className="lead mt-4">{body}</p>
        </Reveal>
      )}
    </div>
  );
}
