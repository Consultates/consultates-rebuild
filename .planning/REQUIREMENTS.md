# Requirements: Consultates.com Rebuild

**Defined:** 2026-03-10
**Core Value:** Business leaders can quickly understand what Consultates offers and book a free call

## v1 Requirements

Requirements for v3.0 Polish & Ship. Each maps to roadmap phases.

### Bug Fixes

- [x] **FIX-01**: Stakes (NegativeStakes) section added to Home nav dropdown `homeSections` array with correct index, label, description, and Phosphor icon
- [x] **FIX-02**: FormInput icon padding bug fixed — `iconPaddingClass` applied to the input element so text does not overlap icons

### Footer

- [x] **FOOT-01**: Footer redesigned to match site-wide design system quality (per Gary's direction — current footer is "slop")
- [x] **FOOT-02**: Footer renders consistently on all pages (homepage, service pages, about, contact, blog index, blog post, privacy, 404)

### Homepage Polish

- [x] **HP-01**: How It Works section polished to match the visual standard set by the hero section
- [x] **HP-02**: Why Consultates section completely redone — no longer a "soulless middle" section
- [x] **HP-03**: Get Started / StakesCTA section polished with design attention

### Integrations

- [x] **INT-01**: Contact form wired to Google Apps Script backend — submissions sent to email and logged to Google Sheet *(completed prior to v3.0 — already deployed)*
- [ ] **INT-02**: Google Analytics GA4 tag added and tracking page views *(moved to Phase 22)*

### Cleanup

- [x] **CLN-01**: Three dummy blog posts removed (strategy, tools-tactics, ai-safety categories added for grid threshold testing)

### Responsive Audit

- [ ] **RESP-01**: Homepage scroll-snap sections fit within viewport on MacBook Pro, iPad landscape, and Windows laptops without content overflow or overlap
- [ ] **RESP-02**: All pages render correctly across viewport sizes — no clipped, squashed, or overflowing content

### Analytics & Monitoring

- [ ] **ANL-01**: GA4 active on every page + additional monitoring tools (scope TBD)

### Discoverability (SEO / GEO / AEO)

- [ ] **DISC-01**: SEO — structured data (JSON-LD), meta tags, Core Web Vitals, semantic HTML
- [ ] **DISC-02**: GEO — content structured for AI model extraction and citation
- [ ] **DISC-03**: AEO — schema markup, entity definitions, machine-readable service descriptions

## Future Requirements

### Content & Marketing

- **CONT-01**: Blog post featured images (real images, not placeholders)
- **CONT-02**: OG image generation from brand template
- **CONT-03**: Cookie consent banner
- **CONT-04**: TidyCal embed on contact page (currently links only)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Chat widget | Not aligned with high-touch consulting model |
| i18n / multilingual | English-only audience |
| E-commerce / payments | No products sold online |
| User accounts / auth | No user-facing login needed |
| CMS / admin panel | Markdown + git is sufficient |
| Copy/content rewrites | Gary directs all copy |
| GSAP scroll-snap changes | Working system, do not touch |
| New page creation | All pages exist, this milestone is polish only |
| Blog category filtering UX overhaul | Current implementation works, defer unless Gary directs |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FIX-01 | Phase 18 | Complete |
| FIX-02 | Phase 18 | Complete |
| FOOT-01 | Phase 20 | Complete |
| FOOT-02 | Phase 20 | Complete |
| HP-01 | Phase 19 | Complete |
| HP-02 | Phase 19 | Complete |
| HP-03 | Phase 19 | Complete |
| INT-01 | Pre-v3.0 | Complete |
| INT-02 | Phase 22 | Pending |
| CLN-01 | Phase 18 | Complete |
| RESP-01 | Phase 21 | Pending |
| RESP-02 | Phase 21 | Pending |
| ANL-01 | Phase 22 | Pending |
| DISC-01 | Phase 23 | Pending |
| DISC-02 | Phase 23 | Pending |
| DISC-03 | Phase 23 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-03-13 — Phase 21-23 added, INT-01 marked complete (pre-existing), Phase 21 reworked to Responsive Audit*
