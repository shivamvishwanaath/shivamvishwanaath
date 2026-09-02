'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Github, 
  Instagram, 
  Twitter, 
  Mail, 
  ShieldAlert, 
  Terminal,
  Heart
} from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/seo-content';

export const SiteFooter: React.FC = () => {
  const pathname = usePathname();

  if (pathname === '/investigation') {
    return null;
  }

  return (
    <footer className="w-full bg-[#080808] border-t border-neutral-900 text-neutral-400 font-mono text-xs py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-500 font-bold text-[10px]">
              SV
            </div>
            <span className="font-bold text-white tracking-wider">
              SHIVAM VISHWANAATH
            </span>
          </div>
          <p className="text-neutral-400 font-sans text-xs max-w-sm leading-relaxed">
            Founder &amp; CEO of The SCI SolCielo Innovacion Pvt. Ltd. Architecting the Helios Enterprise Cloud Platform and resilient Linux VPS cloud infrastructure.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="GitHub Repositories — Shivam Vishwanaath"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Instagram Channel — Shivam Vishwanaath"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="X (Twitter) Feed — Shivam Vishwanaath"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.emailHref}
              className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Direct Email — Shivam Vishwanaath"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Case Navigation Links */}
        <div className="space-y-2">
          <div className="font-bold text-neutral-300 uppercase tracking-wider text-[11px]">
            CASE DOSSIER
          </div>
          <ul className="space-y-1.5 text-xs font-sans">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Shivam Vishwanaath
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white transition-colors">
                Projects & Portals
              </Link>
            </li>
            <li>
              <Link href="/experience" className="hover:text-white transition-colors">
                Professional Experience
              </Link>
            </li>
            <li>
              <Link href="/skills" className="hover:text-white transition-colors">
                Tech Stack & Arsenal
              </Link>
            </li>
            <li>
              <Link href="/education" className="hover:text-white transition-colors">
                Academic Pedigree
              </Link>
            </li>
            <li>
              <Link href="/community" className="hover:text-white transition-colors">
                Community Leadership
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog — Field Notes & Articles
              </Link>
            </li>
          </ul>
        </div>

        {/* Tactical Links & Verification */}
        <div className="space-y-2">
          <div className="font-bold text-neutral-300 uppercase tracking-wider text-[11px]">
            EXPERIENCES
          </div>
          <ul className="space-y-1.5 text-xs font-sans">
            <li>
              <Link href="/investigation" className="text-red-400 hover:text-red-300 transition-colors font-mono">
                Interactive Pinboard →
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Direct Contact Coordinates
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Crawlable XML Sitemap
              </Link>
            </li>
            <li>
              <Link href="/robots.txt" className="hover:text-white transition-colors">
                Robots.txt Indexing Directive
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
        <div suppressHydrationWarning>
          © 2025 Shivam Vishwanaath. All rights reserved. Hosted on Ubuntu VPS with Caddy.
        </div>
        <div className="flex items-center gap-1 font-mono">
          <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
          <span>CANONICAL: SHIVAMVISHWANAATH.DEV</span>
        </div>
      </div>
    </footer>
  );
};
