import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Terminal, 
  ArrowRight, 
  Code, 
  Server, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Award, 
  FolderLock, 
  Layers, 
  Sparkles, 
  ExternalLink, 
  MapPin, 
  CheckCircle2, 
  Compass, 
  Radar, 
  Eye, 
  FileSearch,
  FolderKanban,
  Cpu,
  Mail,
  BookOpen
} from 'lucide-react';
import { INITIAL_CLUES } from '@/lib/investigation-data';
import { getAllPosts } from '@/lib/blog';
import { JsonLd } from '@/components/JsonLd';
import { getPersonSchema, getWebSiteSchema } from '@/lib/schemas';
import { 
  SITE_URL, 
  SITE_TITLE_DEFAULT, 
  SITE_DESCRIPTION_DEFAULT, 
  SEO_KEYWORDS, 
  DEFAULT_OG_IMAGE 
} from '@/lib/seo-content';

export const metadata: Metadata = {
  title: SITE_TITLE_DEFAULT,
  description: SITE_DESCRIPTION_DEFAULT,
  keywords: SEO_KEYWORDS,
  openGraph: {
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION_DEFAULT,
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Shivam Vishwanaath — Tech Lead & Full-Stack Architect' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION_DEFAULT,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const PRIORITY_PROJECT_IDS = [
    'dossier-helios-engine',
    'dossier-thesci-company',
    'dossier-helios-crm',
    'dossier-trustsign',
  ];
  const priorityProjects = PRIORITY_PROJECT_IDS
    .map(id => INITIAL_CLUES.find(c => c.id === id))
    .filter((c): c is (typeof INITIAL_CLUES)[number] => Boolean(c));
  const remainingProjects = INITIAL_CLUES.filter(
    c => c.slug && (c.category === 'projects' || c.pageCategory === 'projects') && !PRIORITY_PROJECT_IDS.includes(c.id)
  );
  const featuredProjects = [...priorityProjects, ...remainingProjects].slice(0, 4);

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full font-mono space-y-14 homepage-content">
      {/* Hero Section */}
      <section className="p-6 sm:p-10 rounded-2xl bg-[#111111] border border-neutral-800 shadow-2xl relative overflow-hidden">
        {/* Background barcode / caution watermark */}
        <div className="absolute top-0 right-0 p-6 opacity-5 select-none pointer-events-none hidden md:block">
          <div className="text-6xl font-bold tracking-widest text-red-500">
            DOCKET-SV-01
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden border-2 border-red-500/60 shadow-2xl shrink-0 bg-neutral-900">
            <Image
              src="/images/shivam-vishwanaath.png"
              alt="Shivam Vishwanaath — Tech Lead & Full-Stack Architect"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 144px, 176px"
            />
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>CENTRAL PERSON OF INTEREST // ACTIVE CASE DOCKET</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Shivam Vishwanaath
              </h1>
              <p className="text-base sm:text-lg text-red-400 font-bold">
                Founder &amp; CEO, The SCI SolCielo Innovacion Pvt. Ltd. · Systems Architect
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-2xl">
              Official portfolio and audited case records of <strong>Shivam Vishwanaath</strong>. Founder &amp; CEO of The SCI SolCielo Innovacion Private Limited™ (MCA India, Feb 2026) and architect of the Helios Enterprise Cloud Platform. Concurrent Tech Lead at Trans Ed directing CBSEForum, BITSATForum, and Tutors Forum.
            </p>

            {/* HIGH-IMPACT PROMINENT ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <Link
                href="/investigation"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] flex items-center gap-2.5 border border-red-400/50 group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span>ENTER CRIME INVESTIGATION BOARD</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold transition-colors border border-neutral-800"
              >
                READ MASTER DOSSIER
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold transition-colors border border-neutral-800"
              >
                DIRECT WIRE
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Telemetry Bar with Direct Internal Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-neutral-800/80">
          <Link 
            href="/experience" 
            className="p-3 rounded-lg bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/40 text-center md:text-left transition-colors group"
          >
            <div className="text-[10px] text-neutral-500 uppercase group-hover:text-red-400 transition-colors">PRIMARY ROLE</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">Founder &amp; CEO @ The SCI →</div>
          </Link>
          <Link 
            href="/experience" 
            className="p-3 rounded-lg bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/40 text-center md:text-left transition-colors group"
          >
            <div className="text-[10px] text-neutral-500 uppercase group-hover:text-red-400 transition-colors">EXPERIENCE</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">6+ Yrs · MCA Feb 2026 →</div>
          </Link>
          <Link 
            href="/community" 
            className="p-3 rounded-lg bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/40 text-center md:text-left transition-colors group"
          >
            <div className="text-[10px] text-neutral-500 uppercase group-hover:text-red-400 transition-colors">HUMANITARIAN RECORD</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">500+ Blood Units →</div>
          </Link>
          <Link 
            href="/education" 
            className="p-3 rounded-lg bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/40 text-center md:text-left transition-colors group"
          >
            <div className="text-[10px] text-neutral-500 uppercase group-hover:text-red-400 transition-colors">PEDIGREE</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">BIT Mesra & Amity →</div>
          </Link>
        </div>
      </section>

      {/* CENTERPIECE SHOWCASE: THE INTERACTIVE PINBOARD */}
      <section className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#1c0808] via-[#120808] to-[#0a0a0a] border-2 border-red-600/60 shadow-[0_0_50px_rgba(220,38,38,0.25)] space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-red-900/60 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-md shadow-red-600/40 animate-pulse">
              <Radar className="w-4 h-4 animate-spin" />
              <span>MAIN INTERACTIVE EXPERIENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The Crime Investigation Board
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-2xl">
              Immerse yourself in Subject Shivam Vishwanaath&apos;s story. Connect the clues, drag physical polaroids, trace red string threads across 4 investigative acts, and activate UV blacklight forensics to decode classified telemetry.
            </p>
          </div>

          <Link
            href="/investigation"
            className="w-full md:w-auto px-6 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(239,68,68,0.6)] flex items-center justify-center gap-2 group shrink-0"
          >
            <span>LAUNCH PINBOARD NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Acts Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/investigation"
            className="p-4 rounded-xl bg-black/60 border border-neutral-800 hover:border-red-500/80 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-red-400">
              <span>ACT I: THE GENESIS</span>
              <span className="text-neutral-500">2018–2024</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
              The Rogue Android Breakout
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Discover how Shivam published the 5-star Periodic Table app and automated Chemistry Forum workflows.
            </p>
          </Link>

          <Link
            href="/investigation"
            className="p-4 rounded-xl bg-black/60 border border-neutral-800 hover:border-red-500/80 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-400">
              <span>ACT II: THE EXPANSION</span>
              <span className="text-neutral-500">2022–2025</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
              High-Traffic Surges & NSS Record
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              9.3K+ fans handled at 99% uptime, JEE/NEET dual portals, and 500+ blood units collected in 24 hours.
            </p>
          </Link>

          <Link
            href="/investigation"
            className="p-4 rounded-xl bg-black/60 border border-neutral-800 hover:border-red-500/80 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400">
              <span>ACT III: THE TECH LEAD</span>
              <span className="text-neutral-500">2025–PRESENT</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Trans Ed & Linux Cloud Mastery
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Architecting CBSEForum, BITSATForum smart testing engines, and bare-metal Ubuntu VPS infrastructure.
            </p>
          </Link>

          <Link
            href="/investigation"
            className="p-4 rounded-xl bg-black/60 border border-neutral-800 hover:border-red-500/80 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-red-500">
              <span>ACT IV: THE FOUNDER</span>
              <span className="text-neutral-500">2026–PRESENT</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
              MCA Incorporated &amp; Helios Launched
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              The SCI SolCielo Innovacion Pvt. Ltd. formally incorporated with MCA India. Helios: 5 enterprise SaaS suites in one compiled Go binary, replacing Salesforce, Workday, Jira, Zendesk &amp; DocuSign.
            </p>
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
              VERIFIED CASE EXHIBITS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              Production Platforms Engineered by Shivam Vishwanaath
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs text-neutral-400 hover:text-red-400 font-bold transition-colors inline-flex items-center gap-1"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map(project => (
            <article
              key={project.id}
              className="p-6 rounded-xl bg-[#111111] border border-neutral-800 hover:border-red-500/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-red-400 font-bold uppercase">
                      {project.stamp || 'VERIFIED ARTIFACT'}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-300 transition-colors">
                      {project.title.replace('CASE FILE: ', '').replace('CLUE: ', '').replace('NOTE: ', '').replace('EVIDENCE 08: ', '')}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {project.summary}
                </p>

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

              <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[10px] text-neutral-500">EXHIBIT #{project.id}</span>
                {project.slug && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs text-red-400 hover:text-red-300 font-bold transition-colors inline-flex items-center gap-1"
                  >
                    <span>INSPECT ARTIFACT</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Technical Arsenal & DevOps Section */}
      <section className="p-8 rounded-2xl bg-[#111111] border border-neutral-800 space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
            CAPABILITY INVENTORY
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            DevOps & Full-Stack Capabilities of Shivam Vishwanaath
          </h2>
          <p className="text-xs text-neutral-400 font-sans">
            End-to-end engineering spanning frontend user experience and low-level Linux production hosting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <div className="font-mono font-bold text-red-400 text-xs">
              01 // FULL-STACK WEB
            </div>
            <p className="text-neutral-300 leading-relaxed">
              TypeScript, React.js, Next.js (App Router), Node.js, Express, Tailwind CSS, RESTful APIs, and MongoDB/PostgreSQL architectures.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <div className="font-mono font-bold text-red-400 text-xs">
              02 // LINUX VPS & DEVOPS
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Bare-metal Ubuntu VPS management, Caddy reverse proxy with automated SSL, PM2 cluster management, and UFW firewall hardening.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <div className="font-mono font-bold text-red-400 text-xs">
              03 // ALGORITHMIC ENGINES
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Real-time student diagnostic assessment algorithms, dynamic test generation, time-telemetry tracking, and automated billing ledgers.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/investigation"
            className="text-xs text-red-400 hover:text-red-300 font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEE ARSENAL ON PINBOARD CANVAS</span>
          </Link>
          <Link
            href="/skills"
            className="text-xs text-neutral-300 hover:text-white font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <span>INSPECT COMPLETE ARSENAL MATRIX</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* COMPREHENSIVE CASE FILE INDEX (COMPLETE INTERNAL LINK EQUITY) */}
      <section className="p-8 rounded-2xl bg-[#111111] border border-neutral-800 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
          <div>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
              COMPLETE CASE DIRECTORY
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Index of Case Files on Shivam Vishwanaath
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline">DOCKET: #7702-SV</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <Link
            href="/about"
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/50 transition-all space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-red-400 transition-colors">About Bio Dossier</span>
              <BookOpen className="w-3.5 h-3.5 text-red-400" />
            </div>
            <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
              Full background, architecture philosophies, and credentials of Shivam Vishwanaath.
            </p>
          </Link>

          <Link
            href="/projects"
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/50 transition-all space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-red-400 transition-colors">Production Projects</span>
              <FolderKanban className="w-3.5 h-3.5 text-red-400" />
            </div>
            <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
              CBSEForum, BITSATForum, Tutors Forum, and NM Foundation test engines.
            </p>
          </Link>

          <Link
            href="/experience"
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/50 transition-all space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-red-400 transition-colors">Career Timeline</span>
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
              Founder &amp; CEO at The SCI (MCA Feb 2026), Tech Lead at Trans Ed, and internships.
            </p>
          </Link>

          <Link
            href="/skills"
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/50 transition-all space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-red-400 transition-colors">DevOps & Stack</span>
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
              Ubuntu VPS, Caddy, TypeScript, Next.js, PM2, Docker, and Data Science.
            </p>
          </Link>

          <Link
            href="/education"
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/50 transition-all space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-red-400 transition-colors">Academic Pedigree</span>
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
              MBA in Data Science from Amity Online & B.Tech from BIT Mesra.
            </p>
          </Link>

          <Link
            href="/community"
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/50 transition-all space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-red-400 transition-colors">NSS & Community</span>
              <Heart className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
              250+ units blood drive record, EPAC Presidency, and rural child education.
            </p>
          </Link>

          <Link
            href="/contact"
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-red-500/50 transition-all space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-red-400 transition-colors">Direct Recruiter Wire</span>
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-neutral-400 font-sans text-[11px] leading-relaxed">
              Verified email, GitHub, and direct communication coordinates.
            </p>
          </Link>

          <Link
            href="/investigation"
            className="p-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/50 text-red-300 transition-all space-y-1.5 group font-bold"
          >
            <div className="flex items-center justify-between">
              <span className="text-white group-hover:text-red-300">Pinboard Room</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <p className="text-neutral-300 font-sans text-[11px] leading-relaxed font-normal">
              Interactive draggable corkboard with red threads and UV blacklight mode.
            </p>
          </Link>
        </div>
      </section>

      {/* Latest Case Notes (Blog Teaser) */}
      {latestPosts.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Latest Case Notes</span>
            </h2>
            <Link href="/blog" className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1">
              <span>ALL ARTICLES</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestPosts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="p-4 rounded-xl bg-[#111111] hover:bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 transition-all space-y-2 group"
              >
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                  {post.category}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-[11px] text-neutral-400 font-sans line-clamp-2">{post.excerpt}</p>
                <span className="text-[10px] font-mono text-neutral-500">{post.readingMinutes} MIN READ</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Recruiter Callout */}
      <section className="p-8 rounded-2xl bg-gradient-to-r from-red-950/60 via-neutral-900 to-neutral-900 border border-red-500/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>READY TO RECRUIT SHIVAM VISHWANAATH?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Direct Dispatch & Verified Wire
          </h2>
          <p className="text-xs text-neutral-300 font-sans max-w-xl">
            Available for Founder / CTO / Systems Architecture, Tech Lead, and Senior Full-Stack Engineer opportunities in Bhubaneswar, Ranchi, Noida, or Remote worldwide.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-lg flex items-center gap-2 shrink-0 group"
          >
            <span>CONNECT WITH SHIVAM</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
