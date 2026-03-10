# Phase 18: Fixes & Cleanup - Research

**Researched:** 2026-03-10
**Domain:** Astro components, nav data, content collections
**Confidence:** HIGH

## Summary

This phase addresses three independent, well-scoped issues: a missing nav entry, an unused CSS class variable, and dummy content removal. All three are straightforward fixes with no external dependencies or library concerns.

Each fix is isolated to 1-2 files with clear before/after states. No new libraries, no architectural changes, no design decisions needed.

**Primary recommendation:** Fix each issue in isolation. All three can be done in parallel since they touch different files.

## Standard Stack

No new libraries needed. All fixes use existing Astro components and content collections.

### Core (already in use)
| Library | Purpose | Relevant To |
|---------|---------|-------------|
| Astro 5 | Framework | All three fixes |
| Astro Content Collections | Blog content | CLN-01 (dummy post removal) |
| Phosphor Icons (`@phosphor-icons/web`) | Icon system | FIX-01 (Stakes icon in nav) |

## Architecture Patterns

### FIX-01: Stakes Missing from Nav Dropdown

**Current state:** `homeSections` array in `src/components/Nav.astro` (line 35-42) lists indices 2-7, skipping index 1 (Stakes/NegativeStakes).

**Homepage scroll-section order** (from `src/pages/index.astro` lines 48-55):
```
Index 0: Hero
Index 1: Stakes (NegativeStakes)    ← MISSING from homeSections
Index 2: What We Offer
Index 3: Use Cases
Index 4: How It Works
Index 5: Testimonials
Index 6: Why Consultates
Index 7: Get Started
```

**Fix:** Add `{ index: 1, label: '...', desc: '...', icon: '...' }` as the first entry in the `homeSections` array.

**Icon choice needed:** The NegativeStakes section renders `StrokeDrawStats` (animated stat icons about AI adoption pain points). An appropriate Phosphor duotone icon is needed. The section is about "what's at stake" / negative consequences of inaction. Good candidates:
- `warning` — general warning/alert
- `fire` — urgency
- `chart-line-down` — declining performance
- `skull` — dramatic stakes

The existing icons in the dropdown use: `squares-four`, `lightbulb`, `list-numbers`, `chat-circle-text`, `shield-check`, `rocket-launch`. A `warning` icon fits the "stakes" concept and the existing icon style.

**Impact:** Both desktop dropdown (line 99 renders `homeSections.map()`) and mobile submenu (line 273 renders `homeSections.map()`) are driven by the same array, so one data change fixes both.

**SVG needed:** A new inline SVG block for the chosen icon must be added to the desktop dropdown's icon rendering section (lines 102-137), matching the existing pattern of conditional `{section.icon === 'icon-name' && (<svg>...</svg>)}`.

### FIX-02: FormInput iconPaddingClass Not Applied

**File:** `src/components/FormInput.astro`

**Current state:**
- Line 36: `const iconPaddingClass = icon && !textarea ? 'pl-10' : '';` — computed correctly
- Line 62: `class={fieldClasses}` — **does not include `iconPaddingClass`**
- Line 52 (textarea): `class={fieldClasses}` — correctly excludes padding (textareas don't have inline icons)

**Fix:** Change line 62 from `class={fieldClasses}` to `class={`${fieldClasses} ${iconPaddingClass}`}` (or use Astro's `class:list`).

**Note:** The current FormInput renders the icon in the **label** (line 41), not inside the input field. The `pl-10` padding class (`padding-left: 2.5rem`) suggests the original design intended an icon *inside* the input. However, the current implementation puts the icon in the label. Two interpretations:
1. **If icon stays in label only:** The `iconPaddingClass` is unnecessary (no overlap possible). Just applying it won't hurt but also won't visually change anything.
2. **If icon should be inside the input:** The component needs restructuring — a `relative` wrapper with `absolute`-positioned icon inside. This is the pattern `pl-10` was designed for.

The requirement says "typed text never overlaps the icon" — since the icon is currently in the label, there's technically no overlap. But the `iconPaddingClass` variable's existence (with `pl-10` = 40px left padding) strongly suggests the intended design was icon-inside-input. The planner should decide scope: minimal fix (apply the class) vs. correct implementation (icon inside input).

**Contact page usage** (`src/pages/contact.astro`):
- `icon="user"` on Name field
- `icon="envelope"` on Email field
- `icon="buildings"` on Company field
- `icon="note"` on Message textarea (textarea=true, so iconPaddingClass intentionally empty)

### CLN-01: Remove Dummy Blog Posts

**Dummy posts (3 files):**
1. `src/content/blog/dummy-strategy-first-steps.md` — category: `strategy`
2. `src/content/blog/dummy-tools-prompt-engineering.md` — category: `tools-tactics`
3. `src/content/blog/dummy-ai-safety-boardroom.md` — category: `ai-safety`

All contain only "This is a dummy post for layout testing." as body content.

**Real posts (3 files):**
1. `src/content/blog/youre-not-the-only-one-stuck.md` — category: `getting-started`
2. `src/content/blog/how-safe-is-ai-really.md` — category: `ai-safety`
3. `src/content/blog/get-out-of-the-ai-cage.md` — category: `getting-started`

**Content schema impact** (`src/content/config.ts` line 12):
```typescript
category: z.enum(['getting-started', 'ai-safety', 'strategy', 'tools-tactics'])
```

After removing dummy posts:
- `strategy` category — 0 real posts
- `tools-tactics` category — 0 real posts
- `ai-safety` category — 1 real post
- `getting-started` category — 2 real posts

The enum still allows `strategy` and `tools-tactics` as valid categories. Whether to remove them from the enum is a design decision:
- **Keep them:** Future posts can use these categories without schema changes
- **Remove them:** Cleaner schema, but future posts need schema update

**Recommendation:** Keep the enum as-is. Empty categories are harmless, and the blog index/carousel only show posts that exist.

**Blog carousel/index impact:** After removal, only 3 real posts remain. The BlogCarouselIsland is a 5-card film strip. With 3 posts, it will still render but with fewer cards. The BlogIndexIsland category filter pills will only show categories that have posts (if implemented that way) or may show empty categories. This should be verified after removal.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Nav dropdown icons | Copy-paste random SVGs | Copy from existing Phosphor duotone SVGs in Nav.astro | Consistency with existing icon rendering pattern |
| Input padding | Custom CSS | Tailwind `pl-10` class (already computed) | Already built, just not applied |

## Common Pitfalls

### Pitfall 1: Wrong scroll-section index for Stakes
**What goes wrong:** If the index doesn't match the actual scroll-section position, clicking "Stakes" in the dropdown navigates to the wrong section.
**How to avoid:** Count from 0 in `src/pages/index.astro`. Stakes/NegativeStakes is the second `scroll-section` div, so index = 1.

### Pitfall 2: Desktop dropdown icon rendering gap
**What goes wrong:** Adding a new icon name to the `homeSections` data array but forgetting to add the corresponding SVG conditional block in the desktop dropdown template (lines 102-137). Mobile menu doesn't render icons so it's unaffected.
**How to avoid:** Add both the data entry AND the SVG conditional in the same change. Test desktop dropdown visually.

### Pitfall 3: FormInput class concatenation
**What goes wrong:** Naive string concatenation (`fieldClasses + ' ' + iconPaddingClass`) leaves a trailing space when `iconPaddingClass` is empty.
**How to avoid:** Use template literal with trim, or use `class:list={[fieldClasses, iconPaddingClass]}` which handles empty strings cleanly.

### Pitfall 4: Dummy post removal breaking build
**What goes wrong:** If any page hardcodes a reference to a dummy post slug, the build fails.
**How to avoid:** Search for dummy post slugs across the codebase before deleting. Posts are queried dynamically via `getCollection('blog')`, so this is unlikely but worth checking.

### Pitfall 5: Cross-page nav for Stakes section
**What goes wrong:** The `homeSections` array drives both on-page scroll (button with `data-section-index`) and cross-page links (`/?section=N`). The cross-page URL param reader in Base.astro calls `scrollToSection(N)`. If Stakes index is wrong, cross-page nav breaks too.
**How to avoid:** Verify the index matches by checking `src/pages/index.astro` scroll-section order.

## Code Examples

### FIX-01: Adding Stakes to homeSections array
```typescript
// In src/components/Nav.astro, line 35
const homeSections = [
  { index: 1, label: 'Stakes', desc: 'What you risk by waiting', icon: 'warning' },
  { index: 2, label: 'What We Offer', desc: 'Advisory, training & leadership', icon: 'squares-four' },
  // ... rest unchanged
];
```

Plus add corresponding SVG conditional in desktop dropdown (around line 102):
```jsx
{section.icon === 'warning' && (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" class="shrink-0 text-primary">
    <!-- Phosphor Warning duotone SVG paths -->
  </svg>
)}
```

### FIX-02: Applying iconPaddingClass to input
```astro
<!-- Change from: -->
<input ... class={fieldClasses} />

<!-- To: -->
<input ... class:list={[fieldClasses, iconPaddingClass]} />
```

### CLN-01: Removing dummy posts
```bash
# Delete the three dummy files
rm src/content/blog/dummy-strategy-first-steps.md
rm src/content/blog/dummy-tools-prompt-engineering.md
rm src/content/blog/dummy-ai-safety-boardroom.md
```

## Open Questions

1. **Stakes label and description copy**
   - What we know: Section is NegativeStakes, renders StrokeDrawStats (animated stat counters about AI adoption pain)
   - What's unclear: Gary's preferred label and description for the nav dropdown. "Stakes" is the `data-section-label` but the user-facing text could differ.
   - Recommendation: Use label "Stakes" and desc "What you risk by waiting" as defaults. These can be refined.

2. **Stakes icon choice**
   - What we know: Existing nav icons are informational/positive. Stakes is the only "negative" section.
   - What's unclear: Which Phosphor icon best fits. `warning` is the most intuitive.
   - Recommendation: Use `warning` (Phosphor duotone). It's immediately recognizable and matches the cautionary tone.

3. **FormInput: minimal fix vs. icon-inside-input redesign**
   - What we know: `iconPaddingClass` suggests the original design intended icons inside the input field, but current implementation puts icons in the label only.
   - What's unclear: Whether to just apply the class (no visual change since icons are in labels) or restructure to put icons inside inputs.
   - Recommendation: The requirement says "text never overlaps the icon." Since the current label-based icon placement has no overlap, the minimal fix (apply the class) satisfies the requirement literally. But for a polished form, icon-inside-input is the standard pattern. Planner should decide scope.

4. **Blog carousel with only 3 posts**
   - What we know: BlogCarouselIsland is a 5-card film strip. After cleanup, only 3 posts exist.
   - What's unclear: Whether the carousel handles < 5 posts gracefully.
   - Recommendation: Verify carousel rendering with 3 posts during implementation. It likely works but may look sparse.

## Sources

### Primary (HIGH confidence)
- `src/components/Nav.astro` — read directly, confirmed homeSections array and rendering pattern
- `src/pages/index.astro` — read directly, confirmed scroll-section order (indices 0-7)
- `src/components/FormInput.astro` — read directly, confirmed iconPaddingClass computed but not applied
- `src/content/blog/*.md` — read all 6 files, confirmed 3 dummy posts
- `src/content/config.ts` — read directly, confirmed category enum
- `src/pages/contact.astro` — read directly, confirmed FormInput usage with icons

## Metadata

**Confidence breakdown:**
- FIX-01 (Stakes nav): HIGH — exact file, line numbers, and data structure identified
- FIX-02 (FormInput): HIGH — bug confirmed at exact line, fix pattern clear
- CLN-01 (Dummy posts): HIGH — all 3 files identified, content verified as dummy

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable codebase fixes, no external dependencies)
