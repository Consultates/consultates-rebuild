# Uncodixfy Assessment — Consultates Applicability

## What Uncodixfy Is
A "negative prompt" constraint document. It doesn't teach design — it tells AI what NOT to do. Core philosophy: "If a UI choice feels like a default AI UI move, ban it and pick the harder, cleaner option."

## Their Rules vs Our Rules

### Already addressed by our anti-slop rules
| Uncodixfy Rule | Our Equivalent |
|---|---|
| No oversized rounded corners (20px+) | Cards use 16px (--card-radius) |
| No pill-shaped buttons | btn-alive system, no border-radius: 9999px |
| No floating glassmorphism | No backdrop-filter outside nav |
| No soft corporate gradients | Colors flat and intentional |
| No eyebrow labels (uppercase + letter-spacing above headings) | Banned in our rules |
| No decorative copy explaining UI | Banned in our rules |
| No transform animations on hover | Only btn-alive magnetic hover |
| No dramatic box shadows | Max blur 20px except card hover |
| No gradient backgrounds on buttons | btn-alive underline-draw system |
| No hero sections in internal UIs | N/A (we're a marketing site) |

### New rules we should adopt
| Uncodixfy Rule | Recommendation |
|---|---|
| Buttons: 8-10px radius max | Our btn-alive has no radius (inline text). Cards at 16px are fine for a marketing site. No action needed. |
| Shadows: max 0 2px 8px rgba(0,0,0,0.1) | Their rule is for dashboards. Our card rest shadow (4px 20px at 0.07 opacity) is appropriate for marketing. Keep. |
| Transitions: 100-200ms ease, simple opacity/color | Our animations are intentionally distinctive (letter stagger, typewriter). This rule is for SaaS dashboards, not marketing. Keep our approach. |
| Icons: consistent 16-20px, monochrome or subtle color | Our Phosphor duotone icons at brand purple are already on-brand. No action. |
| No serif headline + system sans fallback combos | We use IBM Plex Serif + IBM Plex Sans — same family, intentional pairing. Not a random combo. Safe. |
| Spacing: consistent 4/8/12/16/24/32px scale | Worth auditing — service pages have massive whitespace gaps suggesting inconsistent spacing. **Action needed.** |
| No metric-card grids as default dashboards | Training page "30-50" stat badge is a single contextual stat, not a dashboard grid. Safe. |
| No muted gray-blue text reducing contrast | Check our --text-muted (#8e8fa0) meets WCAG AA against white/cream. **Verify.** |

### Rules that DON'T apply to us
- Sidebar width constraints (240-260px) — no sidebars
- Table styling — no tables on marketing site
- Modal/dropdown specs — not used
- Toolbar height — not applicable
- Dashboard-specific patterns — we're not a SaaS dashboard
- Their color palettes — we have our own brand system

## Summary
Uncodixfy is designed for SaaS dashboard UIs built by AI. About 60% of their rules overlap with our existing anti-slop rules. The remaining 40% are dashboard-specific and don't apply to a marketing site.

**Two action items:**
1. Audit section spacing across service pages — massive whitespace gaps suggest inconsistent spacing values
2. Verify --text-muted contrast ratio against white and cream backgrounds
