# Phase 6: Blog - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning
**Source:** PRD Express Path (PRD.md §5.3, §6.7)

<domain>
## Phase Boundary

Build the blog system: Astro content collections config, blog index page with card grid, blog post layout with prose styling, and migrate 3 existing blog posts from HTML sources. Blog cards (COMP-06) already exist from Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Content Collections — BLOG-01
- Engine: Astro content collections with Markdown files in `src/content/blog/`
- Schema in `src/content/config.ts`: title (string), date (z.date()), author (string, default 'Gary Tate'), excerpt (string max 200, optional — auto-generate from first 160 chars if absent), draft (boolean, default false)
- Collection name: `blog`

### Blog Index Page — BLOG-02
- Route: `/blog`
- Layout: `display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;`
- Mobile (`<768px`): `grid-template-columns: 1fr;`
- Each card uses existing BlogCard component (COMP-06, §6.7) from Phase 2
- Filter out posts where `draft: true`
- Sort by date descending (newest first)

### Blog Post Layout — BLOG-03
- Route: `/blog/[slug]`
- Layout: `max-width: 720px; margin: 0 auto; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem);`
- Heading: `text-hero` (Plex Serif)
- Date + reading time: `text-cite`, `color: var(--muted-foreground)`, `margin-bottom: 2rem`
- Prose: Tailwind typography plugin (`@tailwindcss/typography`) — `prose prose-lg`
- Headings in Plex Serif, body in Plex Sans
- Reading time: calculate from word count (assume ~200 wpm)

### Blog Post Migration — BLOG-04
- 3 posts to migrate from HTML sources at `~/.openclaw/Mi6-IQ/projects/consultates-rebuild/html/`:
  1. `ai-safety-and-security.html` → `src/content/blog/how-safe-is-ai-really.md`
  2. `ai-leaving-you-behind.html` → `src/content/blog/youre-not-the-only-one-stuck.md`
  3. `get-out-of-the-ai-cage.html` → `src/content/blog/get-out-of-the-ai-cage.md`
- Each needs frontmatter: title, date, author, excerpt
- Convert HTML body content to clean Markdown
- PRD slug mapping: ai-safety → `how-safe-is-ai-really`, ai-leaving → `youre-not-the-only-one-stuck`, ai-cage → `get-out-of-the-ai-cage`

### Blog Card Component — Already Done (COMP-06)
- Built in Phase 2 — reuse as-is
- Card spec from §6.7: background, border, border-radius, padding, title/date/excerpt/CTA styling, hover lift, focus ring

### Tailwind Typography Plugin
- `@tailwindcss/typography` needed as dev dependency (version `^0.5`)
- Already listed in PRD §12 dependency table
- Configure prose to use Plex Serif for headings, Plex Sans for body

### Claude's Discretion
- Reading time calculation implementation (word count / 200, rounded up)
- How to structure the `[...slug].astro` dynamic route
- Whether to add a "Back to Blog" link on post pages
- Page section wrapper/padding approach (reuse existing patterns from other pages)

</decisions>

<specifics>
## Specific Ideas

- Homepage Section 10 already links to 2 blog posts (`/blog/youre-not-the-only-one-stuck` and `/blog/how-safe-is-ai-really`) — these slugs must match
- Blog cards on homepage use the same BlogCard component — verify compatibility
- Privacy policy page already uses the same `max-width: 720px` prose layout — can reference its implementation
- SEO meta: title pattern `{post.title} — Consultates Blog`, description uses post excerpt (from PRD route table)
- Blog index meta: `Blog — Consultates` / `Articles on AI adoption, AI safety, and practical guidance for business leaders.`

</specifics>

<deferred>
## Deferred Ideas

- Blog post images (CONT-04 — v2 requirement)
- OG image generation (CONT-05 — v2 requirement)

</deferred>

---

*Phase: 06-blog*
*Context gathered: 2026-03-05 via PRD Express Path*
