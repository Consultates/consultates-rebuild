# Phase 4: Animation - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning
**Source:** PRD Express Path (PRD.md)

<domain>
## Phase Boundary

Phase 4 layers animation onto the existing static homepage. Two decoupled systems: GSAP ScrollTrigger for page-level scroll/snap behavior, Framer Motion for component-level entrance animations in React islands. The static Astro sections from Phase 3 get animated without breaking existing content.

</domain>

<decisions>
## Implementation Decisions

### GSAP ScrollTrigger (ANIM-01, ANIM-02)
- Single `<script>` in Base.astro layout — NOT inside React islands
- Desktop (≥1024px): scroll-snap with zoom transitions (scale 0.92→1, opacity 0→1, 0.5s power2.out)
- Each `.scroll-section`: `min-height: 100vh; overflow: hidden; position: relative; will-change: transform`
- Snap config: `snapTo: 1`, duration min 0.3 max 0.6, ease power2.inOut
- Mobile (<768px): GSAP ScrollTrigger disabled entirely, sections at `min-height: auto`, no snap
- Tablet (768–1023px): Same as mobile — no snap, natural height

### Framer Motion Variants (ANIM-03)
- Shared variants file: `src/lib/animations.ts`
- `fadeUp`: `{ y: 24, opacity: 0 }` → `{ y: 0, opacity: 1 }`, 0.6s, cubic-bezier(0.25, 0.1, 0.25, 1)
- `scaleIn`: `{ scale: 0.95, opacity: 0 }` → `{ scale: 1, opacity: 1 }`, 0.5s
- `staggerContainer`: staggerChildren 0.15, delayChildren 0.2
- `hoverLift`: y: 0→-4, shadow elevation
- Viewport config: `{ once: true, amount: 0.3 }`
- Mobile override (<768px): `amount: 0.2`, fade distance `y: 16`

### Hero Letter Stagger (ANIM-04)
- Hero island uses `client:load`
- Sequence: t=0 mount → t=1200ms letter stagger begins (30ms/char, 63 chars = 1890ms) → t=3290ms paragraph fadeUp → t=4190ms CTA scaleIn → t=4590ms scroll indicator fade in (opacity 0→0.6)
- Uses `useEffect` + `setTimeout` for 1200ms delay

### Count-Up Animation (ANIM-05)
- Section 4 (negative stakes) — stat "84%" counts from 0→84 over 600ms
- Uses `framer-motion` useMotionValue + useTransform + animate
- Triggered by `whileInView` on stat block
- "12–18 months" is static text with standard fadeUp

### CTA Pulse (ANIM-06)
- Section 10 (Stakes CTA) — after text fadeUp (600ms), CTA does:
- scale: 1→1.05→1, 400ms, easeInOut, delay 600ms
- Continuous pulse after initial animation

### Scroll Indicator (ANIM-07)
- Mouse outline: 30×50px, 2px border, border-radius 15px, bottom 2rem center, opacity 0.6
- Inner dot: 6×6px circle with scroll-bob keyframes (translateY 0→12px, 2s infinite ease-in-out)
- Disappears via ScrollTrigger when #section-trust enters at top 80%

### Reduced Motion (ANIM-08)
- Detection: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- GSAP: Don't initialize ScrollTrigger. Sections remain min-height: 100vh, no snap, no scale transforms
- Framer Motion: All durations 0, all transforms removed, content at final visible state
- No letter stagger, no count-up — immediate display
- Scroll indicator: visible but `animation: none`
- Reduced motion flag checked before GSAP init AND passed as prop to React islands

### Per-Section Animation Assignments
- Trust bar (§4.3): React island `client:visible`, fadeUp, viewport once amount 0.3
- Negative stakes (§4.4): left column fadeUp, right column fadeUp delay 0.2, source line fadeUp delay 0.4
- Offering (§4.5): staggerContainer on grid, each card fadeUp
- Use cases (§4.6): each block fadeUp, stagger 0.2
- How it works (§4.7): staggerContainer on grid, each step fadeUp
- Social proof (§4.8): quote fadeUp, name/title fadeUp delay 0.2
- Why Consultates (§4.9): staggerContainer on grid, each column fadeUp
- Stakes CTA (§4.10): headline fadeUp, CTA scaleIn delay 0.6 + pulse
- Transitional CTAs (§4.11): staggerContainer on grid, each card fadeUp stagger 0.15

### Claude's Discretion
- How to structure the GSAP script in Base.astro (inline vs external, load timing)
- Whether to create one React island per section or group related sections
- File naming for animated React island components
- How to pass reduced-motion prop from GSAP script context to React islands
- Whether to use a shared hook for reduced motion detection across islands

</decisions>

<specifics>
## Specific Ideas

- Section IDs are canonical and already in the static HTML from Phase 3: `#section-hero`, `#section-trust`, `#section-stakes`, `#section-offering`, `#section-cases`, `#section-how`, `#section-proof`, `#section-why`, `#section-cta`, `#section-transitional`
- GSAP and Framer Motion must NOT communicate — no custom events, no shared state
- Hero uses `client:load` (animates on page load); all other sections use `client:visible`
- CSS transitions for buttons/links/nav/focus/theme-toggle are Tailwind utilities only, no library needed (may already exist from Phase 2)
- Packages needed: `gsap` ^3.12, `framer-motion` ^12.4

</specifics>

<deferred>
## Deferred Ideas

None — PRD covers phase scope

</deferred>

---

*Phase: 04-animation*
*Context gathered: 2026-03-05 via PRD Express Path*
