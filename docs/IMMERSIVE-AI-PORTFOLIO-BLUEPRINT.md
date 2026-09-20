# Immersive AI Portfolio Blueprint

Status: documentation approved by the user on 2026-09-21; implementation authorized. Semantic visual review and final cutover approval remain separate gates.

## Purpose and scope

Present Shanid Cherukattil as an equal hybrid of frontend leadership and AI product engineering, supported by verified work. Give employment opportunities and client inquiries equal importance. The signature is one evolving computational organism: a Living System that connects the journey rather than six unrelated visual effects.

Phase 0 changes documentation only. The existing `/` stays unchanged throughout development. Build the target on an unlinked `/lab` route with `noindex, nofollow`; retain that route for experiments after launch. Approval of this blueprint and the [implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md) is required before dependencies or product code change. Final homepage cutover requires a separate release approval.

## Current baseline and evidence

Source inspection on 2026-09-21, repository HEAD `440430f`:

- `app/page.tsx` is a client component containing content arrays, interactions, inline styles, an embedded JPEG portrait, and all six sections.
- Existing IDs and order: `home`, `about`, `experience`, `projects`, `skills`, `contact`.
- Navigation buttons call smooth `scrollIntoView` and close the mobile menu. The header changes after 50px of scrolling. CSS switches navigation and major grids at 900px.
- Skills use percentages and an IntersectionObserver. The hero includes animated decoration and the portrait.
- Contact opens an encoded email subject/body, then displays “Transmission Sent!” without delivery confirmation. It omits the entered sender email from the message body; required-field validation and explicit label associations need work.
- The stack declares Next.js 13.5.1, React 18.2.0 and TypeScript 5.2.2. No WebGL, GSAP, or test runner is declared. Both npm and pnpm lockfiles exist; select the maintained package manager before installing anything.
- Root metadata contains the description `Engineering theSpeed of the Web.` and references `/favicon.svg`; the inspected file inventory contains `app/favicon.ico`, so favicon resolution needs checking.

This is source evidence, not a runtime audit or confirmation of professional claims. The reported stale `.next` output has not been diagnosed in Phase 0. Rebuild, browser checks, screenshots, dependency compatibility and claim verification remain future tasks.

## Creative contract

| Token | Value | Use |
| --- | --- | --- |
| Void | `#05070C` | Overall backdrop |
| Surface | `#0D1424` | Readable content surfaces |
| Text | `#EEF4F2` | Primary copy |
| Signal Mint | `#5EF2A6` | Main actions and organism signals |
| Ion Blue | `#58C7FF` | Secondary connections |
| Spectral Violet | `#8875FF` | Spatial depth and selective emphasis |

Use Unbounded for restrained display statements, Manrope for body copy, and IBM Plex Mono for real technical metadata. Scope tokens and fonts to the new experience. Do not fabricate terminal output, telemetry, model names, or metrics as decoration. Test contrast on the actual surfaces; palette membership does not guarantee contrast.

Keep text as the dominant reading layer. Desktop compositions place the organism beside or behind generous negative space; mobile compositions put copy first and simplify the organism. Use opaque or sufficiently dark surfaces where geometry would reduce readability. Portrait appears in About, with reserved dimensions and a meaningful alternative description. Long copy remains comfortably readable, with a maximum line length around 70 characters.

## Scene and motion contract

| Scene | Communication and composition | Organism transformation | Static equivalent |
| --- | --- | --- | --- |
| Home | Identity, balanced positioning, work and contact actions; no portrait | A compact structure awakens through controlled illumination | Lit core and sparse connecting paths |
| About | Person and engineering approach; portrait beside biography | Two connected structural branches represent frontend and AI disciplines | Two linked branches beside readable biography |
| Experience | Reverse chronological work, education distinguished from employment | A continuous structural spine connects career milestones | Spine and milestone markers |
| Projects | Problem, responsibility, architecture and outcome for each case study | Connected spatial chambers emphasize the current project without hiding others | A chamber motif alongside each DOM case study |
| Skills | Capability groups backed by project or role evidence | Connections form a capability ecosystem | A simplified network with DOM labels |
| Contact | Equal role/client intent choices and clear channel actions | Camera pulls back to reveal the complete connected structure | Complete network behind the composer |

One continuous procedural organism persists across scenes. Camera choreography is concentrated at major transitions; UI motion remains restrained. Native document scroll owns navigation. No scroll hijacking, forced scene completion, mandatory pinning, or artificial multi-screen gaps. Direct anchor jumps resolve immediately to the correct state without playing intervening scenes. The director recalculates section measurements after resize and layout changes. Progress is finite and clamped to `[0, 1]`.

Use one fixed, decorative canvas behind semantic content, with `pointer-events: none` and no essential text or controls. Load it dynamically from a client boundary. DOM sections and a CSS/SVG fallback render before and independently of WebGL. No content starts hidden waiting for JavaScript or animation.

## Rendering and fallback contract

- `full`: capable desktop candidate, complete geometry and camera choreography; initial DPR cap 1.5.
- `lite`: mobile or constrained-device default, fewer geometry elements and connections, shorter camera movement, DPR cap 1.0. Initial narrow-screen threshold: 768px. These are implementation starting limits to validate, not measured performance claims.
- `static`: reduced motion, failed WebGL initialization, context loss, or unavailable JavaScript. Render composed CSS/SVG visuals with the complete content and contact details.

Start with the static composition. Enhance only after capability checks. Width alone cannot prove hardware capability; unknown capability uses lite, and sustained rendering problems downgrade rather than repeatedly oscillating profiles. Pause rendering in hidden tabs; clean up observers, GSAP contexts, frame callbacks and GPU resources on unmount. A runtime change to reduced motion immediately selects static and stops nonessential motion. No-JavaScript navigation uses real anchors; contact offers ordinary configured links and visible copyable details, with a clear explanation that the composer requires JavaScript.

## Semantic and interaction contract

Use `header`, labeled `nav`, `main`, sections with the preserved IDs, and `footer`. One H1; H2s for the remaining sections. Use real anchor links, a skip link, header-aware scroll margins, visible focus and meaningful link labels. Mobile navigation exposes its name, controlled region and expanded state; Escape closes it and returns focus to the trigger. Closed links are not focusable. At wider breakpoints reset stale open-menu state.

Keep all project content available without hover. Replace numerical skill ratings with capability groups and evidence references. Missing evidence does not become an invented capability. Preserve verified existing content; do not silently reinterpret existing frontend roles as AI roles.

## Contact composer

`ContactIntent` is `role` or `client`. Collect name, email, intent and message, all required. Proposed limits are name 100 characters, email 254, message 3000. Trim outer whitespace, reject empty values and invalid email format, preserve Unicode and multiline messages, and reject newlines in single-line fields. Associate errors with controls, focus the first invalid field, and announce actionable status. Preserve input across validation and channel failures.

Produce one plain-text introduction for all channels:

```text
Hello Shanid,

My name is {name}. I am contacting you about {a role opportunity | a client project}.
Reply email: {email}

{message}
```

- Email: encode the entire subject and introduction separately into a `mailto:` draft. A draft is not a sent message. Keep a visible introduction preview and copy fallback for unavailable email clients or long links.
- WhatsApp: only show the action after explicit approval of the personal number in international format. Generate a digits-only international destination and encode the same introduction. Explain that this configured number is publicly discoverable. No invented or dummy number.
- LinkedIn: use a confirmed HTTPS profile URL. Offer copying the introduction and opening the profile as separate explicit actions so clipboard delays or denial cannot prevent navigation. On copy failure, retain a selectable introduction for manual copying. Do not promise automatic message prefill or delivery.
- Missing channel configuration: omit the unavailable action and preserve usable configured channels. If no channel is configured, show an honest unavailable state; never a fake success.

No contact backend, chatbot, message storage, analytics or third-party submission service is added by this scope. Do not log personal input. External links opened in new tabs use safe relationship attributes.

## Required content inputs

Keep pending material in documentation, outside production content modules. For each AI project collect: name, public/private visibility, intended users, problem, personal responsibilities, architecture and data flow, technologies/providers actually used, outcomes and evidence, publishable URLs and media rights. Private projects may use an approved anonymized account; omit confidential details.

For AI experience collect the exact role, organization, dates and responsibilities that genuinely occurred. Equal positioning is the target, not permission to assert unverified experience. Final hybrid copy cannot ship without supporting evidence.

Existing source entries to reconcile: Spericorn Technology, Inmakes Technology, Nasra Arts and Science College; SEO Analytics Platform, Fintech Money Lending, Call Tracking Attribution, Admin Management Platform. Source presence is not independent validation. Reconfirm current employment, percentages and absolute claims such as “zero-latency” before publishing new content.

Also required: confirmation of email and LinkedIn ownership/destination, optional approved WhatsApp number, production domain, approved social preview, and portrait reuse. Existing source contact values are candidates, not newly confirmed inputs.

## Architecture boundaries

Keep `/lab` page metadata server-owned and route-specific. Put reusable target components in `app/immersive/` so final `/` composition can reuse them without importing the `/lab` route or inheriting its robots metadata. CSS modules and locally scoped tokens must tolerate existing global element styles without modifying the production stylesheet during experimentation.

Separate typed content, semantic sections, contact helpers, one scene director, render-profile policy, and focused procedural 3D components. Use local state and explicit props; no global state library. Initial additions are limited to `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, compatible type support if needed, and justified focused test tooling. Resolve compatible versions against the installed React/Next baseline before installation. No custom GLB assets, post-processing package, additional animation library or unplanned framework upgrade.

## Acceptance and launch gates

1. Approve the documentation contract explicitly before implementation.
2. Restore and record the current runtime baseline before introducing the new route.
3. Review the complete semantic `/lab` experience before adding WebGL.
4. Review every scene, mobile, reduced-motion and failure modes; verify content before release.
5. Pass lint, TypeScript, focused tests and production build after each major implementation phase.
6. Test 320, 375, 768, 1024, 1440 and 2560px; keyboard, screen reader smoke test, 200% zoom, anchors and refresh; current Chrome, Edge, Firefox and Safari where available. Record unavailable coverage honestly.
7. Retain Lighthouse Performance, Accessibility and SEO targets of 90+, LCP <= 2.5s, INP <= 200ms, CLS <= 0.1, and zero critical accessibility violations. Record device, conditions and route with measurements. `/lab` intentionally fails indexability checks: report that exception separately and verify production SEO on the cutover candidate. Lab timing is not field INP evidence.
8. When direct browser inspection is unavailable, require user screenshots of the hero, each major scene, mobile, reduced motion and cutover. Screenshots supplement, not replace, interaction verification.
9. Obtain final approval before replacing `/`. Keep `/lab` unlinked, out of the sitemap and `noindex, nofollow`; preserve all anchors. Record the actual previous deployed commit and rollback procedure before deployment.
