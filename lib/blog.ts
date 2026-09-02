import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Blog domain layer.
 * Articles live as Markdown files in `content/blog/*.md` and are read from disk
 * at BUILD time only — the site stays 100% static (no backend, no DB).
 */

export type BlogCategory = 'expertise' | 'experience' | 'projects' | 'trends';

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  category: BlogCategory;
  draft: boolean;
  seoTitle?: string;
  seoDescription?: string;
  /** Project case-file slugs to deep-link from the article (internal linking). */
  relatedProjects?: string[];
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  contentMarkdown: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const WORDS_PER_MINUTE = 200;

function parsePostFile(fileName: string): BlogPost | null {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);

  const slug = fileName.replace(/\.mdx?$/, '');
  const title = typeof data.title === 'string' ? data.title : '';
  const excerpt =
    typeof data.excerpt === 'string'
      ? data.excerpt
      : typeof data.description === 'string'
        ? data.description
        : '';

  // Skip malformed entries instead of breaking the build.
  if (!title || !excerpt) return null;

  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title,
    excerpt,
    date:
      typeof data.date === 'string'
        ? data.date
        : new Date(0).toISOString().slice(0, 10),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: (typeof data.category === 'string' ? data.category : 'expertise') as BlogCategory,
    draft: Boolean(data.draft),
    seoTitle: typeof data.seoTitle === 'string' ? data.seoTitle : undefined,
    seoDescription:
      typeof data.seoDescription === 'string' ? data.seoDescription : undefined,
    relatedProjects: Array.isArray(data.relatedProjects)
      ? data.relatedProjects.map(String)
      : undefined,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    contentMarkdown: content,
  };
}

/** Newest first. Drafts excluded unless explicitly requested. */
export function getAllPosts(includeDrafts = false): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => /\.mdx?$/.test(f))
    .map(parsePostFile)
    .filter((p): p is BlogPost => p !== null)
    .filter(p => includeDrafts || !p.draft)
    .sort((a, b) =>
      a.date === b.date ? b.slug.localeCompare(a.slug) : a.date < b.date ? 1 : -1,
    );
}

export function getPostBySlug(slug: string, includeDrafts = false): BlogPost | null {
  return (
    getAllPosts(true).find(p => p.slug === slug && (includeDrafts || !p.draft)) ??
    null
  );
}