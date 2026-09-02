# 05 · Conventions & Patterns

## Code style
- TypeScript strict. Path alias `@/...`. Prefer existing helpers (`cn()` for conditional classes).
- Server Components by default; add `'use client'` ONLY where hooks/interactivity live
  (SiteNavigation, entire board component family, error.tsx).
- Components: named arrow-function exports typed as React.FC<Props> with local Props interface;
  heavy leaf components wrapped in React.memo (ClueCard). Default exports only where Next.js requires (pages/layout/error/not-found/robots/sitemap).
- Icons exclusively lucide-react, sized via className (w-3 h-3 .. w-8 h-8). No emoji in UI chrome
  (emoji appear only inside FAQ labels in lib/static-faq.ts).

## Styling (Tailwind v4, NO config file)
- Single `@import "tailwindcss"` in app/globals.css; theme expressed via arbitrary values only.
- Palette: page bg #0a0a0a / #0c0c0c; panels #111111/#121212/neutral-900; borders neutral-800;
  ACCENT red (red-500/600, tape #ff2e2e); status colors amber(log), blue(vault), emerald(success/verdict),
  cyan(UV blacklight), rose(community), purple(education).
- Typography: font-mono everywhere by default; paragraphs switch font-sans; tiny sizes text-[9px]..text-xs are normal.
- Crime-tape strip utility: bg-[repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e_10px,#000_10px,#000_20px)]
  (used on modals/canvas headers — reuse this exact class).
- Animations: tw-animate-css utilities animate-in fade-in slide-in-from-* duration-*.
- Markdown wrapper classes: prose prose-invert prose-red (+prose-headings/p/li overrides).
- KNOWN NO-OP: xs:* variants used in JSX but xs breakpoint undefined in this v4 setup — do not rely on them.

## SEO playbook (every public page MUST)
1. export const metadata using constants from lib/seo-content.ts (title/description/keywords/openGraph/twitter/alternates.canonical).
2. Render <JsonLd schema={getBreadcrumbSchema([...])}/> + page-specific builder from lib/schemas.ts.
3. Add route to app/sitemap.ts staticPages (priority/changeFrequency).
4. Add nav/footer links when appropriate (SiteNavigation NAV_LINKS / SiteFooter lists).
- Dynamic project pages: metadata from clue.seoTitle/seoDescription falling back to cleaned title/summary
  (title cleanup strips prefixes CASE FILE: / CLUE: / NOTE: / EVIDENCE 08:).

## Content workflow (most tasks land here)
- Projects/clues: append a ClueItem in lib/investigation-data.ts. With slug + pageCategory projects it
  AUTO-propagates to /projects, /projects/[slug], sitemap, homepage featured. Slugged clues also drive SEO pages.
- Acts: lib/story-acts.ts — keep requiredClueIds in sync with real clue ids; transition narrative copy lives
  separately in components/ActTransitionModal.tsx TRANSITIONS record — update BOTH.
- FAQs: lib/static-faq.ts (markdown answers; feed FAQPage rich results on /about AND StaticFAQDrawer).
- Press headlines: DUPLICATE SOURCE WARNING — HEADLINES_DATA lives INSIDE
  components/NewspaperArchiveModal.tsx (not in lib). Update it too when facts change.
- Favicons/images: never hand-edit generated PNGs; run node scripts/generate-favicons.mjs.

## Verification habits
- pnpm lint (build skips ESLint!) · pnpm build for type/route checks. No test framework configured.
- Deploy only via deploy/deploy.sh ON THE VPS (never local pm2 for prod).
- After structural changes: update the matching .knowledge-base/*.md doc in the same session.

## Blog authoring (since 2026-08-26)
1. Drop a `.md` file into `content/blog/`; filename = permanent slug (never rename later).
2. Frontmatter is mandatory: title + excerpt + date + category(expertise|experience|projects|trends);
   add `draft: true` until publish-ready (drafts vanish from build entirely).
3. Markdown supports GFM tables/checklists; fenced code gets rehype-highlight with the
   dossier theme defined at the bottom of `app/globals.css` (.hljs-* rules).
4. Link related work via `relatedProjects:` (project slugs) — internal links boost SEO.
5. SEO comes free: metadata, canonical, OG, BlogPosting JSON-LD, sitemap entry, RSS item all
   generate from frontmatter — do NOT hand-add them anywhere.
6. Titles: keep raw title ≤55 chars; layout template appends "| Shivam Vishwanaath".
7. Homepage auto-shows newest 3 posts; nav/footer already link /blog and /feed.xml (RSS).
