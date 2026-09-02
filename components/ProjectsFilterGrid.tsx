'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Terminal, X } from 'lucide-react';
import type { ClueItem } from '@/lib/investigation-data';

interface ProjectsFilterGridProps {
  clues: ClueItem[];
}

/**
 * Client-side filterable project grid.
 * Keeps `/projects?q=<term>` truthful for the WebSite SearchAction structured
 * data: the query mirrors into the URL via replaceState (no re-navigation) and
 * is restored on mount so shared/search-result links land pre-filtered.
 */
const DOMAIN_FILTERS = [
  { id: 'all', label: 'ALL FILES' },
  { id: 'enterprise', label: 'ENTERPRISE & SAAS', match: ['crm', 'xeno', 'peopleos', 'ledger', 'saas', 'form builder', 'schema', 'helios', 'thesci', 'hrms', 'trustsign', 'enterprise'] },
  { id: 'edtech', label: 'EDTECH & EXAMS', match: ['edtech', 'exam', 'tutor', 'cbse', 'bitsat', 'neet', 'nm foundation'] },
  { id: 'automation', label: 'AUTOMATION & DEVOPS', match: ['automation', 'devops', 'vps', 'caddy', 'docker', 'workers', 'whatsapp', 'helios engine', 'powerdns'] },
  { id: 'realtime', label: 'REAL-TIME & SYNC', match: ['realtime', 'websocket', 'collaboration', 'periskope', 'chat'] },
  { id: 'mobile', label: 'MOBILE APPS', match: ['android', 'flutter', 'mobile', 'socialbay', 'periodic table', 'dart', 'java'] },
];

export function ProjectsFilterGrid({ clues }: ProjectsFilterGridProps) {
  const [query, setQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  // Restore ?q= from a shared/opened URL after hydration.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('q');
    if (initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(initial);
    }
  }, []);

  const filtered = useMemo(() => {
    let result = clues;

    // Apply domain category filter
    if (selectedDomain !== 'all') {
      const filterConfig = DOMAIN_FILTERS.find(f => f.id === selectedDomain);
      if (filterConfig && filterConfig.match) {
        result = result.filter(clue => {
          const searchable = `${clue.title} ${clue.subtitle} ${clue.summary} ${clue.tags.join(' ')}`.toLowerCase();
          return filterConfig.match.some(m => searchable.includes(m));
        });
      }
    }

    // Apply search query filter
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        clue =>
          clue.title.toLowerCase().includes(q) ||
          clue.subtitle.toLowerCase().includes(q) ||
          clue.summary.toLowerCase().includes(q) ||
          clue.tags.some(tag => tag.toLowerCase().includes(q)),
      );
    }

    const FEATURED_IDS = [
      'dossier-helios-engine',
      'dossier-thesci-company',
      'dossier-helios-crm',
      'dossier-helios-hrms',
      'dossier-helios-pm',
      'dossier-helios-support',
      'dossier-trustsign',
    ];

    return [
      ...result.filter(c => FEATURED_IDS.includes(c.id)),
      ...result.filter(c => !FEATURED_IDS.includes(c.id)),
    ];
  }, [clues, query, selectedDomain]);

  const applyQuery = (value: string) => {
    setQuery(value);
    const trimmed = value.trim();
    const url = trimmed ? `/projects?q=${encodeURIComponent(trimmed)}` : '/projects';
    window.history.replaceState(null, '', url);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills & Filter bar */}
      <div className="space-y-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {DOMAIN_FILTERS.map(filter => {
            const isActive = selectedDomain === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedDomain(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-red-600 text-white font-bold shadow-md shadow-red-950/50'
                    : 'bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-neutral-900/80 border border-neutral-800 focus-within:border-red-500/60 rounded-lg px-4 py-2.5 transition-colors">
          <Search className="w-4 h-4 text-neutral-500 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={e => applyQuery(e.target.value)}
            placeholder="Filter case files by technology, name or keyword…"
            aria-label="Filter project case files"
            className="flex-1 bg-transparent outline-none text-xs font-mono text-white placeholder:text-neutral-600"
          />
          {query && (
            <button
              onClick={() => applyQuery('')}
              className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
              title="Clear filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[10px] font-mono text-neutral-500 shrink-0">
            {filtered.length}/{clues.length} FILES
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(project => (
          <article
            key={project.id}
            className="p-6 rounded-xl bg-[#111111] border border-neutral-800 hover:border-red-500/50 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] text-red-400 font-bold tracking-wider uppercase block">
                    {project.stamp || 'VERIFIED ARTIFACT'}
                  </span>
                  <h2 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors mt-0.5">
                    {project.title.replace('CASE FILE: ', '').replace('CLUE: ', '').replace('NOTE: ', '').replace('EVIDENCE 08: ', '')}
                  </h2>
                  <p className="text-xs text-neutral-400 font-sans">
                    {project.subtitle}
                  </p>
                </div>
                <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-400 shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                {project.summary}
              </p>

              {project.metrics && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2 rounded bg-neutral-900/60 border border-neutral-800">
                      <div className="text-[10px] text-neutral-500 uppercase">{m.label}</div>
                      <div className="text-xs font-bold text-neutral-200">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Read More Link */}
            <div className="pt-5 mt-5 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-[10px] text-neutral-500">
                EXHIBIT: #{project.id}
              </span>
              {project.slug ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold transition-colors"
                >
                  <span>INSPECT CASE FILE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  href="/investigation"
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold transition-colors"
                >
                  <span>VIEW ON PINBOARD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full p-8 rounded-xl bg-neutral-900/60 border border-dashed border-neutral-700 text-center space-y-2">
            <p className="text-sm font-bold text-white tracking-wider">NO MATCHING CASE FILES</p>
            <p className="text-xs text-neutral-400 font-sans">
              Adjust the keyword to widen the evidence net.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
