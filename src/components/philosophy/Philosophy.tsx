"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Philosophy() {
  const reduced = useReducedMotion();

  const fade = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 0.8, ease, delay },
        };

  return (
    <section
      id="philosophy"
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-bg py-24 md:py-32"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        aria-hidden="true"
      >
        <div
          className="h-full w-full"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 30% 60%, #FF6B4A22 0%, transparent 60%),
              radial-gradient(ellipse 50% 70% at 75% 30%, #FF475722 0%, transparent 60%),
              linear-gradient(160deg, #0A0A0B 0%, #16161A 50%, #0A0A0B 100%)
            `,
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#F5F5F0 1px, transparent 1px),
              linear-gradient(90deg, #F5F5F0 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          {...fade(0)}
          className="eyebrow mb-8 block text-accent"
        >
          The Philosophy
        </motion.span>

        <motion.h2
          {...fade(0.1)}
          className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-tight text-fg"
        >
          Data without clarity is just{" "}
          <span className="text-gradient">noise</span>.
        </motion.h2>

        <div className="mt-8 space-y-5 text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-muted">
          <motion.p {...fade(0.2)}>
            I believe the hardest part of engineering isn&apos;t writing the code —
            it&apos;s deciding what problem is worth solving in the first place.
            Every pipeline I build starts with that question.
          </motion.p>
          <motion.p {...fade(0.25)}>
            Clean data, honest models, and systems that stay honest under
            real-world pressure: that&apos;s the standard I hold my work to.
          </motion.p>
          <motion.p {...fade(0.3)} className="font-medium text-fg/80">
            Less noise. More signal. Shipped on time.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
