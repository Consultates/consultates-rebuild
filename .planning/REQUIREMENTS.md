# Requirements: Consultates.com Rebuild

**Defined:** 2026-03-10
**Core Value:** Business leaders can quickly understand what Consultates offers and book a free call

## v1 Requirements

Requirements for v3.0 Polish & Ship. Each maps to roadmap phases.

### Bug Fixes

- [ ] **FIX-01**: Stakes (NegativeStakes) section added to Home nav dropdown `homeSections` array with correct index, label, description, and Phosphor icon
- [ ] **FIX-02**: FormInput icon padding bug fixed — `iconPaddingClass` applied to the input element so text does not overlap icons

### Footer

- [ ] **FOOT-01**: Footer redesigned to match site-wide design system quality (per Gary's direction — current footer is "slop")
- [ ] **FOOT-02**: Footer renders consistently on all pages (homepage, service pages, about, contact, blog index, blog post, privacy, 404)

### Homepage Polish

- [ ] **HP-01**: How It Works section polished to match the visual standard set by the hero section
- [ ] **HP-02**: Why Consultates section completely redone — no longer a "soulless middle" section
- [ ] **HP-03**: Get Started / StakesCTA section polished with design attention

### Integrations

- [ ] **INT-01**: Contact form wired to Google Apps Script backend — submissions sent to email and logged to Google Sheet
- [ ] **INT-02**: Google Analytics GA4 tag added and tracking page views

### Cleanup

- [ ] **CLN-01**: Three dummy blog posts removed (strategy, tools-tactics, ai-safety categories added for grid threshold testing)

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
| FIX-01 | - | Pending |
| FIX-02 | - | Pending |
| FOOT-01 | - | Pending |
| FOOT-02 | - | Pending |
| HP-01 | - | Pending |
| HP-02 | - | Pending |
| HP-03 | - | Pending |
| INT-01 | - | Pending |
| INT-02 | - | Pending |
| CLN-01 | - | Pending |

**Coverage:**
- v1 requirements: 10 total
- Mapped to phases: 0
- Unmapped: 10 ⚠️

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-03-10 after initial definition*
