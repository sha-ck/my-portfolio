# Portfolio design context

Canonical direction: [Living System blueprint](docs/IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md), approved 2026-09-21.

Scope: English portfolio/brand site, not an application dashboard. The production route remains intact; the new experience lives on unlinked, non-indexed `/lab`.

Runtime tokens: `app/immersive/tokens.module.css`; scoped layout and component styling: `app/immersive/portfolio.module.css`. Fonts load locally through next/font in `app/lab/page.tsx`: Unbounded display, Manrope body, IBM Plex Mono metadata.

Signature: one computational organism, initially composed as SVG, later enhanced through one WebGL canvas after semantic visual review. Keep meaningful DOM content above it. Palette and motion rules come from the blueprint; no extra design system or component library.

Content: retain existing frontend work for review. Do not introduce AI claims, metrics, private/public project classifications or contact destinations without confirmation. Missing project visibility is omitted rather than inferred.

Interaction: native anchors, accessible mobile navigation, native project disclosures and a local contact composer. Preparing or copying an introduction never means a message was sent. The composer is disabled before hydration to prevent native form submission; static channel links remain available.

Refinement (2026-09-21): retain the established palette and typefaces. Motion tokens live in `tokens.module.css` (200ms interactions, 520ms entrances, 65ms stagger, 600ms scene opacity). `SceneDirector` owns section progression, grouped entrances and active navigation. Content stays visible without animation support; reduced motion retains static art. The canvas layout stays fixed while the organism morphs. Native project disclosures remain the detail interaction, with approved media supplied only through the existing project media field. Small metadata uses the 11px label token.
