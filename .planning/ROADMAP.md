# Roadmap: Consultates.com Rebuild

## Overview

Eight phases transform a bloated WebWave site into a clean, fast Astro 5 static site. Phases follow the natural build dependency order from the PRD: scaffold the foundation first, then shared components, then the homepage (the primary conversion page), then animation layered on top of static content, then inner pages, then the blog, then polish and SEO, then deploy. Each phase delivers a coherent, independently verifiable capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Scaffold** - Astro 5 project with Tailwind 4, fonts, design tokens, and base layout (completed 2026-03-05)
- [x] **Phase 2: Components** - All shared UI components, nav, footer, and theme system (completed 2026-03-05)
- [ ] **Phase 3: Homepage** - All 12 StoryBrand sections with full content, no animation
- [ ] **Phase 4: Animation** - GSAP ScrollTrigger and Framer Motion layered onto existing pages
- [ ] **Phase 5: Inner Pages** - Service pages x3, About, Contact, Privacy Policy, 404
- [ ] **Phase 6: Blog** - Content collections, blog index, blog post layout, 3 initial posts
- [ ] **Phase 7: Polish** - Responsive testing, accessibility, SEO meta tags, favicon
- [ ] **Phase 8: Deploy** - GitHub Actions CI/CD, GitHub Pages, CNAME, sitemap verification

## Phase Details

### Phase 1: Scaffold
**Goal**: A running Astro 5 site with all design system primitives in place — any page built after this inherits correct tokens, fonts, and theme behavior automatically
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, ASSET-01, ASSET-02, ASSET-03, ASSET-04
**Success Criteria** (what must be TRUE):
  1. `pnpm dev` starts without errors and serves a page at localhost
  2. Royal Purple and all brand color tokens render correctly in light and dark modes with no flash on load
  3. IBM Plex Sans, Serif, and Mono load from local files (no external requests) and all custom type scale classes apply correctly
  4. All static assets (logos, Gary photo, favicon, font files) are present in the correct public directories
**Plans:** 2/2 plans complete

Plans:
- [x] 01-01-PLAN.md — Initialize Astro 5 project with dependencies and copy all static assets
- [x] 01-02-PLAN.md — Create design system CSS (tokens, fonts, type scale) and base layout

### Phase 2: Components
**Goal**: The full component library exists and renders correctly — every page built after this pulls from tested, reusable building blocks
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, THEME-01, THEME-02, THEME-03, FOOT-01, FOOT-02, COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08, COMP-09
**Success Criteria** (what must be TRUE):
  1. Fixed nav bar renders with logo, links, and Book CTA button; services mega menu opens on hover (desktop) and tap (mobile)
  2. Mobile hamburger menu opens a full-screen overlay with all navigation links
  3. Theme toggle cycles light → dark → system → light, persists across page reloads, and logo swaps correctly in each mode
  4. Always-dark footer renders with 3-column grid, quick links, contact info, and bottom bar
  5. All 9 shared components (Button, ServiceCard, TestimonialBlock, StatBlock, StepCard, BlogCard, FormInput, IconWrapper, ScrollIndicator) render without errors in all their variants
**Plans:** 3/3 plans complete

Plans:
- [ ] 02-01-PLAN.md — Foundational components: ThemeToggle, Button, IconWrapper
- [ ] 02-02-PLAN.md — Shared display components: ServiceCard, BlogCard, StepCard, StatBlock, TestimonialBlock, FormInput, ScrollIndicator
- [ ] 02-03-PLAN.md — Navigation bar with mega menu + Footer + wire into Base.astro

### Phase 3: Homepage
**Goal**: The complete StoryBrand homepage is live with all 12 sections, full PRD copy, and correct layout — visitors can read the full narrative and book a call
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-09, HOME-10
**Success Criteria** (what must be TRUE):
  1. All 12 homepage sections render with exact PRD copy — hero, trust bar, negative stakes, offering, use cases, how it works, social proof, why Consultates, stakes CTA, and transitional CTAs
  2. Three service cards in the Offering section each link to their respective service pages
  3. Two blog cards in Transitional CTAs section link to blog posts
  4. Book a call CTA buttons link to the correct TidyCal URL
  5. Homepage reads as a coherent narrative from hero to final CTA with no missing sections or placeholder text
**Plans:** 3 plans

Plans:
- [ ] 03-01-PLAN.md — Site config + Hero, Trust Bar, Negative Stakes, Offering, and Use Cases sections
- [ ] 03-02-PLAN.md — How It Works, Social Proof, Why Consultates, Stakes CTA, and Transitional CTAs sections
- [ ] 03-03-PLAN.md — Wire all sections into index.astro and verify build

### Phase 4: Animation
**Goal**: The site feels alive — scroll behavior, entrance animations, and micro-interactions layer onto the existing static content without breaking it
**Depends on**: Phase 3
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06, ANIM-07, ANIM-08
**Success Criteria** (what must be TRUE):
  1. On desktop (≥1024px), scrolling through the homepage snaps section-by-section with zoom transitions; on tablet/mobile sections stack at natural height with no snap behavior
  2. Hero headline animates with letter stagger on page load, followed by paragraph fade up, CTA scale in, and scroll indicator bob
  3. The 84% stat counts up from 0 when the negative stakes section enters the viewport
  4. Stakes CTA section pulse animation runs continuously
  5. Visiting with `prefers-reduced-motion: reduce` shows all content immediately with no animations running
**Plans**: TBD

Plans: TBD

### Phase 5: Inner Pages
**Goal**: Every non-homepage page is built and navigable — visitors can explore all three services, read about Gary, submit a contact form, and find the legal page
**Depends on**: Phase 2
**Requirements**: SERV-01, SERV-02, SERV-03, ABOUT-01, CONT-01, CONT-02, CONT-03, LEGAL-01, ERR-01
**Success Criteria** (what must be TRUE):
  1. All three service pages (AI Coaching, AI Training, Fractional Exec) render with hero, what you get, who it's for, how it works, and CTA sections using PRD copy
  2. About page shows Gary's photo, story, family business section, Lead with AI PRO credentials, and a book-a-call CTA
  3. Contact page form accepts name, email, company, and message; submitting shows a success message (client-side mock)
  4. Privacy policy page renders with full legal content from PRD
  5. Navigating to a nonexistent URL renders the 404 page with a back-to-home button
**Plans**: TBD

Plans: TBD

### Phase 6: Blog
**Goal**: The blog is live with content collections, a browsable index, readable post pages, and 3 real posts — visitors can find and read Gary's writing
**Depends on**: Phase 2
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04
**Success Criteria** (what must be TRUE):
  1. Blog index page shows all published posts as cards in a 2-column grid (desktop) / 1-column (mobile) with title, date, and excerpt
  2. Each blog post page renders with readable prose styling, publication date, and estimated reading time
  3. All 3 initial posts are published and accessible via the blog index
  4. Draft posts do not appear on the public blog index
**Plans**: TBD

Plans: TBD

### Phase 7: Polish
**Goal**: The site is production-ready — every page is responsive, accessible, indexed by search engines, and branded with the correct favicon
**Depends on**: Phase 5, Phase 6
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, DEPLOY-03
**Success Criteria** (what must be TRUE):
  1. Every page has a unique title tag and meta description matching the PRD route table
  2. Every page has a canonical URL tag
  3. Sitemap XML is auto-generated and includes all public routes
  4. robots.txt allows all crawlers and references the sitemap
  5. Consultates favicon appears in browser tabs and bookmarks across all pages
**Plans**: TBD

Plans: TBD

### Phase 8: Deploy
**Goal**: The live site is deployed to consultates.com via GitHub Pages with automated CI/CD — every push to main triggers a fresh build and deploy
**Depends on**: Phase 7
**Requirements**: DEPLOY-01, DEPLOY-02
**Success Criteria** (what must be TRUE):
  1. Pushing to the main branch automatically triggers a GitHub Actions workflow that builds and deploys the site
  2. consultates.com resolves to the deployed Astro site with a valid SSL certificate
  3. The build passes in CI with no errors (Node 22, pnpm 9, static output)
**Plans**: TBD

Plans: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

Note: Phase 5 depends on Phase 2 (not Phase 4), so Phases 4 and 5 can execute concurrently after Phase 3 if needed. Phase 7 depends on both Phase 5 and Phase 6.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Scaffold | 2/2 | Complete   | 2026-03-05 |
| 2. Components | 3/3 | Complete   | 2026-03-05 |
| 3. Homepage | 0/3 | Planned | - |
| 4. Animation | 0/? | Not started | - |
| 5. Inner Pages | 0/? | Not started | - |
| 6. Blog | 0/? | Not started | - |
| 7. Polish | 0/? | Not started | - |
| 8. Deploy | 0/? | Not started | - |
