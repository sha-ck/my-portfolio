# UI/UX Specification

## Living System visual contract (pending documentation approval)

Sections below preserve the legacy design reference for current `/`. For the target `/lab`, the blueprint supersedes the legacy fonts, palette, hero portrait and percentage indicators.

Use Void `#05070C`, Surface `#0D1424`, Text `#EEF4F2`, Signal Mint `#5EF2A6`, Ion Blue `#58C7FF`, Spectral Violet `#8875FF`; Unbounded display, Manrope body and IBM Plex Mono for genuine metadata. One organism connects all scenes; major transitions carry cinematic motion while interface motion stays restrained. Portrait moves to About. Content is readable without hover or animation, and remains above decorative geometry.

Use scoped CSS modules and tokens. Retain semantic anchors, visible keyboard focus, labeled form controls, mobile-menu state and 200% zoom support. Review full/lite/static at 320, 375, 768, 1024, 1440 and 2560px. No-JavaScript and reduced-motion layouts are composed static experiences, not empty canvases.

Contract: [Blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md) and [Implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md). These proposed target requirements take precedence over conflicting legacy guidance only after explicit approval.

---

## 1. Design Direction

The interface should feel like a technical performance lab: focused, precise, and confident. Use a dark navy base with neon green for primary action and cyan for secondary technical emphasis. Keep the content brighter than the decoration.

## 2. Typography

- Display and navigation: Space Grotesk.
- Technical labels and tags: Fira Code.
- Body copy: a readable sans-serif with generous line height.
- Use sentence case for readable content; reserve uppercase for short labels.
- Use a clear type scale with responsive limits rather than uncontrolled viewport scaling.

## 3. Color Tokens

| Token | Purpose |
| --- | --- |
| `--bg-primary` | Main deep navy background. |
| `--bg-surface` | Translucent dark surface for navigation and cards. |
| `--text-primary` | Main high-contrast text. |
| `--text-muted` | Supporting copy and metadata. |
| `--accent-green` | Primary actions, availability, and success. |
| `--accent-cyan` | Links, technical highlights, and secondary actions. |
| `--border-subtle` | Low-contrast separation between surfaces. |

Do not use color as the only signal for state. Pair it with text, icons, or structure.

## 4. Layout

- Use a centered content container with a maximum width near 1280px.
- Use generous vertical section spacing on desktop and reduced spacing on mobile.
- Keep line length near 65-80 characters for long-form copy.
- Use cards for repeated project and experience items, not as containers for entire page sections.
- Keep the primary call to action visible in the hero and repeated in Contact.

## 5. Component Behavior

- Header: fixed, compact, and visually distinct from the page background after scrolling.
- Hero: immediate value proposition, proof-oriented supporting copy, and one primary action.
- Project cards: scannable title, category, result/problem statement, summary, and tags.
- Skill indicators: use restrained motion and visible labels.
- Contact form: field labels remain visible; errors appear inline; success feedback is announced.

## 6. Responsive Rules

- At mobile widths, collapse navigation into a menu button with a large touch target.
- Stack two-column sections vertically while preserving meaningful reading order.
- Avoid horizontal overflow from tags, code-like labels, or long email addresses.
- Keep buttons and fields at least 44px tall where practical.
- Test at 320px, 375px, 768px, 1024px, and 1440px widths.

## 7. Accessibility

- Maintain WCAG AA contrast for text and controls.
- Provide visible `:focus-visible` styles.
- Use semantic `header`, `nav`, `main`, `section`, and `footer` elements.
- Label every form control and connect errors with `aria-describedby`.
- Announce form status with a polite live region.
- Disable or reduce non-essential animation under `prefers-reduced-motion: reduce`.

## 8. Content Tone

Use direct, technically specific language. Lead with outcomes, name the technology only when it supports the story, and avoid inflated claims. Every project should answer: what was difficult, what was built, and what improved?
