import { motion } from 'framer-motion';
import {
  useReducedMotion,
  viewportConfig,
} from '../../lib/animations';

interface StakesCTAPulseProps {
  href: string;
  text: string;
}

const ease = [0.25, 0.1, 0.25, 1];

/**
 * CTA button for dark sections — mirrors the hero CTA exactly.
 * Uses btn-alive--on-dark (underline-draw + magnetic hover).
 * Entry: scaleIn with 0.6s delay on viewport.
 * Respects reduced motion — renders static button.
 */
export function StakesCTAPulse({ href, text }: StakesCTAPulseProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-alive btn-alive--lg btn-alive--on-dark"
      >
        {text}
      </a>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={viewportConfig}
      transition={{ duration: 0.5, ease, delay: 0.6 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-alive btn-alive--lg btn-alive--on-dark"
      >
        {text}
      </a>
    </motion.div>
  );
}
