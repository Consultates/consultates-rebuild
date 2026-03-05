# Phase 5: Inner Pages - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning
**Source:** PRD Express Path (PRD.md §5.1–5.6, §6.7, §6.9)

<domain>
## Phase Boundary

Build every non-homepage page: three service pages (AI Coaching, AI Training, Fractional Exec), About, Contact (client-side mock form), Privacy Policy, Blog (index + post layout + 3 migrated posts), and 404. All pages use existing Nav/Footer from Phase 2 and existing design tokens/components from Phases 1–2.

</domain>

<decisions>
## Implementation Decisions

### Service Pages (×3) — SERV-01, SERV-02, SERV-03
- Shared template layout: Hero → What You Get → Who It's For → How It Works → CTA
- Each section uses homepage spacing: `padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem); max-width: 1200px; margin: 0 auto;`
- "How It Works" reuses the same 3-step component from homepage Section 7 (same copy, same layout)
- AI Coaching route: `/services/ai-coaching-for-leaders`
- AI Training route: `/services/ai-training-for-teams`
- Fractional Exec route: `/services/fractional-exec-support`
- All copy comes from PRD §5.1 verbatim — do not modify
- CTA on each page: `Book a Free Call` → `TIDYCAL_URL`

### About Page — ABOUT-01
- Route: `/about`
- 5 sections: Hero (photo + headline), The Story, Family Business, Lead with AI PRO, CTA
- Photo: `Me for Website-1800x1800.png` → convert to `public/images/gary-tate.webp` (400×400), displayed 200×200 rounded
- Headline: `Engineer. Commercial leader. AI practitioner.`
- All copy from PRD §5.2 verbatim
- CTA: `Book a Free Call` → `TIDYCAL_URL`

### Contact Page — CONT-01, CONT-02, CONT-03
- Route: `/contact`
- Two-column grid layout (1fr 1fr, gap 3rem), single column on mobile
- Left: heading, intro paragraph, direct links (email, LinkedIn, book a call)
- Right: contact form (Name required, Email required, Company optional, Message required)
- Honeypot field for spam prevention
- Phase 1 behaviour: client-side mock — preventDefault, show "Sending..." 1s, then success message replacing form
- Form inputs follow §6.9 component spec
- Validation: Name 2–100 chars, Email HTML5, Company max 100, Message 10–5000 chars

### Privacy Policy — LEGAL-01
- Route: `/privacy-policy`
- Same layout as blog post: `max-width: 720px; margin: 0 auto;` with prose styling
- Full legal content from PRD §5.5 verbatim

### 404 Page — ERR-01
- Route: `/404` → `src/pages/404.astro`
- Centered layout, `min-height: 60vh`, flex column centered
- Heading: `Page not found`
- Paragraph: `The page you're looking for doesn't exist or has been moved.`
- CTA: `Back to Home` → `/` — secondary button style

### Blog — (not in phase 5 req IDs but included in PRD §5.3)
- Route: `/blog` (index) + `/blog/[slug]` (posts)
- Astro content collections, Markdown in `src/content/blog/`
- Content collection schema with title, date, author, excerpt, draft fields
- Blog index: 2-column grid, 1-column mobile, uses BlogCard component (§6.7)
- Blog post: max-width 720px, Tailwind typography plugin (`prose prose-lg`)
- Migrate 3 initial posts from project content directory

### Claude's Discretion
- Whether to create a shared service page Astro layout or use individual pages
- Whether contact form should be a React island or pure Astro with inline script
- How to structure the content collection config file
- Image conversion approach for Gary's photo (build-time vs pre-converted)
- Whether blog needs `@tailwindcss/typography` added as dependency

</decisions>

<specifics>
## Specific Ideas

- Service pages share identical template structure — a single parametric layout or Astro layout component is the natural pattern
- The "How It Works" section on service pages reuses the exact Step Card component and copy from homepage Section 7
- Contact form Phase 1 is intentionally a mock (no backend) — keep it simple with inline JS or a small React island
- Blog posts must migrate from `~/.openclaw/Mi6-IQ/projects/consultates-rebuild/content/` (3 posts)
- Privacy policy content is fully specified — just needs to render in prose layout
- About page photo source: `~/.openclaw/Mi6-IQ/reference/infrastructure/brand-theme/Consultates Logos/Me for Website-1800x1800.png`

</specifics>

<deferred>
## Deferred Ideas

- Contact form backend (Google Apps Script) — Phase 2 of site
- Google Analytics integration — later phase
- Blog RSS feed — not in PRD scope
- Contact form error states for backend failures — Phase 2

</deferred>

---

*Phase: 05-inner-pages*
*Context gathered: 2026-03-05 via PRD Express Path*
