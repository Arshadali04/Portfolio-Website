"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface SkillCategory {
  label: string;
  color: string;
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    color: "#FF6B4A",
    skills: ["Python", "SQL", "C++", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "Data & Analytics",
    color: "#A855F7",
    skills: ["Pandas", "NumPy", "Scikit-Learn", "Power BI", "DAX", "Power Query", "Excel", "Streamlit"],
  },
  {
    label: "ML & Security",
    color: "#FF4757",
    skills: ["Isolation Forest", "K-Anonymity", "L-Diversity", "Anomaly Detection", "Data Privacy"],
  },
  {
    label: "Backend",
    color: "#38BDF8",
    skills: ["FastAPI", "Node.js"],
  },
  {
    label: "Tools",
    color: "#34D399",
    skills: ["Git", "GitHub", "VS Code", "Jupyter"],
  },
];

const TOTAL = CATEGORIES.reduce((n, c) => n + c.skills.length, 0);

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, ease, delay: index * 0.09 }}
      style={{ perspective: "900px" }}
      className="h-full"
    >
      <motion.div
        whileHover={{ rotateY: 5, rotateX: -4, scale: 1.025, z: 30 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 1px 0 0 ${category.color}18 inset`,
        }}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#222228] bg-[#16161A] p-6 transition-[box-shadow] duration-300 hover:shadow-[0_24px_60px_-12px_var(--glow)]"
        // @ts-ignore
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          (e.currentTarget as HTMLElement).style.setProperty("--glow", `${category.color}33`);
          (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 60px -12px ${category.color}33, 0 0 0 1px ${category.color}22`;
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 1px 0 0 ${category.color}18 inset`;
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${category.color} 40%, ${category.color} 60%, transparent 100%)`,
          }}
        />

        {/* Ambient corner glow */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.18] blur-2xl"
          style={{ background: category.color }}
        />

        {/* Dot grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, #F5F5F0 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
          }}
        />

        {/* Category label */}
        <div className="relative mb-5 flex items-center gap-2.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }}
          />
          <span
            className="eyebrow text-[0.65rem] tracking-[0.2em]"
            style={{ color: category.color }}
          >
            {category.label}
          </span>
          <span className="ml-auto font-body text-[0.65rem] text-muted/50">
            {category.skills.length}
          </span>
        </div>

        {/* Skill badges */}
        <div className="relative flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease, delay: index * 0.07 + i * 0.045 }}
              className="flex items-center gap-1.5 rounded-lg border border-[#2A2A30] bg-[#0A0A0B]/70 px-3 py-1.5 font-body text-xs font-medium text-fg/70 backdrop-blur-sm"
            >
              <span
                className="h-1 w-1 shrink-0 rounded-full"
                style={{ background: `${category.color}99` }}
              />
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease }}
          className="mb-4"
        >
          <span className="eyebrow mb-3 block text-accent">Toolkit</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-fg">
            Skills & Technologies
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            The languages, frameworks, and tools I reach for when building data systems and
            applications.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mb-12 flex items-center gap-6 border-b border-border pb-8 pt-6"
        >
          {[
            { value: TOTAL, label: "Technologies" },
            { value: CATEGORIES.length, label: "Categories" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-gradient">{value}</span>
              <span className="eyebrow text-muted">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Card grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <SkillCard key={category.label} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
