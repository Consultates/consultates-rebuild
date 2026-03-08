# READ THIS FIRST

If you're an AI agent picking up this project, read this document before touching anything. It will save you from repeating every mistake already made here.

This is the honest history of a 166-commit build — what went wrong, what had to be fixed, what still isn't good enough, and what the owner actually wants.

---

## What this project is

A marketing site for Consultates.com — Gary Tate's AI consulting business. Astro 5, Tailwind 4, React islands with Framer Motion, GSAP ScrollTrigger for homepage scroll-snap. Replacing a bloated WebWave site with something clean and distinctive.

Gary is an engineer, a commercial leader, and an AI practitioner. He and his wife Trinh run this business. They help good people in a turbulent time. That's the tone — grounded, competent, human. Not a SaaS landing page.

---

## The first 100 commits: technically correct, visually generic

The initial build (phases 1-8) produced a working site with all pages, all routes, blog, deployment pipeline, SEO. Every section matched the PRD spec. Content was correct. Structure was sound.

It also looked like every other AI-generated marketing site on the internet.

### What the AI agent defaulted to (and what had to be ripped out):

**Gradient buttons.** The single most common AI design cliche. Every CTA was a purple-to-blue gradient pill with `border-radius: 9999px`. It screams "a language model made this." These were all replaced with the `btn-alive` system — an underline that draws on with a clip-path taper and a radial purple glow. No gradients. No pills. Ever.

**Generic fade-up animations.** Every section used the same Framer Motion `fadeUp` variant — content slides up 20px and fades in. It's the default because it's safe and it's everywhere. The site now uses distinctive animations: letter stagger on headlines (each character animates individually), typewriter effect on descriptions, sequential card reveals (L→R, one at a time, with internal sequencing: label → title stagger → description typewriter → CTA pulse). Generic fade-up is banned.

**Eyebrow labels.** Small uppercase text with letter-spacing above every heading. "OUR SERVICES", "HOW IT WORKS", "WHAT PEOPLE SAY". This is the AI equivalent of clearing your throat before speaking. Every AI site has them. They carry zero information. They're banned except for mono category labels on cards (IBM Plex Mono, 11px, 500 weight, 0.08em letter-spacing, uppercase, Royal Purple).

**Glassmorphism everywhere.** Frosted glass `backdrop-filter` effects on cards, sections, containers. It's allowed on the nav bar. Nowhere else.

**Dramatic shadows.** `box-shadow` with 30px+ blur on everything. Cards at rest get max 20px blur. Hover state can go to 32px. That's it.

**Gradient icon containers.** Purple-to-blue gradient circles behind every icon. Replaced with cream background (#F6F2EB) + purple border. Flat. Intentional.

**Decorative copy.** "Click here to explore our offerings." "Scroll down to discover more." "Let's embark on your AI journey together." Text that explains what the UI does instead of carrying information. Every word on this site must earn its place. Gary directs copy — agents don't improvise it, and they definitely don't write marketing cliches.

**Transform-on-hover.** Scale-up, rotate, translate on hover for every interactive element. The only hover transform allowed is the magnetic effect built into btn-alive. Everything else stays still.

### These aren't style preferences — they're identity

Gary's feedback was consistent: "this looks AI-generated." Not broken. Not ugly. Just generic. The kind of site that makes you think "oh, they used a template." For a business that helps people navigate AI, looking like an AI built your site is a credibility problem.

---

## The audit that broke everything open (phase 9)

A Playwright-driven automated audit against the PRD found 19 defects:

- **6 CRITICAL:** GSAP crashing on every non-homepage page (the scroll script ran on all pages but only the homepage has scroll sections). TrustBar duplicated 8 times on mobile. ScrollIndicator duplicated 7 times. Footer linking to 404s. Stat counter stuck at 0%.
- **5 HIGH:** Wrong email, wrong LinkedIn URL, wrong location text, wrong footer quote, extra copyright text — all in the footer. The footer was wrong on every page.
- **5 MEDIUM:** Missing section IDs, wrong quote rendering on About page, architectural dependency between GSAP visibility and React island hydration.
- **3 LOW:** Missing robots.txt, improvised nav descriptions, blog heading.

The GSAP crash was the worst. The scroll-snap script lived in `Base.astro` (the shared layout) and assumed `.scroll-section` elements existed. On every page except the homepage, it hit `undefined` and threw. Every inner page had a JavaScript error in the console. Fixed with a one-line guard, but it should never have shipped.

The TrustBar/ScrollIndicator duplication was an architecture problem. Each homepage section was wrapped in a `<div class="scroll-section">` that also contained copies of TrustBar and ScrollIndicator. On desktop, GSAP hid inactive sections so you only saw one copy. On mobile, GSAP doesn't run — all sections flow naturally — so you got 8 TrustBars and 7 ScrollIndicators stacked down the page.

The stat counter (84% → stuck at 0%) was a subtle interaction between GSAP and Framer Motion. The `CountUpStat` React island used `whileInView` (IntersectionObserver) to trigger the count animation. But GSAP set the parent section to `visibility: hidden` on load. IntersectionObserver can't observe hidden elements. When GSAP later made the section visible, the island had already evaluated "not in view" and never re-checked. Fixed by switching to a MutationObserver that watches for the GSAP `data-active` attribute.

---

## v2.0 Visual Redesign: making it not look AI-generated (phases 10-15)

After the structural fixes, the site worked. It still looked generic. Gary called for a visual redesign.

### Phase 10: Design system foundation + hero

Rebuilt the homepage hero with a dark cinematic background, letter-stagger headline animation, typewriter sub-copy, btn-alive CTA with glow pulse, and a stats bar with SVG stroke-draw icons. This set the visual bar for the entire site.

Also introduced the btn-alive CSS system: underline draws on via `clip-path: inset()` animation with a tapered edge, accompanied by a `radial-gradient` purple glow that scales up. Variants for large (hero), small (card CTAs), and on-dark (white text, purple accent). This single component replaced every gradient button on the site.

### Phase 11: Negative stakes + offering cards

The negative stakes section got StrokeDrawStats (SVG icons whose strokes animate on scroll), a reworked stat layout, and a letter-stagger quote.

The offering cards became the template for all card animations going forward: sequential L→R reveal, with each card's content appearing in order — mono category label, then title (letter stagger), then description (typewriter), then CTA (btn-alive pulse). This sequencing is the site's signature animation pattern.

**Bug discovered and fixed:** Don't use intermediary boolean state (`titleDone`/`descDone`) for animation sequencing in React. They persist across viewport re-entries and cause stale `onComplete()` calls. The fix: call `onComplete()` directly from the interval/timeout callback, and add a reset effect when the animation phase regresses to `'waiting'`.

### Phase 12: Use cases + how it works

Use cases section rebuilt with the sequential card animation system. How-it-works got animated connecting lines between numbered steps — purple circles with a line drawing between them as you scroll.

### Phase 13: Social proof + authority + stakes CTA

The stakes CTA section became a "hero mirror" — same dark background, same StaggerHeading component, same btn-alive--on-dark. This established the rule: every dark CTA section on every page must mirror the hero. No exceptions.

### Phase 14: About page

Redesigned with an editorial timeline, family card, AI PRO banner, and dark CTA. The about page middle sections (family business, Lead with AI PRO) still have a problem — they're important content with zero visual distinction. Paragraphs on white. They disappear between the strong timeline above and the dark CTA below.

### Phase 15: Service pages

All three service pages rebuilt with connecting-line how-it-works sections and dark CTA sections. But here's where consistency broke down: **three different layouts for the same section types.**

| Element | Advisory | Training | Fractional |
|---|---|---|---|
| Hero background | Cream, centered | Cream, left-aligned | Dark, centered |
| Hero stat | None | "30-50" badge | None |
| "What you get" | Numbered steps + connecting line | 2x2 card grid (broken icons) | 3 plain cards |
| "Who it's for" | 3 cards | Bullet list | Checkmark list |
| Testimonial | Anonymous (initials) | Anonymous (initials) | Named (Frank Wiener) |
| Icons | None | Broken gray dots | None |

Each page was built to spec, but nobody enforced a shared pattern language. An agent (me) built each one in a separate phase context and made different visual choices each time. The result is three pages that feel like they were designed by three different people.

### The anti-slop audit (end of phase 15)

After v2.0, we ran a full visual audit. Good news: no slop patterns found. The gradient buttons, eyebrow labels, glassmorphism, and generic fade-ups were gone.

Bad news: **80% of page area is white/cream with no visual life.** The homepage hero sets a bar that nothing else meets. Between the hero at the top and the dark CTA at the bottom, every page is a visual desert — white backgrounds, black text, purple headings, the occasional card. Structurally correct, emotionally empty.

The 14 anti-slop rules were codified and added to CLAUDE.md (the file you should also read). They prevent the bad choices. They don't guarantee the good ones.

---

## What's broken right now

1. **Training page icons** — "What you get" cards show gray dots instead of Phosphor icons. The cream-bg + purple-border icon treatment from the homepage offering cards was never applied to service pages.

2. **Service page inconsistency** — three different layouts for the same content types. Needs one shared pattern with content-only variations.

3. **Soulless middle sections** — every page follows the same energy curve: strong dark hero at top, flat white/cream middle, strong dark CTA at bottom. The middle is where the actual content lives and it has no visual identity. It reads as a wireframe with real copy pasted in.

4. **About page dead zones** — "A family business" and "Lead with AI PRO" sections are important content with zero visual treatment.

5. **Content slots are empty** — the whitespace between sections is intentional, reserved for rotating quotes, stats, and contextual content. But right now they're empty, which amplifies the "soulless" feeling.

---

## What hasn't been built yet

- **Phase 16: Contact page** — form wiring (Google Apps Script → email + Google Sheet), TidyCal embed
- **Phase 17: Blog polish** — typography, reading experience, related posts

---

## What the owner actually wants

Gary has been consistent from the start:

- **Innovative, not generic.** The site should not look AI-generated. Period. If you default to safe/standard patterns, you'll get the same feedback: "this looks like a template."
- **Gary directs, you build.** Don't ask him to be a copywriter. Don't propose copy changes unless something is factually wrong. Build what he asks for.
- **No marketing cliches.** Plain language, grounded in facts. "Unlock your potential" and "embark on your journey" are banned.
- **Verify before moving on.** Don't claim something works without checking. The phase 9 audit exists because 8 phases shipped with a JavaScript error on every page.
- **Don't over-engineer.** Simple and focused. Three similar lines of code are better than a premature abstraction.
- **Don't estimate timelines.**
- **Don't touch the GSAP scroll-snap mechanics.** The "film strip on a spool" scroll system works. It was hard-won. Leave it alone unless explicitly asked.

### Technical note: Gary's Linux environment

`open` and `xdg-open` launch OpenWhispr on Gary's machine, not a browser. Use `google-chrome <path>` to open HTML files.

---

## The design rules that exist because of past mistakes

All 14 anti-slop rules in CLAUDE.md exist because an AI agent (me) made that exact mistake during this build and it had to be fixed. They are:

1. No gradient buttons — btn-alive only
2. No pill buttons (border-radius: 9999px)
3. No eyebrow labels above headings
4. No generic fade-up — letter stagger, typewriter, sequential reveals
5. No glassmorphism outside nav
6. No dramatic shadows except card hover
7. No decorative copy
8. No transform-on-hover except btn-alive
9. Colors flat, not gradients
10. Icon containers: cream + purple border
11. Dark CTA = hero mirror (StaggerHeading + btn-alive--on-dark)
12. Sequential L→R card animation
13. Mono labels: IBM Plex Mono 11px/500/0.08em/uppercase
14. Reduced motion fallback on all animations

Every one of these was learned the hard way. Don't relearn them.

---

## Key files

| File | What it is |
|---|---|
| `CLAUDE.md` | Project instructions + anti-slop rules. Read after this file. |
| `PRD.md` | Complete technical spec (~59KB). Every route, component, token, animation value. |
| `audit/visual-audit.md` | Honest visual assessment of current state |
| `audit/SITE-AUDIT.md` | Playwright audit that found the 19 defects |
| `audit/claude-md-draft.md` | Source draft for the anti-slop rules |
| `audit/uncodixfy-assessment.md` | Third-party rules comparison |
| `src/styles/global.css` | Design system CSS, btn-alive + CTA pulse classes |
| `src/components/islands/HeroIsland.tsx` | Letter stagger + CTA pulse — the visual benchmark |
| `src/components/islands/OfferingCardsIsland.tsx` | Sequential card animation — the pattern template |
| `src/components/islands/StaggerHeading.tsx` | Letter-stagger h2 for dark sections |
| `src/components/islands/StakesCTAPulse.tsx` | btn-alive--on-dark CTA component |
| `src/layouts/ServicePage.astro` | Shared service page layout |

---

## The honest summary

The site has good bones. Clean structure, no technical debt, no slop patterns. The homepage hero and dark CTAs prove the brand can express well. The problem is that 80% of the page area — the middle sections where the actual content lives — has no visual life. It reads as a wireframe with real copy pasted in.

The next agent's job is to give those middle sections soul without introducing slop. That's the hard part. Following rules is easy. Making something that feels alive and distinctive within those rules is the actual work.
