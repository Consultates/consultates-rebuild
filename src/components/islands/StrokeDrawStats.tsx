import { useEffect, useRef, useState, useCallback } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

interface StatData {
  value: string;
  label: string;
  source: string;
  countUp?: { target: number; suffix: string };
}

const STATS: StatData[] = [
  {
    value: '84%',
    label: 'of the world hasn\'t used AI at all. Most leaders are still at zero.',
    source: 'DataReportal Digital 2026',
    countUp: { target: 84, suffix: '%' },
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
  text: 'I have never seen such a yawning inside-outside gap. People in SF are putting multi-agent Claude swarms in charge of their lives... People elsewhere are still trying to get approval to use co-pilot.',
  attribution: 'Kevin Roose, NYT Tech Columnist, Feb 2026',
};

const STAGGER_MS = 800;
const DRAW_DURATION_MS = 1200;

/**
 * SVG stat number with stroke-draw animation.
 * Uses SVG <text> with stroke-dasharray/dashoffset to trace character outlines.
 */
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
  const [svgWidth, setSvgWidth] = useState(300);

  // Count-up for the 84% stat
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const [countDisplay, setCountDisplay] = useState(
    reducedMotion && stat.countUp ? stat.countUp.target : 0
  );

  // Measure text length for stroke-dasharray
  useEffect(() => {
    if (!textRef.current) return;
    const len = textRef.current.getComputedTextLength();
    // Approximate stroke perimeter: text length * 3 gives enough dasharray for the outline
    setDashLength(len * 3);
    // Set SVG width to fit text with a bit of padding
    setSvgWidth(Math.ceil(len) + 20);
  }, [stat.value, countDisplay]);

  // Count-up animation for the 84% stat
  useEffect(() => {
    if (!stat.countUp || !active || reducedMotion) return;
    const controls = animate(motionValue, stat.countUp.target, {
      duration: DRAW_DURATION_MS / 1000,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [active, reducedMotion, motionValue, stat.countUp]);

  // Subscribe to count-up value
  useEffect(() => {
    if (!stat.countUp) return;
    if (reducedMotion) {
      setCountDisplay(stat.countUp.target);
      return;
    }
    const unsub = rounded.on('change', (v) => setCountDisplay(v));
    return () => unsub();
  }, [rounded, reducedMotion, stat.countUp]);

  const displayValue = stat.countUp
    ? `${countDisplay}${stat.countUp.suffix}`
    : stat.value;

  const drawn = active || reducedMotion;

  return (
    <div className="flex flex-col items-center text-center">
      <svg
        width={svgWidth}
        height="80"
        viewBox={`0 0 ${svgWidth} 80`}
        aria-hidden="true"
        className="overflow-visible mb-3"
        style={{ maxWidth: '100%' }}
      >
        <text
          ref={textRef}
          x="50%"
          y="60"
          textAnchor="middle"
          className="text-stroke-stat"
          style={{
            strokeDasharray: dashLength || 1000,
            strokeDashoffset: drawn ? 0 : (dashLength || 1000),
            transition: reducedMotion
              ? 'none'
              : `stroke-dashoffset ${DRAW_DURATION_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
          }}
        >
          {displayValue}
        </text>
      </svg>
      <p
        className="text-body text-foreground mt-1 max-w-[280px]"
        style={{
          opacity: drawn ? 1 : 0,
          transition: reducedMotion ? 'none' : 'opacity 0.5s ease 0.3s',
        }}
      >
        {stat.label}
      </p>
      <p
        className="text-cite text-muted-foreground mt-2"
        style={{
          opacity: drawn ? 1 : 0,
          transition: reducedMotion ? 'none' : 'opacity 0.5s ease 0.5s',
        }}
      >
        {stat.source}
      </p>
    </div>
  );
}

/**
 * StrokeDrawStats — Three-column stat grid with SVG stroke-draw animation,
 * section title, and pull quote. The signature animation for the Negative Stakes section.
 */
export function StrokeDrawStats() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [revealStep, setRevealStep] = useState(reducedMotion ? STATS.length + 2 : 0);
  // Steps: 0=hidden, 1=title, 2=stat1, 3=stat2, 4=stat3, 5=quote

  // Dual detection: MutationObserver for GSAP desktop + IntersectionObserver fallback
  useEffect(() => {
    if (!containerRef.current || triggered) return;

    const scrollSection = containerRef.current.closest('.scroll-section');

    const onTrigger = () => {
      setTriggered(true);
    };

    if (scrollSection) {
      if (scrollSection.hasAttribute('data-active')) {
        onTrigger();
        return;
      }

      const mutObs = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (
            m.type === 'attributes' &&
            m.attributeName === 'data-active' &&
            scrollSection.hasAttribute('data-active')
          ) {
            onTrigger();
            mutObs.disconnect();
            return;
          }
        }
      });
      mutObs.observe(scrollSection, { attributes: true, attributeFilter: ['data-active'] });

      const intObs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onTrigger();
            intObs.disconnect();
            mutObs.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      intObs.observe(containerRef.current);

      return () => {
        mutObs.disconnect();
        intObs.disconnect();
      };
    }

    // No scroll-section — pure IntersectionObserver
    const intObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onTrigger();
          intObs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    intObs.observe(containerRef.current);
    return () => intObs.disconnect();
  }, [triggered]);

  // Sequential reveal: title -> stat1 -> stat2 -> stat3 -> quote
  useEffect(() => {
    if (!triggered || reducedMotion) return;

    // Step 1: title (immediate)
    setRevealStep(1);

    const timers: ReturnType<typeof setTimeout>[] = [];
    // Steps 2-4: stats staggered
    for (let i = 0; i < STATS.length; i++) {
      timers.push(
        setTimeout(() => setRevealStep(i + 2), 400 + i * STAGGER_MS)
      );
    }
    // Step 5: quote after all stats
    timers.push(
      setTimeout(
        () => setRevealStep(STATS.length + 2),
        400 + STATS.length * STAGGER_MS + 400
      )
    );

    return () => timers.forEach(clearTimeout);
  }, [triggered, reducedMotion]);

  const titleVisible = revealStep >= 1;
  const quoteVisible = revealStep >= STATS.length + 2;

  return (
    <div ref={containerRef}>
      {/* Section Title */}
      <h2
        className="text-section text-foreground text-center mb-12"
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: reducedMotion
            ? 'none'
            : 'opacity 0.6s cubic-bezier(0.25,0.1,0.25,1), transform 0.6s cubic-bezier(0.25,0.1,0.25,1)',
        }}
      >
        {SECTION_TITLE}
      </h2>

      {/* 3-column stat grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {STATS.map((stat, i) => (
          <StrokeStat
            key={stat.value}
            stat={stat}
            active={revealStep >= i + 2}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Pull Quote */}
      <blockquote
        className="mt-14 max-w-[720px] mx-auto text-center"
        style={{
          opacity: quoteVisible ? 1 : 0,
          transform: quoteVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: reducedMotion
            ? 'none'
            : 'opacity 0.7s cubic-bezier(0.25,0.1,0.25,1), transform 0.7s cubic-bezier(0.25,0.1,0.25,1)',
        }}
      >
        <p
          className="text-muted-foreground italic"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-body-lg)',
            lineHeight: 'var(--lh-body-lg)',
          }}
        >
          &ldquo;{PULL_QUOTE.text}&rdquo;
        </p>
        <cite
          className="text-cite text-muted-foreground block mt-3 not-italic"
        >
          &mdash; {PULL_QUOTE.attribution}
        </cite>
      </blockquote>
    </div>
  );
}
