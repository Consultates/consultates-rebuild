import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  useReducedMotion,
  getVariant,
  scaleIn,
  viewportConfig,
} from '../../lib/animations';

interface StakesCTAPulseProps {
  href: string;
  text: string;
}

/**
 * CTA button with continuous pulse animation.
 * Initial scaleIn with 600ms delay, then infinite subtle pulse.
 * Respects reduced motion — renders static button.
 */
export function StakesCTAPulse({ href, text }: StakesCTAPulseProps) {
  const reducedMotion = useReducedMotion();
  const [pulsing, setPulsing] = useState(false);
  const v = getVariant(scaleIn, reducedMotion);

  if (reducedMotion) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center font-sans font-semibold rounded-full h-12 px-8 text-body-lg transition-all duration-150 hover:scale-[1.02]"
        style={{ background: '#5C3B9C', color: '#FFFFFF' }}
      >
        {text}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center font-sans font-semibold rounded-full h-12 px-8 text-body-lg transition-colors duration-150"
      style={{ background: '#5C3B9C', color: '#FFFFFF' }}
      variants={v}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      transition={{ delay: 0.6 }}
      onAnimationComplete={() => setPulsing(true)}
      animate={
        pulsing
          ? { scale: [1, 1.05, 1] }
          : undefined
      }
      {...(pulsing
        ? {
            transition: {
              duration: 0.4,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 2,
            },
          }
        : {})}
      whileHover={{ scale: 1.02, background: '#4E3285' }}
    >
      {text}
    </motion.a>
  );
}
