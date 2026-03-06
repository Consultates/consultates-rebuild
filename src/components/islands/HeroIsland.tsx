import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

interface HeroIslandProps {
  tagline?: string;
  headline: string;
  paragraph: string;
  ctaHref: string;
  ctaText: string;
}

const ease = [0.25, 0.1, 0.25, 1];

/**
 * Parse headline string to support <em> tags without innerHTML.
 * Returns array of { text, isEm } segments.
 */
function parseHeadline(raw: string): { text: string; isEm: boolean }[] {
  const parts: { text: string; isEm: boolean }[] = [];
  const regex = /<em>(.*?)<\/em>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: raw.slice(lastIndex, match.index), isEm: false });
    }
    parts.push({ text: match[1], isEm: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < raw.length) {
    parts.push({ text: raw.slice(lastIndex), isEm: false });
  }

  return parts;
}

/**
 * Hero animation orchestrator with whole-element fade-up sequence.
 *
 * Sequence (normal motion):
 *   t=0ms      mount
 *   t=1000ms   animation begins
 *   Tagline:   fadeUp delay 0.2s
 *   Headline:  fadeUp delay 0.4s
 *   Body:      fadeUp delay 0.8s
 *   CTA:       scaleIn delay 1.2s
 *   Scroll:    fadeIn delay 1.6s
 *
 * Reduced motion: all content visible immediately, no animation.
 */
export default function HeroIsland({
  tagline,
  headline,
  paragraph,
  ctaHref,
  ctaText,
}: HeroIslandProps) {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setReady(true);
      return;
    }

    const timer = setTimeout(() => {
      setReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const headlineParts = parseHeadline(headline);

  const renderHeadline = () =>
    headlineParts.map((part, i) =>
      part.isEm ? (
        <em key={i}>{part.text}</em>
      ) : (
        <span key={i}>{part.text}</span>
      )
    );

  if (reducedMotion) {
    return (
      <>
        {tagline && <p className="c-hero-tagline">{tagline}</p>}
        <h1 className="c-hero-h1">{renderHeadline()}</h1>
        <p className="c-hero-body">{paragraph}</p>
        <div>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="c-hero-cta"
          >
            {ctaText}
            <span className="arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
          data-scroll-indicator
        >
          <div
            className="w-[30px] h-[50px] rounded-[15px] flex justify-center"
            style={{ border: '2px solid rgba(255,255,255,0.6)' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 scroll-bob-dot"
              style={{ background: 'rgba(255,255,255,0.6)' }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Tagline fadeUp */}
      {tagline && (
        <motion.p
          className="c-hero-tagline"
          initial={{ y: 24, opacity: 0 }}
          animate={ready ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          {tagline}
        </motion.p>
      )}

      {/* Headline fadeUp */}
      <motion.h1
        className="c-hero-h1"
        initial={{ y: 24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
      >
        {renderHeadline()}
      </motion.h1>

      {/* Body fadeUp */}
      <motion.p
        className="c-hero-body"
        initial={{ y: 24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.8 }}
      >
        {paragraph}
      </motion.p>

      {/* CTA scaleIn */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease, delay: 1.2 }}
      >
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="c-hero-cta"
        >
          {ctaText}
          <span className="arrow" aria-hidden="true">&rarr;</span>
        </a>
      </motion.div>

      {/* Scroll indicator fadeIn */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
        data-scroll-indicator
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease, delay: 1.6 }}
      >
        <div
          className="w-[30px] h-[50px] rounded-[15px] flex justify-center"
          style={{ border: '2px solid rgba(255,255,255,0.6)' }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full mt-1.5 scroll-bob-dot"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          />
        </div>
      </motion.div>
    </>
  );
}
