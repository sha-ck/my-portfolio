# Portfolio Documentation

This folder contains the product and implementation requirements for Shanid Cherukattil's developer portfolio.

## Redesign status and approval

Documentation approved on 2026-09-21. Production cutover completed — immersive portfolio is now the production homepage at `/`. Content evidence and deployment authorization remain pending.

| Surface | Current state | Contract |
| --- | --- | --- |
| `/` | Immersive Living System portfolio | Production homepage |
| `/lab` | Removed after cutover | — |
| Content evidence | AI projects, employment, contact ownership pending | Owner confirmation required |

Read the [canonical blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md), then the [ordered implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md). Both were approved on 2026-09-21. Each existing document now separates the target addendum from legacy guidance. Baseline rebuild and semantic browser verification are recorded in the evidence documents below.

## Documents

- [Immersive AI Portfolio Blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md) - canonical creative and behavioral contract.
- [Immersive AI Implementation Plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md) - ordered tasks, interfaces, checks and gates.
- [Release Checklist](./RELEASE-CHECKLIST.md) - lab verification, approval, cutover and rollback.
- [Product Requirements Document](./PRD.md) - product goals, audience, scope, and success metrics.
- [Functional Requirements Document](./FRD.md) - observable behavior and acceptance criteria.
- [UI/UX Specification](./UI-UX.md) - visual language, layout, responsive behavior, and accessibility.
- [Technical Architecture](./TECHNICAL-ARCHITECTURE.md) - code structure, data model, integrations, and deployment.
- [Non-Functional Requirements](./NON-FUNCTIONAL-REQUIREMENTS.md) - performance, security, reliability, and quality targets.
- [Content and SEO](./CONTENT-SEO.md) - page content rules, metadata, discoverability, and sharing.

## Current Product Snapshot

The product is a single-page Next.js portfolio for a lead frontend developer. It presents expertise in React, Next.js, TypeScript, performance engineering, real-time applications, and technical SEO. The primary conversion is a qualified contact inquiry.

## Status

- Product type: personal portfolio and lead-generation site
- Primary route: `/` (immersive Living System portfolio)
- Current contact mechanism: `mailto:` link opened from the contact form
- Current stack: Next.js 13, React 18, TypeScript, CSS modules, Three.js/R3F, GSAP
- Source of truth: `app/page.tsx` renders `PortfolioExperience` with content from `app/immersive/content.ts`

## Implementation evidence

- [Baseline](./IMMERSIVE-AI-BASELINE.md)
- [Content confirmation queue](./IMMERSIVE-AI-CONTENT-REVIEW.md)
- [Verification record](./IMMERSIVE-AI-VERIFICATION.md)

Preview locally at `/`. Content evidence and deployment authorization remain pending.
