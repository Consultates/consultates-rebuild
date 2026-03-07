---
phase: 12-use-cases-how-it-works
plan: 02
subsystem: ui
tags: [react, framer-motion, animation, timeline, css-transitions]

requires:
  - phase: 11-negative-stakes-offering
    provides: Sequential animation pattern (StrokeDrawStats), btn-alive CTA system
provides:
  - Animated How It Works 3-step timeline React island
  - HowItWorksSection.astro wrapper with client:visible mount
affects: [13-social-proof, 14-final-cta]

tech-stack:
  added: []
  patterns: [CSS transition timeline animation, setTimeout chain for sequential reveals, MutationObserver + IntersectionObserver viewport detection]

key-files:
  created: [src/components/islands/HowItWorksIsland.tsx]
  modified: [src/components/sections/HowItWorksSection.astro]

key-decisions:
  - "Pure CSS transitions + React state for timeline animation — no GSAP inside snap sections"
  - "Horizontal gradient connecting line on desktop, hidden on mobile with vertical gap"
  - "Circle pulse via CSS @keyframes, not Framer Motion — lightweight and no library coupling"

patterns-established:
  - "Timeline animation: line-draw width transition triggers circle fills at percentage thresholds"
  - "Viewport detection: MutationObserver on scroll-section data-active + IntersectionObserver fallback"

requirements-completed: [RDES-29, RDES-30, RDES-31, RDES-32, RDES-33]

duration: 1min
completed: 2026-03-07
---

# Phase 12 Plan 02: How It Works Section Summary

**Animated 3-step timeline island with line draw, sequential circle fills with pulse, and content reveals using pure CSS transitions**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-07T02:30:53Z
- **Completed:** 2026-03-07T02:32:15Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- HowItWorksIsland.tsx: animated timeline with gradient line draw, circle fill+pulse at 33/66/100% progress, content reveal per step
- Desktop 3-column horizontal layout with connecting gradient line between circle centers
- Mobile single-column vertical stack without horizontal line
- Reduced motion support: all content visible immediately
- CTA uses btn-alive underline-draw style linking to TidyCal

## Task Commits

Each task was committed atomically:

1. **Task 1: Create HowItWorksIsland.tsx with animated timeline** - `2adad32` (feat)
2. **Task 2: Update HowItWorksSection.astro to use React island** - `dc20adf` (feat)

## Files Created/Modified
- `src/components/islands/HowItWorksIsland.tsx` - React island with animated 3-step timeline
- `src/components/sections/HowItWorksSection.astro` - Astro wrapper mounting HowItWorksIsland client:visible

## Decisions Made
- Pure CSS transitions + React useState/setTimeout for all animation (avoids GSAP conflict with page-level scroll-snap)
- Circle pulse uses CSS @keyframes instead of Framer Motion for lightweight animation
- Horizontal connecting line hidden on mobile, replaced with vertical gap spacing

## Deviations from Plan

None - plan executed exactly as written.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- How It Works section complete with animated timeline
- Ready for Phase 13 (Social Proof) or remaining Phase 12 plans

---
*Phase: 12-use-cases-how-it-works*
*Completed: 2026-03-07*
