---
phase: 04-animation
verified: 2026-03-05T11:30:00Z
status: passed
score: 11/11 must-haves verified
re_verification: false
human_verification:
  - test: "Scroll snap and zoom on desktop"
    expected: "Homepage sections snap one at a time on scroll; each section zooms in from scale 0.92 to 1 as it enters"
    why_human: "GSAP scroll behavior requires live browser interaction to verify"
  - test: "Hero letter stagger sequence"
    expected: "After 1200ms delay, headline letters stagger in at 30ms/char, then paragraph fades up, then CTA scales in, then scroll indicator fades in"
    why_human: "Sequential animation timing requires live browser observation"
  - test: "84% count-up stat"
    expected: "On scroll to the Negative Stakes section, the '84%' text animates from 0 to 84 over 600ms"
    why_human: "Viewport-triggered count animation requires live browser interaction"
  - test: "Stakes CTA pulse"
    expected: "CTA button in dark section scales in with 600ms delay then pulses subtly (scale 1 to 1.05 to 1) every ~2.4 seconds"
    why_human: "Continuous animation state requires live browser observation"
  - test: "Mobile/tablet natural scroll"
    expected: "On viewport width < 1024px, sections stack at natural height with no scroll snap"
    why_human: "Responsive behavior requires device/emulator testing"
  - test: "Reduced motion"
    expected: "With prefers-reduced-motion: reduce set in OS/browser, all content is immediately visible — no stagger, no fadeUp, no GSAP scroll snap, no bob animation"
    why_human: "Requires OS/browser reduced motion toggle to test"
---

# Phase 4: Animation Verification Report

**Phase Goal:** The site feels alive — scroll behavior, entrance animations, and micro-interactions layer onto the existing static content without breaking it
**Verified:** 2026-03-05T11:30:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|----------|
| 1  | Shared FM variants exist in a central file for all islands to import | VERIFIED | `src/lib/animations.ts` — 80 lines, exports fadeUp, fadeUpMobile, scaleIn, staggerContainer, hoverLift, viewportConfig, viewportConfigMobile, useReducedMotion, getVariant |
| 2  | Hero headline animates with letter stagger after 1200ms delay | VERIFIED | HeroIsland.tsx lines 33-121: animationPhase state, 1200ms setTimeout, motion.h1 with stagger 0.03s, motion.span per char |
| 3  | Hero paragraph fades up after stagger; CTA scales in after paragraph | VERIFIED | HeroIsland.tsx lines 123-148: motion.p with paragraphDelay, motion.div with ctaDelay |
| 4  | Reduced motion — all hero content visible immediately | VERIFIED | HeroIsland.tsx lines 58-86: reducedMotion branch renders static markup, no motion elements |
| 5  | 84% stat counts up from 0 when NegativeStakes section enters viewport | VERIFIED | CountUpStat.tsx: IntersectionObserver threshold 0.3, animate(motionValue, target, 600ms); NegativeStakes.astro uses `<CountUpStat client:visible target={84} suffix="%" .../>` |
| 6  | Stakes CTA button pulses continuously after initial animation | VERIFIED | StakesCTAPulse.tsx: scaleIn whileInView, onAnimationComplete sets pulsing=true, then animate scale [1,1.05,1] repeat Infinity repeatDelay 2 |
| 7  | All homepage sections animate on viewport entry with fadeUp patterns | VERIFIED | All 9 non-hero sections (TrustBar, NegativeStakes, OfferingSection, UseCasesSection, HowItWorksSection, SocialProofSection, WhyConsultatesSection, StakesCTASection, TransitionalCTAsSection) use SectionAnimator client:visible |
| 8  | Scroll indicator disappears when trust bar enters viewport | VERIFIED | Base.astro GSAP: ScrollTrigger on #section-trust start "top 80%", gsap.to([data-scroll-indicator], {opacity:0}); HeroIsland has data-scroll-indicator on both render branches |
| 9  | Desktop (>=1024px) scroll snaps section by section with zoom transitions | VERIFIED | Base.astro: isDesktop matchMedia gate, sections.slice(1) forEach gsap.fromTo scale 0.92->1, ScrollTrigger.create snap |
| 10 | Mobile/tablet (<1024px) sections at natural height — no GSAP | VERIFIED | global.css: @media (max-width:1023px) .scroll-section { min-height: auto; will-change: auto }; Base.astro: if (isDesktop && !prefersReducedMotion) guards all GSAP |
| 11 | GSAP and Framer Motion are fully decoupled | VERIFIED | No shared state or custom events; only bridge is data-scroll-indicator attribute (DOM, not React state) |

**Score:** 11/11 truths verified

### Required Artifacts

| Artifact | Plan | Status | Details |
|----------|------|--------|---------|
| `src/lib/animations.ts` | 04-01 | VERIFIED | 80 lines; all 7 exports present (fadeUp, fadeUpMobile, scaleIn, staggerContainer, hoverLift, viewportConfig(+Mobile), useReducedMotion, getVariant) |
| `src/components/islands/HeroIsland.tsx` | 04-01 | VERIFIED | 166 lines; letter stagger sequence, reducedMotion branch, data-scroll-indicator on both branches |
| `src/components/islands/AnimatedSection.tsx` | 04-01 | VERIFIED | 40 lines; exports AnimatedSection, uses useReducedMotion + getVariant + viewportConfig |
| `src/components/islands/CountUpStat.tsx` | 04-02 | VERIFIED | 74 lines; IntersectionObserver, framer-motion animate(), useReducedMotion, displays target immediately if reducedMotion |
| `src/components/islands/StakesCTAPulse.tsx` | 04-02 | VERIFIED | 72 lines; scaleIn whileInView, onAnimationComplete pulse, useReducedMotion, whileHover |
| `src/components/islands/SectionAnimator.tsx` | 04-02 | VERIFIED | 67 lines; fadeUp/stagger variants, delay prop, reducedMotion static fallback, client:visible compatible |
| `src/layouts/Base.astro` | 04-03 | VERIFIED | Contains GSAP ScrollTrigger import and init; desktop+!reducedMotion gate; zoom on sections.slice(1); snap; scroll indicator fade |
| `src/styles/global.css` | 04-03 | VERIFIED | .scroll-section (min-height 100vh, overflow hidden, will-change transform); @media <=1023px reset; @keyframes scroll-bob; .scroll-bob-dot; @media prefers-reduced-motion |
| `src/pages/index.astro` | 04-03 | VERIFIED | All 10 homepage sections wrapped in `<div class="scroll-section">` |
| `src/components/sections/HeroSection.astro` | 04-01 | VERIFIED | Static h1/p/Button/ScrollIndicator replaced by `<HeroIsland client:load ...>` |
| `src/components/sections/NegativeStakes.astro` | 04-02 | VERIFIED | CountUpStat client:visible target=84; SectionAnimator client:visible delay=0.2 and delay=0.4 |
| `src/components/sections/StakesCTASection.astro` | 04-02 | VERIFIED | SectionAnimator on headline; StakesCTAPulse client:visible |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| HeroIsland.tsx | src/lib/animations.ts | import useReducedMotion | WIRED | Line 3: `import { useReducedMotion } from '../../lib/animations'` |
| HeroSection.astro | HeroIsland.tsx | client:load | WIRED | Line 11-17: `<HeroIsland client:load headline=... paragraph=... ctaHref=... ctaText=.../>` |
| CountUpStat.tsx | src/lib/animations.ts | import useReducedMotion | WIRED | Line 3: `import { useReducedMotion } from '../../lib/animations'` |
| SectionAnimator.tsx | src/lib/animations.ts | import variants + viewport | WIRED | Lines 3-8: imports useReducedMotion, getVariant, fadeUp, viewportConfig |
| NegativeStakes.astro | CountUpStat.tsx | client:visible | WIRED | Line 14: `<CountUpStat client:visible target={84} suffix="%" label=.../>` |
| StakesCTASection.astro | StakesCTAPulse.tsx | client:visible | WIRED | Line 14-18: `<StakesCTAPulse client:visible href=... text=.../>` |
| Base.astro | GSAP ScrollTrigger | inline script | WIRED | Lines 46-47: `import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger'` |
| Base.astro | #section-trust | GSAP trigger | WIRED | Line 90: `trigger: '#section-trust'` — id confirmed in TrustBar.astro |
| Base.astro | [data-scroll-indicator] | GSAP querySelector | WIRED | Line 88: `document.querySelector('[data-scroll-indicator]')` — attribute confirmed on both render branches in HeroIsland.tsx |
| Base.astro | prefers-reduced-motion | matchMedia before GSAP init | WIRED | Lines 53-55: `const prefersReducedMotion = window.matchMedia(...).matches; if (isDesktop && !prefersReducedMotion)` |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| ANIM-01 | 04-03 | GSAP ScrollTrigger scroll-snap with zoom transitions on desktop (>=1024px) | SATISFIED | Base.astro: isDesktop gate, gsap.fromTo scale 0.92->1, ScrollTrigger snap per section |
| ANIM-02 | 04-03 | GSAP disabled on tablet/mobile — sections at natural height | SATISFIED | global.css @media max-width:1023px resets scroll-section; Base.astro only runs GSAP if isDesktop |
| ANIM-03 | 04-01 | Framer Motion fadeUp/scaleIn/staggerContainer variants for component entrances | SATISFIED | animations.ts exports all three; SectionAnimator and island components consume them |
| ANIM-04 | 04-01 | Hero letter stagger sequence (1200ms hold -> stagger -> fadeUp -> CTA scaleIn -> indicator) | SATISFIED | HeroIsland.tsx: full sequence implemented with timing calculations (headlineEndDelay, paragraphDelay, ctaDelay, scrollDelay) |
| ANIM-05 | 04-02 | Count-up animation from 0 to 84 on viewport entry | SATISFIED | CountUpStat.tsx: IntersectionObserver + animate(motionValue, 84, 600ms); NegativeStakes.astro wired with client:visible |
| ANIM-06 | 04-02 | CTA pulse animation on Stakes CTA section | SATISFIED | StakesCTAPulse.tsx: onAnimationComplete -> setPulsing(true) -> scale [1,1.05,1] repeat Infinity |
| ANIM-07 | 04-02/03 | Scroll indicator with bob animation, fades on scroll | SATISFIED | scroll-bob-dot CSS class applied in HeroIsland; GSAP ScrollTrigger fades [data-scroll-indicator] when #section-trust enters |
| ANIM-08 | 04-01/03 | Reduced motion support — all animations disabled, content visible immediately | SATISFIED | useReducedMotion() hook in all islands; getVariant() returns empty variant; Base.astro GSAP gated by !prefersReducedMotion; CSS [data-scroll-indicator] animation:none !important |

All 8 ANIM requirements satisfied. No orphaned requirements found.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/components/islands/HeroIsland.tsx` | 12 | `const ease = [0.25, 0.1, 0.25, 1]` typed as `number[]`, passed to FM `transition.ease` | Warning | TypeScript error TS2322 — `number[]` not assignable to `Easing` type. Vite build succeeds; runtime behavior correct (FM accepts number arrays). Fix: cast as `const` tuple or import `Easing` type. |
| `src/components/islands/StakesCTAPulse.tsx` | 50,57 | `transition` prop specified twice — line 50 and spread at line 57 | Warning | TypeScript TS2783 — duplicate prop. Runtime behavior is intentional (initial delay overridden by pulse transition when pulsing=true) but type-unsafe. |

No blocker anti-patterns. Both are TypeScript strictness warnings; runtime behavior is functionally correct and build passes.

Note: `AnimatedSection.tsx` uses `React.ComponentType` without importing `React` (line 27). This is not flagged by TSC in the current config but could be an issue in stricter environments. The component IS functional (Astro/Vite provides the JSX transform).

### Human Verification Required

### 1. Scroll Snap and Zoom Transitions

**Test:** Open the homepage on a desktop browser (viewport >= 1024px). Scroll down slowly.
**Expected:** Page snaps section by section. Each non-hero section zooms in from slightly scaled (0.92) to full size as it enters.
**Why human:** GSAP scroll behavior requires live browser interaction.

### 2. Hero Letter Stagger Sequence

**Test:** Open the homepage and observe the hero on load.
**Expected:** After approximately 1.2 seconds, the headline letters stagger in left-to-right at 30ms per character. Then the paragraph fades up. Then the CTA button scales in. Then the scroll indicator fades in at bottom center and bobs.
**Why human:** Sequential animation timing requires live browser observation.

### 3. 84% Count-Up Stat

**Test:** Scroll down to the dark statistics section.
**Expected:** The "84%" number animates up from 0 to 84 over approximately 600ms as the section enters the viewport.
**Why human:** Viewport-triggered count animation requires live browser interaction.

### 4. Stakes CTA Pulse

**Test:** Scroll to the dark "84% of people haven't started" section.
**Expected:** The "Book a Free Call" button appears with a scale-in animation (600ms delay after section enters). After it appears, it subtly pulses (scale 1 to 1.05 and back) every approximately 2.4 seconds, continuously.
**Why human:** Continuous animation state requires live browser observation.

### 5. Mobile and Tablet Natural Scroll

**Test:** Open the homepage at viewport width < 1024px (or use browser devtools to emulate mobile).
**Expected:** Sections stack normally, no scroll snap, sections at auto height (not 100vh).
**Why human:** Responsive behavior requires device or emulator testing.

### 6. Reduced Motion Accessibility

**Test:** Enable "Reduce Motion" in OS settings (macOS: System Settings > Accessibility > Motion; or browser devtools emulation). Open the homepage.
**Expected:** All hero content is immediately visible with no animation. No section entrance animations. No scroll snap. Scroll indicator appears static (no bob). Count-up displays 84 immediately.
**Why human:** Requires OS/browser reduced motion toggle to activate.

### Build Verification

Build: PASSED (`pnpm build` completes in 9.38s, 1 page built)
All 6 commit hashes documented in summaries confirmed in git log.

---

_Verified: 2026-03-05T11:30:00Z_
_Verifier: Claude (gsd-verifier)_
