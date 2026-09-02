import { SITE_URL, SITE_NAME, SOCIAL_LINKS, BUILD_DATE } from './seo-content';

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Shivam Vishwanaath',
    alternateName: [
      'Founder Shivam Vishwanaath',
      'Shivam Vishwanaath CEO The SCI SolCielo',
      'Tech Lead Shivam Vishwanaath',
      'Shivam Vishwanaath Full Stack Architect',
      'Shivam Vishwanaath Engineer',
    ],
    jobTitle: 'Founder & CEO, The SCI SolCielo Innovacion Private Limited™',
    description: 'Founder & CEO of The SCI SolCielo Innovacion Private Limited™ (MCA India, Feb 2026), architect of the Helios Enterprise Cloud Platform (Go + Fiber v2), and Tech Lead at Trans Ed directing CBSEForum, BITSATForum, and Tutors Forum.',
    url: SITE_URL,
    image: `${SITE_URL}/images/shivam-vishwanaath.webp`,
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.x,
    ],
    email: SOCIAL_LINKS.email,
    worksFor: [
      {
        '@type': 'Organization',
        name: 'The SCI SolCielo Innovacion Private Limited',
        url: 'https://thesci.co',
        foundingDate: '2026-02',
        description: 'IT company incorporated with MCA India in February 2026, creator of the Helios Enterprise Cloud Platform.',
      },
      {
        '@type': 'Organization',
        name: 'Trans Ed',
        url: 'https://transed.in',
      },
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Birla Institute of Technology, Mesra',
        url: 'https://www.bitmesra.ac.in',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Amity Online',
        url: 'https://amityonline.com',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Chinmaya Vidyalaya',
      },
    ],
    knowsAbout: [
      'Enterprise Cloud Architecture',
      'Go / Fiber v2 Server Engineering',
      'Self-Hosted SaaS Development',
      'Cryptographic Document Signing',
      'Company Founding & Leadership',
      'Full-Stack Architecture',
      'TypeScript',
      'React.js',
      'Next.js App Router',
      'Node.js',
      'Ubuntu Linux VPS Management',
      'Caddy Reverse Proxy & SSL Automation',
      'Docker & Containerization',
      'PM2 Runtime Process Clustering',
      'Data Science & Machine Learning',
      'Competitive Exam Assessment Engines',
      'Automated Billing Pipelines',
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Official portfolio and case docket of Tech Lead Shivam Vishwanaath.',
    publisher: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/about#profilepage`,
    url: `${SITE_URL}/about`,
    name: 'About Shivam Vishwanaath | Tech Lead & Full-Stack Architect',
    description: 'Official profile dossier of Shivam Vishwanaath — Tech Lead at Trans Ed, Full-Stack Architect, and NSS Event Head.',
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
    },
    dateModified: BUILD_DATE,
  };
}

export function getWorkExperienceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Shivam Vishwanaath',
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Tech Lead & Full-Stack Architect',
        occupationalCategory: '15-1252.00',
        description: 'Directing full-stack software development, architectural blueprints, and Linux cloud infrastructure for CBSEForum, BITSATForum, and Tutors Forum at Trans Ed.',
        hasOccupationLocation: {
          '@type': 'City',
          name: 'Bhubaneswar, India',
        },
      },
      {
        '@type': 'Occupation',
        name: 'Junior Full-Stack Developer',
        occupationalCategory: '15-1252.00',
        description: 'Engineering responsive frontends, backend REST APIs, and database migrations for high-traffic educational portals at Trans Ed.',
      },
      {
        '@type': 'Occupation',
        name: 'Freelance Full-Stack & Android Developer',
        occupationalCategory: '15-1252.00',
        description: 'Published 5-star Google Play Periodic Table application and delivered high-concurrency event portals.',
      },
    ],
  };
}

export function getEducationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Academic Credentials of Shivam Vishwanaath',
    description: 'Degrees and academic pedigree of Shivam Vishwanaath.',
    url: `${SITE_URL}/education`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Master of Business Administration (MBA) in Data Science',
          credentialCategory: 'degree',
          recognizedBy: {
            '@type': 'EducationalOrganization',
            name: 'Amity University',
            url: 'https://amityonline.com',
          },
          validFrom: '2022',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
          credentialCategory: 'degree',
          recognizedBy: {
            '@type': 'EducationalOrganization',
            name: 'Birla Institute of Technology, Mesra',
            url: 'https://www.bitmesra.ac.in',
          },
          validFrom: '2017',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Senior Secondary Certificate (Class XII — CBSE)',
          credentialCategory: 'highSchoolDiploma',
          recognizedBy: {
            '@type': 'EducationalOrganization',
            name: 'Chinmaya Vidyalaya, Bokaro',
          },
        },
      },
    ],
  };
}

export function getProjectsListSchema(projects: Array<{ title: string; summary: string; slug?: string; tags?: string[] }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Software Projects Engineered by Shivam Vishwanaath',
    description: 'Production platforms, educational portals, and algorithmic testing engines built by Shivam Vishwanaath.',
    url: `${SITE_URL}/projects`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.title.replace('CASE FILE: ', '').replace('CLUE: ', '').replace('NOTE: ', '').replace('EVIDENCE 08: ', ''),
        description: project.summary,
        url: project.slug ? `${SITE_URL}/projects/${project.slug}` : `${SITE_URL}/projects`,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Cross-Platform',
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
        },
        keywords: project.tags?.join(', '),
      },
    })),
  };
}

export function getCreativeWorkSchema(project: {
  title: string;
  description: string;
  url: string;
  tags?: string[];
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
    },
    description: project.description,
    url: project.url,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Cross-Platform',
    keywords: project.tags?.join(', '),
    ...(project.datePublished ? { datePublished: project.datePublished } : {}),
  };
}

export function getCommunitySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Community Leadership & Social Impact by Shivam Vishwanaath',
    description: 'Social initiatives, NSS leadership, and humanitarian drives directed by Shivam Vishwanaath.',
    url: `${SITE_URL}/community`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Event',
          name: 'NSS Mega Blood Donation Camp — 250+ Units Record',
          description: 'Largest single-day blood donation drive organized under Shivam Vishwanaath as NSS Event Head.',
          organizer: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
          },
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'OrganizeAction',
          name: 'EPAC Environmental Awareness Campaign',
          description: 'Head of EPAC directing university green campus initiatives, plastic reduction, and plantation campaigns.',
          agent: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'VolunteerAction',
          name: 'NSS Village Child Education Initiative',
          description: 'Teaching STEM and foundational literacy to 130+ underprivileged village children near Ranchi.',
          agent: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
          },
        },
      },
    ],
  };
}

export function getContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#contactpage`,
    url: `${SITE_URL}/contact`,
    name: 'Contact Shivam Vishwanaath | Direct Recruiter Wire',
    description: 'Direct communication coordinates for hiring and engineering inquiries with Tech Lead Shivam Vishwanaath.',
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Professional Engineering & Recruitment Inquiry',
        email: SOCIAL_LINKS.email,
        availableLanguage: ['English', 'Hindi'],
      },
    },
  };
}

export function getFAQPageSchema(faqs: { question: string; answerMarkdown: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answerMarkdown.replace(/#/g, '').replace(/\*/g, '').trim(),
      },
    })),
  };
}

export function getArticleSchema(post: {
  title: string;
  description: string;
  url: string;
  tags?: string[];
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
    image: `${SITE_URL}/images/shivam-vishwanaath-og.jpg`,
    keywords: post.tags && post.tags.length > 0 ? post.tags.join(', ') : undefined,
    datePublished: post.datePublished,
    dateModified: BUILD_DATE,
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME },
    publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person` },
  };
}
