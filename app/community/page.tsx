import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Heart, 
  Users, 
  Award, 
  Calendar, 
  MapPin, 
  ShieldAlert, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Flame,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Mail,
  Cpu
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema, getCommunitySchema } from '@/lib/schemas';
import { SITE_URL, COMMUNITY_KEYWORDS, DEFAULT_OG_IMAGE } from '@/lib/seo-content';

export const metadata: Metadata = {
  title: 'Community Leadership & Social Impact',
  description: 'Humanitarian and community leadership of Shivam Vishwanaath: NSS Event Head (250+ units blood drive, 130+ kids educated) and President of EPAC.',
  keywords: COMMUNITY_KEYWORDS,
  openGraph: {
    title: 'Community Leadership — Shivam Vishwanaath | Social Impact & NSS',
    description: 'Humanitarian and community leadership of Shivam Vishwanaath: NSS Event Head and President of EPAC.',
    url: `${SITE_URL}/community`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Shivam Vishwanaath Community Leadership' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Leadership — Shivam Vishwanaath | Social Impact & NSS',
    description: 'Humanitarian and community leadership of Shivam Vishwanaath: NSS Event Head and President of EPAC.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/community`,
  },
};

const LEADERSHIP_INITIATIVES = [
  {
    title: 'Mega Blood Donation Drive (500+ Units in 24 Hours)',
    organization: 'National Service Scheme (NSS)',
    role: 'Event Head',
    period: '2022 – 2025',
    location: 'BIT Mesra / Jharkhand, India',
    metrics: [
      { label: 'Units Collected', value: '500+ Units in 1 Day' },
      { label: 'Volunteers Coordinated', value: '150+ Members' },
      { label: 'Medical Partners', value: 'Regional Blood Banks' },
    ],
    summary: 'Promoted from Joint Secretary to Event Head at NSS, Shivam Vishwanaath organized and directed the annual institutional Blood Donation Drive, setting a record-breaking collection of 500+ units in a single 24-hour cycle.',
    details: [
      'Managed end-to-end donor safety logistics, medical intake stations, and volunteer team dispatch.',
      'Secured administrative sponsorships, healthcare partner approvals, and awareness campaigns reaching thousands of university students.',
      'Received institutional commendation for zero logistical bottlenecks and record-setting community turnout.',
    ],
  },
  {
    title: 'Village Education Program (300+ Children Educated)',
    organization: 'National Service Scheme (NSS)',
    role: 'Initiative Lead',
    period: '2022 – 2025',
    location: 'Rural Ranchi & Jharkhand, India',
    metrics: [
      { label: 'Children Taught', value: '300+ Students' },
      { label: 'Village Centers', value: '8 Remote Hubs' },
      { label: 'Curriculum Cycles', value: 'Structured Syllabus' },
    ],
    summary: 'Shivam Vishwanaath directed weekend teaching workshops for underprivileged children across multiple remote village centers, providing structured syllabus cycles, educational kits, and foundational science tutoring.',
    details: [
      'Structured weekly learning modules in mathematics, basic science, and digital literacy for elementary cohorts (200+ students per batch).',
      'Recruited and scheduled volunteer tutors from BIT Mesra to guarantee continuous educational mentorship.',
      'Organized distribution of textbooks, stationery, and learning materials across target rural communities.',
    ],
  },
  {
    title: 'EPAC Presidency & Campus Sustainability',
    organization: 'Environmental Protection & Awareness Club (EPAC)',
    role: 'President',
    period: '2022 – 2025',
    location: 'BIT Mesra, Ranchi, India',
    metrics: [
      { label: 'Advocates Led', value: '100+ Active Members' },
      { label: 'Alumni Network', value: '250+ Mentors' },
      { label: 'Platform Uptime', value: '100% Zero Downtime' },
    ],
    summary: 'As President of EPAC, Shivam Vishwanaath directed university-wide environmental initiatives, managed 100+ active student advocates, and personally engineered the official web portal connecting active members with over 250 alumni mentors.',
    details: [
      'Engineered the official responsive EPAC web platform using React.js and Tailwind CSS.',
      'Organized plantation campaigns, environmental awareness seminars, and green campus hackathons during university fests.',
      'Built sustainable community infrastructure that remains actively utilized by student cohorts.',
    ],
  },
];

export default function CommunityPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Community Leadership of Shivam Vishwanaath', url: '/community' },
  ];

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getCommunitySchema()} />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-300">Community Leadership of Shivam Vishwanaath</span>
      </nav>

      <div className="space-y-12">
        {/* Header */}
        <header className="space-y-2 border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            <Heart className="w-3.5 h-3.5" />
            <span>HUMANITARIAN COMMAND // SOCIAL WELFARE & GOVERNANCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Community Leadership of Shivam Vishwanaath
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-3xl leading-relaxed">
            Record-breaking humanitarian mobilization, village education initiatives, and environmental organization presidencies led by Shivam Vishwanaath.
          </p>
        </header>

        {/* Initiatives */}
        <div className="space-y-6">
          {LEADERSHIP_INITIATIVES.map((init, idx) => (
            <article
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-neutral-800 space-y-5 shadow-lg hover:border-neutral-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-4">
                <div>
                  <div className="text-[10px] text-red-400 font-bold tracking-wider uppercase">
                    {init.organization} • {init.role}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {init.title}
                  </h2>
                </div>

                <div className="flex flex-col sm:items-end text-xs text-neutral-400">
                  <span className="flex items-center gap-1 font-bold text-neutral-300">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    {init.period}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-neutral-500 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {init.location}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {init.summary}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {init.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 uppercase">{m.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Bulleted specifics */}
              <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  VERIFIED EXECUTION HIGHLIGHTS:
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {init.details.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Cross-Link Exploration Grid */}
        <section className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
              CORROBORATING LEADERSHIP RECORDS
            </h3>
            <span className="text-[10px] text-neutral-500">CROSS-EXAMINATION</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/experience"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Career Timeline</span>
            </Link>
            <Link
              href="/education"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Academic Pedigree</span>
            </Link>
            <Link
              href="/projects"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <FolderKanban className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Production Projects</span>
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
      </div>
    </main>
  );
}
