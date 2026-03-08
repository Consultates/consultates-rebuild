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
- Phase 16: Contact page wiring (Google Apps Script → email + Google Sheet, TidyCal embed)
- Phase 17: Blog polish (typography, reading experience, related posts)

## PRD (Single Source of Truth)

**`PRD.md`** in this repo is the complete technical spec. It contains every route, every component, every color token, every animation value, all copy, and all technical decisions. **Read it before building anything.**

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

## Brand Design System

**Brand guidelines live in a separate repo:** [`Consultates/consultates-brand-guidelines`](https://github.com/Consultates/consultates-brand-guidelines) — single source of truth for all Consultates brand assets. Clone it alongside this repo. Do not copy brand files into this repo.

The repo contains:
- `consultates/guidelines/brand-guidelines.html` — combined light/dark reference with toggle, live btn-alive demos, animation previews, do/don't comparisons, all 14 anti-slop rules, color palette with live hex values. Open in a browser to view.
- `consultates/guidelines/brand-theme-light.html` / `brand-theme-dark.html` — historic standalone theme references (superseded by the combined file)
- `consultates/logos/` — all logo variants (light/dark, horizontal/vertical, PNG/WebP/PSD)
- `consultates/icons/` — head mark / favicon at multiple sizes
- `mission-control/brand-adaptation.md` — Mission Control dashboard brand adaptation

Key brand colors:
- Primary (light): `#5C3B9C` (Royal Purple) / (dark): `#8B6CC7` (Royal Purple Lifted)
- Background (light): `#FFFFFF` / (dark): `#0D1117`
- Theme: light default, system-aware, manual toggle

## Key Components

| File | Purpose |
|---|---|
| `src/styles/global.css` | Design system CSS — Tailwind 4 `@theme`, btn-alive classes, CTA pulse classes |
| `src/components/islands/HeroIsland.tsx` | Letter stagger + CTA pulse — the visual benchmark |
| `src/components/islands/OfferingCardsIsland.tsx` | Sequential card animation — the pattern template |
| `src/components/islands/StaggerHeading.tsx` | Letter-stagger h2 for dark CTA sections |
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

## Anti-Slop Design Rules (v2.0)

These rules are mandatory for any agent building components, pages, or sections. Violations produce generic AI-looking output that must be rebuilt.

### Buttons
- **btn-alive system only.** Underline-draw with clip-path taper + radial purple glow. No gradient fills. No pill shapes (border-radius: 9999px).
- **Variants:** `--lg` (hero), `--sm` (card CTA), `--on-dark` (dark sections — white text, purple accent underline).
- **No other button styles.** If a section needs a CTA, it uses btn-alive.

### Animation
- **No generic fade-up.** Every animation must be distinctive: letter stagger on headlines, typewriter on descriptions, sequential card reveals.
- **Sequential, not simultaneous.** Cards animate one at a time L→R. Content within each card reveals in order: label → title stagger → description typewriter → CTA pulse.
- **Reduced motion is first-class.** All animated components must have a `prefers-reduced-motion` fallback that shows complete content immediately.
- **No transform-on-hover** except the intentional magnetic hover in btn-alive.

### Dark CTA Sections
- **Mirror the hero.** Every dark CTA section uses `StaggerHeading` (letter-stagger h2) + `btn-alive--on-dark`. Not SectionAnimator fadeUp. Not pill buttons. Not gradient buttons.
- Component: `src/components/islands/StaggerHeading.tsx`

### Cards and Icons
- **Icon containers:** cream background (#F6F2EB / var(--secondary)) + purple border (var(--primary)). NOT gradient backgrounds.
- **Card radius:** 16px (--card-radius). Not oversized (20px+).
- **Card shadows:** rest state max blur 20px. Hover state can go to 32px with accent border.

### Labels
- **Mono labels for categorisation:** IBM Plex Mono, 11px, 500 weight, 0.08em letter-spacing, uppercase, Royal Purple. Used on use case cards and section identifiers.
- **No eyebrow labels.** Small + uppercase + letter-spacing text above headings is an AI slop pattern. The only exception is mono category labels on cards.

### Colors and Surfaces
- **Colors stay flat.** Use as distinct, intentional values — not blended into gradients.
- **No glassmorphism** / backdrop-filter outside the navigation bar.
- **No dramatic shadows** (blur > 20px) except card hover states.
- **Cream sections alternate with white.** Card sections use var(--secondary) background with gradient border separators.

### Copy
- **No decorative copy.** Don't write text that explains what the UI does ("Click here to explore our offerings", "Scroll down to learn more"). Every word must carry information.
- **No marketing cliches.** Plain language, grounded in facts. Gary directs copy — agents don't improvise it.

### Reference
- Anti-slop rules adapted from [Uncodixfy](https://github.com/cyxzdev/Uncodixfy) + project-specific decisions.
- Brand guidelines repo: [`Consultates/consultates-brand-guidelines`](https://github.com/Consultates/consultates-brand-guidelines)

## Navigation Structure

```
[Logo]  Home  Services▼  About  Blog  Contact  [Book CTA]
                └─ AI Coaching for Leaders
                └─ AI Training for Teams
                └─ Fractional Exec Support
```
