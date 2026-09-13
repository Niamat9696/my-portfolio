# AGENTS.md

## Project

This repository contains the personal portfolio of Niamat Ullah,
a Senior Full-Stack Developer.

## Source of Truth

Before making architectural, UI, or implementation decisions, read:

- `docs/PORTFOLIO_SPEC.md`

The specification defines the required:
- design system
- typography
- colors
- sections
- animations
- responsive behavior
- accessibility
- performance
- SEO
- project architecture

Follow it unless explicitly instructed otherwise.

## Development Principles

- Use Next.js + TypeScript + Tailwind CSS.
- Prefer Server Components.
- Use Client Components only when necessary.
- Keep components reusable and maintainable.
- Keep portfolio content separate from UI components.
- Use strict TypeScript.
- Avoid `any`.
- Do not introduce unnecessary dependencies.
- Do not invent professional information.
- Do not invent project URLs, metrics, testimonials, or experience.
- Maintain responsive behavior from 320px through large desktop screens.
- Respect `prefers-reduced-motion`.
- Optimize Core Web Vitals.

## Quality Requirements

Before considering work complete:

1. Run the production build.
2. Run linting.
3. Fix TypeScript errors.
4. Fix hydration errors.
5. Check browser console errors.
6. Check responsive layouts.
7. Check accessibility.
8. Verify internal and external links.
9. Verify project routes.
10. Verify CV download.

Do not consider a feature complete merely because it visually renders.

## Implementation Approach

For substantial features:

1. Understand the relevant specification.
2. Inspect the existing architecture.
3. Plan the implementation.
4. Implement it.
5. Test it.
6. Review the result against `PORTFOLIO_SPEC.md`.
7. Fix discrepancies before finishing.

Do not unnecessarily rewrite working parts of the application.