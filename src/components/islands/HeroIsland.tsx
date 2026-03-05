import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

interface HeroIslandProps {
  headline: string;
  paragraph: string;
  ctaHref: string;
  ctaText: string;
}

const ease = [0.25, 0.1, 0.25, 1];

/**
 * Hero animation orchestrator with letter stagger sequence.
 *
 * Sequence (normal motion):
 *   t=0ms      mount
 *   t=1200ms   letter stagger begins (30ms/char)
 *   t=~3090ms  paragraph fadeUp
 *   t=~3690ms  CTA scaleIn
 *   t=~4090ms  scroll indicator fade in
 *
 * Reduced motion: all content visible immediately, no animation.
 */
export default function HeroIsland({
  headline,
  paragraph,
  ctaHref,
  ctaText,
}: HeroIslandProps) {
  const reducedMotion = useReducedMotion();
  const [animationPhase, setAnimationPhase] = useState<
    'waiting' | 'staggering' | 'complete'
  >(reducedMotion ? 'complete' : 'waiting');

  useEffect(() => {
    if (reducedMotion) {
      setAnimationPhase('complete');
      return;
    }

    const timer = setTimeout(() => {
      setAnimationPhase('staggering');
    }, 1200);

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Timing calculations
  const charCount = headline.length;
  const staggerDuration = charCount * 0.03; // 30ms per char in seconds
  const headlineEndDelay = 1.2 + staggerDuration; // 1200ms initial + stagger
  const paragraphDelay = headlineEndDelay + 0.2;
  const ctaDelay = paragraphDelay + 0.6;
  const scrollDelay = ctaDelay + 0.4;

  if (reducedMotion) {
    return (
      <>
        <div className="max-w-[800px]">
          <h1 className="text-hero text-foreground">{headline}</h1>
          <p className="text-body-lg text-muted-foreground mt-6">{paragraph}</p>
          <div className="mt-8">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans font-semibold rounded-lg h-12 px-8 text-body-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-all duration-150 hover:scale-[1.02]"
            >
              {ctaText}
            </a>
          </div>
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="w-[30px] h-[50px] border-2 border-foreground rounded-[15px] opacity-60 flex justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 scroll-bob-dot" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-[800px]">
        {/* Headline with letter stagger */}
        <motion.h1
          className="text-hero text-foreground"
          initial="initial"
          animate={animationPhase !== 'waiting' ? 'animate' : 'initial'}
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.03,
              },
            },
          }}
        >
          {headline.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease },
                },
              }}
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Paragraph fadeUp */}
        <motion.p
          className="text-body-lg text-muted-foreground mt-6"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: paragraphDelay }}
        >
          {paragraph}
        </motion.p>

        {/* CTA scaleIn */}
        <motion.div
          className="mt-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: ctaDelay }}
        >
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-sans font-semibold rounded-lg h-12 px-8 text-body-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-all duration-150 hover:scale-[1.02]"
          >
            {ctaText}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator fade in */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, ease, delay: scrollDelay }}
      >
        <div className="w-[30px] h-[50px] border-2 border-foreground rounded-[15px] flex justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 scroll-bob-dot" />
        </div>
      </motion.div>
    </>
  );
}
