import { useState, useEffect } from 'react';
import type { Variants } from 'framer-motion';

/**
 * Shared Framer Motion animation variants and utilities.
 * Single source of truth for all FM animation config across React islands.
 */

const ease = [0.25, 0.1, 0.25, 1] as const;

/** Fade up from y: 24 with opacity transition (desktop) */
export const fadeUp: Variants = {
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease } },
};

/** Fade up with shorter distance for mobile */
export const fadeUpMobile: Variants = {
  initial: { y: 16, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease } },
};

/** Scale in from 0.95 with opacity transition */
export const scaleIn: Variants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.5, ease } },
};

/** Stagger container — orchestrates children with stagger delay */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/** Hover lift config — spread onto motion components as props */
export const hoverLift = {
  whileHover: { y: -4 },
} as const;

/** Viewport intersection config for whileInView (desktop) */
export const viewportConfig = { once: true, amount: 0.3 } as const;

/** Viewport intersection config for mobile (lower threshold) */
export const viewportConfigMobile = { once: true, amount: 0.2 } as const;

/**
 * Custom hook to detect prefers-reduced-motion.
 * SSR-safe: defaults to false, updates on mount and on live media query changes.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}

/**
 * Returns a variant with animation disabled when reduced motion is preferred.
 * Usage: `const v = getVariant(fadeUp, reducedMotion)`
 */
export function getVariant(variant: Variants, reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { initial: {}, animate: {} };
  }
  return variant;
}
