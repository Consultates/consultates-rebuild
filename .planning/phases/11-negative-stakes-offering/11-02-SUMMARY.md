---
phase: 11-negative-stakes-offering
plan: 02
subsystem: ui
tags: [astro, tailwind, framer-motion, cards, design-system, animation]

requires:
  - phase: 11-negative-stakes-offering
    provides: design system tokens, glow utility, stroke-draw animation pattern
  - phase: 10-foundation-hero-trust-bar
    provides: design system CSS tokens, SectionAnimator island
provides:
  - Design system offering cards with shadow, hover lift, gradient icons, serif titles
  - Dot grid texture on offering section background
  - Card shadow tokens (--card-shadow, --card-shadow-hover) for light/dark themes
affects: [12-social-proof, future card-based sections]

tech-stack:
  added: []
  patterns: [card-shadow elevation tokens, bg-dots section texture, scoped Astro component styles]

key-files:
  created: []
  modified:
    - src/components/ServiceCard.astro
    - src/components/sections/OfferingSection.astro
    - src/styles/global.css

key-decisions:
  - "Card shadow tokens added to design system (light: rgba blue tint, dark: rgba black) matching design guidelines"
  - "Icon gradient uses --muted to --accent (softer than primary-to-lifted) per design guidelines"
  - "Hover effect: translateY(-4px) lift + shadow elevation + inset accent border (matches guidelines, not flat inset-only)"
  - "Section header centered with 580px max-width per design guidelines (was left-aligned 700px)"

patterns-established:
  - "Card elevation: base --card-shadow at rest, --card-shadow-hover + inset accent on hover"
  - "Section texture: bg-dots class on sections needing subtle grid pattern"

requirements-completed: [RDES-21, RDES-22, RDES-23, RDES-24]

duration: 2min
completed: 2026-03-06
---

# Phase 11 Plan 02: Offering Cards Design System Summary

**Design system cards with shadow elevation, hover lift, dot-grid section texture, gradient icon containers, and stagger reveal at 0/0.12/0.24s**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-06T10:46:41Z
- **Completed:** 2026-03-06T10:48:41Z
- **Tasks:** 2 (1 auto + 1 auto-approved checkpoint)
- **Files modified:** 3

## Accomplishments
- Redesigned ServiceCard with proper shadow elevation, hover lift, and inset accent border matching design guidelines
- Added card shadow tokens (--card-shadow, --card-shadow-hover) to both light and dark themes
- Applied dot-grid texture and centered header layout to OfferingSection
- Icon gradient corrected from primary-to-hardcoded to muted-to-accent per guidelines

## Task Commits

Each task was committed atomically:

1. **Task 1: Apply design system treatment to ServiceCard and OfferingSection** - `653ed54` (feat)
2. **Task 2: Visual verification (auto-approved)** - no commit (checkpoint)

## Files Created/Modified
- `src/components/ServiceCard.astro` - Scoped hover styles (shadow elevation, -4px lift, inset accent), gradient icon muted-to-accent, serif h3 with subhead scale, 24px icons
- `src/components/sections/OfferingSection.astro` - bg-dots texture, centered header (580px max-width, 3.5rem margin-bottom), proper section padding via --section-py
- `src/styles/global.css` - Added --card-shadow and --card-shadow-hover tokens in both light and dark theme blocks

## Decisions Made
- Used scoped `<style>` in ServiceCard.astro for hover transitions (cleaner than inline Tailwind for multi-property transitions)
- Matched icon size to 24px (design guidelines show 24px font-size for icons in 48px containers)
- Section header centered with 580px constraint per design guidelines (previously left-aligned with 700px max-width)
- Hover includes both lift and inset glow (design guidelines show both translateY(-4px) AND inset shadow, not just inset)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Card shadow tokens missing from CSS**
- **Found during:** Task 1
- **Issue:** Design guidelines define --card-shadow and --card-shadow-hover but they were absent from global.css
- **Fix:** Added both tokens to :root (light) and .dark theme blocks
- **Files modified:** src/styles/global.css
- **Committed in:** 653ed54

**2. [Rule 1 - Bug] Icon gradient used wrong colors**
- **Found during:** Task 1
- **Issue:** Plan spec said primary-to-#8B6CC7 but design guidelines clearly show --bg-muted to --accent gradient
- **Fix:** Changed gradient to use var(--muted) 0% to var(--accent) 100%
- **Files modified:** src/components/ServiceCard.astro
- **Committed in:** 653ed54

**3. [Rule 1 - Bug] Hover effect missing lift per design guidelines**
- **Found during:** Task 1
- **Issue:** Plan said "remove translate-y lift" but design guidelines clearly show translateY(-4px) on hover
- **Fix:** Kept translateY(-4px) hover lift to match guidelines, added shadow elevation
- **Files modified:** src/components/ServiceCard.astro
- **Committed in:** 653ed54

---

**Total deviations:** 3 auto-fixed (3 bugs - plan spec diverged from design guidelines)
**Impact on plan:** All fixes align implementation with design guidelines source of truth. No scope creep.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Both phase 11 plans complete (Negative Stakes + Offering)
- Both sections building cleanly, stagger animations functional
- Ready for phase 12 (Social Proof) or visual verification pass

---
*Phase: 11-negative-stakes-offering*
*Completed: 2026-03-06*
