'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { X, ExternalLink, Github, Smartphone } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'coding' | 'robotics';
  tags: string[];
  image: string;
  imageAlt: string;
  link?: string;
  github?: string;
  appStore?: string;
  playStore?: string;
}

const projects: Project[] = [
  {
    id: 'erainnovations-web',
    title: 'Era Innovations',
    description:
      'Corporate website for Era Innovations built with React. Modern design, fast performance, and SEO-optimized architecture.',
    category: 'coding',
    tags: ['React', 'Next.js', 'TailwindCSS'],
    image: '/projects/erainnovations.jpg',
    imageAlt: 'Era Innovations website homepage screenshot',
    link: 'https://erainnovations.ro',
  },
  {
    id: 'obiectiv-imobiliare',
    title: 'Obiectiv Imobiliare',
    description:
      'Full-featured real estate mobile app with ImmoFlux CRM integration, WordPress sync, authentication, favorites, and an AI chatbot powered by Groq.',
    category: 'coding',
    tags: ['React Native', 'Expo', 'Node.js', 'Groq'],
    image: '/projects/obiectiv-imobiliare.jpg',
    imageAlt: 'Obiectiv Imobiliare mobile app interface on iPhone',
    appStore: 'https://apps.apple.com/ro/app/obiectiv-imobiliare/id6754935818?l=ro',
    playStore: 'https://play.google.com/store/apps/details?id=com.obiectivimobiliare.app&hl=ro',
  },
  {
    id: 'anya-events',
    title: 'Anya Events',
    description:
      'Premium Shopify e-commerce store for event planning and decorations, serving both Romanian and international markets.',
    category: 'coding',
    tags: ['Shopify', 'Liquid', 'E-commerce'],
    image: '/projects/anya-events.jpg',
    imageAlt: 'Anya Events Shopify store product page',
    link: 'https://anya-events.ro',
  },
  {
    id: 'era-weather',
    title: 'Project ERA Weather',
    description:
      'Smart meteorological station with IoT sensors, real-time data telemetry, and environmental analytics dashboard. Currently in active development.',
    category: 'robotics',
    tags: ['IoT', 'Embedded C', 'MQTT', 'Sensors'],
    image: '/projects/era-weather.jpg',
    imageAlt: 'ERA Weather IoT meteorological station prototype',
  },
  {
    id: 'vesko-rover',
    title: 'Vesko Rover',
    description:
      'Autonomous ground vehicle with computer vision, path planning, and remote telemetry capabilities.',
    category: 'robotics',
    tags: ['Python', 'OpenCV', 'Raspberry Pi', 'ROS'],
    image: '/projects/vesko-rover.jpg',
    imageAlt: 'Vesko Rover autonomous ground vehicle',
  },
];

export function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'coding' | 'robotics'>('coding');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-32 bg-neutral-950">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4">
            {t.projects.title}
          </h2>
          <p className="text-3xl md:text-4xl font-display font-bold text-white mb-12">
            {t.projects.subtitle}
          </p>

          <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
            {(['coding', 'robotics'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className="absolute inset-0 bg-gradient-to-b from-purple-400 to-purple-700 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{t.nav[cat]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]">
                  <div className="aspect-video relative overflow-hidden bg-neutral-900">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/30 text-sm text-white">
                        {t.projects.viewProject}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">{project.title}</h3>
                    <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-purple-500/5 border border-purple-500/15 text-xs text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="aspect-video relative overflow-hidden bg-neutral-900">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-purple-500/5 border border-purple-500/15 text-sm text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-b from-purple-300 to-purple-600 text-white font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source
                    </a>
                  )}
                  {selectedProject.appStore && (
                    <a
                      href={selectedProject.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors"
                    >
                      <Smartphone className="w-4 h-4" />
                      App Store
                    </a>
                  )}
                  {selectedProject.playStore && (
                    <a
                      href={selectedProject.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors"
                    >
                      <Smartphone className="w-4 h-4" />
                      Play Store
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}