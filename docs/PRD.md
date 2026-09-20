# Product Requirements Document

## Living System target (pending documentation approval)

Current `/` remains the frontend-focused portfolio described below. The proposed target gives frontend leadership and AI product engineering equal weight, and treats role opportunities and client projects equally. Implement it first on the unlinked, non-indexed `/lab`; no current-homepage replacement is authorized yet.

The target journey retains all six sections, introduces one connected computational organism, replaces skill percentages with evidence groups, and adds a role/client contact composer. AI positioning is conditional on verified project and role evidence. Cinematic transitions are now in target scope; mandatory motion, a chatbot, backend contact delivery and speculative AI claims remain out of scope. A server/form-provider integration mentioned below is a future option, not part of this redesign.

Contract: [Blueprint](./IMMERSIVE-AI-PORTFOLIO-BLUEPRINT.md) and [Implementation plan](./IMMERSIVE-AI-IMPLEMENTATION-PLAN.md). These proposed target requirements take precedence over conflicting legacy guidance only after explicit approval.

---

## 1. Overview

Build a polished, fast, single-page portfolio that positions Shanid Cherukattil as a lead frontend engineer who improves web performance, scalability, and product usability.

## 2. Problem

Hiring managers, founders, and engineering teams need a fast way to understand the developer's strengths, evidence of impact, and how to start a conversation. A generic resume page does not show enough technical context or proof of outcomes.

## 3. Goals

- Communicate the developer's specialization within the first viewport.
- Turn experience and projects into credible, scannable proof.
- Make contact possible in one short interaction.
- Deliver a fast, accessible experience on mobile and desktop.
- Create a maintainable foundation for future case studies and writing.

## 4. Target Users

- Engineering managers evaluating frontend leadership.
- Founders looking for performance or product engineering help.
- Recruiters screening for React, Next.js, TypeScript, and frontend architecture.
- Developers looking for technical work samples.

## 5. Core User Journey

1. Visitor lands on the hero and understands role, specialty, and availability.
2. Visitor scans About and Experience for credibility.
3. Visitor inspects Projects for applied problem-solving.
4. Visitor checks Skills and performance expertise.
5. Visitor submits a contact inquiry.

## 6. In Scope

- Responsive single-page navigation.
- Hero, About, Experience, Projects, Skills, and Contact sections.
- Project cards with challenge, solution, and technology context.
- Contact form with name, email, interest, and message fields.
- Mobile navigation and reduced-motion support.
- SEO metadata, semantic HTML, keyboard access, and performance optimization.

## 7. Out of Scope for V1

- User accounts or authentication.
- CMS or admin dashboard.
- Blog publishing workflow.
- Database-backed contact management.
- Complex animations that compete with the content.

## 8. Success Metrics

- Lighthouse Performance, Accessibility, and SEO scores of 90+ on representative mobile runs.
- Largest Contentful Paint at or below 2.5 seconds on a good 4G connection.
- Contact form completion rate measured after analytics is installed.
- Zero critical accessibility violations in automated audits.
- At least one qualified inquiry attributable to the portfolio per target month.

## 9. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Claims feel generic | Attach measurable outcomes and specific project context. |
| Contact flow depends on local email software | Add a server or form provider integration in a later iteration. |
| Heavy visuals hurt performance | Prefer CSS and optimized assets; lazy-load non-critical media. |
| Mobile navigation becomes hard to use | Test at narrow widths and keep focus behavior explicit. |

## 10. Release Criteria

The site is ready when the primary journey works on current Chrome, Firefox, Safari, and Edge; keyboard navigation is usable; the contact flow gives clear success or failure feedback; metadata and social previews are valid; and production build checks pass.
