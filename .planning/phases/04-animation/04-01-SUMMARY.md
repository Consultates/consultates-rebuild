---
phase: 04-animation
plan: 01
subsystem: ui
tags: [framer-motion, react, animation, reduced-motion, astro-islands]

requires:
  - phase: 03-homepage
    provides: Static HeroSection.astro with markup and scoped gradient styles
provides:
  - Shared Framer Motion variants file (fadeUp, scaleIn, staggerContainer, hoverLift)
  - useReducedMotion hook for accessibility-aware animation
  - getVariant helper for conditional animation disable
  - AnimatedSection generic wrapper component
  - HeroIsland with letter stagger sequence
affects: [04-animation remaining plans, any future React island animations]

tech-stack:
  added: [framer-motion (first use in islands)]
  patterns: [shared variants import, useReducedMotion hook, client:load for hero island]

key-files:
  created:
    - src/lib/animations.ts
    - src/components/islands/HeroIsland.tsx
    - src/components/islands/AnimatedSection.tsx
  modified:
    - src/components/sections/HeroSection.astro
    - src/styles/global.css

key-decisions:
  - "Hero CTA uses bg-primary/text-primary-foreground to match Button CTA variant styling"
  - "scroll-bob-dot utility class added to global.css for React island access to scroll-bob keyframe"

patterns-established:
  - "Shared variants import: all islands import from src/lib/animations.ts"
  - "useReducedMotion hook: check once per island, pass to getVariant"
  - "Island replaces static Astro content: keep section wrapper + scoped styles in .astro, move content into React island"

requirements-completed: [ANIM-03, ANIM-04, ANIM-08]

duration: 2min
completed: 2026-03-05
---

# Phase 4 Plan 1: FM Foundation and Hero Island Summary

**Shared Framer Motion variants library with useReducedMotion hook and HeroIsland letter stagger sequence**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-05T04:13:19Z
- **Completed:** 2026-03-05T04:15:29Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Created shared animation variants file as single source of truth for all FM config
- Built HeroIsland with orchestrated letter stagger sequence (1200ms delay, 30ms/char, paragraph fadeUp, CTA scaleIn, scroll indicator fade)
- Created AnimatedSection generic wrapper for future section islands
- Full reduced-motion support: all content visible immediately, no animations

## Task Commits

Each task was committed atomically:

1. **Task 1: Create animation variants and reduced-motion hook** - `bf97f49` (feat)
2. **Task 2: Create HeroIsland and AnimatedSection, update HeroSection.astro** - `32c0da4` (feat)

## Files Created/Modified
- `src/lib/animations.ts` - Shared FM variants (fadeUp, scaleIn, staggerContainer, hoverLift), viewport configs, useReducedMotion hook, getVariant helper
- `src/components/islands/HeroIsland.tsx` - Hero animation orchestrator with letter stagger, sequential delays, reduced motion fallback
- `src/components/islands/AnimatedSection.tsx` - Generic animated wrapper using whileInView with reduced motion support
- `src/components/sections/HeroSection.astro` - Replaced static h1/p/Button/ScrollIndicator with HeroIsland client:load
- `src/styles/global.css` - Added scroll-bob-dot utility class

## Decisions Made
- Hero CTA uses `bg-primary text-primary-foreground hover:bg-primary-hover` to match the Button component's CTA variant styling in the React island context
- Added `.scroll-bob-dot` utility class in global.css so the React island can reference the existing `scroll-bob` keyframe animation

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added scroll-bob-dot utility class**
- **Found during:** Task 2 (HeroIsland creation)
- **Issue:** React island cannot use Astro scoped styles; scroll-bob keyframe existed in global.css but no CSS class applied the animation to the dot element
- **Fix:** Added `.scroll-bob-dot { animation: scroll-bob 2s infinite ease-in-out; }` to global.css
- **Files modified:** src/styles/global.css
- **Verification:** Build passes, dot animation available to island
- **Committed in:** 32c0da4 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary for scroll indicator animation in React island context. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Animation variants file ready for all remaining section islands to import
- AnimatedSection wrapper ready for generic section animation
- Pattern established: keep Astro section wrapper, move content to React island with client:visible (or client:load for hero)

---
*Phase: 04-animation*
*Completed: 2026-03-05*
