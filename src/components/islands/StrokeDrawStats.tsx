import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

const letterEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface StatData {
  value: string;
  label: string;
  source: string;
}

const STATS: StatData[] = [
  {
    value: '84%',
    label: 'of the world hasn\'t used AI at all. Most leaders are still at zero.',
    source: 'DataReportal Digital 2026',
  },
  {
    value: '5% to 40%',
    label: 'of enterprise apps will have AI agents in one year.',
    source: 'Gartner, Aug 2025',
  },
  {
    value: '12-18 months',
    label: 'until white collar computer tasks are fully automated, according to the CEO of Microsoft AI.',
    source: 'Mustafa Suleiman, Feb 2026',
  },
];

const SECTION_TITLE = 'The ground is moving faster than most people realise';

const PULL_QUOTE = {
  text: 'I have never seen such a yawning inside-outside gap. People in SF are putting multi-agent Claude swarms in charge of their lives… People elsewhere are still trying to get approval to use co-pilot.',
  attribution: 'Kevin Roose, NYT Tech Columnist, Feb 2026',
};

// Timing
const TITLE_DELAY = 200;
const STAT_STAGGER = 1200;
const DRAW_DURATION = 1600;
const FILL_PAUSE = 500;
const QUOTE_PAUSE = 300;
const LETTER_STAGGER = 0.018;
const TYPEWRITER_SPEED = 25; // ms per character for stat labels

const QUOTE_STEP = STATS.length + 2;
const SHARED_VIEWBOX_W = 620;
const SHARED_VIEWBOX_H = 90;

/** Split text into words, tracking character indices for stagger delays */
function splitIntoWords(text: string) {
  return text.split(' ').map((word) => word);
}

function TypewriterText({ text, active, reducedMotion, className, delay = 0 }: {
  text: string;
  active: boolean;
  reducedMotion: boolean;
  className?: string;
  delay?: number;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) { setVisibleCount(0); return; }
    if (reducedMotion) { setVisibleCount(text.length); return; }

    let i = 0;
    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setVisibleCount(i);
        if (i >= text.length) clearInterval(interval);
      }, TYPEWRITER_SPEED);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [active, reducedMotion, text, delay]);

  return (
    <p className={className}>
      <span>{text.slice(0, visibleCount)}</span>
      <span style={{ opacity: 0 }}>{text.slice(visibleCount)}</span>
    </p>
  );
}

function StrokeStat({
  stat,
  active,
  reducedMotion,
}: {
  stat: StatData;
  active: boolean;
  reducedMotion: boolean;
}) {
  const textRef = useRef<SVGTextElement>(null);
  const [dashLength, setDashLength] = useState(0);

  useEffect(() => {
    if (!textRef.current) return;
    const len = textRef.current.getComputedTextLength();
    setDashLength(len * 3);
  }, [stat.value]);

  const drawn = active || reducedMotion;

  return (
    <div className="flex flex-col items-center text-center">
      <svg
        viewBox={`0 0 ${SHARED_VIEWBOX_W} ${SHARED_VIEWBOX_H}`}
        aria-hidden="true"
        className="overflow-visible mb-2 w-full"
        style={{ height: 'auto', maxHeight: '90px' }}
      >
        <text
          ref={textRef}
          x="50%"
          y="65"
          textAnchor="middle"
          className="text-stroke-stat"
          style={{
            strokeDasharray: dashLength || 1000,
            strokeDashoffset: drawn ? 0 : (dashLength || 1000),
            fill: drawn ? 'var(--accent)' : 'transparent',
            transition: reducedMotion
              ? 'none'
              : `stroke-dashoffset ${DRAW_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1), fill ${DRAW_DURATION * 0.4}ms ease ${FILL_PAUSE}ms`,
          }}
        >
          {stat.value}
        </text>
      </svg>
      <TypewriterText
        text={stat.label}
        active={active}
        reducedMotion={reducedMotion}
        className="text-body text-foreground mt-1 max-w-[260px]"
        delay={FILL_PAUSE}
      />
      <p
        className="text-cite text-muted-foreground mt-2"
        style={{
          opacity: drawn ? 1 : 0,
          transition: reducedMotion ? 'none' : `opacity 0.4s ease ${FILL_PAUSE + 300}ms`,
        }}
      >
        {stat.source}
      </p>
    </div>
  );
}

const quoteWords = splitIntoWords(`\u201C${PULL_QUOTE.text}\u201D`);

export function StrokeDrawStats() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollSection = containerRef.current.closest('.scroll-section');

    if (scrollSection) {
      const checkActive = () => scrollSection.hasAttribute('data-active');
      if (checkActive()) setIsActive(true);

      const mutObs = new MutationObserver(() => {
        const nowActive = checkActive();
        setIsActive(nowActive);
        if (!nowActive) setRevealStep(0);
      });
      mutObs.observe(scrollSection, { attributes: true, attributeFilter: ['data-active'] });

      const intObs = new IntersectionObserver(
        ([entry]) => {
          setIsActive(entry.isIntersecting);
          if (!entry.isIntersecting) setRevealStep(0);
        },
        { threshold: 0.15 },
      );
      intObs.observe(containerRef.current);

      return () => { mutObs.disconnect(); intObs.disconnect(); };
    }

    const el = containerRef.current;
    const intObs = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        if (!entry.isIntersecting) setRevealStep(0);
      },
      { threshold: 0.15 },
    );
    intObs.observe(el);
    return () => intObs.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;
    if (reducedMotion) {
      setRevealStep(QUOTE_STEP);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setRevealStep(1), TITLE_DELAY));
    for (let i = 0; i < STATS.length; i++) {
      timers.push(
        setTimeout(() => setRevealStep(i + 2), TITLE_DELAY + 500 + i * STAT_STAGGER)
      );
    }
    // Quote starts sooner — right after last stat's stroke + fill
    const quoteTime = TITLE_DELAY + 500 + (STATS.length - 1) * STAT_STAGGER + DRAW_DURATION + QUOTE_PAUSE;
    timers.push(setTimeout(() => setRevealStep(QUOTE_STEP), quoteTime));

    return () => timers.forEach(clearTimeout);
  }, [isActive, reducedMotion]);

  const titleVisible = revealStep >= 1;
  const quoteVisible = revealStep >= QUOTE_STEP;

  // Build character index for stagger delays across all words
  let charIdx = 0;

  return (
    <div ref={containerRef}>
      {/* === CREAM SECTION: Title + Stats === */}
      <div style={{ background: 'var(--secondary)' }}>
        <div
          className="glow max-w-[1200px] mx-auto relative flex flex-col items-center"
          style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 6rem)' }}
        >
          <h2
            className="text-section text-foreground text-center mb-10"
            style={{
              maxWidth: '620px',
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: reducedMotion
                ? 'none'
                : 'opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)',
            }}
          >
            {SECTION_TITLE}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 w-full">
            {STATS.map((stat, i) => (
              <StrokeStat
                key={stat.value}
                stat={stat}
                active={revealStep >= i + 2}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>

      {/* === WHITE SECTION: The Finale — Quote word-by-word stagger === */}
      <div
        className="max-w-[780px] mx-auto text-center"
        style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem)' }}
      >
        <blockquote>
          <p
            className="text-foreground italic"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-section)',
              lineHeight: '1.45',
              letterSpacing: 'var(--ls-section)',
            }}
          >
            {quoteWords.map((word, wi) => {
              const startIdx = charIdx;
              charIdx += word.length + 1; // +1 for space
              return (
                <span key={wi}>
                  <motion.span
                    style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={quoteVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.3,
                      ease: letterEase,
                      delay: quoteVisible ? 0.05 + startIdx * LETTER_STAGGER : 0,
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < quoteWords.length - 1 ? ' ' : null}
                </span>
              );
            })}
          </p>
          <motion.cite
            className="text-cite text-muted-foreground block mt-4 not-italic"
            style={{ fontSize: '0.8125rem' }}
            initial={{ opacity: 0 }}
            animate={quoteVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: quoteVisible ? charIdx * LETTER_STAGGER + 0.3 : 0,
            }}
          >
            &mdash; {PULL_QUOTE.attribution}
          </motion.cite>
        </blockquote>
      </div>
    </div>
  );
}
