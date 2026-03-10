# Blog Index Redesign

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the blog index page (dark hero + 3-column grid) with a film-strip carousel matching the homepage blog highlights section, with category filtering and a "See more" link.

**Architecture:** Reuse BlogCarouselIsland from homepage. Add category filtering via client-side state. Keep BlogCardNew for the "See more" grid page. Compact header replaces bloated dark hero.

**Tech Stack:** Astro 5, React island (BlogCarouselIsland), existing blog-categories.ts

---

## Context

**Current state:** `src/pages/blog/index.astro` has a dark `.svc-hero` section + category filter pills + 3-column grid of BlogCardNew components. Gary says it's boring and has too much padding.

**Target state:** Same feel as the homepage "Not ready to book?" section — cream background, film-strip carousel, dynamic animation. Category pills filter which posts appear in the carousel. "See more" btn-alive link at the bottom leads to a full grid page.

**Key files:**
- `src/pages/blog/index.astro` — REWRITE (carousel + filters)
- `src/components/islands/BlogCarouselIsland.tsx` — REUSE as-is (already accepts `posts` prop)
- `src/data/blog-categories.ts` — existing category definitions
- `src/components/BlogCardNew.astro` — used on "See more" grid page

**Design rules:**
- Film-strip animation is GOSPEL — same 3-phase zoom-out/wind/zoom-in
- Category pills: same style as current (primary bg when active, bordered when inactive)
- "See more" link: btn-alive underline-draw, NOT a plain text arrow
- No dark hero — just a heading + subtitle in the cream section

---

### Task 1: Rewrite blog index page

**Files:**
- Modify: `src/pages/blog/index.astro`

**What to build:**

Replace the entire page content with:

1. **Compact header** — cream background (`bg-secondary`), centered heading "Blog" (text-section, font-serif), subtitle below (text-body, muted), category pills below subtitle. No dark hero. Padding: `clamp(6rem, 10vw, 8rem)` top (accounts for fixed nav), `clamp(1rem, 2vw, 1.5rem)` bottom.

2. **Category filter pills** — same horizontal row as current. "All" + one per category from `blog-categories.ts`. Active = filled primary bg + white text. Inactive = bordered + muted. BUT: this needs to be a React island because it controls which posts the carousel shows.

3. **BlogCarouselIsland** — receives filtered posts array. When category changes, carousel resets to index 0 with new posts.

4. **"See more" link** — below carousel, centered, btn-alive. Text: "See all articles". Links to `/blog/all` (or just scrolls to a grid section below — TBD based on post count).

**Challenge:** The category filtering needs to be client-side (React state), but `BlogCarouselIsland` is already a React component. Options:
- **Option A:** Create a new wrapper island `BlogIndexIsland.tsx` that contains both the filter pills and the carousel. Category state lives in the wrapper.
- **Option B:** Pass all posts to the carousel and add filtering inside BlogCarouselIsland.

**Recommended: Option A** — cleaner separation. BlogCarouselIsland stays reusable (homepage doesn't need filters).

**Step 1:** Create `src/components/islands/BlogIndexIsland.tsx`

This React island receives ALL posts + category definitions. It renders:
- Category filter pills (local state: `selectedCategory`)
- BlogCarouselIsland (receives filtered posts)
- "See all articles" btn-alive link

When category changes: filter posts, reset carousel to index 0.

```tsx
interface Props {
  allPosts: BlogCardData[];
  categories: { slug: string; label: string; icon: string }[];
}
```

**Step 2:** Rewrite `src/pages/blog/index.astro`

- Remove dark hero section entirely
- Remove client-side category filter JS
- Remove 3-column card grid
- Add cream background section with heading + subtitle
- Render `<BlogIndexIsland client:visible allPosts={blogPosts} categories={blogCategories} />`
- Fetch all non-draft posts in frontmatter, map to BlogCardData format (same as homepage)

**Step 3:** Build and verify

Run: `npx astro build`
Expected: Clean build, blog index shows carousel with category filtering

**Step 4:** Commit

```bash
git add src/components/islands/BlogIndexIsland.tsx src/pages/blog/index.astro
git commit -m "feat: blog index redesign with film-strip carousel and category filters"
```

---

### Task 2: "See more" grid page (future, low priority)

Only needed when post count exceeds ~6. For now, the "See all articles" link can scroll to a simple grid section below the carousel on the same page (hidden when ≤5 posts). Or just omit the link entirely until there are enough posts.

**Defer this task** until Gary has more than 5 blog posts.

---

## Notes

- BlogCarouselIsland needs NO changes — it already accepts a `posts` prop
- The carousel handles 1-N posts (guard for empty array already in place)
- Category pills in BlogIndexIsland should match the exact CSS of the current blog index pills
- The `key` prop on BlogCarouselIsland should include `selectedCategory` so the carousel resets when category changes
- The wrapper island approach keeps the homepage carousel unaffected
