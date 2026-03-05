# Consultates.com Rebuild

## What This Is

A marketing site for Gary Tate's AI consulting business, replacing a bloated WebWave site with a clean static site built on Astro 5. The site follows the StoryBrand narrative framework — empathy → problem → solution → proof → action — to convert business leaders who need clarity on AI into booked calls.

## Core Value

Business leaders can quickly understand what Consultates offers and book a free call — the site removes friction between "I need help with AI" and "I'm talking to someone who can help."

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] StoryBrand homepage with 12 narrative sections
- [ ] Three service pages (AI Coaching, AI Training, Fractional Exec)
- [ ] About page with Gary's story and credentials
- [ ] Blog with content collections (3 initial posts)
- [ ] Contact page with form (client-side Phase 1)
- [ ] Privacy policy page
- [ ] 404 page
- [ ] Light/dark/system theme with toggle
- [ ] Responsive design (desktop/tablet/mobile breakpoints)
- [ ] GSAP ScrollTrigger scroll-snap sections (desktop)
- [ ] Framer Motion component animations
- [ ] Reduced motion support
- [ ] Self-hosted IBM Plex fonts (Sans/Serif/Mono)
- [ ] Phosphor duotone icons
- [ ] Nav with services mega menu + mobile hamburger
- [ ] Footer (always dark)
- [ ] TidyCal booking links (external)
- [ ] GitHub Pages deployment with GitHub Actions
- [ ] SEO meta tags, sitemap, structured data

### Out of Scope

- Google Apps Script form backend — Phase 2
- Google Analytics — later phase
- Chat widget — not planned
- TidyCal embed — links only for now
- Blog post images — text-only initial posts
- Cookie consent banner — later phase
- i18n / multilingual — not planned
- OG image generation — use head mark as fallback

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
| Astro 5 + React islands | Static-first with selective hydration for animations | — Pending |
| Tailwind 4 CSS-first | Modern approach, no config file, `@theme` block | — Pending |
| GSAP + Framer Motion (decoupled) | GSAP for scroll behavior, FM for component entrance — each does what it's best at | — Pending |
| Self-hosted fonts | Performance, no external requests to Google Fonts | — Pending |
| Client-side form mock (Phase 1) | Ship fast, wire backend in Phase 2 | — Pending |
| GitHub Pages | Free, simple, Gary already uses GitHub | — Pending |

---
*Last updated: 2026-03-05 after initialization*
