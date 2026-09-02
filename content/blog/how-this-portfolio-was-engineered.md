---
title: "How This Portfolio Was Engineered as a Static Case Dossier"
excerpt: "The architecture behind shivamvishwanaath.dev — a zero-backend Next.js App Router site where an interactive detective pinboard, JSON-LD everywhere, and PM2/Caddy hosting all coexist without a single API route."
date: "2026-08-26"
category: "projects"
tags: ["Next.js", "App Router", "SSG", "SEO", "Tailwind CSS"]
draft: true
relatedProjects: ["trans-ed-tech-lead", "cbseforum-bitsatforum"]
---

### 🔍 CASE OPENING: WHY STATIC?

Most portfolios reach for a database before they reach for a pencil. This one does the opposite: **everything you can click is pre-rendered HTML**, generated once at build time and served by a hardened Ubuntu VPS behind Caddy.

> Design constraint #1 — *if it cannot be statically generated, it does not ship.*

The result is a site that survives traffic spikes with zero runtime dependencies beyond Node itself.

### THE CONTENT-AS-CODE MODEL

Every clue, act, FAQ and headline on this site is a typed object living under `lib/`. Pages are just renderers:

```ts
// lib/investigation-data.ts (excerpt)
export interface ClueItem {
  id: string;
  slug?: string;          // presence promotes the clue to /projects/[slug]
  pageCategory?: 'projects';
  type: 'polaroid' | 'dossier' | 'newspaper' /* ... */;
  x: number; y: number;   // pinboard coordinates
  uvSecret?: string;      // revealed only in UV blacklight mode
}
```

Adding a project means appending one object — the listing page, detail route, sitemap and homepage teaser pick it up automatically.

### THE INTERACTIVE ISLAND

`/investigation` is the only client-side territory: a pan/zoom/drag canvas with red-string connections drawn as SVG between pin coordinates.

```tsx
const [pan, setPan] = useState({ x: -120, y: -40 });
const style = { transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` };
```

Everything outside that island remains a Server Component, keeping shipped JS minimal.

### DEPLOYMENT: BORING ON PURPOSE

```bash
git pull && pnpm install --frozen-lockfile
pnpm build
pm2 reload ecosystem.config.cjs   # cluster mode, zero downtime
```

Caddy terminates TLS, sets HSTS, and caches immutable assets for a year.

*Case closed — for now. The next article dissects the weak-area detection algorithm inside BITSATForum.*