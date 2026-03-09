# Blog Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the placeholder blog system with proper blog cards (image, category, tags), a film-strip carousel on the homepage, a category-filtered blog index, and improved post typography.

**Architecture:** Extend Astro content collection schema with image/category/tags. New blog card component with Maze-style layout adapted to Consultates design system. Homepage blog highlights use SocialProofIsland film-strip animation pattern (new BlogCarouselIsland.tsx). Blog index gets dark hero + category filter pills + 3-col grid. Blog post template gets featured image + better prose.

**Tech Stack:** Astro 5 content collections, React + Framer Motion (carousel island), Tailwind CSS 4, Phosphor Icons (web), IntersectionObserver scroll reveal.

**Design doc:** `docs/plans/2026-03-09-blog-redesign-design.md`

**CRITICAL:** Read `CLAUDE.md` and the website design doc (`~/Development/consultates-brand-guidelines/consultates/guidelines/website-design-v3.html`) before starting. All GOSPEL patterns must be followed exactly. Do NOT rebuild existing components.

---

### Task 1: Blog Categories Data File

**Files:**
- Create: `src/data/blog-categories.ts`

**Step 1: Create category definitions**

```typescript
export interface BlogCategory {
  slug: string;
  label: string;
  icon: string; // Phosphor duotone class name
}

export const blogCategories: BlogCategory[] = [
  { slug: 'getting-started', label: 'Getting Started', icon: 'ph-rocket-launch' },
  { slug: 'ai-safety', label: 'AI Safety', icon: 'ph-shield-check' },
  { slug: 'strategy', label: 'Strategy', icon: 'ph-compass' },
  { slug: 'tools-tactics', label: 'Tools & Tactics', icon: 'ph-wrench' },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find(c => c.slug === slug);
}
```

**Step 2: Commit**

```bash
git add src/data/blog-categories.ts
git commit -m "feat: add blog category definitions with Phosphor icons"
```

---

### Task 2: Extend Content Schema

**Files:**
- Modify: `src/content/config.ts`

**Step 1: Update schema with image, category, tags**

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().default('Gary Tate'),
    excerpt: z.string().max(200).optional(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    category: z.enum(['getting-started', 'ai-safety', 'strategy', 'tools-tactics']),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

**Step 2: Update existing blog post frontmatter**

`src/content/blog/youre-not-the-only-one-stuck.md` — add:
```yaml
category: "getting-started"
tags: ["adoption", "beginners"]
```

`src/content/blog/how-safe-is-ai-really.md` — add:
```yaml
category: "ai-safety"
tags: ["security", "privacy", "trust"]
```

`src/content/blog/get-out-of-the-ai-cage.md` — add:
```yaml
category: "getting-started"
tags: ["adoption", "beginners", "prompting"]
```

**Step 3: Create placeholder blog image**

Create a simple placeholder image for blog cards. Use a solid purple/cream gradient WebP at 800x450 (16:9 aspect ratio). Save to `public/images/blog/placeholder.webp`.

Generate via CLI:
```bash
convert -size 800x450 'gradient:#F6F2EB-#5C3B9C' -quality 80 public/images/blog/placeholder.webp
```

If ImageMagick not available, create a minimal placeholder using any tool. The image just needs to exist at that path.

**Step 4: Verify build**

```bash
pnpm build
```

Expected: Build succeeds with updated schema. All 3 posts should validate with new required `category` field.

**Step 5: Commit**

```bash
git add src/content/config.ts src/content/blog/ public/images/blog/
git commit -m "feat: extend blog schema with category, tags, image fields"
```

---

### Task 3: New Blog Card Component

**Files:**
- Create: `src/components/BlogCardNew.astro`
- Archive: `src/components/BlogCard.astro` → `_archive/BlogCard.astro`

**Step 1: Create the new blog card**

Reference the Maze blog card layout adapted to Consultates design system. Key elements top to bottom: image → category pill → title → date+reading time → excerpt → "Read →" link.

```astro
---
interface Props {
  title: string;
  href: string;
  image?: string;
  categorySlug: string;
  categoryLabel: string;
  categoryIcon: string;
  date?: string;
  readingTime?: number;
  excerpt?: string;
  compact?: boolean;
}

const {
  title,
  href,
  image,
  categorySlug,
  categoryLabel,
  categoryIcon,
  date,
  readingTime,
  excerpt,
  compact = false,
} = Astro.props;

const placeholderImage = '/images/blog/placeholder.webp';
---

<a
  href={href}
  class="blog-card block bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-primary hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
>
  {/* Featured image */}
  <div class="blog-card__image">
    <img
      src={image || placeholderImage}
      alt=""
      loading="lazy"
      class="w-full h-full object-cover"
    />
  </div>

  {/* Content */}
  <div class="p-5">
    {/* Category pill */}
    <span class="blog-card__pill">
      <i class={`ph-duotone ${categoryIcon}`} style="font-size: 0.875rem;"></i>
      {categoryLabel}
    </span>

    {/* Title */}
    <h3 class="text-sub font-serif text-card-foreground mt-3 line-clamp-2">{title}</h3>

    {/* Date + reading time (full variant only) */}
    {!compact && date && (
      <p class="text-cite text-muted-foreground mt-2" style="font-family: var(--font-mono);">
        {date}{readingTime ? ` · ${readingTime} min read` : ''}
      </p>
    )}

    {/* Excerpt (full variant only) */}
    {!compact && excerpt && (
      <p class="text-body text-muted-foreground mt-2 line-clamp-3">{excerpt}</p>
    )}

    {/* Read link */}
    <span class="inline-block text-body font-medium text-primary mt-3">Read &rarr;</span>
  </div>
</a>

<style>
  .blog-card__image {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--secondary);
  }

  .blog-card__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.625rem;
    border-radius: 9999px;
    background: color-mix(in srgb, var(--primary) 12%, transparent);
    color: var(--primary);
  }
</style>
```

**Step 2: Archive old BlogCard**

```bash
mv src/components/BlogCard.astro _archive/BlogCard.astro
```

**Step 3: Verify by running dev server**

```bash
pnpm dev
```

Visit any page — site should still build. Blog pages will be broken temporarily (they reference the old card) — that's expected, we fix them in Tasks 5 and 6.

**Step 4: Commit**

```bash
git add src/components/BlogCardNew.astro _archive/BlogCard.astro
git commit -m "feat: new blog card with image, category pill, Maze-style layout"
```

---

### Task 4: Blog Carousel Island (Homepage)

**Files:**
- Create: `src/components/islands/BlogCarouselIsland.tsx`

**Step 1: Build the carousel**

This component follows the EXACT same architecture as `SocialProofIsland.tsx`. Same `useAnimation()`, same 3-phase film-strip animation (zoom-out 0.3s → wind 0.45s → zoom-in 0.3s), same easing `[0.25, 0.1, 0.25, 1]`, same NavDots component pattern, same touch swipe, same auto-advance (8000ms), same pause-on-hover.

The difference: it renders blog cards instead of QuoteCards.

Read `src/components/islands/SocialProofIsland.tsx` line by line before writing this. Copy the animation logic. Do NOT simplify or change the timing.

```tsx
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

  // --- Animation logic: EXACT COPY from SocialProofIsland ---

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

  // Auto-advance
  useEffect(() => {
    if (reducedMotion || paused || transitioning) return;
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIdx, paused, reducedMotion, goNext, transitioning]);

  // --- Reduced motion fallback ---
  if (reducedMotion) {
    return (
      <div className="relative">
        <BlogCard post={posts[currentIdx]} />
        <NavDots total={posts.length} current={currentIdx} onSelect={(i) => setCurrentIdx(i)} />
      </div>
    );
  }

  // --- Strip layout (same as SocialProofIsland) ---
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

      {/* Desktop arrows */}
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

// --- Blog Card (compact, for carousel) ---
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
          Read &rarr;
        </span>
      </div>
    </a>
  );
}

// --- NavDots (same as SocialProofIsland) ---
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
```

**Step 2: Verify import resolves**

```bash
pnpm dev
```

The component won't be used yet — just verify no TypeScript errors.

**Step 3: Commit**

```bash
git add src/components/islands/BlogCarouselIsland.tsx
git commit -m "feat: blog carousel island with film-strip animation (same as SocialProofIsland)"
```

---

### Task 5: Homepage — Remove Transitional Section, Add Blog Highlights

**Files:**
- Modify: `src/pages/index.astro`
- Archive: `src/components/sections/TransitionalCTAsSection.astro` → `_archive/TransitionalCTAsSection.astro`

**Step 1: Archive TransitionalCTAsSection**

```bash
mv src/components/sections/TransitionalCTAsSection.astro _archive/TransitionalCTAsSection.astro
```

**Step 2: Update index.astro**

Remove the scroll-section 9 (Transitional). Add a blog highlights section AFTER the scroll-snap container ends, in normal page flow before the footer.

The blog highlights section:
- Cream background (`bg-secondary`)
- Heading: "Not ready to book? Start here." — `text-section` font-serif
- BlogCarouselIsland with 3 latest posts
- NOT inside a `.scroll-section` div

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import HeroSection from '../components/sections/HeroSection.astro';
import TrustBar from '../components/sections/TrustBar.astro';
import NegativeStakes from '../components/sections/NegativeStakes.astro';
import OfferingSection from '../components/sections/OfferingSection.astro';
import UseCasesSection from '../components/sections/UseCasesSection.astro';
import HowItWorksSection from '../components/sections/HowItWorksSection.astro';
import SocialProofSection from '../components/sections/SocialProofSection.astro';
import WhyConsultatesSection from '../components/sections/WhyConsultatesSection.astro';
import StakesCTASection from '../components/sections/StakesCTASection.astro';
import ScrollIndicator from '../components/ScrollIndicator.astro';
import BlogCarouselIsland from '../components/islands/BlogCarouselIsland';
import { getCollection } from 'astro:content';
import { getCategoryBySlug } from '../data/blog-categories';

const posts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const blogPosts = posts.map(post => {
  const cat = getCategoryBySlug(post.data.category);
  return {
    title: post.data.title,
    href: '/blog/' + post.id.replace(/\.md$/, ''),
    image: post.data.image,
    categoryLabel: cat?.label || post.data.category,
    categoryIcon: cat?.icon || 'ph-article',
  };
});
---

<Base title="Consultates — AI Consulting for Business Leaders" description="Clarity on AI for leaders, teams, and companies. One-to-one advisory, hands-on training, and fractional executive support from someone who builds with AI every day.">
  <div class="scroll-section" data-section-label="Hero"><HeroSection /><TrustBar /></div>
  <div class="scroll-section" data-section-label="Stakes"><NegativeStakes /><ScrollIndicator /><TrustBar /></div>
  <div class="scroll-section" data-section-label="What We Offer"><OfferingSection /><ScrollIndicator /><TrustBar /></div>
  <div class="scroll-section" data-section-label="Use Cases"><UseCasesSection /><ScrollIndicator /><TrustBar /></div>
  <div class="scroll-section" data-section-label="How It Works"><HowItWorksSection /><ScrollIndicator /><TrustBar /></div>
  <div class="scroll-section" data-section-label="Testimonials"><SocialProofSection /><ScrollIndicator /><TrustBar /></div>
  <div class="scroll-section" data-section-label="Why Consultates"><WhyConsultatesSection /><ScrollIndicator /><TrustBar /></div>
  <div class="scroll-section" data-section-label="Get Started"><StakesCTASection /><ScrollIndicator /><TrustBar /></div>

  {/* Blog highlights — outside scroll-snap, normal page flow */}
  <section class="bg-secondary" style="padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);">
    <div style="max-width: 1200px; margin: 0 auto;">
      <h2 class="text-section font-serif mb-10">Not ready to book? Start here.</h2>
      <BlogCarouselIsland client:visible posts={blogPosts} />
    </div>
  </section>
</Base>
```

**Step 3: Verify**

```bash
pnpm dev
```

Visit localhost:4321. Scroll to bottom — should see cream section with blog carousel after the Get Started CTA. The Transitional section should be gone. Scroll-snap should still work for sections 1–8.

**Step 4: Commit**

```bash
git add src/pages/index.astro _archive/TransitionalCTAsSection.astro
git commit -m "feat: replace transitional scroll-section with blog carousel highlights"
```

---

### Task 6: Blog Index Page Rewrite

**Files:**
- Modify: `src/pages/blog/index.astro` (complete rewrite)

**Step 1: Rewrite the blog index**

Dark hero (`.svc-hero` pattern from service pages), category filter pills, 3-column card grid with new BlogCardNew, scroll reveal animation.

```astro
---
import Base from '../../layouts/Base.astro';
import BlogCardNew from '../../components/BlogCardNew.astro';
import { getCollection } from 'astro:content';
import { blogCategories, getCategoryBySlug } from '../../data/blog-categories';

const posts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

function getReadingTime(body: string | undefined): number {
  if (!body) return 1;
  return Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
}
---

<Base title="Blog — Consultates" description="Articles on AI adoption, AI safety, and practical guidance for business leaders.">

  {/* Dark hero — same pattern as service pages */}
  <section class="svc-hero bg-dots">
    <div class="svc-hero__glow"></div>
    <div class="svc-hero__content">
      <h1 class="text-hero font-serif" style="color: #FFFFFF; max-width: 820px; margin: 0 auto;">Blog</h1>
      <p class="text-body-lg mt-4" style="color: var(--hero-muted); max-width: 600px; margin: 0 auto;">
        Articles on AI adoption, safety, and practical guidance for business leaders.
      </p>
    </div>
  </section>

  {/* Category filters + card grid */}
  <section style="padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);">
    <div style="max-width: 1200px; margin: 0 auto;">

      {/* Filter pills */}
      <div class="flex flex-wrap gap-2 mb-10" id="category-filters">
        <button class="blog-filter-pill blog-filter-pill--active" data-category="all">All</button>
        {blogCategories.map(cat => (
          <button class="blog-filter-pill" data-category={cat.slug}>
            <i class={`ph-duotone ${cat.icon}`} style="font-size: 0.875rem;"></i>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div class="blog-index-grid" id="blog-grid">
        {posts.map(post => {
          const cat = getCategoryBySlug(post.data.category);
          const readingTime = getReadingTime(post.body);
          const formattedDate = post.data.date.toLocaleDateString('en-GB', {
            year: 'numeric', month: 'short', day: 'numeric',
          });
          return (
            <div class="blog-grid-item" data-category={post.data.category} data-reveal>
              <BlogCardNew
                title={post.data.title}
                href={'/blog/' + post.id.replace(/\.md$/, '')}
                image={post.data.image}
                categorySlug={post.data.category}
                categoryLabel={cat?.label || post.data.category}
                categoryIcon={cat?.icon || 'ph-article'}
                date={formattedDate}
                readingTime={readingTime}
                excerpt={post.data.excerpt || post.body?.slice(0, 160) + '...'}
              />
            </div>
          );
        })}
      </div>

    </div>
  </section>

</Base>

<style>
  /* Hero — same as service pages (GOSPEL pattern) */
  .svc-hero {
    background: var(--hero-bg, #0D1117);
    position: relative;
    overflow: hidden;
    min-height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(6rem, 14vw, 10rem) var(--content-px) clamp(4rem, 8vw, 6rem);
  }

  .svc-hero::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(92,59,156,0.20) 0%, rgba(92,59,156,0.08) 40%, transparent 70%);
    pointer-events: none;
    z-index: 1;
  }

  .svc-hero__glow {
    position: absolute;
    inset: 0;
    background: var(--hero-bg, #0D1117);
    opacity: 0.5;
    pointer-events: none;
  }

  .svc-hero__content {
    position: relative;
    z-index: 2;
    max-width: var(--content-max, 1140px);
    width: 100%;
    text-align: center;
  }

  /* Filter pills */
  .blog-filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--muted-foreground);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .blog-filter-pill:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .blog-filter-pill--active {
    background: var(--primary);
    border-color: var(--primary);
    color: #FFFFFF;
  }

  /* Card grid */
  .blog-index-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1023px) {
    .blog-index-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 639px) {
    .blog-index-grid {
      grid-template-columns: 1fr;
    }
  }

  .blog-grid-item {
    transition: opacity 0.3s ease;
  }

  .blog-grid-item.hidden {
    display: none;
  }

  /* Scroll reveal (GOSPEL pattern) */
  [data-reveal] {
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }

  [data-reveal].is-visible {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal] {
      opacity: 1;
      transition: none;
    }
  }
</style>

<script>
  // --- Category filtering ---
  const filters = document.querySelectorAll('.blog-filter-pill');
  const items = document.querySelectorAll('.blog-grid-item');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = (btn as HTMLElement).dataset.category;

      // Update active pill
      filters.forEach(f => f.classList.remove('blog-filter-pill--active'));
      btn.classList.add('blog-filter-pill--active');

      // Filter cards
      items.forEach(item => {
        const el = item as HTMLElement;
        if (category === 'all' || el.dataset.category === category) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });
    });
  });

  // --- Scroll reveal (GOSPEL pattern) ---
  requestAnimationFrame(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    if (!revealItems.length) return;
    let staggerIndex = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = staggerIndex * 150;
            staggerIndex++;
            setTimeout(() => el.classList.add('is-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealItems.forEach((item) => observer.observe(item));
  });
</script>
```

**Step 2: Verify**

```bash
pnpm dev
```

Visit localhost:4321/blog. Should see dark hero, filter pills, 3 blog cards in a grid. Click category pills to filter. Cards should fade in with scroll reveal.

**Step 3: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "feat: blog index with dark hero, category filters, new card design"
```

---

### Task 7: Blog Post Template — Featured Image, Category, Related Posts

**Files:**
- Modify: `src/pages/blog/[...slug].astro`

**Step 1: Update the post template**

Add featured image at top, category pill, and related posts section at bottom.

```astro
---
import Base from '../../layouts/Base.astro';
import BlogCardNew from '../../components/BlogCardNew.astro';
import { getCollection } from 'astro:content';
import { getCategoryBySlug } from '../../data/blog-categories';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id.replace(/\.md$/, '') },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();

const wordCount = post.body ? post.body.split(/\s+/).length : 0;
const readingTime = Math.max(1, Math.ceil(wordCount / 200));

const formattedDate = post.data.date.toLocaleDateString('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const description = post.data.excerpt || (post.body ? post.body.slice(0, 160) : '');
const cat = getCategoryBySlug(post.data.category);
const placeholderImage = '/images/blog/placeholder.webp';

// Related posts: same category, excluding current, max 3
const allPosts = (await getCollection('blog'))
  .filter(p => !p.data.draft && p.id !== post.id)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const relatedPosts = allPosts
  .filter(p => p.data.category === post.data.category)
  .slice(0, 3);

// If not enough same-category posts, fill with latest
const fillerPosts = relatedPosts.length < 3
  ? allPosts.filter(p => !relatedPosts.some(r => r.id === p.id)).slice(0, 3 - relatedPosts.length)
  : [];

const related = [...relatedPosts, ...fillerPosts];
---

<Base title={`${post.data.title} — Consultates Blog`} description={description}>
  <section style="padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);">
    <div style="max-width: 720px; margin: 0 auto;">
      <a href="/blog" class="text-body text-primary hover:underline mb-6 inline-block">&larr; Back to Blog</a>

      {/* Featured image */}
      <div style="aspect-ratio: 16 / 9; overflow: hidden; border-radius: var(--card-radius, 16px); background: var(--secondary); margin-bottom: 2rem;">
        <img
          src={post.data.image || placeholderImage}
          alt=""
          style="width: 100%; height: 100%; object-fit: cover;"
        />
      </div>

      {/* Category pill + meta */}
      <div class="flex items-center gap-3 mb-4">
        {cat && (
          <span class="blog-post__pill">
            <i class={`ph-duotone ${cat.icon}`} style="font-size: 0.875rem;"></i>
            {cat.label}
          </span>
        )}
        <span class="text-cite text-muted-foreground" style="font-family: var(--font-mono);">
          {formattedDate} &middot; {readingTime} min read
        </span>
      </div>

      <h1 class="text-hero font-serif">{post.data.title}</h1>

      <div class="prose prose-lg max-w-none mt-8">
        <Content />
      </div>
    </div>
  </section>

  {/* Related posts */}
  {related.length > 0 && (
    <section class="bg-secondary" style="padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 8rem);">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h2 class="text-section font-serif mb-8">Keep reading</h2>
        <div class="blog-related-grid">
          {related.map(p => {
            const pCat = getCategoryBySlug(p.data.category);
            return (
              <BlogCardNew
                title={p.data.title}
                href={'/blog/' + p.id.replace(/\.md$/, '')}
                image={p.data.image}
                categorySlug={p.data.category}
                categoryLabel={pCat?.label || p.data.category}
                categoryIcon={pCat?.icon || 'ph-article'}
                compact={true}
              />
            );
          })}
        </div>
      </div>
    </section>
  )}
</Base>

<style>
  .blog-post__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.625rem;
    border-radius: 9999px;
    background: color-mix(in srgb, var(--primary) 12%, transparent);
    color: var(--primary);
  }

  .blog-related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1023px) {
    .blog-related-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 639px) {
    .blog-related-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Step 2: Verify**

```bash
pnpm dev
```

Visit a blog post (e.g. localhost:4321/blog/youre-not-the-only-one-stuck). Should see featured image, category pill, date+reading time, prose content, and related posts at bottom.

**Step 3: Commit**

```bash
git add src/pages/blog/[...slug].astro
git commit -m "feat: blog post template with featured image, category, related posts"
```

---

### Task 8: Prose Typography Improvements

**Files:**
- Modify: `src/styles/global.css` (lines 607–615, the prose section)

**Step 1: Replace the minimal prose overrides**

Find the existing prose section (around line 607) and replace with comprehensive typography:

```css
/* --------------------------------------------------------
   Prose typography overrides — blog posts
   -------------------------------------------------------- */
.prose {
  font-family: var(--font-sans);
  --tw-prose-links: var(--primary);
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  font-family: var(--font-serif);
}

.prose h2 {
  margin-top: 2.5em;
  margin-bottom: 0.75em;
}

.prose h3 {
  margin-top: 2em;
  margin-bottom: 0.5em;
}

.prose a {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.prose a:hover {
  border-bottom-color: var(--primary);
}

.prose blockquote {
  border-left: 3px solid var(--primary);
  font-style: italic;
  padding-left: 1.25em;
  color: var(--muted-foreground);
}

.prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--secondary);
  padding: 0.125em 0.375em;
  border-radius: 4px;
}

.prose pre {
  background: var(--secondary);
  border: 1px solid var(--border);
  border-radius: var(--card-radius, 16px);
  padding: 1.25rem;
  overflow-x: auto;
}

.prose pre code {
  background: none;
  padding: 0;
  border-radius: 0;
}

.prose li {
  margin-top: 0.375em;
  margin-bottom: 0.375em;
}

.prose strong {
  color: var(--foreground);
}
```

**Step 2: Verify**

```bash
pnpm dev
```

Visit a blog post. Check heading spacing, link colours, blockquote styling, code blocks, list spacing.

**Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: improved prose typography for blog posts"
```

---

### Task 9: Final Build Verification

**Step 1: Full production build**

```bash
pnpm build
```

Expected: Clean build with no errors or warnings.

**Step 2: Preview**

```bash
pnpm preview
```

Check these pages:
- Homepage: scroll to bottom, verify blog carousel works (film-strip animation, dots, arrows, swipe)
- Blog index: dark hero, filter pills work, cards display correctly
- Blog post: featured image, category pill, prose typography, related posts
- All service pages: still work (no regressions)
- Contact page: still works

**Step 3: Commit all remaining changes**

If any files were missed in earlier commits:

```bash
git add -A
git status  # review what's staged
git commit -m "feat: blog redesign — cards, carousel, index, typography"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Category data file | Create `src/data/blog-categories.ts` |
| 2 | Extended content schema | Modify `src/content/config.ts` + 3 blog posts |
| 3 | New blog card component | Create `src/components/BlogCardNew.astro` |
| 4 | Blog carousel island | Create `src/components/islands/BlogCarouselIsland.tsx` |
| 5 | Homepage blog highlights | Modify `src/pages/index.astro`, archive TransitionalCTAs |
| 6 | Blog index rewrite | Modify `src/pages/blog/index.astro` |
| 7 | Blog post template | Modify `src/pages/blog/[...slug].astro` |
| 8 | Prose typography | Modify `src/styles/global.css` |
| 9 | Final verification | Build + preview + commit |
