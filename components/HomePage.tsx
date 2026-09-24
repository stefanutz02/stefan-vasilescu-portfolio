import { Hero } from './Hero';
import { About } from './About';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Experience } from './Experience';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { buildJsonLd } from '@/lib/seo';
import type { Language } from '@/lib/translations';

/** The one-page site. Rendered at / (English) and /ro/ (Romanian). */
export function HomePage({ lang }: { lang: Language }) {
  return (
    <>
      <main id="main" className="relative overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
      />
    </>
  );
}
