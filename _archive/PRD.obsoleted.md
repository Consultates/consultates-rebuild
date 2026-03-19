# Consultates.com — Product Requirements Document

**Version:** 2.0
**Date:** 2026-03-05
**Status:** Ready for build

Single source of truth for building consultates.com. All content, design tokens, animation specs, and technical decisions consolidated from approved source documents. Reviewed by Opus 4.6, Codex 5.3, and Gemini 3.0 Pro — all feedback incorporated.

---

## 1. Site Structure

### 1.1 Routes

| Route | Page | Template | `<title>` | `<meta name="description">` |
|-------|------|----------|-----------|------------------------------|
| `/` | Homepage | StoryBrand 12-section layout | `Consultates — AI Consulting for Business Leaders` | `Clarity on AI for leaders, teams, and companies. One-to-one coaching, hands-on training, and fractional executive support from someone who builds with AI every day.` |
| `/services/ai-coaching-for-leaders` | AI Coaching | Service page | `AI Coaching for Leaders — Consultates` | `One-to-one AI coaching sessions for business leaders. You bring your situation, you leave with a plan you can act on.` |
| `/services/ai-training-for-teams` | AI Training | Service page | `AI Training for Teams — Consultates` | `Hands-on AI workshops built around your team's actual work. Design thinking approach — people learn by doing.` |
| `/services/fractional-exec-support` | Fractional Exec | Service page | `Fractional Executive Support — Consultates` | `Senior AI go-to-market leadership without a full-time hire. Strategy, product direction, and execution.` |
| `/about` | About | Content page | `About Gary Tate — Consultates` | `Engineer. Commercial leader. AI practitioner. 35 years across military electronics, enterprise sales, and production AI — now helping leaders make sense of it.` |
| `/blog` | Blog index | Blog listing | `Blog — Consultates` | `Articles on AI adoption, AI safety, and practical guidance for business leaders.` |
| `/blog/[slug]` | Blog post | Blog post | `[post.title] — Consultates Blog` | `[post.excerpt]` |
| `/contact` | Contact | Form page | `Contact — Consultates` | `Get in touch with Gary Tate. Book a free call, send a message, or connect on LinkedIn.` |
| `/privacy-policy` | Privacy Policy | Legal page | `Privacy Policy — Consultates` | `How Consultates Limited collects, uses, and protects your personal data.` |
| `/404` | Not Found | Error page | `Page Not Found — Consultates` | — |

### 1.2 Navigation

```
[Consultates Logo]  Home  Services▼  About  Blog  Contact  [Book a Free Call]
                          ├─ AI Coaching for Leaders
                          ├─ AI Training for Teams
                          └─ Fractional Exec Support
```

### 1.3 Global Constants

These values are referenced throughout the PRD. Define them once in site config (`src/config.ts` or equivalent):

| Constant | Value |
|----------|-------|
| `TIDYCAL_URL` | `https://tidycal.com/garyctate/15-minute-meeting` |
| `CTA_TEXT` | `Book a Free Call` |
| `EMAIL` | `info@consultates.com` |
| `LINKEDIN_URL` | `https://www.linkedin.com/company/consultates-limited/` |
| `SITE_URL` | `https://consultates.com` |

Facebook is omitted — no specific page exists.

---

## 2. Design System

### 2.1 Color Tokens

Light theme default. System-aware with manual toggle.

**Light mode (default):**

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#FFFFFF` | Page background |
| `--foreground` | `#1A253F` | Body text |
| `--card` | `#FFFFFF` | Card backgrounds |
| `--card-foreground` | `#1A253F` | Card text |
| `--primary` | `#5C3B9C` | Buttons, links, accents |
| `--primary-hover` | `#4E3285` | Button hover (primary darkened) |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--secondary` | `#F6F2EB` | Secondary backgrounds (warm cream) |
| `--secondary-foreground` | `#555869` | Text on secondary |
| `--muted` | `#F0EFF4` | Muted backgrounds |
| `--muted-foreground` | `#8e8fa0` | Labels, captions |
| `--accent` | `#D4C8E8` | Hover states, highlights (lavender mist) |
| `--accent-foreground` | `#5C3B9C` | Text on accent |
| `--destructive` | `#D94C4C` | Errors |
| `--border` | `#E2DFE8` | Borders, dividers (lavender tint) |
| `--ring` | `#2E409F` | Focus rings |
| `--icon-duotone` | `#7C6B9B` | Phosphor duotone fill tint |

**Dark mode:**

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#0D1117` | Page background |
| `--foreground` | `#E2E0EC` | Body text |
| `--card` | `#161B26` | Card backgrounds |
| `--card-foreground` | `#E2E0EC` | Card text |
| `--primary` | `#8B6CC7` | Buttons, links, accents |
| `--primary-hover` | `#7D5FBA` | Button hover (primary darkened) |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--secondary` | `#1E2333` | Secondary backgrounds |
| `--secondary-foreground` | `#C5C3D4` | Text on secondary |
| `--muted` | `#1E2333` | Muted backgrounds |
| `--muted-foreground` | `#7A7B90` | Labels, captions |
| `--accent` | `#2A2540` | Hover states (deep grape) |
| `--accent-foreground` | `#B89FDE` | Text on accent (lavender bright) |
| `--destructive` | `#D94C4C` | Errors |
| `--border` | `#1E2333` | Borders, dividers |
| `--ring` | `#5C6FD6` | Focus rings |
| `--icon-duotone` | `#B89FDE` | Phosphor duotone fill tint |

**Footer palette** (always dark, independent of theme toggle):

| Token | Hex |
|-------|-----|
| `--footer-bg` | `#0D1117` |
| `--footer-text` | `#E2E0EC` |
| `--footer-link` | `#C5C3D4` |
| `--footer-link-hover` | `#FFFFFF` |
| `--footer-border` | `#1E2333` |

All tokens defined in the main CSS file via Tailwind 4 `@theme` block (see §2.8).

### 2.2 Typography

**Fonts:** IBM Plex Sans / Serif / Mono — self-hosted, WOFF2 only, subset to latin.

| Weight file | Usage |
|-------------|-------|
| Plex Sans 300, 400, 500, 600, 700 | Body, UI, nav |
| Plex Serif 600, 700 | Hero headlines, section headings |
| Plex Mono 400, 500 | Code snippets, stats |

**Font loading:** `font-display: swap`. Preload critical fonts in `<head>`:
```html
<link rel="preload" href="/fonts/IBMPlexSans-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/IBMPlexSerif-Bold.woff2" as="font" type="font/woff2" crossorigin>
```

**Type scale — Tailwind utility classes:**

Define these in the `@theme` block. Each section spec references these class names directly.

| Class | Font | Size | Weight | Line height | Letter spacing |
|-------|------|------|--------|-------------|----------------|
| `text-hero` | Plex Serif | `clamp(2.5rem, 5vw, 4rem)` | 700 | 1.1 | -0.02em |
| `text-section` | Plex Serif | `clamp(1.75rem, 3.5vw, 2.5rem)` | 600 | 1.2 | -0.01em |
| `text-sub` | Plex Sans | `clamp(1.125rem, 2vw, 1.5rem)` | 600 | 1.3 | 0 |
| `text-body-lg` | Plex Sans | `1.125rem` (18px) | 400 | 1.6 | 0 |
| `text-body` | Plex Sans | `1rem` (16px) | 400 | 1.6 | 0 |
| `text-caption` | Plex Sans | `0.875rem` (14px) | 500 | 1.4 | 0.01em |
| `text-stats` | Plex Mono | `clamp(3rem, 6vw, 5rem)` | 700 | 1.0 | -0.02em |
| `text-cite` | Plex Mono | `0.75rem` (12px) | 400 | 1.4 | 0.02em |

### 2.3 Spacing

| Context | Value |
|---------|-------|
| Section vertical padding | `clamp(4rem, 8vw, 8rem)` |
| Section horizontal padding | `clamp(1.5rem, 5vw, 8rem)` |
| Content max width | `1200px` |
| Card padding | `2rem` (32px) |
| Component gap (default) | `1.5rem` (24px) |
| Heading to body gap | `1rem` (16px) |
| Section heading to content | `2rem` (32px) |

### 2.4 Icons

**Phosphor Icons** — `@phosphor-icons/react`, duotone weight.

The React package renders inline `<svg>` elements (not web component class names). Override duotone opacity via component props, NOT CSS selectors:

```tsx
// Wrapper component: src/components/Icon.tsx
import type { IconProps } from '@phosphor-icons/react';

const DUOTONE_OPACITY = { light: 0.45, dark: 0.35 };

export function Icon({ icon: IconComponent, ...props }: { icon: React.FC<IconProps> } & IconProps) {
  // Read theme from document.documentElement.classList
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  return (
    <IconComponent
      weight="duotone"
      color="currentColor"
      duotoneColor="var(--icon-duotone)"
      duotoneOpacity={isDark ? DUOTONE_OPACITY.dark : DUOTONE_OPACITY.light}
      {...props}
    />
  );
}
```

For Astro components (non-React), use static SVG with `var(--icon-duotone)` fill and opacity `0.45` / `0.35` per theme.

### 2.5 Breakpoints

| Breakpoint | Target |
|------------|--------|
| `≥1024px` | Desktop — full layout |
| `768–1023px` | Tablet — stacked sections, reduced padding |
| `<768px` | Mobile — single column, hamburger nav |

### 2.6 Borders & Radius

| Element | Radius |
|---------|--------|
| Buttons | `0.5rem` (8px) |
| Cards | `0.75rem` (12px) |
| Inputs | `0.5rem` (8px) |
| Section containers | `0` (full-bleed sections) |

### 2.7 Global Interactive States

Apply to ALL interactive elements (buttons, links, form inputs, cards):

| State | Style |
|-------|-------|
| Focus visible | `outline: 2px solid var(--ring); outline-offset: 2px` |
| Active (buttons) | `transform: scale(0.98)` |
| Disabled | `opacity: 0.5; cursor: not-allowed; pointer-events: none` |

### 2.8 Tailwind 4 Configuration

Tailwind 4 uses CSS-first configuration. **No `tailwind.config.js` file.** All custom tokens defined in the main CSS file:

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-destructive: var(--destructive);
  --color-icon-duotone: var(--icon-duotone);
  /* Footer */
  --color-footer-bg: var(--footer-bg);
  --color-footer-text: var(--footer-text);
  --color-footer-link: var(--footer-link);
  --color-footer-link-hover: var(--footer-link-hover);
  --color-footer-border: var(--footer-border);
  /* Typography */
  --font-sans: 'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-serif: 'IBM Plex Serif', Georgia, 'Times New Roman', serif;
  --font-mono: 'IBM Plex Mono', 'Courier New', Courier, monospace;
}

/* Light theme (default) */
:root {
  --background: #FFFFFF;
  --foreground: #1A253F;
  --card: #FFFFFF;
  --card-foreground: #1A253F;
  --primary: #5C3B9C;
  --primary-hover: #4E3285;
  --primary-foreground: #FFFFFF;
  --secondary: #F6F2EB;
  --secondary-foreground: #555869;
  --muted: #F0EFF4;
  --muted-foreground: #8e8fa0;
  --accent: #D4C8E8;
  --accent-foreground: #5C3B9C;
  --destructive: #D94C4C;
  --border: #E2DFE8;
  --ring: #2E409F;
  --icon-duotone: #7C6B9B;
  --footer-bg: #0D1117;
  --footer-text: #E2E0EC;
  --footer-link: #C5C3D4;
  --footer-link-hover: #FFFFFF;
  --footer-border: #1E2333;
}

/* Dark theme */
.dark {
  --background: #0D1117;
  --foreground: #E2E0EC;
  --card: #161B26;
  --card-foreground: #E2E0EC;
  --primary: #8B6CC7;
  --primary-hover: #7D5FBA;
  --primary-foreground: #FFFFFF;
  --secondary: #1E2333;
  --secondary-foreground: #C5C3D4;
  --muted: #1E2333;
  --muted-foreground: #7A7B90;
  --accent: #2A2540;
  --accent-foreground: #B89FDE;
  --destructive: #D94C4C;
  --border: #1E2333;
  --ring: #5C6FD6;
  --icon-duotone: #B89FDE;
}
```

Astro integration: use `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind` — that's for Tailwind 3).

---

## 3. Animation System

Two decoupled layers. GSAP handles page-level scroll behaviour. Framer Motion handles component animation. **They do not communicate.** No custom events, no shared state.

### 3.1 GSAP ScrollTrigger — Page-Level Scroll Behaviour

**Package:** `gsap` + `ScrollTrigger` plugin
**Runs in:** A single `<script>` tag in the base Astro layout (`src/layouts/Base.astro`), NOT inside React islands.
**Registration:** `gsap.registerPlugin(ScrollTrigger)` at the top of this script.

**Section IDs** (canonical, used in ScrollTrigger config):

| Section | ID |
|---------|-----|
| Hero | `#section-hero` |
| Trust bar | `#section-trust` |
| Negative stakes | `#section-stakes` |
| Offering | `#section-offering` |
| Use cases | `#section-cases` |
| How it works | `#section-how` |
| Social proof | `#section-proof` |
| Why Consultates | `#section-why` |
| Stakes CTA | `#section-cta` |
| Transitional CTAs | `#section-transitional` |

**Zoom-scroll section transitions** (desktop only, `≥1024px`):

Each section: `min-height: 100vh; overflow: hidden; position: relative; will-change: transform;`

ScrollTrigger config per section:
```js
gsap.utils.toArray('.scroll-section').forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    snap: {
      snapTo: 1,
      duration: { min: 0.3, max: 0.6 },
      ease: 'power2.inOut'
    },
    onEnter: () => {
      gsap.fromTo(section, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' });
    }
  });
});
```

Animation is **scrub-based** (scroll-linked). No fixed-time durations for section transitions — the transform progress maps to scroll position.

**Scroll indicator** (hero section only):
- Mouse outline: `width: 30px; height: 50px; border: 2px solid var(--foreground); border-radius: 15px; position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); opacity: 0.6;`
- Inner dot: `width: 6px; height: 6px; border-radius: 50%; background: var(--foreground);`
- Dot animation: `@keyframes scroll-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }` — `2s infinite ease-in-out`
- Disappearance: `ScrollTrigger.create({ trigger: '#section-trust', start: 'top 80%', onEnter: () => gsap.to('.scroll-indicator', { opacity: 0, duration: 0.3, ease: 'power2.out' }) })`

**Mobile (`<768px`):** GSAP ScrollTrigger disabled entirely. Sections become `min-height: auto` (natural content height). No scroll snap. No scale transforms. Component entrances handled by Framer Motion `whileInView`.

**Tablet (`768–1023px`):** Same as mobile — no snap, natural height, Framer Motion only.

### 3.2 Framer Motion — Component Animation

**Package:** `framer-motion`
**Runs in:** React islands. Fully independent of GSAP — triggered by `whileInView` viewport detection.

**Standard animation variants:**

```tsx
// src/lib/animations.ts
export const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

export const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

export const hoverLift = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  hover: { y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', transition: { duration: 0.2, ease: 'easeOut' } }
};
```

**Viewport config for all `whileInView` usage:**
```tsx
viewport={{ once: true, amount: 0.3 }}
```

Mobile override (`<768px`): `amount: 0.2`, fade distance reduced to `y: 16`.

**Hero letter stagger** (fires after 1200ms from component mount via `useEffect` + `setTimeout`):

```tsx
// Hero island uses client:load
const HEADLINE = "Clarity on AI — what to do, where to start, and who to trust";
// 63 characters × 30ms = 1890ms total headline duration

// Sequence:
// t=0ms — component mounts, background present
// t=1200ms — headline letters begin stagger (30ms per char, total 1890ms)
// t=3290ms (1200 + 1890 + 200) — paragraph fades up (fadeUp, 600ms)
// t=4190ms (above + 300) — CTA button scales in (scaleIn, 500ms)
// t=4590ms (above + 200) — scroll indicator fades in (opacity 0→0.6, 400ms)
```

**Count-up animation** (Section 4 — stat "84" only):
```tsx
// Uses framer-motion useMotionValue + useTransform + animate
// Triggered by whileInView on the stat block
// Animates from 0 to 84 over 600ms, ease: [0.25, 0.1, 0.25, 1]
// "12–18 months" is static text — no count-up, uses standard fadeUp
```

**CTA pulse** (Section 10):
```tsx
// After text fadeUp completes (600ms), CTA does:
// scale: 1 → 1.05 → 1, duration: 400ms, ease: easeInOut, delay: 600ms
```

### 3.3 CSS — Simple Transitions

Applied via Tailwind utilities. No library needed.

| Effect | CSS |
|--------|-----|
| Button hover | `transition: background-color 150ms ease, transform 150ms ease` |
| Link hover | `transition: color 150ms ease` |
| Nav dropdown | `transition: opacity 200ms ease, transform 200ms ease` |
| Focus ring | `transition: outline-color 150ms ease` |
| Theme toggle | `transition: background-color 300ms ease, color 300ms ease` on `html` |

### 3.4 Reduced Motion

When `prefers-reduced-motion: reduce`:
- **GSAP:** Do not initialize ScrollTrigger. Sections remain `min-height: 100vh` (preserving full-page composition) but with no scroll snap, no scale transforms. Content visible immediately.
- **Framer Motion:** All durations set to 0. All transforms removed. Content at final visible state. No letter stagger — full headline visible immediately. No count-up — "84" shown immediately.
- **Scroll indicator:** Still visible (CSS animation), but `animation: none` — static dot position.

Detection: `const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;` — checked before GSAP init and passed as prop to React islands.

---

## 4. Homepage Spec

12 sections. Each is a full-viewport snap point (desktop `≥1024px`) or natural-height section (tablet + mobile).

### Section 1 — Nav

**Component:** `<Nav />` — Astro component with `<script>` for mobile toggle.

- Position: `fixed; top: 0; left: 0; right: 0; z-index: 50;`
- Background: `background: color-mix(in srgb, var(--background) 90%, transparent); backdrop-filter: blur(12px);`
- Height: `64px`
- Layout: `display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; padding: 0 clamp(1.5rem, 5vw, 8rem);`
- Left: Consultates head mark — `height: 32px` desktop, `28px` mobile
  - Light theme: `Consultates-logo-lighttheme-horizontal-100x341-transparent.webp`
  - Dark theme: `Consultates-logo-darktheme-horizontal-100x341-transparent.webp`
- Center links: `font-family: var(--font-sans); font-weight: 500; font-size: 1rem; color: var(--foreground);`
  - Hover: `color: var(--primary); transition: color 150ms ease;`
  - Active page: `color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 2px;`
- Right: CTA button — `Book a Free Call` (primary button, see §6.2)
- **Services dropdown (mega menu):**
  - Trigger: `:hover` on desktop (CSS `group-hover`), tap on mobile
  - Panel: `position: absolute; top: 100%; left: 0; min-width: 340px;`
  - Panel background: `background: var(--card); border: 1px solid var(--border); border-radius: 0.75rem; box-shadow: 0 10px 25px rgba(0,0,0,0.08); padding: 0.75rem;`
  - 3 items, each: Phosphor duotone icon (24px) + label (`font-weight: 600; font-size: 1rem;`) + description (`font-weight: 400; font-size: 0.875rem; color: var(--muted-foreground);`)
  - Icons: `UserFocus` (Coaching), `UsersThree` (Training), `Briefcase` (Fractional)
  - Animation: `opacity: 0 → 1; transform: translateY(-8px) → translateY(0); transition: 200ms ease;`
- **Mobile (`<768px`):** Hamburger icon (`List` from Phosphor, 24px) → full-screen overlay. Background: `var(--background)`. All links stacked, `font-size: 1.125rem; padding: 1rem 0;`. Services sub-items shown inline (no sub-menu). Toggle via Astro `<script>` that adds/removes a `.nav-open` class on `<body>`.

### Section 2 — Hero

**ID:** `#section-hero`
**Story beat:** Empathy. The visitor sees themselves.
**Layout:** `min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem); position: relative;`
**Max content width:** `800px`

**Background:**
- Light: `background: radial-gradient(ellipse at 50% 60%, #F6F2EB 0%, #FFFFFF 70%);`
- Dark: `background: radial-gradient(ellipse at 50% 40%, rgba(92,59,156,0.15) 0%, #0D1117 60%);`

**Content:**
- **Headline** (`text-hero`): `Clarity on AI — what to do, where to start, and who to trust`
- **Paragraph** (`text-body-lg`, `color: var(--muted-foreground)`): `You're a leader who knows AI matters but can't separate the signal from the noise. You don't need more articles or another webinar. You need someone who builds with AI every day to sit down with you and make it practical.`
- **CTA:** `Book a Free Call` → `TIDYCAL_URL` (opens new tab). Primary CTA button (see §6.2).
- **Scroll indicator:** Bottom center, absolute positioned. See §3.1 for exact spec.

**Animation:** React island, `client:load`. Hero sequence per §3.2 (1200ms hold → letter stagger → fadeUp paragraph → scaleIn CTA → fade-in scroll indicator).

### Section 3 — Trust Bar

**ID:** `#section-trust`
**Story beat:** Trust. Reduce friction.
**Layout:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; padding: 1.5rem clamp(1.5rem, 5vw, 8rem); text-align: center;`

**Content:** `Guest lecturer, Lead with AI PRO · 35 years across engineering, sales & AI · Trained executive cohorts through FlexOS · 16 countries`

**Style:** `text-caption`, `color: var(--muted-foreground)`. Items separated by ` · ` (space-middle dot-space).

**Animation:** React island, `client:visible`. `fadeUp` variant, `viewport: { once: true, amount: 0.3 }`.

### Section 4 — Negative Stakes

**ID:** `#section-stakes`
**Story beat:** Problem. Cost of inaction.
**Background:** `background: var(--secondary);` Full-bleed.
**Layout:** `display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; max-width: 1200px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);`
**Mobile (`<768px`):** `grid-template-columns: 1fr;`

**Content:**

Left column:
- Number: `84%` — `text-stats`, `color: var(--primary)`. Count-up animation: 0→84, 600ms, `ease: [0.25, 0.1, 0.25, 1]`, triggered by `whileInView`.
- Label: `of the world hasn't used AI at all. Most leaders are still at zero.` — `text-body`, `color: var(--foreground)`.

Right column:
- Text: `12–18 months` — `text-stats`, `color: var(--primary)`. Static text, no count-up. Standard `fadeUp` entrance.
- Label: `Until white collar computer tasks are fully automated, according to the CEO of Microsoft AI. The window to get ahead of this is closing.` — `text-body`, `color: var(--foreground)`.

Source line (below grid, centered): `Source: DataReportal Digital 2026 · Mustafa Suleiman, Everyday AI Podcast, Feb 2026` — `text-cite`, `color: var(--muted-foreground)`.

**Animation:** React island, `client:visible`. Left column `fadeUp`. Right column `fadeUp` with `delay: 0.2`. Source line `fadeUp` with `delay: 0.4`.

### Section 5 — Your Offering

**ID:** `#section-offering`
**Story beat:** Solution.
**Layout:** `max-width: 1200px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);`

**Content:**
- **Heading** (`text-section`): `Three ways we help`
- **Paragraph** (`text-body-lg`, `color: var(--muted-foreground)`, `max-width: 700px`, `margin-bottom: 2rem`): `Whether you're a leader who needs clarity, a team that needs skills, or a company that needs senior AI leadership — we work with you directly. No templates. No generic workshops. Everything is built around your situation.`

**Cards grid:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;`
**Tablet (`768–1023px`):** `grid-template-columns: repeat(2, 1fr);` (third card full-width below)
**Mobile (`<768px`):** `grid-template-columns: 1fr;`

3 service cards (see §6.3 for component spec):

1. **AI Coaching for Leaders** — Icon: `UserFocus` — Description: `One-to-one sessions for leaders who need clarity on AI. You bring your situation — you leave with a plan you can act on.` — Link: `/services/ai-coaching-for-leaders`
2. **AI Training for Teams** — Icon: `UsersThree` — Description: `Hands-on workshops built around your team's actual work. People learn by doing with the tools they'll use tomorrow.` — Link: `/services/ai-training-for-teams`
3. **Fractional Exec Support** — Icon: `Briefcase` — Description: `Senior AI go-to-market leadership without a full-time hire. Strategy, product direction, and execution for companies scaling AI.` — Link: `/services/fractional-exec-support`

**Animation:** React island, `client:visible`. `staggerContainer` on grid, each card uses `fadeUp`.

### Section 6 — Use Cases

**ID:** `#section-cases`
**Story beat:** Solution in context.
**Layout:** Two full-width stacked blocks. Each block: `padding: 2rem 0; border-bottom: 1px solid var(--border);` (last block no border). Max-width `800px`, centered.

Each block contains:
- Context paragraph: `text-body`, `color: var(--foreground)`, `margin-bottom: 1.5rem`.
- Quote: `text-body-lg`, `font-family: var(--font-serif)`, `font-style: italic`, `color: var(--foreground)`, `border-left: 3px solid var(--primary); padding-left: 1.5rem; margin-bottom: 1rem;`
- Attribution: `text-caption`, `font-weight: 600`, `color: var(--muted-foreground)`.

**Content:**

**Block 1:**
Context: `A managing partner at an AI startup needed to connect sales strategy with product direction. Gary reshaped their GTM approach, brought his global network to bear, and raised the standard across the company.`

Quote: `"He helped shape our product direction and pushed us to operate at a higher standard. His wide global network not only allowed us to sell more, and faster, but also helped us to validate our strategy and ideas for the business. What I value most is that he's a genuine partner — focused on results, but always bringing people along in the process."`

Attribution: `— Managing Partner, GenerativeLeads AI`

**Block 2:**
Context: `A director partnered with Gary across three companies over 10 years — every engagement involving complex deals, cross-functional teams, and customers who needed trust.`

Quote: `"His ability to bring people together, keep the focus on outcomes, and build trust across teams and customers makes him stand out as a leader and a partner. He's simply a great guy to have on your side."`

Attribution: `— Director Asia Pacific, Ace Pacific Group`

**Animation:** React island, `client:visible`. Each block `fadeUp`, stagger `0.2` between blocks.

### Section 7 — How It Works

**ID:** `#section-how`
**Story beat:** Remove confusion.
**Layout:** `max-width: 1200px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);`

Steps grid: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 2rem;`
**Mobile (`<768px`):** `grid-template-columns: 1fr;`

**Content:**

| Step 1 — We talk | Step 2 — You get a plan | Step 3 — We do the work together |
|---|---|---|
| Tell me where you are and what you're trying to figure out. No preparation needed. | Specific to your business, your team, and your goals. Not a template. | Coaching, training, or hands-on leadership. One accountable team, start to finish. |

Step number component (see §6.6): circle with number, heading below, description below heading.

CTA below grid, centered: `Book a Free Call` → `TIDYCAL_URL`. Primary CTA button.

**Animation:** React island, `client:visible`. `staggerContainer` on grid, each step `fadeUp`.

### Section 8 — Social Proof

**ID:** `#section-proof`
**Story beat:** Proof.
**Background:** `background: var(--secondary);` Full-bleed.
**Layout:** `max-width: 800px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem); position: relative;`

**Decorative quote mark:** `position: absolute; top: clamp(2rem, 4vw, 4rem); left: clamp(1.5rem, 5vw, 8rem); font-family: var(--font-serif); font-weight: 700; font-size: 6rem; line-height: 1; color: var(--primary); opacity: 0.2; user-select: none; pointer-events: none;` Content: `"`

**Content:**
- Quote: `"I originally hired him into Cyan when we were launching our international expansion. He joined as an SE and subsequently went on to head up pre-sales for APAC, then he successfully transitioned from pre-sales to sales and sales leadership. With Wedge Networks, Gary has demonstrated remarkable skill and resilience at introducing a small but innovative start-up into major accounts, competing against well-established Tier 1 incumbents. His strong work ethic, personal networking, and technical prowess have enabled him to enter new markets with minimal support to land key accounts."` — `text-body-lg`, `font-family: var(--font-serif)`, `font-style: italic`.
- Name: `Frank Wiener` — `text-body`, `font-weight: 600`.
- Title: `CMO and Director of Product Marketing (retired)` — `text-caption`, `color: var(--muted-foreground)`.

**Animation:** React island, `client:visible`. Quote `fadeUp`. Name/title `fadeUp` with `delay: 0.2`.

### Section 9 — Why Consultates?

**ID:** `#section-why`
**Story beat:** Authority.
**Layout:** `max-width: 1200px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);`

Columns: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;`
**Mobile (`<768px`):** `grid-template-columns: 1fr;`

**Content:**

**Column 1** — Heading (`text-sub`): `20 years building technology`
Paragraph (`text-body`): `Military electronics and cryptography in the Royal Air Force. Telecoms and internet infrastructure. 8 years at Juniper Networks in Silicon Valley. 5 years leading systems engineering at Cyan. He built the systems AI runs on.`

**Column 2** — Heading (`text-sub`): `15 years selling it`
Paragraph (`text-body`): `Systems engineer to VP Sales to CRO. Cybersecurity, AI, SaaS, enterprise networking. Built sales organisations from zero across 16 countries. Sat across from C-suite buyers in enterprise procurement cycles for over a decade.`

**Column 3** — Heading (`text-sub`): `Now builds with AI agents daily`
Paragraph (`text-body`): `Ships production applications with Claude Code, Codex, and Gemini CLI. Designs agentic workflows. Trains executive cohorts through FlexOS. Guest lecturer and monthly briefing host for Lead with AI PRO. The training works because he built the thing he's teaching.`

**Animation:** React island, `client:visible`. `staggerContainer` on grid, each column `fadeUp`.

### Section 10 — Stakes CTA

**ID:** `#section-cta`
**Story beat:** Urgency.
**Background:** `background: #0D1117;` (dark in both themes). All text white.
**Layout:** `text-align: center; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem); max-width: 800px; margin: 0 auto;`

**Content:**
- Headline (`text-section`, `color: #FFFFFF`): `84% of people haven't started. The 0.04% who build with AI agents aren't waiting for you to catch up.`
- CTA: `Book a Free Call` → `TIDYCAL_URL`. Button: `background: var(--primary); color: #FFFFFF;` (uses light-mode primary `#5C3B9C` always, since background is always dark). Hover: `background: #4E3285;`

**Animation:** React island, `client:visible`. Headline `fadeUp`. CTA `scaleIn` with `delay: 0.6`, then pulse: `scale: 1 → 1.05 → 1, duration: 400ms, ease: easeInOut`.

### Section 11 — Transitional CTAs

**ID:** `#section-transitional`
**Story beat:** Catch the not-yet-ready.
**Layout:** `display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 1200px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);`
**Mobile (`<768px`):** `grid-template-columns: 1fr;`

**Content (2 blog cards — see §6.7):**

Card 1:
- Title: `You're Not the Only One Stuck`
- Description: `If AI feels like something for tech people, you're not alone. Start here.`
- CTA: `Read` → `/blog/youre-not-the-only-one-stuck`

Card 2:
- Title: `How Safe Is AI Really?`
- Description: `What you need to know before you start using AI in your business.`
- CTA: `Read` → `/blog/how-safe-is-ai-really`

**Animation:** React island, `client:visible`. `staggerContainer` on grid, each card `fadeUp`, stagger `0.15`.

### Section 12 — Footer

See §6.8 for full spec. Not a scroll-snap section — always visible at bottom.

---

## 5. Inner Page Specs

### 5.1 Service Pages (×3)

**Shared template layout:** Hero → What You Get → Who It's For → How It Works → CTA.

Each section uses the same spacing as homepage sections: `padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem); max-width: 1200px; margin: 0 auto;`

"How It Works" on service pages reuses the same 3-step component from the homepage (Section 7). Same copy, same layout.

**AI Coaching for Leaders** (`/services/ai-coaching-for-leaders`)

Hero:
- Headline (`text-hero`): `AI Coaching for Leaders`
- Subline (`text-body-lg`, `color: var(--muted-foreground)`): `One-to-one sessions. You bring your real situation — you leave with a plan you can act on.`

What You Get (`text-section` heading, `text-body` paragraphs):
> Gary has sat across from C-suite executives for 15 years. He knows how to talk to leaders because he's been one and he's sold to them. The coaching isn't theoretical — it comes from someone who builds with AI every day and has done engineering, sales, and leadership across 35 years.
>
> Each session starts with where you are right now. What you're trying to figure out. What's keeping you up at night about AI. There's no fixed curriculum — the agenda is your situation. You leave with specific next steps, not general advice.

Who It's For (`text-sub` heading, `text-body` list):
> Business leaders, founders, fractional executives, solopreneurs, consultants — anyone who needs clarity on AI without the jargon. You don't need to be technical. You just need to be ready to start.

CTA: `Book a Free Call` → `TIDYCAL_URL`

**AI Training for Teams** (`/services/ai-training-for-teams`)

Hero:
- Headline (`text-hero`): `AI Training for Teams`
- Subline (`text-body-lg`, `color: var(--muted-foreground)`): `Hands-on workshops built around your team's actual work. Design thinking approach — people learn by doing.`

What You Get:
> The curriculum comes from building production systems, not reading about them. Gary's trained 30–50 person cohorts through FlexOS. He tracks behavioural change and daily tool usage, not completion certificates.
>
> Every workshop is built around your team's real work — the tools they'll use tomorrow, the problems they're dealing with today. People learn by doing, not by watching slides. By the end, your team has practiced with AI on their actual tasks, not hypothetical examples.

Who It's For:
> Teams told to "use AI" but given no guidance. Sales teams, marketing teams, operations teams — anyone doing knowledge work. Works for groups of 5 to 50.

CTA: `Book a Free Call` → `TIDYCAL_URL`

**Fractional Exec Support** (`/services/fractional-exec-support`)

Hero:
- Headline (`text-hero`): `Fractional Executive Support`
- Subline (`text-body-lg`, `color: var(--muted-foreground)`): `Senior AI go-to-market leadership without a full-time hire.`

What You Get:
> Gary has been a CRO, VP Sales (×3), MD, and co-founder. He's built entire sales organisations from zero across APAC, Europe, and the US. He brings strategy, product direction, and execution for companies scaling AI initiatives or entering new markets.
>
> This isn't advisory from a distance. It's hands-on leadership — building your GTM motion, shaping product direction, coaching your team, and opening doors through a global network built over 16 countries and 15 years.

Who It's For:
> Startups and scale-ups that need experienced GTM leadership for AI products but aren't ready for (or don't need) a full-time exec hire. Companies entering new markets, launching AI products, or building their first sales organisation.

CTA: `Book a Free Call` → `TIDYCAL_URL`

### 5.2 About Page

**Route:** `/about`

**Section 1 — Hero:**
- Photo: `Me for Website-1800x1800.png` (from Logos directory — copy to `public/images/gary-tate.webp`, convert + resize to 400×400 WEBP). Displayed as `width: 200px; height: 200px; border-radius: 50%; object-fit: cover;`
- Headline (`text-hero`): `Engineer. Commercial leader. AI practitioner.`
- Subline (`text-body-lg`, `color: var(--muted-foreground)`): `35 years across military electronics, enterprise sales leadership, and production AI.`

**Section 2 — The Story:**
Heading (`text-section`): `The through-line`

> Gary started coding at 10. He joined the Royal Air Force and spent a decade in military electronics, telecoms, cryptography, and secure communications — physical systems where mistakes aren't theoretical.
>
> Then another decade building telecoms and internet infrastructure. His own company first, then 8 years as a Senior Systems Engineer at Juniper Networks in Silicon Valley. Later, 5 years as Director of Systems Engineering at Cyan.
>
> He moved from engineering into sales — not because he stopped being technical, but because he could sit in front of a CRO and explain the technology in terms that closed deals. Systems engineer → Director → MD Sales → VP Sales (three times) → CRO. Always deep-tech companies — cybersecurity, AI, enterprise SaaS, networking infrastructure. 16 countries. He built entire sales organisations from zero.
>
> Today, Gary ships production applications with AI agents. He designs agentic workflows with real API integrations. He builds alone what would have taken a small team two years ago.
>
> Most AI consultants fall into one camp: technical people who can't explain it to a boardroom, business people who've never built anything, or trainers teaching from slides they didn't write. Gary does all three. That's why the consulting, the training, and the leadership all carry weight.

**Section 3 — Family Business:**
Heading (`text-section`): `A family business`

> Consultates is Gary and Trinh Tate. They don't scale through volume. They scale through trust. You get one accountable team from start to finish — not a rotating cast of consultants.

**Section 4 — Lead with AI PRO:**
Heading (`text-section`): `Lead with AI PRO`

> Gary is a guest lecturer and hosts monthly agentic briefings through Lead with AI PRO — a platform with 3× weekly analyst briefings, tutorials, and an active WhatsApp community. His sessions feature live demos of OpenClaw (his own agentic framework) and synthesise what the leading voices in AI — Karpathy, Amodei, Suleiman, Roose — are saying, translated for non-technical leaders.

**Section 5 — CTA:** `Book a Free Call` → `TIDYCAL_URL`

### 5.3 Blog

**Route:** `/blog` (index) + `/blog/[slug]` (posts)

**Engine:** Astro content collections. Markdown files in `src/content/blog/`.

**Content collection schema** (`src/content/config.ts`):
```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(), // YYYY-MM-DD in frontmatter, parsed as Date
    author: z.string().default('Gary Tate'),
    excerpt: z.string().max(200).optional(), // Auto-generated from first 160 chars if absent
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**Blog index layout:** `display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;`
**Mobile (`<768px`):** `grid-template-columns: 1fr;`
Each card: see §6.7.

**Blog post layout:** `max-width: 720px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);`
- Heading: `text-hero` (Plex Serif)
- Date + reading time: `text-cite`, `color: var(--muted-foreground)`, `margin-bottom: 2rem`
- Prose: Tailwind typography plugin (`@tailwindcss/typography`). `prose prose-lg`. Headings in Plex Serif, body in Plex Sans.

**Initial posts (3):** Migrate from `~/.openclaw/Mi6-IQ/projects/consultates-rebuild/content/`:
1. `how-safe-is-ai-really.md`
2. `youre-not-the-only-one-stuck.md`
3. `get-out-of-the-ai-cage.md`

### 5.4 Contact Page

**Route:** `/contact`

**Layout:** `display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 1200px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);`
**Mobile (`<768px`):** `grid-template-columns: 1fr;`

**Left column:**
- Heading (`text-section`): `Let's talk`
- Paragraph (`text-body-lg`, `color: var(--muted-foreground)`): `Whether you have a specific challenge or just want to explore how AI fits into your business — I'd like to hear from you. Book a call, send a message, or connect on LinkedIn.`
- Direct links (list, `text-body`):
  - `Email: info@consultates.com` → `mailto:info@consultates.com`
  - `LinkedIn` → `https://www.linkedin.com/company/consultates-limited/`
  - `Book a free call` → `TIDYCAL_URL`

**Right column — Contact form:**

Fields (see §6.9 for input component spec):

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | `text` | Yes | 2–100 characters |
| Email | `email` | Yes | HTML5 email validation (`type="email"`) |
| Company | `text` | No | Max 100 characters |
| Message | `textarea` | Yes | 10–5000 characters, `rows="5"` |

- Honeypot: hidden field `<input type="text" name="website" class="sr-only" tabindex="-1" autocomplete="off">` — if filled, reject submission.
- Submit button: `Send Message` — primary button style.
- **Phase 1 behaviour (no backend):** On submit, `e.preventDefault()`. Disable button, change text to `Sending...` for 1 second, then show success message: `Thanks for your message. I'll get back to you within 24 hours.` in a `div` with `background: var(--secondary); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem; color: var(--foreground);` replacing the form.
- **Phase 2 behaviour (with backend):** POST to Google Apps Script endpoint. States:
  - Idle: form visible, button enabled
  - Submitting: button disabled, text `Sending...`
  - Success: form replaced with success message (same as Phase 1)
  - Error: form stays visible, error message below form: `Something went wrong. Please try again or email info@consultates.com directly.` — `text-caption`, `color: var(--destructive)`.

### 5.5 Privacy Policy

**Route:** `/privacy-policy`

**Layout:** Same as blog post — `max-width: 720px; margin: 0 auto;` Prose styling.

**Content** (from extracted site):

```markdown
---
title: Privacy Policy
lastUpdated: 2024-04-01
---

# Privacy Policy

**Last updated:** April 1st, 2024

## Company

Consultates Limited
Unit 1603, 16th Floor, The L. Plaza
367–375 Queen's Road Central
Sheung Wan, Hong Kong
Email: info@consultates.com

## Compliance

This policy is guided by:
- Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong
- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)

## Data We Collect

- **Personal information:** name, email address, company name, phone number, form submissions
- **Usage data:** IP address, browser type, pages visited, device information, approximate location
- **Metadata:** form responses, timestamps, referral sources

## How We Use Your Data

- Provide and improve our services
- Respond to inquiries and booking requests
- Marketing communications (with opt-out)
- Analytics and site improvement
- Legal compliance

We do not sell your personal data.

## Cookies

- **Essential cookies:** required for site functionality
- **Analytics cookies:** Google Analytics (anonymised)

## Third-Party Services

- **Analytics:** Google Analytics
- **Booking:** TidyCal

## Data Retention

We retain personal data only as long as necessary. You may request deletion at any time.

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Withdraw consent
- File a complaint with the Privacy Commissioner for Personal Data (PCPD)

## Children

Our services are not directed at individuals under 18.

## Security

We protect your data through HTTPS encryption, access controls, and data minimisation practices.

## Contact

For privacy-related inquiries: info@consultates.com
```

### 5.6 404 Page

**Route:** `/404` (Astro: `src/pages/404.astro`)

**Layout:** Centered, `min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;`

**Content:**
- Heading (`text-hero`): `Page not found`
- Paragraph (`text-body-lg`, `color: var(--muted-foreground)`): `The page you're looking for doesn't exist or has been moved.`
- CTA: `Back to Home` → `/` — secondary button style.

---

## 6. Component Inventory

### 6.1 Nav

See Section 1 spec in §4 — fully self-contained there.

### 6.2 Buttons

| Variant | Background | Text | Border | Hover bg | Hover transform |
|---------|------------|------|--------|----------|-----------------|
| Primary | `var(--primary)` | `var(--primary-foreground)` | none | `var(--primary-hover)` | none |
| Secondary | `var(--secondary)` | `var(--secondary-foreground)` | `1px solid var(--border)` | `var(--accent)` | none |
| Ghost | `transparent` | `var(--foreground)` | none | `var(--muted)` | none |
| CTA (large) | `var(--primary)` | `var(--primary-foreground)` | none | `var(--primary-hover)` | `scale(1.02)` |

All buttons: `font-family: var(--font-sans); font-weight: 600; border-radius: 0.5rem; transition: background-color 150ms ease, transform 150ms ease;`

| Size | Height | Padding |
|------|--------|---------|
| Default | `h-10` (40px) | `px-6` |
| Large / CTA | `h-12` (48px) | `px-8` |

States (all variants):
- Focus visible: `outline: 2px solid var(--ring); outline-offset: 2px;`
- Active: `transform: scale(0.98);`
- Disabled: `opacity: 0.5; cursor: not-allowed; pointer-events: none;`

### 6.3 Service Card

- `background: var(--card); border: 1px solid var(--border); border-radius: 0.75rem; padding: 2rem;`
- Icon: Phosphor duotone, `size={32}`, `color="var(--icon-duotone)"`
- Title: `text-sub`
- Description: `text-body`, `color: var(--muted-foreground)`
- Link: `Learn more` — `text-body`, `color: var(--primary)`, `font-weight: 500`
- Hover: `transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); transition: transform 0.2s ease, box-shadow 0.2s ease;`
- Focus visible: `outline: 2px solid var(--ring); outline-offset: 2px;`

### 6.4 Testimonial Block

- Container: `position: relative; padding-left: 1.5rem; border-left: 3px solid var(--primary);`
- Decorative `"`: `position: absolute; top: -1rem; left: -0.5rem; font-family: var(--font-serif); font-weight: 700; font-size: 6rem; line-height: 1; color: var(--primary); opacity: 0.2; user-select: none; pointer-events: none;`
- Quote text: `text-body-lg`, `font-family: var(--font-serif)`, `font-style: italic`
- Name: `text-body`, `font-weight: 600`
- Title: `text-caption`, `color: var(--muted-foreground)`

### 6.5 Stat Block

- Number: `text-stats`, `color: var(--primary)`, `font-family: var(--font-mono)`
- Label: `text-body`, `color: var(--foreground)`
- Source: `text-cite`, `color: var(--muted-foreground)`, `font-family: var(--font-mono)`

### 6.6 Step Card

- Circle: `width: 48px; height: 48px; border: 2px solid var(--primary); border-radius: 50%; background: transparent; display: flex; align-items: center; justify-content: center;`
- Number inside circle: `font-family: var(--font-mono); font-weight: 700; font-size: 1.125rem; color: var(--primary);`
- Heading: `text-sub`, `margin-top: 1rem`
- Description: `text-body`, `margin-top: 0.5rem`

### 6.7 Blog Card

- `background: var(--card); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.5rem;`
- Title: `text-sub` (Plex Sans 600, `clamp(1.125rem, 2vw, 1.5rem)`)
- Date: `text-cite`, `color: var(--muted-foreground)`, `font-family: var(--font-mono)`
- Excerpt: `text-body`, `display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;`
- CTA: `Read` — `text-body`, `color: var(--primary)`, `font-weight: 500`
- Hover: `transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.06); transition: transform 0.2s ease, box-shadow 0.2s ease;`
- Focus visible: `outline: 2px solid var(--ring); outline-offset: 2px;`

### 6.8 Footer

- Background: `var(--footer-bg)` (always `#0D1117`)
- Text: `var(--footer-text)`
- Links: `color: var(--footer-link);` Hover: `color: var(--footer-link-hover); transition: color 150ms ease;`
- Layout: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 3rem clamp(1.5rem, 5vw, 8rem);`
- Mobile (`<768px`): `grid-template-columns: 1fr;`

Content:
- **Column 1:** Consultates logo (dark theme variant, `height: 32px`) + `Consultates Limited` (`text-caption`)
- **Column 2:** Quick links: Home, Services, About, Blog, Contact, Privacy Policy — `text-body`, list with `margin-bottom: 0.5rem` per item
- **Column 3:** `info@consultates.com` (mailto link) + LinkedIn icon link (`LinkedinLogo` from Phosphor, 24px)

Bottom bar: `border-top: 1px solid var(--footer-border); padding-top: 1.5rem; margin-top: 1.5rem; text-align: center;`
- Line 1: `Global and Remote — Connecting where you are` — `text-caption`
- Line 2: Quote: `"Artificial intelligence is not a substitute for human intelligence; it is a tool to amplify human creativity and ingenuity."` — `text-caption`, `font-family: var(--font-serif)`, `font-style: italic`, `opacity: 0.7`
- Line 3: `© 2026 Consultates Limited` — `text-cite`

### 6.9 Form Inputs

- Container: `display: flex; flex-direction: column; gap: 0.25rem;`
- Label: `text-caption`, `font-weight: 500`, `color: var(--foreground)`, `margin-bottom: 0.25rem`
- Input/textarea: `background: var(--card); border: 1px solid var(--border); border-radius: 0.5rem; padding: 0.625rem 0.75rem; font-family: var(--font-sans); font-size: 1rem; color: var(--foreground); transition: border-color 150ms ease;`
- Placeholder: `color: var(--muted-foreground);`
- Focus: `border-color: var(--ring); outline: 2px solid var(--ring); outline-offset: 0;`
- Error: `border-color: var(--destructive);` + error message below: `text-cite`, `color: var(--destructive)`, `margin-top: 0.25rem`
- Disabled: `opacity: 0.5; cursor: not-allowed;`

### 6.10 Theme Toggle

- Position: nav bar, right side (before CTA button on desktop; in mobile menu on mobile)
- Icon: `Sun` (light active) / `Moon` (dark active) / `Monitor` (system) — Phosphor duotone, 20px
- Cycle: light → dark → system → light
- Button: ghost button style, `width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;`
- React island, `client:load`
- On mount: read `document.documentElement.classList.contains('dark')` to sync initial state

**Theme flash prevention — inline blocking script in `<head>`:**

```html
<script>
  (function() {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light' ? stored : (stored === 'system' || !stored) ? (prefersDark ? 'dark' : 'light') : 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  })();
</script>
```

`localStorage` key: `'theme'`. Values: `'light'`, `'dark'`, `'system'`. Default when no stored preference: follow `prefers-color-scheme`, fallback to light.

### 6.11 Scroll Indicator

- Position: `position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);`
- Mouse outline: `width: 30px; height: 50px; border: 2px solid var(--foreground); border-radius: 15px; opacity: 0.6;`
- Inner dot: `width: 6px; height: 6px; border-radius: 50%; background: var(--foreground); margin: 6px auto 0;`
- Dot animation: `animation: scroll-bob 2s infinite ease-in-out;`
- Keyframes: `@keyframes scroll-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }`
- Disappears on scroll — see §3.1

---

## 7. Integrations

### 7.1 TidyCal Booking

- URL: `https://tidycal.com/garyctate/15-minute-meeting`
- All CTA buttons link to this URL with `target="_blank" rel="noopener noreferrer"`
- TidyCal embed on contact page: later phase

### 7.2 Contact Form Backend

- Phase 1: client-side only (see §5.4 for Phase 1 behaviour)
- Phase 2: Google Apps Script web app endpoint → email to `info@consultates.com` + Google Sheet log

### 7.3 Google Analytics

- Tag: `G-K8K16L2VET`
- Phase: later phase (not phase 1)

---

## 8. Deployment

### 8.1 GitHub Pages

- Repository: `consultates-rebuild`
- Branch: `main` is production
- Custom domain: `consultates.com` via `public/CNAME`
- SSL: automatic

### 8.2 GitHub Actions CI/CD

On push to `main`:
1. Checkout
2. Setup Node 22 + pnpm 9
3. `pnpm install --frozen-lockfile`
4. `pnpm build`
5. Deploy `dist/` to GitHub Pages

### 8.3 Astro Config

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://consultates.com',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### 8.4 SEO

- Sitemap: auto-generated by `@astrojs/sitemap`
- Meta tags: per-page (see route table in §1.1)
- Structured data: `WebPage` schema on all pages
- Canonical URLs: set on every page
- `robots.txt`: allow all
- OG image: generate from brand template (later phase — use head mark as fallback)

---

## 9. Asset Manifest

| Asset | Source file | Destination |
|-------|-----------|-------------|
| Head mark (favicon) | `Consultates Icons /Consultates-favicon-130x130-transparent.png` | `public/favicon.png` |
| Head mark (large) | `Consultates Icons /Consultates-head-400x400-transparent.png` | `public/images/consultates-head.png` |
| Logo (light theme) | `Consultates Logos/Consultates-logo-lighttheme-horizontal-100x341-transparent.webp` | `public/images/logo-light.webp` |
| Logo (dark theme) | `Consultates Logos/Consultates-logo-darktheme-horizontal-100x341-transparent.webp` | `public/images/logo-dark.webp` |
| Gary photo | `Consultates Logos/Me for Website-1800x1800.png` | `public/images/gary-tate.webp` (convert + resize to 400×400) |
| Font: Plex Sans | Google Fonts / `@fontsource` | `public/fonts/IBMPlexSans-*.woff2` |
| Font: Plex Serif | Google Fonts / `@fontsource` | `public/fonts/IBMPlexSerif-*.woff2` |
| Font: Plex Mono | Google Fonts / `@fontsource` | `public/fonts/IBMPlexMono-*.woff2` |
| Blog posts | `content/*.md` (project dir) | `src/content/blog/*.md` |
| Privacy policy | Inline in §5.5 | `src/pages/privacy-policy.astro` |

Source directories (absolute paths on build machine):
- Logos: `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/Consultates Logos/`
- Icons: `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/Consultates Icons /`
- Blog content: `~/.openclaw/Mi6-IQ/projects/consultates-rebuild/content/`

---

## 10. Dependencies

| Package | Version | Scope | Notes |
|---------|---------|-------|-------|
| `astro` | `^5.4` | prod | Static site generator |
| `@astrojs/react` | `^4.2` | prod | React island integration |
| `@astrojs/sitemap` | `^3.3` | prod | Auto-sitemap |
| `@tailwindcss/vite` | `^4.1` | dev | Tailwind 4 Vite plugin |
| `@tailwindcss/typography` | `^0.5` | dev | Prose styling for blog |
| `tailwindcss` | `^4.1` | dev | CSS framework |
| `react` | `^19.0` | prod | UI library |
| `react-dom` | `^19.0` | prod | React DOM |
| `framer-motion` | `^12.4` | prod | Component animation |
| `gsap` | `^3.12` | prod | ScrollTrigger is free in v3 |
| `@phosphor-icons/react` | `^2.1` | prod | Icon library |

**Package manager:** pnpm 9
**Node.js:** 22 (LTS)
**Lock file:** `pnpm-lock.yaml` committed to repo

---

## 11. Island Hydration Directives

| Component | Directive | Reason |
|-----------|-----------|--------|
| Hero animation (letter stagger) | `client:load` | Fires on page load with 1200ms delay |
| Theme toggle | `client:load` | Must respond immediately |
| Trust bar animation | `client:visible` | Only when scrolled to |
| Negative stakes (stat block) | `client:visible` | Count-up on viewport entry |
| Service cards (animated) | `client:visible` | Stagger on viewport entry |
| Use cases animation | `client:visible` | Fade on viewport entry |
| How it works animation | `client:visible` | Stagger on viewport entry |
| Social proof animation | `client:visible` | Fade on viewport entry |
| Why Consultates animation | `client:visible` | Stagger on viewport entry |
| Stakes CTA animation | `client:visible` | Fade + pulse on viewport entry |
| Transitional CTAs animation | `client:visible` | Stagger on viewport entry |
| Contact form | `client:load` | User may jump via direct link |

Non-React components (Astro only, no hydration): Nav, Footer, blog post layout, service page layout, about page layout, privacy policy, 404 page.

---

## 12. Out of Scope (Phase 1)

- Google Apps Script form backend (client-side mock only)
- Google Analytics tag
- Chat widget
- TidyCal embed (links only, no embed)
- Blog post images
- Cookie consent banner
- i18n / multilingual
- OG image generation (use head mark as fallback)

---

## 13. Build Order (for GSD phasing)

1. **Scaffold** — Astro 5 project, Tailwind 4 (`@tailwindcss/vite`), React integration, font loading, color tokens in CSS `@theme` block, base layout with theme script
2. **Components** — Nav (with mega menu + mobile toggle), footer, buttons, cards, form inputs, theme toggle, scroll indicator
3. **Homepage** — All 12 StoryBrand sections with content, layout, and section IDs (no animation yet)
4. **Animation** — GSAP ScrollTrigger in base layout script, Framer Motion islands replacing static sections, hero sequence, count-up, reduced motion
5. **Inner pages** — Service pages ×3, About, Contact (with Phase 1 form mock), Privacy Policy, 404
6. **Blog** — Content collections config, blog index, blog post layout, migrate 3 posts
7. **Polish** — Responsive testing across breakpoints, accessibility audit (focus states, ARIA), performance (Lighthouse), favicon, meta tags
8. **Deploy** — GitHub Actions workflow, GitHub Pages config, CNAME, sitemap verification

---

*PRD v2.0 — All feedback from Opus 4.6, Codex 5.3, and Gemini 3.0 Pro incorporated. This document is the single source of truth for building consultates.com.*
