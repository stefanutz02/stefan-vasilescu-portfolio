import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { ThemeProvider, themeScript } from '@/components/ThemeProvider';
import { ScrollProgress } from '@/components/Motion';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap'
});

const display = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap'
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://stefanvasilescu.com'),
  
  title: {
    default: 'Stefan Vasilescu | Full-Stack Developer & CEO',
    template: '%s | Stefan Vasilescu',
  },
  
  description:
    'Full-Stack Developer building immersive digital experiences, scalable platforms, and futuristic products. CEO of Vesko Software, Co-Founder of Era Innovations. Based in Romania.',
  
  keywords: [
    'Stefan Vasilescu',
    'Full-Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'React Native Developer',
    'Vesko Software',
    'Era Innovations',
    'Romania Developer',
    'Piatra Neamt Developer',
    'Web Development Romania',
    'Mobile App Development',
    'Robotics',
    'IoT',
    'Software Engineer',
    'Freelance Developer Romania',
    'Real Estate Technology',
    'ImmoFlux',
    'Expo Developer',
    'TypeScript',
  ],
  
  authors: [{ name: 'Stefan Vasilescu', url: 'https://stefanvasilescu.com' }],
  creator: 'Stefan Vasilescu',
  publisher: 'Stefan Vasilescu',
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: 'https://stefanvasilescu.com',
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ro_RO',
    url: 'https://stefanvasilescu.com',
    siteName: 'Stefan Vasilescu',
    title: 'Stefan Vasilescu | Full-Stack Developer & CEO',
    description:
      'Building immersive digital experiences, scalable platforms, and futuristic products. CEO of Vesko Software, Co-Founder of Era Innovations.',
  images: [
    {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Stefan Vasilescu - Full-Stack Developer Portfolio',
    },
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
    site: '@stefanvasilescu',
    creator: '@stefanvasilescu',
    title: 'Stefan Vasilescu | Full-Stack Developer & CEO',
    description:
      'CEO of Vesko Software. Building the future through code and robotics.',
    images: ['/og-image.jpg'],
  },
  
  category: 'technology',
  classification: 'Portfolio, Software Development, Technology',
  
  other: {
    'geo.region': 'RO-NT',
    'geo.placename': 'Piatra Neamt',
    'geo.position': '46.9292;26.3705',
    'ICBM': '46.9292, 26.3705',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`dark ${inter.variable} ${display.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply saved theme before first paint — dark is the default */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: '[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}' }} />
        </noscript>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Stefan Vasilescu" />
        <meta name="format-detection" content="telephone=no" />
        
        <link rel="dns-prefetch" href="https://email-api.stefanvasilescu.com" />
        <link rel="preconnect" href="https://email-api.stefanvasilescu.com" crossOrigin="anonymous" />
      </head>
      
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <ScrollProgress />
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://stefanvasilescu.com/#person',
                  name: 'Stefan Vasilescu',
                  givenName: 'Stefan',
                  familyName: 'Vasilescu',
                  url: 'https://stefanvasilescu.com',
                  image: {
                    '@type': 'ImageObject',
                    '@id': 'https://stefanvasilescu.com/#portrait',
                    url: 'https://stefanvasilescu.com/stefan-vasilescu-portrait.jpg',
                    contentUrl: 'https://stefanvasilescu.com/stefan-vasilescu-portrait.jpg',
                    caption: 'Stefan Vasilescu, Full-Stack Developer and CEO of Vesko Software',
                    width: 800,
                    height: 800,
                  },
                  jobTitle: 'Full-Stack Developer',
                  description: 'CEO of Vesko Software and Co-Founder of Era Innovations. Building immersive digital experiences and futuristic products.',
                  email: 'contact@stefanvasilescu.com',
                  telephone: '+40771424077',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Piatra Neamt',
                    addressRegion: 'Neamt',
                    addressCountry: 'RO',
                  },
                  worksFor: [
                    {
                      '@type': 'Organization',
                      name: 'Vesko Software',
                      url: 'https://vesko.ro',
                      jobTitle: 'CEO',
                    },
                    {
                      '@type': 'Organization',
                      name: 'Era Innovations',
                      url: 'https://erainnovations.ro',
                      jobTitle: 'Co-Founder',
                    },
                  ],
                  sameAs: [
                    'https://github.com/stefanutz02',
                    'https://linkedin.com/in/stefanvasilescu',
                    'https://twitter.com/stefanvasilescu',
                    'https://erainnovations.ro',
                    'https://vesko.ro',
                  ],
                  knowsAbout: [
                    'React',
                    'Next.js',
                    'Node.js',
                    'React Native',
                    'TypeScript',
                    'Docker',
                    'Robotics',
                    'IoT',
                    'Full-Stack Development',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://stefanvasilescu.com/#website',
                  url: 'https://stefanvasilescu.com',
                  name: 'Stefan Vasilescu Portfolio',
                  description: 'Portfolio of Stefan Vasilescu - Full-Stack Developer, CEO of Vesko Software, Co-Founder of Era Innovations',
                  publisher: {
                    '@id': 'https://stefanvasilescu.com/#person',
                  },
                  inLanguage: ['en', 'ro'],
                },
                {
                  '@type': 'WebPage',
                  '@id': 'https://stefanvasilescu.com/#webpage',
                  url: 'https://stefanvasilescu.com',
                  name: 'Stefan Vasilescu | Full-Stack Developer & CEO',
                  isPartOf: {
                    '@id': 'https://stefanvasilescu.com/#website',
                  },
                  about: {
                    '@id': 'https://stefanvasilescu.com/#person',
                  },
                  primaryImageOfPage: {
                    '@type': 'ImageObject',
                    url: 'https://stefanvasilescu.com/og-image.jpg',
                  },
                },
                {
                  '@type': 'ProfessionalService',
                  name: 'Vesko Software',
                  url: 'https://vesko.ro',
                  logo: 'https://vesko.ro/logo.png',
                  description: 'Enterprise software solutions and digital transformation',
                  founder: {
                    '@id': 'https://stefanvasilescu.com/#person',
                  },
                },
                {
                  '@type': 'ProfessionalService',
                  name: 'Era Innovations',
                  url: 'https://erainnovations.com',
                  logo: 'https://erainnovations.com/logo.png',
                  description: 'Modern digital products and real estate technology',
                  founder: {
                    '@id': 'https://stefanvasilescu.com/#person',
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}