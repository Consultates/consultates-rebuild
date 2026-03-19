# Product Requirements Document — Consultates.com

**Last updated:** 2026-03-19
**Owner:** Gary Tate
**Status:** Live at consultates.com

## Product Overview

A marketing website for Consultates Limited, Gary Tate's AI consulting and fractional CAIO business based in Hong Kong. The site replaces a previous WebWave-built site with a clean, distinctive, high-performance static site.

**Core value proposition:** Business leaders can quickly understand what Consultates offers and book a free call. The site removes friction between "I need help with AI" and "I'm talking to someone who can help."

**Target audience:** Founders, senior leaders, and teams who know AI matters but aren't sure how to move forward. Not developers. Not AI researchers. Business people in a turbulent time who need a grounded, competent guide.

**Tone:** Grounded, competent, human. Not a SaaS landing page. Not corporate consultant voice. Gary's actual voice — conversational, direct, thinks out loud.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 5 |
| Styling | Tailwind CSS 4 (CSS-first config via `@theme`) |
| Interactive components | React islands + Framer Motion |
| Page-level animation | GSAP ScrollTrigger (scroll-snap) |
| Blog | Astro content collections (Markdown) |
| Icons | Phosphor (`@phosphor-icons/react` duotone, `@phosphor-icons/web`) |
| Fonts | IBM Plex Sans / Serif / Mono (self-hosted) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (deploy on push to `master`) |
| Domain | consultates.com (GoDaddy DNS, SSL via GitHub Pages) |

## Site Structure

### Pages

| Route | Page | Status |
|-------|------|--------|
| `/` | Homepage | Complete |
| `/services/ai-advisory-for-leaders` | AI Advisory service | Complete |
| `/services/ai-training-for-teams` | AI Training service | Complete |
| `/services/fractional-exec-support` | Fractional Executive service | Complete |
| `/about` | About / Founder story | Complete |
| `/blog` | Blog index | Complete |
| `/blog/[slug]` | Blog posts | Complete (6 posts) |
| `/contact` | Contact | Complete |
| `/privacy` | Privacy policy | Complete |

### Navigation

```
[Logo]  Home  Services▼  About  Blog  Contact  [Book CTA]  [Avatar]
                └─ AI Coaching for Leaders
                └─ AI Training for Teams
                └─ Fractional Exec Support
```

Home dropdown shows section navigation with Phosphor icons, works cross-page via `/?section=N` URL params.

## Content Requirements

### Blog

Six posts in two waves:

**2025 (evergreen foundations):**
- "You're Not the Only One Stuck" — getting started with AI
- "The misconception that Generative AI is complex" — the complexity myth
- "How Safe Is AI Really?" — AI safety for users

**2026 (agents-eating-the-world update):**
- "You're Still Stuck. But Now It's Different" — companion to Stuck
- "The misconception that AI agents are only for developers" — companion to Complexity
- "AI Agents Can Send Emails, Access Your Data, and Make Decisions. Are You Sure That's Safe?" — companion to Safety

All posts written in Gary's voice. No em dashes. No corporate consultant tone. Blog images in Saul Bass editorial illustration style using brand colours.

**Categories:** Getting Started, AI Safety, Strategy, Tools & Tactics

### Copy

Gary directs all copy. Agents do not improvise marketing language. If copy is not specified for a section, ask Gary.

## Integrations

| Integration | Status | Details |
|-------------|--------|---------|
| TidyCal booking | Complete | Links + embedded on contact page |
| Contact form | Complete | Google Apps Script → email + Google Sheet |
| Google Analytics GA4 | Not started | Phase 22 |

## Design Requirements

### Design Authority

The website design document is the single source of truth for all design decisions:
`~/Development/consultates-brand-guidelines/consultates/guidelines/website-design-v3.html`

**Three-document design system:**

| Document | Location | Purpose |
|----------|----------|---------|
| Brand Theme (`brand-theme-v3.html`) | consultates-brand-guidelines repo | Portable identity: colours, typography, icons, spacing, animation tokens |
| Website Design (`website-design-v3.html`) | consultates-brand-guidelines repo | Website patterns: hero, cards, btn-alive, CTA sections, nav, footer |
| Mission Control Design (`mission-control-design-v3.html`) | consultates-brand-guidelines repo | Dashboard patterns (future) |

### Brand Colours

| Token | Light | Dark |
|-------|-------|------|
| Primary | `#5C3B9C` (plum purple) | `#8B6CC7` |
| Background | `#FFFFFF` | `#0D1117` |
| Foreground | `#1A253F` (deep navy) | `#E2E0EC` |
| Secondary | `#F6F2EB` (warm cream) | `#1E2333` |
| Accent | `#D4C8E8` (soft lavender) | `#2A2540` |

### Design Anti-Patterns (Banned)

These exist because they were tried and made the site look AI-generated:

- Gradient buttons (use `btn-alive` system instead)
- Generic fade-up animations (use letter stagger, typewriter, sequential reveals)
- Eyebrow labels ("OUR SERVICES", "HOW IT WORKS") except mono category labels on cards
- Glassmorphism on anything except the nav bar
- Dramatic shadows (max 20px blur at rest, 32px on hover)
- Gradient icon containers (use cream bg + purple border)
- Decorative copy that explains what the UI does
- Transform-on-hover except btn-alive magnetic effect
- SectionAnimator component (deprecated, use `data-reveal` + IntersectionObserver)

### Animation Stack

- **GSAP ScrollTrigger** — page-level scroll-snap on homepage ("film strip on a spool"). Do not modify unless explicitly asked.
- **Framer Motion** — component animation in React islands (letter stagger, card reveals, carousel transitions)
- These are decoupled. No cross-library communication.

### Blog Image Style

Saul Bass editorial illustration. Solid filled shapes, hard edges, no outlines, no gradients. Brand colour palette. Generated via Gemini Nano Banana Pro with consistent style parameters.

## Remaining Requirements

### Phase 21: Responsive Audit (Partially Complete)

- [ ] Homepage scroll-snap sections fit within viewport on MacBook Pro (1440x900), iPad landscape (1194x834), and Windows laptops (1366x768)
- [ ] All pages render correctly across viewport sizes
- [ ] Mobile viewports (375px, 390px) have no layout breaks
- [ ] Use case cards: title beside icon (consistency with service page cards)
- [ ] How It Works: reduce excess whitespace below CTA
- [ ] Scroll-snap keyboard interaction: arrow keys respect animation state

### Phase 22: Analytics & Monitoring

- [ ] Google Analytics GA4 active and tracking page views on every page
- [ ] Additional monitoring tools (scope TBD)

### Phase 23: SEO / GEO / AEO

- [ ] SEO: structured data (JSON-LD), complete meta tags, Core Web Vitals, semantic HTML
- [ ] GEO: content structured for AI model extraction and citation
- [ ] AEO: schema markup, entity definitions, machine-readable service descriptions

### Future

- [ ] OG image generation from brand template
- [ ] Cookie consent banner

## Out of Scope

| Feature | Reason |
|---------|--------|
| Chat widget | Not aligned with high-touch consulting model |
| i18n / multilingual | English-only audience |
| E-commerce / payments | No products sold online |
| User accounts / auth | No user-facing login needed |
| CMS / admin panel | Markdown + git is sufficient |

---
*Previous PRD versions archived in `_archive/`*
