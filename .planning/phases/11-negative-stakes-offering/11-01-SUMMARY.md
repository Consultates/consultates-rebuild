---
phase: 11-negative-stakes-offering
plan: 01
subsystem: ui
tags: [react, svg, stroke-draw, framer-motion, astro, animation]

requires:
  - phase: 10-foundation-hero-trust-bar
    provides: design system tokens, glow utility, animation keyframes
provides:
  - StrokeDrawStats React island with SVG stroke-draw animation
  - Redesigned NegativeStakes.astro with 3-col stat grid, title, pull quote, glow
  - .text-stroke-stat CSS utility class
affects: [12-social-proof, future phases using stroke-draw pattern]

tech-stack:
  added: []
  patterns: [SVG text stroke-dasharray animation, dual MutationObserver+IntersectionObserver trigger]

key-files:
  created:
    - src/components/islands/StrokeDrawStats.tsx
  modified:
    - src/components/sections/NegativeStakes.astro
    - src/styles/global.css

key-decisions:
  - "SVG text stroke-dashoffset via CSS transition (not keyframe animation) for simpler per-element control"
  - "getComputedTextLength() * 3 for stroke perimeter approximation on SVG text elements"
  - "Count-up retained for 84% stat only; other stats use static text with stroke-draw"

patterns-established:
  - "SVG stroke-draw: use stroke-dasharray/dashoffset transition triggered by state change"
  - "Sequential reveal: setTimeout chain driven by IntersectionObserver trigger"

requirements-completed: [RDES-17, RDES-18, RDES-19, RDES-20]

duration: 2min
completed: 2026-03-06
---

# Phase 11 Plan 01: Negative Stakes Redesign Summary

**Three-column SVG stroke-draw stat grid with sequential reveal, section title, Kevin Roose pull quote, and radial purple glow on light background**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-06T08:24:23Z
- **Completed:** 2026-03-06T08:26:45Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created StrokeDrawStats React island with SVG text stroke-draw animation for three stats
- Redesigned NegativeStakes.astro from 2-col static layout to glow-wrapped single-island architecture
- Added .text-stroke-stat CSS utility for transparent-fill purple-stroke serif numbers

## Task Commits

Each task was committed atomically:

1. **Task 1: Create StrokeDrawStats React island** - `96eda86` (feat)
2. **Task 2: Redesign NegativeStakes.astro layout** - `d27b2af` (feat)

## Files Created/Modified
- `src/components/islands/StrokeDrawStats.tsx` - React island: SVG stroke-draw stats, sequential reveal, count-up for 84%, pull quote, section title
- `src/components/sections/NegativeStakes.astro` - Simplified wrapper: imports StrokeDrawStats island, adds glow class
- `src/styles/global.css` - Added .text-stroke-stat utility (serif, --text-stat, transparent fill, 2px stroke)

## Decisions Made
- Used CSS transition on stroke-dashoffset (not @keyframes) for per-element control of draw timing
- Approximated stroke perimeter as getComputedTextLength() * 3 since SVG text elements don't support getTotalLength()
- Kept count-up behavior only on the 84% stat (via framer-motion animate); other stats are static text with stroke-draw only
- Pull quote and section title use simple opacity/transform transitions triggered by the same intersection observer state

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Negative Stakes section redesigned and building cleanly
- Ready for visual verification at desktop/tablet/mobile
- Offering section (plan 02) can proceed independently

---
*Phase: 11-negative-stakes-offering*
*Completed: 2026-03-06*
