"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAME = "ARSHADALI";

export default function WordmarkSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Spotlight position as CSS custom properties
  const spotX = useRef(50);
  const spotY = useRef(50);

  useEffect(() => {
    if (reduced) return;

    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const qxTo = gsap.quickTo(spotX, "current", { duration: 0.6, ease: "power3.out" });
    const qyTo = gsap.quickTo(spotY, "current", { duration: 0.6, ease: "power3.out" });

    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      qxTo(px);
      qyTo(py);
    };

    // Auto-drift for touch/no-hover
    let driftT = 0;
    let isDrifting = true;
    const stopDrift = () => { isDrifting = false; };

    raf = requestAnimationFrame(function loop() {
      if (isDrifting) {
        driftT += 0.004;
        spotX.current = 50 + Math.sin(driftT * 0.7) * 35;
        spotY.current = 50 + Math.cos(driftT * 0.5) * 30;
      }
      fill.style.setProperty("--sx", `${spotX.current}%`);
      fill.style.setProperty("--sy", `${spotY.current}%`);
      raf = requestAnimationFrame(loop);
    });

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousemove", stopDrift, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", stopDrift);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      aria-label={NAME}
    >
      {/* Stroke outline layer (always visible) */}
      <div
        className="text-stroke pointer-events-none font-display font-bold leading-none tracking-[-0.04em]"
        style={{ fontSize: "clamp(3.5rem, 16vw, 13rem)" }}
        aria-hidden="true"
      >
        {NAME}
      </div>

      {/* Solid fill layer — clipped by spotlight circle */}
      <div
        ref={fillRef}
        className="pointer-events-none absolute inset-0 overflow-hidden font-display font-bold leading-none tracking-[-0.04em] text-fg"
        style={{
          fontSize: "clamp(3.5rem, 16vw, 13rem)",
          WebkitMaskImage: reduced
            ? "none"
            : "radial-gradient(circle 220px at var(--sx, 50%) var(--sy, 50%), black 0%, transparent 100%)",
          maskImage: reduced
            ? "none"
            : "radial-gradient(circle 220px at var(--sx, 50%) var(--sy, 50%), black 0%, transparent 100%)",
          "--sx": "50%",
          "--sy": "50%",
        } as React.CSSProperties}
        aria-hidden="true"
      >
        {NAME}
      </div>
    </div>
  );
}
