---
phase: 04-animation
plan: 02
subsystem: ui
tags: [framer-motion, react, animation, count-up, pulse, viewport, astro-islands]

requires:
  - phase: 04-animation
    provides: Shared FM variants (fadeUp, scaleIn, staggerContainer), useReducedMotion hook, AnimatedSection wrapper
provides:
  - CountUpStat island for animated number count-up on viewport entry
  - StakesCTAPulse island for CTA with continuous pulse animation
  - SectionAnimator island for generic fadeUp entrance animation wrapper
  - All 9 non-hero homepage sections wired with viewport-triggered entrance animations
affects: [future page sections, any new homepage sections]

tech-stack:
  added: []
  patterns: [SectionAnimator wraps container divs not individual Astro components, client:visible for all non-hero islands]

key-files:
  created:
    - src/components/islands/CountUpStat.tsx
    - src/components/islands/StakesCTAPulse.tsx
    - src/components/islands/SectionAnimator.tsx
  modified:
    - src/components/sections/TrustBar.astro
    - src/components/sections/NegativeStakes.astro
    - src/components/sections/OfferingSection.astro
    - src/components/sections/UseCasesSection.astro
    - src/components/sections/HowItWorksSection.astro
    - src/components/sections/SocialProofSection.astro
    - src/components/sections/WhyConsultatesSection.astro
    - src/components/sections/StakesCTASection.astro
    - src/components/sections/TransitionalCTAsSection.astro

key-decisions:
  - "SectionAnimator wraps container divs, not individual Astro sub-components (Astro components cannot be React children)"
  - "Single fadeUp per section container instead of per-item stagger (Astro server-rendered children are not motion-aware)"

patterns-established:
  - "Astro-component sections: wrap the container div in SectionAnimator, not individual Astro component calls"
  - "Delay stagger via multiple SectionAnimator instances with incremental delay props"
  - "CountUpStat uses native IntersectionObserver + framer-motion animate() for count-up (not whileInView)"

requirements-completed: [ANIM-05, ANIM-06, ANIM-07]

duration: 3min
completed: 2026-03-05
---

# Phase 4 Plan 2: Section Animations Summary

**CountUpStat, StakesCTAPulse, and SectionAnimator islands wired into all 9 non-hero homepage sections with viewport-triggered fadeUp entrance animations**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-05T04:18:05Z
- **Completed:** 2026-03-05T04:21:15Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Created CountUpStat island that animates 84% stat from 0 to 84 on viewport entry (600ms, eased)
- Created StakesCTAPulse island with scaleIn entrance (600ms delay) then continuous pulse every ~2.4s
- Created SectionAnimator as lightweight fadeUp wrapper with configurable delay
- Wired all 9 non-hero sections with entrance animations using client:visible
- Removed scoped .stakes-cta styles from StakesCTASection (now in StakesCTAPulse React island)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CountUpStat, StakesCTAPulse, and SectionAnimator islands** - `61962ee` (feat)
2. **Task 2: Wire animation islands into all 9 section Astro files** - `93a60b8` (feat)

## Files Created/Modified
- `src/components/islands/CountUpStat.tsx` - Animated count-up from 0 to target number with IntersectionObserver + framer-motion animate
- `src/components/islands/StakesCTAPulse.tsx` - CTA button with scaleIn entrance + infinite pulse animation
- `src/components/islands/SectionAnimator.tsx` - Reusable fadeUp wrapper with configurable delay for section entrance animations
- `src/components/sections/TrustBar.astro` - SectionAnimator wraps credentials text
- `src/components/sections/NegativeStakes.astro` - CountUpStat replaces first StatBlock, SectionAnimator on second stat + source
- `src/components/sections/OfferingSection.astro` - SectionAnimator on heading + grid container
- `src/components/sections/UseCasesSection.astro` - SectionAnimator per testimonial block with stagger delay
- `src/components/sections/HowItWorksSection.astro` - SectionAnimator on steps grid + CTA
- `src/components/sections/SocialProofSection.astro` - SectionAnimator on quote + delayed attribution
- `src/components/sections/WhyConsultatesSection.astro` - SectionAnimator on authority columns grid
- `src/components/sections/StakesCTASection.astro` - SectionAnimator on headline + StakesCTAPulse replaces static CTA
- `src/components/sections/TransitionalCTAsSection.astro` - SectionAnimator on blog cards grid

## Decisions Made
- SectionAnimator wraps container divs rather than individual Astro sub-components because Astro components cannot be passed as children to React islands
- Used single fadeUp on whole grid containers instead of per-item stagger since server-rendered Astro children are not motion-aware (staggerContainer requires motion children)

## Deviations from Plan

None - plan executed exactly as written (the plan itself anticipated the Astro-children limitation and included the revised strategy).

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All Framer Motion component animations complete for Phase 4
- GSAP ScrollTrigger (if planned as separate phase/plan) can be layered independently
- Phase 4 animation layer fully applied to homepage

## Self-Check: PASSED

All 3 created files verified on disk. Both commit hashes (61962ee, 93a60b8) confirmed in git log. Build passes cleanly.

---
*Phase: 04-animation*
*Completed: 2026-03-05*
