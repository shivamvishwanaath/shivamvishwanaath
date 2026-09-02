import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldAlert, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Server, 
  Code, 
  ArrowRight, 
  Terminal,
  Heart,
  ExternalLink,
  Sparkles,
  HelpCircle,
  FolderKanban,
  Cpu,
  Mail,
  Compass
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema, getProfilePageSchema, getFAQPageSchema } from '@/lib/schemas';
import { STATIC_FAQS } from '@/lib/static-faq';
import { SITE_URL, SOCIAL_LINKS, ABOUT_KEYWORDS, DEFAULT_OG_IMAGE } from '@/lib/seo-content';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const metadata: Metadata = {
  title: 'About — Founder, CEO & Full-Stack Systems Architect',
  description: 'Learn about Shivam Vishwanaath — Founder & CEO of The SCI SolCielo Innovacion Private Limited™ (MCA India, Feb 2026), systems architect, and Tech Lead at Trans Ed.',
  keywords: ABOUT_KEYWORDS,
  openGraph: {
    title: 'About Shivam Vishwanaath | Founder & CEO, Systems Architect',
    description: 'Learn about Shivam Vishwanaath — Founder & CEO of The SCI SolCielo Innovacion Private Limited™, systems architect, and Tech Lead.',
    url: `${SITE_URL}/about`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'About Shivam Vishwanaath' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Shivam Vishwanaath | Founder & CEO, Systems Architect',
    description: 'Learn about Shivam Vishwanaath — Founder & CEO of The SCI SolCielo Innovacion Private Limited™, systems architect, and Tech Lead.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About Shivam Vishwanaath', url: '/about' },
  ];

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getProfilePageSchema()} />
      <JsonLd schema={getFAQPageSchema(STATIC_FAQS)} />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-300">About Shivam Vishwanaath</span>
      </nav>

      <article className="space-y-12">
        {/* Profile Hero Header */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-neutral-800 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-xl">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-xl overflow-hidden border-2 border-red-500/60 shadow-2xl shrink-0 bg-neutral-900">
            <Image
              src="/images/shivam-vishwanaath.webp"
              alt="Shivam Vishwanaath — Tech Lead & Full-Stack Architect"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 160px, 192px"
            />
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>CONFIDENTIAL CASE DOSSIER #01</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Shivam Vishwanaath
              </h1>
              <p className="text-sm sm:text-base text-red-400 font-bold">
                Founder &amp; CEO, The SCI SolCielo Innovacion Pvt. Ltd. · Systems Architect
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Shivam Vishwanaath is an engineering leader and full-stack software architect directing cloud systems, automated EdTech marketplaces, and diagnostic examination engines. With an engineering foundation from BIT Mesra and advanced Data Science credentials from Amity Online, Shivam Vishwanaath combines algorithmic rigor with bare-metal Linux DevOps reliability.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs text-neutral-400">
              <a href="https://thesci.co" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <Briefcase className="w-3.5 h-3.5 text-red-400" />
                Founder @ The SCI SolCielo
              </a>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                Bhubaneswar / Ranchi / Remote
              </span>
              <Link href="/education" className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <GraduationCap className="w-3.5 h-3.5 text-red-400" />
                BIT Mesra & Amity Online
              </Link>
            </div>
          </div>
        </section>

        {/* Narrative Biography */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-red-500" />
            <span>ARCHITECTURAL PROFILE & ENGINEERING JOURNEY</span>
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            <p>
              Shivam Vishwanaath is the <strong>Founder & CEO of The SCI SolCielo Innovacion Private Limited™</strong> (founded 2019, registered with MSME Udyam Certificate in 2024, incorporated as Private Limited company with MCA India in Feb 2026), where he architected the <strong>Helios Enterprise Cloud Platform</strong> — a compiled Go + Fiber v2 engine replacing cPanel, Salesforce, Workday, Jira, Zendesk, and DocuSign with a self-hosted binary consuming ~15MB RAM idle.
            </p>
            <p>
              As Tech Lead at Trans Ed, Shivam Vishwanaath has spearheaded the architectural design, database modeling, and server deployment of three premier educational portals: <strong>CBSEForum</strong> (comprehensive study platform for Classes 1–12), <strong>BITSATForum</strong> (diagnostic test series engine with real-time weak-area telemetry), and <strong>Tutors Forum</strong> (marketplace with automated session billing and ledger management).
            </p>
            <p>
              Beyond application logic, Shivam Vishwanaath manages production hosting infrastructure: administering bare-metal Ubuntu Linux VPS instances, orchestrating Caddy reverse proxy setups with automated TLS/SSL rotation, managing Node.js PM2 process clustering with zero-downtime hot reloads, and containerizing microservices via Docker.
            </p>
            <p>
              Prior to his Tech Lead appointment, Shivam Vishwanaath delivered full-stack test portals for NM Foundation (supporting JEE & NEET aspirants), developed the high-throughput JoharNite Fest portal maintaining 99% uptime for 9.3K+ users, and published a native Android Periodic Table app earning 70+ five-star reviews on the Google Play Store.
            </p>
          </div>
        </section>

        {/* Verified Milestones Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-red-500" />
            <span>CORE PILLARS OF SHIVAM VISHWANAATH</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#111111] border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400">
                <Code className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Full-Stack Mastery</h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Expert in TypeScript, React.js, Next.js, Node.js, Express, MongoDB, PostgreSQL, and scalable API design.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#111111] border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Linux VPS & DevOps</h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Hands-on bare-metal server hardening, Caddy SSL automation, PM2 process management, and Docker Compose orchestration.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#111111] border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Community & Leadership</h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Led record 250+ blood units drive as NSS Event Head, educated 130+ village children, and directed EPAC environmental organization.
              </p>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ RICH RESULTS ACCORDION) */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-500" />
              <span>FREQUENTLY ASKED QUESTIONS ABOUT SHIVAM VISHWANAATH</span>
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Direct intelligence answers regarding technical leadership, DevOps stack, flagship platforms, and recruitment coordinates.
            </p>
          </div>

          <div className="space-y-3">
            {STATIC_FAQS.map(faq => (
              <details
                key={faq.id}
                className="group p-4 rounded-xl bg-[#111111] border border-neutral-800 open:border-red-500/60 transition-all shadow-md"
              >
                <summary className="text-xs sm:text-sm font-bold text-white cursor-pointer list-none flex items-center justify-between gap-3 group-open:text-red-400">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">Q:</span>
                    <span>{faq.question}</span>
                  </div>
                  <span className="text-neutral-500 text-xs shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-3 pt-3 border-t border-neutral-800/80 text-xs text-neutral-300 font-sans leading-relaxed prose prose-sm prose-invert prose-red max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {faq.answerMarkdown.replace(/###[^\n]+\n/, '').trim()}
                  </ReactMarkdown>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* COMPREHENSIVE CASEBOOK CROSS-NAVIGATION GRID */}
        <section className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
              EXPLORE SHIVAM VISHWANAATH&apos;S COMPLETE CASEBOOK
            </h3>
            <span className="text-[10px] text-neutral-500">6 VERIFIED EXHIBIT SECTIONS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/projects"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <FolderKanban className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Production Projects</span>
            </Link>
            <Link
              href="/experience"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Career Timeline</span>
            </Link>
            <Link
              href="/skills"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>DevOps & Arsenal</span>
            </Link>
            <Link
              href="/education"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Academic Pedigree</span>
            </Link>
            <Link
              href="/community"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>NSS & Community</span>
            </Link>
            <Link
              href="/contact"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct Wire</span>
            </Link>
          </div>
        </section>

        {/* Action Bottom Nav */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-900 border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">
              EXPLORE SHIVAM VISHWANAATH&apos;S WORK
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Inspect detailed case files, project breakdowns, and technical telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href="/investigation"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>LAUNCH CRIME PINBOARD</span>
            </Link>
            <Link
              href="/projects"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all border border-neutral-800 flex items-center justify-center gap-2"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors flex items-center justify-center"
            >
              CONTACT
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
