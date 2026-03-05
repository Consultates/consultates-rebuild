---
phase: 09-fix-site-audit-deficiencies
plan: 02
subsystem: ui
tags: [gsap, framer-motion, scroll-snap, mutation-observer, astro]

requires:
  - phase: 04-animation
    provides: GSAP scroll-snap transitions and data-active attribute system
provides:
  - Single TrustBar instance with section-trust anchor ID
  - Single ScrollIndicator in Hero only
  - CountUpStat with dual-strategy activation (MutationObserver + IntersectionObserver)
affects: []

tech-stack:
  added: []
  patterns: [MutationObserver for GSAP data-active detection in React islands]

key-files:
  created: []
  modified:
    - src/pages/index.astro
    - src/components/sections/TrustBar.astro
    - src/components/islands/CountUpStat.tsx
    - src/components/sections/NegativeStakes.astro

key-decisions:
  - "TrustBar becomes its own scroll-section (section 2) instead of overlay in every section"
  - "CountUpStat uses MutationObserver on data-active for GSAP, IntersectionObserver fallback for mobile"
  - "CountUpStat hydrated with client:load (not client:visible) so observer is ready before GSAP activates"

patterns-established:
  - "MutationObserver on .scroll-section[data-active] for React islands inside GSAP-controlled sections"

requirements-completed: [AUDIT-01, AUDIT-02, AUDIT-06, AUDIT-12, AUDIT-14]

duration: 2min
completed: 2026-03-05
---

# Phase 9 Plan 02: Fix Duplicate Components and Stat Animation Summary

**Eliminated duplicate TrustBar/ScrollIndicator on mobile, added section-trust ID, and fixed 84% stat count-up via MutationObserver for GSAP-hidden sections**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-05T12:55:27Z
- **Completed:** 2026-03-05T12:57:17Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Homepage restructured: TrustBar is its own scroll-section (section 2), ScrollIndicator only in Hero
- TrustBar has `id="section-trust"` for anchor navigation
- CountUpStat uses dual-strategy activation: MutationObserver watches `data-active` on desktop GSAP, IntersectionObserver fallback on mobile
- Build passes cleanly with 10 scroll-sections

## Task Commits

Each task was committed atomically:

1. **Task 1: Restructure index.astro -- single TrustBar and ScrollIndicator, add section-trust ID** - `c78af2b` (fix)
2. **Task 2: Fix CountUpStat to work inside GSAP-hidden sections** - `efcf294` (fix)

## Files Created/Modified
- `src/pages/index.astro` - Restructured to 10 scroll-sections with single TrustBar and ScrollIndicator
- `src/components/sections/TrustBar.astro` - Full-section layout with section-trust ID, centered text
- `src/components/islands/CountUpStat.tsx` - MutationObserver + IntersectionObserver dual activation strategy
- `src/components/sections/NegativeStakes.astro` - Changed CountUpStat from client:visible to client:load

## Decisions Made
- TrustBar becomes its own scroll-section (section 2) instead of absolute-positioned overlay repeated in every section
- CountUpStat uses MutationObserver on parent .scroll-section for data-active attribute (GSAP desktop), with IntersectionObserver fallback (mobile)
- CountUpStat hydrated with client:load instead of client:visible so the MutationObserver is active before GSAP transitions to the section

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All duplicate component issues resolved
- Stat animation works in both GSAP desktop and mobile contexts
- Ready for remaining audit fixes in subsequent plans

## Self-Check: PASSED

All 4 modified files confirmed on disk. Both task commits (c78af2b, efcf294) verified in git log. Build passes cleanly.

---
*Phase: 09-fix-site-audit-deficiencies*
*Completed: 2026-03-05*
