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
- Blog highlights in "Get Started" section: film-strip carousel with 3 latest posts, btn-alive links, category pills
- Session restore: scroll position saved to sessionStorage, restored on reload

**Needs work:**
- [ ] **Stakes (NegativeStakes)** — missing from Home nav dropdown menu
- [ ] **How It Works** — average, not finished
- [ ] **Why Consultates** — needs complete redo
- [ ] **Get Started (StakesCTA)** — padding reduced but section still not polished

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
**Status: NEEDS REDESIGN — plan written, ready for next session**
- Current: dark hero + 3-column card grid (Gary: "looks fucking shit")
- Plan: replace with film-strip carousel (same as homepage) + category filter pills + "See more" link
- See `docs/plans/2026-03-10-blog-index-redesign.md`

### Blog Posts
**Status: DONE (rebuilt 2026-03-10)**
- Featured image at top, category pill, date/reading time
- Improved prose typography (headings, links, blockquotes, code blocks)
- Related posts section ("Keep reading") with compact cards

---

## Known Bugs

- [ ] **FormInput icon padding** — `iconPaddingClass` computed but never applied to the input. Icons show in label but input text overlaps them.

---

## Completed (2026-03-10)

- [x] Blog content schema extended (image, category, tags)
- [x] BlogCardNew component (Maze-style, category pills, compact variant)
- [x] BlogCarouselIsland — film-strip carousel with 5-card strip, gradient fades, arrows, dots
- [x] Homepage blog highlights in "Get Started" scroll-section
- [x] Blog post template with featured images, category, related posts
- [x] Prose typography overhaul
- [x] Scroll-section restore on reload (sessionStorage)
- [x] Placeholder image: solid cream (replaced purple gradient)
- [x] StakesCTA padding reduced for better viewport fit
- [x] Scroll-sections wrapped in #scroll-snap-container

---

## Not Yet Built

- [ ] Blog index redesign (film-strip carousel replacing dark hero + grid)
- [ ] Footer redesign (Gary: "slop")
- [ ] Homepage: How It Works, Why Consultates, Get Started polish
- [ ] Stakes missing from Home nav dropdown

---
