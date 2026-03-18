# Handoff: Consultates Rebuild — v2.1 Bridge

**Written:** 2026-03-10
**Purpose:** Capture everything a fresh GSD session needs to continue this project. The GSD state (STATE.md, ROADMAP.md) is stale — it reflects what was true after Phase 15 (2026-03-07). Three days of ad-hoc work were done outside GSD (2026-03-09 through 2026-03-10). This document bridges the gap.

**Start here before touching anything:**
- Read `READMEFIRST.md` — full project history, anti-slop rules, technical pitfalls
- Read `CLAUDE.md` — project instructions, known issues, tech stack
- Read `STATUS.md` — running per-page tracker
- Open `~/Development/consultates-brand-guidelines/consultates/guidelines/website-design-v3.html` in a browser — the single source of truth for design decisions

---

## 1. What Was Done Outside GSD

### 2026-03-09

**Homepage — Section nav dropdown**
- Nav dropdown now shows Phosphor icons and short descriptions per section
- Sections include: What We Offer (index 2), Use Cases (3), How It Works (4), Testimonials (5), Why Consultates (6), Get Started (7)
- Cross-page navigation: all pages show the Home dropdown; links use `/?section=N` URL params; Base.astro reads the param on load and calls `window.scrollToSection(N)`
- Stakes (NegativeStakes) is missing from the dropdown — it was never added. This is a confirmed bug in STATUS.md.

**Homepage — Purple silk video hero**
- Background video: ping-pong loop, scale 1.2, opacity 0.7
- Dark overlay at 0.35 opacity (reduced from 0.50)
- Dot grid + radial purple glow retained
- Single ScrollIndicator and TrustBar instances moved to fixed positioning outside scroll sections (resolves the mobile duplication bug from Phase 9)

**Homepage — Social proof redesign**
- Logo ticker: scrolling strip of client/partner logos
- Quote carousel: SocialProofIsland with film-strip animation (zoom-out → wind → zoom-in), 3-phase same as BlogCarouselIsland
- Reference photos added to testimonial cards
- SocialProofIsland now accepts optional `quotes: Reference[]` prop — used on all service pages too

**About page — Full rebuild**
- Dark hero: purple glow + dot grid, placeholder for background photo
- Founder message: 50/50 grid, text left + photo right (sticky), Gary's approved copy
- Photo: `Me-for-Website-450x600.webp`
- Timeline: CSS Grid, 6 entries (1980s → 1990s → 2000s → 2010s → Today → Why it matters)
- Scroll reveal: `data-reveal` attribute + IntersectionObserver (replaces SectionAnimator entirely)
- "Lead with AI PRO" section removed per Gary's direction
- No dark CTA section (removed per Gary's direction)

**Gary's nav avatar**
- File: `gary-nav-avatar.webp` (80x80, 3.4KB)
- Positioned right of the CTA button, desktop only

**Service pages — Full rebuild (all three)**
Unified structure applied across advisory, training, and fractional pages:
1. Dark hero with section-specific headline
2. What You Get — 3 cards with Phosphor duotone icons in cream/purple circle containers
3. Who It's For — 3 scenario cards
4. Testimonials — SocialProofIsland with `quotes` prop (curated per service)
5. How It Works — 3-step layout
6. Dark CTA — StaggerHeading + btn-alive--on-dark (hero mirror pattern)

Icon assignments:
- Advisory: `shield-check`, `crosshair`, `list-checks`
- Training: `wrench`, `play-circle`, `trend-up`
- Fractional: `map-trifold`, `compass`, `globe-hemisphere-west`

Testimonial assignments:
- Advisory: Anastasia Fischer + Alexandros Lioumbis
- Training: Julie Lee + Anastasia Fischer
- Fractional: Dave Mommen + Danny Tan

Testimonials live in `src/data/social-proof.ts` as named exports: `advisoryTestimonials`, `trainingTestimonials`, `fractionalTestimonials`.

**Website design doc updated**
Four GOSPEL sections added to `website-design-v3.html`:
1. Testimonial Carousel — film-strip animation spec, must use SocialProofIsland
2. Scroll Reveal — data-reveal + IntersectionObserver pattern, replaces SectionAnimator
3. Timeline — CSS Grid pattern from About page
4. Service Page Structure — exact section order and component choices

SectionAnimator marked DEPRECATED in the design doc. Do not use it.

---

### 2026-03-10

**Blog content schema extended**
`src/content/config.ts` schema now includes: `image`, `category`, `tags` fields.

**BlogCarouselIsland**
- 5-card film-strip with gradient fades on left/right edges
- Arrows, dots, auto-advance (8s), pause-on-hover, swipe support
- Cards show: image, category pill, title, date, reading time, excerpt, Read btn-alive (bottom-right)
- Same 3-phase film-strip animation as SocialProofIsland
- `BlogCardData` interface: `{ title, href, image?, categoryLabel, categoryIcon, date?, readingTime?, excerpt? }`

**Homepage — Blog highlights in "Get Started" section**
- BlogCarouselIsland embedded in the Get Started scroll-section
- Passes date, readingTime, excerpt alongside existing fields

**Blog post template rebuilt**
- Featured image at top, category pill, date + reading time
- Improved prose typography: headings, links, blockquotes, code blocks
- Related posts section ("Keep reading") with compact cards

**Blog index — Full rebuild**
- Dark hero: "Things to inspire and inform you" (compact, vertically centered, `--hero-fg` color)
- BlogIndexIsland wrapper: category filter pills + BlogCarouselIsland with `key={selectedCategory}` for carousel remount on filter change
- Filtering bridges React↔Astro via `blog-category-change` custom event dispatched by BlogIndexIsland; server-rendered grid listens for the same event
- "All articles" 3-column grid only renders when `posts.length > 5`
- BlogCardNew used in grid: equal-height flexbox, Read btn-alive bottom-right

**StaggerHeading word-wrap fix**
- Old: individual characters with non-breaking spaces → caused mid-word breaks at narrow widths
- Fixed: words wrapped in `white-space: nowrap` spans, real spaces between words
- Applies to all StaggerHeading instances site-wide

**Other fixes**
- StakesCTA container widened 800px → 960px
- `word-break: normal; overflow-wrap: anywhere` added globally to `.text-hero` and `.text-section`
- Scroll-section restore on reload: sessionStorage in Base.astro
- 3 dummy blog posts added for grid threshold testing (strategy, tools-tactics, ai-safety categories)

**GitHub Pages deploy**
- SSL active on consultates.com
- Deploy workflow triggers on master branch

---

## 2. GSD Phases 16-17 Status

### Phase 16: Contact Page

The GSD roadmap shows this as "Not started." In reality, the Contact page was rebuilt during ad-hoc sessions and is marked DONE in STATUS.md:
- Dark hero with form reveal animation
- TidyCal embed (lazy-loaded)
- Form with reCAPTCHA, honeypot
- Email: `gary@consultates.com`

**Recommendation:** Mark Phase 16 complete in STATE.md and ROADMAP.md. May need a quick Playwright verification pass only.

### Phase 17: Blog

The GSD roadmap shows this as "Not started." In reality, significant blog work was completed 2026-03-10:
- Blog index redesigned (dark hero + category carousel + grid)
- Blog post template rebuilt (featured images, category pills, prose typography, related posts)

**Recommendation:** Mark Phase 17 complete in STATE.md and ROADMAP.md. All original success criteria (3-column grid, design system cards, serif titles, mono date, wider content column) are satisfied.

---

## 3. Confirmed Remaining Work

These items are verified open in STATUS.md as of 2026-03-10.

### Footer redesign
Gary called the current footer "slop." No work has been done on it. This is the most visible outstanding design problem — it shows on every page. No specific brief yet; Gary will direct.

### Homepage — How It Works section
Section exists but is average. Animated timeline component (HowItWorksIsland) was built in Phase 12 but the section has not been given visual polish to match the hero standard. Needs review.

### Homepage — Why Consultates section
Needs a complete redo. This is one of the "soulless middle" sections called out in READMEFIRST.md — important content (what makes Consultates different) with zero visual identity.

### Homepage — Get Started / StakesCTA section
Padding was reduced and blog carousel was embedded, but the section is still not polished. Needs design attention.

### Stakes (NegativeStakes) missing from Home nav dropdown
The `homeSections` array in `src/components/Nav.astro` (line 35) covers sections 2–7 but skips the NegativeStakes section. It needs an entry with an appropriate index, label, description, and Phosphor icon.

Current array for reference:
```
index 2 — What We Offer
index 3 — Use Cases
index 4 — How It Works
index 5 — Testimonials
index 6 — Why Consultates
index 7 — Get Started
```
NegativeStakes is the stats/urgency section (84% of managers feel unprepared, etc.) — it sits between Hero and What We Offer, so it would be index 1 or needs the array to be audited against the actual scroll-section order.

### FormInput icon padding bug
`src/components/FormInput.astro`, line 62: the `<input>` element uses `class={fieldClasses}` but never applies `iconPaddingClass`. When an icon is passed, the icon appears in the label but the input text overlaps it.

Fix: change `class={fieldClasses}` to `class={[fieldClasses, iconPaddingClass].filter(Boolean).join(' ')}` on the input element.

---

## 4. Components and Patterns Available — Do Not Rebuild

| Component | File | Notes |
|-----------|------|-------|
| SocialProofIsland | `src/components/islands/SocialProofIsland.tsx` | Film-strip testimonial carousel. Accepts `quotes: Reference[]` prop. Used on homepage + all 3 service pages. |
| BlogCarouselIsland | `src/components/islands/BlogCarouselIsland.tsx` | Film-strip blog card carousel. Accepts `posts: BlogCardData[]` prop. 5-card strip. |
| BlogIndexIsland | `src/components/islands/BlogIndexIsland.tsx` | Category filter pills + BlogCarouselIsland wrapper. Dispatches `blog-category-change` event. |
| BlogCardNew | `src/components/BlogCardNew.astro` | Server-rendered blog card for grids. Equal-height flexbox, Read btn-alive bottom-right. |
| StaggerHeading | `src/components/islands/StaggerHeading.tsx` | Letter-stagger h2 for dark CTA sections. Words in nowrap spans (word-wrap fix applied). |
| StakesCTAPulse | `src/components/islands/StakesCTAPulse.tsx` | btn-alive--on-dark CTA. Used in all dark CTA sections. |
| HowItWorksIsland | `src/components/islands/HowItWorksIsland.tsx` | Animated timeline with connecting lines. |
| CountUpStat | `src/components/islands/CountUpStat.tsx` | Animated stat counter. Uses MutationObserver for GSAP compat — do not change this. |
| StrokeDrawStats | `src/components/islands/StrokeDrawStats.tsx` | SVG stroke-draw stat icons. |
| HeroIsland | `src/components/islands/HeroIsland.tsx` | Letter stagger + CTA pulse. The visual benchmark. |
| OfferingCardsIsland | `src/components/islands/OfferingCardsIsland.tsx` | Sequential card animation. The pattern template for L→R card reveals. |

**Scroll reveal pattern** (replaces SectionAnimator):
- Add `data-reveal` attribute to any element
- IntersectionObserver in an inline `<script>` handles opacity reveal
- Threshold: 0.15, stagger: 150ms, wrapped in requestAnimationFrame to prevent FOUC
- See About page or any service page for reference implementation

**btn-alive system** (in `src/styles/global.css`):
- `.btn-alive` — underline-draw with clip-path taper + radial purple glow
- `.btn-alive--on-dark` — white text, purple accent, for dark sections
- Never use gradient buttons or `border-radius: 9999px` pill buttons

**Film-strip animation pattern** (used in both carousels):
- Phase 1: zoom-out (scale 0.85 + fade)
- Phase 2: wind (x-shift in scroll direction)
- Phase 3: zoom-in (scale 1.0)
- Auto-advance: 8s, pause-on-hover, swipe support

---

## 5. Design Authority

The website design document is the single source of truth for all design decisions:

```
~/Development/consultates-brand-guidelines/consultates/guidelines/website-design-v3.html
```

Open it in a browser. It has live demos, light/dark toggle, and GOSPEL sections for every finished component. Read it before building anything new or modifying any existing section.

**Three-document design system:**

| Document | Purpose |
|----------|---------|
| `brand-theme-v3.html` | Portable identity: colours, typography, icons, spacing, animation tokens |
| `website-design-v3.html` | Website patterns: hero, cards, btn-alive, CTA sections, nav, footer |
| `mission-control-design-v3.html` | Dashboard patterns (not relevant to this project currently) |

All three live in `~/Development/consultates-brand-guidelines/consultates/guidelines/`.

**Document authority hierarchy (design conflicts):**
Website design doc > PRD > everything else

The PRD (`PRD.md`) is read-only for copy and routes. Do not trust it for design patterns, button specs, animation values, or layout decisions — it tried to be all things and is now a liability for design questions.

---

## 6. Key Constraints

These constraints exist because of past failures. Violating them will break things or reproduce problems that were hard-won to fix.

**GSAP scroll-snap — do not touch**
The homepage "film strip on a spool" scroll system is in `src/layouts/Base.astro`. It works. It was hard to build. Do not modify it unless Gary explicitly asks. The `scrollToSection(index)` function is exposed on `window` for programmatic jumps.

**Do not rebuild existing components**
The #1 failure pattern in this project is agents rebuilding things that already work. Check the design doc GOSPEL sections and the component table above before writing any new component.

**Do not improvise copy**
Gary directs copy. If no text is specified for a section, ask Gary. Do not generate marketing language.

**SectionAnimator is deprecated**
Do not import or use `SectionAnimator.tsx`. Use `data-reveal` + IntersectionObserver instead. The design doc's GOSPEL section on Scroll Reveal has the canonical implementation.

**ScrollIndicator and TrustBar are fixed-position singletons**
They exist once, outside the scroll-section wrapper, fixed to the viewport. Do not put them inside scroll sections or duplicate them.

**Animation sequencing — no boolean intermediaries**
Do not use boolean state variables (`titleDone`, `descDone`, etc.) to sequence animations in React. They persist across viewport re-entries and cause stale `onComplete()` calls. Call `onComplete()` directly from the interval/timeout callback. See READMEFIRST.md for full context.

**CountUpStat — do not change the MutationObserver pattern**
It exists to work around a GSAP + IntersectionObserver interaction bug. Changing it back to `whileInView` will break the stat counter.

**Animation stack: GSAP + Framer Motion are decoupled**
GSAP handles page-level scroll/snap. Framer Motion handles component-level animation in React islands. They do not communicate. Keep it that way.

---

## 7. Recommended Next Steps for GSD

### Option A: Phase 18 "Homepage Polish + Footer" (recommended)

Update ROADMAP.md to mark Phases 16 and 17 complete, then add Phase 18:

**Phase 18: Homepage Polish + Footer**
Goal: The homepage middle sections and footer reach the visual standard set by the hero. Every page in the site ends with a footer that isn't "slop."

Work items:
1. Footer redesign — Gary to provide brief
2. Homepage How It Works — polish to match hero standard
3. Homepage Why Consultates — complete redo
4. Homepage Get Started / StakesCTA — design polish
5. Stakes in nav dropdown — add NegativeStakes entry to homeSections array
6. FormInput icon padding bug — apply iconPaddingClass to input element

### Option B: Close v2.0, open v3.0 "Polish" milestone

Mark Phases 16 and 17 complete (closing v2.0). Create v3.0 milestone "Polish" with the same work items as Option A.

Option B is cleaner semantically — v2.0 was "Visual Redesign" and the remaining work is polish, not new design. Either approach works; choose based on how GSD handles milestone completion.

---

## 8. GSD State Update Required

Before running the next GSD session, update these files to reflect reality:

**`.planning/STATE.md`**
- `stopped_at`: Update to reflect ad-hoc sessions ending 2026-03-10
- `last_activity`: 2026-03-10 — Blog index rebuild + Homepage nav + various fixes
- `progress`: Phases 16 and 17 should be marked complete

**`.planning/ROADMAP.md`**
- Mark Phase 16 Complete (2026-03-10)
- Mark Phase 17 Complete (2026-03-10)
- Add Phase 18 if using Option A
- Or update milestone to v3.0 if using Option B

**`STATUS.md`**
Already up to date as of 2026-03-10. Continue updating it as work completes.
