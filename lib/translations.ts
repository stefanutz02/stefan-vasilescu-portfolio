export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      coding: 'Coding',
      robotics: 'Robotics',
    },
    hero: {
      greeting: "Hello, I'm",
      name: 'Stefan Vasilescu',
      title: 'Full-Stack Developer',
      role1: 'CEO of Vesko Software',
      role2: 'Co-Founder of Era Innovations',
      description:
        'Building immersive digital experiences, scalable platforms, and futuristic products.',
      ctaProjects: 'View Projects',
      ctaContact: 'Contact Me',
    },
    about: {
      title: 'About',
      subtitle: 'Crafting the future, one line of code at a time',
      p1: 'I am a full-stack developer with deep expertise in building modern web and mobile applications that scale.',
      p2: 'From intuitive UI/UX design to robust backend architecture, I create systems that are fast, secure, and user-centric.',
      p3: 'My passion extends beyond software into robotics and embedded systems, bridging the digital and physical worlds.',
      p4: 'I believe in clean code, thoughtful design, and products that make a real impact.',
    },
    skills: {
      title: 'Technologies',
      subtitle: 'My technical arsenal',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Selected work across disciplines',
      coding: 'Coding',
      robotics: 'Robotics',
      viewProject: 'View Details',
      close: 'Close',
    },
    experience: {
      title: 'Experience',
      present: 'Present',
      vesko: {
        role: 'CEO & Lead Developer',
        company: 'Vesko Software',
        period: '2026 - Present',
        description:
          'Leading product strategy, technical architecture, and development teams for innovative software solutions.',
      },
      era: {
        role: 'Co-Founder',
        company: 'Era Innovations',
        period: '2025 - Present',
        description:
          'Building cutting-edge digital products and technical infrastructure for modern businesses and real estate.',
      },
      freelance: {
        role: 'Junior Full-Stack Developer',
        company: 'Freelance & Contract',
        period: '2020-2025',
        description:
          'Delivered end-to-end web and mobile solutions for clients across fintech, real estate, and logistics sectors.',
      },
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "Let's build something extraordinary together",
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Something went wrong. Please try again.',
      social: 'Or connect via',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
  ro: {
    nav: {
      home: 'Acasă',
      about: 'Despre',
      skills: 'Abilități',
      projects: 'Proiecte',
      experience: 'Experiență',
      contact: 'Contact',
      coding: 'Programare',
      robotics: 'Robotică',
    },
    hero: {
      greeting: 'Salut, sunt',
      name: 'Stefan Vasilescu',
      title: 'Dezvoltator Full-Stack',
      role1: 'CEO Vesko Software',
      role2: 'Co-Fondator Era Innovations',
      description:
        'Construiesc experiențe digitale imersive, platforme scalabile și produse futuriste.',
      ctaProjects: 'Vezi Proiecte',
      ctaContact: 'Contactează-mă',
    },
    about: {
      title: 'Despre',
      subtitle: 'Construiesc viitorul, linie de cod cu linie de cod',
      p1: 'Sunt dezvoltator full-stack cu expertiză profundă în construirea de aplicații web și mobile moderne, scalabile.',
      p2: 'De la design UI/UX intuitiv la arhitectură backend robustă, creez sisteme rapide, securizate și centrate pe utilizator.',
      p3: 'Pasiunea mea se extinde dincolo de software către robotică și sisteme embedded, creând punți între lumea digitală și cea fizică.',
      p4: 'Cred în cod curat, design atent și produse care au un impact real.',
    },
    skills: {
      title: 'Tehnologii',
      subtitle: 'Arsenalul meu tehnic',
    },
    projects: {
      title: 'Proiecte',
      subtitle: 'Lucrări selectate din diverse domenii',
      coding: 'Programare',
      robotics: 'Robotică',
      viewProject: 'Vezi Detalii',
      close: 'Închide',
    },
    experience: {
      title: 'Experiență',
      present: 'Prezent',
      vesko: {
        role: 'CEO & Lead Developer',
        company: 'Vesko Software',
        period: '2026 - Prezent',
        description:
          'Conduc strategia de produs, arhitectura tehnică și echipele de dezvoltare pentru soluții software inovatoare.',
      },
      era: {
        role: 'Co-Fondator',
        company: 'Era Innovations',
        period: '2025 - Prezent',
        description:
          'Construiesc produse digitale de ultimă generație și infrastructură tehnică pentru afaceri moderne și imobiliare.',
      },
      freelance: {
        role: 'Junior Full-Stack Developer',
        company: 'Freelance & Contract',
        period: '2020 - 2025',
        description:
          'Am livrat soluții web și mobile end-to-end pentru clienți din domeniile fintech, imobiliar și logistică.',
      },
    },
    contact: {
      title: 'Contact',
      subtitle: 'Să construim ceva extraordinar împreună',
      name: 'Nume',
      email: 'Email',
      message: 'Mesaj',
      send: 'Trimite Mesaj',
      sending: 'Se trimite...',
      success: 'Mesaj trimis cu succes!',
      error: 'Ceva nu a mers bine. Încearcă din nou.',
      social: 'Sau conectează-te via',
    },
    footer: {
      rights: 'Toate drepturile rezervate.',
    },
  },
} as const;

export type Language = 'en' | 'ro';
export type Translations = typeof translations.en | typeof translations.ro;