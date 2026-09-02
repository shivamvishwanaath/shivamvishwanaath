import { MetadataRoute } from 'next';
import { INITIAL_CLUES } from '@/lib/investigation-data';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/seo-content';

export default function sitemap(): MetadataRoute.Sitemap {
  // Freshness signal: generated at build time (was hard-coded 2025-08-20)
  const RELEASE_DATE = new Date().toISOString().slice(0, 10);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.90,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/education`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${SITE_URL}/community`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/investigation`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
  ];

  // Blog listing + published case notes (drafts are excluded by lib/blog)
  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...getAllPosts().map(post => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.80,
    })),
  ];

  // Dynamic project detail pages
  const projectSlugs = INITIAL_CLUES
    .filter(clue => clue.slug && (clue.category === 'projects' || clue.pageCategory === 'projects'))
    .map(clue => ({
      url: `${SITE_URL}/projects/${clue.slug}`,
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.90,
    }));

  return [...staticPages, ...blogEntries, ...projectSlugs];
}
