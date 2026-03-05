# Requirements: Consultates.com Rebuild

**Defined:** 2026-03-05
**Core Value:** Business leaders can quickly understand what Consultates offers and book a free call

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Site scaffolded with Astro 5, React integration, and static output
- [x] **FOUND-02**: Tailwind 4 configured via CSS-first `@theme` block with all color tokens (light + dark)
- [x] **FOUND-03**: IBM Plex Sans/Serif/Mono self-hosted as WOFF2 with font-display swap
- [x] **FOUND-04**: Base layout with theme flash prevention script in `<head>`
- [x] **FOUND-05**: Custom type scale defined (text-hero, text-section, text-sub, text-body-lg, text-body, text-caption, text-stats, text-cite)

### Navigation

- [x] **NAV-01**: Fixed nav bar with logo, center links, and CTA button
- [x] **NAV-02**: Services mega menu dropdown with icons and descriptions (hover on desktop, tap on mobile)
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
- [x] **HOME-05**: Use cases section with 2 testimonial blocks (context + quote + attribution)
- [x] **HOME-06**: How it works section with 3 numbered steps and CTA
- [x] **HOME-07**: Social proof section with full testimonial quote on secondary background
- [x] **HOME-08**: Why Consultates section with 3 authority columns
- [x] **HOME-09**: Stakes CTA section with always-dark background and pulse animation
- [x] **HOME-10**: Transitional CTAs section with 2 blog cards

### Animation

- [x] **ANIM-01**: GSAP ScrollTrigger scroll-snap with zoom transitions on desktop (≥1024px)
- [x] **ANIM-02**: GSAP disabled on tablet/mobile — sections at natural height
- [x] **ANIM-03**: Framer Motion fadeUp/scaleIn/staggerContainer variants for component entrances
- [x] **ANIM-04**: Hero letter stagger sequence (1200ms hold → stagger → fadeUp → scaleIn → indicator)
- [x] **ANIM-05**: Count-up animation from 0 to 84 on viewport entry
- [x] **ANIM-06**: CTA pulse animation on Stakes CTA section
- [x] **ANIM-07**: Scroll indicator with bob animation, fades on scroll
- [x] **ANIM-08**: Reduced motion support — all animations disabled, content visible immediately

### Service Pages

- [x] **SERV-01**: AI Coaching for Leaders page with hero, what you get, who it's for, how it works, CTA
- [x] **SERV-02**: AI Training for Teams page with hero, what you get, who it's for, how it works, CTA
- [x] **SERV-03**: Fractional Exec Support page with hero, what you get, who it's for, how it works, CTA

### About Page

- [x] **ABOUT-01**: About page with photo, hero headline, the story, family business, Lead with AI PRO, CTA

### Blog

- [x] **BLOG-01**: Content collections configured with title, date, author, excerpt, draft schema
- [x] **BLOG-02**: Blog index page with card grid (2 columns desktop, 1 mobile)
- [x] **BLOG-03**: Blog post layout with prose styling, date, reading time
- [x] **BLOG-04**: 3 initial posts migrated from project content directory

### Contact

- [x] **CONT-01**: Contact page with left info column and right form column
- [x] **CONT-02**: Form with name, email, company, message fields and honeypot
- [x] **CONT-03**: Client-side form mock (Phase 1) — fake send with success message

### Legal & Error

- [x] **LEGAL-01**: Privacy policy page with full content from PRD
- [x] **ERR-01**: 404 page with heading, message, and back-to-home button

### Footer

- [x] **FOOT-01**: Always-dark footer with 3-column grid (logo, quick links, contact)
- [x] **FOOT-02**: Footer bottom bar with location, quote, and copyright

### Components

- [x] **COMP-01**: Button component with primary, secondary, ghost, CTA variants and all states
- [x] **COMP-02**: Service card component with icon, title, description, link, hover lift
- [x] **COMP-03**: Testimonial block component with decorative quote mark, border-left
- [x] **COMP-04**: Stat block component with number, label, source
- [x] **COMP-05**: Step card component with numbered circle, heading, description
- [x] **COMP-06**: Blog card component with title, date, excerpt, CTA, hover lift
- [x] **COMP-07**: Form input component with label, error state, focus ring
- [x] **COMP-08**: Icon wrapper component for Phosphor duotone with theme-aware opacity
- [x] **COMP-09**: Scroll indicator component with mouse outline and bob animation

### SEO & Deploy

- [x] **SEO-01**: Per-page meta tags (title, description) matching PRD route table
- [x] **SEO-02**: Sitemap auto-generated via @astrojs/sitemap
- [x] **SEO-03**: Canonical URLs on every page
- [x] **SEO-04**: robots.txt allowing all crawlers
- [ ] **DEPLOY-01**: GitHub Actions CI/CD workflow (checkout → Node 22 + pnpm 9 → install → build → deploy)
- [ ] **DEPLOY-02**: GitHub Pages config with CNAME for consultates.com
- [x] **DEPLOY-03**: Favicon from Consultates head mark

### Assets

- [x] **ASSET-01**: Logo files copied (light + dark horizontal variants)
- [x] **ASSET-02**: Gary photo converted to 400×400 WEBP
- [x] **ASSET-03**: Favicon copied from Consultates Icons
- [x] **ASSET-04**: Font files (IBM Plex Sans/Serif/Mono) in public/fonts/

## v2 Requirements

### Integrations

- **INT-01**: Google Apps Script form backend (email + Google Sheet)
- **INT-02**: Google Analytics GA4 tag (G-K8K16L2VET)
- **INT-03**: TidyCal embed on contact page
- **INT-04**: Cookie consent banner

### Content

- **CONT-04**: Blog post images
- **CONT-05**: OG image generation from brand template

## Out of Scope

| Feature | Reason |
|---------|--------|
| Chat widget | Not aligned with high-touch consulting model |
| i18n / multilingual | English-only audience for now |
| E-commerce / payments | No products sold online |
| User accounts / auth | No user-facing login needed |
| CMS / admin panel | Markdown + git is sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Complete |
| NAV-03 | Phase 2 | Complete |
| NAV-04 | Phase 2 | Complete |
| NAV-05 | Phase 2 | Complete |
| THEME-01 | Phase 2 | Complete |
| THEME-02 | Phase 2 | Complete |
| THEME-03 | Phase 2 | Complete |
| HOME-01 | Phase 3 | Complete |
| HOME-02 | Phase 3 | Complete |
| HOME-03 | Phase 3 | Complete |
| HOME-04 | Phase 3 | Complete |
| HOME-05 | Phase 3 | Complete |
| HOME-06 | Phase 3 | Complete |
| HOME-07 | Phase 3 | Complete |
| HOME-08 | Phase 3 | Complete |
| HOME-09 | Phase 3 | Complete |
| HOME-10 | Phase 3 | Complete |
| ANIM-01 | Phase 4 | Complete |
| ANIM-02 | Phase 4 | Complete |
| ANIM-03 | Phase 4 | Complete |
| ANIM-04 | Phase 4 | Complete |
| ANIM-05 | Phase 4 | Complete |
| ANIM-06 | Phase 4 | Complete |
| ANIM-07 | Phase 4 | Complete |
| ANIM-08 | Phase 4 | Complete |
| SERV-01 | Phase 5 | Complete |
| SERV-02 | Phase 5 | Complete |
| SERV-03 | Phase 5 | Complete |
| ABOUT-01 | Phase 5 | Complete |
| BLOG-01 | Phase 6 | Complete |
| BLOG-02 | Phase 6 | Complete |
| BLOG-03 | Phase 6 | Complete |
| BLOG-04 | Phase 6 | Complete |
| CONT-01 | Phase 5 | Complete |
| CONT-02 | Phase 5 | Complete |
| CONT-03 | Phase 5 | Complete |
| LEGAL-01 | Phase 5 | Complete |
| ERR-01 | Phase 5 | Complete |
| FOOT-01 | Phase 2 | Complete |
| FOOT-02 | Phase 2 | Complete |
| COMP-01 | Phase 2 | Complete |
| COMP-02 | Phase 2 | Complete |
| COMP-03 | Phase 2 | Complete |
| COMP-04 | Phase 2 | Complete |
| COMP-05 | Phase 2 | Complete |
| COMP-06 | Phase 2 | Complete |
| COMP-07 | Phase 2 | Complete |
| COMP-08 | Phase 2 | Complete |
| COMP-09 | Phase 2 | Complete |
| SEO-01 | Phase 7 | Complete |
| SEO-02 | Phase 7 | Complete |
| SEO-03 | Phase 7 | Complete |
| SEO-04 | Phase 7 | Complete |
| DEPLOY-01 | Phase 8 | Pending |
| DEPLOY-02 | Phase 8 | Pending |
| DEPLOY-03 | Phase 7 | Complete |
| ASSET-01 | Phase 1 | Complete |
| ASSET-02 | Phase 1 | Complete |
| ASSET-03 | Phase 1 | Complete |
| ASSET-04 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 58 total
- Mapped to phases: 58
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-05 after initialization*
