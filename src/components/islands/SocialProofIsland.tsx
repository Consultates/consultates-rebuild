import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';
import { homepageQuotes, type Reference } from '../../data/social-proof';

const ease = [0.25, 0.1, 0.25, 1] as const;
const AUTO_ADVANCE_MS = 8000;

/**
 * Film-strip quote carousel.
 *
 * Transition mimics the homepage vertical scroll-snap but horizontal:
 * zoom-out (scale down + fade) → wind (translateX) → zoom-in (scale up + fade in).
 *
 * Uses Framer Motion AnimatePresence with custom variants keyed to direction.
 */
export default function SocialProofIsland() {
  const reducedMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const quotes = homepageQuotes;

  const goTo = useCallback((nextIdx: number) => {
    setDirection(nextIdx > currentIdx ? 1 : -1);
    setCurrentIdx(nextIdx);
  }, [currentIdx]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIdx(prev => (prev + 1) % quotes.length);
  }, [quotes.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIdx(prev => (prev - 1 + quotes.length) % quotes.length);
  }, [quotes.length]);

  // Auto-advance timer
  useEffect(() => {
    if (reducedMotion || paused) return;
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIdx, paused, reducedMotion, goNext]);

  const quote = quotes[currentIdx];

  /**
   * Film-strip variants — horizontal version of the vertical scroll-snap.
   *
   * Enter: start off-screen in scroll direction, scaled down → animate to center, full scale
   * Exit: scale down, slide out in opposite direction
   */
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      scale: 0.92,
      opacity: 0,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      scale: 0.92,
      opacity: 0,
      transition: { duration: 0.5, ease },
    }),
  };

  if (reducedMotion) {
    return (
      <div className="relative">
        <QuoteCard quote={quote} />
        <NavDots
          total={quotes.length}
          current={currentIdx}
          onSelect={goTo}
        />
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Carousel viewport */}
      <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIdx}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <QuoteCard quote={quote} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
        aria-label="Previous quote"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4l-6 6 6 6" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
        aria-label="Next quote"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4l6 6-6 6" />
        </svg>
      </button>

      {/* Navigation dots */}
      <NavDots
        total={quotes.length}
        current={currentIdx}
        onSelect={goTo}
      />
    </div>
  );
}

function QuoteCard({ quote }: { quote: Reference }) {
  return (
    <div className="max-w-[800px] mx-auto text-center px-8">
      {/* Category pill */}
      <span
        className="inline-block text-xs font-semibold tracking-wider uppercase rounded-full px-3 py-1 mb-6"
        style={{
          background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
          color: 'var(--primary)',
        }}
      >
        {quote.categoryLabel}
      </span>

      {/* Quote text */}
      <blockquote>
        <p
          className="font-serif italic text-foreground"
          style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', lineHeight: 1.7 }}
        >
          &ldquo;{quote.quote}&rdquo;
        </p>
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 48,
            height: 48,
            background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
          }}
        >
          <span className="font-sans font-semibold text-primary text-sm">
            {quote.name.split(' ').map(w => w[0]).join('')}
          </span>
        </div>
        <div className="text-left">
          <p className="text-body font-semibold text-foreground">{quote.name}</p>
          <p className="text-caption text-muted-foreground">{quote.title}</p>
        </div>
      </div>
    </div>
  );
}

function NavDots({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="w-2.5 h-2.5 rounded-full transition-all duration-300"
          style={{
            background: i === current
              ? 'var(--primary)'
              : 'color-mix(in srgb, var(--foreground) 20%, transparent)',
            transform: i === current ? 'scale(1.3)' : 'scale(1)',
          }}
          aria-label={`Go to quote ${i + 1}`}
          aria-current={i === current ? 'true' : undefined}
        />
      ))}
    </div>
  );
}
