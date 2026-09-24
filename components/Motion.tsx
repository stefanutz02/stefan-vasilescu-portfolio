'use client';

import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/* Reveal — fades + lifts a block into view once */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -6% 0px' });
  const reduce = useReducedMotion();
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' };

  return (
    <motion.div
      ref={ref}
      data-reveal=""
      className={className}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : hidden}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger — children animate in sequence */
export function Stagger({
  children,
  className,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ScrollProgress — thin accent bar at the very top of the page */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-300 via-brand-500 to-brand-700"
    />
  );
}

/* Tilt — pointer-reactive glass card */
export function Tilt({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform .5s cubic-bezier(.16,1,.3,1)' }}
    >
      {children}
    </div>
  );
}

/* Marquee — infinite horizontal ribbon */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <div className="mask-fade-x relative overflow-hidden py-2">
      <div className="flex w-max animate-marquee gap-3">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="glass inline-flex items-center gap-2.5 whitespace-nowrap !rounded-full px-5 py-2.5 text-sm font-medium text-ink-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
