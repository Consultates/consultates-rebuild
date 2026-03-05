# Phase 7: Polish - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning
**Source:** PRD Express Path (PRD.md §1.1, §8.4, §9)

<domain>
## Phase Boundary

Add SEO meta tags, canonical URLs, sitemap, robots.txt, and favicon to the site. All pages already exist from prior phases — this phase adds production-readiness polish without changing page content or layout.

</domain>

<decisions>
## Implementation Decisions

### Per-Page Meta Tags — SEO-01
- Every page gets unique `<title>` and `<meta name="description">` from PRD §1.1 route table:
  - `/` → `Consultates — AI Consulting for Business Leaders` / `Clarity on AI for leaders, teams, and companies...`
  - `/services/ai-coaching-for-leaders` → `AI Coaching for Leaders — Consultates` / `One-to-one AI coaching sessions...`
  - `/services/ai-training-for-teams` → `AI Training for Teams — Consultates` / `Hands-on AI workshops...`
  - `/services/fractional-exec-support` → `Fractional Executive Support — Consultates` / `Senior AI go-to-market leadership...`
  - `/about` → `About Gary Tate — Consultates` / `Engineer. Commercial leader. AI practitioner...`
  - `/blog` → `Blog — Consultates` / `Articles on AI adoption, AI safety...`
  - `/blog/[slug]` → `[post.title] — Consultates Blog` / `[post.excerpt]`
  - `/contact` → `Contact — Consultates` / `Get in touch with Gary Tate...`
  - `/privacy-policy` → `Privacy Policy — Consultates` / `How Consultates Limited collects...`
  - `/404` → `Page Not Found — Consultates` / no description
- Base layout likely already has `<title>` and `<meta>` slots — check existing implementation

### Sitemap — SEO-02
- `@astrojs/sitemap` already in `astro.config.mjs` integrations array
- `site: 'https://consultates.com'` already configured
- Should auto-generate on build — verify it works and includes all public routes
- May already be working — just needs verification

### Canonical URLs — SEO-03
- Every page needs `<link rel="canonical" href="{full_url}">` in `<head>`
- Use `Astro.url` or `Astro.site` + `Astro.url.pathname` to construct
- Add to Base layout so all pages get it automatically

### robots.txt — SEO-04
- Create `public/robots.txt` allowing all crawlers
- Reference sitemap: `Sitemap: https://consultates.com/sitemap-index.xml`

### Favicon — DEPLOY-03
- Source: `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/Consultates Icons /Consultates-favicon-130x130-transparent.png`
- Destination: `public/favicon.png`
- Add `<link rel="icon" type="image/png" href="/favicon.png">` to Base layout `<head>`
- Already copied in Phase 1 as ASSET-03 — verify it's in place, add link tag if missing

### Claude's Discretion
- Whether to add OG meta tags (og:title, og:description, og:image) using head mark as fallback image
- Whether structured data (WebPage schema) should be included now or deferred
- Implementation approach for passing title/description props through Base layout

</decisions>

<specifics>
## Specific Ideas

- Base layout already exists at `src/layouts/Base.astro` — modify it to accept title/description props and render meta tags
- Sitemap integration already configured — may just need build verification
- Favicon may already be in `public/` from Phase 1 ASSET-03 — check before copying
- OG image: PRD says "use head mark as fallback" — `public/images/consultates-head.png` from asset manifest

</specifics>

<deferred>
## Deferred Ideas

- OG image generation from brand template (v2)
- Structured data / JSON-LD (mentioned in PRD §8.4 but not in phase requirements)

</deferred>

---

*Phase: 07-polish*
*Context gathered: 2026-03-05 via PRD Express Path*
