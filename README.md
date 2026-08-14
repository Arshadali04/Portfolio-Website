# Arshadali M Athani — Portfolio Website

<div align="center">

### *Computer Science Undergraduate | Data Engineer · Full-Stack · ML*

**`"Building data pipelines, FastAPI systems, and ML-powered tools that turn raw data into real insight"`**

<br/>

![Portfolio Preview](https://img.shields.io/badge/Status-Live%20Portfolio-FF6B4A?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## About This Project

> **This portfolio website is a visual summary of my journey, skills, and selected work.**

Built from scratch as a Next.js 16 application using React 19, TypeScript, and Tailwind CSS v4. Features GPU-accelerated 3D particle backgrounds, scroll-driven animations via GSAP + Framer Motion, and a working contact form backed by a Next.js API route.

### Why This Portfolio Exists

| Purpose | Description |
|--------|-------------|
| **Personal Brand** | A clear introduction to who I am and what I am working toward |
| **Project Showcase** | Highlights selected projects with goals, tools, and outcomes |
| **Skill Snapshot** | Displays technical strengths grouped by category |
| **Contact Hub** | Makes it easy to connect through GitHub, LinkedIn, and email |

### Design Philosophy

Dark, minimal, and motion-first. The site uses a tight design system — a single accent color (`#FF6B4A`), two type scales (Syne display, Space Grotesk body), and scroll-driven reveals to communicate both technical skill and personality without noise.

---

## Site Structure

> A single-page portfolio with content organized into focused sections.

```text
Portfolio-Website/
├── src/
│   ├── app/
│   │   ├── page.tsx            # Root page — section composition
│   │   ├── layout.tsx          # Font loading, metadata
│   │   ├── globals.css         # Design tokens, Tailwind theme
│   │   └── api/contact/        # Contact form API route
│   ├── components/
│   │   ├── preloader/          # Animated entrance preloader
│   │   ├── hero/               # 3D particle canvas, wordmark, CTAs
│   │   ├── philosophy/         # GSAP scroll-pinned statement section
│   │   ├── skills/             # Categorized skill badges
│   │   ├── projects/           # Project cards grid
│   │   ├── experience/         # Animated timeline
│   │   ├── contact/            # Contact form with Zod validation
│   │   ├── footer/             # Footer links
│   │   └── nav/                # Full-screen nav overlay
│   ├── hooks/                  # useMousePosition, useReducedMotion
│   └── lib/                    # Shared utilities
├── public/                     # Static assets
├── Arshadali_Resume.pdf
└── package.json
```

<details>
<summary><b>Core Sections</b></summary>

<br/>

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Name, title, 3D particle background, and key CTAs |
| 2 | **Philosophy** | Scroll-pinned statement about how I approach engineering |
| 3 | **Skills** | Technical skills grouped by category with visual badges |
| 4 | **Projects** | Featured projects with descriptions, tags, and GitHub links |
| 5 | **Experience** | Education, leadership, and certifications timeline |
| 6 | **Contact** | Validated contact form and direct links |

</details>

---

## Features

- GPU-accelerated 3D particle canvas built with Three.js and React Three Fiber.
- Scroll-driven animations using GSAP ScrollTrigger — pinned sections, progress lines, and reveals.
- Framer Motion entrance animations with `AnimatePresence` preloader.
- Categorized skills section with animated badge grid.
- Three-column project card grid with staggered hover effects.
- Animated timeline for experience and education.
- Contact form with Zod schema validation and a Next.js API route handler.
- Responsive layout for desktop, tablet, and mobile.
- Accessible focus states and full reduced-motion support.

---

## Built With

<details>
<summary><b>Frontend Stack</b></summary>

<br/>

| Category | Tools |
|----------|-------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion 13, GSAP 3 + ScrollTrigger |
| **3D / Canvas** | Three.js, React Three Fiber, Drei |
| **Forms** | React Hook Form, Zod |
| **Icons** | Lucide React |

</details>

---

## How to Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. For a production build:

```bash
npm run build
npm run start
```

---

## Customize

- Section content, copy, and project data live inside each component in `src/components/`.
- Design tokens (colors, fonts, spacing) are defined in `src/app/globals.css` under `@theme`.
- API route for the contact form is at `src/app/api/contact/route.ts`.

Update the component data arrays to change your name, bio, projects, skills, and contact details — no build configuration required.

---

## Project Highlights

> Featured work represented on the portfolio.

<details>
<summary><b>Data Anonymization System</b></summary>

<br/>

| Field | Details |
|-------|---------|
| **Status** | Completed — Jun 2025 |
| **Tools** | Python, Pandas, Streamlit, Scikit-Learn |
| **Technique** | K-Anonymity, L-Diversity |
| **Scale** | 10,000+ financial records |

**Description:** Python data processing pipeline applying K-Anonymity and L-Diversity to protect sensitive fields while retaining 90%+ statistical utility. Automated workflows cut processing time from minutes to under 30 seconds with an interactive Streamlit dashboard.

</details>

<details>
<summary><b>Zero Trust API Gateway</b></summary>

<br/>

| Field | Details |
|-------|---------|
| **Status** | Active — Feb 2025 |
| **Tools** | Python, FastAPI, Scikit-Learn, SQL |
| **Technique** | Isolation Forest anomaly detection |
| **Detects** | SQL injection, XSS, brute-force patterns |

**Description:** FastAPI-based secure gateway with real-time ML threat detection. Trained Isolation Forest model flags abnormal API traffic patterns and surfaces them through a threat visualization dashboard.

</details>

<details>
<summary><b>OLA Ride Bookings Analytics</b></summary>

<br/>

| Field | Details |
|-------|---------|
| **Status** | Completed — 2025 |
| **Tools** | Power BI, SQL, DAX, Power Query, Excel |
| **Scale** | 100,000+ ride bookings |
| **Deliverable** | 5-page Power BI dashboard |

**Description:** End-to-end analytics project using a star-schema data model in Power Query. SQL queries with window functions, CTEs, and aggregations validate all Power BI KPIs across vehicle type and payment method.

</details>

---

## Connect With Me

<div align="center">

| Platform | Link |
|----------|------|
| **GitHub** | [github.com/arshadaliathani](https://github.com/arshadali04) |
| **LinkedIn** | [linkedin.com/in/arshadaliathani](https://linkedin.com/in/arshadali4) |
| **Portfolio** | https://arshadaliathani.vercel.app/ |
| **Email** | arshadalia2703@gmail.com |

</div>

---
