"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface SkillCategory {
  label: string;
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["Python", "SQL", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "Data & Analytics",
    skills: ["Pandas", "NumPy", "Scikit-Learn", "Power BI", "DAX", "Power Query", "Excel", "Streamlit"],
  },
  {
    label: "Backend & APIs",
    skills: ["FastAPI", "Next.js", "Node.js", "REST APIs", "React"],
  },
  {
    label: "ML & Security",
    skills: ["Isolation Forest", "K-Anonymity", "L-Diversity", "Anomaly Detection", "Data Privacy"],
  },
  {
    label: "Tools & Workflow",
    skills: ["Git", "GitHub", "VS Code", "Jupyter", "Postman", "Zod", "React Hook Form"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-bg-2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="eyebrow mb-3 block text-accent">Toolkit</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-fg">
            Skills & Technologies
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            The languages, frameworks, and tools I reach for when building data systems and
            full-stack applications.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-10">
          {CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease, delay: catIndex * 0.08 }}
            >
              <span className="eyebrow mb-4 block text-muted">{category.label}</span>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      ease,
                      delay: catIndex * 0.06 + skillIndex * 0.04,
                    }}
                    className="rounded-full border border-border bg-bg-card px-4 py-1.5 font-body text-sm text-fg/80 transition-colors hover:border-accent/50 hover:text-fg"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
