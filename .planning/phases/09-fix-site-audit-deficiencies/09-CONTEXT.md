# Phase 9: Fix Site Audit Deficiencies - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning
**Source:** Site Audit (audit/SITE-AUDIT.md — Playwright vs PRD Spec)

<domain>
## Phase Boundary

Fix all 18 deficiencies identified in the site audit. The audit compared the built site against the PRD spec using Playwright automation. Fixes span: GSAP crash guard, footer corrections, homepage architecture (duplicate components), stat animation, missing IDs, about page rendering, and robots.txt.

</domain>

<decisions>
## Implementation Decisions

### GSAP Script Guard (Issue #3 — CRITICAL)
- Add `if (sections.length === 0) return;` guard in `src/layouts/Base.astro:80` before accessing `sections[0]`
- One-line fix, highest priority — stops JS errors on all non-homepage pages

### Footer Fixes (Issues #4, #5, #7, #8, #9, #10, #11)
- Fix "Services" link: change `/services` to dropdown or first service page (`/services/ai-coaching-for-leaders`)
- Fix "Privacy Policy" link: change `/privacy` to `/privacy-policy`
- Fix email: change `gary@consultates.com` to `info@consultates.com`
- Fix LinkedIn: change personal profile URL to `https://www.linkedin.com/company/consultates-limited/`
- Fix location text: change to `Global and Remote — Connecting where you are`
- Fix quote: change to `"Artificial intelligence is not a substitute for human intelligence; it is a tool to amplify human creativity and ingenuity."`
- Fix copyright: remove "All rights reserved." — just `© 2026 Consultates Limited`

### Homepage Architecture (Issues #1, #2 — CRITICAL)
- Remove duplicate `<TrustBar />` from every scroll-section — place single instance as Section 3
- Remove duplicate `<ScrollIndicator />` from sections 2-8 — place single instance in Hero only
- Ensure mobile (<1024px) renders each component exactly once
- Maintain GSAP scroll behavior on desktop

### Stat Count-Up (Issue #6 — CRITICAL)
- Fix `84%` stat in Negative Stakes section — currently shows `0%`
- Root cause: `client:visible` React island inside hidden `.scroll-section` — IntersectionObserver can't fire on hidden elements
- Solution: rethink visibility trigger — either use GSAP callback to trigger animation, or use `client:load` with manual visibility detection via `data-active` attribute

### Missing Section ID (Issue #12 — MEDIUM)
- Add `id="section-trust"` to TrustBar wrapping element

### About Page Quote Rendering (Issue #13 — MEDIUM)
- Fix "Most AI consultants..." paragraph on `/about` — rendered as blockquote, should be regular paragraph
- Check markdown source or component for errant `>` or quote styling

### Robots.txt (Issue #16 — LOW)
- Add `public/robots.txt` with `User-agent: * Allow: /`

### Claude's Discretion
- Exact approach for fixing stat count-up (GSAP callback vs client:load vs other)
- Whether "Services" footer link becomes a dropdown, links to first service, or links to `#section-offering`
- How to restructure index.astro scroll-sections while preserving GSAP snap behavior

</decisions>

<specifics>
## Specific References

- **PRD §1.3:** Constants — EMAIL: `info@consultates.com`, LinkedIn: company page URL
- **PRD §3.1:** Section IDs include `#section-trust`
- **PRD §4 Section 2:** Hero — ScrollIndicator appears once, bottom center
- **PRD §4 Section 3:** Trust Bar — single instance between Hero and Negative Stakes
- **PRD §4 Section 4:** Negative Stakes — `84%` with count-up animation 0→84, 600ms, `whileInView`
- **PRD §5.2:** About page — "Most AI consultants..." is regular paragraph, not quote
- **PRD §6.8:** Footer spec — all correct content values
- **PRD §8.4:** robots.txt: allow all
- **Audit file:** `audit/SITE-AUDIT.md` — full deficiency list with file paths and line numbers
- **Screenshot:** `audit/homepage-full-light.png` — current state reference

</specifics>

<deferred>
## Deferred Ideas

- Issue #15 (blog post slug/title mismatch) — minor, slug comes from markdown frontmatter which is authoritative
- Issue #17 (nav dropdown descriptions) — descriptions are reasonable, not PRD-specified
- Issue #18 (blog index heading) — "Blog" is reasonable, not PRD-specified

</deferred>

---

*Phase: 09-fix-site-audit-deficiencies*
*Context gathered: 2026-03-05 from Site Audit*
