---
phase: 15-service-pages
plan: 02
subsystem: ui
tags: [astro, css, connecting-line, dark-cta, service-pages]

requires:
  - phase: 15-01
    provides: "Service page structure with hero, outcomes, who-its-for, testimonial sections"
provides:
  - "Connecting-line how-it-works sections on all three service pages"
  - "Dark CTA sections with glow, corner marks, and StakesCTAPulse pill button"
affects: [16-contact-page, 17-blog]

tech-stack:
  added: []
  patterns: ["hiw-steps CSS pattern for connecting-line step layout (vertical mobile, horizontal desktop)"]

key-files:
  created: []
  modified:
    - src/pages/services/ai-coaching-for-leaders.astro
    - src/pages/services/ai-training-for-teams.astro
    - src/pages/services/fractional-exec-support.astro

key-decisions:
  - "Page-scoped <style> blocks for hiw CSS rather than global styles -- keeps connecting-line pattern isolated to service pages"
  - "Each page has distinct step 3 copy and distinct CTA headline to reinforce service differentiation"

patterns-established:
  - "hiw-steps: CSS flex layout with ::before pseudo-element connecting line, vertical on mobile, horizontal on desktop via @media breakpoint"
  - "Dark CTA reuse: identical pattern to StakesCTASection.astro (glow, corner-marks, StakesCTAPulse) for page-level CTAs"

requirements-completed: [RDES-55, RDES-56]

duration: 4min
completed: 2026-03-07
---

# Phase 15 Plan 02: Service Pages How-It-Works and Dark CTA Summary

**Connecting-line how-it-works sections and dark CTA closers added to all three service pages with distinct per-page copy**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-07T08:16:15Z
- **Completed:** 2026-03-07T08:19:51Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- All three service pages now have a how-it-works section with numbered step nodes connected by a visible line (vertical on mobile, horizontal on desktop)
- Each page has a distinct step 3 heading and copy (coaching: "You act", training: "Your team ships", fractional: "We scale together")
- Dark CTA sections with #0D1117 background, glow effect, corner marks, and StakesCTAPulse pill button replace the previous plain btn-alive CTAs
- Nine Playwright screenshots captured across three breakpoints for visual verification

## Task Commits

Each task was committed atomically:

1. **Task 1: Add connecting-line how-it-works and dark CTA to all three pages** - `2113023` (feat)
2. **Task 2: Playwright screenshots at three breakpoints** - `630587e` (chore)

## Files Created/Modified
- `src/pages/services/ai-coaching-for-leaders.astro` - Added hiw section (step 3: "You act"), dark CTA ("Ready for clarity on AI?"), hiw CSS
- `src/pages/services/ai-training-for-teams.astro` - Added hiw section (step 3: "Your team ships"), dark CTA ("Ready to upskill your team?"), hiw CSS
- `src/pages/services/fractional-exec-support.astro` - Added hiw section (step 3: "We scale together"), dark CTA ("Ready for experienced GTM leadership?"), hiw CSS

## Decisions Made
- Used page-scoped `<style>` blocks for hiw-steps CSS rather than adding to global.css, since the connecting-line pattern is specific to service pages
- Distinct step 3 copy per page reinforces that each service has a different outcome path
- Replaced plain btn-alive CTA sections with the full dark CTA pattern (matching homepage StakesCTASection) for stronger visual close

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All service pages complete with RDES-51 through RDES-56 requirements met
- Phase 15 fully done, ready for phase 16 (Contact Page)

---
*Phase: 15-service-pages*
*Completed: 2026-03-07*
