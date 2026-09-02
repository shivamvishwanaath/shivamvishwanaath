import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Mail, 
  Github, 
  Instagram, 
  Twitter, 
  MapPin, 
  ShieldAlert, 
  Terminal, 
  Send, 
  CheckCircle2,
  ExternalLink,
  MessageSquareCode,
  Briefcase,
  FolderKanban,
  Cpu,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema, getContactPageSchema } from '@/lib/schemas';
import { SITE_URL, SOCIAL_LINKS, CONTACT_KEYWORDS, DEFAULT_OG_IMAGE } from '@/lib/seo-content';

export const metadata: Metadata = {
  title: 'Contact — Direct Recruiter Wire',
  description: 'Direct contact channels for Tech Lead Shivam Vishwanaath. Reach out for technical leadership, senior full-stack engineering, or architecture roles.',
  keywords: CONTACT_KEYWORDS,
  openGraph: {
    title: 'Contact Shivam Vishwanaath | Direct Wire & Recruiter Dispatch',
    description: 'Direct contact channels for Tech Lead Shivam Vishwanaath.',
    url: `${SITE_URL}/contact`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Contact Shivam Vishwanaath' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Shivam Vishwanaath | Direct Wire & Recruiter Dispatch',
    description: 'Direct contact channels for Tech Lead Shivam Vishwanaath.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact Shivam Vishwanaath', url: '/contact' },
  ];

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getContactPageSchema()} />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-300">Contact Shivam Vishwanaath</span>
      </nav>

      <div className="space-y-12">
        {/* Header */}
        <header className="space-y-2 border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIRECT WIRE // RECRUITER DISPATCH & INQUIRIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Connect with Shivam Vishwanaath
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl leading-relaxed">
            Directly connect with Tech Lead Shivam Vishwanaath for Technical Leadership, Full-Stack Architecture, and Systems Engineering opportunities.
          </p>
        </header>

        {/* Primary Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Card */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-red-500/40 space-y-4 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">
                PRIMARY ELECTRONIC MAIL
              </span>
              <p className="text-base font-bold text-white mt-0.5">
                {SOCIAL_LINKS.email}
              </p>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Direct inbox for technical inquiries, job opportunities, and architecture consulting.
              </p>
            </div>

            <a
              href={SOCIAL_LINKS.emailHref}
              className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>DISPATCH DIRECT EMAIL</span>
            </a>
          </div>

          {/* GitHub Card */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                SOURCE CODE ARCHIVES
              </span>
              <p className="text-base font-bold text-white mt-0.5">
                github.com/shivamvishwanaath
              </p>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Explore open-source repositories, full-stack architectures, and production utilities.
              </p>
            </div>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-neutral-800"
            >
              <span>INSPECT GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            </a>
          </div>
        </div>

        {/* Secondary Social Channels */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
            ADDITIONAL VERIFIED CHANNELS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#111111] border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 group-hover:text-red-400 transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Instagram</div>
                  <div className="text-[11px] text-neutral-400">@shivamvishwanaath</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-400 transition-colors" />
            </a>

            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#111111] border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 group-hover:text-red-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">X (Twitter)</div>
                  <div className="text-[11px] text-neutral-400">@svishwanaath</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-400 transition-colors" />
            </a>
          </div>
        </section>

        {/* Cross-Link Exploration Grid */}
        <section className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
              REVIEW THE DOSSIER BEFORE CONTACTING
            </h3>
            <span className="text-[10px] text-neutral-500">EXHIBIT ARCHIVES</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
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
              <span>DevOps & Stack</span>
            </Link>
            <Link
              href="/investigation"
              className="p-3 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 font-bold transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Pinboard Canvas</span>
            </Link>
          </div>
        </section>

        {/* Location & Availability Note */}
        <section className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>GEOGRAPHICAL CORRIDORS & AVAILABILITY</span>
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              Bhubaneswar, Odisha • Ranchi, Jharkhand • Noida (Amity) • Remote Worldwide
            </p>
          </div>

          <span className="px-3 py-1 rounded bg-green-950/60 border border-green-500/40 text-green-400 text-[11px] font-bold shrink-0">
            AVAILABLE FOR HIRE
          </span>
        </section>
      </div>
    </main>
  );
}
