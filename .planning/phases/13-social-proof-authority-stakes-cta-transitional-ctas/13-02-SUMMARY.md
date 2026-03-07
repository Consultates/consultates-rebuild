---
phase: 13-social-proof-authority-stakes-cta-transitional-ctas
plan: 02
subsystem: ui
tags: [astro, tailwind, framer-motion, blog-cards, cta]

requires:
  - phase: 11-offering-negative-stakes
    provides: "glow and corner-marks CSS utilities, card shadow tokens"
provides:
  - "Stakes CTA with radial glow, corner marks, accent em highlights, pill button"
  - "Transitional CTAs with 3-card grid, serif titles, hover accent borders, stagger animation"
affects: [14-contact-footer, 15-dark-mode]

tech-stack:
  added: []
  patterns: ["em tag inline styling for accent highlights on dark bg", "SectionAnimator delay prop for card stagger"]

key-files:
  created: []
  modified:
    - src/components/sections/StakesCTASection.astro
    - src/components/islands/StakesCTAPulse.tsx
    - src/components/sections/TransitionalCTAsSection.astro
    - src/components/BlogCard.astro

key-decisions:
  - "Used inline style for em accent color (#8B6CC7) since stakes CTA is always dark bg"
  - "BlogCard serif + hover accent applied globally (shared with blog index) — appropriate everywhere"

patterns-established:
  - "Corner-marks --corner-color override for dark backgrounds: rgba(139,108,199,0.4)"

requirements-completed: [RDES-39, RDES-40, RDES-41, RDES-42, RDES-43, RDES-44, RDES-45]

duration: 2min
completed: 2026-03-07
---

# Phase 13 Plan 02: Stakes CTA + Transitional CTAs Summary

**Stakes CTA with radial glow, corner marks, and accent-highlighted stats; Transitional CTAs expanded to 3-card serif grid with stagger animation**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-07T06:05:20Z
- **Completed:** 2026-03-07T06:07:40Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Stakes CTA section now has radial purple glow and corner marks framing the content
- "84%" and "0.04%" stats highlighted in accent purple via em tags
- CTA button changed from rounded-lg to pill-shaped (rounded-full)
- Transitional CTAs section has "Not ready to book? Start here." heading in serif
- Third blog card added (Get Out of the AI Cage), grid changed to 3-column
- BlogCard titles render in IBM Plex Serif with hover accent border
- Cards stagger-reveal with 0/0.12/0.24s delays

## Task Commits

Each task was committed atomically:

1. **Task 1: Stakes CTA glow + corners + em parsing + pill button** - `372ee0c` (feat)
2. **Task 2: Transitional CTAs three-card layout + BlogCard serif + hover** - `85249fd` (feat)

## Files Created/Modified
- `src/components/sections/StakesCTASection.astro` - Added glow, corner-marks, em accent highlights
- `src/components/islands/StakesCTAPulse.tsx` - Changed to pill-shaped button (rounded-full)
- `src/components/sections/TransitionalCTAsSection.astro` - Added heading, third card, 3-col grid, stagger
- `src/components/BlogCard.astro` - Added serif title, hover accent border

## Decisions Made
- Used inline style for em accent color (#8B6CC7) since stakes CTA is always on dark background
- BlogCard serif titles and hover accent border applied globally — appropriate for blog index too

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Stakes CTA and Transitional CTAs redesigned per design system
- Ready for Phase 13 Plan 03 (if exists) or Phase 14

---
*Phase: 13-social-proof-authority-stakes-cta-transitional-ctas*
*Completed: 2026-03-07*
