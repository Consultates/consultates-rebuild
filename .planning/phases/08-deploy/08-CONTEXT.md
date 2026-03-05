# Phase 8: Deploy - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning
**Source:** PRD Express Path (PRD.md §8.1, §8.2)

<domain>
## Phase Boundary

Set up GitHub Actions CI/CD workflow and GitHub Pages deployment configuration. The site is fully built — this phase adds the deployment pipeline so pushes to main automatically build and deploy to consultates.com.

</domain>

<decisions>
## Implementation Decisions

### GitHub Actions CI/CD — DEPLOY-01
- Workflow file: `.github/workflows/deploy.yml`
- Trigger: push to `main` branch
- Steps:
  1. Checkout repository
  2. Setup Node 22 + pnpm 9
  3. `pnpm install --frozen-lockfile`
  4. `pnpm build`
  5. Deploy `dist/` to GitHub Pages
- Use `actions/deploy-pages` and `actions/upload-pages-artifact` for GitHub Pages deployment
- Use `actions/setup-node` with Node 22
- Use `pnpm/action-setup` for pnpm 9

### GitHub Pages Config — DEPLOY-02
- Create `public/CNAME` file with `consultates.com`
- Repository: `consultates-rebuild`
- Branch: `main` is production
- SSL: automatic via GitHub Pages
- The CNAME file ensures the custom domain persists across deployments

### Claude's Discretion
- Exact GitHub Actions action versions (e.g., actions/checkout@v4)
- Whether to add a concurrency group to prevent parallel deploys
- Whether to cache pnpm store for faster builds
- Workflow permissions configuration for GitHub Pages

</decisions>

<specifics>
## Specific Ideas

- Astro config already has `site: 'https://consultates.com'` — matches the deployment target
- `output: 'static'` already set — produces `dist/` directory
- Build already verified working from prior phases

</specifics>

<deferred>
## Deferred Ideas

None — this is the final phase of v1.

</deferred>

---

*Phase: 08-deploy*
*Context gathered: 2026-03-05 via PRD Express Path*
