# Phase 20: Footer - Research

**Researched:** 2026-03-13
**Domain:** Astro component redesign, CSS animation, dark theme consistency
**Confidence:** HIGH

## Summary

This phase is a targeted redesign of a single Astro component (`Footer.astro`) plus supporting CSS additions in `global.css`. The current footer is a basic 3-column grid with minimal styling. The redesign adds animated underlines, dot texture background, restructured columns, and social icons while keeping it a pure Astro component (no React island needed).

The footer already lives in `Base.astro` and renders on every page, so FOOT-02 (consistent rendering) is architecturally solved. The work is entirely visual/structural within the existing component.

**Primary recommendation:** Rebuild `Footer.astro` in place with new column structure, add `.footer-link` animated underline class to `global.css`, and use the existing `bg-dots` utility for texture continuity.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Two-column Quick Links**: Col 1: Home, Services, About | Col 2: Blog, Contact, Privacy Policy
- **Brand column**: Logo at same size as nav logo (`h-9 md:h-10`), "Clarity on AI" subtitle underneath
- **Contact column becomes social-only**: Remove email link. LinkedIn and X (Twitter) icons only, no labels
- **"Get in Touch" heading**: Animated underline, links to /contact page
- **Dot texture background**: Seamless continuation of dark zone, no visible boundary
- **Animated underline on all footer links**: Thin line grows left-to-right on hover, brand purple, text-width only
- **Underline reference**: Like nav "Book a Free Call" `btn-alive` underline but thinner/lighter weight
- **Bottom bar keeps all three lines**: Tagline, AI quote (intentional brand copy - DO NOT change), copyright
- **Logo identical size to nav header logo** (not smaller like current `h-8`)

### Claude's Discretion
- Exact spacing and padding values
- Mobile responsive behavior (stack columns, icon sizing)
- Bottom bar separator treatment (thin border, spacing, or fade)
- Social icon sizing relative to surrounding text
- Whether Quick Links heading is kept or removed

### Deferred Ideas (OUT OF SCOPE)
None
</user_constraints>

## Standard Stack

No new dependencies needed. Everything uses existing tooling:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x | Component framework | Already in use, Footer.astro is pure Astro |
| Tailwind CSS | 4.x | Styling | Already in use, CSS-first config |
| Phosphor Icons | web 2.1.1 | Social icons | Already loaded via CDN in Base.astro |

### Supporting
No additional libraries needed. The animated underline is pure CSS.

### Alternatives Considered
None -- this is a component redesign within the existing stack.

## Architecture Patterns

### Current Footer Architecture
- `src/components/Footer.astro` -- single Astro component
- Included in `src/layouts/Base.astro` line 62: `<Footer />`
- Renders on ALL pages automatically (homepage, services, about, contact, blog, blog posts, privacy, 404)
- Uses theme tokens from `global.css`: `footer-bg`, `footer-text`, `footer-link`, `footer-link-hover`, `footer-border`

### New Footer Structure
```
Footer.astro
├── Outer wrapper: bg-footer-bg + bg-dots (dot texture)
├── Content container: max-w-[1200px] mx-auto (matches nav)
│   ├── Grid row (3 columns desktop, stacked mobile)
│   │   ├── Col 1: Brand (logo + "Clarity on AI")
│   │   ├── Col 2: Quick Links (2 sub-columns)
│   │   └── Col 3: Social ("Get in Touch" link + icons)
│   └── Bottom bar (separator + 3 lines)
```

### Key Pattern: Animated Underline (CSS-only)

The `btn-alive::after` pseudo-element provides the reference:
```css
/* btn-alive::after from global.css */
content: '';
position: absolute;
bottom: -6px;
left: 0;
width: 0;
height: 8px;        /* thick underline */
background: currentColor;
clip-path: polygon(...);  /* angled end */
transition: width 0.4s var(--ease-out);
```

For the footer, a **thinner, simpler** version:
```css
.footer-link {
  position: relative;
  display: inline-block;
}
.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--primary);  /* brand purple */
  transition: width 0.3s var(--ease-out);
}
.footer-link:hover::after {
  width: 100%;
}
```

Key differences from `btn-alive`:
- **1.5px height** instead of 8px (thinner)
- **No clip-path** (straight line, no angled end)
- **No glow pseudo-element** (no `::before` radial gradient)
- **`var(--primary)` color** instead of `currentColor` (brand purple)
- **`width: 100%`** not `calc(100% + 10px)` (text-width only)

### Key Pattern: Dot Texture Continuity

The `bg-dots` class already exists in `global.css`:
```css
.bg-dots {
  background-image: radial-gradient(circle, var(--dot-color) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

The footer already uses `bg-footer-bg` which maps to `#0D1117` -- the same as `--hero-bg`. Adding `bg-dots` to the footer creates seamless texture continuation.

**Important note on "seamless dark zone":** Not every page ends with a dark section. Contact page has a light form section. The footer should have its own dark background with dots. On pages where a dark CTA section directly precedes the footer (like homepage), the matching `#0D1117` bg + matching dot pattern creates the seamless illusion. No special per-page logic needed.

### Key Pattern: Social Icons via Phosphor Web

Phosphor web CDN is already loaded in `Base.astro`. Footer can use:
```html
<i class="ph-duotone ph-linkedin-logo" style="font-size: 24px;"></i>
<i class="ph-duotone ph-x-logo" style="font-size: 24px;"></i>
```

Alternatively, inline SVG (current approach for LinkedIn) gives more control. Recommend **inline SVG** for consistency with the existing LinkedIn icon and to avoid layout shift from CDN font loading.

### Key Pattern: Logo Sizing

Current footer: `h-8` (32px)
Nav logo: `h-9 md:h-10` (36px mobile, 40px desktop)

Footer must match nav: use `h-9 md:h-10`. Since footer is always on dark bg, only `logo-dark.webp` is needed (current approach is correct, just needs size bump).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dot texture | Custom SVG pattern | `bg-dots` utility class | Already exists, uses theme token `--dot-color` |
| Icon rendering | Custom SVG components | Inline SVG or Phosphor web `<i>` tags | Already used throughout site |
| Dark/light theming | Conditional classes | `footer-*` theme tokens | Already defined in both light and dark themes |
| Animated underline | JS animation | CSS `::after` pseudo-element | Pure CSS, no JS needed |

## Common Pitfalls

### Pitfall 1: Dark Mode Footer Tokens
**What goes wrong:** Footer tokens (`--footer-bg`, `--footer-text`, etc.) are only defined in `:root` (light theme), NOT in `.dark`. This means the footer looks identical in both themes.
**Why it happens:** The footer is always dark regardless of theme -- `--footer-bg: #0D1117` is the dark navy.
**How to avoid:** This is actually intentional. The footer is always dark. The `--dot-color` token DOES change between themes (light: `rgba(92,59,156,0.08)`, dark: `rgba(139,108,199,0.06)`), so dot texture subtly shifts. The underline color should use `var(--primary)` which also shifts (light: `#5C3B9C`, dark: `#8B6CC7`). Since the footer bg is always dark, the dark-mode purple (`#8B6CC7`) may actually be more visible. Consider hardcoding the underline color to match the dark CTA accent: `var(--stakes-accent, #8B6CC7)`.

### Pitfall 2: Underline on Block Links vs Inline Text
**What goes wrong:** `::after` width animation doesn't work on block-level elements -- it stretches full width.
**Why it happens:** `width: 100%` of a `display: block` element = full column width.
**How to avoid:** Footer links MUST use `display: inline-block` or `display: inline` (with `position: relative`). The `.footer-link` class should set `display: inline-block` explicitly.

### Pitfall 3: "Get in Touch" Is Both Heading and Link
**What goes wrong:** Wrapping an `<h4>` in an `<a>` or vice versa can cause semantic issues.
**How to avoid:** Use `<a href="/contact">` as the outer element with heading-like styling. Add `role` or just style the link to look like a heading. Simplest: `<a href="/contact" class="footer-heading footer-link">Get in Touch</a>`.

### Pitfall 4: Missing X (Twitter) URL
**What goes wrong:** `config.ts` has `LINKEDIN_URL` but no Twitter/X URL defined.
**How to avoid:** Add `X_URL` or `TWITTER_URL` to `src/config.ts`. The planner needs to flag that Gary must provide the X/Twitter profile URL, or use a placeholder.

### Pitfall 5: Homepage Scroll Container Isolation
**What goes wrong:** The homepage uses a pinned scroll container. The footer sits OUTSIDE this container (after `</main>`). This is correct -- the footer appears after scrolling past all homepage sections.
**How to avoid:** Don't move the footer inside `<main>`. It's already correctly placed in `Base.astro`.

## Code Examples

### Footer Link with Animated Underline
```css
/* Source: Derived from btn-alive::after in global.css, made thinner */
.footer-link {
  position: relative;
  display: inline-block;
  color: var(--footer-link);
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: var(--footer-link-hover);
}
.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--stakes-accent, #8B6CC7);
  transition: width 0.3s var(--ease-out);
}
.footer-link:hover::after {
  width: 100%;
}
```

### Two-Column Quick Links Grid
```html
<div class="grid grid-cols-2 gap-x-8 gap-y-2">
  <!-- Col 1 -->
  <a href="/" class="footer-link">Home</a>
  <a href="/blog" class="footer-link">Blog</a>
  <a href="/services/ai-advisory-for-leaders" class="footer-link">Services</a>
  <a href="/contact" class="footer-link">Contact</a>
  <a href="/about" class="footer-link">About</a>
  <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
</div>
```

### Footer Wrapper with Dot Texture
```html
<footer class="bg-footer-bg bg-dots text-footer-text">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,8rem)] py-12">
    <!-- content -->
  </div>
</footer>
```

### X (Twitter) Icon SVG (Phosphor Duotone)
```html
<!-- Phosphor XLogo duotone -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
  <path d="M218.12,209.56l-61-95.8,59.72-65.69a8,8,0,0,0-11.84-10.76l-55.54,61.11L96.28,16.44A8,8,0,0,0,89.6,12H32a8,8,0,0,0-6.72,12.32l73.6,115.52L37.92,209.69a8,8,0,0,0,11.84,10.76L109,158.26l56.88,85.18A8,8,0,0,0,172.8,248H224a8,8,0,0,0,6.72-12.32Z" opacity="0.2"></path>
  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.68,99.41,98.15,31.44A8,8,0,0,0,91.6,28H32a8,8,0,0,0-6.75,12.29l62.6,98.38L26.08,206.62a8,8,0,1,0,11.84,10.76l58.4-64.22,45.53,67.97A8,8,0,0,0,148.4,224H208a8,8,0,0,0,6.75-12.29ZM156.73,208,55.27,48H99.27L200.73,208Z"></path>
</svg>
```

**Note:** The exact SVG path should be verified from the Phosphor icons library at build time. The icon name in Phosphor is `x-logo` (for the X/Twitter rebrand).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Current footer (`h-8` logo, email link, single-col links) | New footer (nav-size logo, 2-col links, social icons, animated underlines) | This phase | Visual quality matches rest of site |

## Open Questions

1. **X (Twitter) URL**
   - What we know: `config.ts` defines `LINKEDIN_URL` but has no Twitter/X URL
   - What's unclear: Gary's X/Twitter handle or whether it's a personal vs company account
   - Recommendation: Planner should flag this for Gary to provide. Use placeholder `https://x.com/consultates` or skip X icon until URL is confirmed.

2. **Quick Links heading**
   - What we know: Context says Claude's discretion on whether to keep or remove the "Quick Links" heading
   - Recommendation: Remove it. The links are self-evident (Home, Services, About, Blog, Contact, Privacy Policy). Removing the heading reduces visual noise and the two-column layout makes the purpose clear. The "Get in Touch" heading on the social column serves double duty as a link and section label, making it more useful to keep.

3. **Bottom bar separator**
   - What we know: Claude's discretion on treatment
   - Recommendation: Thin border using `border-footer-border` (existing token, `#1E2333`) -- matches current implementation. A 1px top border with `mt-8 pt-6` spacing (current values) is clean and understated.

4. **Social icon size**
   - What we know: Claude's discretion
   - Recommendation: 24px (current LinkedIn icon size). Large enough to be a tap target on mobile, proportional to body text.

5. **Mobile layout**
   - What we know: Claude's discretion
   - Recommendation: Stack all three columns vertically. Brand first, Quick Links second (keep 2-col sub-grid), Social third. Bottom bar stays full-width centered. Add `gap-8` between stacked columns.

## Sources

### Primary (HIGH confidence)
- `src/components/Footer.astro` -- current implementation, line-by-line analysis
- `src/components/Nav.astro` -- logo sizing reference (`h-9 md:h-10`)
- `src/styles/global.css` -- theme tokens, `bg-dots` utility, `btn-alive` underline reference
- `src/config.ts` -- URL constants (LINKEDIN_URL exists, no X/Twitter URL)
- `src/layouts/Base.astro` -- Footer placement (line 62, outside `<main>`)

### Secondary (MEDIUM confidence)
- Phosphor Icons X logo SVG -- verified icon name `x-logo` exists in Phosphor set

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new deps, all existing tooling
- Architecture: HIGH -- single component rewrite, well-understood structure
- Pitfalls: HIGH -- identified from direct code analysis
- Code examples: HIGH -- derived from existing patterns in the codebase

**Research date:** 2026-03-13
**Valid until:** No expiry -- this is internal component analysis, not library research
