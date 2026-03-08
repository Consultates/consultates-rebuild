# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Consultates.com rebuild — a marketing site for Gary Tate's AI consulting business. Replacing a bloated WebWave site with a clean static site.

## PRD (Single Source of Truth)

**`PRD.md`** in this repo (symlinked from project directory) is the complete technical spec. It contains every route, every component, every color token, every animation value, all copy, and all technical decisions. **Read it before building anything.** All content, design tokens, layout CSS, animation configs, and dependency versions are in that document.

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

Color tokens, typography, and icon specs are defined in:
`~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/mission-control-brand-adaptation.md`

Key brand colors:
- Primary (light): `#5C3B9C` (Royal Purple) / (dark): `#8B6CC7` (Royal Purple Lifted)
- Background (light): `#FFFFFF` / (dark): `#0D1117`
- Theme: light default, system-aware, manual toggle

## Project Reference Files

All content, screenshots, and planning docs live in the project directory (NOT this repo):
`~/.openclaw/Mi6-IQ/projects/consultates-rebuild/`

- `content/` — extracted page content as Markdown
- `screenshots/` — current site screenshots for reference
- `html/` — raw HTML exports from current site
- `assets/` — logos, photos, blog images, StoryBrand template PDF
- `PHASES.md` — phased build plan
- `TECH-STACK.md` — tech stack decisions
- `SITE-MAP.md` — site structure
- `PROJECT-PLAN.md` — master project plan with all locked decisions
- `DESIGN-BRIEF.md` — StoryBrand framework, section flow, content mapping

## Gary Tate — Reference Material

Profile data, CVs, and personal brand content:
`~/.openclaw/Mi6-IQ/reference/gary-c-tate/`

- `gary-cv-fractionalfirst.jsx` — CV card (AI/GTM-focused framing)
- `gary-cv-strategic-commercial-leader.jsx` — CV card (cybersecurity/expansion-focused framing)
- `gary-cv-whaleboss-v3.jsx` — CV card (whaleboss variant)

These contain structured profile data: bio, key roles, personas, superpowers, skills, certifications, testimonials. Use as source material for site content.

## Brand Assets

- **Brand theme specs:** `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/`
  - `consultates-brand-theme-light.html` — light theme reference (colors, typography, icon examples)
  - `consultates-brand-theme-dark.html` — dark theme reference
  - `mission-control-brand-adaptation.md` — full color mapping, typography, icon system
- **Logos:** `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/Consultates Logos/`
- **Head mark / favicon:** `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/Consultates Icons /`

## Scroll Animation — "Film Strip on a Spool"

The homepage scroll-snap system simulates a continuous film strip on a roller:

1. **Zoom out** — pull back from the current frame (scale down + fade)
2. **Wind** — the strip winds up or down on the spool to the next frame (direction matches scroll)
3. **Zoom in** — push into the new frame, landing on it (scale up to full)

One continuous physical motion — pull back, wind, push in — not a cut or a snap. Feels like turning a viewfinder. The snap `duration` controls how quickly the full sequence completes after scroll release. Too fast = roller skips. Too slow = feels stuck.

## Homepage Design

Follows **StoryBrand narrative framework**: empathy → problem → solution → proof → action.
See `DESIGN-BRIEF.md` in the project directory for full section flow and content mapping.

## Integrations

- **Booking:** TidyCal (links + embedded) — `tidycal.com/garyctate/15-minute-meeting`
- **Contact form:** Google Apps Script → email + Google Sheet (wired up in later phase)
- **Analytics:** Google Analytics GA4 (added in later phase)

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
- Brand guidelines (source of truth): `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/consultates-brand-guidelines.html`

## Navigation Structure

```
[Logo]  Home  Services▼  About  Blog  Contact  [Book CTA]
                └─ AI Coaching for Leaders
                └─ AI Training for Teams
                └─ Fractional Exec Support
```
