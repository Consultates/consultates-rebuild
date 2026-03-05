# Phase 2: Components - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the full shared component library, navigation, footer, and theme toggle system. Every page built after this pulls from tested, reusable building blocks. This phase delivers 9 shared components + Nav + Footer + Theme Toggle — all with exact PRD specs. No page content — just the pieces pages are built from.

Requirements: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, THEME-01, THEME-02, THEME-03, FOOT-01, FOOT-02, COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08, COMP-09

</domain>

<decisions>
## Implementation Decisions

### Navigation (NAV-01 through NAV-05)
- Astro component with `<script>` for mobile toggle — NOT a React island
- Fixed position, z-50, backdrop blur 12px, semi-transparent background via `color-mix()`
- Height 64px, max-width 1200px, horizontal padding `clamp(1.5rem, 5vw, 8rem)`
- Logo: light/dark variants, 32px desktop / 28px mobile, swap based on theme
- Center links: Home, Services▼, About, Blog, Contact — Plex Sans 500, 1rem
- Active page indicator: primary color bottom border 2px
- Services mega menu: CSS `:hover` on desktop, tap on mobile. Absolute panel with card bg, 0.75rem radius, 10px 25px shadow. 3 items with Phosphor duotone icons (UserFocus, UsersThree, Briefcase) + label + description. Fade-translate animation 200ms
- Right side: Theme toggle + "Book a Free Call →" CTA button
- Mobile (<768px): Hamburger icon (Phosphor `List`), full-screen overlay, stacked links at 1.125rem, services sub-items inline. Toggle via `.nav-open` class on `<body>`

### Theme Toggle (THEME-01 through THEME-03)
- React island with `client:load` — needs interactivity and state
- Ghost button, 40x40px, centered flex
- Icons: Sun (light), Moon (dark), Monitor (system) — Phosphor duotone 20px
- Cycle: light → dark → system → light
- localStorage key: `'theme'`, values: `'light'` | `'dark'` | `'system'`
- On mount: sync state from `document.documentElement.classList.contains('dark')`
- Write to localStorage on every toggle (completes THEME-02 — read side already in Base.astro)
- Logo swap: Nav reads theme state and shows correct logo variant

### Footer (FOOT-01, FOOT-02)
- Always-dark footer — uses dedicated footer tokens (--footer-bg: #0D1117, etc.)
- Astro component (no interactivity needed)
- 3-column grid, gap 2rem, max-width 1200px. Mobile: 1-column
- Column 1: Dark logo variant (32px) + "Consultates Limited" caption
- Column 2: Quick links (Home, Services, About, Blog, Contact, Privacy Policy)
- Column 3: Email mailto link + LinkedIn icon (Phosphor `LinkedinLogo` 24px)
- Bottom bar: border-top, 3 lines — location tagline, serif italic quote at 0.7 opacity, copyright

### Button Component (COMP-01)
- 4 variants: Primary, Secondary, Ghost, CTA (large)
- 2 sizes: Default (h-10, px-6), Large/CTA (h-12, px-8)
- Plex Sans 600, border-radius 0.5rem, 150ms transitions
- States: focus-visible (2px ring, 2px offset), active (scale 0.98), disabled (opacity 0.5)
- CTA variant: scale(1.02) on hover
- Astro or React — works as either (no state needed, just styled `<a>` or `<button>`)

### Service Card Component (COMP-02)
- Card bg, 1px border, 0.75rem radius, 2rem padding
- Phosphor duotone icon 32px + title (text-sub) + description (text-body, muted) + "Learn more →" link (primary)
- Hover: translateY(-4px), 10px 25px shadow, 0.2s ease
- Focus-visible: 2px ring, 2px offset

### Testimonial Block Component (COMP-03)
- Left border 3px solid primary, padding-left 1.5rem
- Decorative `"` mark: absolute positioned, Plex Serif 700, 6rem, primary at 0.2 opacity
- Quote: text-body-lg, Plex Serif italic
- Name: text-body, weight 600
- Title: text-caption, muted-foreground

### Stat Block Component (COMP-04)
- Number: text-stats, primary color, Plex Mono
- Label: text-body, foreground
- Source: text-cite, muted-foreground, Plex Mono

### Step Card Component (COMP-05)
- 48x48 circle: 2px primary border, transparent bg, centered flex
- Number inside: Plex Mono 700, 1.125rem, primary
- Heading: text-sub, margin-top 1rem
- Description: text-body, margin-top 0.5rem

### Blog Card Component (COMP-06)
- Card bg, 1px border, 0.75rem radius, 1.5rem padding
- Title (text-sub) + date (text-cite, muted, Mono) + excerpt (text-body, 3-line clamp) + "Read →" link (primary)
- Hover: translateY(-2px), 4px 12px shadow, 0.2s ease
- Focus-visible: 2px ring, 2px offset

### Form Input Component (COMP-07)
- Flex column, 0.25rem gap
- Label: text-caption, weight 500
- Input/textarea: card bg, 1px border, 0.5rem radius, 0.625rem 0.75rem padding, Plex Sans 1rem
- Focus: ring color border + 2px outline, offset 0
- Error: destructive border + error message (text-cite, destructive)
- Disabled: opacity 0.5, not-allowed cursor

### Icon Wrapper Component (COMP-08)
- React component for Phosphor duotone icons in React islands
- Props: `icon` (Phosphor component), spread rest props
- Weight: always "duotone", color: "currentColor", duotoneColor: "var(--icon-duotone)"
- Duotone opacity: 0.45 (light), 0.35 (dark) — read from classList
- For Astro static contexts: use Phosphor SVGs directly with CSS vars

### Scroll Indicator Component (COMP-09)
- Absolute positioned: bottom 2rem, centered
- Mouse outline: 30x50px, 2px foreground border, 15px radius, 0.6 opacity
- Inner dot: 6x6px circle, foreground bg, 6px top margin
- Animation: scroll-bob 2s infinite ease-in-out (already defined in global.css)
- Disappears on scroll (Phase 4 wires this with GSAP)

### Claude's Discretion
- File organization: how to structure `src/components/` (flat vs grouped)
- Whether to create a component showcase/test page
- Props interface naming conventions
- Whether simple components (StatBlock, StepCard) are Astro or React

</decisions>

<specifics>
## Specific Ideas

- All component specs are pixel-exact from PRD v2.0 — no creative interpretation needed
- PRD specifies Nav as Astro component (not React) for performance — mobile toggle via vanilla `<script>`
- Theme toggle is explicitly a React island with `client:load`
- Footer is always dark regardless of theme — uses separate footer token set
- Icon wrapper has two modes: React component for islands, direct SVG for Astro components

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/styles/global.css` (254 lines): All 17 color tokens (light + dark), 9 @font-face declarations, 8 type scale classes, footer token palette, scroll-bob keyframe — components reference these directly
- `src/layouts/Base.astro`: Theme flash prevention script (reads localStorage) — toggle component writes to same key
- `public/images/logo-light.webp` and `logo-dark.webp`: Nav and footer logo references
- `public/fonts/`: 9 IBM Plex WOFF2 files already loaded via @font-face

### Established Patterns
- Tailwind 4 CSS-first: All tokens in `@theme` block, accessed via `var(--token-name)`
- Theme switching: `.dark` class on `<html>`, toggled by inline script
- Font loading: Self-hosted WOFF2 via @font-face, 2 critical fonts preloaded

### Integration Points
- Components import into `Base.astro` layout (Nav at top, Footer at bottom)
- Theme toggle must coordinate with existing flash prevention script in Base.astro
- All components use design tokens from global.css — no hardcoded colors
- Service cards link to `/services/*` routes (built in Phase 5)
- Blog cards link to `/blog/*` routes (built in Phase 6)
- Book CTA links to external TidyCal URL

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. All decisions extracted from PRD v2.0.

</deferred>

---

*Phase: 02-components*
*Context gathered: 2026-03-05*
