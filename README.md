<div align="center">

# Stefan Vasilescu — Portfolio

**A bilingual, motion-driven personal website built to feel like a product, not a CV.**

[**stefanvasilescu.com**](https://stefanvasilescu.com) · Full-Stack Developer · CEO of Vesko Software · Co-Founder of Era Innovations

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0080?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Code: MIT](https://img.shields.io/badge/Code-MIT-purple?style=flat-square)](#license)
[![Content: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC_BY--NC--SA_4.0-EF9421?style=flat-square&logo=creativecommons&logoColor=white)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

</div>

---

## Overview

This is the source code for my personal portfolio at **[stefanvasilescu.com](https://stefanvasilescu.com)**. It is a single-page, dark-themed, fully responsive site that doubles as a showcase of both my work and my front-end sensibilities — every section was hand-built rather than assembled from templates.

The site presents who I am, what I build, and how to get in touch. It supports English and Romanian out of the box, ships smooth scrolling and a custom cursor, and is statically exported so it can be hosted anywhere a CDN can serve files.

> **Domains.** `stefanvasilescu.com` is the canonical domain. `stefanvasilescu.ro` is registered and **301-redirects to `.com`** at the DNS/host layer. All SEO metadata, JSON-LD, sitemap, and `robots.txt` reference the `.com` domain only.

## Live site

> **[stefanvasilescu.com](https://stefanvasilescu.com)**

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Why these choices](#why-these-choices)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Getting started](#getting-started)
- [Build & deploy](#build--deploy)
- [Customization guide](#customization-guide)
- [Performance & SEO](#performance--seo)
- [Roadmap](#roadmap)
- [Contact](#contact)
- [License](#license)

---

## Features

- **Bilingual UI (EN / RO)** — fully translated via a React context, with the user's preference persisted in `localStorage`.
- **Sectioned single-page architecture** — Hero, About, Skills, Projects, Experience, Contact, Footer — each lazy-revealed on scroll.
- **Project gallery with category tabs** — switch between *Coding* and *Robotics* projects with animated filtering and a modal detail view.
- **Custom animated cursor** — a dual-layer cursor (ring + dot) that reacts to interactive elements, disabled automatically on touch devices.
- **Lenis-powered smooth scrolling** — buttery-smooth wheel and trackpad scroll on supported browsers.
- **Hand-tuned motion design** — staggered reveals, spring-based parallax in the hero, mouse-tracked light blobs, and `layoutId` tab transitions, all powered by Framer Motion.
- **Auto-hiding navbar** — pill-shaped, glassmorphic, hides on scroll down and reveals on scroll up.
- **Production-grade SEO** — full Open Graph + Twitter cards, JSON-LD structured data (Person, WebSite, WebPage, two Organizations), canonical URL, geo meta, sitemap, robots.txt, PWA manifest.
- **Accessible by default** — semantic HTML, `prefers-reduced-motion` honored, focus states preserved on form inputs, descriptive `alt` text on every image.
- **Static export** — `next build` produces a fully static `dist/` folder; no server needed to host it.

## Tech stack

| Layer            | Choice                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| Framework        | **Next.js 14** (App Router, `output: 'export'`)                        |
| Language         | **TypeScript 5** (strict mode)                                         |
| Styling          | **Tailwind CSS 3.4** + custom design tokens                            |
| Animation        | **Framer Motion 11**                                                   |
| Smooth scroll    | **Lenis 1.1**                                                          |
| Icons            | **lucide-react**                                                       |
| Utilities        | **clsx** + **tailwind-merge** (via a `cn()` helper)                    |
| Fonts            | **Inter** (body), **Space Grotesk** (display), **Caveat** (signature)  |
| Hosting          | Any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3)  |

## Why these choices

I picked every dependency on this project deliberately. Here is the reasoning:

**Next.js with static export.** A portfolio does not need server-side rendering, an API layer, or revalidation. What it does need is to load instantly, deploy anywhere, and cost nothing to host. `output: 'export'` gives me the developer experience of Next (file-based routing, font loading, metadata API) while producing a plain folder of HTML and assets at build time.

**TypeScript in strict mode.** A typed translation object, typed project metadata, and typed context hooks mean adding a new language or a new project section becomes a near-zero-risk refactor. The compiler catches the things I would otherwise forget at 1am.

**Tailwind over a component library.** I wanted a distinctive look — chrome-purple gradients, glassmorphic surfaces, custom shadow stacks — not a familiar one. Tailwind keeps styling inline and the design system lives in `tailwind.config.ts` (custom color scales, font families, keyframes) so it stays consistent across components without dragging in any external UI kit.

**Framer Motion over CSS animations.** The hero has spring-based parallax, the project tabs use a shared `layoutId` for the sliding pill, and the timeline reveals from alternating sides as it enters the viewport. These are hard to coordinate in pure CSS — Motion makes them declarative.

**Lenis for smooth scroll.** Native scroll is fine, but Lenis adds just enough easing to make the experience feel like a designed product instead of a document. It's small (~3KB), framework-agnostic, and respects `prefers-reduced-motion` through the OS.

**lucide-react for icons.** Consistent stroke weight, tree-shakeable, and the icon set is large enough that I never had to draw an SVG by hand.

**A custom `LanguageProvider` instead of `next-intl` or `i18next`.** The site has two languages and a flat translation object. A 30-line context provider does the job; pulling in a heavy i18n library would have been over-engineering.

**No backend in the repo.** The contact form posts to a separate API hosted under `api.stefanvasilescu.com`. Keeping the front end deployable as static files means there is one less moving part to maintain.

## Project structure

```
.
├── app/
│   ├── globals.css           # Tailwind layers + custom utility classes
│   ├── layout.tsx            # Root layout, fonts, SEO metadata, JSON-LD
│   └── page.tsx              # Single-page composition of all sections
├── components/
│   ├── About.tsx             # Four-card "About" grid
│   ├── Contact.tsx           # Form + social links, POSTs to API
│   ├── CustomCursor.tsx      # Spring-based dual-cursor (desktop only)
│   ├── Experience.tsx        # Alternating timeline with vertical rail
│   ├── Footer.tsx            # Signature-font sign-off
│   ├── Hero.tsx              # Landing with parallax blobs + CTAs
│   ├── LanguageProvider.tsx  # EN/RO context, persisted to localStorage
│   ├── Navbar.tsx            # Auto-hiding pill nav + EN/RO switch
│   ├── Projects.tsx          # Tabbed gallery + modal detail view
│   ├── Skills.tsx            # 15-tile tech grid with hover glow
│   └── SmoothScroll.tsx      # Lenis bootstrap (mounts once, client-only)
├── lib/
│   ├── translations.ts       # All copy for EN and RO, fully typed
│   └── utils.ts              # cn() helper (clsx + tailwind-merge)
├── public/
│   ├── projects/             # Project preview images
│   ├── og-image.jpg          # Open Graph card
│   ├── profile.jpg           # Schema.org Person image
│   ├── icon-*.png            # PWA + favicons
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
├── LICENSE                   # MIT — applies to source code only
├── LICENSE-CONTENT           # CC BY-NC-SA 4.0 — applies to written + visual content
├── next.config.js            # output: 'export', trailingSlash, distDir: 'dist'
├── tailwind.config.ts        # Design tokens (colors, fonts, keyframes)
├── tsconfig.json             # Strict, path alias @/* → root
└── package.json
```

## How it works

**Composition.** `app/page.tsx` is intentionally trivial — it stacks the sections in order and lets each component own its own state, animations, and styles. The only thing the page contributes is a fixed, full-screen SVG noise overlay at `2%` opacity that adds film grain across the whole site.

**Languages.** `LanguageProvider` exposes a `{ lang, t, toggleLanguage, setLanguage }` context. Every component calls `useLanguage()` and reads from `t.<section>.<key>`. The provider hydrates from `localStorage` on mount, so refreshing the page keeps the user's choice. The translation object is a `const` assertion, which gives every key full IntelliSense.

**Routing within the page.** Navigation is in-page anchors — `home`, `about`, `skills`, `projects`, `experience`, `contact`. The navbar calls `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`, and Lenis handles the easing.

**Project gallery.** The `Projects` component holds a static array of project metadata (id, title, description, category, tags, image, optional links). A `useState<'coding' | 'robotics'>` drives the tab switch, and Framer Motion's `<AnimatePresence mode="popLayout">` handles the enter/exit transitions when categories change. Clicking a card opens a modal with the full description and any available links (Visit / Source / App Store / Play Store).

**Custom cursor.** `CustomCursor.tsx` early-returns on touch devices (`'ontouchstart' in window || navigator.maxTouchPoints > 0`). On desktop, it tracks `mousemove` and renders two layered `motion.div`s — a fast dot and a slower spring-tracked ring — and toggles a hover state by sniffing for `<a>`, `<button>`, or any element with `data-cursor-hover`. The native cursor is hidden via CSS only on devices that report `(hover: hover) and (pointer: fine)`.

**Contact form.** A controlled-by-form-data submit handler POSTs to `https://api.stefanvasilescu.com/contact` and renders one of four states: `idle`, `sending`, `success`, `error`. The component is fully self-contained — swap the `API_URL` constant and it works against any endpoint that accepts `{ name, email, message }`.

**SEO.** `app/layout.tsx` exports a `metadata` object with full Open Graph and Twitter card configuration plus a JSON-LD `<script>` describing the site as a `Person`, `WebSite`, `WebPage`, and two `ProfessionalService` entities — enough for Google's Knowledge Graph to pick up the relationships between me and my companies.

## Getting started

### Prerequisites

- **Node.js 18.17+** (Next.js 14 requirement)
- **npm**, **pnpm**, or **yarn**

### Install

```bash
git clone https://github.com/stefanutz02/stefan-vasilescu-portfolio.git
cd stefan-vasilescu-portfolio
npm install
```

### Develop

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server hot-reloads on save.

### Lint

```bash
npm run lint
```

## Build & deploy

This project uses Next's static export. Running:

```bash
npm run build
```

…produces a fully static `dist/` directory that can be deployed to any static host.

**Recommended hosts**

- **Vercel** — zero-config, connect the repo and ship.
- **Cloudflare Pages** — build command `npm run build`, output directory `dist`.
- **Netlify** — same; set the publish directory to `dist`.
- **GitHub Pages** — push the `dist` folder to a `gh-pages` branch.

> ⚠️ Because of `output: 'export'`, you cannot use Next.js features that require a Node runtime (Image Optimization API, Route Handlers, `revalidate`, middleware). The `images.unoptimized: true` flag in `next.config.js` accounts for this.

## Customization guide

> Before reusing this code, read the [License](#license) section below — the **content** of the site is **not** under MIT and may not be copied as-is.

| What you want to change   | Where to look                                            |
| ------------------------- | -------------------------------------------------------- |
| Your name, title, copy    | `lib/translations.ts`                                    |
| Projects                  | `projects` array at the top of `components/Projects.tsx` |
| Tech skill tiles          | `skills` array in `components/Skills.tsx`                |
| Experience timeline       | `experiences` + `t.experience` in `translations.ts`      |
| Social links              | The array inside `components/Contact.tsx`                |
| Contact API endpoint      | `API_URL` constant in `components/Contact.tsx`           |
| Brand colors / fonts      | `tailwind.config.ts` and the `chrome-purple-text` class  |
| SEO, OG image, JSON-LD    | `app/layout.tsx`                                         |
| Sitemap & robots          | `public/sitemap.xml`, `public/robots.txt`                |
| Replace project images    | `public/projects/`                                       |

To add a third language, extend the `translations` object in `lib/translations.ts` with a new key (`fr`, `de`, …) and update the `Language` type. The `LanguageProvider` will pick it up automatically; you only need to add a new button next to the EN/RO switch in `Navbar.tsx`.

## Performance & SEO

- **Static export** — every page is a single HTML file served as-is from a CDN.
- **Font display: swap** — text is visible before custom fonts finish loading.
- **next/image with `unoptimized`** — paired with `sizes` props so the right resolution is requested via `srcset`.
- **No client-side data fetching on first paint** — language preference reads from `localStorage` after hydration, so initial HTML is the same for every visitor.
- **Reduced-motion friendly** — the global CSS shortens every animation/transition to `0.01ms` when the user has `prefers-reduced-motion: reduce` set.
- **Structured data** — JSON-LD describes me, the site, the homepage, and my two companies as linked entities.
- **Open Graph / Twitter** — single 1200×630 OG image, alternate locale declared (`en_US` ↔ `ro_RO`).
- **Sitemap + robots.txt** — present and pointing at the canonical `.com` domain.

## Roadmap

- [ ] Blog section (MDX) for writeups on projects and stack decisions
- [ ] Per-project case-study pages with deeper screenshots and architecture notes
- [ ] Light theme toggle
- [ ] Replace the IoT/Robotics placeholders with live photos as the projects mature
- [ ] Translate the `alt` text of project images alongside the section copy

## Contact

If you want to talk about a project, hire me, or just say hi:

- **Website** — [stefanvasilescu.com](https://stefanvasilescu.com)
- **Email** — [contact@stefanvasilescu.com](mailto:contact@stefanvasilescu.com)
- **LinkedIn** — [linkedin.com/in/stefanvasilescu](https://linkedin.com/in/stefanvasilescu)
- **GitHub** — [@stefanutz02](https://github.com/stefanutz02)
- **Vesko Software** — [vesko.ro](https://vesko.ro)
- **Era Innovations** — [erainnovations.ro](https://erainnovations.ro)

## License

This repository uses **dual licensing** — different rules for the code and the things that make this *my* portfolio.

### 📦 Source code — MIT License

All `.ts`, `.tsx`, `.js`, `.css`, `.json`, and configuration files in this repository are licensed under the [**MIT License**](LICENSE).

You are free to study, fork, modify, and reuse the code — including for commercial purposes — provided you keep the copyright notice. This includes the component architecture, the `LanguageProvider` pattern, the custom cursor implementation, the animation logic, the Tailwind setup, and every other piece of source.

### 🎨 Content — Creative Commons BY-NC-SA 4.0

Everything else — the *written and visual content* that identifies this site as Stefan Vasilescu's portfolio — is licensed under the [**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)**](https://creativecommons.org/licenses/by-nc-sa/4.0/).

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This specifically covers:

- The **written copy** in `lib/translations.ts` (English and Romanian)
- Every **image and photograph** in `public/`, including `profile.jpg`, `og-image.jpg`, and everything under `public/projects/`
- All **icons**, **favicons**, and the **PWA artwork** (`icon-*.png`, `apple-touch-icon.png`)
- The **"Stefan Vasilescu" name, signature, and visual identity** as they appear on the site
- The **project descriptions, biography, and experience narrative**

The CC BY-NC-SA 4.0 license means you may share and adapt these materials, but only if you:

- **BY — Give credit.** Attribute the original work to Stefan Vasilescu with a link back to [stefanvasilescu.com](https://stefanvasilescu.com).
- **NC — Non-commercial only.** You may not use these materials for commercial purposes.
- **SA — Share alike.** If you remix or build on these materials, you must distribute the result under this same license.

### TL;DR

> ✅ **Fork the repo, learn from the code, and rebuild it as your own portfolio with your own content.**
>
> ❌ **Do not deploy a copy that still contains my name, my photo, my project descriptions, my signature, or my identity — even with attribution. That isn't fair use, and CC BY-NC-SA does not authorize it.**

If you're unsure whether your intended use is allowed, [open an issue](https://github.com/stefanutz02/stefan-vasilescu-portfolio/issues) or [email me](mailto:contact@stefanvasilescu.com) — I'm friendly.

---

<div align="center">

**Built with care in Romania.**

If this repo helped you ship your own portfolio, a ⭐ would mean a lot.

</div>
