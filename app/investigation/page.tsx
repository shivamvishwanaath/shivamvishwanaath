import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ShieldAlert, Compass, Layers } from 'lucide-react';
import { InvestigationBoardContainer } from '@/components/InvestigationBoardContainer';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/schemas';
import { SITE_URL, INVESTIGATION_KEYWORDS, DEFAULT_OG_IMAGE } from '@/lib/seo-content';
import { INITIAL_CLUES } from '@/lib/investigation-data';
import { CASE_ACTS } from '@/lib/story-acts';

export const metadata: Metadata = {
  title: 'Interactive Investigation Board',
  description: 'Interactive digital crime pinboard portfolio showcasing the engineering feats, architectures, and leadership journey of Tech Lead Shivam Vishwanaath.',
  keywords: INVESTIGATION_KEYWORDS,
  openGraph: {
    title: 'Interactive Investigation Board — Shivam Vishwanaath Portfolio',
    description: 'Interactive digital crime pinboard portfolio of Tech Lead Shivam Vishwanaath.',
    url: `${SITE_URL}/investigation`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Investigation Board — Shivam Vishwanaath' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Investigation Board — Shivam Vishwanaath Portfolio',
    description: 'Interactive digital crime pinboard portfolio of Tech Lead Shivam Vishwanaath.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/investigation`,
  },
};

export default function InvestigationPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Interactive Investigation Board', url: '/investigation' },
  ];

  return (
    <main className="w-full flex-1 flex flex-col bg-[#0c0c0c] overflow-hidden" data-board="true">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />

      {/* Crawlable Semantic Index for Search Engines */}
      <section className="sr-only" aria-label="Investigation Board Case Index">
        <h1>Interactive Investigation Board — Shivam Vishwanaath Case Files</h1>
        <p>
          Interactive digital corkboard dossier mapping the career trajectory of Subject Shivam Vishwanaath — Founder &amp; CEO of The SCI SolCielo Innovacion Private Limited™ (MCA India, Feb 2026) and Tech Lead at Trans Ed.
        </p>

        <h2>Act I: Genesis & Mobile Breakout</h2>
        <p>{CASE_ACTS['act-1'].objective}</p>

        <h2>Act II: Campus Scale & NSS Humanitarian Command</h2>
        <p>{CASE_ACTS['act-2'].objective}</p>

        <h2>Act III: Tech Lead Mastermind & Cloud VPS Infrastructure</h2>
        <p>{CASE_ACTS['act-3'].objective}</p>

        <h2>Act IV: MCA Incorporated — Founder &amp; Enterprise Cloud Architect</h2>
        <p>{CASE_ACTS['act-4'].objective}</p>

        <h2>Verified Exhibits & Clues</h2>
        <ul>
          {INITIAL_CLUES.map(clue => (
            <li key={clue.id}>
              <strong>{clue.title}</strong>: {clue.summary}
            </li>
          ))}
        </ul>
      </section>

      <noscript>
        <div className="p-6 bg-red-950/80 border border-red-500 text-white font-mono text-xs m-4 rounded-xl space-y-2">
          <p className="font-bold">
            JavaScript is disabled. For the full interactive detective pinboard experience, please enable JavaScript.
          </p>
          <p>
            All case files are crawlable and accessible via standard pages:
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/about" className="underline hover:text-red-300">About Shivam Vishwanaath</Link>
            <Link href="/projects" className="underline hover:text-red-300">Projects & Portals</Link>
            <Link href="/experience" className="underline hover:text-red-300">Experience Timeline</Link>
            <Link href="/skills" className="underline hover:text-red-300">Technical Arsenal</Link>
            <Link href="/contact" className="underline hover:text-red-300">Contact Coordinates</Link>
          </div>
        </div>
      </noscript>

      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center p-8 bg-[#0c0c0c] font-mono text-xs text-neutral-400">
          <div className="space-y-3 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-red-950/80 border border-red-500/60 animate-spin flex items-center justify-center text-red-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>CALIBRATING CRIME PINBOARD & EXHIBITS...</div>
          </div>
        </div>
      }>
        <InvestigationBoardContainer />
      </Suspense>
    </main>
  );
}
