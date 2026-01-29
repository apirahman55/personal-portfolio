# 🚀 Api Al Rahman Portfolio

Personal portfolio website built with modern web technologies. Features smooth animations, 3D interactive elements, and a clean minimal design inspired by premium agency websites.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)

## ✨ Features

- **Modern Stack** — Next.js 16, React 19, TypeScript
- **Smooth Animations** — Framer Motion + GSAP for premium feel
- **3D Elements** — Three.js iridescent blob in hero section
- **Dark Mode** — System-aware theme toggle
- **SEO Optimized** — JSON-LD structured data, sitemap, robots.txt
- **Responsive** — Mobile-first design, 3D off on mobile for performance
- **Smooth Scrolling** — Lenis for buttery smooth scroll experience

## 🏃 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── works/             # Portfolio projects
│   │   └── [slug]/        # Dynamic project pages
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt config
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, About, Projects, Contact, Testimonials
│   ├── ui/                # Reusable components (LimeButton, CTASection)
│   └── seo/               # JSON-LD structured data
├── hooks/                 # Custom React hooks
├── lib/                   # Data & utilities
│   ├── data.ts           # Single source of truth for CV data
│   ├── projects.ts       # Portfolio projects data
│   └── icons.tsx         # Shared social icons
└── public/               # Static assets
```

## 🎨 Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion, GSAP |
| 3D | Three.js, React Three Fiber |
| Scroll | Lenis |
| Icons | Lucide React |

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://apuh.my.id
```

### SEO

SEO is configured in:
- `app/layout.tsx` — Global metadata, Open Graph, Twitter Cards
- `components/seo/JsonLd.tsx` — Structured data schemas
- `app/sitemap.ts` — Dynamic sitemap generation
- `app/robots.ts` — Crawler rules

### Data

All personal/CV data lives in `lib/data.ts`:
- Personal info (name, title, contact)
- Work experience
- Tech stack
- Social links
- Certifications

Update this single file to change content across the site.

## 📱 Responsive Design

- **Mobile** (< 768px): 3D hero hidden for performance
- **Tablet** (768px - 1024px): Simplified layouts
- **Desktop** (> 1024px): Full experience with 3D and animations

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Static Export

```bash
npm run build
# Output in `out/` directory
```

## 📄 License

MIT © [Api Al Rahman](https://apuh.my.id)

---

Made with ☕ and lots of `npm run dev`
