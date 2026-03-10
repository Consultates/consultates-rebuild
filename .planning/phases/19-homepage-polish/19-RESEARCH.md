# Phase 19: Homepage Polish - Research

**Researched:** 2026-03-10
**Domain:** CSS/Astro/React visual design within an established design system
**Confidence:** HIGH

## Summary

This phase targets three homepage scroll-snap sections (How It Works #4, Why Consultates #6, Get Started #7) that currently feel flat and "soulless" compared to the cinematic hero and stakes sections. The codebase already has every design tool needed — dark backgrounds, dot grids, radial glows, corner marks, card patterns, animation islands. The problem is not missing capabilities; it is that these three sections use none of them.

The research examined what the "good" sections do (hero, stakes, offerings, social proof), what the "bad" sections do (plain white/cream with minimal treatment), and what the design system offers. The gap is clear and the fix is additive — apply existing patterns to understyled sections.

**Primary recommendation:** Elevate each section using existing design system textures (bg-dots, glow, corner-marks, dark/cream alternation) and visual anchors (icons, cards, number nodes) without introducing new libraries or patterns. The design doc already marks all three as "NOT FINISHED" — there are no GOSPEL constraints to violate, only patterns to follow.

## Standard Stack

No new libraries needed. Everything required already exists:

### Core (already installed)
| Library | Purpose | Where Used |
|---------|---------|------------|
| Framer Motion | Component animation in React islands | HowItWorksIsland, AuthorityCardsIsland, StakesCTAPulse, StaggerHeading |
| GSAP + ScrollTrigger | Page-level scroll-snap (DO NOT TOUCH) | Base.astro |
| Tailwind CSS 4 | Utility styling | global.css @theme block |
| Astro 5 | Page/component framework | All .astro files |
| @phosphor-icons/react | Duotone icons in React | Islands |
| @phosphor-icons/web | Duotone icons in Astro | CDN in Base.astro |

### Existing CSS Utilities (in global.css)
| Utility | What It Does | Currently Used By |
|---------|-------------|-------------------|
| `.bg-dots` | 24px dot grid via radial-gradient | Hero section |
| `.glow` | 600x600px centered radial gradient pseudo-element | StakesCTA section |
| `.corner-marks` | 24x24px L-shaped purple border marks at corners | StakesCTA section |
| `.reveal` / `.reveal-scale` | Opacity + transform transition classes | Not used on homepage |
| `var(--card-shadow)` / `var(--card-shadow-hover)` | Elevation shadows | AuthorityCardsIsland |
| `var(--section-py)` | Consistent section vertical padding | OfferingSection, UseCasesSection |

### Installation

```bash
# No installation needed — all dependencies exist
```

## Architecture Patterns

### Current Section Analysis

#### What the "good" sections do differently

**Hero (section 0):**
- Dark background (`--hero-bg: #0D1117`)
- Purple silk video background with overlay
- Radial purple glow (800x500px `::before`)
- Dot grid overlay (32px, `::after`)
- Letter-stagger animation (HeroIsland)
- Typewriter paragraph
- btn-alive CTA with glow pulse

**Stakes (section 1):**
- Cream (`--secondary`) top half with `.glow` centered
- SVG stroke-draw stat numbers with sequential typewriter labels
- White bottom half with word-stagger pull quote + animated SVG doodle
- Two contrasting backgrounds in one section
- MutationObserver + IntersectionObserver for scroll-section activation

**Offerings (section 2):**
- Cream background (`--secondary`)
- Subtle top/bottom gradient borders (linear-gradient fade-in/out)
- Sequential 3-card reveal: label fade → title letter-stagger → description typewriter → CTA pulse
- Cards with `--card-shadow`, hover elevation, mono labels

**Social Proof (section 5):**
- Two-part section: cream ticker + white carousel
- Film-strip animation (zoom-out → wind → zoom-in)
- Reference photos, company logos

#### What the "bad" sections currently do

**How It Works (section 4):**
- NO section-level background color — inherits `var(--background)` (white)
- NO heading — jumps straight into the timeline
- Plain white container with padding
- 48px numbered circles with border, connecting line
- Sequential circle-fill + content reveal animation (good)
- CTA at bottom (plain `btn-alive`, not on-dark)
- **Missing:** Section heading, background treatment, dot grid or glow, dark/cream differentiation

**Why Consultates (section 6):**
- NO background treatment — inherits default white
- NO section heading — just AuthorityCardsIsland
- Three plain cards on white with card shadows
- Cards have stat numbers (serif, purple) + title + description
- Framer Motion `whileInView` fade-up per card
- **Missing:** Section heading, background color, any texture or visual anchor, narrative framing

**Get Started / StakesCTA (section 7):**
- Dark background (#0D1117) — good
- Has `.glow` and `.corner-marks` — good
- StaggerHeading with letter stagger — good
- StakesCTAPulse CTA — good
- Max-width 960px, centered text
- Blog carousel below on cream (`bg-secondary`)
- **Issue:** Padding feels tight (clamp 2rem-3rem vs hero's 6rem-10rem), no supporting paragraph, transition from StakesCTA to blog carousel is abrupt (cream section appended inside the dark section's scroll-section div)

### Pattern 1: Section Background Alternation
**What:** The design doc mandates cream/white alternation for visual rhythm.
**Current flow:** Hero(dark) → Stakes(cream+white) → Offerings(cream) → UseCases(cream) → HIW(white) → SocialProof(cream+white) → WhyConsultates(white) → GetStarted(dark+cream)
**Problem:** HIW and WhyConsultates are both on plain white — no contrast, no rhythm.
**Fix:** Give HIW a cream (`--secondary`) or dark background. WhyConsultates could use cream or a dark treatment.

### Pattern 2: Section Heading Convention
**What:** Every finished section has a heading: "Three ways we help" (Offerings), "What this looks like in practice" (UseCases), "What clients say" (service pages). HIW and WhyConsultates have NO section heading.
**Fix:** Add headings using `text-section` class with `font-serif`.

### Pattern 3: Dark Section Treatment
**What:** The Dark CTA pattern (GOSPEL) uses `#0D1117` bg + `.glow` + `.corner-marks` + `StaggerHeading` + `StakesCTAPulse`.
**Where applicable:** StakesCTA already follows this. Could also apply a dark variant to HIW or WhyConsultates for visual punch.

### Anti-Patterns to Avoid
- **No eyebrow labels** — small uppercase text above headings is banned (Anti-Slop Rule 01)
- **No generic fade-up** — homepage sections must NOT use SectionAnimator or translateY fade-up (Anti-Slop Rule 02, SectionAnimator DEPRECATED)
- **No gradient buttons** — brand rule, use btn-alive only
- **No transform-on-hover except btn-alive** — card translateY(-4px) is the only other allowed hover transform (Anti-Slop Rule 03)
- **Don't change Gary's copy** — use PRD text exactly (Anti-Slop Rule 10)
- **DO NOT TOUCH GSAP scroll-snap** — GOSPEL rule

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Section background texture | Custom SVG patterns | `.bg-dots` CSS class | Already exists in global.css, matches hero |
| Centered radial glow | Custom gradient divs | `.glow` CSS class | Already exists, creates pseudo-element |
| Corner decorations | Custom border tricks | `.corner-marks` CSS class | Already exists, matches StakesCTA |
| Scroll-triggered animation | Custom IntersectionObserver | Framer Motion `whileInView` or `data-reveal` + IO script | Both already used throughout codebase |
| CTA on dark sections | New button component | `StakesCTAPulse` + `btn-alive--on-dark` | Already exists, is GOSPEL |
| Letter-stagger heading | New heading animation | `StaggerHeading` island | Already exists, is GOSPEL |
| Card patterns | New card styles | Existing `--card`, `--card-shadow`, `--card-radius` tokens | Consistent with AuthorityCards, OfferingCards |

**Key insight:** The entire design system toolkit already exists. This phase is about composition, not construction. Every texture, animation, and pattern needed is already built and tested.

## Common Pitfalls

### Pitfall 1: Breaking Scroll-Snap Section Heights
**What goes wrong:** Changing padding or adding content makes a scroll-section taller than 100vh, breaking the snap behavior on desktop.
**Why it happens:** Each `.scroll-section` has `min-height: 100vh`. Content must fit within that viewport.
**How to avoid:** Test all changes at multiple viewport sizes. Use `clamp()` for padding. On desktop, the section must fit in viewport.
**Warning signs:** Content clipping, double-snaps, sections that scroll internally.

### Pitfall 2: Visibility Hidden in Inactive Sections
**What goes wrong:** Adding IntersectionObserver-based animations that fire at wrong times.
**Why it happens:** Desktop scroll-snap uses `visibility: hidden` on inactive section children (`.scroll-section:not([data-active]) > *`). This prevents `whileInView` from firing. The existing islands (HowItWorksIsland, StrokeDrawStats) work around this with MutationObserver watching for `data-active` attribute.
**How to avoid:** Any new React island must use the MutationObserver + data-active pattern (see HowItWorksIsland lines 46-81 for the reference implementation). Alternatively, use the existing pattern where the island's root element is observed by both MutationObserver (for data-active) and IntersectionObserver (for mobile).
**Warning signs:** Animations playing while section is off-screen, animations not playing when section is active.

### Pitfall 3: Introducing Slop Patterns
**What goes wrong:** Adding eyebrow labels, gradient buttons, glassmorphism, generic fade-up animations.
**Why it happens:** Default AI coding patterns produce these automatically.
**How to avoid:** Check every change against Anti-Slop Rules 01-10 in the website design doc.
**Warning signs:** Any `text-transform: uppercase` small text above headings, any `translateY` on non-card elements, any gradient backgrounds.

### Pitfall 4: SectionAnimator Usage on Homepage
**What goes wrong:** Using the deprecated SectionAnimator for content reveals.
**Why it happens:** OfferingSection and UseCasesSection still use it (legacy). New code should NOT.
**How to avoid:** Use `data-reveal` + IntersectionObserver script, or Framer Motion `whileInView` in React islands. SectionAnimator is explicitly DEPRECATED in the design doc.
**Warning signs:** Import of SectionAnimator in new code.

### Pitfall 5: Dark Mode Regression
**What goes wrong:** New backgrounds or colors look wrong in dark mode.
**Why it happens:** Hard-coding hex values instead of using CSS custom properties.
**How to avoid:** Always use `var(--secondary)`, `var(--background)`, `var(--foreground)`, etc. These automatically adapt between light and dark themes. Only exception: dark sections that are always dark (like CTA) use fixed `#0D1117`.
**Warning signs:** Hard-coded colors that aren't theme-aware, sections that look identical in light/dark mode when they shouldn't.

### Pitfall 6: Blog Carousel Section Inside StakesCTA
**What goes wrong:** The "Not ready to book? Start here." blog carousel is inside the GetStarted scroll-section div alongside the dark StakesCTA. Changing StakesCTA padding affects the blog section layout.
**Why it happens:** Both are inside one scroll-section wrapper (index.astro lines 55-63).
**How to avoid:** Be aware that changes to the dark CTA area affect the total section height available for the blog carousel below. These two sub-sections share one viewport-height scroll-section.

## Code Examples

### Reference: Viewport Detection Pattern (for React islands in scroll-snap sections)
```typescript
// Source: src/components/islands/HowItWorksIsland.tsx
// This pattern is required for any React island inside a homepage scroll-section.
// It combines MutationObserver (for desktop data-active attribute)
// with IntersectionObserver (for mobile natural scroll).

useEffect(() => {
  if (!containerRef.current) return;
  const scrollSection = containerRef.current.closest('.scroll-section');

  if (scrollSection) {
    const checkActive = () => scrollSection.hasAttribute('data-active');
    if (checkActive()) setIsActive(true);

    const mutObs = new MutationObserver(() => {
      const nowActive = checkActive();
      setIsActive(nowActive);
      if (!nowActive) {
        // Reset animation state
      }
    });
    mutObs.observe(scrollSection, { attributes: true, attributeFilter: ['data-active'] });

    const intObs = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Reset animation state
        }
      },
      { threshold: 0.15 },
    );
    intObs.observe(containerRef.current);
    return () => { mutObs.disconnect(); intObs.disconnect(); };
  }
  // Fallback: IO only (for non-homepage contexts)
}, []);
```

### Reference: Dark Section Anatomy
```astro
<!-- Source: src/components/sections/StakesCTASection.astro + service page Dark CTAs -->
<section style="background: #0D1117;">
  <div class="glow corner-marks max-w-[960px] mx-auto text-center"
       style="padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem); --corner-color: rgba(139,108,199,0.4);">
    <StaggerHeading client:visible text="..." className="text-section" style={{ color: '#FFFFFF' }} />
    <div class="mt-8">
      <StakesCTAPulse client:visible href={TIDYCAL_URL} text="Book a Free Call" />
    </div>
  </div>
</section>
```

### Reference: Cream Section with Gradient Borders
```astro
<!-- Source: src/components/sections/OfferingSection.astro -->
<section class="offering-section">
  <!-- ... content ... -->
</section>
<style>
  .offering-section {
    padding: var(--section-py) 0;
    background: var(--secondary);
    position: relative;
  }
  .offering-section::before,
  .offering-section::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
  }
  .offering-section::before { top: 0; }
  .offering-section::after { bottom: 0; }
</style>
```

### Reference: Service Page HIW (static, no React island needed)
```astro
<!-- Source: src/pages/services/ai-advisory-for-leaders.astro -->
<section class="svc-section bg-secondary">
  <div class="svc-container">
    <h2 class="text-section mb-12">How it works</h2>
    <div class="hiw-steps" data-stagger>
      <div class="hiw-step" data-reveal>
        <div class="hiw-node">1</div>
        <div class="hiw-content">
          <h3 class="text-sub font-serif mb-2">We talk</h3>
          <p class="text-body text-muted-foreground">...</p>
        </div>
      </div>
      <!-- more steps -->
    </div>
  </div>
</section>
```

## Section-by-Section Analysis

### HP-01: How It Works (section 4)

**Current state:**
- White background, no heading, HowItWorksIsland renders 3-step horizontal timeline (desktop) / vertical stack (mobile)
- Good: has sequential animation (line draw → circle fill → content reveal)
- Bad: no section heading, no background color, no texture, floats in white void

**What the design doc says:**
- Service pages use `bg-secondary` for HIW sections
- HIW uses `.hiw-steps` with numbered nodes, connecting line, `data-reveal`
- The homepage version is a React island (HowItWorksIsland) with more complex animation

**Design system tools available:**
- `var(--secondary)` background (cream) — matches service page HIW
- Dot grid (`.bg-dots`) for subtle texture
- Glow (`.glow`) for warmth
- Gradient border separators (top/bottom)
- Section heading in `text-section font-serif`

**Recommended approach:**
1. Add section heading: "How it works" (matching service pages and PRD)
2. Switch to cream (`var(--secondary)`) background
3. Add subtle gradient border separators (same as OfferingSection)
4. Consider adding `.bg-dots` for texture depth
5. Keep the existing HowItWorksIsland animation — it works well, just needs context

### HP-02: Why Consultates (section 6)

**Current state:**
- White background, no heading, AuthorityCardsIsland renders 3 cards
- Cards have stat numbers (purple serif), title, description
- Framer Motion `whileInView` fade-up per card (staggered 0.12s)
- No visual distinction from any other white section

**What the design doc says:**
- Marked as "NEEDS COMPLETE REDO"
- It's the "authority" section in the StoryBrand framework — proof that Gary is credible
- No specific GOSPEL pattern prescribed yet

**Design system tools available:**
- Dark background treatment (like hero/CTA) — would make this visually distinctive
- Dot grid + glow + corner marks (dark section toolkit)
- Card styles adapt to dark mode via CSS custom properties
- Icon containers (cream bg + purple border, per Anti-Slop Rule 04)
- Timeline pattern (used on About page)

**Recommended approach:**
This section needs the most thought. Options:
1. **Dark treatment** — match hero/stakes energy. Dark bg + dot grid + glow. Cards on dark with `--card` background (adapts in dark mode). Would break the cream/white monotony dramatically.
2. **Cream with visual anchors** — `bg-secondary` with icon circles, corner marks, or a connecting visual element between cards.
3. **Split treatment** — heading area dark, cards area cream (like Stakes section does cream+white).

The stat numbers ("20 years", "15 years", "Now") are the most visually interesting element. They could be amplified — larger, stroke-draw style (like Stakes stats), or given icon companions.

### HP-03: Get Started / StakesCTA (section 7)

**Current state:**
- Dark background (#0D1117) with `.glow` and `.corner-marks` — good foundation
- StaggerHeading + StakesCTAPulse — correct pattern
- Max-width 960px, centered text
- Tight padding: `clamp(2rem, 4vw, 3rem)` (vs service page CTA: `clamp(4rem, 8vw, 8rem)`)
- Blog carousel (`bg-secondary`) appended below within same scroll-section
- No supporting paragraph between heading and CTA

**What the design doc says (GOSPEL):**
- Dark CTA uses `#0D1117` bg + `.glow` + `.corner-marks` + `StaggerHeading` + `StakesCTAPulse`
- Optional supporting paragraph
- Service pages use `max-w-[800px]`, homepage already widened to 960px

**Design system tools available:**
- Everything already applied — just needs tuning
- Supporting paragraph (hero-muted color, text-body-lg)
- Better spacing between CTA and blog carousel

**Recommended approach:**
1. Increase vertical padding to match service page CTAs: `clamp(4rem, 8vw, 6rem)` or similar
2. Add a supporting paragraph below the heading (e.g., "15-minute discovery call. No pitch, just clarity." — this text is already in the design doc Dark CTA demo)
3. Add `.bg-dots` to the dark CTA for texture consistency with the hero
4. Improve the transition to the blog carousel — visual separator, breathing room
5. Consider whether blog carousel should remain here or move to its own section (constraint: scroll-section count is GOSPEL, so it stays in this section)

## Open Questions

1. **Should Why Consultates go dark?**
   - A dark treatment would be the most dramatic improvement but changes the page's rhythm (currently: dark-cream-cream-cream-cream-cream/white-white-dark+cream)
   - With dark WHY section: dark-cream-cream-cream-cream-cream/white-DARK-dark+cream (two adjacent dark sections)
   - Recommendation: research whether a cream/textured approach could be equally effective, or whether dark with clear visual differentiation from Get Started works
   - **This is a design decision for Gary**

2. **WhyConsultates heading text?**
   - PRD just says "Why Consultates?" as the section name
   - The heading could be "Why Consultates?" or something more narrative
   - **Copy decision for Gary** (Anti-Slop Rule 10: don't change Gary's copy)

3. **HowItWorks heading text?**
   - Service pages use "How it works"
   - PRD uses "How It Works"
   - Either works — use PRD capitalization
   - Less ambiguous, but still confirm with Gary

4. **Blog carousel position in GetStarted section**
   - Currently the dark CTA and blog carousel share one scroll-section
   - The design doc shows section 8 as "Get Started" containing both
   - Changing this would mean adding a scroll-section (violates GOSPEL)
   - The polish should work within this constraint

## Sources

### Primary (HIGH confidence)
- `src/components/sections/HowItWorksSection.astro` — current HIW implementation
- `src/components/islands/HowItWorksIsland.tsx` — current HIW island (339 lines)
- `src/components/sections/WhyConsultatesSection.astro` — current WhyConsultates implementation
- `src/components/islands/AuthorityCardsIsland.tsx` — current authority cards island (122 lines)
- `src/components/sections/StakesCTASection.astro` — current CTA implementation
- `src/components/islands/StakesCTAPulse.tsx` — CTA button island
- `src/components/islands/StaggerHeading.tsx` — letter-stagger heading island
- `src/styles/global.css` — full design system CSS with all available textures/utilities
- `~/Development/consultates-brand-guidelines/consultates/guidelines/website-design-v3.html` — authoritative design doc with GOSPEL rules
- `PRD.md` — approved copy for all sections
- `READMEFIRST.md` — honest assessment of "soulless middle" problem

### Secondary (HIGH confidence)
- `src/components/sections/HeroSection.astro` — the visual benchmark (what "good" looks like)
- `src/components/sections/NegativeStakes.astro` — stakes benchmark
- `src/components/islands/StrokeDrawStats.tsx` — stakes animation reference (dual-viewport detection pattern)
- `src/components/sections/OfferingSection.astro` — cream section reference with gradient borders
- `src/pages/services/ai-advisory-for-leaders.astro` — service page HIW reference (static version)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries needed, everything exists
- Architecture: HIGH — codebase fully read, all patterns documented
- Pitfalls: HIGH — identified from actual codebase patterns and READMEFIRST warnings
- Design direction: MEDIUM — specific visual choices (dark vs cream for WHyConsultates) need Gary's input

**Research date:** 2026-03-10
**Valid until:** No expiry — this is internal codebase analysis, not library research
