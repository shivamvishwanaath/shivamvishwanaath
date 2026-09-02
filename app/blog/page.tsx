import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, Rss, FolderLock, Terminal } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/schemas';
import { SITE_URL } from '@/lib/seo-content';

export const metadata: Metadata = {
  title: 'Blog — Field Notes & Articles',
  description:
    'Technical field notes by Shivam Vishwanaath: full-stack architecture breakdowns, Ubuntu VPS DevOps war stories, lessons from production EdTech platforms, and current engineering trends.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
  },
  openGraph: {
    title: 'Blog — Field Notes & Articles',
    description:
      'Architecture breakdowns, DevOps stories and trend analysis by Tech Lead Shivam Vishwanaath.',
    url: `${SITE_URL}/blog`,
    images: [{ url: `/images/shivam-vishwanaath-og.jpg`, width: 1200, height: 630 }],
  },
};

export default function BlogListingPage() {
  const posts = getAllPosts();
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ];

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-300">Blog</span>
      </nav>

      {/* Header Docket */}
      <header className="relative p-6 sm:p-8 rounded-2xl bg-[#111111] border border-neutral-800 shadow-xl overflow-hidden space-y-3">
        <div className="h-1.5 w-full absolute top-0 left-0 bg-[repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e_10px,#000_10px,#000_20px)]" />
        <div className="pt-1 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            <Newspaper className="w-3.5 h-3.5" />
            <span>FIELD NOTES // DECLASSIFIED ENGINEERING RECORDS</span>
          </span>
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-amber-300 hover:border-amber-500/50 text-xs transition-colors"
            title="RSS feed"
          >
            <Rss className="w-3 h-3" />
            RSS
          </a>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          The Case Notes Journal
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-3xl leading-relaxed">
          Architecture teardowns, production incident debriefs and trend analysis from
          Tech Lead Shivam Vishwanaath — written the way case files should be: evidence-first.
        </p>
      </header>

      {/* Articles Grid / Empty State */}
      {posts.length === 0 ? (
        <div className="mt-10 p-10 rounded-2xl bg-neutral-900/60 border border-dashed border-neutral-700 text-center space-y-3">
          <Terminal className="w-8 h-8 mx-auto text-red-500" />
          <p className="text-sm font-bold text-white tracking-wider">NO PUBLIC RECORDS YET</p>
          <p className="text-xs text-neutral-400 font-sans">
            The first case file is being drafted. Meanwhile, inspect the verified evidence below.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 mt-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md"
          >
            <FolderLock className="w-4 h-4" />
            <span>BROWSE PROJECT CASE FILES</span>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}