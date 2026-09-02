export type ClueType = 
  | 'polaroid'
  | 'dossier'
  | 'newspaper'
  | 'sticky'
  | 'map'
  | 'arsenal'
  | 'evidence-bag'
  | 'document';

export type ClueCategory = 
  | 'profile'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'leadership'
  | 'headlines';

export interface ClueItem {
  id: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  pageCategory?: 'profile' | 'projects' | 'experience' | 'skills' | 'education' | 'leadership' | 'general';
  title: string;
  subtitle: string;
  category: ClueCategory;
  type: ClueType;
  x: number;
  y: number;
  rotation: number;
  pinColor?: 'red' | 'brass' | 'blue' | 'black';
  stamp?: 'CLASSIFIED' | 'CONFIDENTIAL' | 'SOLVED' | 'VERIFIED' | 'HIGH PRIORITY' | 'IMPACT' | 'TECH LEAD';
  headline?: string;
  date?: string;
  location?: string;
  summary: string;
  details: string[];
  metrics?: { label: string; value: string }[];
  tags: string[];
  links?: { label: string; url: string; icon?: string }[];
  uvSecret?: string; // Revealed in UV Blacklight mode
  imageUrl?: string;
  pinned?: boolean;
}

export interface RedStringConnection {
  id: string;
  fromId: string;
  toId: string;
  label?: string;
  narrativeReason?: string;
  style?: 'crimson' | 'neon' | 'dashed';
  category?: 'core' | 'tech' | 'leadership' | 'custom';
}

export interface StoryChapter {
  id: number;
  title: string;
  timeframe: string;
  narrative: string;
  focusedClueIds: string[];
  highlightConnections: string[];
  headline: string;
}

export const INITIAL_CLUES: ClueItem[] = [
  {
    id: 'subject-shivam',
    slug: 'shivam-vishwanaath-profile',
    seoTitle: 'Shivam Vishwanaath — Founder & CEO, Helios Platform Architect',
    seoDescription: 'Founder & CEO of The SCI SolCielo Innovacion Private Limited™ (MCA India, Feb 2026). Architect of the Helios Enterprise Cloud Platform replacing cPanel, Salesforce, Workday, Jira, Zendesk and DocuSign.',
    pageCategory: 'profile',
    title: 'SUBJECT: SHIVAM VISHWANAATH',
    subtitle: 'Founder & CEO, The SCI SolCielo Innovacion Pvt. Ltd.',
    category: 'profile',
    type: 'polaroid',
    x: 91,
      y: 88,
    rotation: -2,
    pinColor: 'red',
    stamp: 'VERIFIED',
    summary: 'Central Person of Interest: Shivam Vishwanaath. Founder & CEO of The SCI SolCielo Innovacion Private Limited™, high-performance systems architect, and platform engineer.',
    details: [
      'Shivam Vishwanaath is the Founder & CEO of The SCI SolCielo Innovacion Private Limited™ (MCA India, Feb 2026), architect of the Helios Enterprise Cloud Platform, and Tech Lead at Trans Ed.',
      'Specialized in compiled Go + Fiber v2 cloud infrastructure, self-hosted enterprise SaaS suites, Linux Ubuntu VPS DevOps, Caddy SSL automation, and cryptographic trust systems.',
      'Active leadership in regional community initiatives: 500+ units blood donation drive, 300+ underprivileged children taught, and EPAC Presidency with 100+ active advocates.'
    ],
    metrics: [
      { label: 'Primary Role', value: 'Founder & CEO' },
      { label: 'Enterprise Suites', value: '5 Built' },
      { label: 'Focus', value: 'Cloud & Systems' }
    ],
    tags: ['Shivam Vishwanaath', 'Founder & CEO', 'The SCI SolCielo', 'Go / Fiber v2', 'Tech Lead', 'Architect', 'DevOps'],
    links: [
      { label: 'The SCI Portal', url: 'https://thesci.co' },
      { label: 'GitHub Profile', url: 'https://github.com/shivamvishwanaath' },
      { label: 'Instagram Intel', url: 'https://www.instagram.com/shivamvishwanaath/' },
      { label: 'X (Twitter) Feed', url: 'https://x.com/svishwanaath' },
      { label: 'Direct Wire (Email)', url: 'mailto:shivam.strive@gmail.com' }
    ],
    uvSecret: 'CLASSIFIED: Founded The SCI SolCielo Innovacion Private Limited™ (MCA India, Feb 2026). Architect of Helios: 5 enterprise SaaS suites in one compiled Go binary, replacing $7,000+/month SaaS stacks with ~15MB RAM idle.',
    imageUrl: '/images/shivam-vishwanaath.png'
  },
  {
    id: 'headline-transed',
    slug: 'trans-ed-tech-lead',
    seoTitle: 'Trans Ed Tech Lead Command — Shivam Vishwanaath',
    seoDescription: 'Shivam Vishwanaath appointed as Tech Lead at Trans Ed, orchestrating enterprise software architectures for CBSEForum, BITSATForum, and Tutors Forum.',
    pageCategory: 'experience',
    title: 'THE MORNING CHRONICLE',
    subtitle: 'Front Page Investigation',
    category: 'headlines',
    type: 'newspaper',
    x: 436,
      y: 74,
    rotation: 2,
    pinColor: 'red',
    headline: 'TECH LEAD SHIVAM VISHWANAATH ORCHESTRATES 3 EDTECH PLATFORMS',
    date: 'MAY 2025 – PRESENT',
    location: 'Bhubaneswar, IN',
    stamp: 'HIGH PRIORITY',
    summary: 'Trans Ed appoints Shivam Vishwanaath as Tech Lead to direct enterprise architectures for CBSEForum, BITSATForum, and Tutors Forum.',
    details: [
      'Shivam Vishwanaath orchestrated multi-tier frontend, API microservices, and database layers for active cohorts of competitive exam aspirants.',
      'Integrated weak-area detection algorithms analyzing student response patterns in real time.',
      'Built end-to-end tutor session scheduling and automated billing engine with zero reconciliation errors.'
    ],
    metrics: [
      { label: 'Position', value: 'Tech Lead' },
      { label: 'Platforms Built', value: '3 Major Portals' },
      { label: 'Impact', value: 'Classes 1–12 & BITSAT' }
    ],
    tags: ['Trans Ed', 'Shivam Vishwanaath', 'Tech Lead', 'Architecture', 'CBSEForum', 'BITSATForum'],
    uvSecret: 'SYSTEM LOG: Real-time recommendation engine engineered by Shivam Vishwanaath reduces diagnostic study time by 40%.'
  },
  {
    id: 'dossier-cbse-bitsat',
    slug: 'cbseforum-bitsatforum',
    seoTitle: 'CBSEForum & BITSATForum Platforms — Built by Shivam Vishwanaath',
    seoDescription: 'Comprehensive examination and diagnostic test simulation engines engineered by Shivam Vishwanaath for Classes 1-12 and BITSAT candidates.',
    pageCategory: 'projects',
    title: 'CASE FILE: CBSE & BITSAT FORUM',
    subtitle: 'Intelligent Academic Platforms',
    category: 'projects',
    type: 'dossier',
    x: 772,
      y: 84,
    rotation: -1,
    pinColor: 'brass',
    stamp: 'VERIFIED',
    summary: 'Comprehensive exam ecosystems providing chapter-wise, topic-wise, and full-length simulated examinations engineered by Shivam Vishwanaath.',
    details: [
      'CBSEForum: Centralized study repository and exam-oriented practice modules for Classes 1 through 12.',
      'BITSATForum: Smart algorithmic test simulator matching official timing, negative marking, and difficulty tiers.',
      'Built performance analytics engine tracking accuracy, velocity, and topic-level mastery over time.'
    ],
    metrics: [
      { label: 'Scope', value: 'Classes 1-12 & Entrance' },
      { label: 'Engine', value: 'Smart Analytics' }
    ],
    tags: ['React.js', 'Node.js', 'Algorithms', 'Analytics', 'Databases', 'Shivam Vishwanaath'],
    uvSecret: 'ALGORITHM BLUEPRINT: O(n log k) weak-topic clustering based on time-per-question telemetry designed by Shivam Vishwanaath.'
  },
  {
    id: 'dossier-tutors-forum',
    slug: 'tutors-forum',
    seoTitle: 'Tutors Forum Automated Billing Marketplace — Built by Shivam Vishwanaath',
    seoDescription: 'End-to-end educational marketplace with automated billing pipelines, session scheduling, and ledger reconciliations built by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'CASE FILE: TUTORS FORUM',
    subtitle: 'Automated EdTech Marketplace & Billing',
    category: 'projects',
    type: 'dossier',
    x: 1128,
      y: 71,
    rotation: -2,
    pinColor: 'red',
    stamp: 'SOLVED',
    summary: 'Complete marketplace connecting students and verified tutors with automated billing, rate calculations, and lesson tracking engineered by Shivam Vishwanaath.',
    details: [
      'Engineered interactive session scheduler with calendar synchronization and conflict resolution.',
      'Implemented automated billing pipelines calculating hourly rates, commission structures, and payout records.',
      'Syllabus progression monitor allowing parents and students to visualize curriculum milestone completion.'
    ],
    metrics: [
      { label: 'Core System', value: 'Automated Billing' },
      { label: 'Feature', value: 'Live Scheduling' }
    ],
    tags: ['Node.js', 'Express', 'Payment Systems', 'MongoDB', 'REST APIs', 'Shivam Vishwanaath'],
    uvSecret: 'SECURITY AUDIT: Zero financial discrepancies across automated session ledger entries architected by Shivam Vishwanaath.'
  },
  {
    id: 'polaroid-nm-foundation',
    slug: 'nm-foundation',
    seoTitle: 'NM Foundation JEE/NEET Dual Portal — Engineered by Shivam Vishwanaath',
    seoDescription: 'Full-stack cross-platform exam simulation portals with customized test generation and percentile calculation engineered by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'EVIDENCE 04: NM FOUNDATION',
    subtitle: 'JEE/NEET Dual Portal Platform',
    category: 'experience',
    type: 'polaroid',
    x: 1489,
      y: 79,
    rotation: -3,
    pinColor: 'blue',
    stamp: 'CONFIDENTIAL',
    date: 'MAY 2024 – JULY 2024',
    location: 'Bhubaneswar',
    summary: 'Full-stack cross-platform exam preparation ecosystem with separate admin authoring and student assessment portals built by Shivam Vishwanaath.',
    details: [
      'Created customizable test engine allowing students to generate custom quizzes by subject, difficulty, and timer.',
      'Architected dual portals: Administrator CMS for question drafting / verification and Student portal for live testing.',
      'Engineered real-time ranking and national percentile projection algorithms across desktop, tablet, and mobile.'
    ],
    metrics: [
      { label: 'Role', value: 'Full Stack Intern' },
      { label: 'Domain', value: 'JEE / NEET Prep' },
      { label: 'Devices', value: 'Desktop + Mobile' }
    ],
    tags: ['React.js', 'Node.js', 'PostgreSQL/Supabase', 'Responsive UI', 'Shivam Vishwanaath'],
    uvSecret: 'FIELD REPORT: Scaled smoothly under simultaneous concurrent mock test test-takers under Shivam Vishwanaath\'s supervision.'
  },
  {
    id: 'sticky-periodic-table',
    slug: 'periodic-table-app',
    seoTitle: 'Periodic Table Android App (70+ 5-Stars) — Developed by Shivam Vishwanaath',
    seoDescription: 'Standalone native Android chemistry utility with 70+ five-star reviews on Google Play Store, engineered by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'CLUE: 100+ DOWNLOADS & 70+ 5-STARS',
    subtitle: 'Periodic Table Android App',
    category: 'projects',
    type: 'sticky',
    x: 1826,
      y: 92,
    rotation: 4,
    pinColor: 'brass',
    stamp: 'VERIFIED',
    summary: 'Independently engineered and published interactive chemistry tool on Google Play Store with 70+ five-star reviews by Shivam Vishwanaath.',
    details: [
      '100+ hours of dedicated Android development using Android Studio, Java, and XML layouts.',
      'Dynamic element search, isotope data, electron shell visualizer, and rapid property lookups.',
      'Achieved a spotless 5.0 rating average with rave reviews for UI speed and offline utility.'
    ],
    metrics: [
      { label: 'Ratings', value: '70+ 5-Star Reviews' },
      { label: 'Platform', value: 'Google Play Store' },
      { label: 'Tech', value: 'Java & Android XML' }
    ],
    tags: ['Android Studio', 'Java', 'XML', 'Mobile UX', 'Google Play', 'Shivam Vishwanaath'],
    uvSecret: 'CRACKED CODE: 100% offline-first architecture with sub-10ms element lookups engineered by Shivam Vishwanaath.'
  },
  {
    id: 'sticky-chem-forum',
    slug: 'chemistry-forum',
    seoTitle: 'Chemistry Forum Automation Platform — Built by Shivam Vishwanaath',
    seoDescription: 'Student doubt resolution and automated grievance triage system slashing manual workload by 65%, built by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'NOTE: CHEMISTRY FORUM PLATFORM',
    subtitle: '65% Manual Grievance Reduction',
    category: 'projects',
    type: 'sticky',
    x: 75,
      y: 389,
    rotation: -2,
    pinColor: 'red',
    stamp: 'IMPACT',
    summary: 'Targeted web platform solving student doubts and automated grievance resolution for national entrance candidates created by Shivam Vishwanaath.',
    details: [
      'Built automated query categorization and peer-to-mentor routing algorithms.',
      'Directly slashed manual ticket handling workload by 65% in production testing.',
      'Clean markdown chemistry formula and equation rendering integration.'
    ],
    metrics: [
      { label: 'Efficiency Gain', value: '65% Workload Drop' },
      { label: 'Audience', value: 'JEE/NEET Students' }
    ],
    tags: ['Full Stack', 'Workflow Automation', 'React', 'Firebase', 'Shivam Vishwanaath'],
    uvSecret: 'TELEMETRY: Average query resolution time dropped from 14 hours to 35 minutes under Shivam Vishwanaath\'s automation routing.'
  },
  {
    id: 'headline-blood-drive',
    slug: 'nss-blood-donation-leadership',
    seoTitle: 'NSS Blood Donation & Social Impact Record — Led by Shivam Vishwanaath',
    seoDescription: 'Shivam Vishwanaath led NSS Mega Blood Donation Drive mobilizing 250+ units in 24 hours and directed village education for 130+ kids.',
    pageCategory: 'leadership',
    title: 'THE SOCIAL DISPATCH',
    subtitle: 'Extraordinary Community Impact',
    category: 'headlines',
    type: 'newspaper',
    x: 424,
      y: 412,
    rotation: -4,
    pinColor: 'red',
    headline: 'RECORD 250+ BLOOD UNITS COLLECTED IN SINGLE DAY & 130+ CHILDREN EDUCATED',
    date: '2022 – 2025',
    location: 'BIT Mesra / Jharkhand',
    stamp: 'IMPACT',
    summary: 'Shivam Vishwanaath promoted from Joint Secretary to Event Head at NSS, orchestrating record-breaking humanitarian campaigns.',
    details: [
      'Shivam Vishwanaath spearheaded the annual Mega Blood Donation Drive collecting 250+ units in a single 24-hour cycle.',
      'Led the Village Education Program reaching 130+ underprivileged children with structured syllabus cycles (100+ students/batch).',
      'Managed volunteer teams, logistical supply chains, and administrative sponsorships.'
    ],
    metrics: [
      { label: 'Blood Units', value: '250+ in 1 Day' },
      { label: 'Children Taught', value: '130+ Kids' },
      { label: 'Leadership', value: 'NSS Event Head' }
    ],
    tags: ['NSS', 'Shivam Vishwanaath', 'Leadership', 'Social Impact', 'Operations', 'Event Head'],
    uvSecret: 'HEART OF GOLD: Shivam Vishwanaath coordinated 80+ volunteers across 4 remote village centers simultaneously.'
  },
  {
    id: 'dossier-epac',
    slug: 'epac-presidency',
    seoTitle: 'EPAC Presidency & Alumni Portal — Directed by Shivam Vishwanaath',
    seoDescription: 'Shivam Vishwanaath served as President of EPAC, managing 35+ volunteers and engineering the official community and alumni web platform.',
    pageCategory: 'leadership',
    title: 'CASE FILE: EPAC PRESIDENCY',
    subtitle: 'Environmental Protection & Web Portal',
    category: 'leadership',
    type: 'dossier',
    x: 790,
      y: 401,
    rotation: 3,
    pinColor: 'brass',
    stamp: 'TECH LEAD',
    date: '2022 – 2025',
    summary: 'Shivam Vishwanaath served as President of EPAC, managing 35+ volunteers and engineering the official community & alumni platform.',
    details: [
      'Directed large-scale environmental initiatives and awareness drives at college fests.',
      'Engineered the official EPAC web platform using React and Tailwind CSS.',
      'Connected 35+ active members with a network of 100+ alumni mentors.'
    ],
    metrics: [
      { label: 'Volunteers Led', value: '35+ Members' },
      { label: 'Alumni Network', value: '100+ Members' }
    ],
    tags: ['President', 'React.js', 'Tailwind CSS', 'Community', 'Alumni Portal', 'Shivam Vishwanaath'],
    uvSecret: 'PORTAL METRICS: 100% responsive portal with zero downtime across fest campaigns engineered by Shivam Vishwanaath.'
  },
  {
    id: 'arsenal-matrix',
    slug: 'tech-stack-arsenal',
    seoTitle: 'Technical Arsenal & DevOps Stack — Shivam Vishwanaath',
    seoDescription: 'Full-stack engineering capabilities, Ubuntu VPS management, Caddy reverse proxy, Docker, and database architectures mastered by Shivam Vishwanaath.',
    pageCategory: 'skills',
    title: 'THE TECH ARSENAL & WEAPONS MATRIX',
    subtitle: 'Confiscated Technical Capability Report',
    category: 'skills',
    type: 'arsenal',
    x: 1123,
      y: 387,
    rotation: -1,
    pinColor: 'red',
    stamp: 'CLASSIFIED',
    summary: 'Full-stack capability inventory of Shivam Vishwanaath spanning modern frontend architectures, backend APIs, and bare-metal VPS server management.',
    details: [
      'Languages: JavaScript (ESNext), TypeScript, C/C++, SQL, HTML5/CSS3, Shell Script (Bash).',
      'DevOps & Server: VPS Management (Ubuntu), Caddy Reverse Proxy & SSL, UFW Firewall, PM2 Process Manager, Docker Compose, GitHub Actions CI/CD.',
      'Frameworks & Storage: React.js, Next.js, Node.js, Express.js, MongoDB, Supabase, Firebase Firestore/Auth.'
    ],
    metrics: [
      { label: 'Core Langs', value: 'TypeScript / C++ / SQL' },
      { label: 'DevOps Stack', value: 'Ubuntu / Caddy / PM2 / Docker' },
      { label: 'Architecture', value: 'SDLC / Agile / REST' }
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'Ubuntu VPS', 'Caddy', 'Docker', 'MongoDB', 'Supabase', 'Shivam Vishwanaath'],
    uvSecret: 'SERVER SPECIALTY: Custom Caddy reverse proxy configurations with automatic Let\'s Encrypt SSL and zero-downtime PM2 reload hooks designed by Shivam Vishwanaath.'
  },
  {
    id: 'document-education',
    slug: 'academic-credentials',
    seoTitle: 'Education & Academic Pedigree — Shivam Vishwanaath',
    seoDescription: 'Academic background of Shivam Vishwanaath: B.Tech in ECE from BIT Mesra, MBA in Data Science from Amity Online, and Chinmaya Vidyalaya.',
    pageCategory: 'education',
    title: 'ACADEMIC DOSSIER & CREDENTIALS',
    subtitle: 'Verified Educational Background',
    category: 'education',
    type: 'document',
    x: 1481,
      y: 398,
    rotation: 1,
    pinColor: 'brass',
    stamp: 'VERIFIED',
    summary: 'Dual engineering & data science pedigree of Shivam Vishwanaath combining hardware-level ECE rigor with modern machine learning and analytics.',
    details: [
      'AMITY ONLINE: MBA in Data Science (2025 – 2027) | Noida, Uttar Pradesh.',
      'BIRLA INSTITUTE OF TECHNOLOGY (BIT MESRA): B.Tech in Electronics & Communication Engineering (2021 – 2025) | Ranchi, Jharkhand.',
      'CHINMAYA VIDYALAYA: Class XII, CBSE Board (2018 – 2020) | Bokaro Steel City, Jharkhand.'
    ],
    metrics: [
      { label: 'Master\'s', value: 'MBA Data Science (2025-27)' },
      { label: 'Undergrad', value: 'B.Tech ECE, BIT Mesra' },
      { label: 'High School', value: 'Chinmaya Vidyalaya' }
    ],
    tags: ['Amity Online', 'BIT Mesra', 'Data Science', 'ECE', 'Chinmaya Vidyalaya', 'Shivam Vishwanaath'],
    uvSecret: 'ACADEMIC EDGE: Rigorous signal processing, statistical modeling, and data pipeline fundamentals mastered by Shivam Vishwanaath.'
  },
  {
    id: 'polaroid-johar-qeds',
    slug: 'joharnite-qeds-conference',
    seoTitle: 'JoharNite Fest & QEDS Conference Portals — Shivam Vishwanaath',
    seoDescription: 'High-throughput fest portal handling 9.3K+ fans with 99% uptime and BIT Mesra QEDS conference portal architected by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'EVIDENCE 08: JOHARNITE & QEDS CONFERENCES',
    subtitle: 'High-Traffic Fest & Academic Portals',
    category: 'projects',
    type: 'polaroid',
    x: 1827,
      y: 399,
    rotation: 2,
    pinColor: 'blue',
    stamp: 'VERIFIED',
    summary: 'Shivam Vishwanaath architected high-throughput fest portals and premier academic conference websites with international speakers.',
    details: [
      'JoharNite Fest Portal: Built with Angular, Tailwind CSS & Firebase, supporting 9.3K+ Facebook followers with 99% uptime during live traffic surges.',
      'First QEDS Conference Portal (BIT Mesra): React, Tailwind, and Firebase portal featuring academic speakers from IIT Kharagpur and ISI Kolkata.'
    ],
    metrics: [
      { label: 'Audience', value: '9.3K Followers' },
      { label: 'Uptime', value: '99% During Rush' },
      { label: 'Speakers', value: 'IIT KGP & ISI Kolkata' }
    ],
    tags: ['Angular', 'React', 'Firebase', 'High Traffic', 'Conference Portal', 'Shivam Vishwanaath'],
    uvSecret: 'TRAFFIC SURGE: Zero dropped connections despite 500+ requests per minute during fest headliner announcements engineered by Shivam Vishwanaath.'
  },
  {
    id: 'map-clue',
    slug: 'jurisdiction-map',
    seoTitle: 'Jurisdiction & Operational Corridors — Shivam Vishwanaath',
    seoDescription: 'Geographical operations and engineering hubs of Shivam Vishwanaath spanning Bhubaneswar, Ranchi (BIT Mesra), Noida (Amity), and Bokaro.',
    pageCategory: 'profile',
    title: 'THE JURISDICTION MAP',
    subtitle: 'Key Geographical Operations & Hubs',
    category: 'profile',
    type: 'map',
    x: 83,
      y: 732,
    rotation: 1,
    pinColor: 'red',
    stamp: 'CONFIDENTIAL',
    summary: 'Tracking operations of Shivam Vishwanaath across major tech and academic corridors: Ranchi (BIT Mesra), Bhubaneswar (Trans Ed / NM Foundation), Noida (Amity), Bokaro (Origin).',
    details: [
      'Ranchi, Jharkhand: B.Tech ECE BIT Mesra, NSS Leadership, EPAC Presidency, QEDS Conference.',
      'Bhubaneswar, Odisha: Tech Lead at Trans Ed (CBSEForum, BITSATForum, Tutors Forum) & NM Foundation.',
      'Noida, UP: MBA Data Science at Amity Online.',
      'Bokaro Steel City: Chinmaya Vidyalaya foundation.'
    ],
    metrics: [
      { label: 'Hubs', value: '4 Key Regions' },
      { label: 'Status', value: 'Active Operations' }
    ],
    tags: ['BIT Mesra', 'Bhubaneswar', 'Ranchi', 'Noida', 'Bokaro', 'Shivam Vishwanaath'],
    uvSecret: 'COORDINATES: Shivam Vishwanaath operates with remote-first flexibility and robust distributed team management.'
  },
  {
    id: 'dossier-xeno-crm',
    slug: 'xeno-crm-platform',
    seoTitle: 'Xeno CRM Customer Segmentation Platform — Built by Shivam Vishwanaath',
    seoDescription: 'Enterprise CRM architecture with visual customer segmentation logic rules, campaign analytics, and scalable Node.js/Express API built by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'CASE FILE: XENO CRM PLATFORM',
    subtitle: 'Enterprise Audience Segmentation & Analytics',
    category: 'projects',
    type: 'dossier',
    x: 439,
      y: 733,
    rotation: 1,
    pinColor: 'brass',
    stamp: 'VERIFIED',
    summary: 'Full-stack enterprise CRM with dynamic audience rule builder (AND/OR logic), campaign telemetry tracking, and scalable REST API middleware engineered by Shivam Vishwanaath.',
    details: [
      'Engineered interactive visual rule builder allowing marketers to construct nested AND/OR condition groups for customer segmentation.',
      'Architected high-throughput Node.js/Express backend with MongoDB aggregation pipelines for instant segment sizing.',
      'Built campaign dispatch simulation engine and historical delivery performance telemetry dashboard.'
    ],
    metrics: [
      { label: 'Architecture', value: 'Decoupled Client/Server' },
      { label: 'Rule Engine', value: 'Nested AND/OR Logic' },
      { label: 'Stack', value: 'React / Node / MongoDB' }
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Enterprise CRM', 'Analytics', 'Shivam Vishwanaath'],
    links: [
      { label: 'Frontend Repo', url: 'https://github.com/shivamvishwanaath/xeno-assignment-frontend' },
      { label: 'Backend API Repo', url: 'https://github.com/shivamvishwanaath/xeno-assignment-backend' }
    ],
    uvSecret: 'SYSTEM ARCHITECTURE: Segment clustering query optimized with custom MongoDB compound indexes for sub-50ms rule evaluations.'
  },
  {
    id: 'polaroid-socialbay',
    slug: 'socialbay-flutter-app',
    seoTitle: 'SocialBay Real-Time Messenger (Flutter & Firebase) — Shivam Vishwanaath',
    seoDescription: 'Cross-platform real-time mobile messaging application engineered with Flutter, Dart, and Firebase by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'EVIDENCE 09: SOCIALBAY MESSENGER',
    subtitle: 'Cross-Platform Real-Time Chat App',
    category: 'projects',
    type: 'polaroid',
    x: 789,
      y: 729,
    rotation: 3,
    pinColor: 'blue',
    stamp: 'IMPACT',
    summary: 'Cross-platform mobile messaging app engineered in Flutter and Firebase featuring sub-second message sync, presence detection, and media caching by Shivam Vishwanaath.',
    details: [
      'Built reactive UI in Flutter/Dart with stateful WebSocket / Firebase Realtime synchronization.',
      'Implemented real-time typing indicators, read receipts, online/offline presence tracking, and push notifications.',
      'Designed local offline SQLite caching layer allowing instant chat loading in zero-connectivity environments.'
    ],
    metrics: [
      { label: 'Framework', value: 'Flutter & Dart' },
      { label: 'Latency', value: '< 100ms Sync' },
      { label: 'Platform', value: 'Android & iOS' }
    ],
    tags: ['Flutter', 'Dart', 'Firebase', 'Realtime Chat', 'Mobile App', 'Cross-Platform', 'Shivam Vishwanaath'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/shivamvishwanaath/chatapp_socialbay' }
    ],
    uvSecret: 'MOBILE TELEMETRY: Custom media compression pipeline reduces outbound mobile payload size by up to 60% without perceptible artifacting.'
  },
  {
    id: 'dossier-neettoppers',
    slug: 'neettoppers-exam-portal',
    seoTitle: 'NEET Toppers Medical Assessment Engine — Built by Shivam Vishwanaath',
    seoDescription: 'High-concurrency medical entrance exam simulation and percentile projection platform engineered in TypeScript by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'CASE FILE: NEET TOPPERS PLATFORM',
    subtitle: 'Medical Entrance Diagnostic Engine',
    category: 'projects',
    type: 'dossier',
    x: 1129,
      y: 709,
    rotation: 2,
    pinColor: 'red',
    stamp: 'TECH LEAD',
    summary: 'Dynamic medical entrance exam assessment platform engineered in TypeScript, featuring chapter-level diagnostic testing and national percentile benchmark analytics by Shivam Vishwanaath.',
    details: [
      'Developed high-concurrency exam interface matching official NTA NEET exam timer, question palette, and negative marking constraints.',
      'Architected subject-level diagnostic benchmarking (Physics, Chemistry, Biology) highlighting weak concept clusters.',
      'Created automated question-generation pipeline with LaTeX mathematical/chemical equation support.'
    ],
    metrics: [
      { label: 'Target', value: 'NEET Candidates' },
      { label: 'Analytics', value: 'Percentile Engine' },
      { label: 'Stack', value: 'TypeScript / React / SQL' }
    ],
    tags: ['TypeScript', 'React', 'EdTech', 'Assessment Engine', 'PostgreSQL', 'Shivam Vishwanaath'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/shivamvishwanaath/neettoppers' }
    ],
    uvSecret: 'DIAGNOSTIC ALGORITHM: Instant topic-level heatmapping algorithm identifies conceptual weak zones across 180+ test questions in real time.'
  },
  {
    id: 'dossier-periskope',
    slug: 'periskope-collaboration',
    seoTitle: 'Periskope Real-Time Collaboration Suite — Built by Shivam Vishwanaath',
    seoDescription: 'Real-time collaborative workspace canvas and shared component architecture engineered in TypeScript by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'CASE FILE: PERISKOPE SUITE',
    subtitle: 'Real-Time Collaborative Workspace',
    category: 'projects',
    type: 'dossier',
    x: 1483,
      y: 717,
    rotation: -2,
    pinColor: 'brass',
    stamp: 'VERIFIED',
    summary: 'Real-time team collaboration platform components engineered with strict TypeScript typing, WebSocket multi-user state synchronization, and modular UI cards by Shivam Vishwanaath.',
    details: [
      'Architected real-time multi-tenant shared state synchronization engine with conflict resolution heuristics.',
      'Constructed modular, accessible design system components with Tailwind CSS and Framer Motion micro-interactions.',
      'Engineered optimistic UI updates ensuring zero perceived lag during concurrent team collaboration sessions.'
    ],
    metrics: [
      { label: 'Core Tech', value: 'TypeScript / React' },
      { label: 'Sync', value: 'WebSockets' },
      { label: 'Focus', value: 'Low-Latency UI' }
    ],
    tags: ['TypeScript', 'React.js', 'WebSockets', 'Collaboration', 'State Management', 'Shivam Vishwanaath'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/shivamvishwanaath/periskope' }
    ],
    uvSecret: 'STATE PROTOCOL: Implemented lightweight binary delta-encoding for state broadcasts, slashing WebSocket payload overhead by 45%.'
  },
  {
    id: 'sticky-flowform',
    slug: 'flowform-builder-studio',
    seoTitle: 'FlowForm Dynamic Schema & Form Studio — Built by Shivam Vishwanaath',
    seoDescription: 'Visual drag-and-drop form builder with dynamic JSON Schema validation and conditional logic rules engineered by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'TOOL: FLOWFORM BUILDER STUDIO',
    subtitle: 'Dynamic Schema & Conditional Form Engine',
    category: 'projects',
    type: 'sticky',
    x: 1834,
      y: 734,
    rotation: 2,
    pinColor: 'red',
    stamp: 'SOLVED',
    summary: 'No-code visual form creation engine generating dynamic JSON schemas with complex conditional branching, custom validations, and instant embedded export by Shivam Vishwanaath.',
    details: [
      'Engineered drag-and-drop field composer with support for 15+ input types, nested steps, and conditional show/hide rules.',
      'Built automated JSON schema validator and real-time form renderer with full type safety.',
      'Created one-click embeddable JavaScript snippet and webhook dispatch integrations for third-party endpoints.'
    ],
    metrics: [
      { label: 'Interface', value: 'Drag-and-Drop' },
      { label: 'Output', value: 'Valid JSON Schema' },
      { label: 'Rules', value: 'Conditional Logic' }
    ],
    tags: ['TypeScript', 'React', 'Form Builder', 'JSON Schema', 'Tailwind CSS', 'Shivam Vishwanaath'],
    links: [
      { label: 'GitHub Studio', url: 'https://github.com/shivamvishwanaath/flowform-builder-studio' },
      { label: 'Alchemy Engine', url: 'https://github.com/shivamvishwanaath/glow-form-alchemy' }
    ],
    uvSecret: 'SCHEMA COMPILER: AST-based validation generator verifies multi-step conditional branching logic in sub-millisecond cycles.'
  },
  {
    id: 'dossier-peopleos',
    slug: 'peopleos-enterprise-ledger',
    seoTitle: 'TheSCI PeopleOS & Bharat Ledger — Enterprise SaaS by Shivam Vishwanaath',
    seoDescription: 'Internal HR management platform, employee onboarding workflows, and multi-tenant ledger architecture engineered by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'CASE FILE: THESCI PEOPLEOS & BHARAT LEDGER',
    subtitle: 'Enterprise People Operations & FinTech Ledger',
    category: 'projects',
    type: 'dossier',
    x: 76,
      y: 1029,
    rotation: -1,
    pinColor: 'blue',
    stamp: 'CONFIDENTIAL',
    summary: 'Internal enterprise SaaS platform combining employee lifecycle management (HRMS), automated role-based access control, and transaction ledger reconciliation by Shivam Vishwanaath.',
    details: [
      'Architected multi-tenant user access control with granular permission hierarchies across organizational departments.',
      'Engineered immutable transaction ledger for partner financial disbursements and automated invoice tracking.',
      'Integrated unified dashboard consolidating employee milestones, internal communications, and task workflows.'
    ],
    metrics: [
      { label: 'Domain', value: 'HRMS & Ledger' },
      { label: 'Security', value: 'Granular RBAC' },
      { label: 'Architecture', value: 'Multi-Tenant' }
    ],
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'FinTech', 'HRMS', 'SaaS', 'Shivam Vishwanaath'],
    links: [
      { label: 'PeopleOS Repo', url: 'https://github.com/shivamvishwanaath/TheSCI-PeopleOS' },
      { label: 'Bharat Ledger Repo', url: 'https://github.com/shivamvishwanaath/sci_bharat_ledger' }
    ],
    uvSecret: 'SECURITY AUDIT: Cryptographic hash chaining on transaction records guarantees tamper-evident financial audit trails.'
  },
  {
    id: 'sticky-whatsapp-auto',
    slug: 'headless-automation-suite',
    seoTitle: 'Headless Outreach & WhatsApp Automation Suite — Shivam Vishwanaath',
    seoDescription: 'Python & Node.js headless automation dispatch pipelines for bulk communication and webhook scheduling built by Shivam Vishwanaath.',
    pageCategory: 'projects',
    title: 'OPERATIVE: AUTOMATION & DISPATCH SUITE',
    subtitle: 'Headless Communication & Webhook Pipelines',
    category: 'projects',
    type: 'sticky',
    x: 417,
      y: 1047,
    rotation: -3,
    pinColor: 'brass',
    stamp: 'IMPACT',
    summary: 'Headless automated outreach tools in Python and Node.js for high-throughput message dispatch, webhook task queues, and contact list sanitization by Shivam Vishwanaath.',
    details: [
      'Built automated WhatsApp & SMS broadcast pipeline with intelligent rate-limiting to prevent carrier throttling.',
      'Created background worker service handling asynchronous queuing, retry policies, and delivery telemetry.',
      'Engineered contact deduplication and phone format normalization algorithms.'
    ],
    metrics: [
      { label: 'Throughput', value: 'Automated Queues' },
      { label: 'Langs', value: 'Python & Node.js' },
      { label: 'Reliability', value: 'Retry Policy' }
    ],
    tags: ['Python', 'Node.js', 'Automation', 'Background Workers', 'Webhooks', 'Shivam Vishwanaath'],
    links: [
      { label: 'WhatsApp Dispatcher', url: 'https://github.com/shivamvishwanaath/whatsapp-bulk-messenger' },
      { label: 'TextBee Worker', url: 'https://github.com/shivamvishwanaath/textbee-worker' }
    ],
    uvSecret: 'RATE LIMIT ENGINE: Adaptive token-bucket rate limiter dynamically adjusts dispatch speed based on real-time carrier response codes.'
  },
  {
    id: 'dossier-thesci-company',
    slug: 'thesci-solcielo-company',
    seoTitle: 'The SCI SolCielo Innovacion — Enterprise Cloud & Software Platform',
    seoDescription: 'The SCI SolCielo Innovacion Private Limited™: Founded 2019 by Shivam Vishwanaath. Creator of the Helios Enterprise Cloud Platform replacing cPanel, Salesforce, Workday, Jira, Zendesk, and DocuSign.',
    pageCategory: 'projects',
    title: 'THE SCI SOLCIELO INNOVACION PVT. LTD.',
    subtitle: 'Founder, CEO & Systems Architect — 2019 to Present',
    category: 'projects',
    type: 'dossier',
    x: 779,
      y: 1054,
    rotation: -2,
    pinColor: 'red',
    stamp: 'VERIFIED',
    headline: 'MCA INDIA INCORPORATED FEB 2026 — HELIOS PLATFORM OPERATIONAL',
    date: '2019 – Feb 2026 (MCA India Incorporated)',
    location: 'Ranchi, Jharkhand, India → International Clientele',
    summary: 'Founder-led IT consultancy and product company. Registered as Pvt Ltd in 2026. Primary product: Helios Enterprise Cloud Platform — compiled Go+Fiber v2 engine replacing $7,000+/month SaaS stacks.',
    details: [
      'Informally founded 2019 (BIT Mesra era). Registered with MSME Udyam Certificate in 2024. Formally incorporated as The SCI SolCielo Innovacion Private Limited™ by the Ministry of Corporate Affairs (MCA India) in February 2026.',
      'Mission: Liberate enterprises from bloated SaaS subscriptions with self-hosted, compiled, zero-vendor-lock-in platforms.',
      'Core product: Helios Cloud Engine (~15MB RAM idle) + 5 Enterprise Suites (CRM, HRMS, PM, Support, TrustSign).',
      'Serves clients in India, London, and Dublin. Team expanded internationally during 2023.',
      'Key milestones: First Android app (70+ 5-star Google Play reviews, 2019). JoharNite Portal (9,300+ concurrent users, 2022). NM Foundation exam portals (2023). MSME Udyam Registration (2024). Helios Platform launch (2025). MCA Incorporation (Feb 2026).',
      'Value propositions: 10x Lower TCO, 90% less RAM, 100% data sovereignty, zero per-seat SaaS fees.',
      'Registered address: B7/10, BlueOffice Workspace, Kokar, Ranchi, Jharkhand, India, 834001.'
    ],
    metrics: [
      { label: 'Incorporated', value: 'MCA India, Feb 2026' },
      { label: 'TCO Savings', value: '10x' },
      { label: 'Platforms Built', value: '12+' },
      { label: 'Concurrent Users', value: '9,300+' }
    ],
    tags: ['Entrepreneurship', 'Go', 'Enterprise SaaS', 'Cloud Infrastructure', 'Founder', 'India', 'IT Consultancy'],
    links: [
      { label: 'thesci.co', url: 'https://thesci.co' },
      { label: 'Helios Panel', url: 'https://he.thesci.co' }
    ],
    uvSecret: 'CORPORATE FILING: CIN issued by MCA India, February 2026. Registered: B7/10, BlueOffice Workspace, Kokar, Ranchi, Jharkhand 834001. Bootstrapped without venture capital.'
  },
  {
    id: 'headline-thesci-mca',
    slug: 'thesci-mca-incorporation',
    seoTitle: 'The SCI SolCielo Innovacion Pvt Ltd — MCA India Incorporated Feb 2026',
    seoDescription: 'Shivam Vishwanaath formally incorporated The SCI SolCielo Innovacion Private Limited™ with MCA India in February 2026, operationalising the Helios Enterprise Cloud Platform and 5 enterprise SaaS suites.',
    pageCategory: 'experience',
    title: 'THE ENTERPRISE DISPATCH',
    subtitle: 'Breaking Corporate Record',
    category: 'headlines',
    type: 'newspaper',
    x: 1124,
      y: 1046,
    rotation: 1,
    pinColor: 'red',
    headline: 'THE SCI SOLCIELO INNOVACION PVT. LTD. — MCA INDIA INCORPORATED, FEBRUARY 2026',
    date: 'FEBRUARY 2026',
    location: 'Ranchi, Jharkhand, India',
    stamp: 'VERIFIED',
    summary: 'Shivam Vishwanaath formally incorporated The SCI SolCielo Innovacion Private Limited™ with MCA India in February 2026, formalising client engagements and the Helios Enterprise Cloud Platform.',
    details: [
      'Ministry of Corporate Affairs (MCA India) formally issued CIN for The SCI SolCielo Innovacion Private Limited™ in February 2026.',
      'The company subsequently formalised client engagements, enterprise licensing agreements, and international expansion to India, London, and Dublin.',
      'Helios Enterprise Cloud Platform — compiled Go + Fiber v2, ~15MB RAM idle, 5 enterprise suites — operational and licensed to paying clients.',
      'Concurrent Tech Lead engagement at Trans Ed (CBSEForum, BITSATForum, Tutors Forum) continues from May 2025.'
    ],
    metrics: [
      { label: 'Incorporation', value: 'MCA India, Feb 2026' },
      { label: 'Primary Role', value: 'Founder & CEO' },
      { label: 'Platform', value: 'Helios (Go + Fiber v2)' },
      { label: 'Suites', value: '5 Enterprise' }
    ],
    tags: ['The SCI SolCielo', 'MCA India', 'Incorporation', 'Founder & CEO', 'Go', 'Enterprise SaaS', 'Shivam Vishwanaath'],
    uvSecret: 'CORPORATE FILING: CIN issued February 2026 by Ministry of Corporate Affairs, Government of India. Registered: B7/10, BlueOffice Workspace, Kokar, Ranchi, Jharkhand 834001.'
  },
  {
    id: 'dossier-helios-engine',
    slug: 'helios-cloud-engine',
    seoTitle: 'Helios Cloud Engine — Compiled Go Server Orchestration Platform',
    seoDescription: 'Helios Cloud Engine: A compiled Go + Fiber v2 server orchestration binary replacing cPanel/Plesk with ~15MB RAM idle footprint, Caddy, PowerDNS, MariaDB, and an integrated enterprise suite ecosystem.',
    pageCategory: 'projects',
    title: 'HELIOS CLOUD ENGINE',
    subtitle: 'Autonomous Enterprise Cloud & Server Orchestration Platform',
    category: 'projects',
    type: 'dossier',
    x: 1490,
      y: 1034,
    rotation: -1,
    pinColor: 'red',
    stamp: 'CLASSIFIED',
    headline: 'COMPANY FOUNDED — ENTERPRISE PLATFORM SHIPPED',
    date: '2024',
    location: 'Ranchi, India → thesci.co',
    summary: 'Self-hosted compiled Go + Fiber v2 binary that replaces cPanel/WHM (1.5GB+ RAM) with a ~15MB footprint — orchestrating Caddy reverse proxy, PowerDNS, Postfix/Dovecot mail cluster, and MariaDB through a single unified engine.',
    details: [
      'Compiled Go + Fiber v2 core: ~15MB idle RAM vs cPanel (1.5GB+) and Plesk (2GB+) — 90% RAM savings on every hosted server.',
      'Unified Engine: Caddy 2 (HTTP/3 + TLS 1.3), PowerDNS native SQL backend, Postfix/Dovecot mail cluster, and MariaDB all orchestrated through one binary.',
      'Zero-Downtime Hot Reloading: Modules and Caddyfile configs reload instantly without disrupting live traffic or WebSocket connections.',
      'Zero-Touch Automated TLS: Let\'s Encrypt and ZeroSSL provisioning and renewal via Caddy CertMagic — no certbot cron jobs.',
      '17 modular capabilities: Domains, DNS, SSL, Email, Webmail, CalDAV Scheduler, Databases, DB Browser, File Manager, SFTP, Firewall, Backups, Cron, Process Sentinel, Telemetry, Caddyfile Studio, Audit Ledger.',
      'Offline HMAC-SHA256 cryptographic license verification with granular module-level activation.',
      'Multi-tenant workspace isolation with role-based governance: System Admin, Operator, Member.',
      'Achieves 10/10 mail-tester deliverability with automated SPF, 2048-bit DKIM, and DMARC alignment.',
      'Sub-millisecond API response times (<5ms) powered by Go Fiber and MariaDB connection pooling.'
    ],
    metrics: [
      { label: 'Idle RAM', value: '~15 MB' },
      { label: 'API Response', value: '<5 ms' },
      { label: 'RAM vs cPanel', value: '−90%' },
      { label: 'Modules', value: '17 Core' }
    ],
    tags: ['Go', 'Fiber v2', 'Caddy 2', 'PowerDNS', 'Postfix', 'MariaDB', 'HTTP/3', 'TLS 1.3', 'HMAC-SHA256', 'Multi-tenant', 'DevOps'],
    links: [
      { label: 'Live Platform', url: 'https://he.thesci.co' },
      { label: 'TheSCI Website', url: 'https://thesci.co' }
    ],
    uvSecret: 'Built in 2024 as a direct replacement for cPanel. Replaces $60/month cPanel licenses across all client servers with a single compiled binary. Zero vendor lock-in.'
  },
  {
    id: 'dossier-helios-crm',
    slug: 'helios-crm-enterprise',
    seoTitle: 'Helios-CRM — Self-Hosted Sales Pipeline & Revenue Intelligence Suite',
    seoDescription: 'Helios-CRM: self-hosted Salesforce/HubSpot alternative. Visual drag-drop pipeline, Quote builder, Revenue forecasting, smart deduplication, and immutable interaction timeline. Zero per-seat fees.',
    pageCategory: 'projects',
    title: 'HELIOS-CRM',
    subtitle: 'Autonomous Sales Pipeline & Revenue Intelligence Suite',
    category: 'projects',
    type: 'dossier',
    x: 1822,
      y: 1045,
    rotation: 2,
    pinColor: 'brass',
    stamp: 'VERIFIED',
    headline: 'REPLACES SALESFORCE & HUBSPOT — ZERO PER-SEAT FEES',
    date: '2024',
    location: 'The SCI SolCielo Innovacion Private Limited™',
    summary: 'Self-hosted CRM suite replacing Salesforce Sales Cloud at 10x lower TCO. Features visual drag-drop pipeline, automated PDF quote generation, revenue forecasting, and immutable audit trail.',
    details: [
      'Full Contact & Organization hierarchy with unlimited custom fields and tags.',
      'Interactive drag-and-drop Visual Pipeline with stage transitions and win-probability scoring.',
      'Quote & Proposal Builder: automated PDF compilation, discount tiers, line-item taxation.',
      'Revenue Forecasting Engine: weighted deal pipeline projection across custom fiscal cycles.',
      'Real-Time Interaction Timeline unifying emails, meetings, call notes in an immutable audit ledger.',
      'Smart Deduplication Engine: email domain + phone fuzzy matching to prevent data pollution.',
      'One-click Quote-to-Invoice conversion with multi-currency support.',
      'Integrated TrustSign handoff: Deal Closed-Won → automatic e-signature envelope creation.'
    ],
    metrics: [
      { label: 'Per-Seat Cost', value: '₹0' },
      { label: 'vs Salesforce', value: '−98%' },
      { label: 'Page Load', value: '<100 ms' },
      { label: 'Audit Trail', value: 'Immutable' }
    ],
    tags: ['Go', 'Fiber v2', 'CRM', 'MariaDB', 'HTMX', 'PDF Generation', 'Revenue Ops', 'Enterprise SaaS'],
    links: [{ label: 'TheSCI Platform', url: 'https://thesci.co' }],
    uvSecret: 'Replaces ₹7,500/month Salesforce licenses for a 50-person team with a one-time self-hosted license.'
  },
  {
    id: 'dossier-helios-hrms',
    slug: 'helios-hrms-enterprise',
    seoTitle: 'Helios-HRMS — Self-Hosted Human Capital & Payroll Orchestration Suite',
    seoDescription: 'Helios-HRMS: self-hosted Workday/BambooHR alternative. Employee lifecycle management, automated payroll, leave approvals, and department hierarchy with zero per-seat billing.',
    pageCategory: 'projects',
    title: 'HELIOS-HRMS',
    subtitle: 'Human Capital, Workforce & Payroll Orchestration Suite',
    category: 'projects',
    type: 'dossier',
    x: 76,
      y: 1359,
    rotation: -2,
    pinColor: 'blue',
    stamp: 'VERIFIED',
    headline: 'REPLACES WORKDAY & BAMBOOHR — FULL DATA SOVEREIGNTY',
    date: '2024',
    location: 'The SCI SolCielo Innovacion Private Limited™',
    summary: 'End-to-end employee lifecycle HRMS suite replacing Workday/BambooHR. Features automated payroll, leave management, department hierarchy, and immutable onboarding/offboarding audit logs.',
    details: [
      'Complete Employee Directory with job roles, compensation structures, department hierarchy, emergency contacts.',
      'Automated Leave & Time-Off Management with multi-tier approval chains and balance accrual tracking.',
      'Payroll Record Generation: basic salary, allowances, statutory deductions, net payouts.',
      'Customizable compensation formula engines for multi-national tax jurisdictions.',
      'Audit-Logged Status Transitions: onboarding, active, leave of absence, offboarding.',
      'Company Policy & Document Repository with role-scoped access control.',
      '100% private — sensitive employee payroll data never touches third-party SaaS clouds.'
    ],
    metrics: [
      { label: 'Data Privacy', value: '100%' },
      { label: 'vs Workday', value: '−100%' },
      { label: 'Payroll Accuracy', value: 'Automated' },
      { label: 'Per-Seat Cost', value: '₹0' }
    ],
    tags: ['Go', 'Fiber v2', 'HRMS', 'Payroll', 'RBAC', 'MariaDB', 'Employee Lifecycle', 'Enterprise SaaS'],
    links: [{ label: 'TheSCI Platform', url: 'https://thesci.co' }],
    uvSecret: 'Sensitive employee salary records and personal data are encrypted and stored exclusively on client-owned private servers — never Workday or BambooHR clouds.'
  },
  {
    id: 'dossier-helios-pm',
    slug: 'helios-pm-enterprise',
    seoTitle: 'Helios-PM — High-Velocity Agile Sprint & Project Management Suite',
    seoDescription: 'Helios-PM: self-hosted Jira/Asana alternative. Drag-drop Kanban, sprint lifecycle management, story point velocity, cross-project priority matrices, and zero page load latency.',
    pageCategory: 'projects',
    title: 'HELIOS-PM',
    subtitle: 'High-Velocity Agile, Sprint & Project Orchestration Suite',
    category: 'projects',
    type: 'dossier',
    x: 437,
      y: 1368,
    rotation: 1,
    pinColor: 'brass',
    stamp: 'SOLVED',
    headline: 'REPLACES JIRA & ASANA — 95% FASTER PAGE LOADS',
    date: '2024',
    location: 'The SCI SolCielo Innovacion Private Limited™',
    summary: 'Self-hosted Jira/Asana alternative with 95% faster board renders. Features Kanban, sprint lifecycle, story point velocity, multi-project portfolio views, and cross-project priority matrices.',
    details: [
      'Multi-Project Portfolio Overview with budget consumption, delivery milestones, and health status.',
      'Interactive Drag-and-Drop Kanban (Backlog → Todo → In Progress → Review → Done) with optimistic UI updates.',
      'Sprint Lifecycle: goal setting, story point velocity tracking, sprint retrospectives.',
      'Granular task breakdown with priority flags (Low, Medium, High, Critical), markdown specs, and subtasks.',
      'Resource & Assignee Workload balancing to prevent team burnout and surface delivery bottlenecks.',
      'Board state renders in under 50 milliseconds — no Jira page load delays.',
      'Escalate helpdesk support tickets directly into development task trackers.'
    ],
    metrics: [
      { label: 'Board Render', value: '<50 ms' },
      { label: 'vs Jira Speed', value: '95% faster' },
      { label: 'Per-Seat Cost', value: '₹0' },
      { label: 'Setup Time', value: '30 sec' }
    ],
    tags: ['Go', 'Fiber v2', 'Project Management', 'Agile', 'Kanban', 'HTMX', 'MariaDB', 'Sprint Planning'],
    links: [{ label: 'TheSCI Platform', url: 'https://thesci.co' }],
    uvSecret: 'Proprietary sprint roadmap data, internal bug reports, and architectural specs stay on your own server — never Jira/Atlassian clouds.'
  },
  {
    id: 'dossier-helios-support',
    slug: 'helios-support-enterprise',
    seoTitle: 'Helios-Support — Omnichannel Customer Support & SLA Helpdesk Suite',
    seoDescription: 'Helios-Support: self-hosted Zendesk/Freshdesk alternative. SLA enforcement, knowledge base CMS, public customer portal, ticket routing, and zero agent licensing fees.',
    pageCategory: 'projects',
    title: 'HELIOS-SUPPORT',
    subtitle: 'Omnichannel Customer Support, SLA & Helpdesk Suite',
    category: 'projects',
    type: 'dossier',
    x: 781,
      y: 1349,
    rotation: -1,
    pinColor: 'black',
    stamp: 'HIGH PRIORITY',
    headline: 'REPLACES ZENDESK & FRESHDESK — UNLIMITED AGENTS',
    date: '2024',
    location: 'The SCI SolCielo Innovacion Private Limited™',
    summary: 'Self-hosted Zendesk alternative with automated SLA enforcement, public customer portal, knowledge base CMS, and zero cost-per-agent model. Scales from 5 to 500 agents.',
    details: [
      'Unified Multi-Channel Ticket Inbox with conversation threads between customers and support engineers.',
      'Public Customer Support Portal: authenticated and anonymous ticket submission with cryptographic tracking tokens.',
      'Configurable SLA Policy Engine: automated escalation (Low → Medium → High → Urgent) with breach alerts.',
      'Integrated Knowledge Base & FAQ CMS: SEO-optimized public articles, category browsing, search index.',
      'Internal Private Notes & collaboration tools for support engineers within ticket threads.',
      'Ticket Assignment & Operator Routing by department, workload, or specialized expertise.',
      'Automated SLA countdown timers with visual breach warnings.'
    ],
    metrics: [
      { label: 'Cost per Agent', value: '₹0' },
      { label: 'Public Portal', value: 'Built-in' },
      { label: 'vs Zendesk', value: '−100%' },
      { label: 'SLA Engine', value: 'Automated' }
    ],
    tags: ['Go', 'Fiber v2', 'Helpdesk', 'SLA', 'Knowledge Base', 'HTMX', 'Customer Support', 'MariaDB'],
    links: [{ label: 'TheSCI Platform', url: 'https://thesci.co' }],
    uvSecret: 'Full audit logs of all customer communication stay encrypted on your private servers — never Zendesk or Freshdesk clouds.'
  },
  {
    id: 'dossier-trustsign',
    slug: 'trustsign-esign-engine',
    seoTitle: 'TrustSign — Tamper-Evident PDF E-Signature & Legal Cryptography Engine',
    seoDescription: 'TrustSign by The SCI: self-hosted DocuSign/Adobe Sign alternative. SHA-256 tamper-evident PDF signing, multi-signer OTP workflows, coordinate placement, and public QR verification portals.',
    pageCategory: 'projects',
    title: 'TRUSTSIGN E-SIGN ENGINE',
    subtitle: 'Tamper-Evident Digital Document Signing & Certificate Authority',
    category: 'projects',
    type: 'dossier',
    x: 1139,
      y: 1367,
    rotation: 2,
    pinColor: 'red',
    stamp: 'CLASSIFIED',
    headline: 'REPLACES DOCUSIGN — SHA-256 CRYPTOGRAPHIC TRUST',
    date: '2024',
    location: 'The SCI SolCielo Innovacion Private Limited™',
    summary: 'Self-hosted DocuSign/Adobe Sign alternative with SHA-256 tamper-evident PDF hashing, multi-signer OTP verification, visual coordinate signature placement, and public QR audit certificate verification.',
    details: [
      'Multi-Signer Envelope Workflow: visual drag-and-drop coordinate signature placement across multi-page PDFs.',
      'Two-Factor Authentication: time-sensitive Email OTP verification before document access.',
      'Multi-Modal Signature Capture: draw on canvas, type with signature fonts, or upload scanned imagery.',
      'Tamper-Evident SHA-256 Hashing: cryptographic digest before and after execution — mathematically verifiable.',
      'Automated Legal Audit Certificate: IP address, user agent, timestamps, and signature hashes compiled independently.',
      'Public Verification Portal: instant QR-code scan verifies document integrity and signature authenticity.',
      'Native workflow embedding: sign contracts inside CRM Deals, HRMS Onboarding, or File Manager links.'
    ],
    metrics: [
      { label: 'Signing Standard', value: 'SHA-256' },
      { label: 'vs DocuSign', value: '−100%' },
      { label: 'Verification', value: 'QR Public' },
      { label: 'Envelopes', value: 'Unlimited' }
    ],
    tags: ['Go', 'SHA-256', 'Cryptography', 'PDF Signing', 'OTP', 'E-Signature', 'Legal Tech', 'TrustSign'],
    links: [{ label: 'TheSCI Platform', url: 'https://thesci.co' }],
    uvSecret: 'Sensitive legal contracts never get uploaded to third-party DocuSign or Adobe Sign clouds. Your SHA-256 private key stays on your server, always.'
  },
  {
    id: 'evidence-thesci-matrix',
    title: 'COMPETITIVE INTELLIGENCE: HELIOS VS MARKET',
    subtitle: 'Cost & Performance Comparison Matrix',
    category: 'projects',
    type: 'evidence-bag',
    x: 1480,
      y: 1365,
    rotation: 0,
    pinColor: 'black',
    stamp: 'CLASSIFIED',
    summary: 'Side-by-side analysis: Helios Platform vs cPanel, Plesk, Salesforce, HubSpot, Workday, Jira, and Zendesk across RAM, API speed, cost, and data sovereignty.',
    details: [
      'RAM: Helios ~15MB vs cPanel 1,500MB+ vs Plesk 2,000MB+ — 90% savings.',
      'API Speed: Helios <5ms vs cPanel 250-800ms vs Plesk 300-900ms.',
      'CRM Cost (50 users): Helios ₹0 vs Salesforce $7,500-$15,000/month.',
      'HRMS Cost (50 users): Helios ₹0 vs Workday $2,500+/month.',
      'PM Cost: Helios ₹0 vs Jira+Asana+Zendesk+BambooHR $4,500-$8,000/month.',
      'E-Signature: Helios TrustSign (unlimited) vs DocuSign ($40/envelope).',
      'Data Privacy: Helios 100% self-hosted vs all competitors multi-tenant SaaS clouds.',
      'License model: Helios offline HMAC-SHA256 vs all competitors vendor cloud lock-in.'
    ],
    metrics: [
      { label: 'RAM Advantage', value: '100x' },
      { label: 'Cost Advantage', value: '10x TCO' },
      { label: 'Data Ownership', value: '100%' }
    ],
    tags: ['Enterprise Strategy', 'TCO Analysis', 'Competitive Intelligence', 'Cloud Infrastructure']
  }
];

export const INITIAL_CONNECTIONS: RedStringConnection[] = [
  {
    id: 'str-subject-transed',
    fromId: 'subject-shivam',
    toId: 'headline-transed',
    label: 'Tech Lead Appointment',
    narrativeReason: 'Shivam Vishwanaath leads architectural direction for all exam portals at Trans Ed.',
    category: 'core'
  },
  {
    id: 'str-transed-cbse',
    fromId: 'headline-transed',
    toId: 'dossier-cbse-bitsat',
    label: 'Built Exam Engines',
    narrativeReason: 'Shivam Vishwanaath architected the core assessment and weak-area detection algorithms.',
    category: 'core'
  },
  {
    id: 'str-transed-tutors',
    fromId: 'headline-transed',
    toId: 'dossier-tutors-forum',
    label: 'Automated Billing & Scheduling',
    narrativeReason: 'Shivam Vishwanaath engineered the tutor-student matching and automated ledger pipelines.',
    category: 'core'
  },
  {
    id: 'str-subject-nm',
    fromId: 'subject-shivam',
    toId: 'polaroid-nm-foundation',
    label: 'Full Stack Operative',
    narrativeReason: 'Prior JEE/NEET exam platform engineering laid the groundwork for large-scale systems by Shivam Vishwanaath.',
    category: 'core'
  },
  {
    id: 'str-nm-periodic',
    fromId: 'polaroid-nm-foundation',
    toId: 'sticky-periodic-table',
    label: 'Mobile & EdTech DNA',
    narrativeReason: 'Early Android app development (100+ downloads, 70+ 5-star reviews) sparked student-first UX.',
    category: 'tech'
  },
  {
    id: 'str-periodic-chem',
    fromId: 'sticky-periodic-table',
    toId: 'sticky-chem-forum',
    label: 'Chemistry Domain Mastery',
    narrativeReason: 'Combined science education with software to eliminate 65% manual grievances.',
    category: 'tech'
  },
  {
    id: 'str-subject-blood',
    fromId: 'subject-shivam',
    toId: 'headline-blood-drive',
    label: 'Humanitarian Leadership',
    narrativeReason: 'NSS Event Head leading 250+ unit blood collection and 130+ student education programs.',
    category: 'leadership'
  },
  {
    id: 'str-blood-epac',
    fromId: 'headline-blood-drive',
    toId: 'dossier-epac',
    label: 'Student Governance & Tech',
    narrativeReason: 'Presidency of EPAC environmental organization managing 35+ volunteers.',
    category: 'leadership'
  },
  {
    id: 'str-subject-arsenal',
    fromId: 'subject-shivam',
    toId: 'arsenal-matrix',
    label: 'DevOps & Full Stack Arsenal',
    narrativeReason: 'Equipped with TypeScript, React, Node, Caddy, Ubuntu VPS, and Docker Compose.',
    category: 'tech'
  },
  {
    id: 'str-subject-edu',
    fromId: 'subject-shivam',
    toId: 'document-education',
    label: 'Academic Foundation',
    narrativeReason: 'B.Tech in ECE from BIT Mesra + MBA in Data Science from Amity Online.',
    category: 'core'
  },
  {
    id: 'str-edu-johar',
    fromId: 'document-education',
    toId: 'polaroid-johar-qeds',
    label: 'College Portals & Scale',
    narrativeReason: 'Delivered official portals for JoharNite Fest (9.3k fans) and BIT Mesra QEDS Conference.',
    category: 'tech'
  },
  {
    id: 'str-subject-map',
    fromId: 'subject-shivam',
    toId: 'map-clue',
    label: 'Operational Hubs',
    narrativeReason: 'Jurisdiction tracing Ranchi, Bhubaneswar, Noida, and Bokaro.',
    category: 'core'
  },
  {
    id: 'str-subject-xeno',
    fromId: 'subject-shivam',
    toId: 'dossier-xeno-crm',
    label: 'Enterprise SaaS Engineering',
    narrativeReason: 'Engineered dynamic audience segmentation and campaign telemetry microservices.',
    category: 'core'
  },
  {
    id: 'str-subject-socialbay',
    fromId: 'subject-shivam',
    toId: 'polaroid-socialbay',
    label: 'Cross-Platform Mobile Mastery',
    narrativeReason: 'Flutter and Firebase architecture enabling sub-second real-time messaging.',
    category: 'tech'
  },
  {
    id: 'str-nm-neettoppers',
    fromId: 'polaroid-nm-foundation',
    toId: 'dossier-neettoppers',
    label: 'Medical Assessment Evolution',
    narrativeReason: 'Expanded diagnostic exam algorithms to national medical entrance candidates.',
    category: 'tech'
  },
  {
    id: 'str-transed-periskope',
    fromId: 'headline-transed',
    toId: 'dossier-periskope',
    label: 'Real-Time State Sync',
    narrativeReason: 'Applied low-latency WebSockets and optimistic UI patterns across team tools.',
    category: 'tech'
  },
  {
    id: 'str-tutors-flowform',
    fromId: 'dossier-tutors-forum',
    toId: 'sticky-flowform',
    label: 'Schema & Dynamic Form Tech',
    narrativeReason: 'Abstracted complex multi-step student forms into a reusable drag-and-drop studio.',
    category: 'tech'
  },
  {
    id: 'str-transed-peopleos',
    fromId: 'headline-transed',
    toId: 'dossier-peopleos',
    label: 'Internal Operations Systems',
    narrativeReason: 'Architected RBAC permissions and immutable ledger pipelines for enterprise SaaS.',
    category: 'core'
  },
  {
    id: 'str-arsenal-auto',
    fromId: 'arsenal-matrix',
    toId: 'sticky-whatsapp-auto',
    label: 'Headless Pipelines & Dispatch',
    narrativeReason: 'Constructed asynchronous background workers and rate-limited outreach suites.',
    category: 'tech'
  },
  {
    id: 'str-mca-thesci',
    fromId: 'subject-shivam',
    toId: 'headline-thesci-mca',
    label: 'FOUNDER — MCA INCORPORATED',
    narrativeReason: 'Shivam Vishwanaath is the founding director of The SCI SolCielo Innovacion Private Limited™.',
    style: 'crimson',
    category: 'core'
  },
  {
    id: 'str-thesci-subject',
    fromId: 'subject-shivam',
    toId: 'dossier-thesci-company',
    label: 'FOUNDER & CEO',
    narrativeReason: 'Shivam Vishwanaath founded The SCI SolCielo Innovacion Private Limited™.',
    style: 'crimson',
    category: 'core'
  },
  {
    id: 'str-thesci-helios',
    fromId: 'dossier-thesci-company',
    toId: 'dossier-helios-engine',
    label: 'PRIMARY PRODUCT',
    narrativeReason: 'Helios Cloud Engine is the flagship compiled server orchestration product of The SCI.',
    style: 'crimson',
    category: 'tech'
  },
  {
    id: 'str-helios-crm',
    fromId: 'dossier-helios-engine',
    toId: 'dossier-helios-crm',
    label: 'ENTERPRISE MODULE',
    narrativeReason: 'CRM runs as an autonomous enterprise suite module on Helios.',
    style: 'neon',
    category: 'tech'
  },
  {
    id: 'str-helios-hrms',
    fromId: 'dossier-helios-engine',
    toId: 'dossier-helios-hrms',
    label: 'ENTERPRISE MODULE',
    narrativeReason: 'HRMS workforce and payroll orchestration runs as a module on Helios.',
    style: 'neon',
    category: 'tech'
  },
  {
    id: 'str-helios-pm',
    fromId: 'dossier-helios-engine',
    toId: 'dossier-helios-pm',
    label: 'ENTERPRISE MODULE',
    narrativeReason: 'Agile sprint and task management runs as a high-velocity module on Helios.',
    style: 'neon',
    category: 'tech'
  },
  {
    id: 'str-helios-support',
    fromId: 'dossier-helios-engine',
    toId: 'dossier-helios-support',
    label: 'ENTERPRISE MODULE',
    narrativeReason: 'Omnichannel customer support helpdesk runs as an SLA-enforced module on Helios.',
    style: 'neon',
    category: 'tech'
  },
  {
    id: 'str-helios-trustsign',
    fromId: 'dossier-helios-engine',
    toId: 'dossier-trustsign',
    label: 'CRYPTOGRAPHIC TRUST',
    narrativeReason: 'TrustSign is the SHA-256 tamper-evident PDF signing module embedded in Helios.',
    style: 'crimson',
    category: 'tech'
  },
  {
    id: 'str-crm-trustsign',
    fromId: 'dossier-helios-crm',
    toId: 'dossier-trustsign',
    label: 'CRM → E-SIGN',
    narrativeReason: 'Closed-Won CRM deals automatically generate TrustSign e-signature envelopes.',
    style: 'dashed',
    category: 'tech'
  },
  {
    id: 'str-matrix-helios',
    fromId: 'evidence-thesci-matrix',
    toId: 'dossier-helios-engine',
    label: 'COMPETITIVE TCO',
    narrativeReason: 'Benchmarked 90% RAM reduction and 10x lower TCO against cPanel, Salesforce, and Workday.',
    category: 'custom'
  }
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    title: 'Chapter 1: The Genesis & Academic Crucible',
    timeframe: '2018 – 2025',
    headline: 'FOUNDATIONS OF RIGOR & DATA SCIENCE',
    narrative: 'The journey of Shivam Vishwanaath began with high academic discipline at Chinmaya Vidyalaya, progressing into a rigorous B.Tech in Electronics & Communication Engineering at the prestigious Birla Institute of Technology, Mesra. Today, Shivam Vishwanaath is expanding into machine learning and predictive architectures with an MBA in Data Science at Amity Online.',
    focusedClueIds: ['document-education', 'map-clue', 'subject-shivam'],
    highlightConnections: ['str-subject-edu', 'str-subject-map']
  },
  {
    id: 2,
    title: 'Chapter 2: The Rogue Freelancer & Android Breakout',
    timeframe: '2021 – 2024',
    headline: 'THE 70+ FIVE-STAR RATINGS & EDTECH GENESIS',
    narrative: 'Logging over 100+ hours of hands-on Android engineering, Shivam Vishwanaath published a standalone Periodic Table tool on Google Play Store, earning a rare 70+ five-star reviews. Shivam Vishwanaath then engineered the Chemistry Forum, which automated support workflows and reduced manual grievance handling by 65%.',
    focusedClueIds: ['sticky-periodic-table', 'sticky-chem-forum', 'polaroid-johar-qeds'],
    highlightConnections: ['str-nm-periodic', 'str-periodic-chem', 'str-edu-johar']
  },
  {
    id: 3,
    title: 'Chapter 3: High-Traffic Portals & Enterprise Testing',
    timeframe: '2023 – 2024',
    headline: 'PORTALS WITH 99% UPTIME & JEE/NEET ECOSYSTEMS',
    narrative: 'At JoharNite, Shivam Vishwanaath architected the official festival portal serving an audience of 9.3K+ with 99% uptime. Shivam Vishwanaath followed this at NM Foundation by building a cross-platform test simulation engine for JEE/NEET aspirants with dual administrator CMS and student testing portals.',
    focusedClueIds: ['polaroid-johar-qeds', 'polaroid-nm-foundation', 'dossier-epac'],
    highlightConnections: ['str-subject-nm', 'str-edu-johar']
  },
  {
    id: 4,
    title: 'Chapter 4: The Tech Lead & Enterprise Architecture',
    timeframe: '2025 – Present',
    headline: 'ORCHESTRATING TRANS ED: CBSE, BITSAT & TUTORS FORUM',
    narrative: 'Stepping into the Tech Lead command at Trans Ed, Shivam Vishwanaath took complete ownership of frontend architecture, database topology, and cloud server orchestration. Shivam Vishwanaath delivered CBSEForum for Classes 1–12, BITSATForum with smart weak-area analytics, and Tutors Forum with automated billing pipelines.',
    focusedClueIds: ['headline-transed', 'dossier-cbse-bitsat', 'dossier-tutors-forum', 'arsenal-matrix'],
    highlightConnections: ['str-subject-transed', 'str-transed-cbse', 'str-transed-tutors', 'str-subject-arsenal']
  },
  {
    id: 5,
    title: 'Chapter 5: Community Leadership & The Humanitarian Record',
    timeframe: '2022 – 2025',
    headline: '250+ BLOOD UNITS & 130+ UNDERPRIVILEGED STUDENTS',
    narrative: 'Beyond writing resilient code, Shivam Vishwanaath proved immense organizational leadership as Event Head at NSS (spearheading a 250+ unit blood collection in a single day and teaching 130+ kids in the Village Education Program) and as President of EPAC directing environmental initiatives with 35+ volunteers.',
    focusedClueIds: ['headline-blood-drive', 'dossier-epac', 'subject-shivam'],
    highlightConnections: ['str-subject-blood', 'str-blood-epac']
  },
  {
    id: 6,
    title: 'Chapter 6: The Founder & Enterprise Cloud Architect',
    timeframe: '2026 – Present',
    headline: 'MCA INCORPORATED — HELIOS ENTERPRISE CLOUD PLATFORM SHIPPED',
    narrative: 'Starting with just an MSME certificate, Shivam Vishwanaath successfully navigated initial client acquisitions and contract formations. In February 2026, he formally incorporated The SCI SolCielo Innovacion Private Limited™ with the Ministry of Corporate Affairs (MCA India) as a full-fledged PVT LTD. The culmination: Helios — a compiled Go + Fiber v2 engine at ~15MB RAM idle, delivering 5 enterprise SaaS suites (CRM, HRMS, PM, Support, TrustSign) as self-hosted alternatives to Salesforce, Workday, Jira, Zendesk, and DocuSign. Concurrent Tech Lead role at Trans Ed continues.',
    focusedClueIds: [
      'headline-thesci-mca',
      'dossier-thesci-company',
      'dossier-helios-engine',
      'dossier-helios-crm',
      'dossier-helios-hrms',
      'dossier-helios-pm',
      'dossier-helios-support',
      'dossier-trustsign',
      'evidence-thesci-matrix',
    ],
    highlightConnections: [
      'str-mca-thesci',
      'str-thesci-subject',
      'str-thesci-helios',
      'str-helios-crm',
      'str-helios-hrms',
      'str-helios-pm',
      'str-helios-support',
      'str-helios-trustsign',
      'str-matrix-helios',
    ]
  }
];
