# Phase 20: Footer - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Redesign the site footer to match the visual quality set by the hero and dark CTA sections. The footer must render consistently on all pages (homepage, 3 service pages, about, contact, blog index, blog posts, privacy policy, 404) in both light and dark modes and on mobile viewports.

</domain>

<decisions>
## Implementation Decisions

### Layout & structure
- **Two-column Quick Links** instead of single column: Col 1: Home, Services, About | Col 2: Blog, Contact, Privacy Policy
- **Brand column**: Logo at same size as the header nav logo, with "Clarity on AI" as subtitle underneath
- **Contact column becomes social-only**: Remove email link. Show LinkedIn and X (Twitter) icons only, no labels
- **"Get in Touch" heading gets animated underline** and links to /contact page (acts as a link, not just a heading)

### Visual treatment
- **Dot texture background matching the hero** — seamless continuation of the dark zone above, no visible boundary between the last dark section and the footer
- Footer should feel like part of one continuous dark area, not a separate block

### Hover interactions
- **Animated underline on all footer links**: thin line that grows from left to right on hover (like the "Book a Free Call" nav underline, but thinner/lighter weight)
- Underline stretches only to the width of the text, not the full column
- **Underline color: brand purple**
- "Get in Touch" heading also gets this underline treatment (it's a link to /contact)

### Bottom bar
- **Keep all three lines**: tagline ("Global and Remote — Connecting where you are"), AI quote (this is Gary's chosen tagline — do NOT remove or change), copyright
- The AI quote is intentional brand copy, not placeholder

### Claude's Discretion
- Exact spacing and padding values
- Mobile responsive behavior (stack columns, icon sizing)
- Bottom bar separator treatment (thin border, spacing, or fade)
- Social icon sizing relative to surrounding text
- Whether Quick Links heading is kept or removed (links might be self-evident)

</decisions>

<specifics>
## Specific Ideas

- The animated underline reference: the "Book a Free Call" button in the nav has an underline animation — footer links should use the same mechanic but thinner/lighter
- Logo should be identical size to the nav header logo — not smaller like the current footer logo
- "Clarity on AI" sits directly under the logo as a brand subtitle

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 20-footer*
*Context gathered: 2026-03-13*
