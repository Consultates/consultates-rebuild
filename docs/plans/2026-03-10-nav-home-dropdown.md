# Home Dropdown on All Pages

**Goal:** Show the Home section dropdown on every page (not just the homepage). Clicking a section navigates to the homepage and auto-scrolls to that section.

---

## Context

**Current:** `src/components/Nav.astro` uses `isHomepage` ternary (line 66). On homepage: dropdown with `scrollToSection()` buttons. On other pages: plain `<a href="/">Home</a>` link, no dropdown.

**Problem:** Gary expects the dropdown to always be visible, with section navigation working from any page. This is standard menu behaviour.

**Key files:**
- `src/components/Nav.astro` — nav component with desktop + mobile dropdowns
- `src/layouts/Base.astro` — GSAP scroll-snap script, defines `window.scrollToSection()`

---

### Task 1: Show dropdown on all pages (Nav.astro)

**Desktop (lines 66-143):**
- Remove `isHomepage` ternary
- Always render the dropdown
- When on homepage: keep existing `scrollToSection()` button behaviour (no page reload)
- When NOT on homepage: each section item becomes `<a href="/?section={index}">` — navigates to homepage with section param

**Mobile (lines 245-268):**
- Same change — remove `isHomepage` ternary
- Always show Home with expandable section sub-items
- Non-homepage items link to `/?section={index}`

**Implementation approach:**
- Keep `isHomepage` variable
- Always render dropdown structure
- Section items: if `isHomepage`, use `button` with `scrollToSection()` click handler. If not, use `<a href="/?section={index}">`.
- Home button click on homepage: still scrolls to section 0
- Home button on non-homepage: could be `<a href="/">` wrapping the button text

**Active state:** The Home link should NOT get `border-b-2 border-primary` on non-homepage pages (currently only applied when `isHomepage`). Keep that logic.

### Task 2: Auto-scroll on homepage load (Base.astro)

**In the GSAP scroll-snap script section of Base.astro:**
- After `scrollToSection()` is defined and GSAP is initialized
- Read `new URLSearchParams(window.location.search).get('section')`
- If present, parse as integer and call `scrollToSection(sectionIndex)`
- Clean up URL with `history.replaceState(null, '', '/')` so the param doesn't persist on reload
- Add a small delay or use a `requestAnimationFrame` to ensure GSAP is ready

**DO NOT touch the GSAP scroll-snap mechanics.** Only add a URL param reader after initialization.

**Timing concern:** The `scrollToSection()` function uses GSAP's ScrollToPlugin. It needs the scroll-snap timeline to be set up. Add the param reader at the END of the GSAP init block, not before.

### Task 3: Build and verify

- `pnpm build` — clean build
- Test: navigate to `/blog`, click a Home dropdown section item, verify it goes to homepage at that section
- Test: on homepage, verify existing section navigation still works (no regression)
- Test: mobile menu — same behaviour

### Task 4: Commit

```bash
git add src/components/Nav.astro src/layouts/Base.astro
git commit -m "feat: show Home section dropdown on all pages with cross-page navigation"
```

---

## Rules

- DO NOT modify GSAP scroll-snap animation mechanics
- DO NOT change the section order or labels in `homeSections`
- Keep existing homepage behaviour intact (button clicks, no page reload)
- URL param is the ONLY addition to Base.astro
