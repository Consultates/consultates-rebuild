import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Reference } from '../../data/social-proof';

const AUTO_ADVANCE_MS = 8000;

interface Props {
  quotes: Reference[];
}

export default function ServiceTestimonialCarousel({ quotes }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % quotes.length);
  }, [quotes.length]);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, goNext]);

  const q = quotes[current];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        (e.currentTarget as any)._touchStartX = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const startX = (e.currentTarget as any)._touchStartX;
        if (startX === undefined) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) setCurrent((prev) => (prev + 1) % quotes.length);
          else setCurrent((prev) => (prev - 1 + quotes.length) % quotes.length);
        }
        delete (e.currentTarget as any)._touchStartX;
      }}
    >
      {/* Decorative quote mark */}
      <span
        className="absolute font-serif font-bold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(5rem, 10vw, 8rem)',
          lineHeight: 1,
          top: '-1rem',
          left: 'clamp(1rem, 4vw, 3rem)',
          color: 'var(--primary)',
          opacity: 0.07,
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote area */}
      <div style={{ minHeight: '220px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-[700px] mx-auto px-4 md:px-8"
          >
            {/* Role pill */}
            <span
              className="inline-block text-xs font-semibold tracking-wider uppercase rounded-full px-3 py-1 mb-6"
              style={{
                background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
                color: 'var(--primary)',
              }}
            >
              {q.categoryLabel}
            </span>

            {/* Quote */}
            <blockquote>
              <p
                className="font-serif italic text-foreground"
                style={{ fontSize: 'clamp(0.95rem, 2vw, 1.25rem)', lineHeight: 1.7 }}
              >
                &ldquo;{q.quote}&rdquo;
              </p>
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4 mt-6">
              <div
                className="rounded-full shrink-0 flex items-center justify-center"
                style={{ width: 52, height: 52, padding: 2, background: 'var(--primary)' }}
              >
                {q.photo ? (
                  <img
                    src={q.photo}
                    alt={q.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ background: 'color-mix(in srgb, var(--primary) 15%, var(--background))' }}
                  >
                    <span className="font-sans font-semibold text-primary text-sm">
                      {q.name.split(' ').map(w => w[0]).join('')}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-left">
                <p className="text-body font-semibold text-foreground">{q.name}</p>
                <p className="text-caption text-muted-foreground">{q.title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
    </div>
  );
}
