import type { Metadata } from 'next';
import type { Language } from './translations';
import { companies, projects, socials } from './data';

/* ------------------------------------------------------------------ */
/*  Single source of truth for SEO                                     */
/* ------------------------------------------------------------------ */

export const SITE_URL = 'https://stefanvasilescu.com';
export const NAME = 'Stefan Vasilescu';
/** Diacritic + handle spellings people may search for. */
export const ALTERNATE_NAMES = ['Ștefan Vasilescu', 'Stefan Vasilescu Piatra Neamț', 'stefanutz02'];

export const PAGE_URL: Record<Language, string> = {
  en: `${SITE_URL}/`,
  ro: `${SITE_URL}/ro/`,
};

const COPY = {
  en: {
    title: 'Stefan Vasilescu — Full-Stack Developer, CEO of Vesko Software',
    description:
      'Stefan Vasilescu is a full-stack developer from Piatra Neamț, Romania — CEO of Vesko Software and Co-Founder of Era Innovations. React, Next.js, Node.js and React Native apps, plus robotics & IoT.',
    ogAlt: 'Stefan Vasilescu — Full-Stack Developer, CEO of Vesko Software',
    locale: 'en_US',
    altLocale: 'ro_RO',
    ogImage: '/og-image.jpg',
    jobTitle: 'Full-Stack Developer',
    personDescription:
      'Full-stack developer from Piatra Neamț, Romania. CEO of Vesko Software and Co-Founder of Era Innovations, building web and mobile products, robotics and IoT.',
  },
  ro: {
    title: 'Ștefan Vasilescu — Dezvoltator Full-Stack, CEO Vesko Software',
    description:
      'Ștefan Vasilescu este dezvoltator full-stack din Piatra Neamț — CEO Vesko Software și Co-Fondator Era Innovations. Aplicații web și mobile cu React, Next.js, Node.js și React Native, plus robotică și IoT.',
    ogAlt: 'Ștefan Vasilescu — Dezvoltator Full-Stack, CEO Vesko Software',
    locale: 'ro_RO',
    altLocale: 'en_US',
    ogImage: '/og-image-ro.jpg',
    jobTitle: 'Dezvoltator Full-Stack',
    personDescription:
      'Dezvoltator full-stack din Piatra Neamț, România. CEO Vesko Software și Co-Fondator Era Innovations, construiește produse web și mobile, robotică și IoT.',
  },
} as const;

const KEYWORDS = [
  'Stefan Vasilescu',
  'Ștefan Vasilescu',
  'Stefan Vasilescu developer',
  'Stefan Vasilescu Vesko',
  'Stefan Vasilescu Piatra Neamt',
  'Full-Stack Developer',
  'Dezvoltator Full-Stack',
  'Vesko Software',
  'Era Innovations',
  'React Developer Romania',
  'Next.js Developer',
  'React Native Developer',
  'Piatra Neamt Developer',
  'Robotics',
  'IoT',
];

export function buildMetadata(lang: Language): Metadata {
  const c = COPY[lang];
  return {
    title: { absolute: c.title },
    description: c.description,
    keywords: KEYWORDS,
    alternates: {
      canonical: PAGE_URL[lang],
      languages: {
        en: PAGE_URL.en,
        ro: PAGE_URL.ro,
        'x-default': PAGE_URL.en,
      },
    },
    openGraph: {
      type: 'profile',
      firstName: 'Stefan',
      lastName: 'Vasilescu',
      username: 'stefanutz02',
      locale: c.locale,
      alternateLocale: c.altLocale,
      url: PAGE_URL[lang],
      siteName: NAME,
      title: c.title,
      description: c.description,
      images: [
        { url: c.ogImage, width: 1200, height: 630, alt: c.ogAlt },
        {
          url: '/stefan-vasilescu-portrait.jpg',
          width: 800,
          height: 800,
          alt: 'Stefan Vasilescu, Full-Stack Developer, portrait photograph',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@stefanutz02',
      creator: '@stefanutz02',
      title: c.title,
      description: c.description,
      images: [c.ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD — ProfilePage + Person (what Google uses for name queries) */
/* ------------------------------------------------------------------ */

export function buildJsonLd(lang: Language) {
  const c = COPY[lang];
  const url = PAGE_URL[lang];
  const person = `${SITE_URL}/#person`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': person },
        about: { '@id': person },
        primaryImageOfPage: { '@id': `${SITE_URL}/#portrait` },
        dateModified: '2026-09-24',
      },
      {
        '@type': 'Person',
        '@id': person,
        name: NAME,
        alternateName: ALTERNATE_NAMES,
        givenName: 'Stefan',
        familyName: 'Vasilescu',
        url: SITE_URL,
        image: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#portrait`,
          url: `${SITE_URL}/stefan-vasilescu-portrait.jpg`,
          contentUrl: `${SITE_URL}/stefan-vasilescu-portrait.jpg`,
          caption: 'Stefan Vasilescu, Full-Stack Developer and CEO of Vesko Software',
          width: 800,
          height: 800,
        },
        jobTitle: c.jobTitle,
        description: c.personDescription,
        email: 'mailto:contact@stefanvasilescu.com',
        telephone: '+40771424077',
        nationality: { '@type': 'Country', name: 'Romania' },
        homeLocation: {
          '@type': 'Place',
          name: 'Piatra Neamț, Romania',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Piatra Neamț',
            addressRegion: 'Neamț',
            addressCountry: 'RO',
          },
        },
        worksFor: [
          { '@id': `${SITE_URL}/#vesko` },
          { '@id': `${SITE_URL}/#era` },
        ],
        sameAs: socials.filter((s) => s.id !== 'email').map((s) => s.href),
        knowsAbout: [
          'Full-Stack Development',
          'React',
          'Next.js',
          'Node.js',
          'React Native',
          'TypeScript',
          'Docker',
          'Robotics',
          'Internet of Things',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: NAME,
        alternateName: ['Stefan Vasilescu Portfolio', 'stefanvasilescu.com'],
        publisher: { '@id': person },
        inLanguage: ['en', 'ro'],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#vesko`,
        name: companies[0].name,
        url: companies[0].href,
        logo: 'https://vesko.ro/apple-icon.png',
        founder: { '@id': person },
        employee: { '@id': person },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#era`,
        name: companies[1].name,
        url: companies[1].href,
        founder: { '@id': person },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#projects`,
        name: lang === 'ro' ? 'Proiecte' : 'Projects',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: p.title,
            description: p.description[lang],
            ...(p.link || p.appStore ? { url: p.link ?? p.appStore } : {}),
            ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}),
            creator: { '@id': person },
            keywords: p.tags.join(', '),
          },
        })),
      },
    ],
  };
}

/* rel="me" links help search engines confirm the same person owns these profiles */
export const REL_ME = socials.filter((s) => s.id !== 'email').map((s) => s.href);
