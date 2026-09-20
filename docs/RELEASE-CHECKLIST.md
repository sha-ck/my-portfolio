# Release Checklist

## Living System approval and release gates

Status: documentation approved 2026-09-21; semantic implementation awaiting visual review. No box below is evidence of completion until checked with a recorded result. The legacy checklist remains applicable except that browser contact handoffs must not be described as confirmed message delivery.

- [x] Explicit approval of the blueprint and implementation plan recorded before dependencies/product code change.
- [ ] Existing homepage rebuilt and runtime baseline recorded, including desktop/mobile screenshots and navigation/contact behavior.
- [ ] `/` unchanged during lab development; `/lab` unlinked, `noindex, nofollow`, excluded from sitemap.
- [ ] Complete semantic experience reviewed before WebGL enhancement.
- [ ] AI claims, current role, project outcomes, contact destinations and media confirmed; no placeholder claims.
- [ ] All six scenes, mobile, reduced motion and final cutover reviewed visually; user screenshots supplied where direct inspection is unavailable.
- [ ] Full/lite/static, WebGL failure/context loss, JavaScript disabled, anchor refresh and resize tested.
- [ ] Contact validation, URI encoding, Unicode/malformed input, clipboard denial and missing configuration tested. Draft/copy feedback never asserts delivery.
- [ ] Optional WhatsApp number explicitly approved for public exposure; LinkedIn profile confirmed.
- [ ] Keyboard, focus, mobile menu, headings, landmarks, errors/live feedback and 200% zoom checked.
- [ ] Widths 320, 375, 768, 1024, 1440, 2560px checked; Chrome, Edge, Firefox, Safari coverage recorded with gaps.
- [ ] Lint, `npx --no-install tsc --noEmit --incremental false`, focused tests and production build pass after each major phase.
- [ ] Lighthouse 90+ targets, LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 evaluated with measurement context; lab noindex SEO exception and field-data limitations reported.
- [ ] No critical accessibility violations; no private data logged; static content remains readable.
- [ ] Final cutover explicitly approved; actual previous deployed commit and rollback procedure recorded.
- [ ] After cutover, `/` metadata/indexability, all preserved anchors and contact handoffs verified; `/lab` remains non-indexed.
- [ ] Deployment authorized separately and post-deployment checks recorded.

Contract: [Blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md) and [Implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md). These proposed target requirements take precedence over conflicting legacy guidance only after explicit approval.

---

## Before Merge

- [ ] Content is fact-checked and spelling is reviewed.
- [ ] All section links and external links work.
- [ ] Contact flow is tested with valid, empty, and malformed values.
- [ ] No secrets or personal form submissions are committed.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Browser and Device QA

- [ ] Chrome desktop and mobile viewport.
- [ ] Safari desktop and iPhone-sized viewport.
- [ ] Firefox desktop.
- [ ] 320px narrow viewport.
- [ ] Keyboard-only navigation.
- [ ] Screen reader smoke test.
- [ ] Reduced motion enabled.
- [ ] Zoom at 200%.

## Production QA

- [ ] Metadata and social preview are correct.
- [ ] Favicon loads.
- [ ] No console errors.
- [ ] Lighthouse checks meet targets.
- [ ] Contact delivery works in production.
- [ ] Analytics events exclude message contents and unnecessary personal data.
- [ ] Rollback path is known.
