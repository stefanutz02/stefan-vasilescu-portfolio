'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { damping: 30, stiffness: 1000 });
  const dotY = useSpring(cursorY, { damping: 30, stiffness: 1000 });
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 400 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 400 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/30 bg-purple-500/5 backdrop-blur-sm"
          animate={{
            width: isHovering ? 64 : 40,
            height: isHovering ? 64 : 40,
            opacity: isHovering ? 0.9 : 0.5,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            boxShadow: isHovering
              ? '0 0 30px rgba(168, 85, 247, 0.25)'
              : '0 0 15px rgba(168, 85, 247, 0.08)',
          }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
      </motion.div>
    </>
  );
}