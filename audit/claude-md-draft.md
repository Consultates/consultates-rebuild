# CLAUDE.md — Anti-Slop Design Rules (Draft Section)

Add this section to CLAUDE.md after the "Integrations" section and before "Navigation Structure":

---

## Anti-Slop Design Rules (v2.0)

These rules are mandatory for any agent building components, pages, or sections. Violations produce generic AI-looking output that must be rebuilt.

### Buttons
- **btn-alive system only.** Underline-draw with clip-path taper + radial purple glow. No gradient fills. No pill shapes (border-radius: 9999px).
- **Variants:** `--lg` (hero), `--sm` (card CTA), `--on-dark` (dark sections — white text, purple accent underline).
- **No other button styles.** If a section needs a CTA, it uses btn-alive.

### Animation
- **No generic fade-up.** Every animation must be distinctive: letter stagger on headlines, typewriter on descriptions, sequential card reveals.
- **Sequential, not simultaneous.** Cards animate one at a time L→R. Content within each card reveals in order: label → title stagger → description typewriter → CTA pulse.
- **Reduced motion is first-class.** All animated components must have a `prefers-reduced-motion` fallback that shows complete content immediately.
- **No transform-on-hover** except the intentional magnetic hover in btn-alive.

### Dark CTA Sections
- **Mirror the hero.** Every dark CTA section uses `StaggerHeading` (letter-stagger h2) + `btn-alive--on-dark`. Not SectionAnimator fadeUp. Not pill buttons. Not gradient buttons.
- Component: `src/components/islands/StaggerHeading.tsx`

### Cards and Icons
- **Icon containers:** cream background (#F6F2EB / var(--secondary)) + purple border (var(--primary)). NOT gradient backgrounds.
- **Card radius:** 16px (--card-radius). Not oversized (20px+).
- **Card shadows:** rest state max blur 20px. Hover state can go to 32px with accent border.

### Labels
- **Mono labels for categorisation:** IBM Plex Mono, 11px, 500 weight, 0.08em letter-spacing, uppercase, Royal Purple. Used on use case cards and section identifiers.
- **No eyebrow labels.** Small + uppercase + letter-spacing text above headings is an AI slop pattern. The only exception is mono category labels on cards.

### Colors and Surfaces
- **Colors stay flat.** Use as distinct, intentional values — not blended into gradients.
- **No glassmorphism** / backdrop-filter outside the navigation bar.
- **No dramatic shadows** (blur > 20px) except card hover states.
- **Cream sections alternate with white.** Card sections use var(--secondary) background with gradient border separators.

### Copy
- **No decorative copy.** Don't write text that explains what the UI does ("Click here to explore our offerings", "Scroll down to learn more"). Every word must carry information.
- **No marketing cliches.** Plain language, grounded in facts. Gary directs copy — agents don't improvise it.

### Reference
- Anti-slop rules adapted from [Uncodixfy](https://github.com/cyxzdev/Uncodixfy) + project-specific decisions.
- Brand guidelines (source of truth): `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/consultates-brand-guidelines.html`
