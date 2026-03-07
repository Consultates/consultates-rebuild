---
phase: 15-service-pages
plan: 01
subsystem: ui
tags: [astro, service-pages, layout, framer-motion, testimonials]

requires:
  - phase: 05-inner-pages
    provides: Original service page structure and ServicePage.astro layout
provides:
  - Three visually distinct standalone service pages with structured outcomes
  - Testimonial pattern for service pages (cream bg and bordered variants)
  - Numbered checklist, icon grid, and accent-card outcome layouts
affects: [15-02-verification, service-pages]

tech-stack:
  added: []
  patterns: [standalone-service-page, numbered-checklist-outcomes, icon-grid-outcomes, accent-card-outcomes]

key-files:
  created: []
  modified:
    - src/pages/services/ai-coaching-for-leaders.astro
    - src/pages/services/ai-training-for-teams.astro
    - src/pages/services/fractional-exec-support.astro

key-decisions:
  - "Each service page imports Base.astro directly instead of shared ServicePage.astro layout"
  - "CTA uses btn-alive class (underline-draw) consistent with v2.0 design system"
  - "Testimonial sections alternate between cream bg and bordered white bg for visual variety"

patterns-established:
  - "Standalone service pages: each imports Base directly with its own section structure"
  - "Outcome layout variants: numbered checklist (coaching), 2x2 icon grid (training), horizontal accent cards (fractional)"
  - "Testimonial embedding: decorative quote mark + attribution circle matching social proof section pattern"

requirements-completed: [RDES-51, RDES-52, RDES-53, RDES-54]

duration: 2min
completed: 2026-03-07
---

# Phase 15 Plan 01: Service Page Redesign Summary

**Three standalone service pages with distinct layouts -- numbered checklist (coaching), icon grid (training), and accent-top cards (fractional) -- each with scenario personas and embedded testimonials**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-07T08:11:31Z
- **Completed:** 2026-03-07T08:13:58Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- All three service pages converted from shared ServicePage.astro to standalone layouts with Base.astro
- Each page has a visually distinct hero: centered (coaching), left-aligned with stat callout (training), dark background (fractional)
- Structured outcomes: numbered checklist with left accent (coaching), 2x2 icon grid (training), 3-card row with purple accent tops (fractional)
- Scenario-based who-it's-for sections: persona cards (coaching), bordered bullet list (training), checkmark list (fractional)
- Embedded testimonials with placeholder (coaching/training) and Frank Wiener quote (fractional)

## Task Commits

Each task was committed atomically:

1. **Task 1: AI Coaching page -- intimate 1:1 layout with checklist outcomes** - `9e88917` (feat)
2. **Task 2: AI Training + Fractional pages -- distinct layouts with grid and card outcomes** - `2b6a6b6` (feat)

## Files Created/Modified
- `src/pages/services/ai-coaching-for-leaders.astro` - Standalone coaching page with centered hero, numbered checklist, persona cards, cream testimonial
- `src/pages/services/ai-training-for-teams.astro` - Standalone training page with stat callout hero, 2x2 grid, bordered scenario list, bordered testimonial
- `src/pages/services/fractional-exec-support.astro` - Standalone fractional page with dark hero, accent-top cards, checkmark list, cream FW testimonial

## Decisions Made
- Each page imports Base.astro directly instead of shared ServicePage.astro -- enables fully distinct layouts
- CTA uses btn-alive class consistent with v2.0 design system (underline-draw, not gradient pill)
- Testimonial sections alternate cream/bordered-white backgrounds for visual variety across pages

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All three service pages built and building cleanly
- Ready for 15-02 verification (Playwright screenshots at desktop/tablet/mobile)
- ServicePage.astro layout no longer used by any page (can be removed in cleanup)

## Self-Check: PASSED

All 3 files found. Both commit hashes verified.

---
*Phase: 15-service-pages*
*Completed: 2026-03-07*
