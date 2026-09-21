# Release Checklist

## Living System approval and release gates

Status: refinement verified locally 2026-09-21 against the current working tree. The repository still serves the legacy homepage at `/` and the immersive experience at unlinked `/lab`, and this task preserved the existing homepage and lab states. Earlier documentation describing a completed cutover conflicts with the working tree and must not be treated as authorization for a new production route change. No production cutover or deployment was performed in this task.

Evidence gate: retain `/lab` isolation and its `noindex, nofollow` metadata. The current verified state covers code, tests, and browser checks; content evidence, owner visual review, production-domain confirmation, and explicit future production authorization remain the open release gates. Browser contact handoffs never establish message delivery.

Current verification: see the refinement entry in [the verification record](./IMMERSIVE-AI-VERIFICATION.md). Items below are checked only where fresh evidence exists in the repo or in the recorded browser/test runs; broader owner or release approvals remain explicitly open.

- [x] Explicit approval of the blueprint and implementation plan recorded before dependencies/product code change.
- [x] Approved AI Creator + AI Product Engineer identity preserved as the portfolio's primary positioning. Content verified: `app/immersive/content.ts` has `headline: 'AI Creator × AI Product Engineer'`; `aiPractices: []` (no unverified claims).
- [x] Unsupported AI claims are withheld until they are backed by explicit evidence or approved framing. `filterRenderableAiPractices` in `app/immersive/sections/Skills.tsx` gates AI practice rendering on evidence; `content.ts` has empty `aiPractices` array. Verified by the automated contact-render tests.
- [x] Existing homepage baseline recorded, including desktop/mobile screenshots and navigation/contact behavior. Baseline recorded in `docs/IMMERSIVE-AI-BASELINE.md`. Original `app/page.tsx` archived.
- [x] Current working-tree release isolation verified: `/` retains the legacy experience; `/lab` serves the immersive portfolio with `noindex, nofollow`, is unlinked from `/`, and is absent from the sitemap. Production layout, metadata and global styles were preserved during refinement.
- [ ] Complete semantic experience reviewed before WebGL enhancement. Implementation is complete in code, but visual review and owner sign-off remain pending.
- [ ] Verified role, project outcomes, contact destinations, media rights, and AI claims are confirmed individually; no placeholder claims. The content review queue remains blocked by owner confirmation.
- [ ] All six scenes, mobile, reduced motion and visual review completed; user screenshots supplied where direct inspection is unavailable. Browser evidence recorded in `docs/IMMERSIVE-AI-VERIFICATION.md` is strong, but the final visual review remains open.
- [x] Full/lite/static, WebGL failure/context loss, JavaScript disabled, anchor refresh and resize tested. Verified by the scene and contact tests and by the recorded browser checks in `docs/IMMERSIVE-AI-VERIFICATION.md`.
- [x] Contact validation, URI encoding, Unicode/malformed input, clipboard denial and missing configuration tested. Draft/copy feedback never asserts delivery. Verified by the automated contact tests and browser evidence.
- [x] Optional WhatsApp number explicitly approved for public exposure; LinkedIn profile confirmed. `content.ts` has `linkedinUrl: 'https://www.linkedin.com/in/shanid0cherukattil/'`. No `whatsappInternational` is configured. WhatsApp remains absent until a number is explicitly approved.
- [x] Keyboard, focus, mobile menu, headings, landmarks, errors/live feedback and 200% zoom checked. Verified by browser evidence in `docs/IMMERSIVE-AI-VERIFICATION.md` and the recorded checks against the local build.
- [x] Widths 320, 375, 768, 1024, 1440, 2560px checked; Chrome coverage is recorded. Verified on Chrome 153 headless with no horizontal document overflow at those widths.
- [x] Lint, `npx --no-install tsc --noEmit --incremental false`, focused tests and production build pass after each major phase. Verified 2026-09-21: `pnpm run lint` passes; `npx --no-install tsc --noEmit --incremental false` passes cleanly; `pnpm run test` passes 14/14; `pnpm run build` succeeds.
- [ ] Lighthouse 90+ targets, LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 evaluated with measurement context. Not yet measured. Requires local Lighthouse measurement under the recorded conditions.
- [x] No critical accessibility violations; no private data logged; static content remains readable. No critical violations were reported in the browser checks, and the static content remains readable without JavaScript.
- [x] Historical cutover record reconciled with the restored legacy homepage and `/lab` working tree. No cutover was performed or authorized by this refinement.
- [ ] After cutover, `/` metadata/indexability, all preserved anchors and contact handoffs verified. Pending final owner confirmation and any future route change authorization.
- [ ] Deployment authorized separately and post-deployment checks recorded. Not authorized.

## Infrastructure: sitemap and robots

- [x] `app/sitemap.ts` created; lists only `/`, excludes `/lab`.
- [x] `app/robots.ts` references the sitemap and allows crawling. `/lab` supplies `noindex, nofollow` metadata; crawling remains allowed so that directive can be read.
- [x] `app/lab/page.tsx` has `robots: { index: false, follow: false }` metadata.
- [ ] Production domain confirmed for sitemap/robots URLs (`shanidcherukattil.com`). Requires owner confirmation.
- [x] `/lab` `noindex, nofollow` confirmed in rendered server metadata and Chrome during refinement.

Contract: [Blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md) and [Implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md). These proposed target requirements take precedence over conflicting legacy guidance only after explicit approval.

---

## Before Merge

- [ ] Content is fact-checked and spelling is reviewed.
- [ ] All section links and external links work.
- [x] Contact flow is tested with valid, empty, and malformed values.
- [x] No secrets or personal form submissions are committed.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.

## Browser and Device QA

- [x] Chrome desktop and mobile viewport.
- [ ] Safari desktop and iPhone-sized viewport.
- [ ] Firefox desktop.
- [x] 320px narrow viewport.
- [x] Keyboard-only navigation.
- [ ] Screen reader smoke test.
- [x] Reduced motion enabled.
- [x] Zoom at 200%.

## Production QA

- [x] Metadata and social preview are correct for the current working tree (`app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, and `app/lab/page.tsx`).
- [ ] Favicon loads.
- [x] No console errors in the recorded browser checks.
- [ ] Lighthouse checks meet targets.
- [ ] Contact preparation and external draft handoffs work in production; confirmed delivery is not claimed.
- [ ] Analytics events exclude message contents and unnecessary personal data.
- [ ] Rollback path is known.
