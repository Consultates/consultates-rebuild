---
phase: 04-animation
plan: 03
subsystem: ui
tags: [gsap, scrolltrigger, scroll-snap, zoom-transitions, reduced-motion, accessibility]

# Dependency graph
requires:
  - phase: 04-animation-01
    provides: "HeroIsland with Framer Motion entrance animation and scroll indicator"
  - phase: 04-animation-02
    provides: "SectionAnimator wrapper with Framer Motion whileInView on all sections"
provides:
  - "GSAP ScrollTrigger scroll-snap with zoom transitions on desktop"
  - "scroll-section CSS class for homepage section layout"
  - "Reduced motion support across GSAP and Framer Motion"
  - "Scroll indicator GSAP-driven fade-out on scroll"
affects: [05-pages, 06-blog]

# Tech tracking
tech-stack:
  added: [gsap/ScrollTrigger (bundled via Astro script)]
  patterns: [desktop-only GSAP gating via matchMedia, data-attribute targeting for cross-framework element access]

key-files:
  created: []
  modified:
    - src/layouts/Base.astro
    - src/pages/index.astro
    - src/styles/global.css
    - src/components/islands/HeroIsland.tsx

key-decisions:
  - "sections.slice(1) to skip hero from GSAP zoom — hero has its own FM entrance"
  - "Wrapper div approach for scroll-section class — avoids modifying 10 section component files"
  - "data-scroll-indicator attribute added to HeroIsland for GSAP cross-framework targeting"

patterns-established:
  - "Desktop gate pattern: matchMedia min-width 1024px AND no reduced-motion before GSAP init"
  - "Data attribute bridge: React components expose data-* attrs for vanilla GSAP targeting"

requirements-completed: [ANIM-01, ANIM-02, ANIM-08]

# Metrics
duration: 2min
completed: 2026-03-05
---

# Phase 4 Plan 3: GSAP ScrollTrigger Summary

**Desktop scroll-snap with zoom transitions (scale 0.92->1) on sections 2-10, mobile/tablet natural scroll, full reduced-motion accessibility**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-05T04:24:24Z
- **Completed:** 2026-03-05T04:26:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- GSAP ScrollTrigger scroll-snap with zoom transitions on desktop homepage
- Mobile/tablet graceful degradation to natural scroll with auto-height sections
- Reduced motion users get all content visible with no GSAP or scroll indicator animation
- GSAP and Framer Motion remain fully decoupled (data-attribute bridge, no shared state)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add scroll-section CSS and scroll-bob keyframes** - `7c89451` (feat)
2. **Task 2: Add GSAP ScrollTrigger script to Base.astro** - `5c2e44c` (feat)

## Files Created/Modified
- `src/styles/global.css` - Added .scroll-section class, mobile/tablet reset, reduced-motion queries
- `src/pages/index.astro` - Wrapped all 10 sections in scroll-section divs
- `src/layouts/Base.astro` - Added GSAP ScrollTrigger script with zoom transitions and snap
- `src/components/islands/HeroIsland.tsx` - Added data-scroll-indicator attribute to both motion branches

## Decisions Made
- Used `sections.slice(1)` to exclude hero from GSAP zoom transitions (hero has its own Framer Motion entrance)
- Wrapper div approach (`<div class="scroll-section">`) keeps section component internals untouched
- Added `data-scroll-indicator` to HeroIsland for GSAP targeting (was missing, needed for scroll indicator fade-out)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added data-scroll-indicator to HeroIsland**
- **Found during:** Task 1 (CSS and section wrapping)
- **Issue:** Plan noted to verify data-scroll-indicator exists from Plan 01 — it did not exist
- **Fix:** Added `data-scroll-indicator` attribute to both reduced-motion and animated scroll indicator elements in HeroIsland.tsx
- **Files modified:** src/components/islands/HeroIsland.tsx
- **Verification:** Build passes, attribute present in both render branches
- **Committed in:** 7c89451 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for GSAP scroll indicator fade-out to work. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Animation layer complete (all 3 plans: FM component animations, section animations, GSAP scroll-snap)
- Ready for Phase 5 (inner pages) or Phase 6 (blog)

---
*Phase: 04-animation*
*Completed: 2026-03-05*
