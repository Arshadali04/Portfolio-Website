"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl px-6 md:px-10"
      >
        <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} Arshadali M Athani. Crafted with passion.
          </p>
          <p className="font-mono text-[10px] text-muted/50">
            Next.js · R3F · Framer Motion · GSAP
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
