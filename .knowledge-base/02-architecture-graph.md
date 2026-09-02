# 02 · Architecture Graph

## Runtime model
100% static/SSG marketing site + ONE client-side interactive island at `/investigation`.
No API routes, no database, no auth. All content imported at build time from `lib/*.ts`.

## Route map
| Route | File | Rendering | Notes |
|-------|------|-----------|-------|
| / | app/page.tsx | Server | Hero, featured projects (INITIAL_CLUES filter projects, top 4), section link grid |
| /about | app/about/page.tsx | Server | Dossier + ProfilePage/FAQPage/Breadcrumb JSON-LD (uses STATIC_FAQS) |
| /projects | app/projects/page.tsx | Server | Grid of clues where category==projects OR pageCategory==projects |
| /projects/[slug] | app/projects/[slug]/page.tsx | SSG generateStaticParams over slugged clues | Detail page; shows uvSecret box; CreativeWork JSON-LD |
| /experience /skills /education /community /contact | app/<name>/page.tsx | Server | Page-local data arrays + per-page JSON-LD builders |
| /investigation | app/investigation/page.tsx | Server shell + client island | sr-only crawlable case index + noscript fallback; Suspense wraps board |
| /sitemap.xml /robots.txt | app/sitemap.ts app/robots.ts | Server | Project slugs DERIVED from INITIAL_CLUES |

## Client island composition
InvestigationBoardContainer ('use client' — state owner)
  state: currentView: CaseActId ('act-1'|'act-2'|'act-3'|'incident-log'|'evidence-vault'|'verdict')
         completedActs: string[] (defaults ['act-1']) · selectedClueId: string|null
  |- CaseActSelector     top bar: case branding + 3 act tabs + LOG/VAULT/VERDICT buttons
  |- act views       ->  InvestigationCanvas(actId, onActComplete, onNavigateView)
  |- incident-log    ->  IncidentLogView(onSelectClue, onNavigateToAct)   3 long-form phase entries
  |- evidence-vault  ->  EvidenceVaultView(onSelectClue)                 category chips + text search over clues
  |- verdict         ->  VerdictReportView(onBackToBoard, onNavigateToView)  confetti finale
  \- selectedClue    ->  DetailModal(clue, allClues, connections=[], uvMode=false)

InvestigationCanvas (pinboard ENGINE, ~970 lines, biggest file)
  state: clues/connections (useState seeded from INITIAL_*), selectedClueId, actFocusMode,
         mobileDeckMode, zoom/pan (+pan & pinch touch refs), draggingClueId (+drag ref),
         uvMode, isStoryMode/currentChapter, isFAQOpen, isHeadlinesOpen, isCustomNoteOpen,
         isTransitionModalOpen, connect-mode refs, toast
  interactions: card drag (mouse+touch), background pan, zoom (buttons/wheel/pinch),
                pin click -> red-string connect flow, UV toggle reveals clue.uvSecret,
                Solve/Advance act button -> confetti + ActTransitionModal -> onActComplete
  children:
    ClueCard (memo; polymorphic by clue.type: newspaper/polaroid/sticky/map/dossier/arsenal/evidence-bag/document)
    DetailModal (tabs: brief | forensics | network; network = connected clues + narrativeReason)
    StoryNavigator (cinematic player over STORY_CHAPTERS; autoplay 7s/chapter; confetti at end)
    StaticFAQDrawer (slide-over; category filter + search; ReactMarkdown; copy-to-clipboard)
    NewspaperArchiveModal (searchable press archive; LOCAL HeadlineRecord list mapped to clueIds; pans canvas to clue)
    CustomClueModal (form -> creates sticky ClueItem id custom-evidence-<timestamp>)
    ActTransitionModal (per-act cleared summary; TRANSITIONS record defined for act-1 and act-2)

NOTE: Container-level DetailModal receives connections=[] and uvMode=false — red threads and
UV secrets only render inside the InvestigationCanvas context.

## Module dependency graph (lib/hooks)
lib/seo-content.ts <- lib/schemas.ts <- app/layout.tsx + all pages (JsonLd payloads, metadata)
lib/investigation-data.ts <- lib/story-acts.ts (imports ClueItem/RedStringConnection types)
                          <- InvestigationCanvas family + home/projects pages + sitemap
lib/static-faq.ts <- app/about/page.tsx (FAQPage schema) + StaticFAQDrawer
lib/utils.ts cn() available globally · lib/audio.ts silent stub singleton soundEffects
hooks/use-mobile.ts useIsMobile() (matchMedia < 768px)

## Data flow
- BUILD TIME: lib data -> page metadata/SEO, /sitemap.xml entries, /projects/[slug] static params.
- BOARD RUNTIME: INITIAL_CLUES cloned into useState -> card drags mutate x/y -> absolutely-
  positioned cards inside a translate+scale transformed div -> SVG layer draws
  RedStringConnection lines between pin coordinates -> DetailModal joins clue <-> connections <-> targets.
- Adding a project = append a slugged ClueItem (pageCategory projects); it AUTOMATICALLY appears
  in /projects grid, /projects/[slug], sitemap, and homepage featured list.
