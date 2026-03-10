# Consultates.com Rebuild

## What This Is

A marketing site for Gary Tate's AI consulting business, replacing a bloated WebWave site with a clean static site built on Astro 5. The site follows the StoryBrand narrative framework — empathy → problem → solution → proof → action — to convert business leaders who need clarity on AI into booked calls.

## Core Value

Business leaders can quickly understand what Consultates offers and book a free call — the site removes friction between "I need help with AI" and "I'm talking to someone who can help."

## Current State

**v2.0 Visual Redesign shipped 2026-03-10.** Site live at consultates.com with SSL via GitHub Pages.

All pages rebuilt with full design system: cinematic silk video hero, design system type scale, texture overlays, animated timelines, film-strip carousels, editorial About page, unified service pages, blog index with category filtering. 137 files, ~13,500 lines added across 8 phases.

**Next milestone:** v3.0 Polish & Ship — footer redesign, homepage middle section polish, nav/form bug fixes, integrations (GA4, contact form backend).

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

### Validated (v2.0)

- ✓ Design system type scale, spacing, texture utilities, color tokens — Phase 10
- ✓ Cinematic hero with silk video, dot grid, radial glow, pill CTA — Phase 10
- ✓ Trust bar as standalone section, visible all devices — Phase 10
- ✓ Negative stakes with text-stroke stats and stroke-draw animation — Phase 11
- ✓ Offering cards with gradient icons, inset accent hover — Phase 11
- ✓ Use case cards with sequential animation — Phase 12
- ✓ Animated timeline How It Works (CSS transitions, no GSAP) — Phase 12
- ✓ Film-strip testimonial carousel (SocialProofIsland) — Phase 13
- ✓ Authority cards with stat callouts — Phase 13
- ✓ Stakes CTA with radial glow, corner marks — Phase 13
- ✓ About page with editorial timeline and founder message — Phase 14
- ✓ Three service pages with unified structure — Phase 15
- ✓ Contact page with card-style methods and styled form — Phase 16
- ✓ Blog index with category filtering and film-strip carousel — Phase 17
- ✓ Blog post template with featured images and prose typography — Phase 17
- ✓ Cross-page Home section dropdown navigation — Phase 16-17 era
- ✓ ScrollIndicator and TrustBar as fixed-position singletons — Phase 16-17 era
- ✓ data-reveal scroll pattern (replaces SectionAnimator) — Phase 14

### Active

See REQUIREMENTS.md for v3.0 scoped requirements (to be created via /gsd:new-milestone).

### Out of Scope

- Chat widget — not planned (not aligned with high-touch model)
- i18n / multilingual — not planned (English-only audience)
- E-commerce / payments — not planned
- User accounts / auth — not planned
- CMS / admin panel — Markdown + git is sufficient
- Copy/content rewrites — Gary directs all copy
- GSAP scroll-snap system changes — working, do not touch

## Context

- **Current site:** consultates.com — live on GitHub Pages with SSL, rebuilt from WebWave
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
| SectionAnimator deprecated | data-reveal + IntersectionObserver is simpler and avoids React hydration overhead | ✓ Applied — Phase 14 |
| Service pages import Base.astro directly | No shared ServicePage.astro layout — each page is independent | ✓ Applied — Phase 15 |
| ScrollIndicator/TrustBar as fixed singletons | Prevents mobile duplication bug, always visible regardless of scroll section | ✓ Applied — Phase 16 era |
| Film-strip carousel pattern reused | Same zoom-out→wind→zoom-in animation for both testimonials and blog | ✓ Applied — Phases 13+17 |
| Cross-page nav with URL params | `/?section=N` enables Home dropdown links from any page | ✓ Applied — Phase 16 era |

---
*Last updated: 2026-03-10 after v2.0 milestone*
