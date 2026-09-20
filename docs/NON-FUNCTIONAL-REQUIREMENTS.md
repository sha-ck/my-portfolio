# Non-Functional Requirements

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
