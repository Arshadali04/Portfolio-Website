"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  useEffect(() => {
    if (reduced || !sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Pin + image reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=60%",
        pin: true,
        scrub: 0.5,
      });

      gsap.fromTo(
        imageRef.current,
        { filter: "blur(24px) brightness(0.4)", scale: 1.08 },
        {
          filter: "blur(0px) brightness(0.6)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=60%",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "30% top",
            end: "60% top",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* Background image / abstract gradient */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* Abstract duotone gradient representing data/flow */}
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
        {/* Grid overlay */}
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
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="eyebrow mb-8 block text-accent"
        >
          The Philosophy
        </motion.span>

        <div ref={textRef} style={reduced ? {} : { opacity: 0 }}>
          <h2
            className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-tight text-fg"
          >
            Data without clarity is just{" "}
            <span className="text-gradient">noise</span>.
          </h2>

          <div className="mt-8 space-y-5 text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-muted">
            <p>
              I believe the hardest part of engineering isn&apos;t writing the code —
              it&apos;s deciding what problem is worth solving in the first place.
              Every pipeline I build starts with that question.
            </p>
            <p>
              Clean data, honest models, and systems that stay honest under
              real-world pressure: that&apos;s the standard I hold my work to.
            </p>
            <p className="font-medium text-fg/80">
              Less noise. More signal. Shipped on time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
