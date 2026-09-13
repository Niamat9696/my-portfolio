# Content To Confirm

Tracks every placeholder in `src/content/*.json` that is `null`/empty because
the real value isn't confirmed yet (per `AGENTS.md` / `PORTFOLIO_SPEC.md`
section 58 — never invent professional information). Update the JSON file
directly; no code changes are needed since components will read through
`src/lib/content/*`.

## `social-links.json`
- All three `url` fields are `null` (GitHub, LinkedIn, Email). Hidden until filled in.

## `personal.json`
- `email`: `null` — needed for the Contact section and "Copy Email".
- `availableForOpportunities`: `null` — set to `true`/`false` to show the availability indicator, or leave `null` to keep it hidden.

## `experience.json`
Both roles have confirmed `company`/`position` (from the spec). Missing per role:
- `startDate` / `endDate` (or confirm `isCurrent: true` for the current role)
- `description`
- `achievements` (3–5 bullets, per spec section 16)
- `technologies`

## `projects.json`
All six projects have only a confirmed `title`/`slug`. For each, still needed:
- `category`, `role`, `shortDescription`, `description`
- `problem`, `solution`, `architecture`, `keyFeatures`, `challenges`, `results`
- `technologies`
- `image` / `images` — real screenshots. Until then, the project cards and case
  study pages fall back to an abstract placeholder (`ProjectImagePlaceholder`),
  so `image: null` renders gracefully rather than breaking the layout.
- `liveUrl` / `githubUrl` — only when a real, public URL exists (buttons are hidden otherwise)
- `status` — one of `"live" | "in-development" | "archived" | "concept"`, or leave `null` to hide the status badge
- Confirm the final featured list (spec allows swapping any of these six for better/newer projects)
- If a project screenshot is hosted on a remote domain (not `public/`), add that
  domain to `images.remotePatterns` in `next.config.ts` — it isn't configured yet.

## `achievements.json`
- `items` is empty. Add evidence-based bullets only (spec section 19 forbids exaggeration) — e.g. specific, real instances of mentoring, code review, architecture decisions, or performance work.

## `cv.json`
- `education` is empty — add real entries or leave empty to omit the section.
- `summary` is a generic paraphrase of the About copy; replace with real CV summary copy if desired.

## Site URL / SEO
- `src/constants/site.ts` uses a placeholder domain (`https://niamatullah.dev`)
  for canonical URLs, sitemap, robots.txt, and Open Graph metadata. Set the
  `NEXT_PUBLIC_SITE_URL` environment variable to the real production domain
  once it's registered/deployed.

## CV (`/cv`)
- The downloadable CV PDF is generated on request from `personal.json` +
  `experience.json` + `skills.json` + `cv.json` (see `src/lib/pdf/CVDocument.tsx`).
  Filling in those JSON files automatically updates the PDF — no separate file to maintain.
