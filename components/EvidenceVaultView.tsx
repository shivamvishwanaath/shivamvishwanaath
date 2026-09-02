'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Tag, 
  ExternalLink, 
  Sparkles, 
  ShieldAlert, 
  Code2, 
  Server, 
  Cpu, 
  GraduationCap, 
  Users, 
  Newspaper,
  Terminal,
  FileSearch,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_CLUES, ClueCategory, ClueItem } from '@/lib/investigation-data';

interface EvidenceVaultViewProps {
  onSelectClue: (clueId: string) => void;
  boardTheme?: 'dark' | 'light';
}

export const EvidenceVaultView: React.FC<EvidenceVaultViewProps> = ({
  onSelectClue,
  boardTheme = 'dark'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'ALL EVIDENCE (10)', icon: Layers },
    { id: 'projects', label: 'SYSTEMS & APPS (4)', icon: Code2 },
    { id: 'experience', label: 'PRODUCTION TRACK (2)', icon: Server },
    { id: 'skills', label: 'TECH ARSENAL (1)', icon: Cpu },
    { id: 'leadership', label: 'COMMUNITY & IMPACT (2)', icon: Users },
    { id: 'education', label: 'ACADEMIC CREDENTIALS (1)', icon: GraduationCap },
  ];

  const filteredClues = INITIAL_CLUES.filter(clue => {
    const matchesCategory = activeCategory === 'all' || clue.category === activeCategory;
    const matchesSearch = 
      clue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clue.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clue.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Docket */}
      <div className={`p-6 sm:p-8 rounded-xl border shadow-2xl relative overflow-hidden ${
        boardTheme === 'light'
          ? 'bg-white border-neutral-200 shadow-neutral-100'
          : 'bg-[#121212] border-neutral-800'
      }`}>
        <div 
          style={{
            backgroundImage: boardTheme === 'light'
              ? 'repeating-linear-gradient(45deg,#dc2626,#dc2626 10px,#f5f1e8 10px,#f5f1e8 20px)'
              : 'repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e 10px,#000 10px,#000 20px)'
          }}
          className="h-1.5 w-full absolute top-0 left-0"
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded border font-mono text-[10px] font-bold ${
                boardTheme === 'light'
                  ? 'bg-red-55/10 border-red-500/30 text-red-650'
                  : 'bg-red-950/80 border-red-500/50 text-red-400'
              }`}>
                EVIDENCE REPOSITORY // CENTRAL RECORD
              </span>
              <span className={`font-mono text-xs ${
                boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                10 VERIFIED FORENSIC ARTIFACTS
              </span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight ${
              boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
            }`}>
              THE MASTER EVIDENCE & SKILLS VAULT
            </h1>
            <p className={`text-sm font-sans mt-1 ${
              boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
            }`}>
              Filter, query, and audit every technical artifact, architectural blueprint, and leadership credential tied to Subject Shivam Vishwanaath.
            </p>
          </div>

          <div className={`p-3 rounded-lg border text-xs font-mono flex items-center gap-2 shrink-0 ${
            boardTheme === 'light'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-neutral-900 border-neutral-800 text-neutral-300'
          }`}>
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>INTEGRITY CHECK: 100% VERIFIED</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className={`mt-6 pt-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
          boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                      : boardTheme === 'light'
                      ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 border border-neutral-300'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border w-full sm:w-64 ${
            boardTheme === 'light'
              ? 'bg-white border-neutral-300'
              : 'bg-neutral-900 border-neutral-800'
          }`}>
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tag, tech..."
              className={`bg-transparent border-none outline-none text-xs font-mono w-full placeholder:text-neutral-400 ${
                boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Grid of Evidence Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClues.map((clue) => (
          <div
            key={clue.id}
            onClick={() => onSelectClue(clue.id)}
            className={`p-5 rounded-xl border hover:border-red-500/60 transition-all flex flex-col justify-between space-y-4 group cursor-pointer shadow-lg relative overflow-hidden ${
              boardTheme === 'light'
                ? 'bg-white border-neutral-200 hover:bg-red-55/10 shadow-neutral-100'
                : 'bg-[#121212] border-neutral-800 hover:bg-neutral-900/80'
            }`}
          >
            {/* Top Badge & Stamp */}
            <div>
              <div className={`flex items-center justify-between border-b pb-2.5 mb-3 ${
                boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800'
              }`}>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${
                  boardTheme === 'light'
                    ? 'bg-red-55/10 border-red-500/30 text-red-650'
                    : 'bg-red-950/80 border-red-500/40 text-red-400'
                }`}>
                  {clue.stamp || 'CONFIDENTIAL'}
                </span>
                <span className={`text-[10px] font-mono ${
                  boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  {clue.type.toUpperCase()}
                </span>
              </div>

              <h2 className={`font-mono font-bold text-base transition-colors leading-snug ${
                boardTheme === 'light'
                  ? 'text-neutral-900 group-hover:text-red-600'
                  : 'text-white group-hover:text-red-300'
              }`}>
                {clue.title}
              </h2>
              <p className={`text-xs font-mono mt-1 mb-2.5 ${
                boardTheme === 'light' ? 'text-neutral-550' : 'text-neutral-400'
              }`}>
                {clue.subtitle}
              </p>

              <p className={`text-xs font-sans line-clamp-3 leading-relaxed ${
                boardTheme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
              }`}>
                {clue.summary}
              </p>
            </div>

            {/* Tags & Inspection CTA */}
            <div className={`space-y-3 pt-3 border-t ${
              boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800/80'
            }`}>
              <div className="flex flex-wrap gap-1">
                {clue.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                      boardTheme === 'light'
                        ? 'bg-neutral-100 border-neutral-300 text-neutral-500'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className={`flex items-center justify-between text-xs font-mono transition-colors ${
                boardTheme === 'light'
                  ? 'text-neutral-500 group-hover:text-red-650'
                  : 'text-neutral-400 group-hover:text-red-400'
              }`}>
                <span>OPEN FORENSIC FILE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
