---
status: testing
phase: 09-fix-site-audit-deficiencies
source: 09-01-SUMMARY.md, 09-02-SUMMARY.md
started: 2026-03-05T13:00:00Z
updated: 2026-03-05T13:00:00Z
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 1
name: No JS errors on inner pages
expected: |
  Visit any non-homepage page (e.g. /about, /contact, /services/ai-coaching-for-leaders, /blog, /privacy-policy).
  Open browser console. No JavaScript errors. Page loads and renders fully.
  Previously the GSAP script crashed on every inner page with "Cannot read properties of undefined".
awaiting: user response

## Tests

### 1. No JS errors on inner pages
expected: Visit any non-homepage page (e.g. /about, /contact, /services/ai-coaching-for-leaders). Open browser console. No JavaScript errors. Pages load and render fully.
result: [pending]

### 2. Footer content matches PRD
expected: On any page, scroll to footer. Verify: email shows "info@consultates.com", LinkedIn links to company page (linkedin.com/company/consultates-limited), "Services" link goes to /services/ai-coaching-for-leaders (not /services), "Privacy Policy" links to /privacy-policy, location reads "Global and Remote — Connecting where you are", quote reads "Artificial intelligence is not a substitute for human intelligence; it is a tool to amplify human creativity and ingenuity.", copyright is just "© 2026 Consultates Limited" (no "All rights reserved").
result: [pending]

### 3. Homepage mobile — single TrustBar and ScrollIndicator
expected: View homepage at mobile width (375px or resize browser narrow). Scroll through the full page. TrustBar text ("Trusted by leaders...") appears exactly once. Scroll indicator (bouncing chevron) appears exactly once at the top in the hero area. Previously both were duplicated 7-8 times.
result: [pending]

### 4. Homepage desktop — GSAP scroll transitions
expected: View homepage at desktop width (>=1024px). Scrolling snaps section-by-section with zoom transitions. There should be 10 scroll-sections total (Hero, TrustBar, Negative Stakes, Offering, Use Cases, How It Works, Social Proof, Why Consultates, Stakes CTA, Transitional CTAs). TrustBar is now its own snap section.
result: [pending]

### 5. Homepage — 84% stat counts up
expected: On the homepage, when the Negative Stakes section becomes visible, the "84%" stat should animate counting up from 0 to 84. On desktop this triggers when GSAP scrolls to that section. On mobile it triggers when you scroll it into view. It should NOT show "0%" stuck.
result: [pending]

### 6. TrustBar has section-trust anchor
expected: Navigate to /#section-trust. The page should scroll/snap to the Trust Bar section. Inspecting the DOM, the TrustBar wrapper element should have id="section-trust".
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0

## Gaps

[none yet]
