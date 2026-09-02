'use client';

import React from 'react';
import { 
  FileText, 
  Clock, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Terminal, 
  ArrowRight,
  ExternalLink,
  Fingerprint,
  Mail
} from 'lucide-react';
import { INITIAL_CLUES } from '@/lib/investigation-data';
import { CASE_ACTS } from '@/lib/story-acts';

interface IncidentLogViewProps {
  onSelectClue: (clueId: string) => void;
  onNavigateToAct: (actId: 'act-1' | 'act-2' | 'act-3') => void;
  boardTheme?: 'dark' | 'light';
}

export const IncidentLogView: React.FC<IncidentLogViewProps> = ({
  onSelectClue,
  onNavigateToAct,
  boardTheme = 'dark'
}) => {
  const timelineEntries = [
    {
      act: 'ACT I: OPERATION GENESIS',
      period: '2018 – 2022',
      title: 'Phase 1: Academic Discipline & Mobile APK Engineering',
      location: 'Bokaro Steel City & BIT Mesra, Ranchi',
      clueId: 'document-education',
      badge: 'FOUNDATION',
      description: 'Subject graduated with high distinction from Chinmaya Vidyalaya and enrolled into the Electronics & Communication Engineering program at Birla Institute of Technology (BIT Mesra). Concurrently logged 100+ hours building the standalone Periodic Table Android application, attaining a flawless 5.0 rating with 70+ five-star reviews on Google Play Store.',
      highlights: [
        'Class XII CBSE with strong foundation in advanced mathematics and physics',
        'B.Tech ECE at BIT Mesra mastering signal processing, microcontrollers, and low-level computing',
        'Published Android app with 100% offline lookup speeds and 70+ 5-star user reviews',
        'Built Chemistry Forum web tool reducing student doubt inquiries by 65%'
      ]
    },
    {
      act: 'ACT II: OPERATION SURGE COMMAND',
      period: '2022 – 2024',
      title: 'Phase 2: Live Concurrency Portals & Humanitarian Operations',
      location: 'Ranchi, Jharkhand & Bhubaneswar, Odisha',
      clueId: 'polaroid-johar-qeds',
      badge: 'CRISIS COMMAND',
      description: 'Subject proved crisis-level software reliability and vast social leadership. Architected the JoharNite Fest web platform using Angular and Firebase, serving 9.3K+ fans with 99% uptime during surge traffic. Promoted to NSS Event Head, orchestrating a record 250+ units blood drive and educating 130+ children.',
      highlights: [
        'JoharNite Fest portal: 9.3K fans, 99% uptime, 0 dropped server connections during peak rush',
        'BIT Mesra QEDS Conference: High-profile academic portal for IIT Kharagpur and ISI Kolkata scholars',
        'NM Foundation: Full-stack engineer building dual-portal JEE/NEET test generator and ranking algorithms',
        'NSS Event Head: 250+ blood units collected in 24 hours & 130+ underprivileged kids educated in rural centers',
        'EPAC Presidency: Managed 35+ active student members and launched official alumni network portal'
      ]
    },
    {
      act: 'ACT III: OPERATION TECH LEAD COMMAND',
      period: '2024 – PRESENT',
      title: 'Phase 3: Production Tech Lead & Enterprise EdTech Orchestrations',
      location: 'Bhubaneswar, Odisha & Noida, UP',
      clueId: 'headline-transed',
      badge: 'TECH LEADERSHIP',
      description: 'Appointed Tech Lead at Trans Ed, directing complete engineering and deployment infrastructure across 3 flagship platforms: CBSEForum (Classes 1–12), BITSATForum (Smart Weak-Area Algorithm), and Tutors Forum (Automated billing and scheduling engine). Fortified infrastructure with Ubuntu VPS, Caddy reverse proxy, and Docker containerization.',
      highlights: [
        'Directing multi-platform engineering roadmap for thousands of active student test-takers',
        'Engineered smart weak-area detection algorithms optimizing student test prep accuracy by 40%',
        'Built automated tutor marketplace ledger with zero reconciliation discrepancies',
        'Managed bare-metal Ubuntu VPS servers with automated Let\'s Encrypt SSL via Caddy and zero-downtime PM2 reloads',
        'Enrolled in MBA Data Science at Amity Online to engineer predictive ML assessment pipelines'
      ]
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Docket */}
      <div className={`p-6 sm:p-8 rounded-xl border shadow-2xl relative overflow-hidden ${
        boardTheme === 'light'
          ? 'bg-white border-neutral-200'
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
                CLASSIFIED DOSSIER LOG #7702-SV
              </span>
              <span className={`font-mono text-xs ${
                boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                OFFICIAL INCIDENT TELEMETRY
              </span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight ${
              boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
            }`}>
              CHRONOLOGICAL INCIDENT & INVESTIGATION REPORT
            </h1>
            <p className={`text-sm font-sans mt-1 ${
              boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
            }`}>
              Unredacted chronological log tracking Subject Shivam Vishwanaath&apos;s trajectory from standalone mobile engineer to production Tech Lead.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="mailto:shivam.strive@gmail.com"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>TRANSMIT WIRE (EMAIL)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Timeline Entries */}
      <div className="space-y-6">
        {timelineEntries.map((entry, idx) => (
          <div
            key={idx}
            className={`p-6 sm:p-8 rounded-xl border shadow-xl relative overflow-hidden group hover:border-red-500/50 transition-all ${
              boardTheme === 'light'
                ? 'bg-white border-neutral-200'
                : 'bg-[#121212] border-neutral-800'
            }`}
          >
            <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 mb-4 ${
              boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded border font-mono text-xs font-bold ${
                  boardTheme === 'light'
                    ? 'bg-red-50 border-red-200 text-red-650'
                    : 'bg-neutral-900 border-neutral-700 text-red-400'
                }`}>
                  {entry.act}
                </span>
                <span className={`font-mono text-xs flex items-center gap-1 ${
                  boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  <Calendar className="w-3 h-3" />
                  {entry.period}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs flex items-center gap-1 ${
                  boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  <MapPin className="w-3 h-3 text-red-500" />
                  {entry.location}
                </span>
              </div>
            </div>

            <h2 className={`text-xl font-mono font-bold transition-colors ${
              boardTheme === 'light'
                ? 'text-neutral-900 group-hover:text-red-600'
                : 'text-white group-hover:text-red-300'
            }`}>
              {entry.title}
            </h2>

            <p className={`text-sm font-sans leading-relaxed mt-2.5 mb-4 ${
              boardTheme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
            }`}>
              {entry.description}
            </p>

            <div className={`p-4 rounded-lg border space-y-2 ${
              boardTheme === 'light'
                ? 'bg-red-50/65 border-red-200'
                : 'bg-neutral-900/80 border-neutral-800/90'
            }`}>
              <div className="text-xs font-mono text-red-600 dark:text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-red-500" />
                <span>VERIFIED CASE FINDINGS:</span>
              </div>
              <ul className={`space-y-1.5 text-xs font-sans ${
                boardTheme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
              }`}>
                {entry.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`pt-4 mt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
              boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800'
            }`}>
              <span className={`text-xs font-mono ${
                boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                EXHIBIT PIN: #{entry.clueId}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectClue(entry.clueId)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 ${
                    boardTheme === 'light'
                      ? 'bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <span>INSPECT ARTIFACT</span>
                  <ExternalLink className="w-3 h-3 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
