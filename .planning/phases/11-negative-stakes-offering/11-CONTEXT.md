# Phase 11: Negative Stakes + Offering - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Visual redesign of the Negative Stakes (problem) and Offering (solution) sections on the homepage. Both sections already exist as v1 Astro components — this is a visual upgrade with new animation, layout changes, and a third stat. Copy stays as-is except where new content is added (third stat, pull quote). No new dependencies.

</domain>

<decisions>
## Implementation Decisions

### Negative Stakes — Background
- **Light background** — keep current `bg-secondary` (beige/warm). NOT dark. Site is converting to dark theme page by page; this phase stays light.
- Radial purple glow still applies (subtle, centered on section) — works on light bg too
- The visual punch comes from text-stroke treatment, animation, and layout — not background color

### Negative Stakes — Stats
- **Three stats in three-column grid** (was two in v1):
  1. **84%** — "of the world hasn't used AI at all. Most leaders are still at zero." (Source: DataReportal Digital 2026)
  2. **5% to 40%** — "of enterprise apps will have AI agents in one year." (Source: Gartner, Aug 2025)
  3. **12-18 months** — "until white collar computer tasks are fully automated, according to the CEO of Microsoft AI." (Source: Mustafa Suleiman, Feb 2026)
- Stats use text-stroke treatment: serif font, `--text-stat` size, transparent fill, 2px `--stakes-accent` stroke
- Each stat has: number (text-stroke), supporting text, source citation (mono, small)

### Negative Stakes — Section Title
- Serif title above stats: "The ground is moving faster than most people realise"
- Appears first before stats reveal

### Negative Stakes — Pull Quote
- Kevin Roose quote below stats as the closer:
  > "I have never seen such a yawning inside-outside gap. People in SF are putting multi-agent Claude swarms in charge of their lives... People elsewhere are still trying to get approval to use co-pilot."
  > — Kevin Roose, NYT Tech Columnist, Feb 2026
- Appears LAST after all three stats have revealed

### Negative Stakes — Animation (DISTINCTIVE)
- **Stroke-draw animation** — the text-stroke outlines DRAW themselves, tracing each character path like a pen drawing the numbers
- Sequential reveal: title first, then each stat draws in one after another (building tension), then Roose quote appears last
- This is the signature animation for this section — NOT fade-up, NOT generic Framer Motion. The 2px stroke traces the character paths at the `--text-stat` scale.
- Research needed: SVG path animation or CSS stroke-dasharray approach for text-stroke drawing effect
- Gary's strong stance: "Bollox fade up AI slop — no. Looking for something distinctive, something new, something not before seen or at least surprising."

### Offering Cards — Design System Treatment
- Apply design guidelines spec to existing cards:
  - 16px radius (`--card-radius`)
  - Gradient icon containers (48px, 12px radius, gradient background)
  - Serif titles (IBM Plex Serif)
  - Inset accent hover effect (box-shadow inset + accent border on hover)
  - 1.25rem gap between cards
- Cards stagger-reveal one by one on scroll entrance (0s, 0.12s, 0.24s delays)
- Keep existing card content/copy unchanged

### Claude's Discretion
- Exact stroke-draw animation implementation approach (SVG path tracing vs CSS stroke-dasharray vs canvas)
- Stat column responsive breakpoints (likely 3-col desktop, 1-col mobile)
- Offering section heading typography treatment
- Exact timing/easing for the sequential stat reveals
- How radial glow renders on light background (opacity tuning)
- Pull quote typography and spacing

</decisions>

<specifics>
## Specific Ideas

- StoryBrand framework: Negative Stakes = Problem beat. "Make the cost of inaction concrete with numbers. Not 'AI is important' — 'here's what you're losing.'" Each stat is a gut punch. The sequence builds tension. The Roose quote is the kill shot.
- Gary described the current section as "lame" — stats crammed at top, inconsistent, static, no animation, huge empty space below. Everything about it needs to change.
- The stroke-draw animation is the creative bet — if text-stroke path drawing proves technically infeasible at this scale, fall back to something equally distinctive (NOT fade-up). Research the approach before committing to a plan.
- The offering section follows immediately after — it's the "Solution" beat answering the problem. Cards appearing one by one continues the sequential narrative rhythm.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `NegativeStakes.astro` — current section component (will be heavily modified)
- `OfferingSection.astro` — current offering component (needs design system treatment)
- `ServiceCard.astro` — card component (needs gradient icon containers, serif titles, hover effect)
- `StatBlock.astro` — static stat display (may need replacement for stroke-draw approach)
- `CountUpStat.tsx` — React island for animated counting (84% stat — may integrate with stroke-draw)
- `SectionAnimator.tsx` — Framer Motion wrapper (used for offering card stagger)
- `global.css` — design system tokens already defined: `--text-stat`, `--stakes-accent`, `--card-radius`, `--card-padding`, `--stagger`

### Established Patterns
- Astro components for static layout, React islands (`client:visible`) for animation
- GSAP for page-level scroll/snap (don't touch), Framer Motion for component animation
- Design tokens in `:root` CSS variables, mapped to Tailwind via `@theme`
- Sections wrapped in `<div class="scroll-section">` for GSAP snap

### Integration Points
- `src/pages/index.astro` lines 18-19: both sections are inside scroll-section wrappers with ScrollIndicator and TrustBar
- The stroke-draw animation will likely need a new React island or inline `<script>` for the SVG/CSS animation
- Offering card stagger can use existing `SectionAnimator` with delay props

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 11-negative-stakes-offering*
*Context gathered: 2026-03-06*
