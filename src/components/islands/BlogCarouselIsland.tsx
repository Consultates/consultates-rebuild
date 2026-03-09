import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useReducedMotion } from '../../lib/animations';

const ease = [0.25, 0.1, 0.25, 1] as const;
const AUTO_ADVANCE_MS = 8000;

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

export default function BlogCarouselIsland({ posts }: Props) {
  const reducedMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const strip = useAnimation();

  const runTransition = useCallback(async (targetIdx: number, dir: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setNextIdx(targetIdx);
    setDirection(dir);

    if (dir > 0) {
      strip.set({ x: '0%', scale: 1 });
    } else {
      strip.set({ x: '-50%', scale: 1 });
    }

    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    await strip.start({
      scale: 0.85,
      transition: { duration: 0.3, ease },
    });

    await strip.start({
      x: dir > 0 ? '-50%' : '0%',
      transition: { duration: 0.45, ease },
    });

    await strip.start({
      scale: 1,
      transition: { duration: 0.3, ease },
    });

    setCurrentIdx(targetIdx);
    setNextIdx(null);
    strip.set({ x: '0%', scale: 1 });
    setTransitioning(false);
  }, [transitioning, strip]);

  const goNext = useCallback(() => {
    const target = (currentIdx + 1) % posts.length;
    runTransition(target, 1);
  }, [currentIdx, posts.length, runTransition]);

  const goPrev = useCallback(() => {
    const target = (currentIdx - 1 + posts.length) % posts.length;
    runTransition(target, -1);
  }, [currentIdx, posts.length, runTransition]);

  const goTo = useCallback((targetIdx: number) => {
    if (targetIdx === currentIdx) return;
    runTransition(targetIdx, targetIdx > currentIdx ? 1 : -1);
  }, [currentIdx, runTransition]);

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
        <BlogCard post={posts[currentIdx]} />
        <NavDots total={posts.length} current={currentIdx} onSelect={(i) => setCurrentIdx(i)} />
      </div>
    );
  }

  const leftPost = nextIdx !== null && direction < 0 ? posts[nextIdx] : posts[currentIdx];
  const rightPost = nextIdx !== null && direction > 0 ? posts[nextIdx] : posts[currentIdx];
  const showTwo = nextIdx !== null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
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
            width: showTwo ? '200%' : '100%',
          }}
        >
          <div style={{ width: showTwo ? '50%' : '100%', flexShrink: 0 }}>
            <BlogCard post={leftPost} />
          </div>
          {showTwo && (
            <div style={{ width: '50%', flexShrink: 0 }}>
              <BlogCard post={rightPost} />
            </div>
          )}
        </motion.div>
      </div>

      <button
        onClick={goPrev}
        disabled={transitioning}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}
        aria-label="Previous post"
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
        aria-label="Next post"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4l6 6-6 6" />
        </svg>
      </button>

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
      className="block max-w-[500px] mx-auto"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        style={{
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          borderRadius: 'var(--card-radius, 16px) var(--card-radius, 16px) 0 0',
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
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </h3>
        <span
          style={{
            display: 'inline-block',
            marginTop: '0.75rem',
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--primary)',
          }}
        >
          Read →
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
    <div className="flex justify-center items-center gap-3 mt-8">
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
