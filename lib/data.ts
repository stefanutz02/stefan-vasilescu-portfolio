import type { Language } from './translations';

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export interface Repo {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: Record<Language, string>;
  category: 'coding' | 'robotics';
  tags: string[];
  /** Optional — cards without a screenshot get a branded gradient cover. */
  image?: string;
  imageAlt: string;
  link?: string;
  github?: Repo[];
  appStore?: string;
  playStore?: string;
  inDevelopment?: boolean;
}

export const projects: Project[] = [
  {
    id: 'erainnovations-web',
    title: 'Era Innovations',
    description: {
      en: 'Corporate website for Era Innovations built with React. Modern design, fast performance, and SEO-optimized architecture.',
      ro: 'Website corporate pentru Era Innovations, construit cu React. Design modern, performanță ridicată și arhitectură optimizată SEO.',
    },
    category: 'coding',
    tags: ['React', 'Next.js', 'TailwindCSS'],
    image: '/projects/erainnovations.jpg',
    imageAlt: 'Era Innovations website homepage screenshot',
    link: 'https://erainnovations.ro',
    github: [
      { label: 'Website', url: 'https://github.com/stefanutz02/era-innovations-website' },
      { label: 'API', url: 'https://github.com/stefanutz02/era-innovations-api' },
    ],
  },
  {
    id: 'obiectiv-imobiliare',
    title: 'Obiectiv Imobiliare',
    description: {
      en: 'Full-featured real estate mobile app with ImmoFlux CRM integration, WordPress sync, authentication, favorites, and an AI chatbot powered by Groq.',
      ro: 'Aplicație mobilă imobiliară completă, cu integrare ImmoFlux CRM, sincronizare WordPress, autentificare, favorite și un chatbot AI bazat pe Groq.',
    },
    category: 'coding',
    tags: ['React Native', 'Expo', 'Node.js', 'Groq'],
    image: '/projects/obiectiv-imobiliare.jpg',
    imageAlt: 'Obiectiv Imobiliare mobile app interface on iPhone',
    appStore: 'https://apps.apple.com/ro/app/obiectiv-imobiliare/id6754935818?l=ro',
    playStore: 'https://play.google.com/store/apps/details?id=com.obiectivimobiliare.app&hl=ro',
    github: [{ label: 'realty-pro', url: 'https://github.com/stefanutz02/realty-pro' }],
  },
  {
    id: 'anya-events',
    title: 'Anya Events',
    description: {
      en: 'Premium Shopify e-commerce store for event planning and decorations, serving both Romanian and international markets.',
      ro: 'Magazin online premium pe Shopify pentru organizare de evenimente și decorațiuni, pentru piața din România și cea internațională.',
    },
    category: 'coding',
    tags: ['Shopify', 'Liquid', 'E-commerce'],
    image: '/projects/anya-events.jpg',
    imageAlt: 'Anya Events Shopify store product page',
    link: 'https://anya-events.ro',
  },
  {
    id: 'era-weather',
    title: 'Project ERA Weather',
    description: {
      en: 'Smart meteorological station with IoT sensors, real-time data telemetry, and environmental analytics dashboard. Currently in active development.',
      ro: 'Stație meteorologică inteligentă cu senzori IoT, telemetrie în timp real și dashboard de analiză a mediului. În dezvoltare activă.',
    },
    category: 'robotics',
    tags: ['IoT', 'Embedded C', 'MQTT', 'Sensors'],
    imageAlt: 'ERA Weather IoT meteorological station prototype',
    inDevelopment: true,
  },
  {
    id: 'vesko-rover',
    title: 'Vesko Rover',
    description: {
      en: 'Autonomous ground vehicle with computer vision, path planning, and remote telemetry capabilities.',
      ro: 'Vehicul terestru autonom cu viziune computerizată, planificare de traseu și telemetrie la distanță.',
    },
    category: 'robotics',
    tags: ['Python', 'OpenCV', 'Raspberry Pi', 'ROS'],
    imageAlt: 'Vesko Rover autonomous ground vehicle',
  },
];

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

export const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Flutter',
  'Expo',
  'MySQL',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'Git',
  'Linux',
] as const;

export type Skill = (typeof skills)[number];

/* ------------------------------------------------------------------ */
/*  Contact & social                                                   */
/* ------------------------------------------------------------------ */

export const CONTACT_API_URL = 'https://email-api.stefanvasilescu.com/contact';

export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/stefanutz02', handle: '@stefanutz02' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/stefanvasilescu', handle: 'Stefan Vasilescu' },
  { id: 'twitter', label: 'Twitter / X', href: 'https://twitter.com/stefanutz02', handle: '@stefanutz02' },
  { id: 'email', label: 'Email', href: 'mailto:contact@stefanvasilescu.com', handle: 'contact@stefanvasilescu.com' },
] as const;

export const companies = [
  { name: 'Vesko Software', href: 'https://vesko.ro' },
  { name: 'Era Innovations', href: 'https://erainnovations.ro' },
] as const;
