# About Page Fix — Restore Gary's Copy + Visual Treatment

## Before you start

- [ ] Read `READMEFIRST.md`
- [ ] Read `CLAUDE.md` (especially Design Authority section)
- [ ] Read the website design doc: `~/Development/consultates-brand-guidelines/consultates/guidelines/website-design-v3.html`
- [ ] Read `STATUS.md` for current site status
- [ ] Read the current About page: `src/pages/about.astro`
- [ ] Ask Gary to confirm the plan before making any changes

## What happened

A previous agent rewrote Gary's original first-person About page copy into a third-person timeline format without permission. Two sections were lost:

1. **"How We Work"** — became "A family business" with rewritten copy
2. **"A Personal Message From Our Founder"** — Gary's entire first-person letter was removed and replaced with a third-person timeline

## Gary's original copy (VERBATIM — do not edit)

### Section: HOW WE WORK

> We run a family consultancy and scale through established partners. Together we bring care and a personal touch to every engagement. You get one accountable team from start to finish.

### Section: A PERSONAL MESSAGE FROM OUR FOUNDER

> "I'm Gary C., and if you're here, you're exploring how AI fits into your business.
> Using AI in my own businesses has saved us time and money and helped us grow. I learned through both training and trial and error, what works and what to avoid, so you can get there faster.
>
> I wrote my first code at age 10 in the 80s on a computer I built with my dad. Back then there were no mobile phones, no Internet, and just a handful of TV channels. I've witnessed many paradigm shifts: personal computers, the Internet, social media. AI is on another level; its arrival is unlike anything before and a shift none of us can afford to ignore. Each shift taught me that early adopters who move with intention consistently outperform those who wait. AI follows the same pattern, just faster. But don't worry, you already have hard won skills and experience that translate perfectly to working with AI and I can show you how to apply them effectively.
>
> I've spent twenty years in tech leadership, then fifteen building teams and running companies. I've lived and worked in sixteen countries across five continents. That mix helps me bridge product, marketing, sales, and operations with a mindset shaped by both tech and business. I aim to make AI practical and approachable so you gain clear choices and the confidence to move forward.
>
> Let's discover how we can put AI to work for you in your business."

## Tasks

### 1. Restore Gary's copy
- [ ] Replace "A family business" section with "How We Work" using Gary's verbatim copy above
- [ ] Add "A Personal Message From Our Founder" section with Gary's verbatim copy above
- [ ] Ask Gary where these sections should go in the page order (before/after timeline? replace timeline?)
- [ ] The timeline may stay, be merged, or be removed — ASK Gary, don't decide

### 2. Visual treatment for both sections
- [ ] Read the website design doc for card patterns, section backgrounds, accent treatments
- [ ] "How We Work" needs visual distinction — not just a plain card on white
- [ ] "Personal Message" needs warmth — this is Gary speaking directly, it should feel personal
- [ ] Follow anti-slop rules (no gradients, no eyebrow labels, no glassmorphism, etc.)
- [ ] Propose visual treatment to Gary BEFORE implementing
- [ ] Consider: accent backgrounds, subtle borders, pull-quote styling for the letter, Gary's photo near the message

### 3. "Lead with AI PRO" section
- [ ] This section also has zero visual treatment (plain card with left border)
- [ ] Needs design work — propose treatment to Gary

## Rules

- **DO NOT rewrite Gary's copy.** Use it verbatim.
- **DO NOT start building before asking Gary** to confirm the layout and visual approach.
- **Read all design documents first** before proposing visual treatments.
- **Archive, never delete** — if removing sections, move content to `_archive/`.

## Key files

| File | Purpose |
|------|---------|
| `src/pages/about.astro` | The page to fix |
| `website-design-v3.html` | Design authority for visual patterns |
| `src/components/sections/HeroSection.astro` | Reference for strong visual treatment |
| `src/components/islands/StaggerHeading.tsx` | For dark section headings |
| `STATUS.md` | Running status tracker — update when done |
