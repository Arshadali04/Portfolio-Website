"use client";
import { motion } from "framer-motion";
import ProjectCard, { type Project } from "./ProjectCard";

const PROJECTS: Project[] = [
  {
    title: "Data Anonymization System",
    description:
      "Python-based data processing pipeline for 10,000+ financial records, applying K-Anonymity and L-Diversity to protect sensitive fields while retaining statistical utility.",
    tags: ["Python", "Pandas", "Streamlit", "Scikit-Learn", "K-Anonymity"],
    period: "Jun 2025 – Nov 2025",
    bullets: [
      "Automated anonymization workflows reducing manual effort by 80% while retaining 90%+ statistical utility.",
      "Interactive Streamlit dashboard with CSV upload/export — processing time cut from minutes to under 30 seconds.",
    ],
    github: "https://github.com/Arshadali04",
    color: "#FF6B4A",
  },
  {
    title: "Zero Trust API Gateway",
    description:
      "FastAPI-based secure gateway with real-time threat detection using ML. Detects SQL injection, XSS, and brute-force patterns in API traffic.",
    tags: ["Python", "FastAPI", "Scikit-Learn", "SQL", "Isolation Forest"],
    period: "Feb 2025 – Present",
    bullets: [
      "Trained Isolation Forest model to detect abnormal API traffic patterns including SQL injection and XSS attempts.",
      "Built a threat visualization dashboard for both technical and non-technical stakeholders.",
    ],
    github: "https://github.com/Arshadali04",
    color: "#FF4757",
  },
  {
    title: "OLA Ride Bookings Analytics",
    description:
      "Five-page Power BI dashboard analyzing 100,000+ ride bookings using DAX measures, star-schema data modeling, and SQL validation queries.",
    tags: ["Power BI", "SQL", "DAX", "Power Query", "Excel"],
    period: "2025",
    bullets: [
      "Built star-schema data model using Power Query, standardizing 100,000+ records across vehicle type and payment method.",
      "Wrote SQL with aggregations, window functions, CTEs, and views to validate all dashboard KPIs.",
    ],
    github: "https://github.com/Arshadali04",
    color: "#A855F7",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="projects" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="eyebrow mb-3 block text-accent">Featured Work</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-fg">
            Selected Projects
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Data systems and ML-powered tools — built to handle real scale, built to last.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* More on GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Arshadali04"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 font-body text-sm text-muted transition-all hover:border-accent hover:text-fg focus-visible:outline-accent"
          >
            More on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
