import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  FolderLock, 
  ArrowLeft, 
  Terminal, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ShieldAlert,
  Fingerprint,
  Calendar,
  MapPin,
  Layers,
  Award,
  Cpu,
  Briefcase,
  Mail
} from 'lucide-react';
import { INITIAL_CLUES, ClueItem } from '@/lib/investigation-data';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema, getCreativeWorkSchema } from '@/lib/schemas';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo-content';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_CLUES
    .filter(clue => clue.slug && (clue.category === 'projects' || clue.pageCategory === 'projects'))
    .map(clue => ({
      slug: clue.slug as string,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = INITIAL_CLUES.find(c => c.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | Shivam Vishwanaath',
    };
  }

  const title = project.seoTitle || `${project.title.replace('CASE FILE: ', '').replace('CLUE: ', '').replace('NOTE: ', '').replace('EVIDENCE 08: ', '')} — Built by Shivam Vishwanaath`;
  const description = project.seoDescription || project.summary;

  // Absolute title: layout template would otherwise append the brand a second time
  // (it is already part of this generated title). Cap near ~70 chars for SERP safety.
  return {
    title: { absolute: title.length > 70 ? `${title.slice(0, 67)}…` : title },
    description,
    keywords: [
      'Shivam Vishwanaath',
      project.title,
      `${project.title} Shivam Vishwanaath`,
      ...project.tags,
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/projects/${slug}`,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `${SITE_URL}/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = INITIAL_CLUES.find(c => c.slug === slug);

  if (!project) {
    notFound();
  }

  const cleanTitle = project.title.replace('CASE FILE: ', '').replace('CLUE: ', '').replace('NOTE: ', '').replace('EVIDENCE 08: ', '');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: cleanTitle, url: `/projects/${slug}` },
  ];

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd 
        schema={getCreativeWorkSchema({
          title: `${cleanTitle} — Built by Shivam Vishwanaath`,
          description: project.summary,
          url: `${SITE_URL}/projects/${slug}`,
          tags: project.tags,
          datePublished: project.date,
        })} 
      />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-red-400 transition-colors">Projects</Link>
        <span>/</span>
        <span className="text-neutral-300 truncate max-w-xs">{cleanTitle}</span>
      </nav>

      <article className="space-y-8">
        {/* Header Block */}
        <header className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{project.stamp || 'VERIFIED PRODUCTION ARTIFACT'}</span>
            </span>
            {project.date && (
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                {project.date}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {cleanTitle}
            </h1>
            <p className="text-sm text-red-400 font-bold">
              {project.subtitle} • Architected by Shivam Vishwanaath
            </p>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed pt-2 border-t border-neutral-800">
            {project.summary}
          </p>

          {/* Metrics bar */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500 uppercase">{m.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Deep Dive Forensic Findings */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-neutral-800 pb-2 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-red-500" />
            <span>TECHNICAL ARCHITECTURE & FORENSIC EVIDENCE</span>
          </h2>

          <div className="p-6 rounded-xl bg-[#111111] border border-neutral-800 space-y-4">
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              {project.details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-start gap-3">
                  <span className="text-red-500 font-mono mt-0.5 font-bold">0{dIdx + 1}.</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            {project.uvSecret && (
              <div className="mt-4 p-4 rounded-lg bg-neutral-900 border border-cyan-500/30 text-cyan-200 text-xs font-mono">
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-1">
                  DEEP TELEMETRY RECORD:
                </div>
                {project.uvSecret}
              </div>
            )}
          </div>
        </section>

        {/* Tech Stack & Tags */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
            TECHNOLOGIES & CAPABILITIES
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Related Navigation & Cross Links */}
        <section className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-3">
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
            CROSS-EXAMINE RELATED EVIDENCE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/skills"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>DevOps & Arsenal</span>
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
          </div>
        </section>

        {/* Bottom Navigation */}
        <footer className="pt-6 border-t border-neutral-800 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors border border-neutral-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ALL PROJECTS</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md"
          >
            <span>CONNECT WITH SHIVAM</span>
          </Link>
        </footer>
      </article>
    </main>
  );
}
