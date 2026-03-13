# Roadmap: Consultates.com Rebuild

## Milestones

- ✅ **v1.0 MVP** — Phases 1-9 (shipped 2026-03-05)
- ✅ **v2.0 Visual Redesign** — Phases 10-17 (shipped 2026-03-10)
- 🚧 **v3.0 Polish & Ship** — Phases 18-21 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-9) — SHIPPED 2026-03-05</summary>

Phase 1: Foundation — Astro 5 scaffold, Tailwind 4, self-hosted fonts
Phase 2: Shell — Nav, footer, theme toggle, icons
Phase 3: Homepage — 12 StoryBrand narrative sections
Phase 4: Animations — GSAP scroll-snap, Framer Motion components
Phase 5: Pages — Service pages, About, Contact, Privacy, 404
Phase 6: Blog — Content collections, 3 posts, post template
Phase 7: Responsive & SEO — Breakpoints, meta tags, sitemap
Phase 8: Deploy — GitHub Pages, GitHub Actions CI/CD
Phase 9: Hotfixes — GSAP crash guard, CountUpStat MutationObserver

</details>

<details>
<summary>✅ v2.0 Visual Redesign (Phases 10-17) — SHIPPED 2026-03-10</summary>

Phase 10: Design System & Hero — Type scale, tokens, cinematic hero, trust bar
Phase 11: Stakes & Offerings — Negative stakes section, offering cards redesign
Phase 12: Use Cases & Timeline — Use case cards, animated How It Works
Phase 13: Social Proof & CTA — Testimonial carousel, authority cards, Stakes CTA
Phase 14: About Page — Editorial timeline, founder message, data-reveal pattern
Phase 15: Service Pages — Unified structure across all 3 service pages
Phase 16: Contact Page — Card-style methods, styled form, cross-page nav
Phase 17: Blog — Blog index redesign, category filtering, carousel, post template

</details>

### 🚧 v3.0 Polish & Ship (In Progress)

**Milestone Goal:** Bring every page to the visual standard set by the hero — fix bugs, polish the homepage middle sections, redesign the footer, and wire up integrations so the site is fully operational.

#### ✅ Phase 18: Fixes & Cleanup — COMPLETE 2026-03-10
**Goal**: Eliminate known bugs and remove test content so the live site has no visible defects
**Requirements**: FIX-01, FIX-02, CLN-01

Plans:
- [x] 18-01-PLAN.md — Bug fixes (Stakes nav, FormInput padding) and dummy blog post cleanup

#### ✅ Phase 19: Homepage Polish — COMPLETE 2026-03-12
**Goal**: The homepage middle sections match the visual quality of the hero and stakes sections — no more "soulless" white/cream gaps
**Depends on**: Phase 18 (clean baseline)
**Requirements**: HP-01, HP-02, HP-03

Plans:
- [x] 19-01: How It Works section polish
- [x] 19-02: Why Consultates section redo
- [x] 19-03: Get Started / StakesCTA polish

#### Phase 20: Footer
**Goal**: The footer matches the site-wide design system quality and renders consistently everywhere
**Depends on**: Phase 18 (clean baseline)
**Requirements**: FOOT-01, FOOT-02
**Success Criteria** (what must be TRUE):
  1. Footer design matches the visual standard of the rest of the site — no longer looks like "slop"
  2. Footer renders identically on all pages: homepage, 3 service pages, about, contact, blog index, blog posts, privacy policy, and 404
  3. Footer works correctly in both light and dark modes and on mobile viewports
**Plans**: 1 plan

Plans:
- [ ] 20-01-PLAN.md — Footer redesign (layout, dot texture, animated underlines, social icons)

#### Phase 21: Integrations
**Goal**: The site is fully operational — form submissions reach Gary, and traffic is being tracked
**Depends on**: Phase 18 (FIX-02 ensures form inputs work before wiring backend)
**Requirements**: INT-01, INT-02
**Success Criteria** (what must be TRUE):
  1. Submitting the contact form sends an email to gary@consultates.com with all form field values
  2. Submitting the contact form logs a row to a Google Sheet with submission timestamp and all fields
  3. User sees a success confirmation after form submission (not a blank page or error)
  4. Google Analytics GA4 is active and recording page views on every page of the site
**Plans**: TBD

Plans:
- [ ] 21-01: Contact form Google Apps Script backend
- [ ] 21-02: Google Analytics GA4

## Progress

**Execution Order:** 18 → 19 → 20 → 21 (19 and 20 can run in parallel after 18)

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 18. Fixes & Cleanup | v3.0 | 1/1 | ✓ Complete | 2026-03-10 |
| 19. Homepage Polish | v3.0 | 3/3 | ✓ Complete | 2026-03-12 |
| 20. Footer | v3.0 | 0/1 | Not started | - |
| 21. Integrations | v3.0 | 0/2 | Not started | - |
