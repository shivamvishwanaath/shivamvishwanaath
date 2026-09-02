'use client';

import React, { useState } from 'react';
import { ClueItem, RedStringConnection } from '@/lib/investigation-data';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Github, 
  Instagram, 
  Twitter, 
  Mail,
  FileText,
  ShieldAlert,
  Fingerprint,
  Radio,
  Lock,
  Unlock,
  Activity,
  FolderOpen,
  Link2,
  Calendar,
  AlertTriangle,
  FileSearch
} from 'lucide-react';

interface DetailModalProps {
  clue: ClueItem | null;
  allClues: ClueItem[];
  connections: RedStringConnection[];
  onClose: () => void;
  onSelectClue: (id: string) => void;
  uvMode: boolean;
  boardTheme?: 'dark' | 'light';
}

export const DetailModal: React.FC<DetailModalProps> = ({
  clue,
  allClues,
  connections,
  onClose,
  onSelectClue,
  uvMode,
  boardTheme = 'dark'
}) => {
  const [activeTab, setActiveTab] = useState<'brief' | 'forensics' | 'network'>('brief');
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false);
  const isLight = boardTheme === 'light';

  if (!clue) return null;

  // Find connected clues and red-thread details
  const connectedConnections = connections.filter(
    c => c.fromId === clue.id || c.toId === clue.id
  );

  const connectedCluesWithReasons = connectedConnections.map(conn => {
    const targetId = conn.fromId === clue.id ? conn.toId : conn.fromId;
    const targetClue = allClues.find(c => c.id === targetId);
    return {
      clue: targetClue,
      reason: conn.narrativeReason || 'Correlated operational node & technical telemetry',
      label: conn.label || 'LINKED EXHIBIT'
    };
  }).filter((item): item is { clue: ClueItem; reason: string; label: string } => item.clue !== undefined);

  const getSocialIcon = (url: string) => {
    if (url.includes('github')) return <Github className="w-4 h-4" />;
    if (url.includes('instagram')) return <Instagram className="w-4 h-4" />;
    if (url.includes('x.com') || url.includes('twitter')) return <Twitter className="w-4 h-4" />;
    if (url.includes('mailto')) return <Mail className="w-4 h-4" />;
    return <ExternalLink className="w-4 h-4" />;
  };

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
        className={`relative w-full max-w-3xl h-[92dvh] sm:h-auto max-h-[92dvh] sm:max-h-[90vh] flex flex-col rounded-xl sm:rounded-2xl border shadow-2xl transition-all duration-300 overflow-hidden z-10 ${
          uvMode 
            ? 'bg-[#050716]/98 border-cyan-500/60 shadow-[0_0_60px_rgba(6,182,212,0.3)] text-cyan-100' 
            : isLight
            ? 'bg-[#fcfaf4] border-neutral-350 shadow-[0_25px_70px_rgba(0,0,0,0.15)] text-neutral-800'
            : 'bg-[#121212] border-neutral-800 shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-[#e2e2e2]'
        }`}
      >
        {/* Top Caution Tape & Barcode Stamped Header */}
        <div className={`relative overflow-hidden border-b shrink-0 transition-colors duration-300 ${
          isLight ? 'border-neutral-250 bg-[#f5f1e8]/95' : 'border-neutral-800 bg-[#0c0c0c]/95'
        }`}>
          {/* Crime Scene Hazard Strip */}
          <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e_10px,#000_10px,#000_20px)]" />

          <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="p-1 sm:p-1.5 rounded bg-red-950/70 border border-red-500/50 text-red-400 shrink-0">
                <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-red-550 tracking-wider truncate max-w-[170px] xs:max-w-none">
                    EXHIBIT // #{clue.id.toUpperCase()}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.5 rounded border shrink-0 ${
                    isLight
                      ? 'bg-neutral-100 border-neutral-300 text-neutral-600'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}>
                    L5 CLEARANCE
                  </span>
                </div>
                <div className="hidden sm:block text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
                  CONFIDENTIAL CRIME DOSSIER • DO NOT DUPLICATE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {clue.stamp && (
                <div className={`hidden md:flex items-center gap-1 px-2 py-0.5 font-mono text-[11px] font-black tracking-wider uppercase border rotate-1 shadow-sm ${
                  clue.stamp === 'CLASSIFIED' ? 'border-red-600 text-red-405 bg-red-950/60' :
                  clue.stamp === 'HIGH PRIORITY' ? 'border-red-500 text-red-405 bg-red-950/50' :
                  clue.stamp === 'SOLVED' ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' :
                  clue.stamp === 'TECH LEAD' ? 'border-cyan-500 text-cyan-400 bg-cyan-950/40' :
                  'border-neutral-700 text-neutral-300 bg-neutral-900/60'
                }`}>
                  <Fingerprint className="w-3 h-3" />
                  <span>[{clue.stamp}]</span>
                </div>
              )}

              <button
                onClick={onClose}
                className={`p-1.5 sm:p-2 rounded-lg border transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95 ${
                  isLight
                    ? 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
                title="Close dossier"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Dossier Tabs (Fully Visible Responsive 3-Column Layout on Mobile) */}
          <div className={`grid grid-cols-3 sm:flex sm:items-center gap-1 px-2 sm:px-6 border-t text-xs font-mono transition-colors duration-300 ${
            isLight ? 'bg-[#f0ece2] border-neutral-300' : 'bg-[#090909] border-neutral-800'
          }`}>
            <button
              onClick={() => setActiveTab('brief')}
              className={`flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-3 border-b-2 font-bold text-[10px] xs:text-[11px] sm:text-xs transition-all ${
                activeTab === 'brief'
                  ? 'border-red-500 text-red-650 dark:text-white bg-neutral-200/40 dark:bg-neutral-900/60'
                  : isLight
                  ? 'border-transparent text-neutral-550 hover:text-neutral-850'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden truncate">BRIEF</span>
              <span className="hidden sm:inline whitespace-nowrap">INCIDENT BRIEF</span>
            </button>

            <button
              onClick={() => setActiveTab('forensics')}
              className={`flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-3 border-b-2 font-bold text-[10px] xs:text-[11px] sm:text-xs transition-all ${
                activeTab === 'forensics'
                  ? 'border-red-500 text-red-655 dark:text-white bg-neutral-200/40 dark:bg-neutral-900/60'
                  : isLight
                  ? 'border-transparent text-neutral-555 hover:text-neutral-855'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden truncate">METRICS</span>
              <span className="hidden sm:inline whitespace-nowrap">FORENSIC TELEMETRY</span>
              {clue.metrics && clue.metrics.length > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('network')}
              className={`flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-3 border-b-2 font-bold text-[10px] xs:text-[11px] sm:text-xs transition-all ${
                activeTab === 'network'
                  ? 'border-red-500 text-red-655 dark:text-white bg-neutral-200/40 dark:bg-neutral-900/60'
                  : isLight
                  ? 'border-transparent text-neutral-555 hover:text-neutral-855'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden truncate">NETWORK ({connectedCluesWithReasons.length})</span>
              <span className="hidden sm:inline whitespace-nowrap">SUSPECT NETWORK ({connectedCluesWithReasons.length})</span>
            </button>

            <div className="ml-auto hidden lg:flex items-center gap-2 text-[10px] text-neutral-500 shrink-0 pl-2">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              <span>LIVE WIRE INTEL</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div 
          className="p-3.5 sm:p-6 overflow-y-auto dossier-scrollbar space-y-4 sm:space-y-6 flex-1 min-h-0 overscroll-contain touch-auto max-h-[calc(92dvh-160px)] sm:max-h-[calc(90vh-180px)]"
          onTouchStart={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          
          {/* Main Suspect / Exhibit Header */}
          <div className={`relative p-3.5 sm:p-4 rounded-xl shadow-inner border transition-all ${isLight ? 'bg-[#f5f1e8]/90 border-neutral-300' : 'bg-neutral-900/90 border border-neutral-800'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-red-550 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                PRIMARY CLASSIFICATION: {clue.category.toUpperCase()}
              </span>

              {/* Decrypt Redactions interactive button */}
              <button
                onClick={() => setIsDecrypted(!isDecrypted)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all border self-start sm:self-auto min-h-[30px] ${
                  isDecrypted 
                    ? 'bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                    : isLight
                    ? 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-neutral-800'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                }`}
                title="Toggle encrypted intelligence redactions"
              >
                {isDecrypted ? <Unlock className="w-3 h-3 text-red-400" /> : <Lock className="w-3 h-3" />}
                <span>{isDecrypted ? 'INTEL DECRYPTED' : 'DECRYPT CLASSIFIED NOTES'}</span>
              </button>
            </div>

            <h2 className={`mt-2 text-lg sm:text-2xl font-mono font-bold tracking-tight break-words transition-colors ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              {clue.headline || clue.title}
            </h2>

            {clue.subtitle && (
              <p className={`mt-1 text-xs sm:text-sm font-mono transition-colors ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {clue.subtitle}
              </p>
            )}

            {(clue.date || clue.location) && (
              <div className={`flex flex-wrap items-center gap-2 sm:gap-4 mt-3 pt-3 border-t text-[11px] sm:text-xs font-mono transition-colors ${isLight ? 'border-neutral-250 text-neutral-500' : 'border-neutral-800 text-neutral-400'}`}>
                {clue.date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>TIMEFRAME: <span className={isLight ? 'text-neutral-850 font-bold' : 'text-neutral-200'}>{clue.date}</span></span>
                  </span>
                )}
                {clue.location && (
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>JURISDICTION: <span className={isLight ? 'text-neutral-850 font-bold' : 'text-neutral-200'}>{clue.location}</span></span>
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <Fingerprint className="w-3.5 h-3.5 shrink-0" />
                  <span>ID: #{clue.id}</span>
                </span>
              </div>
            )}
          </div>

          {/* TAB 1: INCIDENT BRIEF & SUMMARY */}
          {activeTab === 'brief' && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
              {/* Executive Incident Synopsis */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-red-550 flex items-center gap-2 font-bold">
                  <FileSearch className="w-4 h-4 text-red-500" />
                  Executive Investigation Abstract
                </h4>
                <div className={`p-3.5 sm:p-4 rounded-xl border-l-4 border-red-500 font-sans text-xs sm:text-sm leading-relaxed transition-colors ${isLight ? 'bg-[#f5f1e8]/60 text-neutral-700' : 'bg-neutral-900/60 text-neutral-300'}`}>
                  {clue.summary}
                </div>
              </div>

              {/* Verified Field Findings & Actions */}
              {clue.details && clue.details.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 flex items-center gap-2 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-red-500" />
                      Field Observations & Evidence Logs
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {clue.details.length} VERIFIED RECORDS
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    {clue.details.map((detail, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-sans leading-relaxed group transition-all ${isLight ? 'bg-white border border-neutral-200 text-neutral-750 hover:border-neutral-300 shadow-xs' : 'bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:border-neutral-700'}`}
                      >
                        <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-500/40 text-[9px] sm:text-[10px] font-mono text-red-400 font-bold shrink-0 mt-0.5">
                          LOG #{String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="break-words">{detail}</span>
                          {/* Redaction effect demo for mystery */}
                          {!isDecrypted && idx === 0 && (
                            <span className="block mt-1 text-[10px] sm:text-[11px] font-mono text-neutral-500 italic">
                              [Classified audit: Architecture verified at 99.9% uptime under high concurrent load]
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* UV Secret / Hidden Case Telemetry */}
              {clue.uvSecret && (
                <div className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  uvMode 
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.3)]' 
                    : isLight
                    ? 'bg-neutral-100/80 border-dashed border-neutral-300 text-neutral-600'
                    : 'bg-neutral-900/80 border-dashed border-neutral-800 text-neutral-400'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
                      <span>{uvMode ? 'DECRYPTED UV FORENSIC TRACE:' : 'INVISIBLE FORENSIC CIPHER (UV SENSITIVE):'}</span>
                    </div>
                    {uvMode && (
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold shrink-0">
                        UV ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-mono italic text-cyan-100 break-words">
                    {clue.uvSecret}
                  </p>
                  {!uvMode && (
                    <span className="block mt-2 text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      (Enable UV in top bar to illuminate invisible fluorescent residue)
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FORENSIC TELEMETRY */}
          {activeTab === 'forensics' && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
              <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-red-550 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-500" />
                  PERFORMANCE TELEMETRY & HARD METRICS
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500">
                  ±0.01% AUDITED
                </span>
              </div>

              {/* Metrics Grid */}
              {clue.metrics && clue.metrics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {clue.metrics.map((metric, idx) => (
                    <div 
                      key={idx}
                      className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between hover:border-red-500/40 transition-colors shadow-xs ${isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900 border border-neutral-800'}`}
                    >
                      <div className={`text-[10px] font-mono uppercase tracking-wider flex items-center justify-between ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        <span>{metric.label}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      </div>
                      <div className={`text-lg sm:text-2xl font-bold font-mono mt-1.5 transition-colors ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                        {metric.value}
                      </div>
                      <div className={`text-[9px] font-mono mt-2 pt-1.5 border-t transition-colors ${isLight ? 'border-neutral-100 text-neutral-450' : 'border-neutral-800/80 text-neutral-500'}`}>
                        AUDITED TELEMETRY
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`p-5 rounded-xl border text-center font-mono text-xs transition-colors ${isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-500' : 'bg-neutral-900/50 border border-neutral-800 text-neutral-400'}`}>
                  Standard qualitative intelligence record. No isolated numerical anomaly detected.
                </div>
              )}

              {/* Chain of Custody Audit Log */}
              <div className={`p-3.5 sm:p-4 rounded-xl border space-y-3 transition-colors ${isLight ? 'bg-[#f5f1e8]/40 border-neutral-200' : 'bg-neutral-900/40 border border-neutral-800'}`}>
                <h5 className={`font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                  Chain of Custody & Security Hash
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs font-mono text-neutral-400">
                  <div className={`p-2.5 rounded-lg border transition-colors ${isLight ? 'bg-white border-neutral-200 text-neutral-800' : 'bg-neutral-950 border border-neutral-800'}`}>
                    <span className={`text-[9px] sm:text-[10px] block ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>SHA-256 INTEGRITY DIGEST:</span>
                    <span className={`text-[10px] sm:text-[11px] truncate block font-mono ${isLight ? 'text-neutral-700' : 'text-neutral-350'}`}>
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-lg border transition-colors ${isLight ? 'bg-white border-neutral-200 text-neutral-800' : 'bg-neutral-950 border border-neutral-800'}`}>
                    <span className={`text-[9px] sm:text-[10px] block ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>INVESTIGATING AGENT:</span>
                    <span className={`font-bold block text-[11px] sm:text-xs ${isLight ? 'text-neutral-850' : 'text-neutral-200'}`}>SPECIAL RECRUITER / DETECTIVE USER</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SUSPECT NETWORK & RED THREADS */}
          {activeTab === 'network' && (
            <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
              <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-red-550 uppercase tracking-widest flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-red-650 animate-spin shrink-0" />
                  <span>CRIMSON STRINGS ({connectedCluesWithReasons.length} NODES)</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500">
                  TAP TO PIVOT
                </span>
              </div>

              {connectedCluesWithReasons.length > 0 ? (
                <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                  {connectedCluesWithReasons.map(({ clue: c, reason, label }) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectClue(c.id);
                      }}
                      className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 shadow-xs active:scale-[0.99] ${isLight ? 'bg-white border-neutral-200 hover:border-red-500/50 hover:bg-red-50/10' : 'bg-neutral-900 border border-neutral-800 hover:border-red-500/60 hover:bg-red-950/40'}`}
                    >
                      <div className="space-y-1 pr-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-655/40 text-[9px] font-mono text-red-400 font-bold">
                            {label}
                          </span>
                          <span className={`text-xs font-bold font-mono transition-colors ${
                            isLight
                              ? 'text-neutral-900 group-hover:text-red-650'
                              : 'text-white group-hover:text-red-300'
                          }`}>
                            {c.title}
                          </span>
                        </div>
                        <p className={`text-xs font-sans leading-snug transition-colors ${isLight ? 'text-neutral-650' : 'text-neutral-300'}`}>
                          {c.subtitle}
                        </p>
                        <p className={`text-[10px] sm:text-[11px] font-mono transition-colors ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>
                          Rationale: {reason}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 transition-all self-end sm:self-center ${isLight ? 'bg-neutral-100 hover:bg-red-600 hover:text-white text-neutral-700' : 'bg-neutral-800 hover:bg-red-600 hover:text-white text-neutral-300'}`}>
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className={`p-5 rounded-xl border text-center font-mono text-xs transition-colors ${isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-500' : 'bg-neutral-900/50 border border-neutral-800 text-neutral-400'}`}>
                  This exhibit sits on an isolated operational frequency.
                </div>
              )}
            </div>
          )}

          {/* External Wire Communications / Suspect Channels */}
          {clue.links && clue.links.length > 0 && (
            <div className={`space-y-2.5 pt-3 border-t transition-colors ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
              <h4 className={`font-mono text-[11px] sm:text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${isLight ? 'text-neutral-500' : 'text-neutral-450'}`}>
                <Radio className="w-3.5 h-3.5 text-red-500 shrink-0" />
                Monitored External Communications & Links
              </h4>
              <div className="flex flex-wrap gap-2">
                {clue.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all shadow-xs group min-h-[36px] ${isLight ? 'bg-white hover:bg-[#f5f1e8] border-neutral-200 text-neutral-700 hover:text-neutral-900' : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 hover:text-white'}`}
                  >
                    {getSocialIcon(link.url)}
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-red-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Evidence Tags */}
          {clue.tags && clue.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {clue.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className={`px-2 py-0.5 rounded border text-[10px] font-mono transition-colors ${isLight ? 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-800' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Responsive Sticky Footer */}
        <div className={`px-4 sm:px-6 py-3 sm:py-3.5 border-t flex items-center justify-between gap-3 text-xs font-mono shrink-0 transition-all duration-300 ${isLight ? 'border-neutral-200 bg-[#f5f1e8]/95 text-neutral-650' : 'border-neutral-800 bg-[#0e0e0e]/95 text-neutral-400'}`}>
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">CENTRAL EVIDENCE LOG</span>
          </div>
          <button
            onClick={onClose}
            className={`w-full xs:w-auto px-5 py-2 rounded-xl font-mono text-xs font-bold transition-colors min-h-[38px] flex items-center justify-center gap-2 border ${isLight ? 'bg-neutral-150 hover:bg-neutral-250 text-neutral-700 border-neutral-300 hover:text-neutral-900' : 'bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white border-neutral-700'}`}
          >
            <X className="w-3.5 h-3.5" />
            <span>Close Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
