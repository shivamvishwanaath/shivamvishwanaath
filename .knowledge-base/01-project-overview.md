# 01 · Project Overview

## Identity
SEO-driven personal portfolio / case-dossier website for **Shivam Vishwanaath** (Tech Lead &
Full-Stack Architect). Visual theme: dark detective investigation board (crime tape, pins,
red strings, UV blacklight mode). Originally scaffolded from Google AI Studio (README is stale boilerplate).

## Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | Next.js 15.4 (App Router, SSG, NO API routes) |
| UI runtime | React 19.2 |
| Language | TypeScript 5.9, strict, path alias `@/* -> ./*` |
| Styling | Tailwind CSS v4 (via @tailwindcss/postcss, NO tailwind.config file) + tw-animate-css |
| Animation | `motion` pkg (transpiled in next.config) + canvas-confetti |
| Icons | lucide-react only |
| Markdown | react-markdown + remark-gfm (FAQ drawer, prose styles) |
| Utils | clsx + tailwind-merge (`cn()` in lib/utils.ts) |
| Process mgr | PM2 cluster (ecosystem.config.cjs) |
| Edge proxy | Caddy (deploy/Caddyfile) |
| DevDep oddity | firebase-tools (unused leftover) |

## Commands (use pnpm)
pnpm install · pnpm dev · pnpm build · pnpm lint (build IGNORES eslint — run manually)
pnpm start · pnpm run start:pm2 / reload:pm2 / stop:pm2 / logs:pm2
node scripts/generate-favicons.mjs  # regenerates public favicon set (zero-dep PNG/ICO writer)
bash deploy/deploy.sh               # SERVER-SIDE: git pull -> install -> build -> pm2 reload

## Environment (.env.local; see .env.example)
- NEXT_PUBLIC_SITE_URL — canonical base URL (fallback https://shivamvishwanaath.dev); consumed by lib/seo-content.ts
- NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION — optional; wired into app/layout.tsx metadata.verification

## Production Topology
Internet -> Caddy (auto-SSL, HSTS, gzip/zstd, immutable cache for /images and /_next/static,
www->apex redirect) -> 127.0.0.1:3000 -> PM2 cluster (instances max, exec_mode cluster,
max_memory_restart 512M) running `next start -H 0.0.0.0`.

## Quirks / Stale Artifacts (do NOT trust them)
- README.md = AI Studio boilerplate (GEMINI_API_KEY, npm instructions) — ignore entirely.
- bun.lock exists but bun is NOT installed locally; deploy.sh prefers bun if present. Use pnpm.
- Two ESLint configs coexist: eslint.config.mjs (flat, active) + .eslintrc.json (legacy).
- `xs:*` Tailwind variants appear in JSX but no xs breakpoint is defined anywhere -> silent no-ops.
- lib/audio.ts is a deliberate mute stub (`soundEffects` methods are empty).
- app/sitemap.ts hard-codes RELEASE_DATE = 2025-08-20 for all pages.
