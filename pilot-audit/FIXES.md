# Phase 21 — Audit Fix List

## Pilot Fixes (Gary-approved)

### 1. HP Section 1 — Stakes
- Reduce padding above/below "The ground is moving faster..." heading
- Shrink blockquote font size (currently too large)
- Widen blockquote (use more horizontal space, fewer stacked lines)

### 2. HP Section 7 — Get Started (StakesCTA + Blog)
- Remove blog carousel card images (placeholder cream rectangles waste vertical space)
- White background on "Not ready to book?" blog area (currently dark, should be white)
- Add purple glow + dot grid to dark StakesCTA area (currently flat dark)

### 3. Service Page — AI Advisory (applies to all 3 service pages)
- Full dark hero treatment: purple glow, dot grid overlay (matching homepage hero)
- Add CTA button to hero ("Book a Free Call")
- Reduce hero padding (too much space above/below title)
- Card layout: move title inline beside icon (not stacked below). Saves space, fixes alignment.

### 4. About Page
- Hero: add purple glow + dot grid
- Tighten hero padding slightly

### 5. Contact Page
- Hero: add purple glow + dot grid

### 6. Scroll-snap Keyboard Interaction (ALL homepage sections)
- Down arrow: if animations still playing, complete current animation instantly. Only advance to next section after animations complete.
- Right arrow: speed up / fast-forward current section's animations.
- This is part of the responsive experience — prevents users skipping past content.

---

## Global Pattern: Dark Section Treatment
Every dark section across the site needs: purple radial glow + dot grid overlay + proper dark background.
This applies to: homepage hero, StakesCTA, service page heroes, about hero, contact hero, service page dark CTAs.

---

## Full Audit Fixes

### 7. HP Section 3 — Use Cases
- Card layout: title beside icon (same fix as service page cards — consistency)

### 8. HP Section 4 — How It Works
- Excessive whitespace below CTA — content only uses ~40% of viewport. Tighten spacing or vertically center content.

### 9. Blog Index
- Dark hero missing purple glow + dot grid
- Blog carousel cards have placeholder cream images taking significant space — remove images (same fix as HP Get Started)

### 10. Blog Post
- Large cream placeholder image dominates first fold — either add real images or remove the placeholder entirely

### Pages with NO issues found:
- HP Section 0 (Hero) ✅
- HP Section 2 (Offerings) ✅
- HP Section 5 (Testimonials) ✅
- HP Section 6 (Why Consultates) ✅

### Service pages — Training & Fractional
- Same issues as Advisory (pilot fix #3 applies to all 3 service pages)
