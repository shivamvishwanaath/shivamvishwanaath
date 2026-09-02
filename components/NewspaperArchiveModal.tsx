'use client';

import React, { useState } from 'react';
import { X, Newspaper, ArrowUpRight, ShieldAlert, FileSearch } from 'lucide-react';

interface HeadlineRecord {
  date: string;
  source: string;
  headline: string;
  summary: string;
  keyMetric: string;
  category: string;
  clueId: string;
  caseExhibit: string;
}

const HEADLINES_DATA: HeadlineRecord[] = [
  {
    date: 'MAY 2025 – PRESENT',
    source: 'THE TECH DISPATCH // BHUBANESWAR',
    headline: 'SHIVAM VISHWANAATH APPOINTED TECH LEAD AT TRANS ED — SCALING 3 MAJOR EXAM PLATFORMS',
    summary: 'Directing the complete engineering roadmap for CBSEForum (Classes 1–12), BITSATForum with smart weak-area detection algorithms, and Tutors Forum with automated billing pipelines.',
    keyMetric: 'Tech Lead / 3 Platforms',
    category: 'Architecture',
    clueId: 'headline-transed',
    caseExhibit: 'EXHIBIT #P-01'
  },
  {
    date: '2022 – 2025',
    source: 'THE HUMANITARIAN GAZETTE',
    headline: 'RECORD 250+ BLOOD UNITS MOBILIZED IN SINGLE DAY UNDER NSS EVENT LEADERSHIP',
    summary: 'Promoted from Joint Secretary to Event Head at NSS, coordinating a record-setting mega blood donation drive and organizing the Village Education Program teaching 130+ underprivileged children.',
    keyMetric: '250+ Blood Units / 130+ Kids',
    category: 'Social Impact',
    clueId: 'headline-blood-drive',
    caseExhibit: 'EXHIBIT #P-02'
  },
  {
    date: '2021 – 2024',
    source: 'GOOGLE PLAY RADAR',
    headline: 'PERIODIC TABLE ANDROID APP REACHES 70+ FIVE-STAR RATINGS & 100+ DOWNLOADS',
    summary: 'Built from scratch with 100+ hours of Java/XML Android engineering, creating a fast offline chemistry utility with spotless 5.0 user reviews.',
    keyMetric: '70+ 5-Star Reviews',
    category: 'Mobile Dev',
    clueId: 'sticky-periodic-table',
    caseExhibit: 'EXHIBIT #P-03'
  },
  {
    date: 'MAY 2024 – JULY 2024',
    source: 'EDTECH CHRONICLE',
    headline: 'NM FOUNDATION UNVEILS JEE/NEET DUAL PORTAL FOR STUDENTS & FACULTY',
    summary: 'Engineered cross-platform exam simulation with custom test generation by difficulty/subject and real-time national percentile rank calculations.',
    keyMetric: 'Dual Portals / Cross-Platform',
    category: 'Full Stack',
    clueId: 'polaroid-nm-foundation',
    caseExhibit: 'EXHIBIT #P-04'
  },
  {
    date: 'FEB 2023 – MAR 2023',
    source: 'CAMPUS TRIBUNE',
    headline: 'JOHARNITE FEST PORTAL RECORDS 99% UPTIME FOR 9.3K ATTENDEE CROWD',
    summary: 'Handled massive surge traffic during live concert announcements with zero server drops using Angular, Tailwind CSS, and Firebase realtime architecture.',
    keyMetric: '9.3K Audience / 99% Uptime',
    category: 'High Traffic',
    clueId: 'polaroid-johar-qeds',
    caseExhibit: 'EXHIBIT #P-05'
  },
  {
    date: '2022 – 2025',
    source: 'ENVIRONMENTAL INTELLIGENCE',
    headline: 'EPAC PRESIDENCY POWERS 35+ VOLUNTEER NETWORK & 100+ ALUMNI PORTAL',
    summary: 'Managed college fest sustainability initiatives and created the official React/Tailwind web platform for student advocates and alumni.',
    keyMetric: '35+ Volunteers / 100+ Alumni',
    category: 'Governance',
    clueId: 'dossier-epac',
    caseExhibit: 'EXHIBIT #P-06'
  }
];

interface NewspaperArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectClue: (id: string) => void;
}

export const NewspaperArchiveModal: React.FC<NewspaperArchiveModalProps> = ({
  isOpen,
  onClose,
  onSelectClue
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const filteredHeadlines = HEADLINES_DATA.filter(h => 
    h.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 touch-auto"
      onTouchStart={e => e.stopPropagation()}
      onTouchMove={e => e.stopPropagation()}
      onTouchEnd={e => e.stopPropagation()}
    >
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        onMouseDown={e => e.stopPropagation()}
        onMouseMove={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col rounded-xl sm:rounded-2xl bg-[#121212] border border-neutral-800 shadow-2xl text-[#e2e2e2] overflow-hidden z-10"
      >
        {/* Crime Tape Strip */}
        <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e_10px,#000_10px,#000_20px)] shrink-0" />

        {/* Header */}
        <div className="px-3.5 sm:px-6 py-3 sm:py-4 border-b border-neutral-800 bg-[#0d0d0d]/95 backdrop-blur-md flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-1.5 sm:p-2 rounded bg-red-950/80 border border-red-500/50 text-red-400 shrink-0">
              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xs sm:text-base font-mono font-bold tracking-wide text-white uppercase truncate">
                  MICROFILM & PRESS ARCHIVE
                </h2>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-950/60 border border-red-600/40 text-red-400 font-bold shrink-0">
                  DEPT. ARCHIVES
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-neutral-400 truncate">
                Confiscated public press broadcasts, articles & verified milestones
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center shrink-0 active:scale-95"
            title="Close archive"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-3.5 sm:px-6 py-2 sm:py-2.5 bg-[#0a0a0a] border-b border-neutral-800 flex items-center gap-2.5 shrink-0">
          <FileSearch className="w-4 h-4 text-red-500 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter clippings by keyword (e.g. 'Tech Lead', 'Blood', 'Android')..."
            className="bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-neutral-500 w-full"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-[10px] font-mono text-neutral-400 hover:text-white shrink-0 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Newspaper Grid */}
        <div 
          className="p-3.5 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1 min-h-0 overscroll-contain touch-auto max-h-[calc(92dvh-180px)] sm:max-h-[calc(90vh-200px)]"
          onTouchStart={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          {filteredHeadlines.map((h, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-red-500/60 hover:bg-neutral-800/90 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 group cursor-pointer shadow-md active:scale-[0.99]"
              onClick={() => {
                onSelectClue(h.clueId);
                onClose();
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono border-b border-neutral-800 pb-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-red-950/70 border border-red-500/40 text-red-400 font-bold">
                    {h.caseExhibit}
                  </span>
                  <span className="text-neutral-400">{h.date}</span>
                </div>

                <div className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  PUBLICATION: {h.source}
                </div>

                <h3 className="font-mono font-bold text-xs sm:text-base text-white group-hover:text-red-300 transition-colors leading-snug break-words">
                  {h.headline}
                </h3>

                <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                  {h.summary}
                </p>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-neutral-800/90 flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-300 font-bold text-[10px] sm:text-xs">
                  ★ {h.keyMetric}
                </span>

                <span className="flex items-center gap-1 text-neutral-400 group-hover:text-red-400 transition-colors text-[10px] sm:text-xs">
                  <span>Inspect on Pinboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 border-t border-neutral-800 bg-[#0d0d0d]/95 backdrop-blur-md flex items-center justify-between gap-2 text-xs font-mono text-neutral-400 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">ARCHIVES // EVIDENCE SECURED</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs transition-colors border border-neutral-700 shrink-0"
          >
            Close Archive
          </button>
        </div>
      </div>
    </div>
  );
};
