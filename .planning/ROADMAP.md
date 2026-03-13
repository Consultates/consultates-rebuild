# Roadmap: Consultates.com Rebuild

## Milestones

- ✅ **v1.0 MVP** — Phases 1-9 (shipped 2026-03-05)
- ✅ **v2.0 Visual Redesign** — Phases 10-17 (shipped 2026-03-10)
- 🚧 **v3.0 Polish & Ship** — Phases 18-23 (in progress)

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

#### ✅ Phase 20: Footer — COMPLETE 2026-03-13
**Goal**: The footer matches the site-wide design system quality and renders consistently everywhere
**Depends on**: Phase 18 (clean baseline)
**Requirements**: FOOT-01, FOOT-02

Plans:
- [x] 20-01-PLAN.md — Footer redesign (layout, dot texture, animated underlines, social icons)

#### Phase 21: Responsive Audit & Viewport Fixes
**Goal**: Every page looks correct on real screens — MacBook, iPad landscape, Windows laptops, 4K displays, and mobile. No overlapping, squashed, or overflowing sections.
**Depends on**: Phase 20 (all visual work complete before auditing)
**Requirements**: RESP-01, RESP-02
**Success Criteria** (what must be TRUE):
  1. Homepage scroll-snap sections fit within viewport on MacBook Pro (1440×900), iPad landscape (1194×834), and standard Windows laptops (1366×768) without content overflow or overlap
  2. All pages render correctly across viewport sizes — no clipped content, no squashed sections
  3. Mobile viewports (375px, 390px) have no layout breaks
**Plans**: TBD

#### Phase 22: Analytics & Monitoring
**Goal**: Site traffic is tracked and monitored with GA4 and Gary's analytics stack
**Depends on**: Phase 21 (audit site before adding tracking)
**Requirements**: ANL-01
**Note**: INT-01 (contact form) already wired — Google Apps Script backend deployed and functional
**Success Criteria** (what must be TRUE):
  1. Google Analytics GA4 is active and recording page views on every page
  2. Additional monitoring tools configured (scope TBD during discussion)
**Plans**: TBD

#### Phase 23: SEO / GEO / AEO
**Goal**: The site is optimized for modern discoverability — search engines, generative AI models, and AI agents can find, extract, and recommend Consultates
**Depends on**: Phase 21 (responsive fixes), Phase 22 (analytics in place)
**Requirements**: DISC-01, DISC-02, DISC-03
**Success Criteria** (what must be TRUE):
  1. SEO: Structured data (JSON-LD), complete meta tags, Core Web Vitals passing, semantic HTML audit
  2. GEO: Content structured for AI model extraction — clear factual statements, authoritative sourcing, citable content blocks
  3. AEO: Schema markup for services, entity definitions, machine-readable service descriptions
**Plans**: TBD

## Progress

**Execution Order:** 18 → 19 → 20 → 21 → 22 → 23

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 18. Fixes & Cleanup | v3.0 | 1/1 | ✓ Complete | 2026-03-10 |
| 19. Homepage Polish | v3.0 | 3/3 | ✓ Complete | 2026-03-12 |
| 20. Footer | v3.0 | 1/1 | ✓ Complete | 2026-03-13 |
| 21. Responsive Audit & Viewport Fixes | v3.0 | 0/? | Not started | - |
| 22. Analytics & Monitoring | v3.0 | 0/? | Not started | - |
| 23. SEO / GEO / AEO | v3.0 | 0/? | Not started | - |
