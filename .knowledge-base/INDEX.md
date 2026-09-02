# Knowledge Base — shivam-vishwanaath portfolio
Generated: 2026-08-26 · Maintained by Cline sessions · UPDATE after any structural change.

## Purpose
Token-efficient map of this codebase. Agents/humans should answer questions and plan
changes from these docs FIRST, and only open source files when actually editing them.

## Doc Map (open only what you need)
| Doc | Open when you need… |
|-----|---------------------|
| 01-project-overview.md | stack, commands, env vars, deployment |
| 02-architecture-graph.md | how routes/components/modules connect, data flow |
| 03-file-map.md | to locate a file or learn its exports/responsibility |
| 04-data-models.md | editing clues, acts, FAQ, schemas, any lib content |
| 05-conventions.md | writing/editing components, styles, SEO patterns |

## Golden Rules
- Package manager: **pnpm** (`pnpm install`, `pnpm dev`). `bun.lock` is vestigial; bun NOT installed locally.
- Content lives in `lib/*.ts` data files — pages render data; avoid hardcoding copy in pages.
- Never edit `.next/` or `node_modules/`. Never commit `.env*` (gitignore keeps only `.env.example`).
- Changes affecting routes/content/SEO must touch: `lib/seo-content.ts`, `app/sitemap.ts`, page metadata,
  and (for projects) a slugged ClueItem in `lib/investigation-data.ts`.
- After structural changes, UPDATE the relevant doc(s) here in the same session.

## Quick Facts
- Next.js 15 App Router · React 19 · TypeScript strict · Tailwind CSS v4 · dark detective "case dossier" theme
- Portfolio of Shivam Vishwanaath (Tech Lead & Full-Stack Architect) at https://shivamvishwanaath.dev
- ZERO backend: no API routes, no DB — 100% static content imported from lib at build time
- Prod topology: PM2 cluster (:3000) behind Caddy reverse proxy (deploy/Caddyfile)
- On-demand full-repo AI pack: run `repomix` (installed globally) -> repomix-output.xml

## Blog (added 2026-08-26)
- Articles: `content/blog/*.md` (frontmatter model in 04-data-models.md); engine `lib/blog.ts`.
- Routes `/blog`, `/blog/[slug]`, RSS `/feed.xml`. Drafts (`draft: true`) never render/list.
- Authoring workflow + rules: see 05-conventions.md §Blog authoring.
