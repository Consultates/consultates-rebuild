import { motion } from 'framer-motion';
import type { Variants, HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion, getVariant, viewportConfig } from '../../lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  variants: Variants;
  className?: string;
  as?: keyof typeof motion;
}

/**
 * Generic animated wrapper for section content.
 * Wraps children in a motion element that animates on viewport entry.
 * Respects reduced motion preferences.
 */
export function AnimatedSection({
  children,
  variants,
  className,
  as = 'div',
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();
  const v = getVariant(variants, reducedMotion);

  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<'div'>>;

  return (
    <MotionTag
      variants={v}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
