# Immersive AI Portfolio Implementation Plan

> For agentic workers: use `superpowers:executing-plans` to execute task by task after explicit documentation approval. Checkboxes track work; unchecked items are not completion claims.

**Goal:** Build and validate the Living System portfolio on `/lab`, then perform an independently approved homepage cutover.

**Architecture:** Server-rendered semantic content with local client interactions and a dynamically loaded decorative canvas. One scene director maps native section progress to the organism; route metadata stays separate from shared page composition.

**Tech stack:** Existing Next.js 13.5.1, React 18.2.0, TypeScript 5.2.2; CSS modules; proposed Three.js, React Three Fiber, Drei and GSAP versions subject to compatibility checks.

**Spec:** [Canonical blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md).

## Global constraints

- Documentation approved on 2026-09-21. Implementation is underway; checkboxes and verification records report actual progress.
- Keep `/` unchanged until final cutover. `/lab` stays unlinked and `noindex, nofollow`, including after launch.
- Preserve `home`, `about`, `experience`, `projects`, `skills`, `contact`, in that order.
- Use the exact palette, fonts, content policy and render profiles in the blueprint.
- No invented AI claims, metrics, destinations, providers, employment or delivery confirmations.
- Native scroll, one canvas, one scene director; all essential content and controls live in the DOM.
- No automatic commits, pushes, merges or deployments are part of this plan.

## Review focus

| Condition | Expected behavior | Owner |
| --- | --- | --- |
| Hash refresh before fonts/media settle | Correct readable section, matching scene and no concealed heading | Tasks 2, 4 |
| Reduced motion toggled or WebGL context lost mid-session | Immediate static composition; input and focus preserved | Task 5 |
| Unicode, newlines, `&`, `?`, `#` in contact input | One safely encoded introduction, no query/header injection | Task 3 |
| Clipboard denied, missing channel, popup blocked | Manual copy and ordinary profile/contact navigation remain usable | Task 3 |
| Global styles, zoom or mobile-menu resize | Scoped design, visible focus and no hidden focusable menu | Tasks 2, 7 |

## Task 1: Restore and record the baseline

**Files:** read `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `package.json` and both lockfiles; create `docs/IMMERSIVE-AI-BASELINE.md` after approval.

- [ ] Record git status and the actual deployed commit separately from local HEAD. Identify the package manager used by the deployment before any dependency change; do not regenerate both lockfiles.
- [ ] Inspect running servers and reuse a suitable one. Diagnose the reported stale build. If generated-output cleanup is needed, stop its server, verify the resolved `.next` path is exactly inside this workspace, and remove only that generated directory.
- [ ] Run `npm run lint`, `npx --no-install tsc --noEmit --incremental false`, and `npm run build` against the current source. These are the existing npm-compatible scripts; use equivalent commands if pnpm is established. Record actual failures without silently upgrading the framework or fixing production behavior.
- [ ] Start the built site using `npm run start` and verify `/`, six navigation destinations, both hero actions, header scroll state, mobile menu, skills reveal, portrait and contact draft behavior. Do not send a real message.
- [ ] Capture 1440px desktop and 375px mobile references and record browser/version. If browser access is unavailable, request user screenshots and mark runtime checks pending. Baseline failures must be resolved or explicitly accepted before continuing; a source inspection is insufficient.

**Exit:** working runtime baseline and documented existing behavior, with current regressions separated from redesign work.

## Task 2: Isolated semantic portfolio and public interfaces

**Create:** `app/lab/page.tsx`; `app/immersive/{PortfolioExperience.tsx,portfolio.module.css,tokens.module.css,types.ts,content.ts}`; `app/immersive/sections/{Hero,About,Experience,Projects,Skills,Contact}.tsx`; `app/immersive/components/{Navigation,StaticSystem}.tsx`. Create `public/images/portrait.jpg` from the existing portrait or an approved replacement; retain original production usage.

**Interfaces:** define these models in `types.ts`; only confirmed entries enter `content.ts`.

```ts
export type SceneId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';
export type RenderProfile = 'full' | 'lite' | 'static';
export type ContactIntent = 'role' | 'client';
export interface ExperienceItem {
  id: string; kind: 'employment' | 'education'; role: string;
  organization: string; period: string; responsibilities: string[];
  technologies: string[];
}
export interface ProjectCaseStudy {
  id: string; name: string; visibility: 'public' | 'private';
  users: string; problem: string; responsibilities: string[];
  architecture: string; technologies: string[];
  outcomes: { text: string; evidence: string }[];
  links?: { label: string; url: string }[];
  media?: { src: string; alt: string; width: number; height: number }[];
}
export interface SkillGroup {
  id: string; name: string; capabilities: string[];
  evidence: { kind: 'experience' | 'project'; id: string }[];
}
export interface PortfolioContent {
  identity: { name: string; headline: string; introduction: string; biography: string };
  portrait: { src: string; alt: string; width: number; height: number };
  experience: ExperienceItem[]; projects: ProjectCaseStudy[]; skills: SkillGroup[];
  contact: { email?: string; whatsappInternational?: string; linkedinUrl?: string };
}
```

- [ ] Implement `PortfolioExperience({ content }: { content: PortfolioContent })` with server-rendered sections and static visuals; isolate menu and composer interactivity. Keep missing AI submissions in docs, never dummy data.
- [ ] Export `/lab` metadata with `robots: { index: false, follow: false }`. Set accurate lab title/description; do not add it to navigation or sitemap. Do not change root metadata yet.
- [ ] Apply scoped tokens/fonts, semantic landmarks and one H1. Implement real anchors, skip link, header offsets, accessible mobile menu, visible focus and reduced-motion styles. Move the target portrait into About with reserved dimensions and optimized delivery.
- [ ] Migrate confirmed source content and replace skill percentages with evidence groups. Preserve source material for user reconciliation when facts cannot yet be confirmed. Do not fabricate missing project fields to satisfy a type.
- [ ] Verify the rendered HTML without JavaScript contains all six sections, real anchors, portrait and configured contact details. Check 320px and 200% zoom; navigate every anchor and refresh at `/lab#projects` after delayed media/font loading. Verify menu Escape, focus return and resize reset.
- [ ] Run lint, TypeScript and build. Compare `/` against Task 1 references and confirm it imports no immersive code. Obtain semantic experience review before WebGL work.

**Exit:** readable, navigable static `/lab`; production source unchanged and missing content explicitly recorded.

## Task 3: Contact composer and focused automated tests

**Create:** `app/immersive/contact/{contact.ts,ContactComposer.tsx,contact.test.ts}`. Modify `sections/Contact.tsx`; add a minimal compatible test runner/script in `package.json` and only the selected lockfile if no existing runner is available at execution time.

**Interfaces:** `ContactInput = { name: string; email: string; intent: ContactIntent; message: string }`; `validateContact(input: ContactInput): Partial<Record<keyof ContactInput, string>>`; `buildIntroduction(input: ContactInput): string`; `buildEmailUrl(email: string, input: ContactInput): string`; `buildWhatsAppUrl(international: string, introduction: string): string | null`. Only invoke URL builders with validated input and confirmed destination configuration.

- [ ] Write failing tests for blank/whitespace-only fields, malformed email, single-line CR/LF injection, invalid intent at runtime, and each limit boundary (100/254/3000). Include a Unicode name and multiline message containing `&?#%`; verify decoding each query value reproduces the original introduction exactly.
- [ ] Implement the blueprint's reusable introduction and encoded channel builders. Assert invalid/missing WhatsApp configuration produces no action and no fake destination. Never infer a country code.
- [ ] Implement associated labels, required fields, error descriptions, first-error focus, polite status and a selectable preview. Preserve entered values when changing intent or when a channel fails. Keep copy and opening LinkedIn as separate user actions; use the confirmed HTTPS profile.
- [ ] Test rejected clipboard promises and absent clipboard API; ensure the preview remains selectable and the profile link works. Test all channels missing and only one configured. Assert no UI says a message was sent after opening a draft.
- [ ] Run the focused tests, lint, TypeScript and build. Browser-check keyboard completion and inspect generated link destinations without sending messages. With JavaScript disabled, verify configured ordinary contact links/details remain available.

**Exit:** working role/client composer with honest handoff feedback and tested failure paths. WhatsApp remains absent until a number is supplied and explicitly approved for public use.

## Task 4: Scene director and Living System

**Create:** `app/immersive/scene/{SceneBoundary.tsx,LivingSystemCanvas.tsx,SceneDirector.tsx,Organism.tsx,sceneProgress.ts,sceneProgress.test.ts}`. Modify `PortfolioExperience.tsx`, scoped styles and the chosen dependency manifest/lockfile.

**Interfaces:** `SceneState = { id: SceneId; progress: number }`; `clampProgress(value: number): number` returns 0 for nonfinite input and otherwise clamps to `[0,1]`; `LivingSystemCanvas({ profile }: { profile: Exclude<RenderProfile, 'static'> })`. `SceneDirector` alone measures sections and owns camera, lighting and organism transitions.

- [ ] Check current primary package documentation and peer dependencies against React 18/Next 13; select compatible versions of `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`. Record the selection; do not install latest blindly or add another animation library.
- [ ] Write failing progress tests for negative, zero, fractional, above-one, NaN and infinite input. Define deterministic section-boundary handling; test forward/backward jumps and zero-height measurements.
- [ ] Build one dynamically imported canvas at the client boundary with static markup beneath it. Implement reusable procedural geometry; no models or post-processing dependencies. Ensure overlays cannot intercept interaction.
- [ ] Map native section progress to the six blueprint states through a single director. Refresh measurements on layout/viewport change. On direct anchors, initialize from actual scroll position. Dispose subscriptions, GSAP contexts and GPU resources during unmount.
- [ ] Browser-test fast scroll in both directions, all anchors, reload at anchors and resize; compare DOM readability with canvas enabled/disabled. Check no accumulated listeners/canvases after repeated navigation. Review each scene against its communication purpose.
- [ ] Run focused tests, lint, TypeScript and build; inspect the production route's bundle for accidental 3D imports.

**Exit:** one coherent organism enhances the approved semantic journey without controlling scroll or content availability.

## Task 5: Adaptive rendering and resilience

**Create:** `app/immersive/scene/{renderProfile.ts,renderProfile.test.ts}`; modify `SceneBoundary.tsx`, `LivingSystemCanvas.tsx`, `StaticSystem.tsx` and scoped styles.

**Interface:** `chooseRenderProfile({ reducedMotion, webglAvailable, constrained }: { reducedMotion: boolean; webglAvailable: boolean; constrained: boolean }): RenderProfile`. Missing capability evidence sets `constrained: true`; server rendering uses static. Runtime performance downgrade is owned by the scene boundary, not this pure helper.

- [ ] Write tests proving reduced motion and unavailable WebGL always return static, constrained capability returns lite, and verified capability permits full.
- [ ] Apply blueprint DPR caps and simplified geometry/camera movement for lite. Profile representative devices; record the measured basis for any budget adjustment. Downgrade on sustained poor rendering; avoid upgrade/downgrade loops.
- [ ] Handle initialization failure, rejected dynamic import, runtime canvas errors and context loss by retaining static visuals and DOM state. Pause hidden-tab rendering and respond live to motion preference changes.
- [ ] Force each profile in verification without shipping a public debugging control. Test failed WebGL, context loss, JavaScript disabled and reduced motion toggled while the contact form has text and focus. Assert both survive unchanged.
- [ ] Run tests, lint, TypeScript, build and browser checks at mobile and desktop widths.

**Exit:** all three profiles retain the complete journey; visual enhancement failure never blocks content or contact.

## Task 6: Verified content integration and metadata preparation

**Files:** modify `content.ts` and `docs/CONTENT-SEO.md`; create `docs/IMMERSIVE-AI-CONTENT-REVIEW.md`. Add only approved media under `public/`.

- [ ] Collect the blueprint's AI project/role inputs and record claim-by-claim confirmation, visibility and evidence. Confirm existing percentages, current employment and absolute performance claims. Keep private or incomplete material out of public data.
- [ ] Confirm email, LinkedIn, optional public WhatsApp number, domain, portrait and social-preview rights. Validate media paths and approved destinations without fabricating missing links.
- [ ] Populate complete typed entries; check skill evidence IDs resolve and each project explains problem, responsibility and architecture. Use measured outcomes only where confirmed; qualitative confirmed outcomes are valid.
- [ ] Prepare accurate hybrid metadata and preview content for cutover; do not change `/` metadata during the lab phase. Keep lab robots metadata local. Add structured data only when its fields can be substantiated.
- [ ] Review rendered copy and run tests, lint, TypeScript and build. If evidence remains missing, record the release blocker instead of declaring the hybrid positioning ready.

**Exit:** approved public content and metadata ready for release; pending inputs remain explicitly outside production data.

## Task 7: Release verification and independent cutover approval

**Files:** update `docs/RELEASE-CHECKLIST.md`; create `docs/IMMERSIVE-AI-VERIFICATION.md`. Only after final approval, modify `app/page.tsx` and relevant production metadata in `app/layout.tsx`; keep `/lab` metadata independent.

- [ ] Run lint, TypeScript, focused tests and production build. Record command results and unresolved warnings; no check is inferred from another.
- [ ] Check 320, 375, 768, 1024, 1440 and 2560px; current Chrome/Edge/Firefox/Safari where available; keyboard, screen reader, 200% zoom, menu state, focus, anchors/refresh, contact failures and all render profiles. Record unavailable environments as gaps.
- [ ] Capture hero, every scene, mobile and reduced-motion visuals. Obtain user screenshots when direct inspection is unavailable, and user scene-by-scene visual review before cutover.
- [ ] Measure Lighthouse and Web Vitals under recorded conditions against the blueprint targets. Report the lab's deliberate noindex SEO exception separately. Check actual production indexability on the cutover candidate; do not claim field INP from a Lighthouse run.
- [ ] Verify no unexpected network calls, no personal-input logging, no decorative canvas accessibility noise, no critical accessibility violations, correct media and confirmed outbound destinations.
- [ ] Present evidence and remaining limitations for final cutover approval. Record the previous deployed commit and an actionable redeploy/revert procedure before changing the homepage.
- [ ] After approval, connect `/` to the shared target composition, update production metadata and canonical only with a confirmed domain, and keep all anchors. Retain `/lab` unlinked, noindex/nofollow and excluded from sitemap. Resolve production-only metadata and global-style concerns without removing the lab isolation contract.
- [ ] Re-run build/tests and the root-route interaction, visual and SEO checks. Obtain final visual review; deployment itself requires explicit authorization. If production checks fail, restore the recorded prior deployment and verify its homepage/contact journey.

**Exit:** approved cutover with reproducible evidence and rollback path. No deployment or successful delivery is assumed.
