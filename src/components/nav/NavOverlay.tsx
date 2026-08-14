"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const NAV_ITEMS = [
  { num: "01", label: "Philosophy", href: "#philosophy" },
  { num: "02", label: "Skills", href: "#skills" },
  { num: "03", label: "Projects", href: "#projects" },
  { num: "04", label: "Experience", href: "#experience" },
  { num: "05", label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    Icon: GithubIcon,
    href: "https://github.com/Arshadali04",
    label: "GitHub",
  },
  {
    Icon: LinkedinIcon,
    href: "https://linkedin.com/in/arshadali4",
    label: "LinkedIn",
  },
];

interface NavOverlayProps {
  open: boolean;
  onClose: () => void;
}

const E = [0.22, 1, 0.36, 1] as const;

const overlayVariants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease: E },
  },
  exit: {
    clipPath: "inset(100% 0% 0% 0%)",
    transition: { duration: 0.55, ease: E },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: E } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

export default function NavOverlay({ open, onClose }: NavOverlayProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="nav-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex flex-col bg-bg-2"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close button — mirrors menu button position */}
          <div className="flex justify-end p-6 md:p-10">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-fg focus-visible:outline-accent"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav list */}
          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24"
          >
            <ul className="space-y-1 md:space-y-3">
              {NAV_ITEMS.map(({ num, label, href }, i) => (
                <motion.li key={href} variants={itemVariants}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-baseline gap-5 py-3 transition-all",
                      "focus-visible:outline-none focus-visible:ring-0"
                    )}
                  >
                    <span className="eyebrow w-8 text-muted transition-colors group-hover:text-accent">
                      {num}
                    </span>
                    <span className="font-display text-[clamp(2rem,7vw,5rem)] font-bold leading-none tracking-tight text-fg transition-all group-hover:translate-x-2 group-hover:text-fg">
                      {label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Divider */}
            <div className="mt-10 h-px w-24 bg-border" />

            {/* Socials */}
            <div className="mt-8 flex flex-col gap-4">
              <span className="eyebrow text-muted">Socials</span>
              <div className="flex gap-5">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-fg focus-visible:outline-accent"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
