# Portfolio Documentation

This folder contains the product and implementation requirements for Shanid Cherukattil's developer portfolio.

## Redesign status and approval

Documentation approved on 2026-09-21. Implementation is underway on the isolated `/lab` experience. Semantic review and final homepage cutover approval remain required.

| Surface | Current state | Contract |
| --- | --- | --- |
| `/` | Existing frontend portfolio | Preserve during development |
| Living System target | Proposed specification awaiting approval | Equal frontend leadership and AI engineering, subject to verified evidence |
| `/lab` | Planned; not implemented | Unlinked, noindex/nofollow experiment, retained after launch |

Read the [canonical blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md), then the [ordered implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md). Approve both before implementation starts. Each existing document now separates the target addendum from legacy guidance. Baseline rebuild and visual verification begin after this gate; neither has been claimed complete.

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
- Primary route: `/`
- Current contact mechanism: `mailto:` link opened from the contact form
- Current stack: Next.js 13, React 18, TypeScript, Tailwind CSS, global CSS and inline styles (CSS modules planned for the redesign)
- Source of truth: implementation in `app/page.tsx` and `app/globals.css`
