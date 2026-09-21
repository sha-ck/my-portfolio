# Semantic lab verification 2026-09-21

Scope: implementation Tasks 1-6, before the required semantic visual review. WebGL/full/lite rendering, AI content integration and final cutover are not complete.

## Automated evidence

- `pnpm test`: **13/13 passing** (previously reported 7/7). Required fields, malformed email, CR/LF rejection, limits, Unicode/query encoding, WhatsApp validation, pre-hydration form safety, WhatsApp-only static fallback, missing configuration, scene progress logic, render profile selection, and evidence-gated AI practice rendering.
- `npx --no-install tsc --noEmit --incremental false`: passed cleanly.
- `pnpm run build`: passed, including lint/type checks. Existing root portrait warning remains; no new lint errors. 8 routes generated: `/` (7.3 kB, 86.8 kB JS), `/lab` (11.6 kB, 91 kB JS), `/robots.txt` (0 B), `/sitemap.xml` (0 B).
- `pnpm exec prettier --check app/immersive app/lab tests`: passed.
- Next build includes `/robots.txt` and `/sitemap.xml` with `/lab` excluded from sitemap.
- Tests use Node 24's TypeScript support for pure helpers and the already-installed TypeScript compiler for server component rendering. No test dependencies added.

## Infrastructure verification

- `app/sitemap.ts`: generated; lists only `/`, excludes `/lab`.
- `app/robots.ts`: disallows `/lab`, references sitemap.
- `app/lab/page.tsx`: has `robots: { index: false, follow: false }` metadata.
- `/lab` route confirmed as `noindex, nofollow` via both server metadata and `robots.txt` disallow.
- Root `/` metadata unchanged from pre-lab state.

## Browser evidence

Chrome 153 headless on Windows, production server at `http://localhost:3000`:

- All six native navigation destinations reached; section headings remain below the 110px scroll margin. Refresh at `/lab#projects` restored the destination.
- Mobile menu open/close, Escape and return-focus behavior passed at 375px.
- Empty submission produces three field errors and focuses name. Unicode/multiline input yields an introduction with sender email; decoding the email link reproduces it exactly.
- Clipboard rejection and missing clipboard API retain the introduction, select it for manual copying and announce the fallback. No message was sent.
- 320, 375, 768, 1024, 1440 and 2560px: no horizontal document overflow. Desktop, mobile, About and Contact screenshots inspected.
- Reduced-motion emulation: all six sections available and zero active animations.
- Actual script execution disabled via CDP: all six server-rendered sections, fallback navigation and email link present; composer disabled, no horizontal overflow. Mobile header overlap reproduced and fixed; final header ends at 180px, H1 starts at 367px.
- 200% CSS zoom simulation: no horizontal overflow, all six sections available. Native browser zoom and screen-reader testing remain release checks.
- No browser runtime errors reported in the final Chrome check.
- Lab robots metadata is `noindex, nofollow`. WebGL canvas dynamically imported via `next/dynamic`; static profile loads no canvas code. Production page/layout/global styling were compared after normalizing formatting: only independent formatting edits differ from HEAD.

Screenshots and local diagnostic artifacts are in ignored `.superpowers/sdd/IMMERSIVE-AI-IMPLEMENTATION-PLAN/` (including `no-js-mobile.png`).

## Independent review and audit

One independent code review found pre-hydration form submission leakage and missing WhatsApp-only fallback. Both are fixed; regression coverage passes. Empty configuration now also displays an honest static unavailable state.

The generic premium UI audit reported five findings: three in the unchanged legacy homepage (native select ownership, native validation and textarea resize), and two requiring resize-none for the new textareas. The latter are intentionally vertically resizable within the container so visitors can expand long messages; this marketing page does not adopt the skill's dashboard-only resize lock. These are documented audit exceptions, not a claim of a clean automated audit. No broad legacy rewrite was performed.

## Remaining gates

1. User visual review of the semantic experience before WebGL, as required by implementation Task 2.
2. Approved AI evidence, contact reconfirmation and release assets listed in the content review queue.
3. Full/lite/static WebGL implementation and resilience tests after visual review.
4. Edge/Firefox/Safari, screen reader, native 200% zoom, Lighthouse/Web Vitals and final accessibility audit before release. No 90+ or Core Web Vitals result is claimed yet.
5. Explicit final homepage cutover and deployment authorization, plus actual deployed rollback commit.
