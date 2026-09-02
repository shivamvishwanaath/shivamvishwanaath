import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Terminal,
  ShieldAlert,
  Cpu,
  Briefcase,
  FolderKanban,
  Heart,
  Mail,
  Sparkles
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbSchema, getEducationSchema } from '@/lib/schemas';
import { SITE_URL, EDUCATION_KEYWORDS, DEFAULT_OG_IMAGE } from '@/lib/seo-content';

export const metadata: Metadata = {
  title: 'Education & Credentials',
  description: 'Academic background of Shivam Vishwanaath: MBA in Data Science from Amity Online, B.Tech in Electronics & Communication Engineering from BIT Mesra, and Chinmaya Vidyalaya.',
  keywords: EDUCATION_KEYWORDS,
  openGraph: {
    title: 'Education & Credentials — Shivam Vishwanaath | Academic Pedigree',
    description: 'Academic background of Shivam Vishwanaath: MBA in Data Science from Amity Online, B.Tech in ECE from BIT Mesra.',
    url: `${SITE_URL}/education`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Shivam Vishwanaath Education' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education & Credentials — Shivam Vishwanaath | Academic Pedigree',
    description: 'Academic background of Shivam Vishwanaath: MBA in Data Science from Amity Online, B.Tech in ECE from BIT Mesra.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/education`,
  },
};

const EDUCATION_ITEMS = [
  {
    institution: 'Amity Online',
    degree: 'Master of Business Administration (MBA) in Data Science',
    period: '2025 – 2027',
    location: 'Noida, Uttar Pradesh, India',
    status: 'In Progress (Active Cohort)',
    description: 'Specialized advanced curriculum combining business leadership, statistical machine learning, predictive modeling, data pipeline architecture, and enterprise analytics.',
    coursework: [
      'Data Science & Predictive Modeling',
      'Advanced Statistical Analysis & Python Pipelines',
      'Machine Learning Algorithms & Optimization',
      'Enterprise Technology Strategy & Agile Governance',
    ],
  },
  {
    institution: 'Birla Institute of Technology, Mesra (BIT Mesra)',
    degree: 'Bachelor of Technology (B.Tech) in Electronics & Communication Engineering',
    period: '2021 – 2025',
    location: 'Ranchi, Jharkhand, India',
    status: 'Completed / Verified Pedigree',
    description: 'Rigorous undergraduate engineering program covering microprocessors, digital signal processing, communication networks, algorithmic problem solving, and embedded systems.',
    coursework: [
      'Data Structures & Algorithms in C / C++',
      'Digital Signal Processing & Microprocessor Architecture',
      'Computer Networks & Distributed Communication',
      'Database Management Systems & Information Systems',
    ],
  },
  {
    institution: 'Chinmaya Vidyalaya',
    degree: 'Senior Secondary Certificate (Class XII CBSE)',
    period: '2018 – 2020',
    location: 'Bokaro Steel City, Jharkhand, India',
    status: 'Completed (92% Score)',
    description: 'Core scientific foundations with specialization in Physics, Chemistry, and Mathematics.',
    coursework: [
      'Advanced Physics & Calculus-based Mechanics',
      'Organic, Inorganic & Physical Chemistry',
      'Higher Mathematics & Statistics',
    ],
  },
];

export default function EducationPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Education & Credentials of Shivam Vishwanaath', url: '/education' },
  ];

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full font-mono">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getEducationSchema()} />

      {/* Breadcrumb Visual */}
      <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-300">Education & Credentials of Shivam Vishwanaath</span>
      </nav>

      <div className="space-y-12">
        {/* Header */}
        <header className="space-y-2 border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>VERIFIED ACADEMIC DOSSIER // PEDIGREE & CREDENTIALS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Academic Credentials of Shivam Vishwanaath
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-3xl leading-relaxed">
            Dual engineering and data science background combining hardware-level ECE rigor from BIT Mesra with modern predictive data pipelines and business strategy at Amity Online.
          </p>
        </header>

        {/* Education List */}
        <div className="space-y-6">
          {EDUCATION_ITEMS.map((edu, idx) => (
            <article
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-4">
                <div>
                  <div className="text-[10px] text-red-400 font-bold tracking-wider uppercase">
                    {edu.status}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {edu.degree}
                  </h2>
                  <div className="text-xs font-bold text-neutral-300 mt-0.5">
                    {edu.institution}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-xs text-neutral-400">
                  <span className="flex items-center gap-1 font-bold text-neutral-300">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-neutral-500 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {edu.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-red-500" />
                  <span>KEY DOMAINS & RIGOROUS STUDY:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 font-sans">
                  {edu.coursework.map((course, cIdx) => (
                    <div key={cIdx} className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800/80 flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Cross-Link Exploration Grid */}
        <section className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">
              CROSS-EXAMINE RELATED CASE SECTIONS
            </h3>
            <span className="text-[10px] text-neutral-500">CORROBORATING EVIDENCE</span>
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
              href="/skills"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>DevOps & Stack</span>
            </Link>
            <Link
              href="/community"
              className="p-3 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 transition-colors flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>NSS Leadership</span>
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
