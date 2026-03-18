---
gsd_state_version: 1.0
milestone: v3.0
milestone_name: Polish & Ship
status: in_progress
stopped_at: Completed blog content overhaul (ad-hoc, outside GSD phases)
last_updated: "2026-03-18"
last_activity: 2026-03-18 -- Blog overhaul, card spacing, prose typography, blog images
progress:
  total_phases: 7
  completed_phases: 4
  total_plans: 6
  completed_plans: 5
  percent: 57
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-10)

**Core value:** Business leaders can quickly understand what Consultates offers and book a free call — the site removes friction between "I need help with AI" and "I'm talking to someone who can help."
**Current focus:** v3.0 Polish & Ship — Phase 20.5 (Blog Overhaul) complete, responsive audit partially done, Phase 21 next

## Current Position

Phase: 20.5 complete (blog overhaul, ad-hoc)
Plan: Ad-hoc work, no formal plan
Status: Blog shipped, responsive audit partially done
Last activity: 2026-03-18 — Blog content overhaul shipped to production

Progress: [█████▌░░░░] 57%

## Ad-Hoc Work Outside GSD (2026-03-17 to 2026-03-18)

### 2026-03-17 (Session 1)
- Dark hero treatment applied to all service pages, about page, blog index, homepage StakesCTA
- Service page card layout restructured (icon + title horizontal header)
- Blog carousel theming (fadeColor, cardBg props)
- Blog card layout fix (category pill moved to bottom, spacing improved)
- About page 2020s timeline entry added
- Roadmap updated with Phase 21-23

### 2026-03-17 (Session 2 — responsive audit)
- Playwright screenshots captured across multiple viewports
- Responsive fixes committed (dark hero padding, glow standardisation)
- Screenshots stored in pilot-audit/
- FIXES.md created with comprehensive issue list

### 2026-03-18 (Today)
- Blog content overhaul: 3 existing posts polished in Gary's voice
- 3 new 2026 companion posts written (agents-eating-the-world framing)
- 6 Saul Bass-style blog images generated via Gemini Nano Banana Pro
- Prose CSS overhauled (font size, line-height, spacing, purple list markers)
- Blog card spacing improved (padding, gap)
- BlogCardNew: year added to category pill
- Blog post back button: btn-alive with reversed underline animation
- All shipped to production

## Milestone History

- v1.0 MVP — Phases 1-9 (shipped 2026-03-05)
- v2.0 Visual Redesign — Phases 10-17 (shipped 2026-03-10)

See .planning/MILESTONES.md for full details.

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.

- Why Consultates subtitle copy ("Gary Tate brings a rare combination...") added — pending Gary's review
- Timeline line gradient changed to directional flow (purple from each step) per Gary's feedback
- How It Works section noted as "weak on content" — future improvement
- Footer redesign: dot texture bg, animated purple underlines, 2-col quick links, social icons only (no email), "Clarity on AI" subtitle
- Blog image style: Saul Bass editorial illustration, bold saturated purple fills, no outlines, cream/navy/lavender palette
- Blog voice: Gary's conversational voice, no em dashes, no corporate consultant tone
- Blog strategy: evergreen 2025 posts + 2026 agent-focused companion posts

### Roadmap Evolution

- v1.0 completed: 9 phases, 20 plans (2026-03-05)
- v2.0 completed: 8 phases, 12+ plans (2026-03-10)
- v3.0 roadmap: 7 phases, 8+ plans (2026-03-10, updated 2026-03-18)

### Pending Todos

- X/Twitter URL placeholder (`https://x.com/consultates`) needs Gary to confirm actual handle
- StrokeDrawStats.tsx has uncommitted changes from a previous session

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-03-18
Stopped at: Blog overhaul shipped, GSD state updated
Resume file: None
