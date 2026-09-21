# Existing portfolio baseline

Recorded 2026-09-21 before lab implementation. Local starting HEAD: `440430f`. Actual deployed commit and deployment package-manager configuration remain unknown; local installation uses pnpm.

- Lint passed with the existing unoptimized portrait warning; TypeScript passed; production build passed.
- Baseline `/`: 96.1 kB route size, 175 kB first-load JavaScript reported by Next.js.
- Chrome 153, desktop 1440x1000 and mobile 375x812 reference screenshots captured under the ignored `.superpowers/sdd/IMMERSIVE-AI-IMPLEMENTATION-PLAN/` workspace.
- Existing portrait loads; mobile menu opens and closes after selecting a destination; projects navigation reaches the section and changes the scrolled header style. Other section destinations were exercised; one early Home measurement was sampled before smooth scrolling settled, so it is not a confirmed failure.
- Source contact mechanism is encoded mailto followed by a misleading sent state. No real message was sent. Current homepage behavior was not altered by the redesign.
- Root page, layout and global stylesheet acquired independent formatting changes during the session. Formatting-normalized comparison against HEAD confirms no behavioral/content change in these three files.

The reported stale build was resolved by rebuilding. A later concurrent dev server overwrote production manifests; stopping that server allowed the production build to pass. Do not run dev and build against the same `.next` concurrently.
