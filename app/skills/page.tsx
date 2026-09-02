import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Terminal, 
  Server, 
  Code, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Workflow,
  Sparkles,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Heart,
  Mail,
  Smartphone
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/schemas';
import { SITE_URL, SKILLS_KEYWORDS, DEFAULT_OG_IMAGE } from '@/lib/seo-content';

export const metadata: Metadata = {
  title: 'Skills & DevOps Arsenal',
  description: 'Confiscated technical arsenal of Shivam Vishwanaath: TypeScript, React, Next.js, Node.js, Ubuntu VPS, Caddy Reverse Proxy, Docker, PostgreSQL, Flutter, Android, and Data Science.',
  keywords: SKILLS_KEYWORDS,
  openGraph: {
    title: 'Skills & Tech Arsenal — Shivam Vishwanaath | Tech Lead Stack',
    description: 'Explore the full technical arsenal, VPS DevOps capabilities, and architecture stack of Shivam Vishwanaath.',
    url: `${SITE_URL}/skills`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Shivam Vishwanaath Skills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills & Tech Arsenal — Shivam Vishwanaath | Tech Lead Stack',
    description: 'Explore the full technical arsenal, VPS DevOps capabilities, and architecture stack of Shivam Vishwanaath.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/skills`,
  },
};

const SKILL_CATEGORIES = [
  {
    title: 'Languages & Core Foundations',
    icon: Code,
    description: 'Strong foundation in typed systems, low-level problem solving, and modern ECMAScript standards.',
    skills: [
      { name: 'TypeScript', level: 'Expert', note: 'Strict typing, generics, complex interfaces, Next.js integration' },
      { name: 'JavaScript (ESNext)', level: 'Expert', note: 'Asynchronous event loops, DOM manipulation, modern syntax' },
      { name: 'Java', level: 'Advanced', note: 'Android SDK, OOP architecture, SQLite integration, design patterns' },
      { name: 'Python', level: 'Advanced', note: 'Automation pipelines, headless workers, NumPy, Pandas analysis' },
      { name: 'Dart', level: 'Advanced', note: 'Flutter framework, reactive state management, asynchronous streams' },
      { name: 'C / C++', level: 'Advanced', note: 'Data structures, algorithm complexity, hardware-level rigor' },
      { name: 'SQL', level: 'Advanced', note: 'Relational schemas, query optimization, indexing, aggregations' },
      { name: 'Bash / Shell Scripting', level: 'Advanced', note: 'Server automation, cron jobs, log analysis, deployment scripts' },
    ],
  },
  {
    title: 'Frontend & Web Architecture',
    icon: Layers,
    description: 'High-performance UI engineering with responsive layouts, modern state management, and animations.',
    skills: [
      { name: 'React.js (v18 / v19)', level: 'Expert', note: 'Hooks, Concurrent rendering, custom hooks, component composition' },
      { name: 'Next.js (v14 / v15)', level: 'Expert', note: 'App Router, Server Components, SSG, SSR, standalone output, SEO' },
      { name: 'Tailwind CSS', level: 'Expert', note: 'Utility-first styling, CSS variables, dark mode, responsive design' },
      { name: 'Framer Motion', level: 'Advanced', note: 'Declarative physics-based animations, layout transitions' },
      { name: 'Dynamic Schema Engines', level: 'Advanced', note: 'Visual form builders, AST-based conditional logic validators' },
      { name: 'Angular', level: 'Proficient', note: 'Enterprise SPA architectures, dependency injection, routing' },
    ],
  },
  {
    title: 'Mobile & Cross-Platform Apps',
    icon: Smartphone,
    description: 'Native and cross-platform mobile engineering with offline-first caching and real-time state synchronization.',
    skills: [
      { name: 'Native Android (Java / XML)', level: 'Advanced', note: 'Google Play Store publisher (70+ 5★ ratings), sub-10ms queries' },
      { name: 'Flutter & Dart', level: 'Advanced', note: 'Cross-platform mobile apps (SocialBay), state management, animations' },
      { name: 'Firebase Mobile SDK', level: 'Expert', note: 'Cloud Messaging, real-time sync, offline persistence, push notifications' },
      { name: 'Offline-First Storage', level: 'Advanced', note: 'SQLite, SharedPreferences, local file caching' },
    ],
  },
  {
    title: 'DevOps, Servers & VPS Management',
    icon: Server,
    description: 'Complete ownership of bare-metal Linux servers, process lifecycles, and reverse proxy networking.',
    skills: [
      { name: 'Ubuntu Linux VPS', level: 'Expert', note: 'Bare-metal configuration, user permissions, UFW firewall hardening' },
      { name: 'Caddy Web Server', level: 'Expert', note: 'Automated Let\'s Encrypt SSL, reverse proxy routing, HTTP/3, caching' },
      { name: 'PM2 Process Clustering', level: 'Expert', note: 'Zero-downtime hot reloads, cluster mode, memory thresholds' },
      { name: 'Docker & Docker Compose', level: 'Advanced', note: 'Multi-stage builds, isolated container networks, service dependencies' },
      { name: 'CI/CD Pipelines', level: 'Advanced', note: 'Automated GitHub Actions build, test, and deployment workflows' },
    ],
  },
  {
    title: 'Enterprise Cloud & Systems Architecture (Helios)',
    icon: ShieldCheck,
    description: 'Architecture of compiled Go engines, reverse proxy orchestration, DNS, mail clusters, and cryptographic trust.',
    skills: [
      { name: 'Go (Golang)', level: 'Expert', note: 'Helios Core Engine — Fiber v2, compiled binaries, <5ms API response' },
      { name: 'Caddy 2 & PowerDNS', level: 'Expert', note: 'Native MariaDB SQL backend, sub-second DNS propagation, HTTP/3 QUIC' },
      { name: 'Postfix & Dovecot Mail Cluster', level: 'Advanced', note: 'SPF, 2048-bit DKIM, DMARC, Rspamd, 10/10 mail deliverability' },
      { name: 'HMAC-SHA256 Cryptography', level: 'Expert', note: 'Offline license verification, SHA-256 tamper-evident PDF signing (TrustSign)' },
      { name: 'HTMX / Server-Rendered HTML5', level: 'Expert', note: 'Sub-100ms page transitions without React/Angular SPA bundle overhead' },
      { name: 'MariaDB / MySQL', level: 'Expert', note: 'Connection pooling, dynamic schema migrations, multi-tenant isolation' },
    ],
  },
  {
    title: 'Backend, APIs & Databases',
    icon: Database,
    description: 'Scalable RESTful microservices, real-time sync, and multi-tenant data topologies.',
    skills: [
      { name: 'Node.js & Express.js', level: 'Expert', note: 'REST API architectures, middleware pipelines, authentication' },
      { name: 'MongoDB', level: 'Advanced', note: 'Document schemas, aggregation pipelines, replica sets' },
      { name: 'PostgreSQL & Supabase', level: 'Advanced', note: 'Row-level security, relational triggers, real-time subscriptions' },
      { name: 'Firebase & Firestore', level: 'Advanced', note: 'Realtime database, serverless triggers, authentication' },
      { name: 'WebSockets', level: 'Advanced', note: 'Multi-user collaborative canvas sync, real-time chat protocols' },
    ],
  },
  {
    title: 'Enterprise SaaS, CRM & Automation',
    icon: Workflow,
    description: 'Data-driven segmentation engines, financial ledger reconciliation, and headless dispatch pipelines.',
    skills: [
      { name: 'Audience Segmentation Engines', level: 'Expert', note: 'Visual rule builders with nested AND/OR logic conditions (Xeno CRM)' },
      { name: 'Automated Billing & Ledgers', level: 'Expert', note: 'Zero-reconciliation ledger pipelines, multi-tenant commission logic' },
      { name: 'Headless Dispatch Workers', level: 'Advanced', note: 'Python & Node.js asynchronous queuing, rate limiters, webhooks' },
      { name: 'Role-Based Access Control', level: 'Advanced', note: 'Multi-tier permission hierarchies for enterprise operations (PeopleOS)' },
    ],
  },
  {
    title: 'Data Science & Machine Learning',
    icon: Cpu,
    description: 'Academic rigor from MBA Data Science program at Amity Online and B.Tech from BIT Mesra.',
    skills: [
      { name: 'Predictive Analytics', level: 'Advanced', note: 'Statistical modeling, time-series forecasting, performance diagnostics' },
      { name: 'Assessment Algorithms', level: 'Expert', note: 'Weak-area clustering O(n log k), difficulty tiering, response telemetry' },
      { name: 'Percentile Projections', level: 'Expert', note: 'National rank distribution and topic-level diagnostic heatmapping' },
      { name: 'Python for Data Analysis', level: 'Proficient', note: 'NumPy, Pandas, statistical data manipulation pipelines' },
    ],
  },
];

export default function SkillsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Technical Skills of Shivam Vishwanaath', url: '/skills' },
  ];

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-300">Technical Arsenal of Shivam Vishwanaath</span>
      </nav>

      <div className="space-y-12">
        {/* Header */}
        <header className="space-y-2 border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>CONFISCATED CAPABILITY REPORT // ARSENAL MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Technical Skills & Arsenal of Shivam Vishwanaath
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-3xl leading-relaxed">
            Full-stack engineering capabilities, Ubuntu VPS infrastructure ownership, automated reverse proxy architectures, and analytical algorithms mastered by Tech Lead Shivam Vishwanaath.
          </p>
        </header>

        {/* Categories */}
        <div className="space-y-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <section key={idx} className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-2">
                  <div className="w-7 h-7 rounded bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {cat.title}
                    </h2>
                    <p className="text-[11px] text-neutral-400 font-sans">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-xl bg-[#111111] border border-neutral-800/90 hover:border-neutral-700 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">
                          {skill.name}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-[10px] text-red-300 font-bold">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Cross-Link Exploration Grid */}
        <section className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
              CORROBORATING CASE EVIDENCE
            </h3>
            <span className="text-[10px] text-neutral-500">CROSS-EXAMINATION</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/projects"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <FolderKanban className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Production Projects</span>
            </Link>
            <Link
              href="/experience"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Career Timeline</span>
            </Link>
            <Link
              href="/investigation"
              className="p-3 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 font-bold transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Pinboard Canvas</span>
            </Link>
            <Link
              href="/contact"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct Wire</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
