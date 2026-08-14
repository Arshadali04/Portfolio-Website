"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Menu, ArrowRight, Mail, Download } from "lucide-react";
import WordmarkSpotlight from "./WordmarkSpotlight";
import NavOverlay from "@/components/nav/NavOverlay";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
  loading: () => null,
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const fade = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease, delay },
        };

  return (
    <>
      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />

      <section
        id="hero"
        className="relative flex min-h-dvh flex-col overflow-hidden bg-bg"
      >
        {/* 3D canvas — behind everything */}
        {!isMobile && (
          <div className="pointer-events-none absolute inset-0 z-0">
            <ParticleCanvas />
          </div>
        )}

        {/* Gradient vignette */}
        <div className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #0A0A0B 100%)",
          }}
        />

        {/* ── Top bar ── */}
        <div className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
          <motion.span
            {...fade(0.8)}
            className="eyebrow text-muted"
          >
            Shipping Ideas Into Reality
          </motion.span>

          <motion.button
            {...fade(0.9)}
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation menu"
            className="group flex items-center gap-2.5 rounded-full border border-border px-4 py-2 text-sm text-muted transition-all hover:border-accent hover:text-fg focus-visible:outline-accent"
          >
            <Menu size={15} strokeWidth={1.5} />
            <span className="font-body font-medium">Menu</span>
          </motion.button>
        </div>

        {/* ── Wordmark center ── */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 md:px-8">
          {/* Tagline behind name */}
          <motion.p
            {...fade(0.5)}
            className="absolute z-[5] font-display text-[clamp(0.75rem,2vw,1.1rem)] font-semibold tracking-widest text-accent uppercase"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            Data Engineer · Software Developer
          </motion.p>

          {/* Giant wordmark */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="relative z-10 w-full text-center"
          >
            <WordmarkSpotlight />
          </motion.div>

          {/* Last name on second line */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="relative z-10 w-full text-center"
          >
            <span
              className="font-display font-bold leading-none tracking-[-0.04em] text-gradient"
              style={{ fontSize: "clamp(3.5rem, 16vw, 13rem)" }}
            >
              ATHANI
            </span>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative z-10 flex flex-col-reverse gap-6 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-10 md:pb-12">
          {/* Bio */}
          <motion.div {...fade(1.0)} className="max-w-xs">
            <p className="eyebrow mb-2 text-accent">CS Undergrad · RVITM Bengaluru</p>
            <p className="font-body text-sm leading-relaxed text-muted">
              Building data pipelines, FastAPI systems, and ML-powered tools
              that turn raw data into real insight.
            </p>
            <p className="mt-2 font-body text-xs text-muted/60">
              CGPA <span className="font-semibold text-accent">8.34</span> / 10
            </p>
          </motion.div>

          {/* Scroll indicator (center absolute) */}
          <motion.div
            {...fade(1.2)}
            className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          >
            <span className="eyebrow text-muted">Scroll</span>
            <div className="relative h-8 w-px overflow-hidden bg-border">
              <motion.div
                className="absolute top-0 h-full w-full bg-accent"
                animate={reduced ? { y: "0%" } : { y: ["0%", "100%"] }}
                transition={reduced ? {} : { duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fade(1.1)} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2.5 font-body text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40 hover:scale-[1.03] focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Explore Work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/Arshadali_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Arshadali_Resume.pdf"
              className="group flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-body text-sm font-medium text-fg transition-all hover:border-accent hover:text-accent focus-visible:outline-accent"
            >
              <Download size={15} className="transition-transform group-hover:-translate-y-0.5" />
              Resume
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-body text-sm font-medium text-fg transition-all hover:border-accent hover:text-accent focus-visible:outline-accent"
            >
              <Mail size={15} />
              Let&apos;s Talk
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
