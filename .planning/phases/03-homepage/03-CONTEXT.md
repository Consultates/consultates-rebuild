# Phase 3: Homepage - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the complete StoryBrand homepage with all 12 sections, full PRD copy, and correct layout. Visitors can read the full narrative from hero to final CTA and book a call. **No animation** — that's Phase 4. This phase delivers static content with correct structure, backgrounds, responsive grids, and all components wired up.

Requirements: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-09, HOME-10

</domain>

<decisions>
## Implementation Decisions

### Section Architecture
- Each homepage section is its own Astro component in `src/components/sections/` (12 sections = too much markup for one file)
- `index.astro` imports and composes all section components in order
- Section components are pure Astro (no React islands) — animation wrapping happens in Phase 4
- Each section gets its PRD-specified `id` attribute (e.g., `#section-hero`, `#section-trust`) for Phase 4 scroll-snap targeting

### Content & Copy
- All copy verbatim from PRD §4 (Sections 2–11) — zero content generation
- TidyCal URL: `https://tidycal.com/garyctate/15-minute-meeting` for all "Book a Free Call" CTAs
- CTA buttons open TidyCal in new tab (`target="_blank" rel="noopener noreferrer"`)

### Section Backgrounds
- Hero: radial gradient (light: `#F6F2EB → #FFFFFF`, dark: purple tint → `#0D1117`) — CSS with light/dark variants
- Negative Stakes (§4): `background: var(--secondary)` full-bleed
- Social Proof (§8): `background: var(--secondary)` full-bleed
- Stakes CTA (§10): `background: #0D1117` always-dark, all text white, CTA uses light-mode primary `#5C3B9C` always
- All other sections: default `var(--background)`

### Responsive Layout
- All grids follow PRD breakpoints: 3-col → 2-col (768–1023px) → 1-col (<768px) for offering and why sections
- Negative Stakes: 2-col → 1-col at <768px
- Transitional CTAs: 2-col → 1-col at <768px
- Use Cases: single column stacked blocks (max-width 800px)
- Consistent section padding: `clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem)`

### Component Reuse
- **Section 4 (Negative Stakes):** Uses StatBlock for the 84% and 12–18 months displays — static text only, no count-up animation (Phase 4)
- **Section 5 (Offering):** Uses 3x ServiceCard components with Phosphor icons (UserFocus, UsersThree, Briefcase)
- **Section 6 (Use Cases):** Uses TestimonialBlock for each quote block
- **Section 7 (How It Works):** Uses 3x StepCard components + Button CTA
- **Section 8 (Social Proof):** Custom layout with decorative quote mark — not TestimonialBlock (different visual treatment per PRD)
- **Section 11 (Transitional CTAs):** Uses 2x BlogCard components

### Forward-Linking
- Service card links point to `/services/ai-coaching-for-leaders`, `/services/ai-training-for-teams`, `/services/fractional-exec-support` — pages built in Phase 5, links are correct now
- Blog card links point to `/blog/youre-not-the-only-one-stuck`, `/blog/how-safe-is-ai-really` — posts built in Phase 6, links are correct now
- Dead links are acceptable — they resolve when subsequent phases complete

### Hero Section (Static Phase)
- Headline, paragraph, CTA button, and ScrollIndicator all render statically
- No letter stagger, no fade sequences — Phase 4 wraps this in a React island for animation
- ScrollIndicator component already exists with CSS `scroll-bob` animation (purely cosmetic, not GSAP)

### Trust Bar
- Single line of credentials separated by ` · ` (middle dot)
- Wraps naturally on mobile via `flex-wrap: wrap`

### Nav and Footer
- Already built and wired into Base.astro — no work needed in this phase
- Nav is Section 1, Footer is Section 12 in PRD — both handled by existing Base.astro layout

### Claude's Discretion
- File naming convention for section components (e.g., `HeroSection.astro` vs `Hero.astro`)
- Whether to create a shared `TIDYCAL_URL` constant or inline the URL
- Exact Tailwind class composition for each section's layout (PRD gives CSS values, Claude maps to Tailwind utilities)
- Whether Social Proof decorative quote mark uses pseudo-element or explicit element

</decisions>

<specifics>
## Specific Ideas

- PRD §4 provides the complete CSS for every section — use these values to inform Tailwind classes
- The homepage follows StoryBrand narrative flow: Empathy (hero) → Trust → Problem → Solution → Proof → Authority → Urgency → Catch the not-yet-ready
- Stakes CTA section is always dark regardless of theme — needs hardcoded dark colors, not theme tokens
- Social Proof section has a unique decorative `"` mark not present in the TestimonialBlock component — this is custom section markup
- The 84% stat in Negative Stakes renders as static text in Phase 3; the count-up animation is explicitly Phase 4 (ANIM-05)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Button.astro`: Primary, Secondary, Ghost, CTA variants — used for all "Book a Free Call" CTAs
- `ServiceCard.astro`: Card with icon slot, title, description, link — used in Offering section
- `TestimonialBlock.astro`: Quote with border-left, decorative mark, attribution — used in Use Cases
- `StatBlock.astro`: Number + label + source — used in Negative Stakes
- `StepCard.astro`: Numbered circle + heading + description — used in How It Works
- `BlogCard.astro`: Title + date + excerpt + link — used in Transitional CTAs
- `ScrollIndicator.astro`: Mouse outline with bob animation — used in Hero

### Established Patterns
- Tailwind 4 CSS-first: tokens via `var(--token-name)`, custom classes via `@theme` block
- Theme switching: `.dark` class on `<html>` — dark variants use `dark:` prefix
- Astro components for static content, React islands only when interactivity needed
- Inline SVGs for Phosphor icons in Astro components (avoids hydration cost, decided in Phase 2)
- ServiceCard uses named slot for icon

### Integration Points
- `src/pages/index.astro` — currently a design system test page, will be replaced with homepage sections
- `src/layouts/Base.astro` — provides Nav + Footer + theme flash prevention, wraps all page content via `<slot />`
- `src/styles/global.css` — all color tokens, type scale classes, font-face declarations

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. All decisions extracted from PRD v2.0.

</deferred>

---

*Phase: 03-homepage*
*Context gathered: 2026-03-05*
