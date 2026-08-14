"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  period: string;
  bullets: string[];
  github?: string;
  demo?: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
    >
      <div
        className="overflow-hidden rounded-xl border border-border bg-bg-card transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-2xl group-hover:shadow-accent/5"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-bg-2 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <div className="ml-2 flex-1 rounded bg-border/40 px-3 py-1">
            <span className="font-mono text-[10px] text-muted">
              {project.title.toLowerCase().replace(/\s+/g, "-")}.py
            </span>
          </div>
        </div>

        {/* Preview area */}
        <div
          className="relative flex min-h-[180px] items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${project.color}14 0%, transparent 70%), #111114`,
          }}
        >
          {/* Abstract code-grid preview */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="mb-2 ml-6 h-1.5 rounded-full bg-muted"
                style={{ width: `${30 + Math.sin(i * 1.3) * 20}%`, opacity: 0.3 + (i % 3) * 0.2 }}
              />
            ))}
          </div>

          {/* Project color blob */}
          <div
            className="absolute h-32 w-32 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"
            style={{ background: project.color, opacity: 0.12 }}
          />

          {/* Title overlay */}
          <div className="relative z-10 px-6 text-center">
            <p className="font-display text-xl font-bold tracking-tight text-fg">
              {project.title}
            </p>
            <p className="mt-1 text-xs text-muted">{project.period}</p>
          </div>
        </div>

        {/* Info area */}
        <div className="p-5">
          <p className="mb-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          {/* Bullets */}
          <ul className="mb-4 space-y-1.5">
            {project.bullets.slice(0, 2).map((b, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted/80">
                <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                {b}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-4 flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-fg"
              >
                <GithubIcon size={13} />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} demo`}
                className="flex items-center gap-1.5 text-xs text-accent transition-colors hover:text-accent-alt"
              >
                <ExternalLink size={13} />
                View Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
