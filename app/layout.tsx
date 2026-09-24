import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { ThemeProvider, themeScript } from '@/components/ThemeProvider';
import { ScrollProgress } from '@/components/Motion';
import { Navbar } from '@/components/Navbar';
import { REL_ME, SITE_URL } from '@/lib/seo';

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

/* Site-wide metadata. Per-page title/description/canonical/hreflang/OG
   live in lib/seo.ts and are exported by app/page.tsx and app/ro/page.tsx. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Stefan Vasilescu',
  authors: [{ name: 'Stefan Vasilescu', url: SITE_URL }],
  creator: 'Stefan Vasilescu',
  publisher: 'Stefan Vasilescu',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  formatDetection: { telephone: false },
  category: 'technology',
  other: {
    'geo.region': 'RO-NT',
    'geo.placename': 'Piatra Neamt',
    'geo.position': '46.9292;26.3705',
    ICBM: '46.9292, 26.3705',
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
        {REL_ME.map((href) => (
          <link key={href} rel="me" href={href} />
        ))}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Stefan Vasilescu" />
        
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
      </body>
    </html>
  );
}