import { ClueItem, RedStringConnection } from './investigation-data';

export type CaseActId = 'act-1' | 'act-2' | 'act-3' | 'act-4' | 'incident-log' | 'evidence-vault' | 'verdict';

export interface CaseActDefinition {
  id: CaseActId;
  actNumber: string;
  codename: string;
  title: string;
  subtitle: string;
  timeframe: string;
  theme: string;
  briefing: string;
  objective: string;
  requiredClueIds: string[];
  connections: RedStringConnection[];
  dossierSummary: string;
  status: 'active' | 'locked' | 'completed';
}

export const CASE_ACTS: Record<'act-1' | 'act-2' | 'act-3' | 'act-4', CaseActDefinition> = {
  'act-1': {
    id: 'act-1',
    actNumber: 'ACT I',
    codename: 'OPERATION GENESIS',
    title: 'Act I: The Genesis & The Rogue Engineer',
    subtitle: 'Academic Foundations, Android Breakouts & Early Impact',
    timeframe: '2020 – 2022',
    theme: 'Foundational Codecraft & Scientific Pedigree',
    briefing: 'Inspect the initial crime scene where Subject Shivam Vishwanaath begins forging his engineering arsenal at BIT Mesra, releasing the 5-star Periodic Table Android tool and authoring the automated Chemistry Forum.',
    objective: 'Examine 3 critical exhibits: Academic Dossier, Periodic Table APK record, and Chemistry Forum reduction logs.',
    requiredClueIds: ['document-education', 'sticky-periodic-table', 'sticky-chem-forum', 'map-clue'],
    connections: [
      {
        id: 'act1-str-edu-map',
        fromId: 'document-education',
        toId: 'map-clue',
        label: 'Academic Corridor',
        narrativeReason: 'Traces the transition from Bokaro to BIT Mesra Ranchi and Amity Online.',
        category: 'core'
      },
      {
        id: 'act1-str-edu-periodic',
        fromId: 'document-education',
        toId: 'sticky-periodic-table',
        label: '100+ Dev Hours APK',
        narrativeReason: 'Engineering rigor translated into 70+ five-star Android reviews.',
        category: 'tech'
      },
      {
        id: 'act1-str-periodic-chem',
        fromId: 'sticky-periodic-table',
        toId: 'sticky-chem-forum',
        label: 'Grievance Automation',
        narrativeReason: 'Reduced student doubt grievances by 65% through custom web tooling.',
        category: 'tech'
      }
    ],
    dossierSummary: 'Subject establishes deep hardware-level ECE discipline, standalone Android mobile development craft, and student workflow automation.',
    status: 'active'
  },
  'act-2': {
    id: 'act-2',
    actNumber: 'ACT II',
    codename: 'OPERATION SURGE COMMAND',
    title: 'Act II: The Surge & Campus Operations',
    subtitle: 'Crisis Mitigation, 9.3K+ Fest Scaling & NSS Humanitarian Command',
    timeframe: '2022 – 2024',
    theme: 'High Concurrency, Infrastructure Resilience & Community Mobilization',
    briefing: 'Witness statements reveal Shivam Vishwanaath scaling live portals under massive fest surge traffic (9.3K fans at JoharNite with 99% uptime), architecting NM Foundation’s dual JEE/NEET portals, and mobilizing record blood drives as NSS Event Head.',
    objective: 'Investigate JoharNite Fest telemetry, NM Foundation dual-portal exam engines, and NSS 250+ blood units drive.',
    requiredClueIds: ['polaroid-johar-qeds', 'polaroid-nm-foundation', 'headline-blood-drive', 'dossier-epac'],
    connections: [
      {
        id: 'act2-str-johar-nm',
        fromId: 'polaroid-johar-qeds',
        toId: 'polaroid-nm-foundation',
        label: 'Concurrency to Exams',
        narrativeReason: 'High-traffic frontend and real-time exam portals tested against live spikes.',
        category: 'core'
      },
      {
        id: 'act2-str-blood-epac',
        fromId: 'headline-blood-drive',
        toId: 'dossier-epac',
        label: 'Humanitarian Leadership',
        narrativeReason: 'NSS Event Head command leading 250+ units & EPAC presidency directing 35+ volunteers.',
        category: 'leadership'
      },
      {
        id: 'act2-str-nm-blood',
        fromId: 'polaroid-nm-foundation',
        toId: 'headline-blood-drive',
        label: 'Dual Impact',
        narrativeReason: 'Simultaneous excellence across EdTech software engineering and social welfare.',
        category: 'core'
      }
    ],
    dossierSummary: 'Subject masters real-time concurrency with 0% server drops, dual-portal exam CMS architectures, and proven team governance.',
    status: 'active'
  },
  'act-3': {
    id: 'act-3',
    actNumber: 'ACT III',
    codename: 'OPERATION TECH LEAD COMMAND',
    title: 'Act III: The Mastermind Architect',
    subtitle: 'Trans Ed Ecosystem, Ubuntu VPS/Caddy DevOps & Production Supremacy',
    timeframe: '2024 – Present',
    theme: 'Enterprise Multi-Platform Engineering, Automated Billing & Cloud DevOps',
    briefing: 'Current intelligence: Shivam Vishwanaath operates as Tech Lead directing architecture across CBSEForum, BITSATForum, and Tutors Forum, backed by a fortified Linux/Caddy/Docker DevOps arsenal.',
    objective: 'Cross-reference Trans Ed Lead Appointment, CBSE/BITSAT weak-area algorithms, Tutors Forum automated billing, and DevOps matrix.',
    requiredClueIds: ['subject-shivam', 'headline-transed', 'dossier-cbse-bitsat', 'dossier-tutors-forum', 'arsenal-matrix'],
    connections: [
      {
        id: 'act3-str-subject-transed',
        fromId: 'subject-shivam',
        toId: 'headline-transed',
        label: 'Tech Lead Directive',
        narrativeReason: 'Sole architectural driver for Trans Ed multi-platform expansion.',
        category: 'core'
      },
      {
        id: 'act3-str-transed-cbse',
        fromId: 'headline-transed',
        toId: 'dossier-cbse-bitsat',
        label: 'Algorithmic Diagnostics',
        narrativeReason: 'Smart analytics and weak-area detection engines for Classes 1–12 & BITSAT.',
        category: 'core'
      },
      {
        id: 'act3-str-transed-tutors',
        fromId: 'headline-transed',
        toId: 'dossier-tutors-forum',
        label: 'Automated Billing & Scheduler',
        narrativeReason: 'Tutor-student matching engine with zero-reconciliation-error billing.',
        category: 'core'
      },
      {
        id: 'act3-str-subject-arsenal',
        fromId: 'subject-shivam',
        toId: 'arsenal-matrix',
        label: 'Ubuntu / Caddy / Docker',
        narrativeReason: 'VPS bare-metal configuration, reverse proxy SSL routing, and PM2 zero-downtime hooks.',
        category: 'tech'
      }
    ],
    dossierSummary: 'Subject delivers end-to-end full-stack software leadership, production server reliability, and revenue-critical billing pipelines.',
    status: 'active'
  },
  'act-4': {
    id: 'act-4',
    actNumber: 'ACT IV',
    codename: 'OPERATION FOUNDER',
    title: 'Act IV: The Founder & Enterprise Architect',
    subtitle: 'MCA India Incorporation, Helios Platform & 5 Enterprise SaaS Suites',
    timeframe: '2026 – Present',
    theme: 'Company Formation, Enterprise Cloud Engineering & Self-Hosted SaaS',
    briefing: 'The current act: Shivam Vishwanaath starts The SCI SolCielo Innovacion with just an MSME certificate, securing clients and forming initial contracts. By February 2026, he formally incorporates it as a full-fledged Private Limited company with MCA India, subsequently building and shipping the Helios Enterprise Cloud Platform — a compiled Go + Fiber v2 binary replacing cPanel, Salesforce, Workday, Jira, Zendesk, and DocuSign.',
    objective: 'Review MCA incorporation record, Helios Cloud Engine architecture, and all 5 enterprise suite dossiers: CRM, HRMS, PM, Support, TrustSign.',
    requiredClueIds: [
      'headline-thesci-mca',
      'dossier-thesci-company',
      'dossier-helios-engine',
      'dossier-helios-crm',
      'dossier-helios-hrms',
      'dossier-helios-pm',
      'dossier-helios-support',
      'dossier-trustsign',
    ],
    connections: [
      {
        id: 'act4-str-mca-thesci',
        fromId: 'headline-thesci-mca',
        toId: 'dossier-thesci-company',
        label: 'MCA Incorporation',
        narrativeReason: 'The formal MCA India CIN record is the legal founding document of The SCI.',
        category: 'core',
      },
      {
        id: 'act4-str-thesci-helios',
        fromId: 'dossier-thesci-company',
        toId: 'dossier-helios-engine',
        label: 'Primary Product',
        narrativeReason: 'Helios Cloud Engine is the flagship self-hosted platform of The SCI.',
        category: 'tech',
      },
      {
        id: 'act4-str-helios-crm',
        fromId: 'dossier-helios-engine',
        toId: 'dossier-helios-crm',
        label: 'Enterprise Suite',
        narrativeReason: 'CRM runs as a module on Helios.',
        category: 'tech',
      },
    ],
    dossierSummary: 'Subject founds and incorporates a Private Limited company (MCA India, Feb 2026), delivering 5 enterprise SaaS suites replacing $22,000+/month in combined SaaS costs with a single self-hosted Go binary.',
    status: 'active',
  }
};

export function getClueActInfo(clueId: string, currentActId: 'act-1' | 'act-2' | 'act-3' | 'act-4'): {
  belongsToAct: 'act-1' | 'act-2' | 'act-3' | 'act-4' | 'general';
  isCurrentAct: boolean;
  actLabel: string;
} {
  const act1Clues = CASE_ACTS['act-1'].requiredClueIds;
  const act2Clues = CASE_ACTS['act-2'].requiredClueIds;
  const act3Clues = CASE_ACTS['act-3'].requiredClueIds;
  const act4Clues = CASE_ACTS['act-4'].requiredClueIds;

  let belongsToAct: 'act-1' | 'act-2' | 'act-3' | 'act-4' | 'general' = 'general';
  let actLabel = 'DOSSIER';

  if (clueId === 'subject-shivam') {
    belongsToAct = currentActId;
    actLabel = `ACT ${
      currentActId === 'act-1' ? 'I'
      : currentActId === 'act-2' ? 'II'
      : currentActId === 'act-3' ? 'III'
      : 'IV'
    } SUBJECT`;
  } else if (act1Clues.includes(clueId)) {
    belongsToAct = 'act-1';
    actLabel = 'ACT I EXHIBIT';
  } else if (act2Clues.includes(clueId)) {
    belongsToAct = 'act-2';
    actLabel = 'ACT II EXHIBIT';
  } else if (act3Clues.includes(clueId)) {
    belongsToAct = 'act-3';
    actLabel = 'ACT III EXHIBIT';
  } else if (act4Clues.includes(clueId)) {
    belongsToAct = 'act-4';
    actLabel = 'ACT IV EXHIBIT';
  }

  const isCurrentAct = belongsToAct === currentActId;

  return { belongsToAct, isCurrentAct, actLabel };
}
