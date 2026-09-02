'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  Layers, 
  Award,
  ArrowRight,
  Home,
  Sun,
  Moon
} from 'lucide-react';
import { CaseActId, CASE_ACTS } from '@/lib/story-acts';

interface CaseActSelectorProps {
  currentView: CaseActId;
  onSelectView: (view: CaseActId) => void;
  completedActs: string[];
  boardTheme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const CaseActSelector: React.FC<CaseActSelectorProps> = ({
  currentView,
  onSelectView,
  completedActs,
  boardTheme = 'dark',
  onToggleTheme
}) => {
  const [metaOpen, setMetaOpen] = useState(false);

  const actsList: Array<{ id: CaseActId; label: string; sub: string; actNo: string; shortLabel: string }> = [
    { id: 'act-1', label: 'GENESIS & MOBILE', sub: '2020 – 2022', actNo: 'ACT I', shortLabel: 'Genesis' },
    { id: 'act-2', label: 'CAMPUS SURGE & LEAD', sub: '2022 – 2024', actNo: 'ACT II', shortLabel: 'Campus' },
    { id: 'act-3', label: 'TECH LEAD MASTERMIND', sub: '2024 – PRESENT', actNo: 'ACT III', shortLabel: 'Tech Lead' },
    { id: 'act-4', label: 'FOUNDER & CEO', sub: '2026 – PRESENT', actNo: 'ACT IV', shortLabel: 'Founder' },
  ];

  const currentAct = (currentView === 'act-1' || currentView === 'act-2' || currentView === 'act-3' || currentView === 'act-4')
    ? CASE_ACTS[currentView]
    : null;

  return (
    <>
      {/* ========================================================================= */}
      {/* 📱 MOBILE & TABLET HORIZONTAL HEADER (lg:hidden)                           */}
      {/* ========================================================================= */}
      {/* 📱 MOBILE & TABLET HORIZONTAL HEADER (lg:hidden) */}
      <header className={`w-full border-b z-40 relative backdrop-blur-md lg:hidden shrink-0 select-none transition-colors duration-300 ${
        boardTheme === 'light'
          ? 'bg-white/98 border-neutral-200 text-neutral-800'
          : 'bg-[#0c0c0c]/98 border-neutral-800/90 text-[#e2e2e2]'
      }`}>
        {/* Crime Scene Top Bar Strip */}
        <div className="h-0.5 w-full bg-[repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e_10px,#000_10px,#000_20px)]" />

        <div className="flex items-center justify-between h-[46px] px-2 gap-2">
          {/* Collapsed Brand Icon - Taps to toggle metadata */}
          <button
            onClick={() => setMetaOpen(!metaOpen)}
            className={`flex items-center justify-center w-8 h-8 rounded border transition-colors shrink-0 ${
              metaOpen
                ? 'bg-red-600 border-red-500 text-white shadow-md shadow-red-600/40'
                : boardTheme === 'light'
                ? 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:border-neutral-400'
                : 'bg-red-950/80 border-red-500/40 text-red-400 hover:border-red-500/60'
            }`}
            title="Toggle Case Metadata Drawer"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Horizontally Scrollable Tab strip */}
          <nav className="flex items-center gap-1.5 overflow-x-auto dossier-scrollbar flex-grow h-full py-1">
            {actsList.map((act) => {
              const isActive = currentView === act.id;
              const isCompleted = completedActs.includes(act.id);

              return (
                <button
                  key={act.id}
                  onClick={() => {
                    onSelectView(act.id);
                    setMetaOpen(false);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono text-[11px] font-bold transition-all shrink-0 h-[32px] ${
                    isActive
                      ? 'bg-red-600 border-red-500 text-white shadow-md shadow-red-600/20'
                      : boardTheme === 'light'
                      ? 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                      : 'bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className={`text-[9px] ${isActive ? 'text-white/90' : 'text-red-400/90'}`}>
                    {act.actNo}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className={`w-2.5 h-2.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  )}
                  <span>{act.shortLabel}</span>
                </button>
              );
            })}

            <div className="h-4 w-px bg-neutral-800 shrink-0 mx-0.5" />

            <button
              onClick={() => {
                onSelectView('incident-log');
                setMetaOpen(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono text-[11px] font-bold transition-all shrink-0 h-[32px] ${
                currentView === 'incident-log'
                  ? 'bg-amber-600/90 border-amber-500 text-white shadow-md'
                  : boardTheme === 'light'
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>LOG</span>
            </button>

            <button
              onClick={() => {
                onSelectView('evidence-vault');
                setMetaOpen(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono text-[11px] font-bold transition-all shrink-0 h-[32px] ${
                currentView === 'evidence-vault'
                  ? 'bg-blue-600/90 border-blue-500 text-white shadow-md'
                  : boardTheme === 'light'
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>VAULT</span>
            </button>

            <button
              onClick={() => {
                onSelectView('verdict');
                setMetaOpen(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono text-[11px] font-bold transition-all shrink-0 h-[32px] ${
                currentView === 'verdict'
                  ? 'bg-emerald-600/90 border-emerald-500 text-white shadow-md'
                  : boardTheme === 'light'
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  : 'bg-neutral-900 border-neutral-800 text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Award className="w-3 h-3" />
              <span>VERDICT</span>
            </button>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`flex items-center justify-center w-8 h-8 rounded border transition-colors shrink-0 ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={`Switch to ${boardTheme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {boardTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <Link
            href="/"
            className={`flex items-center justify-center w-8 h-8 rounded border transition-colors shrink-0 ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
            title="Back to Portfolio Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </div>

        {/* Metadata Sliding Drawer (only on mobile when metaOpen is true) */}
        {metaOpen && (
          <div className={`px-4 py-3 border-t text-xs font-mono space-y-2 animate-in slide-in-from-top duration-200 ${
            boardTheme === 'light'
              ? 'bg-neutral-50 border-neutral-200 text-neutral-800'
              : 'bg-[#0d0d0d] border-neutral-800/80 text-neutral-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 text-[10px]">CASE FILE</span>
              <span className={`font-bold tracking-wider ${boardTheme === 'light' ? 'text-neutral-900' : 'text-white'}`}>CASE #7702-SV // SHIVAM VISHWANAATH</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 text-[10px]">STATUS</span>
              <span className={`font-bold uppercase text-[10px] px-1.5 py-0.5 rounded border ${
                boardTheme === 'light'
                  ? 'text-red-650 bg-red-55/10 border-red-500/30'
                  : 'text-red-400 bg-red-950/80 border-red-500/30'
              }`}>ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 text-[10px]">PROGRESS</span>
              <span className="text-emerald-400 font-bold">CLEARED: {completedActs.length}/4 ACTS</span>
            </div>
            {currentAct && (
              <div className="pt-2 border-t border-neutral-800/80">
                <div className="text-[10px] text-neutral-500 font-bold">ACTIVE OBJECTIVE:</div>
                <div className="text-red-400 font-bold uppercase mt-0.5">{currentAct.codename}</div>
                <p className="text-[10px] text-neutral-400 mt-1 leading-normal font-sans">{currentAct.briefing}</p>
              </div>
            )}
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 🖥️ DESKTOP LEFT FLOATING DOSSIER SIDEBAR (hidden lg:flex)                 */}
      {/* ========================================================================= */}
      <aside className={`hidden lg:flex absolute left-4 top-4 bottom-4 w-72 border rounded-2xl z-40 flex-col p-5 backdrop-blur-md transition-all duration-300 justify-between ${
        boardTheme === 'light'
          ? 'bg-white/95 border-neutral-200 text-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
          : 'bg-[#0c0c0c]/95 border-neutral-800/80 text-[#e2e2e2] shadow-[0_20px_50px_rgba(0,0,0,0.95)]'
      }`}>
        {/* Top: Branding & Classification */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border shrink-0 ${
              boardTheme === 'light'
                ? 'bg-red-55/10 border-red-500/30 text-red-650'
                : 'bg-red-950/80 border border-red-500/50 text-red-400'
            }`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-[10px] font-mono font-bold uppercase tracking-widest leading-none ${
                boardTheme === 'light' ? 'text-red-650' : 'text-red-400'
              }`}>CASE #7702-SV</h2>
              <h1 className={`font-mono text-[13px] font-bold tracking-tight leading-tight mt-1 ${boardTheme === 'light' ? 'text-neutral-900' : 'text-white'}`}>SHIVAM VISHWANAATH</h1>
            </div>
          </div>
          
          <div className={`h-px ${boardTheme === 'light' ? 'bg-neutral-200' : 'bg-neutral-800/80'}`} />
          
          <div className="space-y-1.5">
            <div className="text-[9px] font-mono text-neutral-500 uppercase font-black">CLASSIFICATION:</div>
            <div className={`text-xs font-mono font-bold px-2.5 py-1 flex items-center justify-between rounded border ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border-neutral-200 text-neutral-700'
                : 'bg-red-950/40 border-red-500/30 text-white'
            }`}>
              <span>EPISODIC CASEBOOK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            </div>
          </div>

          {/* Contextual view briefing */}
          {currentAct && (
            <div className={`space-y-2 mt-4 pt-4 border-t animate-in fade-in duration-300 ${
              boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800/85'
            }`}>
              <div className="text-[9px] font-mono text-neutral-500 uppercase font-black">ACTIVE MISSION:</div>
              <div className={`text-xs font-mono font-bold uppercase tracking-wide ${
                boardTheme === 'light' ? 'text-red-650' : 'text-red-400'
              }`}>
                {currentAct.codename}
              </div>
              <p className={`text-[11px] font-sans leading-relaxed ${
                boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-450'
              }`}>
                {currentAct.objective}
              </p>
            </div>
          )}

          {currentView === 'incident-log' && (
            <div className={`space-y-2 mt-4 pt-4 border-t animate-in fade-in duration-300 ${
              boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800/85'
            }`}>
              <div className="text-[9px] font-mono text-neutral-500 uppercase font-black">ACTIVE VIEW:</div>
              <div className={`text-xs font-mono font-bold uppercase tracking-wide ${
                boardTheme === 'light' ? 'text-amber-650' : 'text-amber-400'
              }`}>
                INCIDENT LOG
              </div>
              <p className={`text-[11px] font-sans leading-relaxed ${
                boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-455'
              }`}>
                Continuous chronological briefing of all technical incidents and milestones.
              </p>
            </div>
          )}

          {currentView === 'evidence-vault' && (
            <div className={`space-y-2 mt-4 pt-4 border-t animate-in fade-in duration-300 ${
              boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800/85'
            }`}>
              <div className="text-[9px] font-mono text-neutral-500 uppercase font-black">ACTIVE VIEW:</div>
              <div className={`text-xs font-mono font-bold uppercase tracking-wide ${
                boardTheme === 'light' ? 'text-blue-650' : 'text-blue-400'
              }`}>
                EVIDENCE VAULT
              </div>
              <p className={`text-[11px] font-sans leading-relaxed ${
                boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-455'
              }`}>
                Complete technical matrix of all framework assets, tools, and competencies.
              </p>
            </div>
          )}

          {currentView === 'verdict' && (
            <div className={`space-y-2 mt-4 pt-4 border-t animate-in fade-in duration-300 ${
              boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800/85'
            }`}>
              <div className="text-[9px] font-mono text-neutral-500 uppercase font-black">ACTIVE VIEW:</div>
              <div className={`text-xs font-mono font-bold uppercase tracking-wide ${
                boardTheme === 'light' ? 'text-emerald-650' : 'text-emerald-400'
              }`}>
                FINAL VERDICT
              </div>
              <p className={`text-[11px] font-sans leading-relaxed ${
                boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-455'
              }`}>
                Hiring clearance evaluation and direct coordinator dispatch wire.
              </p>
            </div>
          )}
        </div>

        {/* Bottom: Cleared Status */}
        <div className="space-y-3">
          <div className={`h-px ${boardTheme === 'light' ? 'bg-neutral-200' : 'bg-neutral-800/80'}`} />
          <div className="flex flex-col gap-1.5">
            <div className="text-[9px] font-mono text-neutral-500 uppercase font-black">CASE TELEMETRY:</div>
            <div className={`text-xs font-mono font-bold flex items-center gap-1.5 ${
              boardTheme === 'light' ? 'text-emerald-650' : 'text-emerald-400'
            }`}>
              <CheckCircle2 className={`w-4 h-4 ${boardTheme === 'light' ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <span>CLEARED: {completedActs.length}/4 ACTS</span>
            </div>

            <div className="pt-1.5 space-y-1.5">
              <button
                onClick={onToggleTheme}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-colors group text-left font-mono text-[10px] ${
                  boardTheme === 'light'
                    ? 'border-neutral-200 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900'
                    : 'border-neutral-800 bg-neutral-900/70 hover:bg-neutral-850 text-neutral-400 hover:text-white'
                }`}
                title={`Switch to ${boardTheme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {boardTheme === 'light' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 shrink-0 text-neutral-550 group-hover:text-amber-500" />
                    <span className="tracking-wider">SWITCH TO DARK MODE</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 shrink-0 text-neutral-500 group-hover:text-amber-500" />
                    <span className="tracking-wider">SWITCH TO LIGHT MODE</span>
                  </>
                )}
              </button>

              <Link
                href="/"
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-colors group font-mono text-[10px] ${
                  boardTheme === 'light'
                    ? 'border-neutral-200 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900'
                    : 'border-neutral-800 bg-neutral-900/70 hover:bg-neutral-850 text-neutral-400 hover:text-white'
                }`}
                title="Back to Portfolio Home"
              >
                <Home className="w-3.5 h-3.5 shrink-0 text-neutral-500 group-hover:text-red-400" />
                <span className="tracking-wider">EXIT CASE / HOME</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-red-400" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 🖥️ DESKTOP RIGHT FLOATING NAVIGATION SIDEBAR (hidden lg:flex)              */}
      {/* ========================================================================= */}
      <aside className={`hidden lg:flex absolute right-4 top-4 bottom-4 w-52 border rounded-2xl z-40 flex-col p-4 justify-between backdrop-blur-md transition-all duration-300 ${
        boardTheme === 'light'
          ? 'bg-white/95 border-neutral-200 text-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
          : 'bg-[#0c0c0c]/98 border-neutral-800/80 text-neutral-300 shadow-[0_20px_50px_rgba(0,0,0,0.95)]'
      }`}>
        {/* Top: Chapter Navigation */}
        <div className="space-y-4">
          <div className="text-[9px] font-mono text-neutral-500 font-black uppercase tracking-wider px-1">CASE BOOK FILES</div>
          <nav className="flex flex-col gap-2">
            {actsList.map((act) => {
              const isActive = currentView === act.id;
              const isCompleted = completedActs.includes(act.id);

              return (
                <button
                  key={act.id}
                  onClick={() => onSelectView(act.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl border font-mono text-xs text-left transition-all ${
                    isActive
                      ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 font-bold'
                      : boardTheme === 'light'
                      ? 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900'
                      : 'bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="text-[9px] font-bold opacity-80">{act.actNo}</div>
                    <div className="font-bold tracking-tight text-[11px] leading-none mt-1">{act.shortLabel}</div>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ml-1.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Logs, Vault, Verdict Links */}
        <div className="space-y-4">
          <div className={`h-px ${boardTheme === 'light' ? 'bg-neutral-200' : 'bg-neutral-800/80'}`} />
          <div className="text-[9px] font-mono text-neutral-500 font-black uppercase tracking-wider px-1">DOSSIER VIEWS</div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onSelectView('incident-log')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                currentView === 'incident-log'
                  ? 'bg-amber-600/90 border-amber-500 text-white shadow-md shadow-amber-600/30'
                  : boardTheme === 'light'
                  ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-700 hover:text-neutral-900'
                  : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-300'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>LOG</span>
            </button>

            <button
              onClick={() => onSelectView('evidence-vault')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                currentView === 'evidence-vault'
                  ? 'bg-blue-600/90 border-blue-500 text-white shadow-md shadow-blue-600/30'
                  : boardTheme === 'light'
                  ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-700 hover:text-neutral-900'
                  : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-300'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>VAULT</span>
            </button>

            <button
              onClick={() => onSelectView('verdict')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                currentView === 'verdict'
                  ? 'bg-emerald-600/90 border-emerald-500 text-white shadow-md shadow-emerald-600/30'
                  : boardTheme === 'light'
                  ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-700 hover:text-neutral-900'
                  : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-emerald-450 hover:text-emerald-400'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>VERDICT</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
