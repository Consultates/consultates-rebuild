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
const DRAW_DURATION = 1200;
const FILL_PAUSE = 300;
const QUOTE_PAUSE = 100;
const LETTER_STAGGER = 0.018;
const TYPEWRITER_SPEED = 12; // ms per character for stat labels
const TYPEWRITER_SETTLE = 50; // breathing room after typewriter before next stat

const QUOTE_STEP = STATS.length + 2;

/** Calculate cumulative start time for each stat so they run sequentially */
function getStatStartTimes(): number[] {
  const starts: number[] = [];
  let cursor = TITLE_DELAY + 500; // first stat starts after title fade
  for (let i = 0; i < STATS.length; i++) {
    starts.push(cursor);
    // This stat's total duration: stroke draw + fill pause + typewriter + settle
    const typewriterTime = STATS[i].label.length * TYPEWRITER_SPEED;
    cursor += DRAW_DURATION + FILL_PAUSE + typewriterTime + TYPEWRITER_SETTLE;
  }
  return starts;
}

const STAT_START_TIMES = getStatStartTimes();
const SHARED_VIEWBOX_W = 620;
const SHARED_VIEWBOX_H = 90;

/**
 * Mind-blown doodle character — office worker whose head opens up
 * revealing brain, with lightning bolts. All in purple theme.
 * Loops: calm → blown → settle → repeat.
 */
function MindBlownSvg({
  active,
  delay,
  reducedMotion,
}: {
  active: boolean;
  delay: number;
  reducedMotion: boolean;
}) {
  // Colors — all purple palette
  const stroke = 'var(--accent)';          // lilac outlines
  const hairFill = 'var(--primary)';       // darker purple hair
  const cloudFill = '#C4A8E0';            // light lavender mushroom cloud
  const cloudFillDark = 'var(--accent)';   // darker cloud puffs
  const shirtFill = 'var(--accent)';       // lilac shirt
  const tieFill = 'var(--primary)';        // dark purple tie

  // Loop cycle: 4.5s total
  const cycleDur = 4.5;

  // Crown (hair) keyframes: y offset — lifts higher to make room for cloud
  const crownY =     [0,  0, -50, -55, -50,  0,  0];
  const crownTimes = [0, 0.18, 0.32, 0.5, 0.65, 0.82, 1];

  // Whole cloud: grows upward from head as one piece
  const cloudScaleY = [0,  0,  0.3, 0.7, 1,   1,   0.3, 0,  0];
  const cloudScaleX = [0,  0,  0.4, 0.5, 0.6, 0.6, 0.2, 0,  0];
  const cloudOp =     [0,  0,  0.6, 0.9, 1,   1,   0.3, 0,  0];
  const cloudTimes =  [0, 0.18, 0.24, 0.30, 0.38, 0.55, 0.68, 0.78, 1];

  // Cap spread: EXTRA horizontal expansion on top of the parent growth
  // This is relative — 1 = same as parent, >1 = wider
  const capSpreadX = [1,   1,   1,   1.6, 2.0, 1.8, 1,   1];
  const capSpreadTimes = [0, 0.18, 0.30, 0.38, 0.44, 0.55, 0.68, 1];

  // Mouth: calm (closed) vs blown (open)
  const mouthScaleY =     [1,  1, 2.5, 2.5, 1,  1];
  const mouthTimes  =     [0, 0.18, 0.28, 0.65, 0.82, 1];

  // Lightning bolts: flash during blown phase
  const boltOp =     [0,  0, 0, 1, 1, 0,  0,  0];
  const boltTimes =  [0, 0.22, 0.28, 0.33, 0.55, 0.6, 0.65, 1];

  // Shock lines
  const shockOp =     [0,  0, 1, 1, 0,  0];
  const shockTimes =  [0, 0.28, 0.35, 0.58, 0.65, 1];

  const inlineStyle: React.CSSProperties = {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '1.45em',  // matches line-height of quote text
    width: 'auto',
    marginLeft: '0.15em',
    position: 'relative' as const,
  };

  if (reducedMotion) {
    return (
      <span style={inlineStyle}>
        <svg viewBox="-5 -30 130 170" height="100%" fill="none" aria-hidden="true" style={{ overflow: 'visible' }}>
          <path d="M 42 80 L 38 120 L 82 120 L 78 80" fill={shirtFill} stroke={stroke} strokeWidth="2" fillOpacity="0.3" />
          <path d="M 56 80 L 54 110 L 66 110 L 64 80" fill={tieFill} fillOpacity="0.6" />
          <path d="M 38 90 C 28 92, 20 98, 16 106" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="16" cy="106" r="5" fill="white" stroke={stroke} strokeWidth="2" />
          <path d="M 82 90 C 92 92, 100 98, 104 106" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="104" cy="106" r="5" fill="white" stroke={stroke} strokeWidth="2" />
          <rect x="52" y="74" width="16" height="10" rx="4" fill="white" stroke={stroke} strokeWidth="2" />
          <path d="M 36 38 C 36 52, 38 68, 42 76 L 78 76 C 82 68, 84 52, 84 38" stroke={stroke} strokeWidth="2.5" fill="white" strokeLinecap="round" />
          <path d="M 36 38 C 36 24, 46 14, 60 14 C 74 14, 84 24, 84 38" fill="white" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 34 40 C 34 22, 48 12, 60 14 C 72 12, 86 22, 86 40 L 86 34 C 86 18, 34 18, 34 34 Z" fill={hairFill} stroke={stroke} strokeWidth="2" />
          <circle cx="50" cy="52" r="2.5" fill={stroke} />
          <circle cx="70" cy="52" r="2.5" fill={stroke} />
          <ellipse cx="60" cy="64" rx="3" ry="1.5" fill={stroke} />
        </svg>
      </span>
    );
  }

  return (
    <motion.span
      style={inlineStyle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      <svg viewBox="-5 -30 130 170" height="100%" fill="none" style={{ overflow: 'visible' }} aria-hidden="true">

        {/* Shirt / shoulders */}
        <path
          d="M 42 80 L 38 120 L 82 120 L 78 80"
          fill={shirtFill}
          fillOpacity="0.25"
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Tie */}
        <path d="M 56 80 L 54 112 L 66 112 L 64 80 Z" fill={tieFill} fillOpacity="0.5" />

        {/* Left arm — hands go to side of head when blown */}
        <motion.path
          stroke={stroke}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          animate={active
            ? { d: [
                'M 38 90 C 28 92, 20 98, 16 106',
                'M 38 90 C 28 92, 20 98, 16 106',
                'M 38 86 C 28 78, 26 62, 32 52',
                'M 38 86 C 28 78, 26 62, 32 52',
                'M 38 90 C 28 92, 20 98, 16 106',
                'M 38 90 C 28 92, 20 98, 16 106',
              ] }
            : {}}
          transition={{ duration: cycleDur, times: [0, 0.18, 0.30, 0.65, 0.80, 1], repeat: Infinity, delay: delay + 0.5 }}
          d="M 38 90 C 28 92, 20 98, 16 106"
        />
        {/* Left hand */}
        <motion.circle
          r="5"
          fill="white"
          stroke={stroke}
          strokeWidth="2"
          animate={active
            ? { cx: [16, 16, 32, 32, 16, 16], cy: [106, 106, 52, 52, 106, 106] }
            : { cx: 16, cy: 106 }}
          transition={{ duration: cycleDur, times: [0, 0.18, 0.30, 0.65, 0.80, 1], repeat: Infinity, delay: delay + 0.5 }}
        />

        {/* Right arm — hands go to side of head when blown */}
        <motion.path
          stroke={stroke}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          animate={active
            ? { d: [
                'M 82 90 C 92 92, 100 98, 104 106',
                'M 82 90 C 92 92, 100 98, 104 106',
                'M 82 86 C 92 78, 94 62, 88 52',
                'M 82 86 C 92 78, 94 62, 88 52',
                'M 82 90 C 92 92, 100 98, 104 106',
                'M 82 90 C 92 92, 100 98, 104 106',
              ] }
            : {}}
          transition={{ duration: cycleDur, times: [0, 0.18, 0.30, 0.65, 0.80, 1], repeat: Infinity, delay: delay + 0.5 }}
          d="M 82 90 C 92 92, 100 98, 104 106"
        />
        {/* Right hand */}
        <motion.circle
          r="5"
          fill="white"
          stroke={stroke}
          strokeWidth="2"
          animate={active
            ? { cx: [104, 104, 88, 88, 104, 104], cy: [106, 106, 52, 52, 106, 106] }
            : { cx: 104, cy: 106 }}
          transition={{ duration: cycleDur, times: [0, 0.18, 0.30, 0.65, 0.80, 1], repeat: Infinity, delay: delay + 0.5 }}
        />

        {/* Neck */}
        <rect x="52" y="74" width="16" height="10" rx="4" fill="white" stroke={stroke} strokeWidth="2" />

        {/* Head — open top (bowl shape, flat cut across the top so cloud comes out) */}
        <path
          d="M 36 38 C 36 52, 38 68, 42 76 L 78 76 C 82 68, 84 52, 84 38"
          stroke={stroke}
          strokeWidth="2.5"
          fill="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Head interior fill — white rectangle to mask cloud stem behind face */}
        <rect x="37" y="38" width="46" height="38" fill="white" />

        {/* Mushroom cloud — one connected piece growing upward from head */}
        <motion.g
          style={{ transformOrigin: '60px 34px' }}
          animate={active
            ? { opacity: cloudOp, scaleY: cloudScaleY, scaleX: cloudScaleX }
            : { opacity: 0, scaleY: 0, scaleX: 0 }}
          transition={{ duration: cycleDur, times: cloudTimes, repeat: Infinity, delay: delay + 0.5 }}
        >
          {/* Stem — shorter column rising from head into the cap */}
          <path
            d="M 55 34 L 53 14 C 52 10, 56 6, 60 6 C 64 6, 68 10, 67 14 L 65 34 Z"
            fill={cloudFill}
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Cap — torus/donut shape with a ball sitting on top */}
          <motion.g
            style={{ transformOrigin: '60px 2px' }}
            animate={active
              ? { scaleX: capSpreadX }
              : { scaleX: 1 }}
            transition={{ duration: cycleDur, times: capSpreadTimes, repeat: Infinity, delay: delay + 0.5 }}
          >
            {/* Donut ring */}
            <ellipse cx="60" cy="4" rx="26" ry="10" fill={cloudFillDark} fillOpacity="0.4" stroke={stroke} strokeWidth="1.5" />
            {/* Front of donut */}
            <ellipse cx="60" cy="6" rx="24" ry="8" fill={cloudFill} stroke={stroke} strokeWidth="1" />
            {/* Ball sitting in the donut hole */}
            <circle cx="60" cy="-6" r="12" fill={cloudFill} stroke={stroke} strokeWidth="1.5" />
            {/* Highlight on the ball */}
            <circle cx="56" cy="-10" r="3" fill="white" fillOpacity="0.3" stroke="none" />
          </motion.g>
        </motion.g>

        {/* Hair / crown + top of skull — the lid that lifts off */}
        <motion.g
          animate={active ? { y: crownY } : { y: 0 }}
          transition={{ duration: cycleDur, times: crownTimes, repeat: Infinity, delay: delay + 0.5, ease: 'easeInOut' }}
        >
          {/* Top of skull — closes the bowl when resting */}
          <path
            d="M 36 38 C 36 24, 46 14, 60 14 C 74 14, 84 24, 84 38"
            fill="white"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Hair on top */}
          <path
            d="M 34 40 C 34 22, 48 12, 60 14 C 72 12, 86 22, 86 40 L 86 34 C 86 18, 34 18, 34 34 Z"
            fill={hairFill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Hair tuft */}
          <path d="M 64 16 C 66 8, 74 10, 70 16" fill={hairFill} stroke={stroke} strokeWidth="1.5" />
        </motion.g>

        {/* Eyes — widen slightly during blown */}
        <circle cx="50" cy="52" r="2.5" fill={stroke} />
        <circle cx="70" cy="52" r="2.5" fill={stroke} />

        {/* Eyebrows — raise during blown */}
        <motion.g
          animate={active ? { y: [0, 0, -3, -3, 0, 0] } : { y: 0 }}
          transition={{ duration: cycleDur, times: [0, 0.2, 0.3, 0.65, 0.8, 1], repeat: Infinity, delay: delay + 0.5 }}
        >
          <line x1="46" y1="44" x2="54" y2="44" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="66" y1="44" x2="74" y2="44" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Mouth — small when calm, open wide when blown */}
        <motion.ellipse
          cx="60" cy="64" rx="3"
          fill={stroke}
          animate={active
            ? { ry: mouthScaleY.map(s => 1.5 * s) }
            : { ry: 1.5 }}
          transition={{ duration: cycleDur, times: mouthTimes, repeat: Infinity, delay: delay + 0.5 }}
        />

        {/* Lightning bolt — left */}
        <motion.g
          animate={active ? { opacity: boltOp } : { opacity: 0 }}
          transition={{ duration: cycleDur, times: boltTimes, repeat: Infinity, delay: delay + 0.5 }}
        >
          <path d="M 22 24 L 28 32 L 24 32 L 28 40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.g>

        {/* Lightning bolt — right */}
        <motion.g
          animate={active ? { opacity: boltOp } : { opacity: 0 }}
          transition={{ duration: cycleDur, times: boltTimes, repeat: Infinity, delay: delay + 0.6 }}
        >
          <path d="M 98 24 L 92 32 L 96 32 L 92 40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.g>

        {/* Shock lines — left */}
        <motion.g
          animate={active ? { opacity: shockOp } : { opacity: 0 }}
          transition={{ duration: cycleDur, times: shockTimes, repeat: Infinity, delay: delay + 0.5 }}
        >
          <line x1="16" y1="30" x2="10" y2="28" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="38" x2="8" y2="38" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* Shock lines — right */}
        <motion.g
          animate={active ? { opacity: shockOp } : { opacity: 0 }}
          transition={{ duration: cycleDur, times: shockTimes, repeat: Infinity, delay: delay + 0.55 }}
        >
          <line x1="104" y1="30" x2="110" y2="28" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="106" y1="38" x2="112" y2="38" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </svg>
    </motion.span>
  );
}

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
        setTimeout(() => setRevealStep(i + 2), STAT_START_TIMES[i])
      );
    }
    // Quote starts after last stat fully completes
    const lastStart = STAT_START_TIMES[STATS.length - 1];
    const lastTypewriter = STATS[STATS.length - 1].label.length * TYPEWRITER_SPEED;
    const quoteTime = lastStart + DRAW_DURATION + FILL_PAUSE + lastTypewriter + QUOTE_PAUSE;
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
          style={{ padding: 'clamp(2rem, 4vh, 4rem) clamp(1.5rem, 5vw, 6rem)' }}
        >
          <h2
            className="text-foreground text-center mb-8"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              maxWidth: '720px',
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
        className="max-w-[960px] mx-auto text-center"
        style={{ padding: 'clamp(1.5rem, 3vh, 3rem) clamp(1.5rem, 5vw, 4rem)' }}
      >
        <blockquote>
          <p
            className="text-foreground italic"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
              lineHeight: '1.5',
              letterSpacing: '-0.01em',
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
            <MindBlownSvg
              active={quoteVisible}
              delay={0.05 + charIdx * LETTER_STAGGER + 0.3}
              reducedMotion={reducedMotion}
            />
          </p>

          <motion.cite
            className="text-cite text-muted-foreground block mt-6 not-italic"
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
