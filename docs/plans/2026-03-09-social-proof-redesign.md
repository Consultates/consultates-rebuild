# Social Proof Section Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static single-quote social proof section with a two-part animated section: scrolling logo ticker + horizontal film-strip quote carousel.

**Architecture:** A new React island (`SocialProofIsland.tsx`) handles the quote carousel with Framer Motion `AnimatePresence` for the zoom-out/wind/zoom-in transitions. The logo ticker is pure CSS (infinite keyframe scroll on a duplicated strip). The existing `SocialProofSection.astro` wrapper is replaced with a new version that composes both parts.

**Tech Stack:** React 18, Framer Motion, Tailwind CSS 4, Astro islands (`client:visible`)

---

## Task 1: Collect Logo Assets

**Files:**
- Create: `public/logos/` directory with SVG/PNG logo files

**Step 1: Create the logos directory**

```bash
mkdir -p public/logos
```

**Step 2: Source and save logo files**

Needed logos (grayscale SVGs preferred):
- `juniper.svg` — Juniper Networks
- `ciena.svg` — Ciena (formerly Cyan)
- `cylance.svg` — BlackBerry Cylance
- `wedge.svg` — Wedge Networks
- `generativeleads.svg` — GenerativeLeads AI
- `flexos.svg` — FlexOS
- `leadwithai.svg` — Lead with AI PRO
- `acepacific.svg` — Ace Pacific Group

For each: download from company press kit or website. If SVG unavailable, use a clean PNG. Ensure all logos are roughly the same visual height (~32px rendered).

**Step 3: Commit**

```bash
git add public/logos/
git commit -m "feat: add company logo assets for social proof ticker"
```

> **Note:** This task may require manual sourcing. If logos aren't freely available, use text-only wordmarks as placeholders (styled with the company name in a clean sans-serif font). The ticker CSS works either way.

---

## Task 2: Logo Ticker Component (Pure CSS)

**Files:**
- Create: `src/components/LogoTicker.astro`

**Step 1: Create the logo ticker component**

This is a pure CSS infinite horizontal scroll. No JavaScript needed. The technique: duplicate the logo strip so it wraps seamlessly.

```astro
---
/**
 * LogoTicker — infinite horizontal scrolling logo bar.
 * Pure CSS animation, no JS. Logos rendered grayscale.
 *
 * Usage: <LogoTicker />
 */

interface Logo {
  name: string;
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { name: 'Juniper Networks', src: '/logos/juniper.svg', alt: 'Juniper Networks' },
  { name: 'Ciena', src: '/logos/ciena.svg', alt: 'Ciena' },
  { name: 'Cylance', src: '/logos/cylance.svg', alt: 'BlackBerry Cylance' },
  { name: 'Wedge Networks', src: '/logos/wedge.svg', alt: 'Wedge Networks' },
  { name: 'GenerativeLeads', src: '/logos/generativeleads.svg', alt: 'GenerativeLeads AI' },
  { name: 'FlexOS', src: '/logos/flexos.svg', alt: 'FlexOS' },
  { name: 'Lead with AI PRO', src: '/logos/leadwithai.svg', alt: 'Lead with AI PRO' },
  { name: 'Ace Pacific', src: '/logos/acepacific.svg', alt: 'Ace Pacific Group' },
];
---

<div class="logo-ticker-wrapper">
  <p class="text-caption text-muted-foreground text-center mb-4 tracking-wide uppercase">
    Worked with leaders from
  </p>
  <div class="logo-ticker" aria-label="Companies Gary has worked with">
    <div class="logo-ticker__track">
      {/* Render logos twice for seamless loop */}
      {[...logos, ...logos].map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.alt}
          class="logo-ticker__logo"
          loading="lazy"
        />
      ))}
    </div>
  </div>
</div>

<style>
  .logo-ticker-wrapper {
    padding: 2rem 0;
  }
  .logo-ticker {
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
  }
  .logo-ticker__track {
    display: flex;
    gap: 3rem;
    align-items: center;
    width: max-content;
    animation: ticker-scroll 30s linear infinite;
  }
  .logo-ticker__logo {
    height: 28px;
    width: auto;
    filter: grayscale(100%);
    opacity: 0.5;
    transition: opacity 0.3s ease, filter 0.3s ease;
    flex-shrink: 0;
  }
  .logo-ticker__logo:hover {
    opacity: 0.8;
    filter: grayscale(50%);
  }
  @keyframes ticker-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .logo-ticker__track {
      animation: none;
    }
  }
</style>
```

**Step 2: Verify it renders**

```bash
pnpm dev
```

Temporarily add `<LogoTicker />` to `index.astro` in the social proof scroll-section to confirm it renders. Check:
- Logos scroll left infinitely
- Seamless wrap (no gap or jump)
- Grayscale treatment
- Edge fade masks visible
- Reduced motion: static strip

**Step 3: Commit**

```bash
git add src/components/LogoTicker.astro
git commit -m "feat: add LogoTicker component with CSS-only infinite scroll"
```

---

## Task 3: Quote Data File

**Files:**
- Create: `src/data/social-proof.ts`

**Step 1: Create the data file**

Extract quote data from the PRD into a typed data file so both the homepage carousel and service page components can import from one source.

```typescript
export interface Reference {
  name: string;
  title: string;
  category: 'ai' | 'sales' | 'ai+sales';
  categoryLabel: string;
  quote: string;
}

/**
 * All LinkedIn references, categorised.
 * Source of truth: PRD.md "Social Proof — LinkedIn References"
 */
export const allReferences: Reference[] = [
  // === AI Category ===
  {
    name: 'Anastasia Fischer',
    title: 'Strategic Growth Leader | Nonprofit & Climate Innovation',
    category: 'ai',
    categoryLabel: 'AI',
    quote: 'Gary is a great communicator and a very nice guy who really knows AI agents and agentic systems. I learned a lot from him, and really enjoyed the clarity of his approach. I highly recommend working with him!',
  },
  {
    name: 'Julie Lee',
    title: 'Group HR Director | Former Fractional CHRO',
    category: 'ai',
    categoryLabel: 'AI Training',
    quote: "I invited Gary to give a talk about how to utilise AI to enhance our sales team productivity during a town hall meeting. It was eye-opening and educational and the session had helped people see the possibility of AI adoption beyond just an alternative to google and drafting/writing. I highly recommend Gary to anyone who is looking to expand the use of AI in their organisations.",
  },
  {
    name: 'Alexandros Lioumbis',
    title: 'Future of Work/IP/AI/Innovations | Founder & Patent Attorney',
    category: 'ai',
    categoryLabel: 'Agentic AI',
    quote: "There are people who use AI, there are people who understand AI, there are people who use Agents and understand Agentic AI. And then, there\u00B4s Gary. Gary\u00B4s AI expertise in business automation allows him to transform, integrate and redefine processes with the use of Agents and Agentic AI systems, while having the ability to explain, teach and communicate the concepts effortlessly to the broader business world. Gary is \"the\" go-to guy for Agentic AI. Hands down.",
  },
  // === AI + Sales (bridges both) ===
  {
    name: 'Dave Mommen',
    title: 'Managing Partner @ GenerativeLeads AI',
    category: 'ai+sales',
    categoryLabel: 'AI + Sales',
    quote: "I worked with Gary at GenerativeLeads.ai and I have experienced first-hand how he blends sales leadership with deep expertise in AI. Having built and led sales organizations across APAC myself, I can say Gary brings a rare ability to connect strategy with execution. He helped shape our product direction and pushed us to operate at a higher standard. His wide global network not only allowed us to sell more, and faster, but also helped us to validate our strategy and ideas for the business. What I value most is that he\u2019s a genuine partner\u2014focused on results, but always bringing people along in the process.",
  },
  // === Sales Category ===
  {
    name: 'Danny Tan',
    title: 'Director Asia Pacific @ Ace Pacific Group',
    category: 'sales',
    categoryLabel: 'Sales Partnership',
    quote: "I have partnered with Gary across three companies over the past 10 years, and every organization he leaves feels his absence because he always makes a huge impact. Working with Gary has been nothing but fantastic. As partners, we go all out to work, win, and deliver the best solutions for clients. Gary is meticulous and patient when needed, and precise when it comes to orchestrating deals. His ability to bring people together, keep the focus on outcomes, and build trust across teams and customers makes him stand out as a leader and a partner. He\u2019s simply a great guy to have on your side.",
  },
  {
    name: 'Frank Wiener',
    title: 'CMO and Director of Product Marketing (retired)',
    category: 'sales',
    categoryLabel: 'Sales Leadership',
    quote: "I\u2019ve had the pleasure of working with Gary at two different companies. I originally hired him into Cyan when we were launching our international expansion. He joined as an SE and subsequently went on to head up pre-sales for Cyan\u2019s APAC region, then he successfully transitioned from pre-sales to sales and sales leadership as the RSM for SE Asia. With Wedge Networks, as VP of Sales for APAC, Gary has demonstrated remarkable skill and resilience at introducing a small but innovative start-up into major accounts, competing against well-established Tier 1 incumbents. His strong work ethic, personal networking, and technical prowess have enabled him to enter new markets with minimal support to land key accounts.",
  },
  {
    name: 'Evan Davidson',
    title: 'Former Cylance (managed Gary directly)',
    category: 'sales',
    categoryLabel: 'Sales Leadership',
    quote: "Gary led our MSSP and enterprise sales efforts at Cylance across SE Asia and Greater China, reporting to me. This region is challenging in its diversity and reach which Gary inherited but quickly brought structure, a strong work ethic to help start moving the business forward. He understands complex enterprise selling & partner management which is important in this region as you scale a product like Cylance. He operated in a confident and professional way hitting his objectives for the region requiring little management over sight. If you need someone who can own a region and drive results, Gary is a very strong consideration for any sales leader looking for a results driven individual.",
  },
];

/**
 * Homepage carousel — curated narrative arc:
 * Sales Leadership → AI+Sales → Pure AI
 */
export const homepageQuotes: Reference[] = [
  allReferences.find(r => r.name === 'Evan Davidson')!,
  allReferences.find(r => r.name === 'Dave Mommen')!,
  allReferences.find(r => r.name === 'Alexandros Lioumbis')!,
];

/** Filter references by category for service pages */
export function getByCategory(cat: Reference['category']): Reference[] {
  return allReferences.filter(r => r.category === cat || r.category === 'ai+sales');
}
```

**Step 2: Verify types compile**

```bash
pnpm build 2>&1 | head -30
```

Expected: no TypeScript errors related to `social-proof.ts`.

**Step 3: Commit**

```bash
git add src/data/social-proof.ts
git commit -m "feat: add typed social proof data with category filtering"
```

---

## Task 4: Film-Strip Quote Carousel Island

**Files:**
- Create: `src/components/islands/SocialProofIsland.tsx`
- Reference: `src/components/islands/HeroIsland.tsx` (letter stagger pattern)
- Reference: `src/lib/animations.ts` (shared utilities)

This is the core component. It implements the horizontal film-strip transition: zoom out → slide sideways → zoom in.

**Step 1: Create the island component**

```tsx
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
```

**Step 2: Verify it compiles**

```bash
pnpm build 2>&1 | head -30
```

Expected: no TypeScript errors.

**Step 3: Commit**

```bash
git add src/components/islands/SocialProofIsland.tsx
git commit -m "feat: add SocialProofIsland with horizontal film-strip carousel"
```

---

## Task 5: Replace SocialProofSection.astro

**Files:**
- Modify: `src/components/sections/SocialProofSection.astro` (full rewrite)

**Step 1: Rewrite the section to compose both parts**

Replace the entire file with:

```astro
---
/**
 * Social Proof section — homepage.
 * Logo ticker (CSS) + film-strip quote carousel (React island).
 */
import LogoTicker from '../LogoTicker.astro';
import SocialProofIsland from '../islands/SocialProofIsland';
---

<section id="section-proof" class="bg-secondary">
  <div style="padding: clamp(3rem, 6vw, 6rem) 0;">
    {/* Logo ticker — full width, bleeds to edges */}
    <LogoTicker />

    {/* Quote carousel */}
    <div style="padding: clamp(2rem, 4vw, 4rem) clamp(1.5rem, 5vw, 8rem) 0;">
      <SocialProofIsland client:visible />
    </div>
  </div>
</section>
```

**Step 2: Verify in browser**

```bash
pnpm dev
```

Navigate to `localhost:4321`, scroll to the social proof section. Check:
- Logo ticker scrolls continuously with edge fades
- Carousel shows Evan Davidson first
- Click right arrow → Dave Mommen slides in with film-strip animation
- Click right again → Alexandros Lioumbis
- Auto-advances after 8 seconds
- Hover pauses auto-advance
- Category pills show correct labels
- Navigation dots work
- Reduced motion: static display, no animation

**Step 3: Commit**

```bash
git add src/components/sections/SocialProofSection.astro
git commit -m "feat: replace static social proof with logo ticker + film-strip carousel"
```

---

## Task 6: Mobile Responsiveness

**Files:**
- Modify: `src/components/islands/SocialProofIsland.tsx`
- Modify: `src/components/LogoTicker.astro`

**Step 1: Test on mobile viewport (375px)**

In browser DevTools, toggle to mobile view. Check:
- Logo ticker: logos don't overflow, gap reduces
- Carousel: arrows don't overlap quote text
- Quote text readable at mobile font size
- Navigation dots accessible (tap targets ≥ 44px)

**Step 2: Fix mobile issues**

Likely adjustments:
- Move arrows below the quote on mobile (not overlapping)
- Reduce carousel minHeight on mobile
- Reduce logo gap in ticker on mobile
- Add touch/swipe support using Framer Motion drag gesture:

In `SocialProofIsland.tsx`, add to the `motion.div` wrapping the carousel:

```tsx
drag="x"
dragConstraints={{ left: 0, right: 0 }}
dragElastic={0.2}
onDragEnd={(_, info) => {
  if (info.offset.x > 50) goPrev();
  else if (info.offset.x < -50) goNext();
}}
```

**Step 3: Verify on mobile**

Swipe left → next quote. Swipe right → previous. No jank.

**Step 4: Commit**

```bash
git add src/components/islands/SocialProofIsland.tsx src/components/LogoTicker.astro
git commit -m "fix: mobile responsiveness for social proof carousel and logo ticker"
```

---

## Task 7: Visual Polish

**Files:**
- Modify: `src/components/islands/SocialProofIsland.tsx`
- Possibly: `src/styles/global.css` (if new utility classes needed)

**Step 1: Add decorative quote mark**

Add the large decorative `"` that the current section has (faded, serif, positioned behind the quote). This provides visual continuity with the existing design language.

**Step 2: Refine animation timing**

Test the transition and adjust:
- `duration` of enter/exit (currently 0.7s/0.5s) — should feel like the vertical scroll-snap timing
- `scale` values (currently 0.92) — match the homepage zoom factor if different
- Auto-advance interval (currently 8s) — enough time to read each quote?

**Step 3: Dark mode check**

Toggle dark mode. Verify:
- Category pill colours work
- Navigation dots visible
- Logo ticker grayscale still looks good
- Quote text contrast passes WCAG AA

**Step 4: Commit**

```bash
git add -u
git commit -m "fix: visual polish for social proof section — decorative quote, timing, dark mode"
```

---

## Summary

| Task | What | New/Modified |
|------|------|--------------|
| 1 | Logo assets | `public/logos/*.svg` |
| 2 | Logo ticker | `src/components/LogoTicker.astro` |
| 3 | Quote data | `src/data/social-proof.ts` |
| 4 | Carousel island | `src/components/islands/SocialProofIsland.tsx` |
| 5 | Section rewrite | `src/components/sections/SocialProofSection.astro` |
| 6 | Mobile | Modify island + ticker |
| 7 | Polish | Timing, dark mode, decorative elements |

Service page quote reuse (using `getByCategory()` from the data file) is a separate follow-up task — not part of this plan.
