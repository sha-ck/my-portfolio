# Technical Architecture

## 1. Stack

- Next.js 13 App Router.
- React 18 with TypeScript.
- Global CSS plus existing Tailwind configuration.
- `next/font` for optimized font loading.
- Static deployment target such as Vercel.

## 2. Application Shape

The portfolio is a single route rendered from `app/page.tsx`. Content is currently defined as local arrays in the page component. Styling is primarily in `app/globals.css`.

Recommended next step: move repeated content into typed data modules and split large visual areas into focused components without changing the public page structure.

## 3. Suggested Boundaries

- `app/page.tsx`: page composition and section order.
- `app/components/`: Header, Hero, Experience, ProjectCard, Skills, ContactForm, and Footer.
- `app/content/portfolio.ts`: typed experience, projects, skills, and contact options.
- `app/lib/validation.ts`: shared client/server form validation.
- `app/api/contact/route.ts`: optional server-backed contact endpoint.
- `public/`: optimized static images, favicon, and downloadable resume.

## 4. Contact Architecture

V1 may retain the `mailto:` fallback for zero-infrastructure deployment. Production-quality lead capture should use a server route or trusted form provider with:

- Server-side validation.
- Rate limiting and spam protection.
- No exposure of private credentials in client code.
- Structured success and error responses.
- A privacy-conscious retention policy.

## 5. State and Interaction

Keep state local to the component that owns the interaction. Current state includes scroll header state, mobile menu state, contact form values, submission state, and skills visibility. Avoid adding a global state library unless future features introduce shared state across routes.

## 6. Rendering and Performance

- Keep the page statically renderable where possible.
- Isolate client-only behavior to interactive components.
- Avoid shipping large animation or chart libraries for decorative effects.
- Optimize images and provide explicit dimensions.
- Use lazy loading for below-the-fold media.
- Confirm that third-party fonts and scripts do not block rendering.

## 7. Deployment

- Run type checking, linting, and production build in CI.
- Deploy from the main branch after checks pass.
- Keep environment variables out of source control.
- Verify canonical URL, robots behavior, sitemap, and contact delivery after deployment.

## 8. Observability

Track only useful, consent-aware events: primary CTA clicks, project link clicks, contact form starts, validation failures, and successful submissions. Do not log message contents or personal data.
