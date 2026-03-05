import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  useReducedMotion,
  getVariant,
  fadeUp,
  viewportConfig,
} from '../../lib/animations';

interface SectionAnimatorProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'stagger';
  delay?: number;
  className?: string;
  as?: 'div' | 'p' | 'h2';
}

/**
 * Reusable wrapper for section entrance animations.
 * Wraps children in a motion element that fades up on viewport entry.
 * Respects reduced motion — renders static wrapper with no animation.
 */
export function SectionAnimator({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
  as = 'div',
}: SectionAnimatorProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const baseVariant = fadeUp;
  const v = getVariant(baseVariant, false);

  // Add delay to the animate transition if specified
  const delayedVariant = delay > 0
    ? {
        ...v,
        animate: {
          ...(v.animate as object),
          transition: {
            ...((v.animate as Record<string, unknown>)?.transition as object || {}),
            delay,
          },
        },
      }
    : v;

  const MotionTag = motion[as];

  return (
    <MotionTag
      variants={delayedVariant}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
