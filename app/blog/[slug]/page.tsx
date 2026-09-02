import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, FolderLock, Mail, Tag } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { INITIAL_CLUES, ClueItem } from '@/lib/investigation-data';
import { MarkdownArticle } from '@/components/MarkdownArticle';
import { JsonLd } from '@/components/JsonLd';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/schemas';
import { SITE_URL } from '@/lib/seo-content';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Case Note Not Found' };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: { absolute: title.length > 70 ? `${title.slice(0, 67)}…` : title },
    description,
    keywords: ['Shivam Vishwanaath', ...post.tags],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/images/shivam-vishwanaath-og.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const relatedProjectClues = (post.relatedProjects ?? [])
    .map(s => INITIAL_CLUES.find(c => c.slug === s))
    .filter((c): c is ClueItem => Boolean(c));

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={getArticleSchema({
          title: post.seoTitle || post.title,
          description: post.seoDescription || post.excerpt,
          url: `${SITE_URL}/blog/${post.slug}`,
          tags: post.tags,
          datePublished: post.date,
        })}
      />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-red-400 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-neutral-300 truncate max-w-[16rem] sm:max-w-sm">{post.title}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="relative rounded-2xl bg-[#111111] border border-neutral-800 shadow-xl overflow-hidden p-6 sm:p-8 space-y-4">
          <div className="h-1.5 w-full absolute top-0 left-0 bg-[repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e_10px,#000_10px,#000_20px)]" />

          <div className="pt-1 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
              {post.category}
            </span>
            {post.draft && (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/50">
                DRAFT PREVIEW
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              {post.readingMinutes} min read
            </span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Body */}
        <div className="mt-8">
          <MarkdownArticle content={post.contentMarkdown} />
        </div>

        {/* Related project case files */}
        {relatedProjectClues.length > 0 && (
          <section className="mt-12 p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4">
            <h2 className="text-xs font-bold text-red-400 uppercase tracking-wider">
              RELATED EVIDENCE // PROJECT CASE FILES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedProjectClues.map(clue => (
                <Link
                  key={clue.id}
                  href={`/projects/${clue.slug}`}
                  className="p-4 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors space-y-1 group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors flex items-center gap-2">
                    <FolderLock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{clue.title.replace(/^CASE FILE:\s*/i, '')}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans line-clamp-2">{clue.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom navigation */}
        <footer className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs transition-colors border border-neutral-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ALL CASE NOTES</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>DISCUSS THIS WITH SHIVAM</span>
          </Link>
        </footer>
      </article>
    </main>
  );
}