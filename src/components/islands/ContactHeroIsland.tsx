import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

interface ContactHeroIslandProps {
  headline: string;
  paragraph: string;
  ctaText: string;
  onComplete?: () => void;
}

const ease = [0.25, 0.1, 0.25, 1];

type HeadlinePart = { type: 'text'; text: string; isEm: boolean } | { type: 'br' };

function parseHeadline(raw: string): HeadlinePart[] {
  const parts: HeadlinePart[] = [];
  const regex = /<em>(.*?)<\/em>|<br\s*\/?>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', text: raw.slice(lastIndex, match.index), isEm: false });
    }
    if (match[0].startsWith('<br')) {
      parts.push({ type: 'br' });
    } else {
      parts.push({ type: 'text', text: match[1], isEm: true });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < raw.length) {
    parts.push({ type: 'text', text: raw.slice(lastIndex), isEm: false });
  }

  return parts;
}

/**
 * Contact page hero animation — mirrors HeroIsland.tsx sequence exactly.
 *
 * Sequence (normal motion):
 *   t=0ms      mount
 *   t=600ms    letter stagger begins (30ms/char)
 *   t=~end     paragraph fadeUp
 *   t=~end+0.6 CTA scaleIn
 *   t=~end+0.5 CTA pulse (extend/retract)
 *   t=~end+0.5 onComplete fires
 *
 * CTA is a <span> (not <a>) — used as TidyCal trigger via id.
 */
export default function ContactHeroIsland({
  headline,
  paragraph,
  ctaText,
  onComplete,
}: ContactHeroIslandProps) {
  const reducedMotion = useReducedMotion();
  const ctaRef = useRef<HTMLSpanElement>(null);
  const [animationPhase, setAnimationPhase] = useState<
    'waiting' | 'staggering' | 'complete'
  >(reducedMotion ? 'complete' : 'waiting');

  const fireComplete = () => {
    onComplete?.();
    window.dispatchEvent(new CustomEvent('contact-hero-complete'));
  };

  useEffect(() => {
    if (reducedMotion) {
      setAnimationPhase('complete');
      fireComplete();
      return;
    }

    setAnimationPhase('staggering');
  }, [reducedMotion]);

  const headlineParts = parseHeadline(headline);
  const textParts = headlineParts.filter(
    (p): p is Extract<HeadlinePart, { type: 'text' }> => p.type === 'text'
  );
  const totalChars = textParts.reduce((n, p) => n + p.text.length, 0);

  // Timing — identical to HeroIsland
  const staggerDuration = totalChars * 0.03;
  const lastLetterDone = 0.4 + staggerDuration + 0.4;
  const paragraphDelay = lastLetterDone + 0.3;
  const ctaDelay = paragraphDelay + 0.6;

  // CTA pulse + onComplete callback
  useEffect(() => {
    if (reducedMotion) return;
    const pulseStart = (ctaDelay + 0.5) * 1000;
    const el = ctaRef.current;
    if (!el) return;
    const t1 = setTimeout(() => { el.classList.add('cta-pulse-extend'); }, pulseStart);
    const t2 = setTimeout(() => {
      el.classList.remove('cta-pulse-extend');
      el.classList.add('cta-pulse-retract');
    }, pulseStart + 900);
    const t3 = setTimeout(() => {
      el.classList.remove('cta-pulse-retract');
      fireComplete();
    }, pulseStart + 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [ctaDelay, reducedMotion]);

  const renderHeadline = () =>
    headlineParts.map((part, i) => {
      if (part.type === 'br') return <br key={i} />;
      return part.isEm ? (
        <em key={i}>{part.text}</em>
      ) : (
        <span key={i}>{part.text}</span>
      );
    });

  if (reducedMotion) {
    return (
      <>
        <h1 className="c-hero-h1">{renderHeadline()}</h1>
        <p className="c-hero-body">{paragraph}</p>
        <div>
          <span
            id="book-call-btn"
            role="button"
            tabIndex={0}
            className="c-hero-cta btn-alive btn-alive--lg btn-alive--on-dark cursor-pointer"
          >
            {ctaText}
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Headline with letter stagger */}
      <motion.h1
        className="c-hero-h1"
        initial="initial"
        animate={animationPhase !== 'waiting' ? 'animate' : 'initial'}
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.15,
            },
          },
        }}
      >
        {headlineParts.map((part, pi) => {
          if (part.type === 'br') return <br key={pi} />;
          const chars = part.text.split('').map((char, ci) => (
            <motion.span
              key={`${pi}-${ci}`}
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
          ));
          return part.isEm ? <em key={pi}>{chars}</em> : <span key={pi}>{chars}</span>;
        })}
      </motion.h1>

      {/* Paragraph fadeUp */}
      <motion.p
        className="c-hero-body"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: paragraphDelay }}
      >
        {paragraph}
      </motion.p>

      {/* CTA scaleIn — span, not anchor */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: ctaDelay }}
      >
        <span
          ref={ctaRef}
          id="book-call-btn"
          role="button"
          tabIndex={0}
          className="c-hero-cta btn-alive btn-alive--lg btn-alive--on-dark cursor-pointer"
        >
          {ctaText}
        </span>
      </motion.div>
    </>
  );
}
