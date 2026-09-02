'use client';

import React from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  X, 
  RotateCcw, 
  Compass, 
  Award,
  Layers,
  ChevronRight,
  Terminal,
  Zap,
  Flame,
  FileText
} from 'lucide-react';
import { CaseActId, CASE_ACTS } from '@/lib/story-acts';

interface ActTransitionModalProps {
  isOpen: boolean;
  completedActId: 'act-1' | 'act-2' | 'act-3' | 'act-4';
  onProceed: (nextView: CaseActId) => void;
  onStay: () => void;
  onClose: () => void;
  boardTheme?: 'dark' | 'light';
}

interface TransitionData {
  title: string;
  codename: string;
  period: string;
  breakthroughSubtitle: string;
  unlockedFindings: string[];
  nextActId: CaseActId;
  nextActCodename: string;
  nextActTitle: string;
  nextActPeriod: string;
  nextActMissionBriefing: string;
  newCluesUnlocked: string[];
  ctaLabel: string;
}

const TRANSITIONS: Record<'act-1' | 'act-2' | 'act-3' | 'act-4', TransitionData> = {
  'act-1': {
    title: 'ACT I CLEARED: OPERATION GENESIS',
    codename: 'FOUNDATIONAL CRAFT & ROGUE APK',
    period: '2020 – 2022',
    breakthroughSubtitle: 'Initial evidence corroborates high-discipline engineering pedigree and standalone Android utility breakout.',
    unlockedFindings: [
      'Mastered hardware-level signal processing & computing fundamentals during B.Tech ECE at BIT Mesra.',
      'Logged 100+ hours of standalone Android development, earning 70+ organic 5-star reviews on Google Play for the offline Periodic Table tool.',
      'Authored the Chemistry Forum support portal, reducing student doubt grievance workload by 65% through custom automated triage.'
    ],
    nextActId: 'act-2',
    nextActCodename: 'OPERATION SURGE COMMAND',
    nextActTitle: 'ACT II: Campus Concurrency & Crisis Leadership',
    nextActPeriod: '2022 – 2024',
    nextActMissionBriefing: 'The investigation escalates from standalone utilities to high-throughput campus infrastructure and life-saving operations. Inspect the 9.3K+ attendee live fest portal (JoharNite), NM Foundation dual-portal JEE/NEET engines, and the 500+ unit blood collection drive.',
    newCluesUnlocked: [
      'JoharNite Fest 9.3K+ Audience Telemetry (99% Uptime)',
      'NM Foundation Dual-Portal JEE/NEET Test Generator',
      'NSS Record 500+ Blood Units Mobilization Record',
      'EPAC Presidency 100+ Volunteer Network & Portal'
    ],
    ctaLabel: 'COMMENCE ACT II: SURGE COMMAND'
  },
  'act-2': {
    title: 'ACT II CLEARED: OPERATION SURGE COMMAND',
    codename: 'CONCURRENCY & HUMANITARIAN SCALE',
    period: '2022 – 2024',
    breakthroughSubtitle: 'Evidence confirms zero dropped connections under heavy traffic surges and decisive crisis event leadership.',
    unlockedFindings: [
      'Delivered 99% uptime with 0 dropped server connections for 9.3K+ festival followers during JoharNite peak headliner announcements.',
      'Engineered cross-platform custom quiz engines and multi-tier percentile scoring at NM Foundation for regional student batches.',
      'Spearheaded the 24-hour NSS Mega Blood Drive as Event Head, collecting 500+ units and tutoring 300+ kids in rural education circles.'
    ],
    nextActId: 'act-3',
    nextActCodename: 'OPERATION TECH LEAD COMMAND',
    nextActTitle: 'ACT III: Mastermind Architect & Production DevOps',
    nextActPeriod: '2024 – PRESENT',
    nextActMissionBriefing: 'You are now entering the executive war room. Subject Shivam Vishwanaath assumes Tech Lead command at Trans Ed, directing architecture across 3 production portals (CBSEForum, BITSATForum, Tutors Forum) backed by hardened Ubuntu VPS, Caddy reverse proxy, and Docker pipelines.',
    newCluesUnlocked: [
      'Tech Lead Directorship at Trans Ed (3 Major Portals)',
      'CBSEForum & BITSATForum Algorithmic Weak-Area Diagnostics',
      'Tutors Forum Automated Billing & Scheduling Engine',
      'Bare-Metal Ubuntu VPS / Caddy SSL / PM2 DevOps Matrix'
    ],
    ctaLabel: 'ENTER ACT III: TECH LEAD WAR ROOM'
  },
  'act-3': {
    title: 'ACT III CLEARED: TECH LEAD COMMAND',
    codename: 'FULL ARCHITECTURAL SUPREMACY',
    period: '2024 – PRESENT',
    breakthroughSubtitle: 'Subject displays full-cycle engineering mastery from low-level systems to production tech leadership.',
    unlockedFindings: [
      'Sole architectural lead at Trans Ed orchestrating CBSEForum, BITSATForum, and Tutors Forum for focused academic cohorts.',
      'Built automated billing pipelines and weak-topic analytics algorithms reducing diagnostic prep time.',
      'Full bare-metal Linux DevOps ownership (Ubuntu VPS, Caddy SSL automation, PM2 zero-downtime reloads, Docker Compose).'
    ],
    nextActId: 'act-4',
    nextActCodename: 'OPERATION FOUNDER COMMAND',
    nextActTitle: 'ACT IV: Founder & Enterprise Cloud Architect',
    nextActPeriod: '2026 – PRESENT',
    nextActMissionBriefing: 'Transitioning to company founding: Shivam Vishwanaath begins with an MSME certificate, secures client contracts, and formally incorporates The SCI SolCielo Innovacion Private Limited™ with MCA India. Inspect the Helios Enterprise Cloud Platform binary and 5 production SaaS suites.',
    newCluesUnlocked: [
      'MCA Incorporation Certificate & CIN Entry',
      'The SCI Company Master Dossier',
      'Helios Cloud Engine (Compiled Go Server)',
      '5 Enterprise Suites (CRM, HRMS, PM, Support, TrustSign)'
    ],
    ctaLabel: 'ENTER ACT IV: FOUNDER WAR ROOM'
  },
  'act-4': {
    title: 'ACT IV CLEARED: FOUNDER & ENTERPRISE ARCHITECT',
    codename: 'COMPANY FOUNDATION & HELIOS SHIPMENT',
    period: '2026 – PRESENT',
    breakthroughSubtitle: 'All investigative chapters reconstructed. Subject displays full entrepreneurial and enterprise cloud platform mastery.',
    unlockedFindings: [
      'Formally incorporated The SCI SolCielo Innovacion Private Limited™ with MCA India after initial MSME bootstrapping & client acquisition.',
      'Engineered the Helios Enterprise Cloud Platform — a compiled Go + Fiber v2 binary operating at ~15MB RAM idle.',
      'Built 5 self-hosted enterprise SaaS suites replacing cPanel, Salesforce, Workday, Jira, Zendesk, and DocuSign.'
    ],
    nextActId: 'verdict',
    nextActCodename: 'FINAL VERDICT & HIRING CLEARANCE',
    nextActTitle: 'Comprehensive Technical Assessment Report',
    nextActPeriod: 'COMPLETE CASE CLOSURE',
    nextActMissionBriefing: 'The investigative docket is complete. All credentials, production metrics, and references have been audited. Review the formal hiring assessment report and establish direct communication wires.',
    newCluesUnlocked: [
      'Verified Production Grade Clearance',
      'Full Pipeline & Server Ownership Audit',
      'High EQ, Mentorship & Event Leadership Verification',
      'Direct Wire Communication & Scheduling Channels'
    ],
    ctaLabel: 'REVEAL FINAL HIRING VERDICT REPORT'
  }
};

export const ActTransitionModal: React.FC<ActTransitionModalProps> = ({
  isOpen,
  completedActId,
  onProceed,
  onStay,
  onClose,
  boardTheme = 'dark'
}) => {
  if (!isOpen) return null;

  const isLight = boardTheme === 'light';
  const data = TRANSITIONS[completedActId] || TRANSITIONS['act-1'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 touch-auto"
      onTouchStart={e => e.stopPropagation()}
      onTouchMove={e => e.stopPropagation()}
      onTouchEnd={e => e.stopPropagation()}
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        onMouseDown={e => e.stopPropagation()}
        onMouseMove={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
        className={`relative w-full max-w-3xl rounded-xl sm:rounded-2xl border-2 overflow-hidden z-10 flex flex-col max-h-[92dvh] sm:max-h-[90vh] ${
          isLight
            ? 'bg-[#fcfaf4] border-neutral-300 shadow-[0_0_80px_rgba(0,0,0,0.15)] text-neutral-900'
            : 'bg-[#111111] border-red-600/70 shadow-[0_0_80px_rgba(239,68,68,0.25)] text-[#e2e2e2]'
        }`}
      >
        {/* Crime Scene Top Caution Ribbon */}
        <div 
          style={{
            backgroundImage: isLight
              ? 'repeating-linear-gradient(45deg,#dc2626,#dc2626 12px,#f5f1e8 12px,#f5f1e8 24px)'
              : 'repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e 12px,#000 12px,#000 24px)'
          }}
          className="h-1.5 sm:h-2 w-full shrink-0"
        />

        {/* Header Bar */}
        <div className={`p-3.5 sm:p-6 border-b flex items-start justify-between gap-3 shrink-0 ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#161616] border-neutral-800'
        }`}>
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded border text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isLight
                  ? 'bg-red-50/20 border-red-500/30 text-red-700'
                  : 'bg-red-950 border border-red-500/60 text-red-400'
              }`}>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                <span>BREAKTHROUGH // ACT CLEARED</span>
              </span>
              <span className={`font-mono text-[10px] sm:text-xs ${
                isLight ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                CASE #7702-SV
              </span>
            </div>
            <h2 className={`text-base sm:text-2xl font-mono font-bold tracking-tight break-words ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}>
              {data.title}
            </h2>
            <p className={`text-xs font-sans line-clamp-2 sm:line-clamp-none ${
              isLight ? 'text-neutral-600' : 'text-neutral-300'
            }`}>
              {data.breakthroughSubtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 sm:p-2 rounded-lg border transition-colors shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95 ${
              isLight
                ? 'bg-neutral-100 border-neutral-250 text-neutral-700 hover:bg-neutral-200'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
            title="Close briefing"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Body Content - Scrollable */}
        <div 
          className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto font-mono text-xs flex-1 min-h-0 overscroll-contain touch-auto max-h-[calc(92dvh-170px)] sm:max-h-[calc(90vh-190px)]"
          onTouchStart={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          {/* Section 1: Verified Intelligence from Completed Act */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className={`flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-wider font-bold ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>VERIFIED FINDINGS UNLOCKED</span>
              </span>
              <span className={isLight ? 'text-neutral-500' : 'text-neutral-500'}>{data.period}</span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:gap-2.5">
              {data.unlockedFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className={`p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 sm:gap-3 font-sans text-xs leading-relaxed ${
                    isLight
                      ? 'bg-white border-neutral-200 text-neutral-800'
                      : 'bg-neutral-900/90 border-neutral-800 text-neutral-200'
                  }`}
                >
                  <div className="p-1 rounded bg-emerald-50/50 border border-emerald-500/30 text-emerald-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <span className="break-words">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Escalation to Next Chapter */}
          <div className={`p-3.5 sm:p-5 rounded-xl border space-y-2.5 sm:space-y-3 ${
            isLight
              ? 'bg-gradient-to-br from-red-50/45 via-white to-white border-red-500/30'
              : 'bg-gradient-to-br from-red-950/40 via-neutral-900 to-neutral-900 border border-red-500/40'
          }`}>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className={`flex items-center gap-1.5 font-bold text-xs ${isLight ? 'text-red-650' : 'text-red-400'}`}>
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">UPCOMING: {data.nextActCodename}</span>
              </div>
              <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded border shrink-0 ${
                isLight
                  ? 'bg-neutral-100 border-neutral-250 text-neutral-600'
                  : 'bg-neutral-950 border border-neutral-800 text-neutral-400'
              }`}>
                {data.nextActPeriod}
              </span>
            </div>

            <h3 className={`text-sm sm:text-base font-bold font-mono break-words ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}>
              {data.nextActTitle}
            </h3>

            <p className={`text-xs font-sans leading-relaxed ${
              isLight ? 'text-neutral-700' : 'text-neutral-300'
            }`}>
              {data.nextActMissionBriefing}
            </p>

            {/* Unlocked Clues on upcoming board */}
            <div className={`pt-2 border-t ${
              isLight ? 'border-neutral-200' : 'border-neutral-800/80'
            }`}>
              <div className={`text-[9px] sm:text-[10px] font-mono mb-2 uppercase tracking-wider ${
                isLight ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                EXHIBITS NOW ACTIVE ON BOARD:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {data.newCluesUnlocked.map((clue, idx) => (
                  <div
                    key={idx}
                    className={`px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-[11px] flex items-center gap-1.5 ${
                      isLight
                        ? 'bg-neutral-50 border-neutral-200 text-neutral-700'
                        : 'bg-black/50 border border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <ChevronRight className="w-3 h-3 text-red-500 shrink-0" />
                    <span className="truncate">{clue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-3.5 sm:p-5 border-t flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0 ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#161616] border-neutral-800'
        }`}>
          <button
            onClick={onStay}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border font-mono text-xs font-semibold transition-colors flex items-center justify-center gap-2 min-h-[40px] ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700'
                : 'bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 border border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span>Stay On Current Board</span>
          </button>

          <button
            onClick={() => onProceed(data.nextActId)}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-mono text-xs font-bold transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="truncate">{data.ctaLabel}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
