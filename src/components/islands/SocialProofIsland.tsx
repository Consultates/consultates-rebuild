import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';
import { homepageQuotes, type Reference } from '../../data/social-proof';

const ease = [0.25, 0.1, 0.25, 1] as const;
const AUTO_ADVANCE_MS = 8000;

/**
 * Film-strip quote carousel.
 *
 * The "strip" is a single flex container holding two quotes side by side
 * (current + next), each 100% viewport width. The viewport clips to show one.
 *
 * Transition on this ONE element:
 * 1. ZOOM OUT — strip scales to 0.85 (current quote visibly shrinks, still readable)
 * 2. WIND — strip slides horizontally by one frame width (you see current exit
 *    and next enter, both scaled down — the film strip moving on the spool)
 * 3. ZOOM IN — strip scales back to 1 (new quote fills the frame)
 *
 * After zoom-in completes, we swap: next becomes current, strip resets to x:0.
 */
export default function SocialProofIsland() {
  const reducedMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const strip = useAnimation();

  const quotes = homepageQuotes;

  const runTransition = useCallback(async (targetIdx: number, dir: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setNextIdx(targetIdx);
    setDirection(dir);

    // Reset strip to starting position (current quote visible)
    // dir > 0 (next): next quote is to the right, strip at x: 0%
    // dir < 0 (prev): next quote is to the left, strip at x: -50% (showing right half = current)
    if (dir > 0) {
      strip.set({ x: '0%', scale: 1 });
    } else {
      strip.set({ x: '-50%', scale: 1 });
    }

    // Allow React to render the two-quote strip before animating
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    // Phase 1: ZOOM OUT — scale down, content stays visible
    await strip.start({
      scale: 0.85,
      transition: { duration: 0.3, ease },
    });

    // Phase 2: WIND — slide the strip by one frame
    // dir > 0: slide left (0% → -50%) to reveal next quote on the right
    // dir < 0: slide right (-50% → 0%) to reveal next quote on the left
    await strip.start({
      x: dir > 0 ? '-50%' : '0%',
      transition: { duration: 0.45, ease },
    });

    // Phase 3: ZOOM IN — scale back up
    await strip.start({
      scale: 1,
      transition: { duration: 0.3, ease },
    });

    // Swap: make next the new current, remove the second quote
    setCurrentIdx(targetIdx);
    setNextIdx(null);
    strip.set({ x: '0%', scale: 1 });
    setTransitioning(false);
  }, [transitioning, strip]);

  const goNext = useCallback(() => {
    const target = (currentIdx + 1) % quotes.length;
    runTransition(target, 1);
  }, [currentIdx, quotes.length, runTransition]);

  const goPrev = useCallback(() => {
    const target = (currentIdx - 1 + quotes.length) % quotes.length;
    runTransition(target, -1);
  }, [currentIdx, quotes.length, runTransition]);

  const goTo = useCallback((targetIdx: number) => {
    if (targetIdx === currentIdx) return;
    runTransition(targetIdx, targetIdx > currentIdx ? 1 : -1);
  }, [currentIdx, runTransition]);

  // Auto-advance timer
  useEffect(() => {
    if (reducedMotion || paused || transitioning) return;
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIdx, paused, reducedMotion, goNext, transitioning]);

  if (reducedMotion) {
    return (
      <div className="relative">
        <QuoteCard quote={quotes[currentIdx]} />
        <NavDots total={quotes.length} current={currentIdx} onSelect={(i) => setCurrentIdx(i)} />
      </div>
    );
  }

  // Build the strip: two quotes side by side
  // dir > 0 (going next): [current] [next] — strip starts at x:0%, slides to x:-50%
  // dir < 0 (going prev): [next] [current] — strip starts at x:-50%, slides to x:0%
  const leftQuote = nextIdx !== null && direction < 0 ? quotes[nextIdx] : quotes[currentIdx];
  const rightQuote = nextIdx !== null && direction > 0 ? quotes[nextIdx] : quotes[currentIdx];
  const showTwoQuotes = nextIdx !== null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative quote mark */}
      <span
        className="absolute font-serif font-bold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(6rem, 12vw, 10rem)',
          lineHeight: 1,
          top: '-0.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--primary)',
          opacity: 0.08,
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Carousel viewport — swipe to navigate on touch */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: '200px' }}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          (e.currentTarget as any)._touchStartX = touch.clientX;
        }}
        onTouchEnd={(e) => {
          const startX = (e.currentTarget as any)._touchStartX;
          if (startX === undefined) return;
          const endX = e.changedTouches[0].clientX;
          const diff = startX - endX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) goNext();
            else goPrev();
          }
          delete (e.currentTarget as any)._touchStartX;
        }}
      >
        <motion.div
          animate={strip}
          style={{
            display: 'flex',
            width: showTwoQuotes ? '200%' : '100%',
          }}
        >
          <div style={{ width: showTwoQuotes ? '50%' : '100%', flexShrink: 0 }}>
            <QuoteCard quote={leftQuote} />
          </div>
          {showTwoQuotes && (
            <div style={{ width: '50%', flexShrink: 0 }}>
              <QuoteCard quote={rightQuote} />
            </div>
          )}
        </motion.div>
      </div>

      {/* Desktop: arrows on sides. Mobile: arrows flanking dots below. */}
      <button
        onClick={goPrev}
        disabled={transitioning}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
        aria-label="Previous quote"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4l-6 6 6 6" />
        </svg>
      </button>
      <button
        onClick={goNext}
        disabled={transitioning}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
        aria-label="Next quote"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4l6 6-6 6" />
        </svg>
      </button>

      {/* Mobile: arrows + dots in a row. Desktop: dots only (arrows on sides). */}
      <NavDots
        total={quotes.length}
        current={currentIdx}
        onSelect={goTo}
        onPrev={goPrev}
        onNext={goNext}
        disabled={transitioning}
      />
    </div>
  );
}

function QuoteCard({ quote }: { quote: Reference }) {
  return (
    <div className="max-w-[800px] mx-auto text-center px-8">
      {/* Role pill */}
      <span
        className="inline-block text-xs font-semibold tracking-wider uppercase rounded-full px-3 py-1 mb-6"
        style={{
          background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
          color: 'var(--primary)',
        }}
      >
        As {quote.categoryLabel}
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
  onPrev,
  onNext,
  disabled,
}: {
  total: number;
  current: number;
  onSelect: (idx: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      {/* Mobile prev arrow */}
      {onPrev && (
        <button
          onClick={onPrev}
          disabled={disabled}
          className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
          aria-label="Previous quote"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>
      )}
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            disabled={disabled}
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
      {/* Mobile next arrow */}
      {onNext && (
        <button
          onClick={onNext}
          disabled={disabled}
          className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
          aria-label="Next quote"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
