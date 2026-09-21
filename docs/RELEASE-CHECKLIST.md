# Release Checklist

## Living System approval and release gates

Status: refinement verified locally 2026-09-21. The current working tree serves the legacy homepage at `/` and the immersive experience at unlinked `/lab`. This task preserved the pre-existing homepage and lab edits. Earlier documentation recorded a completed cutover, but that statement conflicts with the working tree and other release records; it is not authorization for another routing change. No production cutover or deployment was performed in this task.

Evidence gate: retain `/lab` isolation and its `noindex, nofollow` metadata. Content evidence, owner visual review, production-domain confirmation, reconciliation of the historical cutover record, and explicit authorization for any future production change remain open. Browser contact handoffs never establish message delivery.

Current verification: see the refinement entry in [the verification record](./IMMERSIVE-AI-VERIFICATION.md). Checks below remain unchecked where broader device, owner, or release evidence is missing.

- [x] Explicit approval of the blueprint and implementation plan recorded before dependencies/product code change.
- [x] Approved AI Creator + AI Product Engineer identity preserved as the portfolio's primary positioning. Content verified: `app/immersive/content.ts` has `headline: 'AI Creator × AI Product Engineer'`; `aiPractices: []` (no unverified claims).
- [x] Unsupported AI claims are withheld until they are backed by explicit evidence or approved framing. `filterRenderableAiPractices` in `app/immersive/sections/Skills.tsx` gates AI practice rendering on evidence; `content.ts` has empty `aiPractices` array. Verified by `tests/contact-render.test.cjs`.
- [x] Existing homepage baseline recorded, including desktop/mobile screenshots and navigation/contact behavior. Baseline recorded in `docs/IMMERSIVE-AI-BASELINE.md`. Original `app/page.tsx` archived.
- [x] Current working-tree release isolation verified: `/` retains the legacy experience; `/lab` serves the immersive portfolio with `noindex, nofollow`, is unlinked from `/`, and is absent from the sitemap. Production layout, metadata and global styles were preserved byte-for-byte during refinement.
- [ ] Complete semantic experience reviewed before WebGL enhancement. Implementation complete: all six sections (Hero, About, Experience, Projects, Skills, Contact) with semantic HTML, landmarks, skip link, accessible navigation. Awaiting visual review.
- [ ] Verified role, project outcomes, contact destinations, media rights, and AI claims are confirmed individually; no placeholder claims. Content confirmation queue in `docs/IMMERSIVE-AI-CONTENT-REVIEW.md`. Employment, AI projects, contact ownership, and media rights remain blocked pending owner confirmation.
- [ ] All six scenes, mobile, reduced motion and visual review completed; user screenshots supplied where direct inspection is unavailable. Browser evidence recorded in `docs/IMMERSIVE-AI-VERIFICATION.md` (Chrome 153 headless). Visual review pending.
- [ ] Full/lite/static, WebGL failure/context loss, JavaScript disabled, anchor refresh and resize tested. Verified: `tests/scene.test.cjs` tests `chooseRenderProfile`, `downgradeProfile`, `clampProgress`, `resolveScene`. `tests/contact-render.test.cjs` tests no-JS rendering. Browser evidence in `docs/IMMERSIVE-AI-VERIFICATION.md` confirms reduced motion, JS-disabled, 320-2560px, and anchor refresh.
- [ ] Contact validation, URI encoding, Unicode/malformed input, clipboard denial and missing configuration tested. Draft/copy feedback never asserts delivery. Verified: `tests/contact.test.cjs` (7 tests) covers validation, encoding, limits, Unicode. `tests/contact-render.test.cjs` tests pre-hydration disabled fields, WhatsApp-only fallback, empty configuration honesty, and evidence-gated AI practices.
- [ ] Optional WhatsApp number explicitly approved for public exposure; LinkedIn profile confirmed. `content.ts` has `linkedinUrl: 'https://www.linkedin.com/in/shanid0cherukattil/'`. No `whatsappInternational` configured. LinkedIn confirmed against profile data. WhatsApp remains absent until a number is explicitly approved.
- [ ] Keyboard, focus, mobile menu, headings, landmarks, errors/live feedback and 200% zoom checked. Verified by browser evidence in `docs/IMMERSIVE-AI-VERIFICATION.md`: mobile menu Escape/focus-return at 375px, all six sections reachable, 200% zoom no horizontal overflow. Heading hierarchy: one H1 on the page, with H2 headings for the remaining sections. Focus visible via CSS `:focus-visible` outline.
- [ ] Widths 320, 375, 768, 1024, 1440, 2560px checked; Chrome, Edge, Firefox, Safari coverage recorded with gaps. Verified: Chrome 153 headless at all six widths, no horizontal overflow (per `docs/IMMERSIVE-AI-VERIFICATION.md`). Edge, Firefox, Safari coverage gaps recorded.
- [x] Lint, `npx --no-install tsc --noEmit --incremental false`, focused tests and production build pass after each major phase. Verified 2026-09-21: `pnpm run lint` passes; `npx --no-install tsc --noEmit --incremental false` passes cleanly; `pnpm run test` passes 13/13; `pnpm run build` succeeds.
- [ ] Lighthouse 90+ targets, LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 evaluated with measurement context. Not yet measured. Requires local Lighthouse measurement under recorded conditions.
- [ ] No critical accessibility violations; no private data logged; static content remains readable. No critical violations found in browser checks. Static content is server-rendered and readable without JavaScript. No personal input logging implemented.
- [ ] Historical cutover record reconciled with the restored legacy homepage and `/lab` working tree. No cutover performed or authorized by this refinement.
- [ ] After cutover, `/` metadata/indexability, all preserved anchors and contact handoffs verified. Pending final owner confirmation.
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
- [ ] Contact preparation and external draft handoffs work in production; confirmed delivery is not claimed.
- [ ] Analytics events exclude message contents and unnecessary personal data.
- [ ] Rollback path is known.
