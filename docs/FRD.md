# Functional Requirements Document

## Living System target behavior (pending documentation approval)

The numbered requirements below describe the legacy portfolio requirements, not proof that `/` currently meets them. The target is developed only at `/lab` until final cutover approval.

- Preserve `home`, `about`, `experience`, `projects`, `skills`, `contact` and direct anchor/refresh behavior using real links and native scrolling.
- Replace percentage skill indicators (FR-018) with capability groups and supporting evidence. Move the target portrait to About.
- Extend FR-020 to required name, email, role/client intent and message; generate one introduction shared by email, approved WhatsApp and confirmed LinkedIn copy/open actions.
- Clarify FR-024: successful preparation or copying is not successful delivery. Never claim a message was sent by opening a draft or profile.
- Missing channel configuration hides that action; clipboard failure retains a selectable introduction and usable profile link. Preserve input on every failure.
- All essential content and navigation work without WebGL; static content and ordinary contact links remain available without JavaScript. Reduced motion forces static rendering.
- One scene director drives one decorative canvas; full/lite/static never change content availability.

Contract: [Blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md) and [Implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md). These proposed target requirements take precedence over conflicting legacy guidance only after explicit approval.

---

## 1. Navigation

- FR-001: Show links for Home, About, Experience, Projects, Skills, and Contact.
- FR-002: Clicking a navigation item scrolls to the matching section.
- FR-003: Close the mobile menu after a link is selected.
- FR-004: Keep navigation usable when the header changes appearance after scrolling.
- FR-005: Expose the mobile menu state to assistive technology with an accessible button name and expanded state.

## 2. Hero

- FR-006: Display role, specialty, availability, and a primary contact call to action.
- FR-007: The primary call to action navigates to the Contact section.
- FR-008: Decorative effects must not block text selection, focus, or pointer interaction.

## 3. About and Experience

- FR-009: Present a short positioning statement and supporting biography.
- FR-010: Present experience entries in reverse chronological order.
- FR-011: Each experience entry supports role, organization, period, impact bullets, and technology tags where available.
- FR-012: Education may appear as an experience-style entry but must be visually distinguishable from employment.

## 4. Projects

- FR-013: Display each project with title, category, description, technology tags, and visual treatment.
- FR-014: Where available, show the engineering challenge and solution.
- FR-015: Project content must remain readable without relying on hover.
- FR-016: Add project links only when a real destination exists; never expose placeholder links.

## 5. Skills

- FR-017: Group skills into core technologies and performance/operations capabilities.
- FR-018: Skill progress indicators must have text equivalents and must not imply false precision.
- FR-019: Reveal-on-scroll effects must degrade to visible content when JavaScript or motion is unavailable.

## 6. Contact

- FR-020: The form must collect name, email, area of interest, and message.
- FR-021: Name, email, and message are required.
- FR-022: Validate email format and show an actionable error near the invalid field.
- FR-023: Prevent submission while required fields are invalid.
- FR-024: On success, show confirmation and preserve a clear next step.
- FR-025: On failure, show an error and retain entered values.
- FR-026: The V1 `mailto:` fallback must encode subject and message safely. A future server/provider integration must validate again on the server.

## 7. Responsive and Accessibility Behavior

- FR-027: Layout must support widths from 320px through large desktop screens.
- FR-028: All interactive elements must be keyboard reachable and visibly focused.
- FR-029: Images, icons, and decorative graphics must have appropriate alternative text or be marked decorative.
- FR-030: Respect `prefers-reduced-motion`.
- FR-031: Use semantic headings in a logical hierarchy.

## 8. Acceptance Checklist

- [ ] Every navigation link reaches the expected section.
- [ ] Mobile menu opens, closes, and is keyboard usable.
- [ ] Contact validation catches empty and malformed values.
- [ ] Contact success and failure states are understandable.
- [ ] No content depends on hover or animation.
- [ ] Keyboard-only pass completed on desktop and mobile emulation.
