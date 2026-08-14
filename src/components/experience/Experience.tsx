"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

interface TimelineItem {
  period: string;
  tag: string;
  role: string;
  org: string;
  description: string;
  bullets: string[];
}

const ITEMS: TimelineItem[] = [
  {
    period: "Mar 2024 – Present",
    tag: "Leadership",
    role: "Technical Lead, Organizing Committee",
    org: "RVITM, Bengaluru",
    description:
      "Coordinated cross-functional teams across design and technical operations for large-scale college events.",
    bullets: [
      "Led 10+ college events, each with 500+ attendees — zero technical failures across major fests.",
      "Managed end-to-end execution and real-time problem-solving under live-event pressure.",
    ],
  },
  {
    period: "Jun 2025 – Present",
    tag: "Athletics",
    role: "Captain, Football Team",
    org: "RVITM, Bengaluru",
    description:
      "Led the college football team across inter-college tournaments, demonstrating leadership under competitive pressure.",
    bullets: [
      "Advanced to the semi-finals in 2 inter-college tournaments.",
      "Developed team communication and strategic decision-making skills.",
    ],
  },
  {
    period: "Aug 2023 – Jun 2027",
    tag: "Education",
    role: "B.E. Computer Science & Engineering",
    org: "RV Institute of Technology & Management (RVITM)",
    description:
      "Currently pursuing a BE in CSE with a strong focus on data engineering, machine learning, and software systems.",
    bullets: [
      "CGPA: 8.34 / 10 — consistent academic performance.",
      "Relevant coursework: Data Structures, DBMS, OS, ML, Python for Data Science.",
    ],
  },
  {
    period: "May 2021 – Mar 2023",
    tag: "Education",
    role: "Pre-University — PCM",
    org: "KLE Independent PU College, Belgaum",
    description: "Physics, Chemistry, Mathematics stream — strong quantitative foundation.",
    bullets: ["Aggregate: 87%", "Developed rigorous problem-solving fundamentals."],
  },
];

interface RowProps {
  item: TimelineItem;
  index: number;
}

function TimelineRow({ item, index }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();

  const dateFade = {
    initial: { opacity: 0, x: reduced ? 0 : -20 },
    animate: isInView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.6, ease, delay: 0.1 },
  };

  const contentFade = {
    initial: { opacity: 0, x: reduced ? 0 : 20 },
    animate: isInView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.6, ease, delay: 0.2 },
  };

  return (
    <div
      ref={rowRef}
      className="relative grid gap-4 border-t border-border py-10 md:grid-cols-[200px,1fr] md:gap-12"
    >
      {/* Date + tag */}
      <motion.div {...dateFade} className="flex flex-row items-start gap-3 md:flex-col">
        <span className="eyebrow rounded-full border border-accent/30 px-2.5 py-0.5 text-accent">
          {item.tag}
        </span>
        <span className="font-body text-sm text-muted">{item.period}</span>
      </motion.div>

      {/* Content */}
      <motion.div {...contentFade}>
        <h3 className="font-display text-xl font-bold tracking-tight text-fg md:text-2xl">
          {item.role}
        </h3>
        <p className="mt-1 font-body text-sm font-medium text-accent">{item.org}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
        <ul className="mt-4 space-y-2">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted/80">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !lineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="experience" className="bg-bg-2 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="eyebrow mb-3 block text-accent">Background</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-fg">
            Where I&apos;ve Been
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Education, leadership, and real-world engineering — building the full picture.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:block">
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-alt"
              style={reduced ? {} : { transform: "scaleY(0)" }}
            />
          </div>

          <div className="md:pl-8">
            {ITEMS.map((item, i) => (
              <TimelineRow key={item.role} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Certifications strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-16 rounded-xl border border-border bg-bg-card p-6"
        >
          <span className="eyebrow mb-4 block text-accent">Certifications</span>
          <ul className="space-y-2 text-sm text-muted">
            <li>→ Deloitte Australia – Data Analytics Job Simulation (Forage)</li>
            <li>→ Tata Group – Data Visualization: Empowering Business with Effective Insights (Forage)</li>
            <li>→ NPTEL – Python for Data Science</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
