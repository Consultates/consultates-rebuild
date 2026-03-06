# Roadmap: Consultates.com Rebuild

## Milestones

- v1.0 MVP - Phases 1-9 (shipped 2026-03-05)
- v2.0 Visual Redesign - Phases 10-17 (in progress)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

<details>
<summary>v1.0 MVP (Phases 1-9) - SHIPPED 2026-03-05</summary>

- [x] **Phase 1: Scaffold** - Astro 5 project with Tailwind 4, fonts, design tokens, and base layout (completed 2026-03-05)
- [x] **Phase 2: Components** - All shared UI components, nav, footer, and theme system (completed 2026-03-05)
- [x] **Phase 3: Homepage** - All 12 StoryBrand sections with full content, no animation (completed 2026-03-05)
- [x] **Phase 4: Animation** - GSAP ScrollTrigger and Framer Motion layered onto existing pages (completed 2026-03-05)
- [x] **Phase 5: Inner Pages** - Service pages x3, About, Contact, Privacy Policy, 404 (completed 2026-03-05)
- [x] **Phase 6: Blog** - Content collections, blog index, blog post layout, 3 initial posts (completed 2026-03-05)
- [x] **Phase 7: Polish** - Responsive testing, accessibility, SEO meta tags, favicon (completed 2026-03-05)
- [x] **Phase 8: Deploy** - GitHub Actions CI/CD, GitHub Pages, CNAME, sitemap verification (completed 2026-03-05)
- [x] **Phase 9: Fix Audit** - GSAP crash guard, footer fixes, CountUpStat MutationObserver (completed 2026-03-05)

</details>

### v2.0 Visual Redesign

- [ ] **Phase 10: Foundation + Hero + Trust Bar** - Design system globals, hero with background video and dark overlay, trust bar redesign
- [ ] **Phase 11: Negative Stakes + Offering** - Three-stat layout with text-stroke, design system cards with gradient icons
- [ ] **Phase 12: Use Cases + How It Works** - Alternating two-column layout, animated GSAP timeline
- [ ] **Phase 13: Social Proof + Authority + Stakes CTA + Transitional CTAs** - Quote redesign, authority cards, radial glow CTA, three-card transitional section
- [ ] **Phase 14: About Page** - Asymmetric hero, editorial timeline, family business card
- [ ] **Phase 15: Service Pages** - Individual layouts, structured outcomes, embedded testimonials
- [ ] **Phase 16: Contact Page** - Card-style contact methods, styled form inputs
- [ ] **Phase 17: Blog** - Three-column card grid, design system cards, improved post layout

## Phase Details

### Phase 10: Foundation + Hero + Trust Bar
**Goal**: The global design system is in place and the first two visible sections (hero + trust bar) match the marketing-design-guidelines.html spec -- visitors see a cinematic dark hero with video background, purple glow, pill CTA, and a clean credential bar below it
**Depends on**: Phase 9
**Requirements**: RDES-01, RDES-02, RDES-03, RDES-04, RDES-05, RDES-06, RDES-07, RDES-08, RDES-09, RDES-10, RDES-11, RDES-12, RDES-13, RDES-14, RDES-15, RDES-16
**Success Criteria** (what must be TRUE):
  1. Design system type scale, spacing variables, texture utilities (.bg-dots, .glow, .corner-marks), animation keyframes, and color tokens are defined in global CSS and available to all components
  2. Hero section plays a monochrome background video on desktop with dark overlay, dot grid, and radial purple glow behind the headline; on mobile a poster image displays instead
  3. Hero headline renders at design system size with white text, accent purple `<em>`, pill-shaped CTA with arrow hover, and muted body text capped at 580px
  4. Trust bar renders as a standalone section below the hero on all viewports with credential markers, dot separators, correct typography (13px, 500 weight, muted color)
  5. Playwright screenshots at desktop (1920x1080), tablet (768x1024), and mobile (390x844) confirm visual fidelity
**Plans**: 2 plans

Plans:
- [ ] 10-01-PLAN.md -- Design system foundation CSS + trust bar standalone section
- [ ] 10-02-PLAN.md -- Hero redesign with dark bg, video, glow, pill CTA + visual verification

### Phase 11: Negative Stakes + Offering
**Goal**: The problem/solution narrative pair is visually complete -- visitors see dramatic stat numbers that communicate urgency, followed by three polished service cards that present the solution
**Depends on**: Phase 10
**Requirements**: RDES-17, RDES-18, RDES-19, RDES-20, RDES-21, RDES-22, RDES-23, RDES-24
**Success Criteria** (what must be TRUE):
  1. Negative stakes section displays three stats in a three-column grid with text-stroke treatment on numbers, a radial glow centered on the section, and a pull quote below
  2. Offering section shows three service cards with 16px radius, gradient icon containers, serif titles, inset accent hover effect, and 1.25rem gap
  3. Offering cards stagger-reveal on scroll entrance (0s, 0.12s, 0.24s delays)
  4. Playwright screenshots at desktop (1920x1080), tablet (768x1024), and mobile (390x844) confirm visual fidelity
**Plans**: TBD

Plans:
- [ ] 11-01: TBD

### Phase 12: Use Cases + How It Works
**Goal**: Visitors see concrete scenarios of who Consultates helps (alternating layout with images) and a clear visual timeline of how the engagement works
**Depends on**: Phase 11
**Requirements**: RDES-25, RDES-26, RDES-27, RDES-28, RDES-29, RDES-30, RDES-31, RDES-32, RDES-33
**Success Criteria** (what must be TRUE):
  1. Use cases section shows three use cases in alternating two-column layout with mono uppercase labels, image placeholders with corner marks, and slide-in entrance animations
  2. How it works section renders an animated GSAP timeline with a connecting line that draws on scroll, step nodes that fill sequentially (48px circles with pulse), and content that reveals per node
  3. How it works layout is horizontal on desktop and vertical on mobile
  4. With `prefers-reduced-motion: reduce`, timeline and slide-in animations are disabled and all content is immediately visible
  5. Playwright screenshots at desktop (1920x1080), tablet (768x1024), and mobile (390x844) confirm visual fidelity
**Plans**: TBD

Plans:
- [ ] 12-01: TBD
- [ ] 12-02: TBD

### Phase 13: Social Proof + Authority + Stakes CTA + Transitional CTAs
**Goal**: The bottom half of the homepage is visually complete -- testimonial, authority credentials, urgent CTA, and content bridge cards all match the design system
**Depends on**: Phase 12
**Requirements**: RDES-34, RDES-35, RDES-36, RDES-37, RDES-38, RDES-39, RDES-40, RDES-41, RDES-42, RDES-43, RDES-44, RDES-45
**Success Criteria** (what must be TRUE):
  1. Social proof section shows a 72x72px photo placeholder circle with initials and quote text at the design system enlarged size
  2. Authority section renders cards with border, radius, padding, hover accent, stat callouts in serif purple, and staggered reveal animation
  3. Stakes CTA section displays radial purple glow, corner marks, accent-highlighted `<em>`, and a pill button matching the hero CTA
  4. Transitional CTAs section shows three cards filling the row with section heading "Not ready to book? Start here.", serif titles, and hover accent border
  5. Playwright screenshots at desktop (1920x1080), tablet (768x1024), and mobile (390x844) confirm visual fidelity
**Plans**: TBD

Plans:
- [ ] 13-01: TBD
- [ ] 13-02: TBD

### Phase 14: About Page
**Goal**: The about page tells Gary's story with editorial polish -- asymmetric layout, timeline, warm family business card, and credentials
**Depends on**: Phase 10
**Requirements**: RDES-46, RDES-47, RDES-48, RDES-49, RDES-50
**Success Criteria** (what must be TRUE):
  1. About page opens with an asymmetric two-column hero layout
  2. Career history renders as an editorial timeline
  3. Family business section uses a warm-background card treatment
  4. Lead with AI PRO section renders as a distinct card/banner
  5. Playwright screenshots at desktop (1920x1080), tablet (768x1024), and mobile (390x844) confirm visual fidelity
**Plans**: TBD

Plans:
- [ ] 14-01: TBD

### Phase 15: Service Pages
**Goal**: Each of the three service pages has its own distinct layout with structured outcomes, embedded testimonials, and a connecting-line how-it-works section
**Depends on**: Phase 10
**Requirements**: RDES-51, RDES-52, RDES-53, RDES-54, RDES-55, RDES-56
**Success Criteria** (what must be TRUE):
  1. Each service page (AI Coaching, AI Training, Fractional Exec) has an individual layout distinct from the others
  2. "What you get" sections render as structured outcomes grids/lists
  3. Each service page includes a scenario-based "who it's for" section, an embedded testimonial, a how-it-works with connecting line, and a dark CTA section
  4. Playwright screenshots at desktop (1920x1080), tablet (768x1024), and mobile (390x844) confirm visual fidelity
**Plans**: TBD

Plans:
- [ ] 15-01: TBD

### Phase 16: Contact Page
**Goal**: The contact page presents professional card-style contact methods with styled form inputs matching the design system
**Depends on**: Phase 10
**Requirements**: RDES-57, RDES-58, RDES-59
**Success Criteria** (what must be TRUE):
  1. Contact methods (email, LinkedIn, booking) render as card-style items
  2. TidyCal booking has a pill button CTA matching the site-wide pill button style
  3. Form inputs follow design system styling (radius, border, focus states)
  4. Playwright screenshots at desktop (1920x1080), tablet (768x1024), and mobile (390x844) confirm visual fidelity
**Plans**: TBD

Plans:
- [ ] 16-01: TBD

### Phase 17: Blog
**Goal**: Blog index and post pages match the design system with a three-column card grid and improved typography
**Depends on**: Phase 10
**Requirements**: RDES-60, RDES-61, RDES-62, RDES-63
**Success Criteria** (what must be TRUE):
  1. Blog index displays posts in a three-column card grid with design system cards (16px radius, hover accent border)
  2. Card titles render in serif
  3. Blog post layout uses a wider content column with mono date and serif title
  4. Playwright screenshots at desktop (1920x1080), tablet (768x1024), and mobile (390x844) confirm visual fidelity
**Plans**: TBD

Plans:
- [ ] 17-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> 16 -> 17

Note: Phases 14, 15, 16, and 17 depend only on Phase 10 (foundation), so they can execute concurrently after Phase 13 completes. Homepage phases (10-13) are sequential because each builds on the previous section.

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Scaffold | v1.0 | 2/2 | Complete | 2026-03-05 |
| 2. Components | v1.0 | 3/3 | Complete | 2026-03-05 |
| 3. Homepage | v1.0 | 3/3 | Complete | 2026-03-05 |
| 4. Animation | v1.0 | 3/3 | Complete | 2026-03-05 |
| 5. Inner Pages | v1.0 | 3/3 | Complete | 2026-03-05 |
| 6. Blog | v1.0 | 2/2 | Complete | 2026-03-05 |
| 7. Polish | v1.0 | 1/1 | Complete | 2026-03-05 |
| 8. Deploy | v1.0 | 1/1 | Complete | 2026-03-05 |
| 9. Fix Audit | v1.0 | 2/2 | Complete | 2026-03-05 |
| 10. Foundation + Hero + Trust Bar | v2.0 | 0/2 | Not started | - |
| 11. Negative Stakes + Offering | v2.0 | 0/? | Not started | - |
| 12. Use Cases + How It Works | v2.0 | 0/? | Not started | - |
| 13. Social Proof + Authority + Stakes CTA + Transitional CTAs | v2.0 | 0/? | Not started | - |
| 14. About Page | v2.0 | 0/? | Not started | - |
| 15. Service Pages | v2.0 | 0/? | Not started | - |
| 16. Contact Page | v2.0 | 0/? | Not started | - |
| 17. Blog | v2.0 | 0/? | Not started | - |
