# 04 · Data Models (lib layer)

## Core types (lib/investigation-data.ts)
ClueType = polaroid | dossier | newspaper | sticky | map | arsenal | evidence-bag | document
ClueCategory = profile | experience | projects | skills | education | leadership | headlines
interface ClueItem { id; slug?; seoTitle?; seoDescription?;
  pageCategory?: profile|projects|experience|skills|education|leadership|general;
  title; subtitle; category: ClueCategory; type: ClueType;
  x; y; rotation; pinColor?: red|brass|blue|black;
  stamp?: CLASSIFIED|CONFIDENTIAL|SOLVED|VERIFIED|HIGH PRIORITY|IMPACT|TECH LEAD;
  headline?; date?; location?; summary; details: string[];
  metrics?: {label;value}[]; tags: string[];
  links?: {label;url;icon?}[]; uvSecret?; imageUrl?; pinned? }
interface RedStringConnection { id; fromId; toId; label?; narrativeReason?;
  style?: crimson|neon|dashed; category?: core|tech|leadership|custom }
interface StoryChapter { id:number; title; timeframe; narrative;
  focusedClueIds: string[]; highlightConnections: string[]; headline }

## Verified inventories (counts audited 2026-08-26)
INITIAL_CLUES = **13 clues**, every one has a slug:
| id | slug |
|----|------|
| subject-shivam | shivam-vishwanaath-profile |
| headline-transed | trans-ed-tech-lead |
| dossier-cbse-bitsat | cbseforum-bitsatforum |
| dossier-tutors-forum | tutors-forum |
| polaroid-nm-foundation | nm-foundation |
| sticky-periodic-table | periodic-table-app |
| sticky-chem-forum | chemistry-forum |
| headline-blood-drive | nss-blood-donation-leadership |
| dossier-epac | epac-presidency |
| arsenal-matrix | tech-stack-arsenal |
| document-education | academic-credentials |
| polaroid-johar-qeds | joharnite-qeds-conference |
| map-clue | jurisdiction-map |
INITIAL_CONNECTIONS = 12 base red strings (ids prefixed str-):
subject-edu · subject-map · edu-johar · subject-transed · transed-cbse · transed-tutors ·
subject-nm · nm-periodic · periodic-chem · subject-blood · blood-epac · subject-arsenal
STORY_CHAPTERS = 5 chapters (ids 1..5; themes: foundations -> android/edtech genesis ->
99%-uptime portals/NM -> Trans Ed orchestration -> NSS humanitarian).
STATIC_FAQS = 8 items across 5 categories (TECH LEADERSHIP, DEVOPS & SERVERS,
CRISIS & SOCIAL IMPACT, CONTACT & RECRUITMENT, PROJECTS & EDTECH);
known ids: trans-ed-tech-lead, bitsat-diagnostic-engine, tutors-billing-pipeline,
devops-infrastructure-matrix, nss-blood-drive-leadership, verified-contact-coordinates, projects-overview.
STALE LABEL WARNING: EvidenceVaultView.tsx hardcodes "ALL EVIDENCE (10)" chips/header text,
but the real clue count is 13 — fix labels if you touch that component.

## Acts (lib/story-acts.ts)
CaseActId = act-1 | act-2 | act-3 | incident-log | evidence-vault | verdict (last three = auxiliary views)
CaseActDefinition = { id, actNumber, codename, title, subtitle, timeframe, theme, briefing,
objective, requiredClueIds[], connections[] (act-scoped RedStringConnections),
dossierSummary, status: active|locked|completed }
CASE_ACTS.requiredClueIds:
- act-1 OPERATION GENESIS (2020-2022): document-education, sticky-periodic-table, sticky-chem-forum, map-clue
- act-2 OPERATION SURGE COMMAND (2022-2024): polaroid-johar-qeds, polaroid-nm-foundation, headline-blood-drive, dossier-epac
- act-3 OPERATION TECH LEAD COMMAND (2024-present): subject-shivam, headline-transed, dossier-cbse-bitsat, dossier-tutors-forum, arsenal-matrix
Act-level connection ids live INSIDE CASE_ACTS (act1-str-* x3, act2-str-* x3, act3-str-* x4)
and are merged by the canvas; getClueActInfo(clueId,currentActId) returns belongsToAct/isCurrentAct/actLabel.
subject-shivam is special: always treated as belonging to the CURRENT act.

## SEO/content constants
lib/seo-content.ts: SITE_URL (env NEXT_PUBLIC_SITE_URL, fallback https://shivamvishwanaath.dev),
SITE_NAME, SITE_TITLE_DEFAULT, SITE_DESCRIPTION_DEFAULT, AUTHOR_NAME, SOCIAL_LINKS
(github.com/shivamvishwanaath, instagram/shivamvishwanaath, x.com/svishwanaath,
shivam.strive@gmail.com), DEFAULT_OG_IMAGE (/images/shivam-vishwanaath-og.png),
keyword arrays per page: SEO_/ABOUT_/EXPERIENCE_/PROJECTS_/SKILLS_/EDUCATION_/COMMUNITY_/CONTACT_/INVESTIGATION_.
lib/schemas.ts builders: Person, WebSite(+SearchAction), BreadcrumbList(items{name,url}),
ProfilePage, WorkExperience, ProjectsList, CreativeWork->SoftwareApplication({title,description,url,tags,datePublished}),
Community(ItemList of Event/OrganizeAction/VolunteerAction), ContactPage, FAQPage(faqs{question,answerMarkdown} -> strips #/* ).

## Blog data model (lib/blog.ts, added 2026-08-26)
content/blog/*.md frontmatter:
  title (required) · excerpt|description (required) · date YYYY-MM-DD ·
  category: expertise|experience|projects|trends · tags: string[] · draft?: boolean ·
  seoTitle?/seoDescription? · relatedProjects?: projectSlug[] (auto internal links)
Derived: slug=filename, readingMinutes=words/200. Exports: getAllPosts(includeDrafts=false)
(newest first), getPostBySlug(slug). Malformed files skip silently at build.
Schemas: getArticleSchema({title,description,url,tags,datePublished}) -> BlogPosting;
BUILD_DATE (seo-content.ts) feeds dateModified/lastModified everywhere.
