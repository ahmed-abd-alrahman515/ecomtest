'use client';

import { ElementType, HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type RevealAnimation =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'zoomIn';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  children: ReactNode;
}

export function Reveal({
  as: Component = 'div',
  animation = 'fadeInUp',
  delay = 0,
  duration = 650,
  threshold = 0.12,
  once = true,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!node || reduceMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      setReady(true);
      return;
    }

    setReady(true);
    const fallback = window.setTimeout(() => setVisible(true), 1200);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          window.clearTimeout(fallback);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [once, threshold]);

  const revealStyle = {
    '--animate-duration': `${duration}ms`,
    '--animate-delay': `${delay}ms`,
    animationDelay: visible ? `${delay}ms` : undefined,
    ...style,
  } as CSSProperties & Record<string, string | undefined>;

  return (
    <Component
      ref={ref}
      className={cn(
        'motion-reveal',
        ready && !visible && 'motion-reveal--hidden',
        visible && `animate__animated animate__${animation}`,
        className
      )}
      style={revealStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
