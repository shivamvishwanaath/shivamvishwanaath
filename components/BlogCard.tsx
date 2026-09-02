import Link from 'next/link';
import { ArrowRight, Calendar, Clock, FileText } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/blog';

const CATEGORY_STYLES: Record<string, string> = {
  expertise: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300',
  experience: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
  projects: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
  trends: 'bg-purple-950/60 border-purple-500/40 text-purple-300',
};

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group relative flex flex-col justify-between rounded-xl bg-[#121212] border border-neutral-800 hover:border-red-500/60 transition-all shadow-lg overflow-hidden">
      {/* Crime tape strip */}
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e_10px,#000_10px,#000_20px)] shrink-0" />

      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 p-5 space-y-3">
        {/* Badges row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold uppercase tracking-wider ${
              CATEGORY_STYLES[post.category] ?? 'bg-neutral-900 border-neutral-700 text-neutral-400'
            }`}
          >
            {post.category}
          </span>
          <span className="text-[10px] font-mono text-neutral-500 uppercase">
            CASE NOTE #{post.slug.slice(0, 12)}
          </span>
        </div>

        {/* Title + excerpt */}
        <div className="space-y-2">
          <h2 className="font-mono font-bold text-base text-white group-hover:text-red-300 transition-colors leading-snug">
            {post.title}
          </h2>
          <p className="text-xs text-neutral-300 font-sans leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-400 pt-1">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-red-400" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-red-400" />
            {post.readingMinutes} min read
          </span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="pt-3 mt-auto border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400 group-hover:text-red-400 transition-colors flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            OPEN CASE NOTE
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </article>
  );
}