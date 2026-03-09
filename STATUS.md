# Site Status — Consultates.com

Running tracker of what's done, what needs work, and what's broken.

---

## Pages

### Homepage
**Status: PARTIALLY DONE — several sections need work**

**Done:**
- Silk video hero background with ping-pong loop
- Scroll-snap film-strip system (GSAP)
- Section navigation dropdown in nav (icons, descriptions) — missing Stakes entry
- Social proof: logo ticker + quote carousel with film-strip animation + photos
- What We Offer: offering cards with sequential reveal
- Use Cases: use case cards
- Gary's nav avatar (right of CTA, desktop only)

**Needs work:**
- [ ] **Stakes (NegativeStakes)** — missing from Home nav dropdown menu
- [ ] **How It Works** — average, not finished
- [ ] **Why Consultates** — needs complete redo
- [ ] **Get Started (StakesCTA)** — not finished
- [ ] **Transitional section** — needs complete redo (looks like blog placeholder)

### About
**Status: DONE (rebuilt 2026-03-09)**
- Dark hero with purple glow + dot grid (placeholder for background photo)
- "How We Work" + "A Personal Message From Our Founder" — Gary's approved copy, 50/50 grid with photo right (sticky)
- Timeline: CSS Grid, 6 entries (1980s–Why it matters), IntersectionObserver opacity reveal
- Photo: `Me-for-Website-450x600.webp`
- No SectionAnimator (uses data-reveal + IntersectionObserver)
- No dark CTA section (removed per Gary's direction)
- No "Lead with AI PRO" section (removed per Gary's direction)

### Service Pages (all three)
**Status: DONE (rebuilt 2026-03-09)**
- Unified structure across all three: dark hero → What You Get (3 cards with icons) → Who It's For (3 cards) → Testimonials (film-strip carousel) → How It Works (3-step) → Dark CTA
- Uses SocialProofIsland with `quotes` prop for testimonials (same component as homepage)
- Phosphor duotone icons in cream/purple circle containers
- IntersectionObserver scroll reveals (no SectionAnimator)
- Real testimonials from social-proof.ts with headshots

| Section | Advisory | Training | Fractional |
|---------|----------|----------|------------|
| What You Get | 3 cards (shield-check, crosshair, list-checks) | 3 cards (wrench, play-circle, trend-up) | 3 cards (map-trifold, compass, globe) |
| Who It's For | 3 scenario cards | 3 scenario cards | 3 scenario cards |
| Testimonials | Anastasia Fischer, Alexandros Lioumbis | Julie Lee, Anastasia Fischer | Dave Mommen, Danny Tan |
| How It Works | We talk → You get a plan → You act | We talk → You get a plan → Your team ships | We talk → You get a plan → We scale together |

### Contact
**Status: DONE**
- Dark hero with form reveal animation
- TidyCal embed (lazy-loaded)
- Form with reCAPTCHA, honeypot

### Privacy Policy
**Status: DONE**

### Blog Index
**Status: NEEDS COMPLETE OVERHAUL (Phase 17)**
- Current implementation is placeholder quality
- Needs full redesign from scratch

---

## Known Bugs

- [ ] **FormInput icon padding** — `iconPaddingClass` computed but never applied to the input. Icons show in label but input text overlaps them.

---

## Design Doc Updates (2026-03-09)

Website design doc (`website-design-v3.html`) was updated with GOSPEL sections for:
- Testimonial Carousel (film-strip) — SocialProofIsland is the only carousel
- Scroll Reveal (IntersectionObserver) — replaces SectionAnimator
- Timeline Pattern — CSS Grid from About page
- Service Page Structure — exact section order and component specs
- SectionAnimator marked DEPRECATED

---

## Completed This Session (2026-03-09)

- [x] Homepage section navigation dropdown (Home menu with icons, descriptions)
- [x] Film-strip scroll animation for nav jumps (zoom-out, roll frames, zoom-in)
- [x] Purple silk video hero background (ping-pong loop, crossfade)
- [x] Phosphor CaretDown duotone on all nav chevrons
- [x] Home button scrolls to hero on homepage
- [x] Mobile section navigation (tap-toggle submenu)
- [x] About page rebuilt (dark hero, founder message, timeline, scroll reveals)
- [x] Gary's nav avatar added to header (80x80 webp, right of CTA)
- [x] All 3 service pages rebuilt with unified structure
- [x] SocialProofIsland refactored to accept quotes prop
- [x] Service testimonials curated in social-proof.ts
- [x] Design doc updated with 4 GOSPEL component specs
- [x] SectionAnimator deprecated in design doc

---

## Not Yet Built

- [ ] Phase 17: Blog complete overhaul (current implementation is placeholder quality — needs full redesign)

---

## Not Yet Committed

All changes from this session are unstaged. Needs git commit.
