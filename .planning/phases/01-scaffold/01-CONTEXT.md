# Phase 1: Scaffold - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up the Astro 5 project with all design primitives: Tailwind 4 CSS-first config with full color token system (light + dark), self-hosted IBM Plex fonts, custom type scale, base layout with theme flash prevention, and all static assets (logos, photo, favicon, fonts) in place. No components, no pages beyond the base layout.

</domain>

<decisions>
## Implementation Decisions

### Project Setup
- Astro 5 with `output: 'static'` — locked from PRD §8.3
- pnpm 9 as package manager, Node.js 22
- React integration via `@astrojs/react`, sitemap via `@astrojs/sitemap`
- Tailwind 4 via `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind` — that's Tailwind 3)

### Color Token System
- All tokens defined in CSS `@theme` block in `src/styles/global.css` — PRD §2.8 has the complete CSS
- Light theme default in `:root`, dark theme in `.dark` class
- Footer palette always dark, independent of theme toggle
- Token names mapped to Tailwind via `--color-*` prefix in `@theme`

### Typography
- IBM Plex Sans (300, 400, 500, 600, 700), Serif (600, 700), Mono (400, 500) — WOFF2 only, latin subset
- Self-hosted in `public/fonts/` — no external font requests
- `font-display: swap` on all `@font-face` declarations
- Preload Sans Regular and Serif Bold in `<head>`
- Custom type scale classes defined in `@theme`: text-hero, text-section, text-sub, text-body-lg, text-body, text-caption, text-stats, text-cite — exact values in PRD §2.2

### Base Layout
- Theme flash prevention: inline blocking `<script>` in `<head>` that reads `localStorage('theme')` and adds `.dark` class before paint — exact script in PRD §6.10
- `localStorage` key: `'theme'`, values: `'light'`, `'dark'`, `'system'`
- Default when no stored preference: follow `prefers-color-scheme`, fallback to light

### Static Assets
- Logo light: `Consultates-logo-lighttheme-horizontal-100x341-transparent.webp` → `public/images/logo-light.webp`
- Logo dark: `Consultates-logo-darktheme-horizontal-100x341-transparent.webp` → `public/images/logo-dark.webp`
- Gary photo: `Me for Website-1800x1800.png` → convert to 400×400 WEBP → `public/images/gary-tate.webp`
- Favicon: `Consultates-favicon-130x130-transparent.png` → `public/favicon.png`
- Head mark: `Consultates-head-400x400-transparent.png` → `public/images/consultates-head.png`
- Source dirs:
  - Logos: `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/Consultates Logos/`
  - Icons: `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/Consultates Icons /`

### Dependencies (exact versions from PRD §10)
- `astro` ^5.4, `@astrojs/react` ^4.2, `@astrojs/sitemap` ^3.3
- `@tailwindcss/vite` ^4.1, `@tailwindcss/typography` ^0.5, `tailwindcss` ^4.1
- `react` ^19.0, `react-dom` ^19.0
- `framer-motion` ^12.4, `gsap` ^3.12
- `@phosphor-icons/react` ^2.1

### Claude's Discretion
- Font file acquisition method (fontsource packages, manual download, or Google Fonts download)
- Exact WOFF2 subsetting approach
- Whether to create a site config file (`src/config.ts`) for global constants in this phase or defer to Phase 2
- Base layout HTML structure beyond the theme script

</decisions>

<specifics>
## Specific Ideas

- The PRD provides the complete `global.css` file content including `@theme` block and all `:root` / `.dark` custom properties — use it verbatim (PRD §2.8)
- The PRD provides the complete `astro.config.mjs` — use it verbatim (PRD §8.3)
- The PRD provides the complete theme flash prevention script — use it verbatim (PRD §6.10)
- Font preload tags are specified exactly in PRD §2.2

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project

### Established Patterns
- None — this phase establishes the patterns

### Integration Points
- Base layout (`src/layouts/Base.astro`) will be used by all pages in subsequent phases
- `global.css` token system will be consumed by all components
- Font files will be referenced by `@font-face` declarations in global CSS

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-scaffold*
*Context gathered: 2026-03-05*
