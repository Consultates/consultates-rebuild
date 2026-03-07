# Requirements: Consultates.com Rebuild

**Defined:** 2026-03-05
**Core Value:** Business leaders can quickly understand what Consultates offers and book a free call

## v1.0 Requirements (Complete)

### Foundation

- [x] **FOUND-01**: Site scaffolded with Astro 5, React integration, and static output
- [x] **FOUND-02**: Tailwind 4 configured via CSS-first `@theme` block with all color tokens (light + dark)
- [x] **FOUND-03**: IBM Plex Sans/Serif/Mono self-hosted as WOFF2 with font-display swap
- [x] **FOUND-04**: Base layout with theme flash prevention script in `<head>`
- [x] **FOUND-05**: Custom type scale defined (text-hero, text-section, text-sub, text-body-lg, text-body, text-caption, text-stats, text-cite)

### Navigation

- [x] **NAV-01**: Fixed nav bar with logo, center links, and CTA button
- [x] **NAV-02**: Services mega menu dropdown with icons and descriptions
- [x] **NAV-03**: Mobile hamburger menu with full-screen overlay
- [x] **NAV-04**: Active page indicator on current nav link
- [x] **NAV-05**: Nav background with backdrop blur and semi-transparent background

### Theme

- [x] **THEME-01**: Light/dark/system theme toggle cycling light → dark → system → light
- [x] **THEME-02**: Theme persisted to localStorage, restored on page load without flash
- [x] **THEME-03**: Logo swaps between light and dark variants based on active theme

### Homepage

- [x] **HOME-01**: Hero section with letter-stagger headline, paragraph, CTA, and scroll indicator
- [x] **HOME-02**: Trust bar with credentials separated by middle dots
- [x] **HOME-03**: Negative stakes section with 84% count-up stat and 12-18 months static stat
- [x] **HOME-04**: Offering section with 3 service cards linking to service pages
- [x] **HOME-05**: Use cases section with 2 testimonial blocks
- [x] **HOME-06**: How it works section with 3 numbered steps and CTA
- [x] **HOME-07**: Social proof section with full testimonial quote on secondary background
- [x] **HOME-08**: Why Consultates section with 3 authority columns
- [x] **HOME-09**: Stakes CTA section with always-dark background and pulse animation
- [x] **HOME-10**: Transitional CTAs section with 2 blog cards

### Animation

- [x] **ANIM-01**: GSAP ScrollTrigger scroll-snap with zoom transitions on desktop (≥1024px)
- [x] **ANIM-02**: GSAP disabled on tablet/mobile
- [x] **ANIM-03**: Framer Motion fadeUp/scaleIn/staggerContainer variants
- [x] **ANIM-04**: Hero letter stagger sequence
- [x] **ANIM-05**: Count-up animation from 0 to 84
- [x] **ANIM-06**: CTA pulse animation
- [x] **ANIM-07**: Scroll indicator with bob animation
- [x] **ANIM-08**: Reduced motion support

### Inner Pages

- [x] **SERV-01**: AI Coaching for Leaders page
- [x] **SERV-02**: AI Training for Teams page
- [x] **SERV-03**: Fractional Exec Support page
- [x] **ABOUT-01**: About page with photo, story, family business, Lead with AI PRO, CTA
- [x] **CONT-01**: Contact page with info + form columns
- [x] **CONT-02**: Form with name, email, company, message fields
- [x] **CONT-03**: Client-side form mock with success message
- [x] **LEGAL-01**: Privacy policy page
- [x] **ERR-01**: 404 page

### Components, Footer, SEO, Deploy, Assets

- [x] **COMP-01** through **COMP-09**: All shared UI components
- [x] **FOOT-01**, **FOOT-02**: Always-dark footer
- [x] **SEO-01** through **SEO-04**: Meta tags, sitemap, canonical, robots
- [x] **DEPLOY-01** through **DEPLOY-03**: GitHub Actions, GitHub Pages, favicon
- [x] **ASSET-01** through **ASSET-04**: Logos, photo, favicon, fonts

### Audit Fixes

- [x] **AUDIT-01**: GSAP crash guard for inner pages
- [x] **AUDIT-02**: Footer content matches PRD
- [x] **AUDIT-03**: TrustBar as standalone scroll-section
- [x] **AUDIT-04**: CountUpStat MutationObserver for GSAP sections

## v2.0 Requirements (Visual Redesign)

### Global Foundation

- [x] **RDES-01**: Design system type scale applied — hero `clamp(2.75rem, 5.5vw, 4rem)`, stats `clamp(3.5rem, 7vw, 5.5rem)`, subheadings in serif
- [x] **RDES-02**: Design system spacing variables added — `--section-py`, `--section-gap`, `--card-padding`, `--card-radius`, `--btn-radius`, `--content-max`, `--content-px`
- [x] **RDES-03**: Texture/ornament utility classes added — `.bg-dots`, `.glow`, `.corner-marks`
- [x] **RDES-04**: Animation keyframes added — `fadeInUp`, `scaleIn`, `slideInLeft`, `slideInRight`, `drawLine`
- [x] **RDES-05**: Design system color tokens added — `--hero-bg`, `--hero-fg`, `--hero-muted`, `--stakes-bg`, `--stakes-fg`, `--stakes-accent`, `--dot-color`, `--glow-color`, `--corner-color`

### Hero

- [x] **RDES-06**: Background video plays (autoplay, muted, loop, monochrome via `filter: grayscale(1)`) with dark overlay
- [x] **RDES-07**: Dot grid overlay and radial purple glow behind headline
- [x] **RDES-08**: Hero type scale to design system sizes, white text on dark, `<em>` in accent purple
- [x] **RDES-09**: CTA button pill-shaped with accent purple and arrow shift on hover
- [x] **RDES-10**: Body text uses `--hero-muted`, max-width 580px
- [x] **RDES-11**: Poster image fallback on mobile (video hidden below 768px)
- [x] **RDES-12**: Hero delay reduced from 1200ms to 1000ms

### Trust Bar

- [x] **RDES-13**: Trust bar as standalone section below hero (not overlay)
- [x] **RDES-14**: Visible on all devices including mobile
- [x] **RDES-15**: Credential markers with dot separators in flex row, wrapping on mobile
- [x] **RDES-16**: Typography: 13px, 500 weight, `--fg-muted`, 0.01em letter-spacing

### Negative Stakes

- [x] **RDES-17**: Three stats in three-column grid
- [x] **RDES-18**: Text-stroke treatment on stat numbers at full designed size
- [x] **RDES-19**: Radial glow centered on section
- [x] **RDES-20**: Pull quote below stats

### Offering

- [x] **RDES-21**: Cards per design system: 16px radius, gradient icon containers, inset accent hover
- [x] **RDES-22**: Card titles in serif
- [x] **RDES-23**: Staggered card reveal (0s, 0.12s, 0.24s)
- [x] **RDES-24**: Card gap 1.25rem

### Use Cases

- [x] **RDES-25**: Alternating two-column layout with three use cases
- [x] **RDES-26**: Mono uppercase labels
- [x] **RDES-27**: Image placeholders with corner marks
- [x] **RDES-28**: Slide-in entrance animations

### How It Works

- [x] **RDES-29**: Animated timeline with GSAP — connecting line draws on scroll
- [x] **RDES-30**: Step nodes fill sequentially (48px circles, pulse animation)
- [x] **RDES-31**: Content reveals per node
- [x] **RDES-32**: Horizontal desktop, vertical mobile
- [x] **RDES-33**: Reduced motion fallback

### Social Proof

- [x] **RDES-34**: Photo placeholder circle (72x72px) with initials
- [x] **RDES-35**: Quote size up to `clamp(1.125rem, 2vw, 1.375rem)`

### Authority

- [x] **RDES-36**: Authority cards with border, radius, padding, hover accent
- [x] **RDES-37**: Stat callouts in serif purple
- [x] **RDES-38**: Staggered card reveal

### Stakes CTA

- [x] **RDES-39**: Radial purple glow
- [x] **RDES-40**: Accent-highlighted `<em>`
- [x] **RDES-41**: Corner marks on section
- [x] **RDES-42**: Pill button matching hero CTA

### Transitional CTAs

- [x] **RDES-43**: Three cards filling the row
- [x] **RDES-44**: Section heading: "Not ready to book? Start here."
- [x] **RDES-45**: Card titles in serif, hover accent border

### About Page

- [x] **RDES-46**: Asymmetric two-column hero
- [x] **RDES-47**: Editorial timeline layout
- [x] **RDES-48**: Family business warm-background card
- [x] **RDES-49**: Lead with AI PRO card/banner
- [x] **RDES-50**: Dark CTA section

### Service Pages

- [x] **RDES-51**: Individual layout per service page
- [x] **RDES-52**: Structured "what you get" as outcomes grid/list
- [x] **RDES-53**: Scenario-based "who it's for"
- [x] **RDES-54**: Embedded testimonial per service page
- [ ] **RDES-55**: How it works with connecting line
- [ ] **RDES-56**: Dark CTA section per service page

### Contact Page

- [ ] **RDES-57**: Contact methods as card-style items
- [ ] **RDES-58**: TidyCal booking gets pill button CTA
- [ ] **RDES-59**: Form inputs per design system

### Blog

- [ ] **RDES-60**: Three-column card grid
- [ ] **RDES-61**: Cards per design system (16px radius, hover accent)
- [ ] **RDES-62**: Card titles in serif
- [ ] **RDES-63**: Blog post layout with wider column, mono date, serif title

## Future Requirements

### Integrations

- **INT-01**: Google Apps Script form backend (email + Google Sheet)
- **INT-02**: Google Analytics GA4 tag
- **INT-03**: TidyCal embed on contact page
- **INT-04**: Cookie consent banner

### Content

- **CONT-04**: Blog post images
- **CONT-05**: OG image generation from brand template

## Out of Scope

| Feature | Reason |
|---------|--------|
| Chat widget | Not aligned with high-touch consulting model |
| i18n / multilingual | English-only audience |
| E-commerce / payments | No products sold online |
| User accounts / auth | No user-facing login needed |
| CMS / admin panel | Markdown + git is sufficient |
| Copy/content rewrites | v2.0 preserves existing copy |
| StoryBrand structure changes | Section order unchanged in v2.0 |
| GSAP scroll-snap modifications | Explicitly excluded from redesign |
| New dependencies | Everything achievable with existing stack |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| RDES-01 | Phase 10 | Complete |
| RDES-02 | Phase 10 | Complete |
| RDES-03 | Phase 10 | Complete |
| RDES-04 | Phase 10 | Complete |
| RDES-05 | Phase 10 | Complete |
| RDES-06 | Phase 10 | Complete |
| RDES-07 | Phase 10 | Complete |
| RDES-08 | Phase 10 | Complete |
| RDES-09 | Phase 10 | Complete |
| RDES-10 | Phase 10 | Complete |
| RDES-11 | Phase 10 | Complete |
| RDES-12 | Phase 10 | Complete |
| RDES-13 | Phase 10 | Complete |
| RDES-14 | Phase 10 | Complete |
| RDES-15 | Phase 10 | Complete |
| RDES-16 | Phase 10 | Complete |
| RDES-17 | Phase 11 | Complete |
| RDES-18 | Phase 11 | Complete |
| RDES-19 | Phase 11 | Complete |
| RDES-20 | Phase 11 | Complete |
| RDES-21 | Phase 11 | Complete |
| RDES-22 | Phase 11 | Complete |
| RDES-23 | Phase 11 | Complete |
| RDES-24 | Phase 11 | Complete |
| RDES-25 | Phase 12 | Complete |
| RDES-26 | Phase 12 | Complete |
| RDES-27 | Phase 12 | Complete |
| RDES-28 | Phase 12 | Complete |
| RDES-29 | Phase 12 | Complete |
| RDES-30 | Phase 12 | Complete |
| RDES-31 | Phase 12 | Complete |
| RDES-32 | Phase 12 | Complete |
| RDES-33 | Phase 12 | Complete |
| RDES-34 | Phase 13 | Complete |
| RDES-35 | Phase 13 | Complete |
| RDES-36 | Phase 13 | Complete |
| RDES-37 | Phase 13 | Complete |
| RDES-38 | Phase 13 | Complete |
| RDES-39 | Phase 13 | Complete |
| RDES-40 | Phase 13 | Complete |
| RDES-41 | Phase 13 | Complete |
| RDES-42 | Phase 13 | Complete |
| RDES-43 | Phase 13 | Complete |
| RDES-44 | Phase 13 | Complete |
| RDES-45 | Phase 13 | Complete |
| RDES-46 | Phase 14 | Complete |
| RDES-47 | Phase 14 | Complete |
| RDES-48 | Phase 14 | Complete |
| RDES-49 | Phase 14 | Complete |
| RDES-50 | Phase 14 | Complete |
| RDES-51 | Phase 15 | Complete |
| RDES-52 | Phase 15 | Complete |
| RDES-53 | Phase 15 | Complete |
| RDES-54 | Phase 15 | Complete |
| RDES-55 | Phase 15 | Pending |
| RDES-56 | Phase 15 | Pending |
| RDES-57 | Phase 16 | Pending |
| RDES-58 | Phase 16 | Pending |
| RDES-59 | Phase 16 | Pending |
| RDES-60 | Phase 17 | Pending |
| RDES-61 | Phase 17 | Pending |
| RDES-62 | Phase 17 | Pending |
| RDES-63 | Phase 17 | Pending |

**Coverage:**
- v2.0 requirements: 63 total
- Mapped to phases: 63
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-06 after v2.0 requirements added*
