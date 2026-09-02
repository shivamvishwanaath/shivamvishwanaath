'use client';

import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Github, 
  Instagram,
  Twitter,
  Sparkles, 
  Download, 
  ArrowRight,
  ArrowLeft,
  Terminal,
  Server,
  Code,
  Users,
  Compass,
  Flame,
  Check,
  RotateCcw,
  BookOpen,
  Layers,
  MapPin,
  ExternalLink,
  LayoutGrid
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CaseActId } from '@/lib/story-acts';

interface VerdictReportViewProps {
  onBackToBoard: (actId?: 'act-1' | 'act-2' | 'act-3') => void;
  onNavigateToView?: (view: CaseActId) => void;
  boardTheme?: 'dark' | 'light';
}

export const VerdictReportView: React.FC<VerdictReportViewProps> = ({
  onBackToBoard,
  onNavigateToView,
  boardTheme = 'dark'
}) => {
  const handleCelebrate = () => {
    confetti({
      particleCount: 170,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Return to Investigation Nav Dock (Top) */}
      <div className={`p-3.5 sm:p-4 rounded-xl border border-red-500/40 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs ${
        boardTheme === 'light' ? 'bg-white' : 'bg-[#141414]'
      }`}>
        {/* Main Back to Canvas Trigger */}
        <button
          onClick={() => onBackToBoard('act-3')}
          className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-2 text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO PINBOARD CANVAS</span>
        </button>

        {/* Individual Act & Auxiliary View Jumps */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
          <button
            onClick={() => onBackToBoard('act-1')}
            className={`px-2.5 py-1.5 rounded-lg border hover:border-red-500 transition-all flex items-center gap-1 text-[11px] ${
              boardTheme === 'light'
                ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700 hover:text-neutral-900'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
            }`}
            title="Return directly to Act I: Genesis & Mobile APK"
          >
            <span className="text-red-500 font-bold">ACT I:</span>
            <span>Genesis</span>
          </button>

          <button
            onClick={() => onBackToBoard('act-2')}
            className={`px-2.5 py-1.5 rounded-lg border hover:border-red-500 transition-all flex items-center gap-1 text-[11px] ${
              boardTheme === 'light'
                ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700 hover:text-neutral-900'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
            }`}
            title="Return directly to Act II: Campus Surge & NSS"
          >
            <span className="text-red-500 font-bold">ACT II:</span>
            <span>Campus</span>
          </button>

          <button
            onClick={() => onBackToBoard('act-3')}
            className={`px-2.5 py-1.5 rounded-lg border hover:border-red-500 transition-all flex items-center gap-1 text-[11px] ${
              boardTheme === 'light'
                ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700 hover:text-neutral-900'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
            }`}
            title="Return directly to Act III: Tech Lead Mastermind"
          >
            <span className="text-red-500 font-bold">ACT III:</span>
            <span>Tech Lead</span>
          </button>

          {onNavigateToView && (
            <>
              <button
                onClick={() => onNavigateToView('evidence-vault')}
                className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 text-[11px] ${
                  boardTheme === 'light'
                    ? 'bg-neutral-100 hover:bg-blue-50 border-neutral-300 hover:border-blue-400 text-neutral-700 hover:text-blue-750'
                    : 'bg-neutral-900 hover:bg-blue-950/80 border-neutral-700 hover:border-blue-500 text-neutral-300 hover:text-blue-300'
                }`}
                title="Open Evidence Matrix Vault"
              >
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Vault</span>
              </button>

              <button
                onClick={() => onNavigateToView('incident-log')}
                className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 text-[11px] ${
                  boardTheme === 'light'
                    ? 'bg-neutral-100 hover:bg-amber-50 border-neutral-300 hover:border-amber-400 text-neutral-700 hover:text-amber-750'
                    : 'bg-neutral-900 hover:bg-amber-950/80 border-neutral-700 hover:border-amber-500 text-neutral-300 hover:text-amber-300'
                }`}
                title="Read Chronological Incident Log"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Log</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Official Case Closure Banner */}
      <div className={`p-5 sm:p-8 rounded-xl border shadow-2xl relative overflow-hidden ${
        boardTheme === 'light'
          ? 'bg-white border-neutral-200 shadow-neutral-100'
          : 'bg-[#121212] border-neutral-800'
      }`}>
        <div 
          style={{
            backgroundImage: boardTheme === 'light'
              ? 'repeating-linear-gradient(45deg,#10b981,#10b981 10px,#f0fdf4 10px,#f0fdf4 20px)'
              : 'repeating-linear-gradient(45deg,#10b981,#10b981 10px,#000 10px,#000 20px)'
          }}
          className="h-1.5 w-full absolute top-0 left-0"
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded border font-mono text-[10px] font-bold uppercase tracking-wider ${
                boardTheme === 'light'
                  ? 'bg-emerald-55/10 border-emerald-500/30 text-emerald-700'
                  : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
              }`}>
                CASE SOLVED // HIRING CLEARANCE GRANTED
              </span>
              <span className={`font-mono text-xs ${
                boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                DOSSIER #7702-SV
              </span>
            </div>
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-tight ${
              boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
            }`}>
              FINAL INVESTIGATIVE REPORT: SHIVAM VISHWANAATH
            </h1>
            <p className={`text-xs sm:text-sm font-sans max-w-2xl leading-relaxed ${
              boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
            }`}>
              Upon reviewing all 3 episodic acts—spanning standalone mobile APK craft, live 9.3K+ audience fest scalability, 24-hr NSS blood drive crisis leadership, and multi-portal Trans Ed enterprise architecture—the investigative board issues an unconditional recommendation for high-impact Tech Lead and Full-Stack Engineering roles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleCelebrate}
              className="w-full px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>AFFIRM CASE VERDICT</span>
            </button>

            <a
              href="mailto:Shivam.strive@gmail.com"
              className="w-full px-5 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>SCHEDULE INTERVIEW WIRE</span>
            </a>
          </div>
        </div>
      </div>

      {/* Core Competency Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <div className={`p-5 sm:p-6 rounded-xl border space-y-3 ${
          boardTheme === 'light' ? 'bg-white border-neutral-200 shadow-neutral-100' : 'bg-[#121212] border-neutral-800'
        }`}>
          <div className="p-2 w-fit rounded bg-red-950 border border-red-500/40 text-red-400">
            <Server className="w-5 h-5" />
          </div>
          <h2 className={`font-mono font-bold text-base ${
            boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
          }`}>
            Architecture & Scale
          </h2>
          <p className={`text-xs font-sans leading-relaxed ${
            boardTheme === 'light' ? 'text-neutral-650' : 'text-neutral-300'
          }`}>
            Directs end-to-end architecture for CBSEForum, BITSATForum, and Tutors Forum. Proven 99% uptime under 9.3K+ audience surges and sub-second real-time scoring for competitive cohorts.
          </p>
          <div className={`text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold pt-2 border-t ${
            boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <Check className="w-3.5 h-3.5" />
            <span>VERIFIED PRODUCTION GRADE</span>
          </div>
        </div>

        <div className={`p-5 sm:p-6 rounded-xl border space-y-3 ${
          boardTheme === 'light' ? 'bg-white border-neutral-200 shadow-neutral-100' : 'bg-[#121212] border-neutral-800'
        }`}>
          <div className="p-2 w-fit rounded bg-blue-950 border border-blue-500/40 text-blue-400">
            <Code className="w-5 h-5" />
          </div>
          <h2 className={`font-mono font-bold text-base ${
            boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
          }`}>
            Full-Stack & DevOps
          </h2>
          <p className={`text-xs font-sans leading-relaxed ${
            boardTheme === 'light' ? 'text-neutral-650' : 'text-neutral-300'
          }`}>
            Bare-metal Linux VPS administration (Ubuntu), reverse proxy SSL automation via Caddy, Docker containerization, PM2 clustering, and TypeScript/React ecosystem.
          </p>
          <div className={`text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold pt-2 border-t ${
            boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <Check className="w-3.5 h-3.5" />
            <span>FULL PIPELINE OWNERSHIP</span>
          </div>
        </div>

        <div className={`p-5 sm:p-6 rounded-xl border space-y-3 ${
          boardTheme === 'light' ? 'bg-white border-neutral-200 shadow-neutral-100' : 'bg-[#121212] border-neutral-800'
        }`}>
          <div className="p-2 w-fit rounded bg-amber-950 border border-amber-500/40 text-amber-400">
            <Users className="w-5 h-5" />
          </div>
          <h2 className={`font-mono font-bold text-base ${
            boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
          }`}>
            Leadership & Velocity
          </h2>
          <p className={`text-xs font-sans leading-relaxed ${
            boardTheme === 'light' ? 'text-neutral-650' : 'text-neutral-300'
          }`}>
            Proven humanitarian and organizational execution. Event Head at NSS coordinating 250+ unit blood collection in 24 hours and tutoring 130+ kids in rural schooling centers.
          </p>
          <div className={`text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold pt-2 border-t ${
            boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <Check className="w-3.5 h-3.5" />
            <span>HIGH EQ & MENTORSHIP</span>
          </div>
        </div>
      </div>

      {/* Recruiter Action Bar & Direct Coordinates */}
      <div className={`p-5 sm:p-8 rounded-xl border border-red-500/40 flex flex-col md:flex-row items-center justify-between gap-4 ${
        boardTheme === 'light'
          ? 'bg-gradient-to-r from-red-50 via-white to-white'
          : 'bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-900'
      }`}>
        <div>
          <h2 className={`font-mono font-bold text-base sm:text-lg ${
            boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
          }`}>
            READY TO RECRUIT SHIVAM VISHWANAATH?
          </h2>
          <p className={`text-xs font-sans mt-0.5 ${
            boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
          }`}>
            Directly connect for Tech Lead, Senior Full-Stack Engineer, or Architecture opportunities.
          </p>
          <div className={`flex items-center gap-4 mt-2 text-xs font-mono flex-wrap ${
            boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              Bhubaneswar / Ranchi / Remote
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-center sm:justify-start">
          <a
            href="https://github.com/shivamvishwanaath"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-lg border transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
                : 'bg-neutral-800 border-transparent text-white hover:bg-neutral-700'
            }`}
            title="GitHub Repositories"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/shivamvishwanaath/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-lg border transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
                : 'bg-neutral-800 border-transparent text-white hover:bg-neutral-700'
            }`}
            title="Instagram Channel"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/svishwanaath"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-lg border transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
                : 'bg-neutral-800 border-transparent text-white hover:bg-neutral-700'
            }`}
            title="X (Twitter) Feed"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="mailto:shivam.strive@gmail.com"
            className="flex-1 sm:flex-none px-5 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Mail className="w-4 h-4" />
            <span>DIRECT DISPATCH</span>
          </a>
        </div>
      </div>

      {/* Dedicated Bottom Case Re-Examination Dock */}
      <div className={`p-5 sm:p-6 rounded-xl border space-y-3 ${
        boardTheme === 'light' ? 'bg-white border-neutral-200' : 'bg-[#101010] border-neutral-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 font-mono text-xs font-bold ${
            boardTheme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
          }`}>
            <RotateCcw className="w-4 h-4 text-red-500" />
            <span>WANT TO RE-EXAMINE THE CASE EVIDENCE & PINBOARD?</span>
          </div>
          <span className={`text-[10px] font-mono uppercase hidden sm:inline ${
            boardTheme === 'light' ? 'text-neutral-450' : 'text-neutral-500'
          }`}>
            ARCHIVE RE-ACCESS AVAILABLE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs">
          <button
            onClick={() => onBackToBoard('act-1')}
            className={`p-3.5 rounded-lg border hover:border-red-500 text-left transition-all group flex items-center justify-between ${
              boardTheme === 'light'
                ? 'bg-neutral-50 hover:bg-red-50/50 border-neutral-200 text-neutral-800'
                : 'bg-neutral-900 hover:bg-red-950/40 border-neutral-800'
            }`}
          >
            <div>
              <div className="text-red-500 font-bold text-[10px] uppercase">RE-VISIT ACT I</div>
              <div className={`font-bold mt-0.5 ${boardTheme === 'light' ? 'text-neutral-900' : 'text-white'}`}>Genesis & Mobile APK</div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onBackToBoard('act-2')}
            className={`p-3.5 rounded-lg border hover:border-red-500 text-left transition-all group flex items-center justify-between ${
              boardTheme === 'light'
                ? 'bg-neutral-50 hover:bg-red-50/50 border-neutral-200 text-neutral-800'
                : 'bg-neutral-900 hover:bg-red-950/40 border-neutral-800'
            }`}
          >
            <div>
              <div className="text-red-500 font-bold text-[10px] uppercase">RE-VISIT ACT II</div>
              <div className={`font-bold mt-0.5 ${boardTheme === 'light' ? 'text-neutral-900' : 'text-white'}`}>Campus Concurrency</div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onBackToBoard('act-3')}
            className={`p-3.5 rounded-lg border hover:border-red-500 text-left transition-all group flex items-center justify-between ${
              boardTheme === 'light'
                ? 'bg-neutral-50 hover:bg-red-50/50 border-neutral-200 text-neutral-800'
                : 'bg-neutral-900 hover:bg-red-950/40 border-neutral-800'
            }`}
          >
            <div>
              <div className="text-red-500 font-bold text-[10px] uppercase">RE-VISIT ACT III</div>
              <div className={`font-bold mt-0.5 ${boardTheme === 'light' ? 'text-neutral-900' : 'text-white'}`}>Tech Lead Mastermind</div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};

