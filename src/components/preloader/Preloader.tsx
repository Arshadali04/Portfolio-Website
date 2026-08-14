"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const obj = { val: 0 };
      tl.to(obj, {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate() {
          const v = Math.round(obj.val);
          if (counterRef.current) {
            counterRef.current.textContent = String(v).padStart(2, "0");
          }
        },
      });

      tl.to(
        underlineRef.current,
        { scaleX: 1, duration: 0.6, ease: "power3.out" },
        "-=0.8"
      );

      tl.to(
        [counterRef.current, nameRef.current],
        { opacity: 0, scale: 0.96, duration: 0.4, ease: "power2.in" },
        "+=0.15"
      );

      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete,
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
      aria-label="Loading"
      role="status"
    >
      {/* Counter */}
      <div className="relative flex items-end gap-1">
        <span
          ref={counterRef}
          className="font-display text-[clamp(5rem,16vw,12rem)] font-bold leading-none tracking-tighter text-fg tabular-nums"
        >
          00
        </span>
        <span className="mb-3 font-display text-[clamp(1.5rem,4vw,3rem)] font-bold text-muted">
          %
        </span>
      </div>

      {/* Name label */}
      <div ref={nameRef} className="mt-6 flex flex-col items-center gap-2">
        <span className="eyebrow text-muted">Arshadali M Athani</span>
        <span
          ref={underlineRef}
          className="block h-px w-32 origin-left bg-gradient-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
