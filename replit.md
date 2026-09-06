# AmeriHost static website

A clean, static-site foundation for the AmeriHost rebuild, prepared for Cloudflare Pages and future Decap CMS-managed content.

## Run & Operate

- `pnpm --filter @workspace/web run dev` — run the static website preview
- `pnpm --filter @workspace/api-server run dev` — run the shared API server (not used by the static site foundation)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/web/index.html` — static home page entry point
- `artifacts/web/{website-design,hosting,business-email,domains-dns,security,about,contact}/index.html` — independent static page entry points
- `artifacts/web/src/site.ts` — minimal progressive-enhancement behavior
- `artifacts/web/src/styles/site.css` — shared static-site styles
- `artifacts/web/content/` — Decap CMS-ready content locations
- `artifacts/web/public/admin/` — Decap CMS shell and collection configuration
- `artifacts/web/public/_redirects` — verified legacy URL redirects
- `artifacts/web/public/robots.txt` and `sitemap.xml` — crawl directives and sitemap

## Architecture decisions

- The site uses Vite's static HTML entrypoint rather than client-side route switching.
- Shared site behavior is plain TypeScript and is limited to accessible mobile navigation and the copyright year.
- Content is kept separate from the presentation layer so Decap CMS collections can be added without redesigning templates.
- `_redirects` is intentionally a placeholder for verified legacy URLs; no redirects are invented.

## Product

This phase intentionally contains no unapproved AmeriHost marketing copy, factual claims, pricing, testimonials, service promises, or contact details. Eight approved routes exist with neutral placeholder content only.

## User preferences

- Do not treat existing WordPress content as approved migration content.
- Do not deploy or modify production DNS/hosting without explicit authorization.

## Gotchas

- Replace the Decap CMS GitHub repository placeholder before enabling CMS editing.
- Add only verified legacy URL mappings to `public/_redirects`.
- Production static output is `artifacts/web/dist/public`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
