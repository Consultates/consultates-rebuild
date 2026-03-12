---
phase: 19-homepage-polish
verified: 2026-03-10T22:53:33Z
status: gaps_found
score: 3/4 must-haves verified
gaps:
  - truth: "All three sections render correctly in light mode, dark mode, and on mobile viewports"
    status: partial
    reason: "Dark mode border gradient is invisible on HIW and Why Consultates sections because --border (#1E2333) equals --secondary (#1E2333) in dark mode. The ::before/::after pseudo-elements that draw the top/bottom separator lines produce a gradient from transparent to #1E2333 on a #1E2333 background — zero contrast, invisible."
    artifacts:
      - path: "src/components/sections/HowItWorksSection.astro"
        issue: "border gradient uses var(--border); in dark mode --border == --secondary == #1E2333, making the line invisible"
      - path: "src/components/sections/WhyConsultatesSection.astro"
        issue: "same issue — identical pattern, same token conflict in dark mode"
    missing:
      - "Gradient border pseudo-elements need a color that is visible in dark mode — either a different token (e.g., --muted-foreground at low opacity) or a hardcoded rgba override, or a .dark-scoped style override"
---

# Phase 19: Homepage Polish Verification Report

**Phase Goal:** The homepage middle sections match the visual quality of the hero and stakes sections — no more "soulless" white/cream gaps
**Verified:** 2026-03-10T22:53:33Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | How It Works section has visual depth — texture, color, or motion | PARTIAL | Cream `--secondary` background (#F6F2EB light / #1E2333 dark) + gradient border separators + animated timeline with line-draw and circle-fill motion. No dot texture (bg-dots absent on HIW section). Border gradient invisible in dark mode (see gap). |
| 2 | Why Consultates section is visually distinct — not a plain white/cream box | VERIFIED | `bg-dots` class on section + cream background + gradient borders + heading + subtitle + cards with purple top border accent (`borderTop: '3px solid var(--primary)'`) + staggered Framer Motion entry animation |
| 3 | StakesCTA section feels like a deliberate close — polished with design attention | VERIFIED | `bg-dots` on dark `#0D1117` background + `glow` + `corner-marks` CSS classes + StaggerHeading + supporting paragraph + btn-alive CTA + seamless dark blog carousel below |
| 4 | All three sections render correctly in light mode, dark mode, and on mobile | PARTIAL | Mobile: all three sections have responsive layouts (3-col grid, md:hidden / hidden.md:block). Light mode: treatments visible. Dark mode: border gradient separators on HIW and Why Consultates sections are invisible (--border == --secondary == #1E2333). |

**Score:** 3/4 truths verified (Truth 4 partially fails due to dark mode border gap)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/sections/HowItWorksSection.astro` | Section wrapper with cream bg, gradient borders, heading | VERIFIED | 34 lines. `background: var(--secondary)`. `::before`/`::after` gradient borders. `<h2 class="text-section">`. Islands imported and rendered. |
| `src/components/islands/HowItWorksIsland.tsx` | Animated timeline (line-draw, circle-fill, content reveal) | VERIFIED | 337 lines. Full animation sequence: `lineProgress`, `filledCircles`, `revealedContent`, `ctaVisible` state. IntersectionObserver + MutationObserver. Desktop 3-col + mobile vertical. `reducedMotion` branch. |
| `src/components/sections/WhyConsultatesSection.astro` | Section with cream+dots bg, gradient borders, heading, subtitle | VERIFIED | 37 lines. `class="why-section bg-dots"`. `::before`/`::after` gradient borders. `<h2>` + `<p>` subtitle. `AuthorityCardsIsland` imported and rendered. |
| `src/components/islands/AuthorityCardsIsland.tsx` | Cards with purple top border, tighter stat typography, animation | VERIFIED | 122 lines. `borderTop: '3px solid var(--primary)'`. Stat uses `clamp(1.5rem, 3vw, 2rem)` + `letterSpacing: '-0.02em'`. Framer Motion `whileInView`. Hover state managed. |
| `src/components/sections/StakesCTASection.astro` | Dark section with dot grid, increased padding, supporting paragraph | VERIFIED | 18 lines. `class="bg-dots"` on outer section. `style="background: #0D1117"`. `glow corner-marks` on inner div. Padding `clamp(3rem, 6vw, 5rem)`. Supporting `<p>` element present. |
| `src/pages/index.astro` | Dark blog carousel wrapper with muted white heading | VERIFIED | Carousel wrapper at line 57–63 uses `background: #0D1117` inline style. Heading `style="color: rgba(255,255,255,0.85)"`. `BlogCarouselIsland` receives `posts` prop. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `HowItWorksSection.astro` | `HowItWorksIsland.tsx` | `client:visible` | WIRED | Import at line 2, rendered at line 11 |
| `WhyConsultatesSection.astro` | `AuthorityCardsIsland.tsx` | `client:visible` | WIRED | Import at line 2, rendered at line 14 |
| `StakesCTASection.astro` | `StaggerHeading.tsx` | `client:visible` | WIRED | Import at line 2, rendered at line 8 |
| `StakesCTASection.astro` | `StakesCTAPulse.tsx` | `client:visible` | WIRED | Import at line 3, rendered at lines 11–15 |
| `index.astro` | `StakesCTASection.astro` | scroll-section wrapper | WIRED | Lines 55–63, scroll-section "Get Started" |
| `index.astro` | `HowItWorksSection.astro` | scroll-section | WIRED | Line 52 |
| `index.astro` | `WhyConsultatesSection.astro` | scroll-section | WIRED | Line 54 |
| `bg-dots` CSS class | `global.css` | `.bg-dots { background-image: radial-gradient(...) }` | WIRED | Defined at line 490. `--dot-color` defined in both `:root` (light) and `.dark` (dark). |
| `glow` / `corner-marks` CSS | `global.css` | `.glow`, `.corner-marks` pseudo-elements | WIRED | Defined at lines 496–521. |
| Dark mode gradient border | `--border` token | `background: linear-gradient(..., var(--border) ...)` | BROKEN | In `.dark`, `--border: #1E2333` equals `--secondary: #1E2333`. Gradient to same color as background = invisible line. |

### Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| HP-01: How It Works section visual depth | SATISFIED | Cream bg + animated timeline with line-draw/circle-fill + motion. Note: no dot texture (bg-dots absent) but motion provides sufficient depth. Dark mode border gap is cosmetic. |
| HP-02: Why Consultates section visually distinct | SATISFIED | bg-dots + cream + gradient borders + purple-accented cards + animation |
| HP-03: StakesCTA polished close | SATISFIED | bg-dots on dark + glow + corner-marks + supporting paragraph + btn-alive |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `HowItWorksSection.astro` | 30 | Gradient border uses `var(--border)` — same value as `var(--secondary)` in dark mode | Warning | Separator lines invisible in dark mode |
| `WhyConsultatesSection.astro` | 33 | Same gradient border pattern | Warning | Same invisible border issue in dark mode |

### Human Verification Required

#### 1. Dark Mode — Section Separator Visibility

**Test:** Enable dark mode. Scroll to the How It Works and Why Consultates scroll-sections.
**Expected:** Subtle gradient lines at the top and bottom edges of each section.
**Why human:** Cannot render CSS in code analysis. The token math shows --border == --secondary in dark mode, but CSS specificity or a non-obvious override could change the result.

#### 2. How It Works Animation — Scroll-Snap Context

**Test:** On a desktop browser, scroll through the homepage to the How It Works section. Wait for the timeline animation.
**Expected:** Connecting line draws left-to-right, then circles fill sequentially (01, 02, 03), then content text fades in per step, then CTA appears.
**Why human:** The island uses a MutationObserver watching `data-active` on the scroll-section — can't verify that the GSAP snap system correctly sets this attribute in practice.

#### 3. Mobile Viewports — All Three Sections

**Test:** View the homepage on a mobile viewport (~375px). Check How It Works (vertical stack), Why Consultates (1-col cards), Get Started (dot grid dark CTA).
**Expected:** Each section fills the viewport without overflow or cramped content.
**Why human:** Mobile scroll-snap with 100vh sections can clip content at certain phone heights.

### Gaps Summary

One structural gap found: the gradient border separators on HowItWorksSection and WhyConsultatesSection use `var(--border)` as their visible color. In dark mode, `--border` resolves to `#1E2333`, which is identical to `--secondary` (`#1E2333`). This makes the separator lines visually invisible in dark mode — a transparent gradient going from transparent to the same color as the background.

The gap affects Truth 4 (dark mode rendering) but does not block Truths 1–3. The sections are visually distinct in light mode and the core polish work (backgrounds, textures, headings, card accents, CTA padding) is fully implemented and wired. The three HP requirements are substantively satisfied.

The border gradient issue is cosmetic and isolated — a one-line fix per section (change `var(--border)` to a token with visible contrast on dark backgrounds, such as `rgba(255,255,255,0.08)` or `var(--muted-foreground)` at reduced opacity).

---

_Verified: 2026-03-10T22:53:33Z_
_Verifier: Claude (gsd-verifier)_
