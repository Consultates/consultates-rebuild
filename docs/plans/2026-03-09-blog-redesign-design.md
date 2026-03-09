# Blog Redesign — Design Doc

**Date:** 2026-03-09
**Status:** Approved
**Reference:** Maze blog card style (adapted to Consultates design system)

---

## Scope

Complete blog system overhaul:
1. New blog card component with featured image, category pill, title, date, excerpt, reading time
2. Extended content schema (image, category, tags)
3. Homepage blog highlights using film-strip carousel (SocialProofIsland animation)
4. Blog index page with category filtering
5. Blog post template typography improvements
6. Remove Transitional scroll-section (9) — blog highlights live below Get Started CTA in normal page flow

---

## 1. Content Schema

Extend `src/content/config.ts` frontmatter:

```
title       (string, required)
date        (date, required)
author      (string, default: "Gary Tate")
excerpt     (string, max 200 chars, optional)
draft       (boolean, default: false)
image       (string, optional) — "/images/blog/post-slug.webp"
category    (enum, required) — one of the defined categories
tags        (string[], optional) — freeform tags
```

### Categories

Each category has a Phosphor duotone icon (for pills/filters):

| Category | Icon | Slug |
|----------|------|------|
| Getting Started | ph-rocket-launch | getting-started |
| AI Safety | ph-shield-check | ai-safety |
| Strategy | ph-compass | strategy |
| Tools & Tactics | ph-wrench | tools-tactics |

Categories are defined in a shared config file (`src/data/blog-categories.ts`) so cards, filters, and index all reference the same source.

### Existing Posts — Category Assignment

| Post | Category |
|------|----------|
| You're Not the Only One Stuck | Getting Started |
| How Safe Is AI Really? | AI Safety |
| The misconception that Generative AI is complex | Getting Started |

All 3 posts get placeholder featured images until real images are provided.

---

## 2. Blog Card Component

**Reference:** Maze blog cards (adapted to Consultates design system).

### Card Layout (top to bottom)

1. **Featured image** — large, rounded top corners (border-radius matches card), aspect-ratio 16:9, object-cover. Placeholder image (purple/cream gradient with Consultates mark) when no image provided.
2. **Category pill** — below image, small bordered pill with category icon (Phosphor duotone, small) + category label. Same pill style as testimonial role pills: `color-mix(in srgb, var(--primary) 12%, transparent)` background, `var(--primary)` text, rounded-full, xs text, uppercase tracking-wider.
3. **Title** — font-serif, `text-sub` size, `text-card-foreground`, 2-line clamp.
4. **Date + reading time** — font-mono, `text-cite` size, muted. Format: "29 Apr 2025 · 3 min read"
5. **Excerpt** — `text-body`, muted, 3-line clamp. Hidden on homepage carousel (space constraint).
6. **Read link** — "Read →" in primary colour, medium weight. Uses btn-alive underline-draw on hover (consistent with site CTA pattern).

### Card Styling (Consultates design system)

- `bg-card` background
- `border: 1px solid var(--border)`
- `border-radius: var(--card-radius)` (16px)
- NO accent top border (unlike service cards — the image takes that visual role)
- Hover: `translateY(-4px)` + `var(--card-shadow-hover)` + `border-color: var(--primary)`
- Transition: 0.2s ease

### Card Variants

- **Full card** (blog index) — image + pill + title + date/time + excerpt + read link
- **Compact card** (homepage carousel, related posts) — image + pill + title + read link (no excerpt, no date)

---

## 3. Homepage Blog Highlights

### Placement

Below the Get Started CTA section (current section 8), in normal page flow (NOT a scroll-section). Before the footer.

The current Transitional scroll-section (section 9 in index.astro) is removed from the scroll-snap system.

### Layout

- Cream background (`bg-secondary`)
- Heading: "Not ready to book? Start here." (keep existing copy) — `text-section` size, serif
- **Film-strip carousel** displaying 3 latest/featured blog cards (compact variant)

### Animation

Reuses the SocialProofIsland film-strip animation exactly:
- 3-phase: zoom-out (scale 0.85, 0.3s) → wind (x shift, 0.45s) → zoom-in (scale 1, 0.3s)
- Easing: [0.25, 0.1, 0.25, 1]
- Two cards rendered side-by-side in 200% width flex container, viewport clips to one
- Auto-advance: 8000ms
- Pause on hover
- Nav dots + arrows (desktop arrows on sides, mobile arrows flanking dots)
- Touch swipe support (50px threshold)
- Reduced motion: static card + dots only

### Component

New `BlogCarouselIsland.tsx` — follows the same architecture as SocialProofIsland but renders blog cards instead of QuoteCards. Uses the same `useAnimation()` from Framer Motion, same strip mechanic, same nav dots component.

**Data source:** Fetches 3 latest non-draft posts (or manually curated featured posts via a `featured: true` frontmatter field — future enhancement). For now, shows all 3 existing posts.

---

## 4. Blog Index Page

### Structure

1. **Dark hero** — same `.svc-hero` pattern as service pages. bg-dots + purple glow. Title: "Blog", subtitle: "Articles on AI adoption, safety, and practical guidance for business leaders."
2. **Category filter row** — horizontal row of pill buttons below hero. "All" (default, active) + one per category. Active pill: filled primary bg. Inactive: bordered, muted.
3. **Card grid** — 3 columns desktop, 2 columns tablet, 1 column mobile. Uses full card variant.
4. **Scroll reveal** — `data-reveal` + IntersectionObserver (GOSPEL pattern), 150ms stagger.

### Filtering

Client-side filtering via category pills. No page reload. Cards fade out/in when category changes. "All" shows everything.

---

## 5. Blog Post Template

### Improvements

- **Featured image** at top — full-width within 720px container, rounded corners (var(--card-radius)), margin-bottom 2rem
- **Category pill + date + reading time** below image
- **Prose typography overhaul** in `global.css`:
  - Heading spacing: more breathing room above h2/h3
  - Link styling: primary colour, underline on hover (btn-alive aesthetic)
  - Blockquote: left border in primary colour, italic, slightly indented
  - Code blocks: bg-secondary background, mono font, rounded corners
  - List spacing: comfortable line-height and gap between items
- **Related posts** at bottom — "Keep reading" heading + 3 compact blog cards from same category (or latest if not enough in same category)

---

## 6. Files Changed

### New files
- `src/data/blog-categories.ts` — category definitions with icons
- `src/components/BlogCardNew.astro` — redesigned blog card (replaces BlogCard.astro)
- `src/components/islands/BlogCarouselIsland.tsx` — film-strip carousel for homepage
- `public/images/blog/placeholder.webp` — placeholder featured image

### Modified files
- `src/content/config.ts` — extended schema
- `src/content/blog/*.md` — add category, tags, image fields to existing posts
- `src/pages/index.astro` — remove scroll-section 9, add blog highlights section below scroll-snap
- `src/pages/blog/index.astro` — complete rewrite with hero + filters + new cards
- `src/pages/blog/[...slug].astro` — featured image, category pill, related posts
- `src/styles/global.css` — prose typography improvements
- `src/components/sections/TransitionalCTAsSection.astro` — archived to _archive/

### Archived
- `src/components/BlogCard.astro` → `_archive/BlogCard.astro`
- `src/components/sections/TransitionalCTAsSection.astro` → `_archive/TransitionalCTAsSection.astro`

---

## 7. What This Does NOT Cover

- Blog post content quality (Post 3 is thin — Gary decides when to rewrite)
- RSS feed
- Search
- Comments/engagement
- Newsletter signup
- SEO meta images (og:image) — future enhancement once real images exist
- CMS integration — stays as Markdown files

---

## Design Rules

- Blog cards follow GOSPEL card patterns (hover lift, border, radius) but use image instead of accent top border
- Homepage carousel follows GOSPEL film-strip animation exactly — same timing, same mechanic, same component architecture
- Blog index uses GOSPEL scroll reveal pattern
- Blog hero uses GOSPEL service page hero pattern
- Category pills use same style as testimonial role pills
- "Read →" link uses btn-alive underline-draw hover
- All existing GOSPEL patterns are reused, nothing rebuilt from scratch
