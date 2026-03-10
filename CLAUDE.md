# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Start Here

**Read `READMEFIRST.md` before doing anything.** It contains the full history of this build — every mistake made, every design rule that exists because of those mistakes, what's broken right now, and what the owner actually wants. Tell the user you've read it and summarise the current state before starting work.

## Project

Consultates.com rebuild — a marketing site for Gary Tate's AI consulting business. Replacing a bloated WebWave site with a clean static site.

## Build & Dev Commands

```bash
pnpm install          # install dependencies
pnpm dev              # start dev server (localhost:4321)
pnpm build            # production build to dist/
pnpm preview          # preview production build
```

## Current Status

**Phases 1-15 complete.** The site is structurally built and deployed to GitHub Pages.

**Known issues:**
1. Training page icons broken — gray dots instead of Phosphor icons in "What you get" cards
2. Service page inconsistency — three different layouts for the same section types
3. Soulless middle sections — 80% of page area is white/cream with no visual life
4. About page dead zones — "A family business" and "Lead with AI PRO" have zero visual treatment
5. Content slots empty — intentional whitespace reserved for rotating quotes/stats, currently blank

**Not yet built:**
- Phase 17: Blog polish (typography, reading experience, related posts)

## PRD (Copy & Routes Only)

**`PRD.md`** contains Gary's approved copy and route definitions. The old PRD (`PRD.obsoleted.md`) tried to be a design doc — ignore it. All design decisions live in the website design doc (see Design Authority above).

**Animation stack:** GSAP ScrollTrigger (page-level scroll/snap, vanilla `<script>` in base layout) + Framer Motion (component animation in React islands via `whileInView`). They are decoupled — no cross-library communication.

**Tailwind 4:** CSS-first config via `@theme` block in `src/styles/global.css`. No `tailwind.config.js`. Use `@tailwindcss/vite` plugin, NOT `@astrojs/tailwind`.

## Tech Stack

- **Framework:** Astro 5
- **Styling:** Tailwind CSS 4
- **Interactive components:** React islands + Framer Motion
- **Blog:** Astro content collections (Markdown)
- **Icons:** Phosphor (`@phosphor-icons/react`, duotone weight)
- **Fonts:** IBM Plex Sans / Serif / Mono (self-hosted)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

## Design Authority

**The website design document is the single source of truth for building pages:**
`~/Development/consultates-brand-guidelines/consultates/guidelines/website-design-v3.html`

Read it before building any new page or section. It references the brand theme for identity tokens and points to reference implementations in this codebase.

If the website design doc conflicts with the PRD or any other document, the website design doc wins for design decisions. The PRD is authoritative for copy and routes only.

**Document hierarchy:**

| Document | Location | Purpose |
|----------|----------|---------|
| Brand Theme | `consultates/guidelines/brand-theme-v3.html` | Portable identity — colours, typography, icons, spacing, animation tokens |
| Website Design | `consultates/guidelines/website-design-v3.html` | Website patterns — hero, cards, btn-alive, CTA sections, nav, footer |
| Mission Control Design | `consultates/guidelines/mission-control-design-v3.html` | Dashboard patterns — density, responsive layout, sidebar, component touches |

All three live in the [`Consultates/consultates-brand-guidelines`](https://github.com/Consultates/consultates-brand-guidelines) repo. Clone it alongside this repo. Open in a browser to view — they have live demos and light/dark toggles.

The repo also contains:
- `consultates/logos/` — all logo variants (light/dark, horizontal/vertical, PNG/WebP/PSD)
- `consultates/icons/` — head mark / favicon at multiple sizes

## Key Components

| File | Purpose |
|---|---|
| `src/styles/global.css` | Design system CSS — Tailwind 4 `@theme`, btn-alive classes, CTA pulse classes |
| `src/components/islands/HeroIsland.tsx` | Letter stagger + CTA pulse — the visual benchmark |
| `src/components/islands/OfferingCardsIsland.tsx` | Sequential card animation — the pattern template |
| `src/components/islands/BlogCarouselIsland.tsx` | Film-strip blog card carousel — 5-card strip, zoom-out/wind/zoom-in animation, arrows, dots, auto-advance. Cards show image, category pill, title, date, excerpt, Read btn-alive |
| `src/components/islands/BlogIndexIsland.tsx` | Blog index wrapper — category filter pills + BlogCarouselIsland. Dispatches `blog-category-change` custom event to sync with server-rendered grid |
| `src/components/BlogCardNew.astro` | Blog card for server-rendered grids — equal-height flexbox, Read btn-alive bottom-right. Used in "All articles" grid |
| `src/components/islands/StaggerHeading.tsx` | Letter-stagger h2 for dark CTA sections. Words wrapped in nowrap spans to prevent mid-word breaks |
| `src/components/islands/StakesCTAPulse.tsx` | btn-alive--on-dark CTA component |
| `src/components/islands/HowItWorksIsland.tsx` | Animated timeline with connecting lines |
| `src/components/islands/UseCaseCardsIsland.tsx` | Use case cards with sequential reveal |
| `src/components/islands/AuthorityCardsIsland.tsx` | Authority/trust cards |
| `src/components/islands/CountUpStat.tsx` | Animated stat counter (uses MutationObserver for GSAP compat) |
| `src/components/islands/StrokeDrawStats.tsx` | SVG stroke-draw stat icons |
| `src/components/islands/SectionAnimator.tsx` | Section-level animation wrapper |
| `src/components/islands/AnimatedSection.tsx` | Generic animated section wrapper |
| `src/components/ThemeToggle.tsx` | Light/dark theme toggle |
| `src/layouts/Base.astro` | Base layout — includes GSAP scroll-snap script |
| `src/layouts/ServicePage.astro` | Shared layout for service pages |
| `src/lib/animations.ts` | Shared Framer Motion variants |

## Scroll Animation — "Film Strip on a Spool"

The homepage scroll-snap system simulates a continuous film strip on a roller:

1. **Zoom out** — pull back from the current frame (scale down + fade)
2. **Wind** — the strip winds up or down on the spool to the next frame (direction matches scroll)
3. **Zoom in** — push into the new frame, landing on it (scale up to full)

One continuous physical motion — pull back, wind, push in — not a cut or a snap. Feels like turning a viewfinder. The snap `duration` controls how quickly the full sequence completes after scroll release. Too fast = roller skips. Too slow = feels stuck.

**Do not touch the GSAP scroll-snap mechanics** unless explicitly asked.

## Homepage Design

Follows **StoryBrand narrative framework**: empathy → problem → solution → proof → action.

## Integrations

- **Booking:** TidyCal (links + embedded) — `tidycal.com/garyctate/15-minute-meeting`
- **Contact form:** Google Apps Script → email + Google Sheet (wired up in later phase)
- **Analytics:** Google Analytics GA4 (added in later phase)

## Animation Sequencing Bug Warning

**Do not use intermediary boolean state (`titleDone`/`descDone`) for animation sequencing in React.** They persist across viewport re-entries and cause stale `onComplete()` calls. Instead: call `onComplete()` directly from the interval/timeout callback, and add a reset effect when the animation phase regresses to `'waiting'`. See `READMEFIRST.md` for full context.


## Navigation Structure

```
[Logo]  Home  Services▼  About  Blog  Contact  [Book CTA]
                └─ AI Coaching for Leaders
                └─ AI Training for Teams
                └─ Fractional Exec Support
```
