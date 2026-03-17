import { useState, useEffect, useRef } from 'react';
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
 * Hero animation orchestrator with letter stagger sequence.
 *
 * Sequence (normal motion):
 *   t=0ms      mount
 *   t=1000ms   tagline fadeUp + letter stagger begins (30ms/char)
 *   t=~end     paragraph fadeUp
 *   t=~end+0.6 CTA scaleIn
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
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [animationPhase, setAnimationPhase] = useState<
    'waiting' | 'staggering' | 'complete'
  >(reducedMotion ? 'complete' : 'waiting');

  useEffect(() => {
    if (reducedMotion) {
      setAnimationPhase('complete');
      return;
    }

    setAnimationPhase('staggering');
  }, [reducedMotion]);

  const headlineParts = parseHeadline(headline);
  const textParts = headlineParts.filter((p): p is Extract<HeadlinePart, { type: 'text' }> => p.type === 'text');
  const totalChars = textParts.reduce((n, p) => n + p.text.length, 0);

  // Timing calculations
  const staggerDuration = totalChars * 0.03; // 30ms per char
  const lastLetterDone = 0.4 + staggerDuration + 0.4; // delayChildren + stagger + last letter's 400ms fade
  const paragraphDelay = lastLetterDone + 0.3;
  const ctaDelay = paragraphDelay + 0.6;

  // CTA pulse: underline extend + glow after scaleIn finishes
  useEffect(() => {
    if (reducedMotion) return;
    const pulseStart = (ctaDelay + 0.5) * 1000; // after scaleIn completes
    const el = ctaRef.current;
    if (!el) return;
    const t1 = setTimeout(() => { el.classList.add('cta-pulse-extend'); }, pulseStart);
    const t2 = setTimeout(() => {
      el.classList.remove('cta-pulse-extend');
      el.classList.add('cta-pulse-retract');
    }, pulseStart + 900);
    const t3 = setTimeout(() => { el.classList.remove('cta-pulse-retract'); }, pulseStart + 1300);
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
        {tagline && <p className="c-hero-tagline">{tagline}</p>}
        <h1 className="c-hero-h1">{renderHeadline()}</h1>
        <p className="c-hero-body">{paragraph}</p>
        <div>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="c-hero-cta btn-alive btn-alive--lg btn-alive--on-dark"
          >
            {ctaText}
          </a>
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
          animate={animationPhase !== 'waiting' ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {tagline}
        </motion.p>
      )}

      {/* Headline with letter stagger — em segments grouped */}
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
          // Group characters into words wrapped in nowrap spans to prevent mid-word breaks
          const words = part.text.split(/(\s+)/);
          let charIndex = 0;
          const wordSpans = words.map((word, wi) => {
            if (/^\s+$/.test(word)) {
              // Whitespace between words — use regular space (not \u00A0) to allow line breaks
              const spaceChars = word.split('').map((_, si) => (
                <motion.span
                  key={`${pi}-${charIndex + si}`}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                  }}
                  style={{ display: 'inline' }}
                >
                  {' '}
                </motion.span>
              ));
              charIndex += word.length;
              return <span key={`w${pi}-${wi}`}>{spaceChars}</span>;
            }
            // Actual word — wrap in nowrap span
            const letterSpans = word.split('').map((char, ci) => (
              <motion.span
                key={`${pi}-${charIndex + ci}`}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ));
            charIndex += word.length;
            return <span key={`w${pi}-${wi}`} style={{ whiteSpace: 'nowrap' }}>{letterSpans}</span>;
          });
          return part.isEm ? <em key={pi}>{wordSpans}</em> : <span key={pi}>{wordSpans}</span>;
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

      {/* CTA scaleIn */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: ctaDelay }}
      >
        <a
          ref={ctaRef}
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="c-hero-cta btn-alive btn-alive--lg btn-alive--on-dark"
        >
          {ctaText}
        </a>
      </motion.div>
    </>
  );
}
