import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

const ease = [0.25, 0.1, 0.25, 1] as const;
const AUTO_ADVANCE_MS = 8000;
const GAP = 24; // 1.5rem

export interface BlogCardData {
  title: string;
  href: string;
  image?: string;
  categoryLabel: string;
  categoryIcon: string;
}

interface Props {
  posts: BlogCardData[];
}

/** Wrap index into [0, length) */
const wrap = (i: number, length: number) => ((i % length) + length) % length;

export default function BlogCarouselIsland({ posts }: Props) {
  const reducedMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const strip = useAnimation();

  if (!posts || posts.length === 0) {
    return null;
  }

  // Get card width from container: 3 visible cards with 2 gaps
  const getCardWidth = () => {
    if (!containerRef.current) return 300;
    return (containerRef.current.offsetWidth - 2 * GAP) / 3;
  };

  const runTransition = useCallback(async (targetIdx: number, dir: number) => {
    if (transitioning) return;
    setTransitioning(true);

    const cw = getCardWidth();
    const shiftX = dir * (cw + GAP);

    // Reset to base position
    strip.set({ x: 0, scale: 1 });
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    // Phase 1: Zoom out — pull back to reveal the reel
    await strip.start({
      scale: 0.85,
      transition: { duration: 0.3, ease },
    });

    // Phase 2: Wind — slide the strip to the next frame
    await strip.start({
      x: -shiftX,
      transition: { duration: 0.45, ease },
    });

    // Phase 3: Zoom in — push into the new frame
    await strip.start({
      scale: 1,
      transition: { duration: 0.3, ease },
    });

    // Reset: update index, strip snaps back to base CSS position
    setCurrentIdx(targetIdx);
    strip.set({ x: 0, scale: 1 });
    setTransitioning(false);
  }, [transitioning, strip]);

  const goNext = useCallback(() => {
    const target = wrap(currentIdx + 1, posts.length);
    runTransition(target, 1);
  }, [currentIdx, posts.length, runTransition]);

  const goPrev = useCallback(() => {
    const target = wrap(currentIdx - 1, posts.length);
    runTransition(target, -1);
  }, [currentIdx, posts.length, runTransition]);

  const goTo = useCallback((targetIdx: number) => {
    if (targetIdx === currentIdx) return;
    runTransition(targetIdx, targetIdx > currentIdx ? 1 : -1);
  }, [currentIdx, runTransition]);

  // Auto-advance
  useEffect(() => {
    if (reducedMotion || paused || transitioning) return;
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIdx, paused, reducedMotion, goNext, transitioning]);

  // Reduced motion: static card + dots
  if (reducedMotion) {
    return (
      <div className="relative">
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <BlogCard post={posts[currentIdx]} />
        </div>
        <NavDots total={posts.length} current={currentIdx} onSelect={(i) => setCurrentIdx(i)} />
      </div>
    );
  }

  // Build 5-card strip: [i-2, i-1, i, i+1, i+2] — circular
  const stripIndices = [-2, -1, 0, 1, 2].map(o => wrap(currentIdx + o, posts.length));

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Viewport — clips the strip, shows 3 cards */}
      <div
        ref={containerRef}
        style={{ overflow: 'hidden', position: 'relative' }}
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
        {/* Film strip — 5 cards, offset via margin-left so cards [1,2,3] are visible */}
        <motion.div
          animate={strip}
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            // Strip width = 5 cards + 4 gaps. Each card = 1/3 container.
            // So strip = 5/3 * container + 4 * gap - (5/3 - 1) * gap... simplified:
            width: `calc((500% + ${2 * GAP}px) / 3)`,
            // Shift left by 1 card+gap to center cards [1,2,3] in viewport
            marginLeft: `calc(-1 * (100% + ${GAP}px) / 3)`,
          }}
        >
          {stripIndices.map((postIdx, i) => (
            <div key={i} style={{ flex: '1 0 0', minWidth: 0 }}>
              <BlogCard post={posts[postIdx]} />
            </div>
          ))}
        </motion.div>

        {/* Left fade gradient */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '33.33%',
            background: 'linear-gradient(to right, var(--secondary), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Right fade gradient */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '33.33%',
            background: 'linear-gradient(to left, var(--secondary), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        {/* Left arrow */}
        <button
          onClick={goPrev}
          disabled={transitioning}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          style={{ background: 'color-mix(in srgb, var(--foreground) 8%, transparent)', zIndex: 3 }}
          aria-label="Previous post"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={goNext}
          disabled={transitioning}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          style={{ background: 'color-mix(in srgb, var(--foreground) 8%, transparent)', zIndex: 3 }}
          aria-label="Next post"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>
      </div>

      <NavDots
        total={posts.length}
        current={currentIdx}
        onSelect={goTo}
        onPrev={goPrev}
        onNext={goNext}
        disabled={transitioning}
      />
    </div>
  );
}

function BlogCard({ post }: { post: BlogCardData }) {
  const placeholderImage = '/images/blog/placeholder.webp';

  return (
    <a
      href={post.href}
      className="block"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--card)',
        borderRadius: 'var(--card-radius, 16px)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          background: 'var(--secondary)',
        }}
      >
        <img
          src={post.image || placeholderImage}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: '1.25rem' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0.25rem 0.625rem',
            borderRadius: '9999px',
            background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
            color: 'var(--primary)',
          }}
        >
          <i className={`ph-duotone ${post.categoryIcon}`} style={{ fontSize: '0.875rem' }} />
          {post.categoryLabel}
        </span>
        <h3
          className="font-serif"
          style={{
            fontSize: 'var(--text-sub, 1.125rem)',
            color: 'var(--card-foreground)',
            marginTop: '0.75rem',
            lineHeight: 1.4,
            minHeight: '2.8em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </h3>
        <span className="btn-alive btn-alive--sm" style={{ marginTop: '0.75rem' }}>
          Read
        </span>
      </div>
    </a>
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
    <div className="flex justify-center items-center gap-3 mt-3">
      {onPrev && (
        <button
          onClick={onPrev}
          disabled={disabled}
          className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
          aria-label="Previous post"
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
            aria-label={`Go to post ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
          />
        ))}
      </div>
      {onNext && (
        <button
          onClick={onNext}
          disabled={disabled}
          className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
          aria-label="Next post"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
