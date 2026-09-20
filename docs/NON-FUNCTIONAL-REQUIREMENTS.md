# Non-Functional Requirements

## Living System quality contract (documentation approved 2026-09-21)

The existing numerical targets below remain targets, not measured results. Current `/` is preserved while `/lab` is evaluated in full, lite and static profiles. Reduced motion, no JavaScript, failed WebGL and context loss must retain readable content and usable contact/navigation.

Require Lighthouse Performance, Accessibility and SEO 90+, LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 and no critical accessibility violations. Record device, route, browser and measurement conditions. Deliberate `/lab` noindex must be reported separately from production SEO readiness. Lab interaction timing does not establish field INP compliance.

Test 320 through 2560px, 200% zoom and the browser matrix below; record unavailable coverage instead of claiming it passed. Pause hidden-tab rendering, dispose scene resources and avoid leaking new rendering dependencies into the unchanged production route.

Clarification of NFR-010: user-approved public contact destinations are intentionally public, including an explicitly approved WhatsApp personal number. Never expose private credentials, unapproved personal details or visitor submissions. No logging or persistence of composer input is introduced.

Contract: [Blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md) and [Implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md). These proposed target requirements take precedence over conflicting legacy guidance only after explicit approval.

---

## Performance

- NFR-001: Target Lighthouse Performance of 90+ on a representative mobile run.
- NFR-002: Target LCP <= 2.5 seconds, INP <= 200ms, and CLS <= 0.1 under normal conditions.
- NFR-003: Avoid layout shift by reserving space for images, fonts, and dynamic content.
- NFR-004: Keep JavaScript and CSS focused on the portfolio experience; remove unused dependencies.

## Accessibility

- NFR-005: Meet WCAG 2.2 AA expectations for keyboard operation, focus, contrast, labels, and status messages.
- NFR-006: Support screen readers and browser zoom to 200% without loss of function.
- NFR-007: Support reduced motion and do not convey meaning through animation alone.

## Compatibility

- NFR-008: Support the latest two versions of Chrome, Edge, Firefox, and Safari.
- NFR-009: Support viewport widths from 320px to 2560px without horizontal scrolling caused by the application.

## Security and Privacy

- NFR-010: Do not place secrets, private API keys, or personal data in client-side source.
- NFR-011: Validate and sanitize all server-backed contact input.
- NFR-012: Add spam controls before enabling automated contact submission.
- NFR-013: Document analytics consent and data retention if tracking is introduced.

## Reliability and Maintainability

- NFR-014: Production builds must pass TypeScript and lint checks.
- NFR-015: Interactive components should have focused tests for validation, navigation, and submission states.
- NFR-016: Content updates should not require changes to layout logic.
- NFR-017: Keep public routes and meaningful anchors stable to preserve shared links.
