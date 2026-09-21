import type { PortfolioContent } from "./types";

export const portfolio: PortfolioContent = {
  identity: {
    name: 'Shanid Cherukattil',
    headline: 'AI Creator × AI Product Engineer',
    introduction:
      'I build product experiences, product systems, and AI-enabled workflows that connect engineering, design, and real-world utility.',
    biography:
      'I work across product thinking, frontend systems, creative engineering, and AI-enabled product development. My focus is building interfaces and systems that make complex products feel clear, stable, useful, and thoughtfully designed.',
    currentRole: 'AI Creator + AI Product Engineer',
  },
  portrait: {
    src: '/images/portrait.jpg',
    alt: 'Shanid Cherukattil',
    width: 480,
    height: 480,
  },
  experience: [
    {
      id: 'notch',
      kind: 'employment',
      role: 'Senior Software Engineer',
      organization: 'Notch',
      period: 'Jul 2026 — Present',
      responsibilities: [
        'Work across frontend and backend development using Vue.js and Kotlin.',
        'Contribute to APIs, application services, product architecture, and full-stack feature delivery.',
      ],
      technologies: ['Vue.js', 'Kotlin', 'APIs', 'Product architecture'],
    },
    {
      id: 'spericorn',
      kind: 'employment',
      role: 'Software Engineer',
      organization: 'Spericorn Technology Inc.',
      period: 'Oct 2021 — Aug 2026',
      responsibilities: [
        'Built production applications with React, Next.js, JavaScript, and TypeScript.',
        'Worked with REST APIs, frontend architecture, and performance optimization.',
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'REST APIs'],
    },
    {
      id: 'inmakes',
      kind: 'employment',
      role: 'Software Engineering Intern',
      organization: 'Inmakes Technology',
      period: 'Jul 2021 — Sep 2021',
      responsibilities: [
        'Component-driven development and modern JavaScript.',
        'Professional training in frontend development.',
      ],
      technologies: ['JavaScript', 'Component systems'],
    },
    {
      id: 'education',
      kind: 'education',
      role: 'BCA, Computer Applications',
      organization: 'Nasra Arts and Science College',
      period: '2017 — 2020',
      responsibilities: [],
      technologies: [],
    },
  ],
  projects: [
    {
      id: 'seo-analytics',
      name: 'SEO Analytics Platform',
      users: 'Analytics teams',
      problem:
        'Large datasets made a multi-API reporting interface slow to use.',
      responsibilities: [
        'React and Next.js dashboard development.',
        'Optimizing data consumption and rendering.',
      ],
      architecture:
        'A reporting interface that brings multiple API sources into a React and Next.js dashboard.',
      technologies: ['Next.js', 'React', 'API integration'],
      outcomes: [],
    },
    {
      id: 'fintech',
      name: 'Fintech Money Lending',
      users: 'Financial operations teams',
      problem:
        'Financial workflows needed up-to-date information across the interface.',
      responsibilities: [
        'Frontend architecture and real-time state integration.',
      ],
      architecture:
        'TypeScript and Redux organize application state; Server-Sent Events bring updates into the interface.',
      technologies: ['TypeScript', 'SSE', 'Redux'],
      outcomes: [],
    },
    {
      id: 'call-tracking',
      name: 'Call Tracking Attribution',
      users: 'Marketing teams',
      problem:
        'Make real-time attribution reporting usable across screen sizes.',
      responsibilities: [
        'Responsive reporting interface development.',
        'Accessibility and fluid layouts.',
      ],
      architecture:
        'A responsive reporting interface for marketing attribution data.',
      technologies: ['Responsive UI', 'Reporting', 'Accessibility'],
      outcomes: [],
    },
    {
      id: 'admin-platform',
      name: 'Admin Management Platform',
      users: 'Internal operations teams',
      problem:
        'Support booking and everyday operational workflows in one interface.',
      responsibilities: ['Booking interface and state-management development.'],
      architecture:
        'An enterprise interface that connects booking flows with shared application state.',
      technologies: ['Enterprise UI', 'State management'],
      outcomes: [],
    },
  ],
  skills: [
    {
      id: 'interfaces',
      name: 'Interface engineering',
      capabilities: [
        'React & Next.js',
        'TypeScript',
        'Reusable component systems',
      ],
      evidence: [{ kind: 'experience', id: 'spericorn' }],
    },
    {
      id: 'product-systems',
      name: 'Product systems',
      capabilities: [
        'Vue.js & Kotlin',
        'Backend services',
        'REST APIs',
        'Full-stack delivery',
      ],
      evidence: [{ kind: 'experience', id: 'notch' }],
    },
    {
      id: 'performance',
      name: 'Performance & discovery',
      capabilities: ['SSR & SSG', 'Core Web Vitals', 'Technical SEO'],
      evidence: [{ kind: 'project', id: 'seo-analytics' }],
    },
    {
      id: 'realtime',
      name: 'Connected applications',
      capabilities: [
        'Server-Sent Events',
        'Redux & application state',
        'API integration',
      ],
      evidence: [{ kind: 'project', id: 'fintech' }],
    },
  ],
  aiPractices: [],
  contact: {
    email: 'shanid0cherukattil@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/shanid0cherukattil/',
  },
};
