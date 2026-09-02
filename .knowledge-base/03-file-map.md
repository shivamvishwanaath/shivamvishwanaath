# 03 · File Map (root -> leaf)

## Root configs
package.json — scripts dev/build/start/lint/clean + pm2 wrappers; deps: next15 react19 motion lucide-react
canvas-confetti react-markdown remark-gfm clsx tailwind-merge cva; dev: tailwind4 @tailwindcss/postcss
tw-animate-css eslint9 eslint-config-next16 typescript5.9 firebase-tools(unused).
next.config.ts — reactStrictMode; eslint.ignoreDuringBuilds=true; transpilePackages[motion]; image formats
avif/webp + deviceSizes/imageSizes allowlist; security headers (CSP/nosniff/XFO-DENY/Referrer/Permissions);
cache: /images immutable 1y, favicons 1d + sw 7d.
tsconfig.json — strict, ES2017 target, moduleResolution bundler, jsx preserve, incremental, paths @/* -> ./*.
ecosystem.config.cjs — PM2 app shivam-vishwanaath: next start -p 3000 -H 0.0.0.0, cluster max instances, 512M restart.
eslint.config.mjs — flat config extends eslint-config-next (ACTIVE). .eslintrc.json — legacy duplicate.
postcss.config.mjs — @tailwindcss/postcss + autoprefixer.
.env.example — NEXT_PUBLIC_SITE_URL + optional google verification token.
.npmrc — engine-strict=true, node-linker=hoisted.  .gitignore — standard + ignores .env* except example.
README.md — STALE AI Studio boilerplate; ignore.  bun.lock vestigial; pnpm-lock.yaml authoritative.

## app/ (routes)
layout.tsx — root dark shell; global Metadata (title template appending site-name suffix, OG/Twitter/canonical,
icons, manifest, robots, google verification); WebSite+Person JsonLd; SiteNavigation/SiteFooter.
page.tsx — home: hero (photo/badges/stats/CTA), featured 4 projects from INITIAL_CLUES, section nav grid,
Pinboard promo card, recruiter callout band.
error.tsx — CLIENT error boundary with retry/reset.  not-found.tsx — themed 404.
robots.ts — allow all + sitemap URL.  sitemap.ts — 9 static pages (RELEASE_DATE 2025-08-20) + dynamic project slugs.
globals.css — @import tailwindcss; mono base body #0f0f0f; slim scrollbar (thumb hover #ff2e2e).
about/page.tsx — profile dossier; FAQPage+ProfilePage+Breadcrumb schemas; cross-link grids.
community/page.tsx — LEADERSHIP_INITIATIVES local array (blood drive, village education, EPAC) as metric cards.
contact/page.tsx — email/GitHub/Instagram/X cards, locations + availability strip.
education/page.tsx — EDUCATION_ITEMS local array (Amity MBA Data Science, BIT Mesra B.Tech ECE, Chinmaya Vidyalaya).
experience/page.tsx — EXPERIENCES local array (Trans Ed Tech Lead, NM Foundation intern, NSS roles).
skills/page.tsx — SKILL_CATEGORIES local array (languages, frontend, DevOps/VPS, data science...) with level badges.
investigation/page.tsx — board shell: sr-only semantic index (act objectives + all clue titles for SEO), noscript
links, Suspense fallback compass spinner -> InvestigationBoardContainer.
projects/page.tsx — project clue grid -> detail links (or pinboard link when no slug).
projects/[slug]/page.tsx — generateStaticParams + generateMetadata from slugged clue; numbered details list;
uvSecret telemetry box; cross-links; bottom nav.

## components/ (17 files)
InvestigationBoardContainer.tsx — client state owner for board views (see 02).
InvestigationCanvas.tsx — pinboard engine: pan/zoom/drag/pinch, red-string SVG connect mode, UV mode,
act focus mode, mobile deck mode, toolbar, hosts all modals (~970 lines; edit carefully).
CaseActSelector.tsx — top nav: case brand strip, act tabs w/ completed checks, LOG/VAULT/VERDICT switcher.
ClueCard.tsx — memoized polymorphic clue renderer by type; pin click handler; selection/focus/UV styling; act ribbon badge.
DetailModal.tsx — full dossier modal; tabs Brief/Forensics/Network (connected clues w/ narrativeReason);
auto social icons by URL; tags; UV restyle variant.
ActTransitionModal.tsx — act-cleared recap + next-act briefing; TRANSITIONS record for act-1/act-2; proceed/stay.
CustomClueModal.tsx — recruiter field-note form -> sticky ClueItem (random pos/rotation, stamp + pin color pickers).
EvidenceVaultView.tsx — category chips (with hardcoded counts) + tag/title/summary text search over ALL clues.
IncidentLogView.tsx — 3 chronological phase entries w/ highlights; inspect-artifact + jump-to-act buttons.
VerdictReportView.tsx — final verdict scorecard, contact CTAs, confetti celebrate, act re-visit dock.
StoryNavigator.tsx — bottom chapter player: autoplay 7s timer, prev/next, breadcrumb dots, exit; confetti finale.
StaticFAQDrawer.tsx — right slide-over: category filter, search, list + ReactMarkdown answer pane, copy button.
NewspaperArchiveModal.tsx — press archive; LOCAL HEADLINES_DATA (6 records incl. clueId + exhibit no); select pans canvas.
SiteNavigation.tsx — client sticky header: active-route links, pulsing PINBOARD CTA, mobile hamburger drawer.
SiteFooter.tsx — server footer: brand/social columns, dossier link lists, canonical/hosting note.
JsonLd.tsx — script ld+json renderer escaping < chars.

## lib/ + hooks/
investigation-data.ts — DOMAIN CORE: types ClueType/ClueCategory/ClueItem/RedStringConnection/StoryChapter;
INITIAL_CLUES; INITIAL_CONNECTIONS; STORY_CHAPTERS (5 chapters). See 04-data-models.md.
story-acts.ts — CaseActId (incl aux view ids incident-log/evidence-vault/verdict), CaseActDefinition,
CASE_ACTS (act-1..3: briefing/objective/requiredClueIds/connections/dossierSummary/status), getClueActInfo().
schemas.ts — JSON-LD builders: Person, WebSite, BreadcrumbList, ProfilePage, WorkExperience, ProjectsList,
CreativeWork(SoftwareApplication), Community(ItemList of Events/Actions), ContactPage, FAQPage.
seo-content.ts — SITE_URL/SITE_NAME/default title+description/AUTHOR_NAME, SOCIAL_LINKS (github/instagram/x/email),
DEFAULT_OG_IMAGE, per-page keyword arrays (SEO_, ABOUT_, EXPERIENCE_, PROJECTS_, SKILLS_, EDUCATION_, COMMUNITY_, CONTACT_, INVESTIGATION_).
static-faq.ts — FAQItem type + STATIC_FAQS (8 items across 5 categories; answers are markdown strings).
utils.ts — cn() = twMerge(clsx(...)).  audio.ts — MUTE STUB DetectiveAudioEngine singleton soundEffects (no-ops).
hooks/use-mobile.ts — useIsMobile() (<768px, matchMedia listener).

## deploy/ scripts/ public/
deploy/Caddyfile — reverse_proxy 127.0.0.1:3000; HSTS/security headers; encode gzip zstd; immutable cache
for images/_next/static/favicons; www->apex permanent redirect.
deploy/deploy.sh — git pull -> bun|pnpm|npm frozen install -> NEXT_PUBLIC_SITE_URL build -> pm2 reload/start -> save.
scripts/generate-favicons.mjs — hand-rolled PNG chunk encoder + ICO packer drawing SV monogram badge -> public/.
public/ — favicon set (generated), site.webmanifest, images/shivam-vishwanaath.webp (hero, 36KB),
images/shivam-vishwanaath-og.jpg (1200x630 social card, 44KB, regen via scripts/generate-og.mjs),
legacy master shivam-vishwanaath.png kept as generator source only.

## Blog layer (added 2026-08-26)
content/blog/*.md — article sources (frontmatter model: 04-data-models.md)
lib/blog.ts — build-time reader/parser (gray-matter), reading time, drafts filter
app/blog/page.tsx — FIELD NOTES listing (empty-state aware)
app/blog/[slug]/page.tsx — SSG article page (generateStaticParams/metadata/JsonLd/related links)
components/BlogCard.tsx — server card · components/MarkdownArticle.tsx — prose+highlight renderer
components/ProjectsFilterGrid.tsx — CLIENT ?q= filterable grid used by /projects (SearchAction truthful)
app/feed.xml/route.ts — force-static RSS 2.0
scripts/generate-og.mjs — sharp-based og.jpg/webp generator (devDep sharp)
app/globals.css — @plugin "@tailwindcss/typography" ENABLED (prose classes now real) + .hljs theme
