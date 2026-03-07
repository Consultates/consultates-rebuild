# Consultates.com Rebuild

## What This Is

A marketing site for Gary Tate's AI consulting business, replacing a bloated WebWave site with a clean static site built on Astro 5. The site follows the StoryBrand narrative framework — empathy → problem → solution → proof → action — to convert business leaders who need clarity on AI into booked calls.

## Core Value

Business leaders can quickly understand what Consultates offers and book a free call — the site removes friction between "I need help with AI" and "I'm talking to someone who can help."

## Current Milestone: v2.0 Visual Redesign

**Goal:** Apply the complete design system from marketing-design-guidelines.html across all pages — hero with background video, design system type scale, texture overlays, alternating layouts, authority cards, animated timeline, and section-specific CSS treatments that were designed but never built in v1.0.

**Target features:**
- Global CSS update: design system type scale, spacing vars, texture/ornament utilities, animation keyframes
- Hero section: background video (monochrome), dark overlay, dot grid, radial glow, type scale up, pill CTA
- Trust bar: standalone section below hero, visible on all devices, credential markers with dot separators
- Negative stakes: three stats with text-stroke treatment, radial glow, pull quote
- Offering section: design system cards with gradient icon containers, inset accent hover, serif titles
- Use cases: alternating two-column layout, corner marks, mono labels, three use cases
- How it works: animated timeline with GSAP, connecting line, sequential node fills
- Social proof: photo placeholder, quote size up
- Authority section: proper cards with stat callouts
- Stakes CTA: radial glow, corner marks, accent-highlighted em
- Transitional CTAs: three cards, section heading, serif titles
- About page: asymmetric hero, editorial timeline, family business card
- Service pages: individual layouts per service, structured outcomes, embedded testimonials
- Contact page: card-style contact methods, styled form inputs
- Blog: three-column index, improved post layout

## Requirements

### Validated (v1.0)

- ✓ Self-hosted IBM Plex fonts (Sans/Serif/Mono) — Phase 1
- ✓ Astro 5 + React + Tailwind 4 foundation — Phase 1
- ✓ StoryBrand homepage with 12 narrative sections — Phase 3
- ✓ Three service pages (AI Coaching, AI Training, Fractional Exec) — Phase 5
- ✓ About page with Gary's story and credentials — Phase 5
- ✓ Blog with content collections (3 initial posts) — Phase 6
- ✓ Contact page with form (client-side mock) — Phase 5
- ✓ Privacy policy page — Phase 5
- ✓ 404 page — Phase 5
- ✓ Light/dark/system theme with toggle — Phase 2
- ✓ Responsive design (desktop/tablet/mobile breakpoints) — Phase 7
- ✓ GSAP ScrollTrigger scroll-snap sections (desktop) — Phase 4
- ✓ Framer Motion component animations — Phase 4
- ✓ Reduced motion support — Phase 4
- ✓ Phosphor duotone icons — Phase 2
- ✓ Nav with services mega menu + mobile hamburger — Phase 2
- ✓ Footer (always dark) — Phase 2
- ✓ TidyCal booking links (external) — Phase 3
- ✓ GitHub Pages deployment with GitHub Actions — Phase 8
- ✓ SEO meta tags, sitemap, structured data — Phase 7
- ✓ GSAP crash guard + footer fixes — Phase 9
- ✓ CountUpStat MutationObserver for GSAP sections — Phase 9

### Active

See REQUIREMENTS.md for v2.0 scoped requirements.

### Out of Scope

- Google Apps Script form backend — future milestone
- Google Analytics — future milestone
- Chat widget — not planned
- TidyCal embed — links only for now
- Cookie consent banner — future milestone
- i18n / multilingual — not planned
- OG image generation — use head mark as fallback
- Copy/content rewrites — existing copy preserved as-is
- StoryBrand narrative structure changes — section order unchanged
- GSAP scroll-snap system changes — untouched
- New dependencies — everything achievable with existing stack

## Context

- **Current site:** consultates.com runs on WebWave — bloated, hard to maintain, doesn't reflect Gary's brand
- **Brand identity:** Royal Purple primary color, IBM Plex font family, Phosphor duotone icons
- **Gary Tate:** Three identities — engineer (20yr military + infrastructure), commercial leader (15yr SE→CRO), AI practitioner (ships production apps daily with AI agents)
- **Family business:** Gary and Trinh Tate. Scale through trust, not volume.
- **Design reference:** Brand theme specs in `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/`
- **Content source:** All copy locked in PRD.md — no content generation needed
- **Asset source:** Logos, icons, photos in `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/`
- **Blog content:** 3 posts in `~/.openclaw/Mi6-IQ/projects/consultates-rebuild/content/`

## Constraints

- **Framework:** Astro 5 with React islands — locked decision from PRD
- **Styling:** Tailwind CSS 4 with CSS-first config (`@theme` block, no tailwind.config.js) — use `@tailwindcss/vite` NOT `@astrojs/tailwind`
- **Animation:** GSAP ScrollTrigger (page-level, vanilla script) + Framer Motion (component-level, React islands) — decoupled, no cross-communication
- **Hosting:** GitHub Pages (static output only)
- **Package manager:** pnpm 9, Node.js 22
- **Theme:** Light default, system-aware, manual toggle
- **Content:** All copy comes from PRD.md — do not generate or modify marketing content

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro 5 + React islands | Static-first with selective hydration for animations | ✓ Working — Phase 1 |
| Tailwind 4 CSS-first | Modern approach, no config file, `@theme` block | ✓ Working — Phase 1 |
| GSAP + Framer Motion (decoupled) | GSAP for scroll behavior, FM for component entrance — each does what it's best at | — Pending |
| Self-hosted fonts | Performance, no external requests to Google Fonts | ✓ Working — Phase 1 (fontsource extraction) |
| Client-side form mock (Phase 1) | Ship fast, wire backend in Phase 2 | — Pending |
| GitHub Pages | Free, simple, Gary already uses GitHub | — Pending |
| Manual Astro scaffold | Avoid overwriting existing repo files (CLAUDE.md, PRD, .planning/) | ✓ Applied — Phase 1 |
| @layer utilities for type scale | Multi-property utilities cannot go in @theme block | ✓ Applied — Phase 1 |
| Card layout for use cases (not alternating 2-col) | User preference — cards better match offering section pattern | ✓ Applied — Phase 12 |
| Pure CSS transitions for timeline animation | No GSAP inside snap sections — avoids conflict with page-level scroll-snap | ✓ Applied — Phase 12 |

---
*Last updated: 2026-03-07 after Phase 12*
