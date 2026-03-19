# READ THIS FIRST

If you're an AI agent picking up this project, start here. This document tells you where everything is and what to read before you touch anything.

## What This Project Is

Consultates.com — a marketing website for Gary Tate's AI consulting and fractional CAIO business. Astro 5, Tailwind CSS 4, React islands, GSAP scroll-snap. Live at consultates.com, deployed via GitHub Pages.

## Current State (March 2026)

Site is live and functional. All pages complete. Six blog posts with custom illustrations. v3.0 "Polish & Ship" milestone in progress — responsive audit, analytics, and SEO remaining.

## Documents to Read

Read these in order:

| Document | Location | What It Tells You |
|----------|----------|-------------------|
| **PRD.md** | Project root | Product requirements — what the site is, who it's for, what's built, what's remaining. The living requirements document. |
| **CLAUDE.md** | Project root | Build commands, tech stack, component index, design authority, animation rules, anti-patterns. Your working reference while coding. |
| **Website Design Doc** | `~/Development/consultates-brand-guidelines/consultates/guidelines/website-design-v3.html` | Single source of truth for design decisions. Open in a browser. Has live demos and GOSPEL sections for every finished component. |
| **Brand Theme** | `~/Development/consultates-brand-guidelines/consultates/guidelines/brand-theme-v3.html` | Colours, typography, icons, spacing, animation tokens. The portable identity. |
| **STATUS.md** | Project root | Page-by-page status tracker with completion history. |

## Project Management

| Document | Location | Purpose |
|----------|----------|---------|
| ROADMAP.md | `.planning/` | Phase breakdown with progress table |
| STATE.md | `.planning/` | GSD project state — current position, session continuity |
| REQUIREMENTS.md | `.planning/` | v3.0 requirements mapped to phases (being consolidated into PRD.md) |
| HANDOFF-v2.1.md | `.planning/` | Bridge document covering ad-hoc work done outside GSD |

## Key Rules

These exist because past mistakes proved they're necessary:

1. **Read the design doc before building anything.** It's the design authority, not the PRD.
2. **Don't improvise copy.** Gary directs all copy. Ask if it's not specified.
3. **Don't rebuild existing components.** Check the CLAUDE.md component table and design doc GOSPEL sections first.
4. **Don't touch GSAP scroll-snap** unless explicitly asked.
5. **No gradient buttons, no eyebrow labels, no glassmorphism, no generic fade-ups.** See the full anti-pattern list in CLAUDE.md and PRD.md.
6. **Never delete files.** Move to `_archive/` instead.
7. **Verify before claiming done.** Run the build. Check the browser.

## Repository Layout

```
├── READMEFIRST.md          ← You are here
├── PRD.md                  ← Living product requirements
├── CLAUDE.md               ← Agent working reference
├── AGENTS.md               ← Codex/other agent reference
├── STATUS.md               ← Page status tracker
├── .planning/              ← GSD project management
│   ├── STATE.md
│   ├── ROADMAP.md
│   ├── REQUIREMENTS.md
│   └── phases/
├── src/
│   ├── components/         ← Astro + React islands
│   ├── content/blog/       ← Markdown blog posts
│   ├── data/               ← Blog categories, social proof
│   ├── layouts/            ← Base, ServicePage
│   ├── pages/              ← All routes
│   ├── styles/global.css   ← Design system, btn-alive, prose
│   └── lib/animations.ts   ← Shared Framer Motion variants
├── public/images/          ← All image assets
├── pilot-audit/            ← Responsive audit screenshots + FIXES.md
└── _archive/               ← Old docs, screenshots, deprecated files
```
