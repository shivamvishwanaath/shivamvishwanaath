import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  ShieldAlert,
  Fingerprint,
  Building,
  FolderKanban,
  Cpu,
  GraduationCap,
  Sparkles,
  Mail
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema, getWorkExperienceSchema } from '@/lib/schemas';
import { SITE_URL, EXPERIENCE_KEYWORDS, DEFAULT_OG_IMAGE } from '@/lib/seo-content';

export const metadata: Metadata = {
  title: 'Experience — Founder, CEO & Systems Architect',
  description: 'Review the professional career and leadership history of Shivam Vishwanaath, Founder & CEO of The SCI SolCielo Innovacion Private Limited™ (MCA India, Feb 2026) and Tech Lead at Trans Ed.',
  keywords: EXPERIENCE_KEYWORDS,
  openGraph: {
    title: 'Experience — Shivam Vishwanaath | Founder & CEO Career Timeline',
    description: 'Review the professional career and technical leadership history of Shivam Vishwanaath.',
    url: `${SITE_URL}/experience`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Shivam Vishwanaath Experience' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience — Shivam Vishwanaath | Founder & CEO Career Timeline',
    description: 'Review the professional career and technical leadership history of Shivam Vishwanaath.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/experience`,
  },
};

const EXPERIENCES = [
  {
    role: 'Founder, CEO & Systems Architect',
    company: 'The SCI SolCielo Innovacion Private Limited™',
    period: '2019 – PRESENT | Pvt. Ltd. Incorporated: Feb 2026 (MCA India)',
    location: 'Ranchi, Jharkhand, India',
    type: 'Founder & Entrepreneur',
    description: 'Founded and led the company from a solo freelancing operation in 2019 to a formally incorporated Private Limited IT company with MCA India in February 2026. Architected and built the Helios Enterprise Cloud Platform — a compiled Go + Fiber v2 engine replacing cPanel, Salesforce, Workday, and Jira with a single self-hosted binary consuming ~15MB RAM idle.',
    highlights: [
      'Formally incorporated as The SCI SolCielo Innovacion Private Limited™ by the Ministry of Corporate Affairs (MCA India) in February 2026.',
      'Founded The SCI SolCielo Innovacion Private Limited™ in 2019 while pursuing B.Tech ECE at BIT Mesra.',
      'Architected the Helios Cloud Engine: compiled Go + Fiber v2, ~15MB RAM idle footprint vs cPanel (1.5GB+). Replaced Caddy, PowerDNS, Postfix/Dovecot, and MariaDB into one unified binary.',
      'Engineered 5 self-hosted enterprise suites (Helios-CRM, HRMS, PM, Support, TrustSign) replacing Salesforce, Workday, Jira, Zendesk, and DocuSign at 10x lower TCO.',
      'Implemented offline cryptographic license verification (HMAC-SHA256) and SHA-256 tamper-evident PDF signing (TrustSign E-Signature Engine).',
      'Handled 9,300+ concurrent users at 99% uptime on JoharNite Fest Portal. Zero financial discrepancies in automated billing for Tutors Forum.',
      'Led team members across India, London, and Dublin — expanded to international clientele.',
    ],
    tags: ['Go / Fiber v2', 'Entrepreneurship', 'Cloud Infrastructure', 'Enterprise SaaS', 'HMAC-SHA256', 'Next.js', 'MariaDB', 'Caddy', 'PowerDNS'],
  },
  {
    role: 'Tech Lead & Full-Stack Architect',
    company: 'Trans Ed',
    period: 'MAY 2025 – PRESENT',
    location: 'Bhubaneswar, Odisha, India',
    type: 'Full-Time Leadership',
    description: 'Directs the engineering roadmap, multi-tenant database topology, and production infrastructure across three flagship educational web platforms serving active student batches.',
    highlights: [
      'Orchestrated full-stack architecture for CBSEForum, BITSATForum, and Tutors Forum.',
      'Designed and deployed dynamic diagnostic algorithms isolating student conceptual blind spots in real time.',
      'Architected end-to-end tutor session scheduling and automated billing engine with zero reconciliation errors.',
      'Provisioned and maintained bare-metal Ubuntu Linux VPS instances, Caddy reverse proxy with automated SSL lifecycle, PM2 cluster management, and Dockerized microservices.',
    ],
    tags: ['Tech Leadership', 'Next.js', 'Node.js', 'Ubuntu VPS', 'Caddy', 'Docker', 'MongoDB', 'PostgreSQL'],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'NM Foundation',
    period: 'MAY 2024 – JULY 2024',
    location: 'Bhubaneswar, Odisha, India',
    type: 'Internship',
    description: 'Engineered cross-platform exam simulation portals for engineering and medical entrance candidates with separated student testing and administrator CMS modules.',
    highlights: [
      'Created customizable test engine allowing students to generate custom quizzes by subject, difficulty, and timer.',
      'Architected dual portals: Administrator CMS for question drafting/verification and Student portal for live testing.',
      'Engineered real-time ranking and national percentile projection algorithms across desktop, tablet, and mobile devices.',
    ],
    tags: ['React.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Responsive Design', 'Algorithm Design'],
  },
  {
    role: 'Event Head & Joint Secretary',
    company: 'National Service Scheme (NSS)',
    period: '2022 – 2025',
    location: 'BIT Mesra, Ranchi, India',
    type: 'Leadership & Social Impact',
    description: 'Directed large-scale humanitarian drives, managed volunteer logistics, and coordinated multi-site educational initiatives.',
    highlights: [
      'Spearheaded the annual Mega Blood Donation Drive collecting 250+ units of blood in a single 24-hour cycle.',
      'Led the Village Education Program reaching 130+ underprivileged children with structured syllabus cycles.',
      'Managed volunteer distribution, event logistics, administrative sponsorships, and institutional coordination.',
    ],
    tags: ['Operations', 'Team Leadership', 'Crisis Management', 'Logistics', 'NSS'],
  },
  {
    role: 'President',
    company: 'EPAC (Environmental Protection & Awareness Club)',
    period: '2022 – 2025',
    location: 'BIT Mesra, Ranchi, India',
    type: 'Organizational Leadership',
    description: 'Led 35+ active student advocates for campus sustainability initiatives and engineered the official community web portal.',
    highlights: [
      'Engineered the official EPAC web platform using React and Tailwind CSS.',
      'Connected 35+ active student members with a network of 100+ alumni mentors.',
      'Organized sustainability drives and university festival events with zero downtime on registration portals.',
    ],
    tags: ['React.js', 'Tailwind CSS', 'Community Governance', 'Alumni Portal'],
  },
];

export default function ExperiencePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Experience of Shivam Vishwanaath', url: '/experience' },
  ];

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getWorkExperienceSchema()} />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-300">Experience of Shivam Vishwanaath</span>
      </nav>

      <div className="space-y-12">
        {/* Header */}
        <header className="space-y-2 border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL CAREER DOCKET // CHRONOLOGICAL LOGS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Professional Experience of Shivam Vishwanaath
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-3xl leading-relaxed">
            Verified timeline of technical leadership positions, systems architecture roles, and humanitarian impact projects directed by Shivam Vishwanaath.
          </p>
        </header>

        {/* Timeline */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <article
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4 shadow-lg hover:border-neutral-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-4">
                <div>
                  <div className="text-[10px] text-red-400 font-bold tracking-wider uppercase">
                    {exp.company}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {exp.role}
                  </h2>
                </div>

                <div className="flex flex-col sm:items-end text-xs text-neutral-400">
                  <span className="flex items-center gap-1 font-bold text-neutral-300">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-neutral-500 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {exp.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-red-500" />
                  <span>KEY AUDITED DELIVERABLES:</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/80">
                {exp.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Cross-Link Exploration Grid */}
        <section className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
              EXPLORE ADJACENT CASE SECTIONS
            </h3>
            <span className="text-[10px] text-neutral-500">CROSS-EXAMINATION</span>
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
              href="/skills"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>DevOps & Arsenal</span>
            </Link>
            <Link
              href="/investigation"
              className="p-3 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 font-bold transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Pinboard Canvas</span>
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
