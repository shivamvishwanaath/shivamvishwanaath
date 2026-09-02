import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FolderLock,
  Sparkles,
  Briefcase,
  Cpu,
  Mail
} from 'lucide-react';
import { INITIAL_CLUES } from '@/lib/investigation-data';
import { ProjectsFilterGrid } from '@/components/ProjectsFilterGrid';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema, getProjectsListSchema } from '@/lib/schemas';
import { SITE_URL, PROJECTS_KEYWORDS, DEFAULT_OG_IMAGE } from '@/lib/seo-content';

export const metadata: Metadata = {
  title: 'Projects — Full-Stack Case Files',
  description: 'Explore the full-stack applications, diagnostic test engines, and cloud platforms engineered by Tech Lead Shivam Vishwanaath.',
  keywords: PROJECTS_KEYWORDS,
  openGraph: {
    title: 'Projects — Shivam Vishwanaath | Full-Stack Architect Portfolio',
    description: 'Explore the full-stack applications, diagnostic test engines, and cloud platforms engineered by Tech Lead Shivam Vishwanaath.',
    url: `${SITE_URL}/projects`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Projects by Shivam Vishwanaath' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — Shivam Vishwanaath | Full-Stack Architect Portfolio',
    description: 'Explore the full-stack applications, diagnostic test engines, and cloud platforms engineered by Tech Lead Shivam Vishwanaath.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Projects by Shivam Vishwanaath', url: '/projects' },
  ];

  const projectClues = INITIAL_CLUES.filter(
    clue => clue.category === 'projects' || clue.pageCategory === 'projects'
  );

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getProjectsListSchema(projectClues)} />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-300">Projects by Shivam Vishwanaath</span>
      </nav>

      <div className="space-y-12">
        {/* Header */}
        <header className="space-y-2 border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            <FolderLock className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL CASE EVIDENCE // PRODUCTION REPOSITORIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Projects Engineered by Shivam Vishwanaath
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-3xl leading-relaxed">
            A comprehensive inventory of full-stack platforms, exam simulation engines, and automated marketplaces architected and deployed by Tech Lead Shivam Vishwanaath.
          </p>
        </header>

        {/* Projects Grid — client-side ?q= filter (keeps SearchAction truthful) */}
        <ProjectsFilterGrid clues={projectClues} />

        {/* Cross-Link Exploration Grid */}
        <section className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
              RELATED FORENSIC CASE EVIDENCE
            </h3>
            <span className="text-[10px] text-neutral-500">CROSS-EXAMINATION</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/experience"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Career Timeline</span>
            </Link>
            <Link
              href="/skills"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>DevOps & Stack</span>
            </Link>
            <Link
              href="/investigation"
              className="p-3 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 transition-colors flex items-center gap-2 font-bold"
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
