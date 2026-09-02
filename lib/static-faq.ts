export interface FAQItem {
  id: string;
  category: 'TECH LEADERSHIP' | 'DEVOPS & SERVERS' | 'CRISIS & SOCIAL IMPACT' | 'CONTACT & RECRUITMENT' | 'PROJECTS & EDTECH';
  question: string;
  label: string;
  answerMarkdown: string;
}

export const STATIC_FAQS: FAQItem[] = [
  {
    id: 'trans-ed-tech-lead',
    category: 'TECH LEADERSHIP',
    label: '🏢 Trans Ed Tech Lead',
    question: 'What are Shivam Vishwanaath\'s major architectural achievements as Tech Lead at Trans Ed?',
    answerMarkdown: `### 🔍 ARCHIVE REPORT: TECH LEAD AT TRANS ED

**Subject Shivam Vishwanaath** serves as **Tech Lead** at Trans Ed (Bhubaneswar, May 2025 – Present), orchestrating enterprise full-stack architecture across 3 production engines:

1. **CBSEForum (Classes 1–12):**
   * High-speed centralized repository for syllabus materials, practice modules, and standardized examinations.
2. **BITSATForum & Smart Diagnostic Engine:**
   * Multi-tier test series (topic-wise, chapter-wise, full-length) integrated with **real-time diagnostic recommendation algorithms** that isolate conceptual weak areas.
3. **Tutors Forum Marketplace:**
   * Multi-tenant marketplace connecting students with verified tutors, featuring automated billing pipelines, hourly rate calculation, syllabus progress meters, and calendar conflict resolution.
4. **DevOps & Server Ownership:**
   * Provisions and hardens bare-metal **Ubuntu VPS**, **Caddy reverse proxy** with automated SSL rotation, **PM2 clustering** with zero-downtime hot reloads, and **Docker** containerization.

*Verdict: Verified production-grade technical leadership and full-stack systems engineering.*`
  },
  {
    id: 'bitsat-diagnostic-engine',
    category: 'TECH LEADERSHIP',
    label: '🎯 BITSAT Diagnostic Engine',
    question: 'How did Shivam Vishwanaath engineer the BITSATForum smart recommendation algorithms for weak-area diagnostics?',
    answerMarkdown: `### 🎯 FORENSIC ANALYSIS: BITSAT DIAGNOSTIC ENGINE

**Subject Shivam Vishwanaath** designed and implemented the algorithmic test simulation core for BITSATForum:

* **Telemetric Response Tracking:** Analyzes per-question response velocity, difficulty tier, and historical accuracy curves in real time.
* **Weak-Topic Clustering Algorithm:** Automatically categorizes conceptual blind spots across complex multi-subject syllabus domains.
* **Dynamic Test Generation:** Enables students to spin up customized practice quizzes targeting specific sub-topics, timers, and difficulty levels.
* **Percentile & Rank Projection:** Accurately projects simulated national percentiles matching official exam criteria and negative marking schemes.`
  },
  {
    id: 'tutors-billing-pipeline',
    category: 'TECH LEADERSHIP',
    label: '💳 Tutors Automated Billing',
    question: 'Explain the automated billing and scheduling system built for Tutors Forum.',
    answerMarkdown: `### 💳 FINANCIAL LEDGER AUDIT: TUTORS FORUM BILLING

**Engineered by Shivam Vishwanaath:**

* **Automated Ledger Reconciliation:** Engineered automated billing pipelines calculating hourly session rates, platform commission splits, and payout records with **zero financial discrepancies**.
* **Conflict-Free Scheduling:** Integrated interactive calendar scheduling with timezone synchronization and automated booking conflict checks.
* **Syllabus Progression Tracking:** Built visual milestone meters allowing parents and candidates to track completed curriculum hours against target deadlines.`
  },
  {
    id: 'devops-infrastructure-matrix',
    category: 'DEVOPS & SERVERS',
    label: '🐧 Linux VPS & Caddy Stack',
    question: 'Detail Shivam Vishwanaath\'s DevOps stack: Ubuntu VPS, Caddy reverse proxy, PM2, Docker, and UFW firewall.',
    answerMarkdown: `### ⚙️ FORENSIC TELEMETRY: DEVOPS & INFRASTRUCTURE MATRIX

**Subject Shivam Vishwanaath\'s Verified Infrastructure Stack:**

* **Bare-Metal VPS Administration:** Ubuntu Server configuration, non-root user privilege management, and storage quotas.
* **Web Server & SSL:** **Caddy Reverse Proxy** configured with automated HTTPS/TLS certificate rotation, HTTP/2 & HTTP/3 support, and custom rate limiting.
* **Process Management:** **PM2** runtime process manager with cluster mode, auto-restart on memory limits, and zero-downtime hot reloads.
* **Security & Firewall:** **UFW** (Uncomplicated Firewall) securing open ports (22, 80, 443), SSH key-based authentication, and brute-force mitigation.
* **Containerization:** **Docker & Docker Compose** for reproducible microservices and isolated builds.
* **Databases:** PostgreSQL, MongoDB, Supabase, and Firebase Realtime Database.

*Key Characteristic: Full ownership of both frontend user experience and low-level Linux production hosting.*`
  },
  {
    id: 'uptime-fest-scaling',
    category: 'DEVOPS & SERVERS',
    label: '⚡ 99% Uptime Surges',
    question: 'How did Shivam Vishwanaath maintain 99% uptime with 0 server drops during JoharNite fest for 9.3K+ users?',
    answerMarkdown: `### ⚡ TRAFFIC SURGE AUDIT: JOHARNITE FESTIVAL PORTAL

**Telemetry Record (Feb 2023 – Mar 2023):**

* **Audience Scale:** Handled live traffic spikes from an active community of **9.3K+ attendees and followers**.
* **Zero Drop Record:** Achieved **99% uptime with 0 dropped connections** during high-concurrency peak registration and headliner announcement windows.
* **Architecture:** Built with **Angular**, **Tailwind CSS**, and **Firebase**, utilizing client-side caching and debounced API polling to minimize server pressure.`
  },
  {
    id: 'nss-blood-drive-leadership',
    category: 'CRISIS & SOCIAL IMPACT',
    label: '🩸 500+ Blood Units Drive',
    question: 'Tell me about the NSS Mega Blood Donation Drive collecting 500+ units and teaching 300+ kids.',
    answerMarkdown: `### 🩸 WITNESS TESTIMONY: NSS HUMANITARIAN COMMAND

**Records (2022 – 2025) under Shivam Vishwanaath\'s Leadership:**

* **Record Mega Blood Donation Drive:**
  * Promoted from Joint Secretary to **Event Head** at NSS (National Service Scheme).
  * Mobilized student volunteers and regional medical teams to collect a record-breaking **500+ units of blood in a single 24-hour cycle**.
* **Village Education Program:**
  * Spearheaded weekend educational workshops teaching **300+ underprivileged children** across rural village centers with structured syllabus cycles.
* **EPAC Environmental Leadership:**
  * Served as **President of EPAC**, directing campus sustainability drives, managing **100+ active student advocates**, and engineering the community portal connecting **250+ alumni**.

*Verdict: High-EQ organizational leadership, crisis management, and humanitarian mobilization capability.*`
  },
  {
    id: 'verified-contact-coordinates',
    category: 'CONTACT & RECRUITMENT',
    label: '📡 Direct Contact & Availability',
    question: 'How can recruiters, technical directors, and founders connect with Shivam Vishwanaath?',
    answerMarkdown: `### 📡 DIRECT WIRE: VERIFIED CONTACT CHANNELS

**Subject SHIVAM VISHWANAATH\'s Confirmed Channels:**

* **Direct Electronic Mail:** [shivam.strive@gmail.com](mailto:shivam.strive@gmail.com)
* **GitHub Repository Portfolio:** [github.com/shivamvishwanaath](https://github.com/shivamvishwanaath)
* **Instagram Channel:** [instagram.com/shivamvishwanaath](https://www.instagram.com/shivamvishwanaath/)
* **X (Twitter) Feed:** [x.com/svishwanaath](https://x.com/svishwanaath)
* **Primary Geographical Hubs:** Bhubaneswar, Odisha / Ranchi, Jharkhand / Remote Worldwide

*Clearance Status: Actively evaluating Technical Leadership, Senior Full-Stack Engineering, and Systems Architecture opportunities.*`
  },
  {
    id: 'projects-overview',
    category: 'PROJECTS & EDTECH',
    label: '🧪 Flagship Projects & Apps',
    question: 'What other applications, platforms, and utilities has Shivam Vishwanaath built?',
    answerMarkdown: `### 🧪 EXHIBIT INVENTORY: PRODUCTION PLATFORMS

**Portfolio of Shivam Vishwanaath:**

1. **Periodic Table Android Utility (Google Play Store):**
   * 100+ hours in Java & XML Android Studio; achieved **70+ organic 5-star ratings** and 100+ downloads. 100% offline-first architecture with sub-10ms element lookups.
2. **Chemistry Forum Workflow Automation:**
   * Automated query routing and formula rendering platform slashing student doubt grievances by **65%**.
3. **NM Foundation (JEE/NEET Dual Portals):**
   * Full-stack cross-platform exam prep system featuring separate student testing and administrator question-authoring CMS.
4. **1st QEDS Conference Portal (BIT Mesra):**
   * Official conference web portal hosting international academic speakers from IIT Kharagpur and ISI Kolkata.`
  }
];
