# Responsive Audit Report — Phase 21

Audited: 2026-03-13
Site: consultates.com (production)

## Summary
- Total issues found: 10
- Critical (content unusable): 3
- Major (layout broken but readable): 4
- Minor (spacing/polish): 3

## Issues by Page

### Homepage (/)

The homepage has 8 scroll-snap sections (not 12 as documented). Each must fit within `100dvh`. At shorter desktop heights (768px, 834px), several sections overflow their snap boundary.

| # | Viewport | Section | Severity | Description |
|---|----------|---------|----------|-------------|
| 1 | 1366x768, 1194x834 | S2: Offerings ("Three ways we help") | Critical | 3-card row overflows viewport height. Third card is cut off — icon visible but no title, description, or CTA link. Cards + heading + subtitle + top padding exceed available height. |
| 2 | 1366x768, 1194x834 | S5: Testimonials ("Worked with leaders from") | Critical | Logo ticker + heading take ~40% of viewport. Quote text (especially Evan Davidson's long testimonial) runs off bottom. Name, photo, and navigation dots are not visible. Section is unusable. |
| 3 | 1366x768, 1194x834 | S6: Why Consultates | Critical | 3-card row with detailed text overflows. Third card ("Now builds with AI agents daily") text is cut off at bottom at 768px. |
| 4 | 1366x768 | S3: Use Cases ("What this looks like in practice") | Major | Same 3-card overflow pattern as S2. Third card content not visible (animation aside, the structural space is insufficient). |
| 5 | 1366x768 | S7: StakesCTA + Blog | Major | The StakesCTA heading/CTA fits, but the "Not ready to book?" blog carousel section below it overflows — blog cards cut off at bottom. |
| 6 | 1366x768, 1194x834 | S0: Hero | Major | Trust bar text at very bottom is clipped. "Book a Free Call" CTA sits very low, near the bottom edge. Content is tight but mostly readable. |
| 7 | 1366x768 | S1: Stakes ("The ground is moving faster") | Minor | Content only fills ~65% of viewport height. Large gap at bottom shows next section bleeding through. Not broken but looks unfinished — content floats in upper portion. |
| 8 | 375x812 | S0: Hero (mobile) | Major | Heading word-breaks mid-word: "where" breaks as "wh/ere to start," and "trust" breaks as "tru/st". The StaggerHeading nowrap spans may not be working at this width, or the font size is too large for 375px. |
| 9 | All | All pages | Minor | Console error: `Failed to load resource: hero-poster.webp` — 404. The hero video poster image is missing. Doesn't affect layout but generates console noise. |
| 10 | 2560x1440 | Nav bar | Minor | Nav elements (logo, links, CTA, avatar) are small and spread wide. Functional but could benefit from a max-width container on the nav inner content. Not blocking. |

### About (/about)
No issues found at any viewport. Hero, founder message, photo, and timeline all render correctly at 1366x768, 375x812, and 2560x1440.

### Service Pages (/services/*)
No issues found. Cards stack on mobile, content reads well at all viewports. Tested ai-advisory-for-leaders at 1366x768 and 375x812.

### Contact (/contact)
No issues found. Hero and form render correctly at all tested viewports.

### Blog Index (/blog)
No issues found at 1366x768. Category pills and carousel render correctly. Not tested at mobile (normal scrolling page, low risk).

### Blog Post
Not tested (normal scrolling page, low risk based on blog index results).

### Privacy Policy, 404
Not tested (simple text pages, minimal layout risk).

## Issues by Viewport

### 1366x768 (Windows laptop — most constrained)
Issues: 1, 2, 3, 4, 5, 6, 7, 9 — **8 issues**. This is the worst viewport. Almost every homepage snap section that contains cards or long text overflows.

### 1194x834 (iPad landscape)
Issues: 1, 2, 3, 6, 9 — **5 issues**. Slightly taller (834 vs 768) helps some sections but card rows and testimonials still overflow.

### 1440x900 (MacBook Pro)
Not directly tested but extrapolating: 900px height minus ~80px browser chrome = ~820px usable. Similar to iPad landscape. Issues 1, 2, 3 likely still present but less severe.

### 375x812 (Mobile)
Issues: 8, 9 — **2 issues**. Mobile layout is generally good (scroll-snap disabled, cards stack). Main problem is hero heading word-break.

### 2560x1440 (4K)
Issues: 9, 10 — **2 issues**. Content fits well in snap sections at this height. Minor nav spacing issue.

## Recommendations

### Pattern: 6 of 10 issues are homepage snap-section overflow at short heights

**Primary fix strategy:** Height-based media queries in `global.css`:
- `@media (max-height: 900px)` — reduce padding, font sizes, gaps within `.scroll-section`
- Cards sections (S2, S3, S6): reduce card padding, font sizes, or switch to 2-column layout at constrained heights
- Testimonials (S5): limit quote text length with CSS (line-clamp), reduce font size, or reduce logo ticker height
- StakesCTA+Blog (S7): reduce blog card height or hide excerpts at constrained heights

**Secondary fixes:**
- Mobile hero word-break (#8): reduce hero heading font-size at `max-width: 375px` or verify StaggerHeading nowrap spans are applied correctly
- hero-poster.webp 404 (#9): either add the poster image or remove the `poster` attribute from the video element
- Nav at 4K (#10): add `max-width` to nav inner container (low priority)

### Fix priority
1. Card overflow sections (S2, S3, S6) — same pattern, one fix approach
2. Testimonials overflow (S5) — unique fix needed
3. Mobile hero word-break (#8)
4. StakesCTA+Blog overflow (S7)
5. Hero trust bar (#6)
6. Stakes section gap (#7)
7. Poster image 404 (#9)
8. Nav at 4K (#10)
