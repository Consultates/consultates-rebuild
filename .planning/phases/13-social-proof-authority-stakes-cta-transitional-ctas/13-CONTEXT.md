# Phase 13: Social Proof + Authority + Stakes CTA + Transitional CTAs - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Visual redesign of the bottom four homepage sections: Social Proof (testimonial), Why Consultates (authority), Stakes CTA (urgency), and Transitional CTAs (content bridge). All four sections already exist as v1 Astro components with basic SectionAnimator fade-ups. This phase applies design system treatments from RDES-34 through RDES-45 — photo placeholders, authority cards, radial glow, corner marks, accent em, pill CTA, three-card transitional section. Copy stays as-is. No new dependencies.

</domain>

<decisions>
## Implementation Decisions

### Social Proof Section (RDES-34, RDES-35)
- Add 72x72px photo placeholder circle with Frank Wiener's initials ("FW") — CSS circle with bg-primary/10 and initials centered, no actual photo
- Quote text size up to `clamp(1.125rem, 2vw, 1.375rem)` — already serif italic, just needs size bump
- Keep existing decorative quote mark, secondary background, and layout
- This is a lightweight CSS update — no new React island needed, SectionAnimator stays

### Authority Section (RDES-36, RDES-37, RDES-38)
- Wrap each of the three authority columns in a card treatment: border, `--card-radius` (16px), `--card-padding`, hover accent border (inset shadow like offering cards)
- Add stat callouts in serif purple — extract the key numbers from each column ("20 years", "15 years", "Now") as prominent stat headings in `font-serif text-primary`
- Staggered card reveal animation — needs React island (AuthorityCardsIsland.tsx) for sequential entrance like offering cards
- Cards animate with whileInView stagger (0s, 0.12s, 0.24s) matching offering card pattern
- Card shadow tokens from design system (already added in Phase 11)

### Stakes CTA Section (RDES-39, RDES-40, RDES-41, RDES-42)
- Add `.glow` class for radial purple glow (utility already exists in global.css)
- Add `.corner-marks` class (utility already exists in global.css)
- Parse `<em>` in headline for accent purple highlight — use same em-parsing pattern from HeroIsland
- Change CTA button to pill-shaped matching hero CTA (rounded-full, not rounded-lg)
- Keep existing StakesCTAPulse island for pulse animation — just update button border-radius
- Always-dark background unchanged

### Transitional CTAs Section (RDES-43, RDES-44, RDES-45)
- Change from 2-column to 3-column grid — add third blog card
- Third blog card: use the remaining blog post ("Real AI Strategy For Small Teams") or create a "Book a Call" card as third option
- Add section heading: "Not ready to book? Start here." in serif
- Card titles in serif (IBM Plex Serif)
- Hover accent border on cards (inset box-shadow pattern from offering cards)
- Cards stagger-reveal with whileInView — may need React island or can use SectionAnimator with delay props

### Claude's Discretion
- Whether transitional CTAs need a new React island or can use existing SectionAnimator with delay props
- Exact photo placeholder styling (gradient vs solid, opacity of initials)
- Stat callout typography sizing within authority cards
- Third transitional CTA card content (blog post vs booking card)
- Corner marks sizing/position on stakes CTA section
- Whether authority cards need the gradient icon container or just border+shadow treatment

</decisions>

<specifics>
## Specific Ideas

- **CTA style is underline-draw with magnetic hover, NOT gradient pills** — Gary explicitly rejected gradient buttons as "overdone by AI". The btn-alive system established in Phase 11 is the CTA pattern. However, StakesCTAPulse on the always-dark CTA section is an exception — it's a solid purple button with pulse, not underline-draw.
- **Don't replace distinctive animations with generic ones** — if a section already has a working animation (StakesCTAPulse), enhance it, don't replace it
- **Cream bg for card sections** — offering and use cases both use `var(--secondary)` backgrounds. Authority section currently has no background — consider whether cards look better on default or secondary bg.
- **Sequential card animation pattern is established** — offering cards (Phase 11) and use case cards (Phase 12) both use L-to-R sequential reveal. Authority cards should follow the same visual rhythm.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SocialProofSection.astro` — existing testimonial section (minor CSS updates needed)
- `WhyConsultatesSection.astro` — existing 3-column authority grid (needs card wrapping + React island)
- `StakesCTASection.astro` — existing dark CTA section (needs glow, corners, em parsing, pill button)
- `TransitionalCTAsSection.astro` — existing 2-card blog grid (needs 3rd card, heading, serif titles)
- `StakesCTAPulse.tsx` — existing pulse CTA island (update border-radius to pill)
- `SectionAnimator.tsx` — generic Framer Motion fadeUp wrapper with delay prop
- `OfferingCardsIsland.tsx` — reference for sequential card animation pattern (state machine approach)
- `BlogCard.astro` — existing blog card component (needs serif title, hover accent border)
- `.glow` and `.corner-marks` CSS utilities — already in global.css, ready to apply
- `btn-alive` CSS system — underline-draw CTA pattern for non-button CTAs
- Card shadow tokens (`--card-shadow`, `--card-shadow-hover`) — added in Phase 11

### Established Patterns
- Astro components for static layout, React islands (client:visible) for animation
- GSAP for page-level scroll-snap (don't touch), Framer Motion for component animation
- Sequential card animation: label/icon -> title stagger -> typewriter desc -> CTA pulse (offering + use case pattern)
- em-tag parsing via regex into React elements (HeroIsland pattern)
- Design tokens in :root CSS variables, mapped to Tailwind via @theme

### Integration Points
- `src/pages/index.astro` — all four sections already placed in scroll-section wrappers
- No GSAP changes needed — sections are inside existing snap containers
- BlogCard.astro shared with blog index page — changes to card styling affect both locations

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 13-social-proof-authority-stakes-cta-transitional-ctas*
*Context gathered: 2026-03-07*
